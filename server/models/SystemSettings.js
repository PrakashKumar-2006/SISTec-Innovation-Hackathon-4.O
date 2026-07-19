const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  // Singleton enforcer
  singletonId: {
    type: String,
    default: 'singleton',
    unique: true
  },
  
  general: {
    orgName: { type: String, default: 'SISTec-R' },
    portalName: { type: String, default: 'SIH 4.0 Admin Portal' },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    supportEmail: { type: String, default: 'support@sih.gov.in' },
    contactPhone: { type: String, default: '+91-1234567890' },
    footerText: { type: String, default: '© 2026 SISTec-R. All rights reserved.' }
  },

  email: {
    senderName: { type: String, default: 'SIH Admin' },
    replyToAddress: { type: String, default: 'no-reply@sih.gov.in' },
    emailSignature: { type: String, default: 'Best Regards,\nSIH 4.0 Admin Team' }
  },

  security: {
    sessionTimeoutMinutes: { type: Number, default: 480 }, // 8 hours
    passwordExpiryDays: { type: Number, default: 90 },
    maxLoginAttempts: { type: Number, default: 5 },
    accountLockoutMinutes: { type: Number, default: 15 }
  },

  application: {
    defaultPaginationSize: { type: Number, default: 10 },
    dashboardRefreshIntervalSeconds: { type: Number, default: 60 },
    defaultTimeZone: { type: String, default: 'Asia/Kolkata' },
    dateFormat: { type: String, default: 'MMM dd, yyyy' }
  },

  maintenance: {
    isMaintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: 'The system is currently undergoing scheduled maintenance. Please try again later.' }
  }
}, { timestamps: true });

// Prevent multiple documents
systemSettingsSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('SystemSettings').countDocuments();
    if (count > 0) {
      return next(new Error('Only one SystemSettings document can exist.'));
    }
  }
  next();
});

// Helper to get or create the singleton instance
systemSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne({ singletonId: 'singleton' });
  if (!settings) {
    settings = await this.create({ singletonId: 'singleton' });
  }
  return settings;
};

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
