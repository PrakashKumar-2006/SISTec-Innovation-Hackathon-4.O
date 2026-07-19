const mongoose = require('mongoose');

const adminAuditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['Login', 'Account Creation', 'Role Change', 'Password Reset', 'Status Change', 'Account Deletion']
  },
  targetAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  }
}, { timestamps: true });

// Create indexes for efficient querying
adminAuditLogSchema.index({ adminId: 1, createdAt: -1 });
adminAuditLogSchema.index({ targetAdminId: 1, createdAt: -1 });
adminAuditLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('AdminAuditLog', adminAuditLogSchema);
