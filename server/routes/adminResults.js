const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Result = require('../models/Result');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Protected Routes
router.use(authMiddleware);

// GET /api/admin/results
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filters
    const query = {};
    if (req.query.search) {
      query.teamName = { $regex: req.query.search, $options: 'i' };
    }
    if (req.query.status && req.query.status !== 'All') {
      query.status = req.query.status;
    }
    
    // Sort
    let sort = {};
    if (req.query.sortField) {
      sort[req.query.sortField] = req.query.sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    const [results, total] = await Promise.all([
      Result.find(query)
        .populate('problemStatement', 'psNumber title theme')
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Result.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: results,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/results/stats
router.get('/stats', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const [totalResults, publishedResults, draftResults, winners] = await Promise.all([
      Result.countDocuments(),
      Result.countDocuments({ status: 'Published' }),
      Result.countDocuments({ status: 'Draft' }),
      Result.countDocuments({ rank: { $in: ['1st', '2nd', '3rd'] } })
    ]);

    res.json({
      success: true,
      data: {
        totalResults,
        publishedResults,
        draftResults,
        winners
      }
    });
  } catch (error) {
    console.error('Error fetching result stats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/results/:id
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('problemStatement', 'psNumber title theme')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();
      
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    
    // Fetch Registration data
    const Registration = mongoose.model('Registration');
    const registration = await Registration.findById(result.registrationId).lean();
    
    res.json({
      success: true,
      data: {
        ...result,
        registrationDetails: registration || null
      }
    });
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/results
router.post('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const newResult = new Result({
      ...req.body,
      createdBy: req.admin.id,
      updatedBy: req.admin.id,
      publishedAt: req.body.status === 'Published' ? new Date() : null
    });

    await newResult.save();
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    console.error('Error creating result:', error);
    res.status(500).json({ success: false, message: 'Failed to create result' });
  }
});

// PUT /api/admin/results/:id
router.put('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.admin.id
    };
    
    if (updateData.status === 'Published' && req.body.status !== 'Draft') {
        // Need to check if it wasn't already published before blindly overriding publishedAt
        const currentResult = await Result.findById(req.params.id);
        if (currentResult && currentResult.status !== 'Published') {
             updateData.publishedAt = new Date();
        }
    } else if (updateData.status === 'Draft') {
        updateData.publishedAt = null;
    }

    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    res.json({ success: true, data: updatedResult });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ success: false, message: 'Failed to update result' });
  }
});

// PATCH /api/admin/results/:id/status
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Draft', 'Published'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updateData = {
      status,
      updatedBy: req.admin.id,
      publishedAt: status === 'Published' ? new Date() : null
    };

    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    res.json({ success: true, data: updatedResult });
  } catch (error) {
    console.error('Error changing result status:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// DELETE /api/admin/results/:id
router.delete('/:id', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
