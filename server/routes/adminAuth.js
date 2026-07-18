const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      // generic error to prevent email enumeration
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

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
