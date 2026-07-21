const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const ProblemStatement = require('../models/ProblemStatement');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Multer memory storage for Excel parsing
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

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
    
    const updated = await ProblemStatement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.admin.id },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating problem statement:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// DELETE /api/admin/problems/:id
// Delete problem statement
router.delete('/:id', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const deleted = await ProblemStatement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }
    res.json({ success: true, message: 'Problem Statement deleted successfully' });
  } catch (error) {
    console.error('Error deleting problem statement:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// PATCH /api/admin/problems/:id/status
// Toggle status (Active/Inactive)
router.patch('/:id/status', roleMiddleware(['Super Admin', 'Admin', 'Moderator']), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const updated = await ProblemStatement.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.admin.id },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Problem Statement not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/admin/problems/export/excel
// Export to excel
router.get('/export/excel', roleMiddleware(['Super Admin', 'Admin']), async (req, res) => {
  try {
    const problems = await ProblemStatement.find().lean();
    
    const formattedData = problems.map(ps => ({
      'PS Number': ps.psNumber,
      'Title': ps.title,
      'Organization': ps.org,
      'Category': ps.category,
      'Domain': ps.domain,
      'Description': ps.detailedDescription,
      'Tech Stack': ps.techStack || '',
      'Status': ps.status
    }));

    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Problem Statements');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.set({
      'Content-Disposition': 'attachment; filename=problem_statements.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    res.send(buffer);
  } catch (error) {
    console.error('Error exporting problems:', error);
    res.status(500).json({ success: false, message: 'Failed to export data' });
  }
});

// GET /api/admin/problems/export/template
// Download import template
router.get('/export/template', roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']), (req, res) => {
  try {
    const templateData = [{
      'PS Number': 'PS001',
      'Title': 'AI-based Smart Attendance System',
      'Organization': 'Ministry of Education',
      'Category': 'Software',
      'Domain': 'Artificial Intelligence',
      'Description': 'Develop an AI-based system to accurately identify students...',
      'Tech Stack': 'React, Python, OpenCV',
      'Status': 'Active'
    }];

    const worksheet = xlsx.utils.json_to_sheet(templateData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Template');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.set({
      'Content-Disposition': 'attachment; filename=problem_statements_template.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    res.send(buffer);
  } catch (error) {
    console.error('Error generating template:', error);
    res.status(500).json({ success: false, message: 'Failed to generate template' });
  }
});

// POST /api/admin/problems/import
// Import from Excel
router.post('/import', roleMiddleware(['Super Admin', 'Admin']), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (data.length === 0) {
      return res.status(400).json({ success: false, message: 'Uploaded file is empty' });
    }

    const errors = [];
    const bulkOps = [];
    const validCategories = ['Software', 'Hardware', 'Hardware/Software', 'Other'];
    const validStatuses = ['Active', 'Inactive'];

    data.forEach((row, index) => {
      const rowNum = index + 2; // +1 for 0-index, +1 for header row
      
      const psNumber = row['PS Number']?.toString().trim();
      const title = row['Title']?.toString().trim();
      const org = row['Organization']?.toString().trim();
      const category = row['Category']?.toString().trim() || 'Software';
      const domain = row['Domain']?.toString().trim();
      const description = row['Description']?.toString().trim();
      const techStack = row['Tech Stack']?.toString().trim();
      const status = row['Status']?.toString().trim() || 'Active';

      if (!psNumber) errors.push(`Row ${rowNum}: PS Number is missing`);
      if (!title) errors.push(`Row ${rowNum}: Title is missing`);
      if (!org) errors.push(`Row ${rowNum}: Organization is missing`);
      if (!domain) errors.push(`Row ${rowNum}: Domain is missing`);
      if (!description) errors.push(`Row ${rowNum}: Description is missing`);
      if (!validCategories.includes(category)) errors.push(`Row ${rowNum}: Invalid Category (${category})`);
      if (!validStatuses.includes(status)) errors.push(`Row ${rowNum}: Invalid Status (${status})`);

      if (psNumber && title && org && domain && description && validCategories.includes(category) && validStatuses.includes(status)) {
        bulkOps.push({
          updateOne: {
            filter: { psNumber },
            update: {
              $set: {
                title,
                org,
                category,
                domain,
                detailedDescription: description,
                techStack,
                status,
                updatedBy: req.admin.id
              },
              $setOnInsert: {
                psNumber,
                createdBy: req.admin.id
              }
            },
            upsert: true
          }
        });
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for some rows',
        errors
      });
    }

    if (bulkOps.length > 0) {
      const result = await ProblemStatement.bulkWrite(bulkOps);
      res.json({
        success: true,
        message: 'Import successful',
        data: {
          inserted: result.upsertedCount,
          updated: result.modifiedCount
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'No valid data to import' });
    }

  } catch (error) {
    console.error('Error importing problems:', error);
    res.status(500).json({ success: false, message: 'Failed to process import file' });
  }
});

module.exports = router;
