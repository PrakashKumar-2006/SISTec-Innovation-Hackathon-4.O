const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const AdminAuditLog = require('../models/AdminAuditLog');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  tls: { rejectUnauthorized: false }
});

router.use(authMiddleware);

// GET /api/admin/users/audit-logs
// Must be above /:id to prevent "audit-logs" from being parsed as an ID
router.get('/audit-logs', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.adminId) query.adminId = req.query.adminId;
    if (req.query.targetAdminId) query.targetAdminId = req.query.targetAdminId;

    const [logs, total] = await Promise.all([
      AdminAuditLog.find(query)
        .populate('adminId', 'name email role')
        .populate('targetAdminId', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AdminAuditLog.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/users
router.get('/', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    if (req.query.role && req.query.role !== 'All') {
      query.role = req.query.role;
    }
    if (req.query.status && req.query.status !== 'All') {
      query.status = req.query.status;
    }

    const [users, total] = await Promise.all([
      Admin.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Admin.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/users/stats
router.get('/stats', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const [total, superAdmins, active, suspended] = await Promise.all([
      Admin.countDocuments(),
      Admin.countDocuments({ role: 'Super Admin' }),
      Admin.countDocuments({ status: 'Active' }),
      Admin.countDocuments({ status: 'Suspended' })
    ]);

    res.json({
      success: true,
      data: { total, superAdmins, active, suspended }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/users
router.post('/', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const { name, email, role, status, sendEmail } = req.body;
    
    // Check existing
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Generate random password
    const tempPassword = crypto.randomBytes(8).toString('hex');
    
    const newAdmin = new Admin({
      name,
      email,
      role,
      status: status || 'Active',
      password: tempPassword
    });

    await newAdmin.save();

    await AdminAuditLog.create({
      adminId: req.admin.id,
      action: 'Account Creation',
      targetAdminId: newAdmin._id,
      ipAddress: req.ip || req.connection.remoteAddress,
      details: { role, email }
    });

    if (sendEmail) {
      try {
        await transporter.sendMail({
          from: `"SIH Admin" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Admin Account Created',
          html: `
            <h2>Welcome to SIH 4.0 Admin Portal</h2>
            <p>Your admin account has been created with the following details:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            <p>Please login and change your password immediately.</p>
          `
        });
      } catch (emailErr) {
        console.error('Failed to send invitation email:', emailErr);
        // Do not fail the whole request
      }
    }

    const adminResponse = newAdmin.toObject();
    delete adminResponse.password;

    res.status(201).json({ success: true, data: adminResponse, tempPassword: sendEmail ? null : tempPassword });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ success: false, message: 'Failed to create admin' });
  }
});

// PUT /api/admin/users/:id
router.put('/:id', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    
    const adminToUpdate = await Admin.findById(req.params.id);
    if (!adminToUpdate) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Prevent modifying the very first Super Admin account (safety check)
    if (adminToUpdate.email === 'admin@sih.gov.in' && (role !== 'Super Admin' || status !== 'Active')) {
      return res.status(403).json({ success: false, message: 'Cannot demote or suspend the primary Super Admin account' });
    }

    // Log changes
    if (adminToUpdate.role !== role) {
      await AdminAuditLog.create({
        adminId: req.admin.id,
        action: 'Role Change',
        targetAdminId: adminToUpdate._id,
        ipAddress: req.ip,
        details: { from: adminToUpdate.role, to: role }
      });
    }

    if (adminToUpdate.status !== status) {
      await AdminAuditLog.create({
        adminId: req.admin.id,
        action: 'Status Change',
        targetAdminId: adminToUpdate._id,
        ipAddress: req.ip,
        details: { from: adminToUpdate.status, to: status }
      });
    }

    adminToUpdate.name = name;
    adminToUpdate.email = email;
    adminToUpdate.role = role;
    adminToUpdate.status = status;

    await adminToUpdate.save();

    const updatedAdmin = adminToUpdate.toObject();
    delete updatedAdmin.password;

    res.json({ success: true, data: updatedAdmin });
  } catch (error) {
    console.error('Error updating admin:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/users/:id/reset-password
router.post('/:id/reset-password', roleMiddleware(['Super Admin']), async (req, res) => {
  try {
    const adminToReset = await Admin.findById(req.params.id);
    if (!adminToReset) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    adminToReset.password = newPassword;
    await adminToReset.save();

    await AdminAuditLog.create({
      adminId: req.admin.id,
      action: 'Password Reset',
      targetAdminId: adminToReset._id,
      ipAddress: req.ip,
      details: { forcedByAdmin: true }
    });

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
