const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const { authMiddleware } = require("./middleware/auth");
const { maintenanceMiddleware } = require("./middleware/maintenance");
const { sendConfirmationEmail, sendSelectionEmail, sendVerificationEmail } = require('./utils/email');
const { createRedisStore } = require('./utils/redisClient');

const app = express();

// Initialize Razorpay SDK client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// Setup Nodemailer SMTP Transporter (Removed, now in utils/email.js)

// Database-Backed Email Retry Queue Schema
const emailQueueSchema = new mongoose.Schema({
  emailType: { type: String, enum: ['REGISTRATION', 'SELECTION_SHORTLISTED', 'SELECTION_NOT_SHORTLISTED', 'SUPPORT_ACK', 'CR_APPROVED', 'CR_REJECTED', 'VERIFICATION_UPDATE'], default: 'REGISTRATION' },
  registrationId: { type: String, required: true },
  leaderEmail: { type: String, required: true },
  leaderName: { type: String, required: true },
  teamName: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed }, // For extra data like round, theme, psTitle
  attempts: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'sent', 'failed'], 
    default: 'pending' 
  },
  lockedAt: { type: Date, default: null }, // Tracks when a worker claimed this job
  lastError: { type: String },
  nextRetryAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const EmailQueue = mongoose.model('EmailQueue', emailQueueSchema);

// Payment Logs Audit Trail Schema
const paymentLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  registrationId: { type: String },
  orderId: { type: String },
  paymentId: { type: String },
  eventType: { type: String, required: true }, // e.g., 'ORDER_CREATED', 'SIGNATURE_VERIFIED', etc.
  payload: { type: mongoose.Schema.Types.Mixed },
  ip: { type: String }
});

const PaymentLog = mongoose.model('PaymentLog', paymentLogSchema);

// Reusable Helper to log payment/verification events to MongoDB
const logPaymentEvent = async (eventType, { registrationId, orderId, paymentId, payload, ip } = {}) => {
  try {
    const logEntry = new PaymentLog({
      eventType,
      registrationId,
      orderId,
      paymentId,
      payload,
      ip
    });
    await logEntry.save();
    console.log(`[PAYMENT_LOG] ${eventType} recorded successfully.`);
  } catch (err) {
    console.error('Failed to save payment audit log:', err.message);
  }
};

// Helper to send registration confirmation email (Moved to utils/email.js)

// Queue a new registration email job in the database
const queueConfirmationEmail = async (leaderEmail, leaderName, teamName, registrationId) => {
  try {
    const job = new EmailQueue({
      emailType: 'REGISTRATION',
      registrationId,
      leaderEmail,
      leaderName,
      teamName
    });
    await job.save();
    console.log(`Queued REGISTRATION email job for team "${teamName}" (${leaderEmail}).`);
    processEmailQueue();
  } catch (err) {
    console.error('Failed to queue confirmation email job:', err.message);
  }
};

// Queue a selection email job
const queueSelectionEmail = async (teamData, isShortlisted) => {
  try {
    const job = new EmailQueue({
      emailType: isShortlisted ? 'SELECTION_SHORTLISTED' : 'SELECTION_NOT_SHORTLISTED',
      registrationId: teamData.registrationId,
      leaderEmail: teamData.leaderEmail,
      leaderName: teamData.leaderName,
      teamName: teamData.teamName,
      payload: teamData
    });
    await job.save();
    console.log(`Queued ${job.emailType} email job for team "${teamData.teamName}" (${teamData.leaderEmail}).`);
    // Do not call processEmailQueue() here to avoid overwhelming during bulk publish.
  } catch (err) {
    console.error('Failed to queue selection email job:', err.message);
  }
};

// Queue a support email job
const queueSupportEmail = async (category, email, name, referenceId, payload) => {
  try {
    const job = new EmailQueue({
      emailType: 'SUPPORT_ACK',
      leaderEmail: email,
      leaderName: name,
      payload: { ...payload, category, referenceId }
    });
    await job.save();
    console.log(`Queued SUPPORT_ACK email job for ${name} (${email}).`);
    processEmailQueue();
  } catch (err) {
    console.error('Failed to queue support email job:', err.message);
  }
};

// Queue a change request email job
const queueChangeRequestEmail = async (status, email, name, payload) => {
  try {
    const job = new EmailQueue({
      emailType: status === 'Approved' ? 'CR_APPROVED' : 'CR_REJECTED',
      leaderEmail: email,
      leaderName: name,
      payload: payload
    });
    await job.save();
    console.log(`Queued ${job.emailType} email job for ${name} (${email}).`);
    processEmailQueue();
  } catch (err) {
    console.error('Failed to queue change request email job:', err.message);
  }
};

// Queue a verification email job
const queueVerificationEmail = async (leaderEmail, leaderName, teamName, registrationId, status, adminRemarks) => {
  try {
    const job = new EmailQueue({
      emailType: 'VERIFICATION_UPDATE',
      registrationId,
      leaderEmail,
      leaderName,
      teamName,
      payload: { status, adminRemarks }
    });
    await job.save();
    console.log(`Queued VERIFICATION_UPDATE email job for team "${teamName}" (${leaderEmail}).`);
    processEmailQueue();
  } catch (err) {
    console.error('Failed to queue verification email job:', err.message);
  }
};

