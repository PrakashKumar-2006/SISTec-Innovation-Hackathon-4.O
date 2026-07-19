const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Administrator'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Admin', 'Moderator', 'Reviewer', 'Viewer'],
    default: 'Viewer',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  lastLogin: {
    timestamp: { type: Date },
    ipAddress: { type: String }
  }
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
