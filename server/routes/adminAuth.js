const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AdminAuditLog = require('../models/AdminAuditLog');
const { authMiddleware } = require('../middleware/auth');

const { z } = require('zod');
const { validateBody } = require('../middleware/validate');

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email('Invalid email format').trim(),
  password: z.string().min(1, 'Password is required')
});

router.post('/login', validateBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      // generic error to prevent email enumeration
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (admin.status === 'Suspended' || admin.status === 'Inactive') {
      return res.status(403).json({ success: false, message: `Account is ${admin.status.toLowerCase()}. Please contact a Super Admin.` });
    }

    // Update last login
    admin.lastLogin = {
      timestamp: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress
    };
    await admin.save();

    // Create Audit Log
    await AdminAuditLog.create({
      adminId: admin._id,
      action: 'Login',
      ipAddress: req.ip || req.connection.remoteAddress,
      details: { email: admin.email }
    });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.admin });
});

module.exports = router;
