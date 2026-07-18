const mongoose = require('mongoose');

const changeRequestSchema = new mongoose.Schema({
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  currentPsid: {
    type: String,
    required: true
  },
  requestedPsid: {
    type: String,
    required: true
  },
  requestedPsTitle: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  adminRemarks: {
    type: String,
    default: ''
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  reviewedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('ChangeRequest', changeRequestSchema);
