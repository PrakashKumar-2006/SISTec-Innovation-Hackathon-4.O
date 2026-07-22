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
    enum: ['pending', 'sent', 'failed'], 
    default: 'pending' 
  },
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

// Background Email Queue Processor
let isProcessingEmailQueue = false;
const processEmailQueue = async () => {
  if (isProcessingEmailQueue) return;
  isProcessingEmailQueue = true;
  
  try {
    // Process up to 50 emails per tick to respect SMTP limits and chunk properly
    const jobs = await EmailQueue.find({
      status: 'pending',
      nextRetryAt: { $lte: new Date() }
    }).limit(50);

    for (const job of jobs) {
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

        job.status = 'sent';
        job.lastError = undefined;

        logPaymentEvent('EMAIL_SENT', {
          registrationId: job.registrationId,
          payload: { email: job.leaderEmail, type: job.emailType }
        });
      } catch (err) {
        console.error(`Email attempt #${job.attempts} failed for ${job.leaderEmail} (${job.emailType}):`, err.message);
        job.lastError = err.message;

        logPaymentEvent('EMAIL_FAILED', {
          registrationId: job.registrationId,
          payload: { email: job.leaderEmail, error: err.message, attempt: job.attempts, type: job.emailType }
        });

        if (job.attempts >= 3) {
          job.status = 'failed';
        } else {
          // Exponential backoff retry: attempts * 2 minutes
          const backoffMinutes = job.attempts * 2;
          job.nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000);
          console.log(`Scheduled retry #${job.attempts + 1} in ${backoffMinutes} minutes for ${job.leaderEmail}.`);
        }
      }
      await job.save();
      
      // Add a tiny delay between emails to avoid spam filters / rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (queueErr) {
    console.error('Error processing email queue:', queueErr.message);
  } finally {
    isProcessingEmailQueue = false;
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

// Configure Cloudinary
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('Cloudinary storage service configured successfully.');
} else {
  console.warn('WARNING: Cloudinary is not configured yet. Saving files locally as fallback.');
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

// Strict rate limit for authentication endpoints (5 requests per 15 mins)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
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
    // Drop old index if it exists to allow recreating it with sparse: true
    mongoose.connection.db.collection('registrations').dropIndex('registrationId_1')
      .then(() => console.log('Dropped old registrationId_1 index successfully.'))
      .catch((err) => {
        // Safe to ignore if index doesn't exist
        console.log('Registration index status verified (old non-sparse index is cleared).');
      });
    mongoose.connection.db.collection('registrations').dropIndex('paymentOrderId_1')
      .catch(() => {});
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: PDF, PPT, PPTX, JPG, JPEG, PNG'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

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

// Rate Limiter for registration requests (Max 10 per hour per IP)
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many registration requests from this IP. Please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Endpoint for Registration Submission
app.post('/api/register', registrationLimiter, upload.fields([
  { name: 'ideaPpt', maxCount: 1 },
  { name: 'consentLetter', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 }
]), async (req, res) => {
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

    // Upload to Cloudinary if configured
    if (isCloudinaryConfigured) {
      console.log('Uploading files to Cloudinary...');
      try {
        ideaPptUrl = await uploadToCloudinary(ideaPptFile.path, 'sih_ppt');
        consentLetterUrl = await uploadToCloudinary(consentLetterFile.path, 'sih_consent');
        paymentScreenshotUrl = await uploadToCloudinary(paymentScreenshotFile.path, 'sih_payment');
        console.log('Files uploaded successfully to Cloudinary.');
      } catch (uploadErr) {
        console.error('Cloudinary upload failed, falling back to local files:', uploadErr);
        // Fallback to local files
        ideaPptUrl = `http://localhost:${PORT}/uploads/${ideaPptFile.filename}`;
        consentLetterUrl = `http://localhost:${PORT}/uploads/${consentLetterFile.filename}`;
        paymentScreenshotUrl = `http://localhost:${PORT}/uploads/${paymentScreenshotFile.filename}`;
      }
    } else {
      // Local fallback URLs
      ideaPptUrl = `http://localhost:${PORT}/uploads/${ideaPptFile.filename}`;
      consentLetterUrl = `http://localhost:${PORT}/uploads/${consentLetterFile.filename}`;
      paymentScreenshotUrl = `http://localhost:${PORT}/uploads/${paymentScreenshotFile.filename}`;
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
        const randomHex = require('crypto').randomBytes(3).toString('hex').toUpperCase();
        existingPending.registrationId = `SIH4-${randomHex}`;
      }

      await existingPending.save();

      // Send Confirmation Email
      queueConfirmationEmail(leaderEmailClean, leaderName, teamName, existingPending.registrationId);

      // Clean up local files if uploaded to Cloudinary
      if (isCloudinaryConfigured && ideaPptUrl.includes('cloudinary.com')) {
        localFilePaths.forEach(filePath => {
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(`Cleaned up temp local file: ${filePath}`);
            }
          } catch (unlinkErr) {
            console.error(`Failed to delete temp file ${filePath}:`, unlinkErr);
          }
        });
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

    // Generate unique Registration ID
    const randomHex = require('crypto').randomBytes(3).toString('hex').toUpperCase(); // 6 chars hex
    const registrationId = `SIH4-${randomHex}`;
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

    // Clean up local files if uploaded to Cloudinary
    if (isCloudinaryConfigured && ideaPptUrl.includes('cloudinary.com')) {
      localFilePaths.forEach(filePath => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Cleaned up temp local file: ${filePath}`);
          }
        } catch (unlinkErr) {
          console.error(`Failed to delete temp file ${filePath}:`, unlinkErr);
        }
      });
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
    console.error('Error creating registration:', error);
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

      // 3. Generate a secure, unique Registration ID
      const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars hex
      const registrationId = `SIH4-${randomHex}`;

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
            const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
            reg.paymentStatus = 'completed';
            reg.paymentId = paymentId;
            reg.registrationId = `SIH4-${randomHex}`;
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
      return res.status(400).json({ success: false, message: 'File is too large. Maximum limit is 20MB.' });
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