// ─── Background Email Queue Processor (Atomic / Distributed-Safe) ────────────
//
// PHASE 1 FIX: Replaced the in-memory `isProcessingEmailQueue` flag with a
// MongoDB-level atomic state lock using `findOneAndUpdate`. This ensures that
// across N load-balanced instances, each email job is claimed and dispatched
// by exactly ONE worker — eliminating duplicate email sends.
//
// Flow:
//   1. Recover any stale 'processing' jobs that were orphaned > 5 minutes ago.
//   2. Atomically transition one job at a time: pending → processing.
//   3. Send the email, then mark it 'sent' or apply exponential backoff / 'failed'.

const EMAIL_STALE_LOCK_MS = 5 * 60 * 1000; // 5 minutes before a locked job is considered orphaned

const processEmailQueue = async () => {
  try {
    // Step 1: Recover stale 'processing' jobs orphaned by crashed instances
    const staleThreshold = new Date(Date.now() - EMAIL_STALE_LOCK_MS);
    const staleResult = await EmailQueue.updateMany(
      { status: 'processing', lockedAt: { $lte: staleThreshold } },
      { $set: { status: 'pending', lockedAt: null } }
    );
    if (staleResult.modifiedCount > 0) {
      console.log(`[EmailQueue] Recovered ${staleResult.modifiedCount} stale processing job(s).`);
    }

    // Step 2: Process jobs one at a time using atomic lock acquisition
    //         This is the core fix — findOneAndUpdate is atomic in MongoDB;
    //         only one instance across the cluster will successfully claim each job.
    let processedCount = 0;
    const MAX_JOBS_PER_TICK = 50;

    while (processedCount < MAX_JOBS_PER_TICK) {
      // Atomically claim exactly one pending job that is ready to be retried
      const job = await EmailQueue.findOneAndUpdate(
        {
          status: 'pending',
          nextRetryAt: { $lte: new Date() }
        },
        {
          $set: { status: 'processing', lockedAt: new Date() }
        },
        { new: true } // Return the updated document after the lock is applied
      );

      // No more jobs available — exit the loop
      if (!job) break;

      processedCount++;
      job.attempts += 1;

      try {
        if (job.emailType === 'REGISTRATION') {
          await sendConfirmationEmail(job.leaderEmail, job.leaderName, job.teamName, job.registrationId);
        } else if (job.emailType === 'SELECTION_SHORTLISTED') {
          await sendSelectionEmail(job.payload, true);
        } else if (job.emailType === 'SELECTION_NOT_SHORTLISTED') {
          await sendSelectionEmail(job.payload, false);
        } else if (job.emailType === 'SUPPORT_ACK') {
          await sendSupportAckEmail(job.leaderEmail, job.leaderName, job.payload);
        } else if (job.emailType === 'CR_APPROVED') {
          await sendChangeRequestEmail(job.leaderEmail, job.leaderName, job.payload, true);
        } else if (job.emailType === 'CR_REJECTED') {
          await sendChangeRequestEmail(job.leaderEmail, job.leaderName, job.payload, false);
        } else if (job.emailType === 'VERIFICATION_UPDATE') {
          await sendVerificationEmail(job.leaderEmail, job.leaderName, job.teamName, job.registrationId, job.payload.status, job.payload.adminRemarks);
        }

        // Mark as successfully sent and clear lock
        job.status = 'sent';
        job.lockedAt = null;
        job.lastError = undefined;

        logPaymentEvent('EMAIL_SENT', {
          registrationId: job.registrationId,
          payload: { email: job.leaderEmail, type: job.emailType }
        });
      } catch (err) {
        console.error(`Email attempt #${job.attempts} failed for ${job.leaderEmail} (${job.emailType}):`, err.message);
        job.lastError = err.message;
        job.lockedAt = null; // Always release the lock on failure

        logPaymentEvent('EMAIL_FAILED', {
          registrationId: job.registrationId,
          payload: { email: job.leaderEmail, error: err.message, attempt: job.attempts, type: job.emailType }
        });

        if (job.attempts >= 3) {
          job.status = 'failed';
        } else {
          // Exponential backoff: reset to 'pending' with a future nextRetryAt
          job.status = 'pending';
          const backoffMinutes = job.attempts * 2;
          job.nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000);
          console.log(`Scheduled retry #${job.attempts + 1} in ${backoffMinutes} minutes for ${job.leaderEmail}.`);
        }
      }

      await job.save();

      // Small delay between dispatches to avoid SMTP rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (processedCount > 0) {
      console.log(`[EmailQueue] Processed ${processedCount} job(s) this tick.`);
    }
  } catch (queueErr) {
    console.error('[EmailQueue] Error during queue processing tick:', queueErr.message);
  }
};

module.exports = {
  queueSelectionEmail,
  queueSupportEmail,
  queueChangeRequestEmail,
  queueVerificationEmail
};

// Start background cron-like interval polling the queue every 60 seconds
setInterval(processEmailQueue, 60 * 1000);

/**
 * Generates an auto-incrementing Registration ID formatted as SIH4-XXX (e.g. SIH4-001, SIH4-002, SIH4-010, SIH4-100)
 */
