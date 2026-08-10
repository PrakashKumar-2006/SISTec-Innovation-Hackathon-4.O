const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    // Who owns the file (Registration doc, Contact doc, or system asset).
    ownerType: {
      type: String,
      enum: ['registration', 'contact', 'system'],
      default: 'registration',
    },
    ownerRef: { type: mongoose.Schema.Types.ObjectId },
    // Which registration/contact field this file belongs to (ideaPpt, consentLetter, paymentScreenshot, attachment, logo, ...).
    field: { type: String },

    // Relative storage key, e.g. "images/2026/08/<hex>.webp" or "pdfs/2026/08/<hex>.pdf".
    // NEVER an absolute filesystem path. The storage module resolves it against UPLOAD_DIR.
    storageKey: { type: String, required: true, unique: true },

    category: { type: String, enum: ['image', 'pdf', 'document'], required: true },

    originalName: { type: String },
    mimeType: { type: String },
    size: { type: Number },
    sha256: { type: String },

    image: {
      width: { type: Number },
      height: { type: Number },
      format: { type: String },
    },

    processed: {
      status: { type: String, enum: ['pending', 'done', 'failed'], default: 'pending' },
      tool: { type: String },
      error: { type: String },
    },

    uploadedBy: {
      type: { type: String, enum: ['public', 'admin'], default: 'public' },
      adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    },
  },
  { timestamps: true }
);

// Lookup pattern: all files belonging to an owner, per field.
fileSchema.index({ ownerRef: 1, field: 1 });

module.exports = mongoose.model('File', fileSchema);
