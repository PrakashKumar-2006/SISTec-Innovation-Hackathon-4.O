const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ChangeRequest = require('../models/ChangeRequest');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Reuse existing Registration model defined in server.js
const getRegistrationModel = () => {
  try {
    return mongoose.model('Registration');
  } catch (e) {
    // Fallback if not registered yet
    return null;
  }
};

// Setup Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.use(authMiddleware);

// GET /api/admin/change-requests
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status } = req.query;
    
    const filter = {};
    if (search) {
      filter.$or = [
        { teamName: { $regex: search, $options: 'i' } },
        { currentPsid: { $regex: search, $options: 'i' } },
        { requestedPsid: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'All') {
      filter.status = status;
    }

    const total = await ChangeRequest.countDocuments(filter);
    const requests = await ChangeRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('reviewedBy', 'name email')
      .lean();

    res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching change requests:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/admin/change-requests/:id
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const request = await ChangeRequest.findById(req.params.id)
      .populate('reviewedBy', 'name email')
      .populate('registrationId')
      .lean();
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error('Error fetching change request:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// PATCH /api/admin/change-requests/:id/status
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const request = await ChangeRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    
    if (request.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Request is already processed.' });
    }

    // Process approval logic
    const Registration = getRegistrationModel();
    let registration = null;

    if (status === 'Approved') {
      if (Registration) {
        registration = await Registration.findById(request.registrationId);
        if (registration) {
          registration.psid = request.requestedPsid;
          registration.psTitle = request.requestedPsTitle;
          await registration.save();
        }
      }
    } else if (status === 'Rejected') {
      if (Registration) {
        registration = await Registration.findById(request.registrationId);
      }
    }

    request.status = status;
    if (adminRemarks) request.adminRemarks = adminRemarks;
    request.reviewedBy = req.admin.id;
    request.reviewedAt = new Date();

    await request.save();

    // Send Email using centralized queue
    if (registration && registration.leaderEmail) {
      const { queueChangeRequestEmail } = require('../server');
      queueChangeRequestEmail(
        status, 
        registration.leaderEmail, 
        registration.leaderName || 'Team Leader', 
        {
          teamName: registration.teamName,
          requestedPsid: request.requestedPsid,
          requestedPsTitle: request.requestedPsTitle,
          adminRemarks: request.adminRemarks
        }
      );
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST /api/admin/change-requests - For Testing/Seeding
router.post('/', async (req, res) => {
  try {
    const { registrationId, teamName, currentPsid, requestedPsid, requestedPsTitle, reason } = req.body;
    const request = new ChangeRequest({
      registrationId,
      teamName,
      currentPsid,
      requestedPsid,
      requestedPsTitle,
      reason
    });
    await request.save();
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Error creating change request:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
