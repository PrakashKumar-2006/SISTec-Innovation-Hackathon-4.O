const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Selection = require('../models/Selection');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { queueVerificationEmail } = require('../server');

// Protected Routes - All require at least 'Viewer' role
router.use(authMiddleware);

const xlsx = require('xlsx');

// Helper to build the shared team query
const buildTeamQuery = async (queryParams) => {
  const query = {};
  if (queryParams.search) {
    query.$or = [
      { teamName: { $regex: queryParams.search, $options: 'i' } },
      { registrationId: { $regex: queryParams.search, $options: 'i' } },
      { instituteName: { $regex: queryParams.search, $options: 'i' } }
    ];
  }
  if (queryParams.paymentStatus && queryParams.paymentStatus !== 'all') {
    query.paymentStatus = queryParams.paymentStatus;
  }
  if (queryParams.registrationStatus && queryParams.registrationStatus !== 'all') {
    query.registrationStatus = queryParams.registrationStatus;
  }

  // Handle Selection Status
  if (queryParams.selectionStatus && queryParams.selectionStatus !== 'all') {
    const Selection = mongoose.model('Selection');
    if (queryParams.selectionStatus === 'Pending Evaluation') {
      const decidedSelections = await Selection.find({ selectionStatus: { $in: ['Shortlisted', 'Not Shortlisted'] } }).distinct('registrationId');
      query.registrationId = { $nin: decidedSelections };
    } else {
      const matchingSelections = await Selection.find({ selectionStatus: queryParams.selectionStatus }).distinct('registrationId');
      if (query.registrationId && query.registrationId.$nin) {
         // Should not happen, but just in case
         query.registrationId = { $in: matchingSelections, $nin: query.registrationId.$nin };
      } else {
         query.registrationId = { $in: matchingSelections };
      }
    }
  }

  return query;
};

// GET /api/admin/teams
// Fetch all teams with pagination, search, and filters
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const Registration = mongoose.model('Registration');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filters
    const query = await buildTeamQuery(req.query);
    
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

// GET /api/admin/teams/export-selection-template
// Export filtered teams in Selection Import format
router.get('/export-selection-template', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const Registration = mongoose.model('Registration');
    const query = await buildTeamQuery(req.query);
    
    // Fetch all matching without pagination
    const teams = await Registration.find(query).lean();
    
    // Format to match exactly the Selection_Import_Template.xlsx
    const exportData = teams.map(team => ({
      'Registration ID': team.registrationId,
      'Team Name': team.teamName,
      'Team Leader': team.leaderName,
      'Leader Email': team.leaderEmail,
      'Institute': team.instituteName,
      'PS Number': team.psid,
      'PS Title': team.psTitle,
      'Theme': team.theme || '',
      'Evaluation Round': '',
      'Selection Status': '',
      'Evaluation Remarks': '',
      'Internal Notes': ''
    }));

    // Generate Excel
    const worksheet = xlsx.utils.json_to_sheet(exportData.length ? exportData : [{
      'Registration ID': '', 'Team Name': '', 'Team Leader': '', 'Leader Email': '',
      'Institute': '', 'PS Number': '', 'PS Title': '', 'Theme': '',
      'Evaluation Round': '', 'Selection Status': '', 'Evaluation Remarks': '', 'Internal Notes': ''
    }]);
    
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Template');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="Selection_Import_Template.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Error exporting teams template:', error);
    res.status(500).json({ success: false, message: 'Failed to export template' });
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
    
    // Trigger email if verificationStatus changed to verified or flagged
    if (verificationStatus === 'verified' || verificationStatus === 'flagged') {
      queueVerificationEmail(
        team.leaderEmail, 
        team.leaderName, 
        team.teamName, 
        team.registrationId, 
        verificationStatus, 
        adminRemarks
      );
    }
    
    res.json({ success: true, data: team });
  } catch (error) {
    console.error('Error updating team status:', error);
    res.status(500).json({ success: false, message: 'Failed to update team status' });
  }
});

module.exports = router;
