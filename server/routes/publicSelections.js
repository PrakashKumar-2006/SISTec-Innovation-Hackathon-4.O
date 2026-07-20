const express = require('express');
const router = express.Router();
const Selection = require('../models/Selection');

// GET /api/public/shortlisted-teams
router.get('/', async (req, res) => {
  try {
    const { search, theme, institute, round } = req.query;

    const query = { 
      isPublished: true, 
      selectionStatus: 'Shortlisted' 
    };

    if (search) {
      query.$or = [
        { teamName: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { instituteName: { $regex: search, $options: 'i' } },
        { psNumber: { $regex: search, $options: 'i' } },
        { psTitle: { $regex: search, $options: 'i' } }
      ];
    }

    if (theme && theme !== 'All') {
      query.theme = theme;
    }
    
    if (institute && institute !== 'All') {
      query.instituteName = institute;
    }

    if (round && round !== 'All') {
      query.evaluationRound = round;
    }

    const selections = await Selection.find(query)
      .select('registrationId teamName leaderName instituteName psNumber psTitle theme evaluationRound')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: selections });
  } catch (error) {
    console.error('Error fetching public shortlisted teams:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
