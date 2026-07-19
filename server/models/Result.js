const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  problemStatement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProblemStatement',
    required: true
  },
  rank: {
    type: String,
    enum: ['1st', '2nd', '3rd', 'Runner-up', 'Consolation', 'Participation'],
    required: true
  },
  prizeTitle: {
    type: String,
    required: true
  },
  prizeAmount: {
    type: String, // String to handle values like "$10,000" or "10000 INR"
    default: ''
  },
  remarks: {
    type: String,
    default: ''
  },
  attachments: [{
    type: String // URLs to images/documents
  }],
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  publishedAt: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
