const express = require('express');
const router = express.Router();
const ProblemStatement = require('../models/ProblemStatement');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Protected Routes - All require at least 'Viewer' role
router.use(authMiddleware);

// GET /api/admin/problems
// Fetch all problem statements with pagination, search, and filters
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, domain, status } = req.query;
    
    // Build filter query
    const filter = {};
    
    if (search) {
      filter.$or = [
        { psNumber: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { org: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (domain && domain !== 'All') {
      filter.domain = domain;
    }
    
    if (status && status !== 'All') {
      filter.status = status;
    }

    const total = await ProblemStatement.countDocuments(filter);
    const problems = await ProblemStatement.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data: problems,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching problem statements:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/admin/problems/:id
// Fetch single problem statement details
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const problem = await ProblemStatement.findById(req.params.id).lean();
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    console.error('Error fetching problem statement:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST /api/admin/problems
// Create a new problem statement
router.post('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { psNumber, title, org, category, domain, detailedDescription, techStack, status } = req.body;
    
    // Check if PSID already exists
    const existing = await ProblemStatement.findOne({ psNumber: psNumber.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: `Problem Statement with ID ${psNumber} already exists.` });
    }

    const problem = new ProblemStatement({
      psNumber,
      title,
      org,
      category,
      domain,
      detailedDescription,
      techStack,
      status: status || 'Active',
      createdBy: req.admin.id
    });

    await problem.save();
    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    console.error('Error creating problem statement:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// PUT /api/admin/problems/:id
// Update problem statement
router.put('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { psNumber, title, org, category, domain, detailedDescription, techStack, status } = req.body;
    
    const problem = await ProblemStatement.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }

    // Check if PSID changed and already exists
    if (psNumber && psNumber.toUpperCase() !== problem.psNumber.toUpperCase()) {
      const existing = await ProblemStatement.findOne({ psNumber: psNumber.toUpperCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: `Problem Statement with ID ${psNumber} already exists.` });
      }
    }

    problem.psNumber = psNumber || problem.psNumber;
    problem.title = title || problem.title;
    problem.org = org || problem.org;
    problem.category = category || problem.category;
    problem.domain = domain || problem.domain;
    problem.detailedDescription = detailedDescription || problem.detailedDescription;
    problem.techStack = techStack !== undefined ? techStack : problem.techStack;
    problem.status = status || problem.status;
    problem.updatedBy = req.admin.id;

    await problem.save();
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    console.error('Error updating problem statement:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// PATCH /api/admin/problems/:id/status
// Update status (Active/Inactive)
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const problem = await ProblemStatement.findByIdAndUpdate(
      req.params.id, 
      { status, updatedBy: req.admin.id },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }
    
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
