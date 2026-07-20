const mongoose = require('mongoose');

const replyHistorySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  adminEmail: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['General Inquiry', 'Registration Support', 'Payment Related Query', 'Technical Issue', 'Certificate / Result Query', 'Other'],
    default: 'General Inquiry'
  },
  registrationCode: {
    type: String,
    trim: true
  },
  teamName: {
    type: String,
    trim: true
  },
  leaderName: {
    type: String,
    trim: true
  },
  leaderEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  transactionId: {
    type: String,
    trim: true
  },
  paymentReference: {
    type: String,
    trim: true
  },
  browser: {
    type: String,
    trim: true
  },
  device: {
    type: String,
    trim: true
  },
  issueType: {
    type: String,
    trim: true
  },
  attachments: [{
    type: String
  }],
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['Unread', 'In Progress', 'Resolved', 'Closed'],
    default: 'Unread'
  },
  replyHistory: [replyHistorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
