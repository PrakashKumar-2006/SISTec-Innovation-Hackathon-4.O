const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Selection = require('../models/Selection');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const multer = require('multer');
const xlsx = require('xlsx');
const { queueSelectionEmail } = require('../server'); // We exported queueSelectionEmail in server.js

// Configure multer for memory storage (for Excel parsing)
const upload = multer({ storage: multer.memoryStorage() });

// Protected Routes
router.use(authMiddleware);

// GET /api/admin/selections
router.get('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
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
    if (req.query.theme && req.query.theme !== 'All') {
      query.theme = req.query.theme;
    }
    if (req.query.evaluationRound && req.query.evaluationRound !== 'All') {
      query.evaluationRound = req.query.evaluationRound;
    }
    if (req.query.selectionStatus && req.query.selectionStatus !== 'All') {
      query.selectionStatus = req.query.selectionStatus;
    }
    if (req.query.isPublished !== undefined && req.query.isPublished !== 'All') {
      query.isPublished = req.query.isPublished === 'true';
    }
    
    // Sort
    let sort = {};
    if (req.query.sortField) {
      sort[req.query.sortField] = req.query.sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    const [selections, total] = await Promise.all([
      Selection.find(query)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Selection.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: selections,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching selections:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/selections/export
router.get('/export', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const selections = await Selection.find({}).lean();
    
    const excelData = selections.map(s => ({
      'Registration ID': s.registrationId || '',
      'Team Name': s.teamName || '',
      'Team Leader': s.leaderName || '',
      'Leader Email': s.leaderEmail || '',
      'Institute': s.instituteName || '',
      'PS Number': s.psNumber || '',
      'PS Title': s.psTitle || '',
      'Theme': s.theme || '',
      'Evaluation Round': s.evaluationRound || '',
      'Selection Status': s.selectionStatus || '',
      'Evaluation Remarks': s.evaluationRemarks || '',
      'Internal Notes': s.internalNotes || '',
      'Published': s.isPublished ? 'Yes' : 'No'
    }));

    const worksheet = xlsx.utils.json_to_sheet(excelData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Selections');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="Selections.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Error exporting selections:', error);
    res.status(500).json({ success: false, message: 'Error exporting data' });
  }
});

// GET /api/admin/selections/template
router.get('/template', roleMiddleware(['Super Admin', 'Admin']), (req, res) => {
  try {
    const templateData = [{
      'Registration ID': 'SIH4-TEST123',
      'Team Name': 'Test Team',
      'Team Leader': 'John Doe',
      'Leader Email': 'leader@example.com',
      'Institute': 'SISTec',
      'PS Number': 'SIH1234',
      'PS Title': 'Smart Waste Management',
      'Theme': 'Smart Automation',
      'Evaluation Round': 'PPT Evaluation',
      'Selection Status': 'Shortlisted',
      'Evaluation Remarks': 'Excellent concept',
      'Internal Notes': 'Needs to improve UI'
    }];
    
    const worksheet = xlsx.utils.json_to_sheet(templateData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Template');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="Selection_Import_Template.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error('Error downloading template:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/selections/import
router.post('/import', roleMiddleware(['Super Admin', 'Admin']), upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data || data.length === 0) {
      return res.status(400).json({ success: false, message: 'Excel file is empty' });
    }

    const errors = [];
    const validSelections = [];
    const existingRegistrationRoundCombo = new Set();
    const existingSelectionsInDB = await Selection.find({}, 'registrationId evaluationRound').lean();
    
    // Create a Set of existing records in DB to prevent duplicates in DB
    existingSelectionsInDB.forEach(s => {
      existingRegistrationRoundCombo.add(`${s.registrationId}_${s.evaluationRound}`);
    });

    data.forEach((row, index) => {
      const rowNum = index + 2; // +1 for 0-index, +1 for header
      
      const registrationId = row['Registration ID'];
      const teamName = row['Team Name'];
      const leaderName = row['Team Leader'];
      const leaderEmail = row['Leader Email'];
      const instituteName = row['Institute'];
      const psNumber = row['PS Number'];
      const psTitle = row['PS Title'];
      const theme = row['Theme'];
      const evaluationRound = row['Evaluation Round'];
      const selectionStatus = row['Selection Status'];
      
      let rowErrors = [];

      if (!registrationId) rowErrors.push('Missing Registration ID');
      if (!teamName) rowErrors.push('Missing Team Name');
      if (!leaderName) rowErrors.push('Missing Team Leader');
      if (!leaderEmail) rowErrors.push('Missing Leader Email');
      if (!instituteName) rowErrors.push('Missing Institute');
      if (!psNumber) rowErrors.push('Missing PS Number');
      if (!psTitle) rowErrors.push('Missing PS Title');
      if (!theme) rowErrors.push('Missing Theme');
      
      if (!evaluationRound) {
        rowErrors.push('Missing Evaluation Round');
      } else if (!['PPT Evaluation', 'Offline Round', 'Grand Finale'].includes(evaluationRound)) {
        rowErrors.push('Invalid Evaluation Round');
      }

      if (!selectionStatus) {
        rowErrors.push('Missing Selection Status');
      } else if (!['Draft', 'Shortlisted', 'Not Shortlisted'].includes(selectionStatus)) {
        rowErrors.push('Invalid Selection Status');
      }

      if (rowErrors.length > 0) {
        errors.push({ row: rowNum, errors: rowErrors });
        return;
      }

      const comboKey = `${registrationId}_${evaluationRound}`;
      if (existingRegistrationRoundCombo.has(comboKey)) {
        errors.push({ row: rowNum, errors: [`Duplicate: Team ${registrationId} is already recorded for ${evaluationRound}`] });
        return;
      }

      existingRegistrationRoundCombo.add(comboKey); // Track within current file to avoid dupes in same excel
      
      validSelections.push({
        registrationId,
        teamName,
        leaderName,
        leaderEmail,
        instituteName,
        psNumber,
        psTitle,
        theme,
        evaluationRound,
        selectionStatus,
        evaluationRemarks: row['Evaluation Remarks'] || '',
        internalNotes: row['Internal Notes'] || '',
        isPublished: false,
        createdBy: req.admin.id,
        updatedBy: req.admin.id
      });
    });

    if (validSelections.length > 0) {
      await Selection.insertMany(validSelections);
    }

    res.json({
      success: true,
      message: `Imported ${validSelections.length} teams. ${errors.length} errors.`,
      errors: errors.length > 0 ? errors : undefined,
      insertedCount: validSelections.length
    });

  } catch (error) {
    console.error('Error importing selections:', error);
    res.status(500).json({ success: false, message: 'Error parsing Excel file' });
  }
});

// GET /api/admin/selections/:id
router.get('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), async (req, res) => {
  try {
    const selection = await Selection.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    
    if (!selection) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: selection });
  } catch (error) {
    console.error('Error fetching selection:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/selections
router.post('/', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    // Basic dup check
    const existing = await Selection.findOne({ 
      registrationId: req.body.registrationId, 
      evaluationRound: req.body.evaluationRound 
    });
    
    if (existing) {
      return res.status(400).json({ success: false, message: `Team already recorded for ${req.body.evaluationRound}` });
    }

    const selection = new Selection({
      ...req.body,
      createdBy: req.admin.id,
      updatedBy: req.admin.id
    });
    
    await selection.save();
    res.status(201).json({ success: true, data: selection });
  } catch (error) {
    console.error('Error creating selection:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/selections/:id
router.put('/:id', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const selection = await Selection.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.admin.id
      },
      { new: true, runValidators: true }
    );
    
    if (!selection) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: selection });
  } catch (error) {
    console.error('Error updating selection:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/selections/:id
router.delete('/:id', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const selection = await Selection.findByIdAndDelete(req.params.id);
    if (!selection) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting selection:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/selections/bulk-publish
router.post('/bulk-publish', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const { selectionIds } = req.body;
    if (!Array.isArray(selectionIds) || selectionIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No selections provided' });
    }

    const selections = await Selection.find({ _id: { $in: selectionIds }, isPublished: false });
    
    if (selections.length === 0) {
      return res.status(400).json({ success: false, message: 'No draft selections found to publish' });
    }

    const updatedIds = selections.map(s => s._id);

    await Selection.updateMany(
      { _id: { $in: updatedIds } },
      { 
        $set: { 
          isPublished: true, 
          publishedAt: new Date(),
          updatedBy: req.admin.id 
        } 
      }
    );

    // Queue emails asynchronously
    for (const selection of selections) {
      const isShortlisted = selection.selectionStatus === 'Shortlisted';
      // Do not send emails if status is Draft or something unexpected
      if (['Shortlisted', 'Not Shortlisted'].includes(selection.selectionStatus)) {
        // Enqueue to EmailQueue in the background
        queueSelectionEmail(selection, isShortlisted);
      }
    }

    res.json({ success: true, message: `Successfully published ${updatedIds.length} teams and queued notification emails.` });
  } catch (error) {
    console.error('Error in bulk-publish:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/selections/bulk-unpublish
router.post('/bulk-unpublish', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const { selectionIds } = req.body;
    if (!Array.isArray(selectionIds) || selectionIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No selections provided' });
    }

    await Selection.updateMany(
      { _id: { $in: selectionIds } },
      { 
        $set: { 
          isPublished: false, 
          publishedAt: null,
          updatedBy: req.admin.id 
        } 
      }
    );

    res.json({ success: true, message: `Successfully unpublished teams.` });
  } catch (error) {
    console.error('Error in bulk-unpublish:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/admin/selections/bulk-delete
router.post('/bulk-delete', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const { selectionIds } = req.body;
    if (!Array.isArray(selectionIds) || selectionIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No selections provided' });
    }

    await Selection.deleteMany({ _id: { $in: selectionIds } });

    res.json({ success: true, message: `Successfully deleted teams.` });
  } catch (error) {
    console.error('Error in bulk-delete:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
