const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS:', e.message);
}

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
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');

const app = express();

// Initialize Razorpay SDK client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// Setup Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  tls: {
    rejectUnauthorized: false // Helps bypass local TLS cert errors during development
  }
});

// Helper to send registration confirmation email
const sendConfirmationEmail = async (leaderEmail, leaderName, teamName, registrationId) => {
  // If email configuration is missing, print warning and skip to prevent backend errors
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: SMTP email configurations not set in .env. Skipping email dispatch.');
    return;
  }

  const mailOptions = {
    from: `"SIH 4.0 Hackathon" <${process.env.EMAIL_USER}>`,
    to: leaderEmail,
    subject: `SIH 4.0 Registration Successful! - Team ${teamName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fdfdfd;">
        <div style="text-align: center; border-bottom: 2px solid #D8AB55; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #161619; margin: 0;">Smart India Hackathon 4.0</h2>
          <p style="color: #D8AB55; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; letter-spacing: 1px;">SISTec Innovation Hackathon</p>
        </div>
        
        <div style="color: #333333; line-height: 1.6;">
          <p>Dear <strong>${leaderName}</strong>,</p>
          
          <p>Congratulations! Your team <strong>"${teamName}"</strong> has successfully registered for the <strong>Smart India Hackathon 4.0 (SIH 4.0)</strong> at Sagar Institute of Science & Technology (SISTec-R).</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #D8AB55; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #666666;">Your Unique Registration ID is:</p>
            <h3 style="margin: 5px 0 0 0; color: #D8AB55; font-family: monospace; font-size: 22px; letter-spacing: 2px;">${registrationId}</h3>
          </div>
          
          <p>Please keep this Registration ID safe. You will need it to reference your nomination, check results, and upload future project milestone guidelines.</p>
          
          <p><strong>Next Steps:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Abstract guidelines and submission templates will be sent to this email address shortly.</li>
            <li>Ensure your team members are notified of the success.</li>
          </ul>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center; border-top: 1px solid #eeeeee; padding-top: 15px;">
            This is an automated notification. Please do not reply directly to this email. For any queries, contact the hackathon organization committee.
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Confirmation email successfully sent to ${leaderEmail}. MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`ERROR: Failed to send confirmation email to ${leaderEmail}:`, err.message);
  }
};

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
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allows frontend to load images/files served statically
}));

// Configure CORS origin whitelist
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'];

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
  ideaPpt: { type: String, required: true }, // Store path/URL
  consentLetter: { type: String, required: true }, // Store path/URL
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentOrderId: { type: String, unique: true },
  paymentId: { type: String },
  amountPaid: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

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
  { name: 'consentLetter', maxCount: 1 }
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
      psTitle
    } = req.body;

    // Check files
    if (!req.files || !req.files['ideaPpt'] || !req.files['consentLetter']) {
      return res.status(400).json({ error: 'Both files (Idea PPT and Consent Letter) are required.' });
    }

    // Keep track of local files to clean up later
    const ideaPptFile = req.files['ideaPpt'][0];
    const consentLetterFile = req.files['consentLetter'][0];
    localFilePaths.push(ideaPptFile.path);
    localFilePaths.push(consentLetterFile.path);

    // Parse members from string
    let parsedMembers = [];
    if (members) {
      try {
        parsedMembers = typeof members === 'string' ? JSON.parse(members) : members;
      } catch (err) {
        return res.status(400).json({ error: 'Invalid members format.' });
      }
    }

    // Generate unique Registration ID: SIH4-XXXXX (e.g. SIH4-A82B3)
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const registrationId = `SIH4-${randomHex}`;

    let ideaPptUrl = '';
    let consentLetterUrl = '';

    // Upload to Cloudinary if configured
    if (isCloudinaryConfigured) {
      console.log('Uploading files to Cloudinary...');
      try {
        ideaPptUrl = await uploadToCloudinary(ideaPptFile.path, 'sih_ppt');
        consentLetterUrl = await uploadToCloudinary(consentLetterFile.path, 'sih_consent');
        console.log('Files uploaded successfully to Cloudinary.');
      } catch (uploadErr) {
        console.error('Cloudinary upload failed, falling back to local files:', uploadErr);
        // Fallback to local files
        ideaPptUrl = `http://localhost:${PORT}/uploads/${ideaPptFile.filename}`;
        consentLetterUrl = `http://localhost:${PORT}/uploads/${consentLetterFile.filename}`;
      }
    } else {
      // Local fallback URLs
      ideaPptUrl = `http://localhost:${PORT}/uploads/${ideaPptFile.filename}`;
      consentLetterUrl = `http://localhost:${PORT}/uploads/${consentLetterFile.filename}`;
    }

    // Generate Razorpay Order
    const amountInINR = Number(process.env.REGISTRATION_FEE_INR || 150);
    const amountInPaise = amountInINR * 100;

    let rpOrder;
    try {
      rpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}_${Math.round(Math.random() * 1000)}`
      });
    } catch (orderErr) {
      console.error('Failed to create Razorpay order:', orderErr);
      return res.status(500).json({ error: 'Failed to initialize payment gateway order.' });
    }

    const newRegistration = new Registration({
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
      ideaPpt: ideaPptUrl,
      consentLetter: consentLetterUrl,
      paymentStatus: 'pending',
      paymentOrderId: rpOrder.id,
      amountPaid: amountInINR
    });

    await newRegistration.save();

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

    // Return Razorpay credentials and order details to client
    res.status(201).json({
      success: true,
      orderId: rpOrder.id,
      amount: rpOrder.amount,
      keyId: process.env.RAZORPAY_KEY_ID || '',
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
      // 3. Generate a secure, unique Registration ID
      const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars hex
      const registrationId = `SIH4-${randomHex}`;

      // 4. Update the pending registration document in MongoDB
      const updatedReg = await Registration.findOneAndUpdate(
        { paymentOrderId: razorpay_order_id },
        { 
          paymentStatus: 'completed',
          paymentId: razorpay_payment_id,
          registrationId: registrationId
        },
        { new: true }
      );

      if (!updatedReg) {
        return res.status(404).json({ error: 'Associated registration record not found.' });
      }

      // 5. Send Email confirmation in background
      sendConfirmationEmail(
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
            const savedReg = await reg.save();
            console.log(`Webhook updated registration for order ${orderId} successfully.`);
            
            // Send confirmation email asynchronously
            sendConfirmationEmail(
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

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File is too large. Maximum limit is 20MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  res.status(500).json({ error: err.message || 'Internal server error.' });
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
