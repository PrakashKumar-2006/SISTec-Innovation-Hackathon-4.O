const express = require('express');
const router = express.Router();
const ProblemStatement = require('../models/ProblemStatement');
const rateLimit = require('express-rate-limit');
const { createRedisStore } = require('../utils/redisClient');

// PHASE 3: Public rate limiter backed by Redis so all instances share one counter
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  store: createRedisStore('rl:pub:'), // Redis key: rl:pub:<IP>
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/public/problem-statements
router.get('/', publicLimiter, async (req, res) => {
  try {
    const problems = await ProblemStatement.find({ status: 'Active' })
      .select('-createdBy -updatedBy -createdAt -updatedAt -__v')
      .lean();

    res.status(200).json({
      success: true,
      data: problems
    });
  } catch (error) {
    console.error('Error fetching public problem statements:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
