const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Contact = require('../models/Contact');
const ChangeRequest = require('../models/ChangeRequest');
const { queueSupportEmail } = require('../server');

// Setup multer for attachments
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'support-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: PDF, JPG, JPEG, PNG'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// GET /api/public/support/verify-registration/:code
router.get('/verify-registration/:code', async (req, res) => {
  try {
    const code = req.params.code.trim();
    
    // Dynamically get the Registration model to avoid missing references
    let Registration;
    try {
      Registration = mongoose.model('Registration');
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Registration module not initialized.' });
    }

    const registration = await Registration.findOne({ 
      registrationId: { $regex: new RegExp(`^${code}$`, 'i') } 
    }).lean();
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Invalid Registration Code.' });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: registration._id,
        registrationId: registration.registrationId,
        teamName: registration.teamName,
        leaderName: registration.leaderName,
        leaderEmail: registration.leaderEmail,
        leaderPhone: registration.leaderPhone,
        instituteName: registration.instituteName,
        theme: registration.theme,
        psid: registration.psid,
        psTitle: registration.psTitle,
        paymentStatus: registration.paymentStatus || 'Pending'
      }
    });
  } catch (error) {
    console.error('Error verifying registration:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/public/support/submit
router.post('/submit', upload.array('attachments', 3), async (req, res) => {
  try {
    const { 
      category, name, email, phone, subject, message, 
      registrationCode, teamName, leaderName, leaderEmail, 
      transactionId, paymentReference, browser, device, issueType,
      currentPsid, requestedPsid, requestedPsTitle, reason, registrationIdObj
    } = req.body;

    const attachmentPaths = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    let referenceId;
    let submittedData;

    if (category === 'Problem Statement Change Request') {
      // Create ChangeRequest directly
      if (!registrationIdObj || !requestedPsid || !requestedPsTitle || !reason) {
        return res.status(400).json({ success: false, message: 'Missing required fields for Change Request' });
      }

      // Check if a pending request already exists for this team
      const existing = await ChangeRequest.findOne({ registrationId: registrationIdObj, status: 'Pending' });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A Problem Statement Change Request is already pending for this team.' });
      }

      const cr = new ChangeRequest({
        registrationId: registrationIdObj,
        teamName,
        currentPsid,
        requestedPsid,
        requestedPsTitle,
        reason
        // attachments could be stored here if the schema supported it, but it doesn't currently. 
        // We will stick to the existing schema to avoid breaking Admin Change Requests.
      });
      await cr.save();
      referenceId = cr._id;
      submittedData = cr.toObject();
    } else {
      // Create Contact
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields for Contact' });
      }

      const contact = new Contact({
        category: category || 'General Inquiry',
        name,
        email,
        phone,
        subject,
        message,
        registrationCode,
        teamName,
        leaderName,
        leaderEmail,
        transactionId,
        paymentReference,
        browser,
        device,
        issueType,
        attachments: attachmentPaths
      });
      await contact.save();
      referenceId = contact._id;
      submittedData = contact.toObject();
    }

    // Queue Acknowledgement Email
    // require('../server') could cause a circular dependency issue if not careful, 
    // but we can import queueSupportEmail via process.env or just require it at runtime, 
    // or we'll ensure server.js exports it properly.
    const { queueSupportEmail } = require('../server');
    if (typeof queueSupportEmail === 'function') {
      queueSupportEmail(category, email, name, referenceId, submittedData);
    }

    res.status(201).json({
      success: true,
      message: 'Support request submitted successfully',
      referenceId
    });

  } catch (error) {
    console.error('Error submitting support request:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