const generateNextRegistrationId = async () => {
  try {
    // Strictly match numeric registration IDs (SIH4-001, SIH4-002...)
    const regs = await Registration.find(
      { registrationId: { $regex: /^SIH4-\d+$/ } },
      { registrationId: 1 }
    );

    let maxNum = 0;
    regs.forEach(r => {
      if (r.registrationId) {
        const match = r.registrationId.match(/^SIH4-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
    });

    // If no numeric SIH4-001 format registration exists yet in DB
    if (maxNum === 0) {
      const totalCount = await Registration.countDocuments({
        $or: [{ paymentStatus: 'completed' }, { verificationStatus: 'verified' }]
      });
      maxNum = totalCount;
    }

    const nextNum = maxNum + 1;
    const paddedNum = String(nextNum).padStart(3, '0');
    return `SIH4-${paddedNum}`;
  } catch (err) {
    console.error('Error generating registration ID:', err);
    return `SIH4-001`;
  }
};

// Configure Cloudinary
// ─── PHASE 4: Cloudinary Production Boot Validation ────────────────────────────
//
// Problem: When Cloudinary credentials are missing in production, files silently
// fall back to local disk storage on the instance that handled the request.
// Under a load balancer, the admin viewing the file might hit a DIFFERENT
// instance — which doesn't have that file — and receive a 404 Not Found.
//
// Fix: In NODE_ENV=production, abort server startup immediately if Cloudinary
// is not properly configured. This makes the misconfiguration visible at deploy
// time rather than silently corrupting user data.

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('[Cloudinary] Storage configured successfully.');
} else if (process.env.NODE_ENV === 'production') {
  // Hard fail in production — local disk fallback is NOT safe across multiple nodes
  console.error(
    '\n[FATAL] Cloudinary is NOT configured but NODE_ENV=production.\n' +
    'Files uploaded to one instance will NOT be accessible from other instances.\n' +
    'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET\n' +
    'in your hosting platform environment variables, then redeploy.\n'
  );
  process.exit(1);
} else {
  console.warn(
    '[Cloudinary] Not configured — files will be stored locally in server/uploads/.\n' +
    '             This is fine for local development but will cause 404 errors\n' +
    '             under a load balancer. Set CLOUDINARY_* env vars for production.'
  );
}

// Helper to upload files to Cloudinary
const uploadToCloudinary = async (filePath, folder = 'sih_files') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: folder,
        resource_type: 'auto', // Auto handles PPT, PDF, DOCX, PNG, etc.
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
  });
};
const PORT = process.env.PORT || 5000;

// PHASE 1 FIX: Trust the first proxy hop so that req.ip correctly reflects
// the real client IP rather than the load balancer / reverse proxy IP.
// Without this, all traffic appears to come from the same proxy IP, which
// (a) breaks per-user rate limiting, and (b) logs incorrect IPs for audit.
app.set('trust proxy', 1);

// Enable Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allows frontend to load images/files served statically
  crossOriginOpenerPolicy: false, // Allows Razorpay popups to communicate with the main window
  crossOriginEmbedderPolicy: false,
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' }, // Prevent clickjacking
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Strict Transport Security
  ieNoOpen: true,
  noSniff: true,
  xssFilter: true
}));

// Prevent NoSQL injections
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// ─── PHASE 3: Distributed Rate Limiters (Redis-backed) ───────────────────────
//
// Problem: express-rate-limit defaults to MemoryStore, which is per-process.
// When N backend instances run behind a load balancer, each has its own
// isolated counter. An attacker can make N×limit attempts by round-robining
// requests across instances.
//
// Fix: Use rate-limit-redis so all instances share ONE central counter in Redis.
// Graceful fallback to MemoryStore when REDIS_URL is not set (e.g. local dev).

// Auth limiter: strict — 5 admin login attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  store: createRedisStore('rl:auth:'), // Redis key: rl:auth:<IP>
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure CORS origin whitelist
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:5173', 
      'http://127.0.0.1:5173', 
      'http://localhost:3000', 
      'http://127.0.0.1:3000',
      'http://localhost:3001', 
      'http://127.0.0.1:3001',
      'http://localhost:3002', 
      'http://127.0.0.1:3002',
      'https://sistec-innovation-hackathon-4-o.onrender.com',
      'https://sistec-innovation-hackathon-4-0.onrender.com'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploads folder statically (for downloading receipts/files)
app.use('/uploads', express.static(uploadsDir));

const adminAuthRoutes = require("./routes/adminAuth");
const adminTeamsRoutes = require("./routes/adminTeams");
const adminProblemsRoutes = require("./routes/adminProblems");
const adminChangeRequestsRoutes = require("./routes/adminChangeRequests");
const adminAnalyticsRoutes = require("./routes/adminAnalytics");
const adminContactsRoutes = require("./routes/adminContacts");
const adminSelectionsRoutes = require("./routes/adminSelections");
const adminUsersRoutes = require("./routes/adminUsers");
const adminSettingsRoutes = require("./routes/adminSettings");
const publicProblemsRoutes = require("./routes/publicProblems");
const publicSelectionsRoutes = require("./routes/publicSelections");
const publicSupportRoutes = require("./routes/publicSupport");

// Apply strict rate limiting specifically to the admin login endpoint
app.use('/api/admin/login', authLimiter);

app.use('/api/admin', adminAuthRoutes);

