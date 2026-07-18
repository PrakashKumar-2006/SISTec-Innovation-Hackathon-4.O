const mongoose = require('mongoose');

const problemStatementSchema = new mongoose.Schema({
  psNumber: {
    type: String,
    required: [true, 'Problem Statement ID (psNumber) is required'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  title: {
    type: String,
    required: [true, 'Problem Statement title is required'],
    trim: true,
  },
  org: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Software', 'Hardware', 'Hardware/Software', 'Other'],
    default: 'Software'
  },
  domain: {
    type: String,
    required: [true, 'Domain bucket is required'],
    trim: true,
  },
  detailedDescription: {
    type: String,
    required: [true, 'Detailed description is required'],
  },
  techStack: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }
}, { timestamps: true });

// Optional: Add text index for robust searching if needed later
// problemStatementSchema.index({ title: 'text', org: 'text', detailedDescription: 'text' });

module.exports = mongoose.model('ProblemStatement', problemStatementSchema);
