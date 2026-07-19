const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Setup Nodemailer SMTP Transporter using existing env variables
const getTransporter = () => {
  return nodemailer.createTransport({
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
};

router.use(authMiddleware);

// Get paginated contacts list with filtering/searching
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || 'All';
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'All') {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts', error: error.message });
  }
});

// Get a single contact details
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('replyHistory.adminId', 'email role');
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Update contact status
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Unread', 'In Progress', 'Resolved', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ success: false, message: 'Failed to update status', error: error.message });
  }
});

// Reply to a contact
router.post('/:id/reply', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const { subject, message } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'Subject and message are required' });
    }

    // Attempt to send email
    const transporter = getTransporter();
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('WARNING: SMTP email configurations not set in .env. Email will be mocked.');
    } else {
      const mailOptions = {
        from: `"SIH Admin Support" <${process.env.EMAIL_USER}>`,
        to: contact.email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
            <p>Dear ${contact.name},</p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>SIH 4.0 Admin Team</strong></p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    }

    // Save reply to history
    contact.replyHistory.push({
      adminId: req.admin.id,
      adminEmail: req.admin.email,
      subject,
      message,
      sentAt: new Date()
    });

    // Automatically mark as resolved if it was unread or in progress
    if (['Unread', 'In Progress'].includes(contact.status)) {
      contact.status = 'Resolved';
    }

    await contact.save();

    res.status(200).json({ success: true, data: contact, message: 'Reply sent successfully' });
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ success: false, message: 'Failed to send reply email', error: error.message });
  }
});

module.exports = router;