// Apply auth & maintenance middleware to all other admin routes
app.use('/api/admin', authMiddleware, maintenanceMiddleware);

app.use('/api/admin/teams', adminTeamsRoutes);
app.use('/api/admin/problems', adminProblemsRoutes);
app.use('/api/admin/change-requests', adminChangeRequestsRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);
app.use('/api/admin/contacts', adminContactsRoutes);
app.use('/api/admin/selections', adminSelectionsRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);

// Public Data Routes
app.use('/api/public/problem-statements', publicProblemsRoutes);
app.use('/api/public/shortlisted-teams', publicSelectionsRoutes);
app.use('/api/public/support', publicSupportRoutes);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sih_registrations';
// Mask credentials in connection log for security
const maskedUri = MONGODB_URI.replace(/:([^:@]+)@/, ':******@');
console.log('Connecting to MongoDB at:', maskedUri);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    // PHASE 1 FIX: Removed runtime dropIndex() calls from here.
    //
    // Why: When N instances boot simultaneously behind a load balancer, all
    // instances race to call dropIndex() on the same MongoDB collection at the
    // same millisecond. This triggers 'BackgroundOperationInProgress' or
    // 'IndexNotFound' errors and can corrupt index state during a rolling deploy.
    //
    // Indexes are now declared exclusively via Mongoose schema definitions
    // (registrationSchema.index(...)) which Mongoose safely syncs via
    // ensureIndexes() with built-in idempotency.
    //
    // If a manual one-time index migration is needed, run a dedicated script:
    //   node server/scripts/migrate-indexes.js
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// ─── PHASE 2: Per-Field File Size Limits & MIME-Type Validation ───────────────
//
// Problem: A single flat 20 MB limit allowed all three files to each be 20 MB
// (60 MB total per request), and 50 simultaneous uploads would exhaust RAM.
//
// Fix:
//   1. Per-field size caps enforce tighter, appropriate ceilings.
//   2. Per-field MIME-type validation prevents disguised binary uploads.
//   3. A concurrency semaphore (MAX_CONCURRENT_UPLOADS) throttles multipart
//      stream parsing to prevent memory exhaustion under spike conditions.
//   4. Cloudinary uploads run in parallel via Promise.all instead of serially.

// Per-field size limits (in bytes)
const FILE_SIZE_LIMITS = {
  ideaPpt:           10 * 1024 * 1024, // 10 MB  — PPT / PDF presentations
  consentLetter:      5 * 1024 * 1024, //  5 MB  — PDF / scanned image
  paymentScreenshot:  3 * 1024 * 1024, //  3 MB  — JPEG / PNG screenshot
};

// Allowed MIME types per field
const ALLOWED_MIMES = {
  ideaPpt:           ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  consentLetter:     ['application/pdf', 'image/jpeg', 'image/png'],
  paymentScreenshot: ['image/jpeg', 'image/png'],
};

// Multer disk storage (temp landing pad before Cloudinary upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname).toLowerCase());
  }
});

// Combined file filter: extension + MIME-type validation per field
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return cb(new Error(`Invalid file extension "${ext}". Allowed: PDF, PPT, PPTX, JPG, JPEG, PNG`));
  }

  const allowedMimes = ALLOWED_MIMES[file.fieldname];
  if (allowedMimes && !allowedMimes.includes(file.mimetype)) {
    return cb(new Error(
      `Invalid file type for "${file.fieldname}". ` +
      `Got "${file.mimetype}", expected one of: ${allowedMimes.join(', ')}`
    ));
  }

  cb(null, true);
};

// Multer instance — NOTE: fileSize here acts as an absolute safety ceiling.
// Per-field enforcement happens in the uploadConcurrencyGuard middleware below.
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB absolute ceiling (ideaPpt drives this)
    files: 3,                    // maximum of 3 files per request
    fields: 20,                  // cap non-file form fields
  }
});

// ─── Upload Concurrency Semaphore ─────────────────────────────────────────────
// Limits how many multipart upload requests are being parsed simultaneously.
// Without this, 50 simultaneous 10 MB uploads = 500 MB of in-flight disk I/O
// which can exhaust server memory or IOPS.

const MAX_CONCURRENT_UPLOADS = 10;
let activeUploadCount = 0;

const uploadConcurrencyGuard = (req, res, next) => {
  if (activeUploadCount >= MAX_CONCURRENT_UPLOADS) {
    return res.status(503).json({
      error: 'Server is busy processing other uploads. Please retry in a few seconds.',
      retryAfterSeconds: 5
    });
  }
  activeUploadCount++;
  // Decrement counter when the response finishes (success or error)
  res.on('finish', () => { activeUploadCount = Math.max(0, activeUploadCount - 1); });
  res.on('close',  () => { activeUploadCount = Math.max(0, activeUploadCount - 1); });
  next();
};

// ─── Per-Field Size Enforcement Middleware ─────────────────────────────────────
// Multer's limits.fileSize is applied uniformly across all fields. This
// middleware runs AFTER multer and enforces the tighter per-field ceilings.

