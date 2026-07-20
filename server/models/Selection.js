const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema({
  registrationReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    // Not required because admin might import without linking immediately,
    // though linking is preferred.
  },
  registrationId: {
    type: String,
    required: true,
    trim: true,
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  leaderName: {
    type: String,
    required: true,
    trim: true,
  },
  leaderEmail: {
    type: String,
    required: true,
    trim: true,
  },
  instituteName: {
    type: String,
    required: true,
    trim: true,
  },
  psNumber: {
    type: String,
    required: true,
    trim: true,
  },
  psTitle: {
    type: String,
    required: true,
    trim: true,
  },
  theme: {
    type: String,
    required: true,
    trim: true,
  },
  evaluationRound: {
    type: String,
    enum: ['PPT Evaluation', 'Offline Round', 'Grand Finale'],
    default: 'PPT Evaluation',
    required: true,
  },
  selectionStatus: {
    type: String,
    enum: ['Draft', 'Shortlisted', 'Not Shortlisted'],
    default: 'Draft',
    required: true,
  },
  evaluationRemarks: {
    type: String,
    default: '',
    trim: true,
  },
  internalNotes: {
    type: String,
    default: '',
    trim: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  }
}, { timestamps: true });

// Ensure a single team doesn't have duplicate selection records for the same round (optional, but good practice)
// This will prevent multiple imports from creating duplicate records for the same team + round
selectionSchema.index({ registrationId: 1, evaluationRound: 1 }, { unique: true });

module.exports = mongoose.model('Selection', selectionSchema);
