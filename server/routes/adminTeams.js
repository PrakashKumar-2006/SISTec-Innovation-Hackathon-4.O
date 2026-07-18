const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Protected Routes - All require at least 'Viewer' role
router.use(authMiddleware);

// GET /api/admin/teams
// Fetch all teams with pagination, search, and filters
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const Registration = mongoose.model('Registration');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filters
    const query = {};
    if (req.query.search) {
      query.$or = [
        { teamName: { $regex: req.query.search, $options: 'i' } },
        { registrationId: { $regex: req.query.search, $options: 'i' } },
        { instituteName: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    if (req.query.paymentStatus && req.query.paymentStatus !== 'all') {
      query.paymentStatus = req.query.paymentStatus;
    }
    if (req.query.registrationStatus && req.query.registrationStatus !== 'all') {
      query.registrationStatus = req.query.registrationStatus;
    }
    
    // Sort
    const sortField = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Fetch
    const total = await Registration.countDocuments(query);
    const teams = await Registration.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();
      
    res.json({
      success: true,
      data: teams,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch teams' });
  }
});

// GET /api/admin/teams/:id
// Fetch single team details
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const Registration = mongoose.model('Registration');
    const team = await Registration.findById(req.params.id).lean();
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    console.error('Error fetching team details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch team details' });
  }
});

// PATCH /api/admin/teams/:id/status
// Update registration/verification status and remarks
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const Registration = mongoose.model('Registration');
    const { registrationStatus, verificationStatus, adminRemarks } = req.body;
    
    const updates = {};
    if (registrationStatus) updates.registrationStatus = registrationStatus;
    if (verificationStatus) updates.verificationStatus = verificationStatus;
    if (adminRemarks !== undefined) updates.adminRemarks = adminRemarks;
    
    updates.lastUpdatedBy = req.admin.email;
    updates.lastUpdatedAt = new Date();
    
    if (verificationStatus === 'verified' || verificationStatus === 'flagged') {
      updates.verifiedBy = req.admin.email;
      updates.verifiedAt = new Date();
    }
    
    const team = await Registration.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    
    res.json({ success: true, data: team });
  } catch (error) {
    console.error('Error updating team status:', error);
    res.status(500).json({ success: false, message: 'Failed to update team status' });
  }
});

module.exports = router;