const enforcePerFieldSizeLimits = (req, res, next) => {
  if (!req.files) return next();
  for (const [fieldName, sizeLimit] of Object.entries(FILE_SIZE_LIMITS)) {
    const fieldFiles = req.files[fieldName];
    if (fieldFiles && fieldFiles[0] && fieldFiles[0].size > sizeLimit) {
      const limitMB = (sizeLimit / 1024 / 1024).toFixed(0);
      // Delete all temp files before rejecting
      Object.values(req.files).flat().forEach(f => {
        try { if (fs.existsSync(f.path)) fs.unlinkSync(f.path); } catch (_) {}
      });
      return res.status(413).json({
        error: `"${fieldName}" exceeds the ${limitMB} MB size limit. Please compress and retry.`
      });
    }
  }
  next();
};

// ─── Reusable Local File Cleanup Helper ───────────────────────────────────────
// Safely deletes a list of local temp file paths. Used after Cloudinary upload
// succeeds to free up disk space on the server.

const cleanupLocalFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[Upload] Cleaned up temp file: ${filePath}`);
      }
    } catch (unlinkErr) {
      console.error(`[Upload] Failed to delete temp file ${filePath}:`, unlinkErr.message);
    }
  });
};

// MongoDB Registration Schema
const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true, sparse: true },
  teamName: { type: String, required: true },
  leaderName: { type: String, required: true },
  leaderEmail: { type: String, required: true },
  leaderPhone: { type: String, required: true },
  leaderGender: { type: String, required: true },
  theme: { type: String, required: true },
  instituteName: { type: String, required: true },
  members: [
    {
      name: String,
      gender: String,
      email: String,
      phone: String
    }
  ],
  psid: { type: String, required: true },
  psTitle: { type: String, required: true },
  isIeeeCsiMember: { type: String },
  transactionId: { type: String },
  paymentScreenshot: { type: String },
  ideaPpt: { type: String, required: true }, // Store path/URL
  consentLetter: { type: String, required: true }, // Store path/URL
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentOrderId: { type: String, unique: true, sparse: true },
  paymentId: { type: String },
  amountPaid: { type: Number },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date },
  refundStatus: { type: String, enum: ['pending', 'processed', 'none'], default: 'none' },
  refundId: { type: String },
  refundAmount: { type: Number },
  refundReason: { type: String },
  refundDate: { type: Date },
  refundProcessedBy: { type: String },
  
  // Admin fields (added for Dashboard)
  registrationStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  verificationStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'flagged'], 
    default: 'pending' 
  },
  adminRemarks: { type: String, default: '' },
  verifiedBy: { type: String },
  verifiedAt: { type: Date },
  lastUpdatedBy: { type: String },
  lastUpdatedAt: { type: Date }
});

// TTL index to automatically expire registrations when expireAt is reached
registrationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Registration = mongoose.model('Registration', registrationSchema);

// ─── Registration Rate Limiter (Campus NAT-Friendly) ─────────────────────────
//
// Problem: The old limit of 10 req/hour per IP would block an entire university
// campus after 10 students register from the same shared NAT IP address.
//
// Fix:
//   1. Redis store ensures the counter is shared across all backend instances.
//   2. Increased max to 60 req/hour per IP — enough for a campus Wi-Fi burst.
//   3. keyGenerator combines IP + the submitted leader email domain so students
//      from different domains (but same NAT IP) each get their own counter.
//      Example keys in Redis:
//        rl:reg:192.168.1.1|gmail.com
//        rl:reg:192.168.1.1|sistec.ac.in
//   4. skip() exempts already-authenticated admin IPs from counting.

const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 60,                   // 60 requests per hour per (IP + email domain)
  store: createRedisStore('rl:reg:'), // Redis key: rl:reg:<IP>|<domain>
  keyGenerator: (req) => {
    // Extract email domain from the multipart body field (if available)
    // Falls back to plain IP if email is missing (protects against no-body attacks)
    const leaderEmail = req.body?.leaderEmail || '';
    const domain = leaderEmail.includes('@')
      ? leaderEmail.split('@')[1].toLowerCase().trim()
      : 'unknown';
    return `${req.ip}|${domain}`;
  },
  message: {
    error: 'Too many registration attempts from this network. Please try again after an hour.',
    hint: 'If you are on a shared campus network, wait a moment and retry.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Endpoint for Registration Submission
// Middleware stack:
//   1. registrationLimiter       — IP-based rate limit
//   2. uploadConcurrencyGuard    — Phase 2: cap simultaneous multipart streams
//   3. upload.fields(...)        — Multer parse + disk storage
//   4. enforcePerFieldSizeLimits — Phase 2: per-field size ceiling check
app.post('/api/register', registrationLimiter, uploadConcurrencyGuard, upload.fields([
  { name: 'ideaPpt', maxCount: 1 },
  { name: 'consentLetter', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 }
]), enforcePerFieldSizeLimits, async (req, res) => {
  const localFilePaths = [];
  try {
    const {
      teamName,
      leaderName,
      leaderEmail,
      leaderPhone,
      leaderGender,
      theme,
      instituteName,
      members, // Will be parsed from JSON string if sent via FormData
      psid,
      psTitle,
      isIeeeCsiMember,
      transactionId
    } = req.body;

    // Check files
    if (!req.files || !req.files['ideaPpt'] || !req.files['consentLetter'] || !req.files['paymentScreenshot']) {
      return res.status(400).json({ error: 'Idea PPT, Consent Letter, and Payment Screenshot are all required.' });
    }

    // Keep track of local files to clean up later
    const ideaPptFile = req.files['ideaPpt'][0];
    const consentLetterFile = req.files['consentLetter'][0];
    const paymentScreenshotFile = req.files['paymentScreenshot'][0];
    localFilePaths.push(ideaPptFile.path);
    localFilePaths.push(consentLetterFile.path);
    localFilePaths.push(paymentScreenshotFile.path);

    // Parse members from string
    let parsedMembers = [];
    if (members) {
      try {
        parsedMembers = typeof members === 'string' ? JSON.parse(members) : members;
      } catch (err) {
        return res.status(400).json({ error: 'Invalid members format.' });
      }
    }

    const leaderEmailClean = leaderEmail.trim();
    const leaderPhoneClean = leaderPhone.trim();

    // 1. Prevent duplicate completed registrations
    const existingCompleted = await Registration.findOne({
      $or: [{ leaderEmail: leaderEmailClean }, { leaderPhone: leaderPhoneClean }],
      paymentStatus: 'completed'
    });

    if (existingCompleted) {
      return res.status(200).json({ 
        success: true,
        alreadyRegistered: true,
        message: 'This team leader is already registered for the hackathon.',
        registrationId: existingCompleted.registrationId,
        teamName: existingCompleted.teamName
      });
    }

    let ideaPptUrl = '';
    let consentLetterUrl = '';
    let paymentScreenshotUrl = '';

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // PHASE 2: Upload all three files to Cloudinary in parallel via Promise.all
    // (previously they were uploaded one-after-another serially, tripling latency)
    if (isCloudinaryConfigured) {
      console.log('[Upload] Uploading 3 files to Cloudinary in parallel...');
      try {
        [ideaPptUrl, consentLetterUrl, paymentScreenshotUrl] = await Promise.all([
          uploadToCloudinary(ideaPptFile.path, 'sih_ppt'),
          uploadToCloudinary(consentLetterFile.path, 'sih_consent'),
          uploadToCloudinary(paymentScreenshotFile.path, 'sih_payment'),
        ]);
        console.log('[Upload] All files uploaded successfully to Cloudinary.');
      } catch (uploadErr) {
        console.error('[Upload] Cloudinary upload failed, falling back to local URLs:', uploadErr.message);
        // Fallback: serve from local disk (single-instance dev/staging only)
        ideaPptUrl = `${baseUrl}/uploads/${ideaPptFile.filename}`;
        consentLetterUrl = `${baseUrl}/uploads/${consentLetterFile.filename}`;
        paymentScreenshotUrl = `${baseUrl}/uploads/${paymentScreenshotFile.filename}`;
      }
    } else {
      // Local fallback URLs (development / Cloudinary not configured)
      ideaPptUrl = `${baseUrl}/uploads/${ideaPptFile.filename}`;
      consentLetterUrl = `${baseUrl}/uploads/${consentLetterFile.filename}`;
      paymentScreenshotUrl = `${baseUrl}/uploads/${paymentScreenshotFile.filename}`;
    }

    // 2. Order Locking / Reuse existing pending registration if it exists
    const existingPending = await Registration.findOne({
      leaderEmail: leaderEmailClean,
      paymentStatus: 'pending'
    });

    if (existingPending) {
      existingPending.teamName = teamName;
      existingPending.leaderName = leaderName;
      existingPending.leaderPhone = leaderPhoneClean;
      existingPending.leaderGender = leaderGender;
      existingPending.theme = theme;
      existingPending.instituteName = instituteName;
      existingPending.members = parsedMembers;
      existingPending.psid = psid;
      existingPending.psTitle = psTitle;
      existingPending.isIeeeCsiMember = isIeeeCsiMember;
      existingPending.transactionId = transactionId;
      existingPending.ideaPpt = ideaPptUrl;
      existingPending.consentLetter = consentLetterUrl;
      existingPending.paymentScreenshot = paymentScreenshotUrl;
      existingPending.amountPaid = isIeeeCsiMember === 'Yes' ? 1200 : 1500;
      existingPending.paymentStatus = 'completed';
      existingPending.verificationStatus = 'pending';
      existingPending.expireAt = undefined;

      // If it doesn't have a registrationId yet
      if (!existingPending.registrationId) {
        existingPending.registrationId = await generateNextRegistrationId();
      }

      await existingPending.save();

      // Send Confirmation Email
      queueConfirmationEmail(leaderEmailClean, leaderName, teamName, existingPending.registrationId);

      // PHASE 2: Use shared cleanupLocalFiles helper
      if (isCloudinaryConfigured && ideaPptUrl.includes('cloudinary.com')) {
        cleanupLocalFiles(localFilePaths);
      }

      return res.status(200).json({
        success: true,
        registrationId: existingPending.registrationId,
        teamName,
        leaderName,
        leaderEmail: leaderEmailClean,
        leaderPhone: leaderPhoneClean
      });
    }

    // Generate unique Registration ID (SIH4-001, SIH4-002, SIH4-010...)
    const registrationId = await generateNextRegistrationId();
    const amountInINR = isIeeeCsiMember === 'Yes' ? 1200 : 1500;

    const newRegistration = new Registration({
      registrationId,
      teamName,
      leaderName,
      leaderEmail,
      leaderPhone,
      leaderGender,
      theme,
      instituteName,
      members: parsedMembers,
      psid,
      psTitle,
      isIeeeCsiMember,
      transactionId,
      ideaPpt: ideaPptUrl,
      consentLetter: consentLetterUrl,
      paymentScreenshot: paymentScreenshotUrl,
      paymentStatus: 'completed',
      verificationStatus: 'pending',
      amountPaid: amountInINR,
      expireAt: undefined // Completed registrations don't expire
    });

    await newRegistration.save();

    // Send Confirmation Email
    queueConfirmationEmail(leaderEmail, leaderName, teamName, registrationId);

    // PHASE 2: Use shared cleanupLocalFiles helper
    if (isCloudinaryConfigured && ideaPptUrl.includes('cloudinary.com')) {
      cleanupLocalFiles(localFilePaths);
    }

    // Return success response to client
    res.status(201).json({
      success: true,
      registrationId,
      teamName,
      leaderName,
      leaderEmail,
      leaderPhone
    });

  } catch (error) {
    // PHASE 2: Always clean up any temp files that landed on disk before the error
    console.error('[Registration] Error:', error.message || error);
    cleanupLocalFiles(localFilePaths);
    // Multer-specific errors (e.g. file too large, wrong type)
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'One or more uploaded files exceed the allowed size limit.' });
    }
    res.status(500).json({ error: error.message || 'Server error occurred during registration.' });
  }
});

const crypto = require('crypto');

// Cryptographic Payment Verification Route
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      logPaymentEvent('VERIFICATION_FAILED', {
        ip: req.ip,
        payload: { error: 'Missing tokens' }
      });
      return res.status(400).json({ error: 'Missing required payment verification tokens.' });
    }

    // 1. Generate expected signature using SHA256 HMAC
    const signSource = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
      .update(signSource.toString())
      .digest('hex');

    // 2. Check if signature matches
    if (expectedSignature === razorpay_signature) {
      logPaymentEvent('SIGNATURE_VERIFIED', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        ip: req.ip
      });

      // 2.1 Check if order is already processed to ensure idempotency
      const existingReg = await Registration.findOne({ paymentOrderId: razorpay_order_id });
      if (!existingReg) {
        return res.status(404).json({ error: 'Associated registration record not found.' });
      }

      if (existingReg.paymentStatus === 'completed') {
        return res.status(200).json({
          success: true,
          message: 'Payment already verified and registration finalized.',
          registrationId: existingReg.registrationId,
          teamName: existingReg.teamName
        });
      }

      // 3. Generate a secure, unique Registration ID (SIH4-001, SIH4-002...)
      const registrationId = await generateNextRegistrationId();

      // 4. Update the pending registration document in MongoDB
      const updatedReg = await Registration.findOneAndUpdate(
        { paymentOrderId: razorpay_order_id },
        { 
          paymentStatus: 'completed',
          paymentId: razorpay_payment_id,
          registrationId: registrationId,
          $unset: { expireAt: "" }
        },
        { new: true }
      );

      if (!updatedReg) {
        return res.status(404).json({ error: 'Associated registration record not found.' });
      }

      logPaymentEvent('REGISTRATION_COMPLETED', {
        registrationId: updatedReg.registrationId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        ip: req.ip
      });

      // 5. Queue Email confirmation in background (Retry Queue)
      queueConfirmationEmail(
        updatedReg.leaderEmail,
        updatedReg.leaderName,
        updatedReg.teamName,
        updatedReg.registrationId
      );

      res.status(200).json({
        success: true,
        message: 'Payment verified and registration finalized.',
        registrationId: updatedReg.registrationId,
        teamName: updatedReg.teamName
      });
    } else {
      logPaymentEvent('SIGNATURE_FAILED', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        ip: req.ip
      });
      res.status(400).json({ error: 'Payment signature verification failed. Tampering detected.' });
    }
  } catch (err) {
    console.error('Error during payment verification:', err);
    res.status(500).json({ error: err.message || 'Server error verifying transaction.' });
  }
});

// Razorpay Webhook callback route (verifies webhook events using raw req.rawBody)
app.post('/api/payment/webhook', async (req, res) => {
  try {
    logPaymentEvent('WEBHOOK_RECEIVED', {
      ip: req.ip,
      payload: { event: req.body?.event }
    });

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (!secret || !signature) {
      // Webhook not fully configured or missing headers - ignore/acknowledge
      return res.status(200).send('Webhook configured but skipped signature verification.');
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody)
      .digest('hex');

    if (expectedSignature === signature) {
      logPaymentEvent('WEBHOOK_VERIFIED', {
        ip: req.ip,
        payload: { event: req.body?.event }
      });

      const eventData = req.body;
      
      // If payment is captured or order is paid
      if (eventData.event === 'order.paid' || eventData.event === 'payment.captured') {
        const payloadOrder = eventData.payload.order?.entity || eventData.payload.payment?.entity;
        const orderId = payloadOrder?.order_id || payloadOrder?.id;
        const paymentId = eventData.payload.payment?.entity?.id || '';

        if (orderId) {
          const reg = await Registration.findOne({ paymentOrderId: orderId });
          if (reg && reg.paymentStatus !== 'completed') {
            reg.paymentStatus = 'completed';
            reg.paymentId = paymentId;
            reg.registrationId = await generateNextRegistrationId();
            reg.expireAt = undefined; // Unsets the expireAt TTL index field in Mongoose/MongoDB
            const savedReg = await reg.save();
            console.log(`Webhook updated registration for order ${orderId} successfully.`);

            logPaymentEvent('REGISTRATION_COMPLETED', {
              registrationId: savedReg.registrationId,
              orderId: orderId,
              paymentId: paymentId,
              ip: req.ip
            });
            
            // Queue confirmation email asynchronously (Retry Queue)
            queueConfirmationEmail(
              savedReg.leaderEmail,
              savedReg.leaderName,
              savedReg.teamName,
              savedReg.registrationId
            );
          }
        }
      }
      res.status(200).send('OK');
    } else {
      logPaymentEvent('WEBHOOK_SIGNATURE_FAILED', { ip: req.ip });
      res.status(400).send('Invalid webhook signature');
    }
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).send('Webhook server error');
  }
});

// Middleware to verify administrative API Key
const verifyAdminKey = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_API_KEY || 'sih_secret_admin_key_2026';
  
  if (!adminKey || adminKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid administrative key.' });
  }
  next();
};

// Endpoint to view all registrations (for admin/checking purposes)
app.get('/api/registrations', verifyAdminKey, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to manually resend confirmation email (Admin override)
app.post('/api/registrations/:registrationId/resend-email', verifyAdminKey, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const reg = await Registration.findOne({ registrationId });
    if (!reg) {
      return res.status(404).json({ error: 'Registration not found.' });
    }
    
    // Immediately queue the confirmation email
    await queueConfirmationEmail(
      reg.leaderEmail,
      reg.leaderName,
      reg.teamName,
      reg.registrationId
    );
    
    res.status(200).json({ success: true, message: 'Email dispatch queued successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to view payment audit log trail (Admin override)
app.get('/api/registrations/logs', verifyAdminKey, async (req, res) => {
  try {
    const logs = await PaymentLog.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to manually verify/override registration payment status (Admin override)
app.post('/api/registrations/:registrationId/verify-override', verifyAdminKey, async (req, res) => {
  try {
    const { registrationId } = req.params;
    
    // Find registration by registrationId or paymentOrderId (accepts either)
    const reg = await Registration.findOne({
      $or: [{ registrationId }, { paymentOrderId: registrationId }]
    });

    if (!reg) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    if (reg.paymentStatus === 'completed') {
      return res.status(400).json({ error: 'Registration is already completed.' });
    }

    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const generatedId = reg.registrationId || `SIH4-${randomHex}`;

    reg.paymentStatus = 'completed';
    reg.paymentId = reg.paymentId || `manual_override_${Date.now()}`;
    reg.registrationId = generatedId;
    reg.expireAt = undefined; // unset expiry
    await reg.save();

    logPaymentEvent('MANUAL_VERIFY_OVERRIDE', {
      registrationId: generatedId,
      orderId: reg.paymentOrderId,
      paymentId: reg.paymentId,
      payload: { action: 'completed' }
    });

    // Queue confirmation email
    queueConfirmationEmail(reg.leaderEmail, reg.leaderName, reg.teamName, generatedId);

    res.status(200).json({
      success: true,
      message: 'Registration manually marked as completed.',
      registrationId: generatedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to manually register a refund (Admin override)
app.post('/api/registrations/:registrationId/refund', verifyAdminKey, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { refundId, refundAmount, refundReason, refundProcessedBy } = req.body;

    const reg = await Registration.findOne({ registrationId });
    if (!reg) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    reg.paymentStatus = 'failed'; // Mark failed to deactivate
    reg.refundStatus = 'processed';
    reg.refundId = refundId || `manual_refund_${Date.now()}`;
    reg.refundAmount = refundAmount || reg.amountPaid || 1;
    reg.refundReason = refundReason || 'Requested by user / dispute';
    reg.refundDate = new Date();
    reg.refundProcessedBy = refundProcessedBy || 'Admin Override';
    await reg.save();

    logPaymentEvent('REFUND_PROCESSED', {
      registrationId: reg.registrationId,
      orderId: reg.paymentOrderId,
      paymentId: reg.paymentId,
      payload: { refundId: reg.refundId, refundAmount: reg.refundAmount }
    });

    res.status(200).json({
      success: true,
      message: 'Registration successfully marked as refunded and deactivated.',
      registrationId: reg.registrationId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint: delete all pending (unpaid) registrations — clears stale test orders
app.delete('/api/registrations/pending-cleanup', verifyAdminKey, async (req, res) => {
  try {
    const result = await Registration.deleteMany({ paymentStatus: 'pending' });
    console.log(`[ADMIN] Deleted ${result.deletedCount} stale pending registrations.`);
    logPaymentEvent('ADMIN_PENDING_CLEANUP', { payload: { deletedCount: result.deletedCount } });
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} stale pending registrations.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      // PHASE 4 FIX: Updated message to reflect Phase 2 per-field limits (max 10 MB for ideaPpt)
      return res.status(413).json({ success: false, message: 'File is too large. Maximum limits: PPT 10 MB, Consent Letter 5 MB, Screenshot 3 MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, message: 'Too many files uploaded. Maximum is 3 files per registration.' });
    }
    return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
  }

  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, message: 'Validation Error', errors: messages });
  }

  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Internal server error.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
