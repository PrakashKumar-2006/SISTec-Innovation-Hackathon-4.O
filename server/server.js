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

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());
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
console.log('Connecting to MongoDB at:', MONGODB_URI);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
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
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// MongoDB Registration Schema
const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true },
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
  ideaPpt: { type: String, required: true }, // Store path/filename
  consentLetter: { type: String, required: true }, // Store path/filename
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Endpoint for Registration Submission
app.post('/api/register', upload.fields([
  { name: 'ideaPpt', maxCount: 1 },
  { name: 'consentLetter', maxCount: 1 }
]), async (req, res) => {
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
      ideaPpt: req.files['ideaPpt'][0].filename,
      consentLetter: req.files['consentLetter'][0].filename
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: 'Registration created successfully!',
      registrationId: registrationId,
      teamName: teamName
    });

  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: error.message || 'Server error occurred during registration.' });
  }
});

// Endpoint to view all registrations (for admin/checking purposes)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
