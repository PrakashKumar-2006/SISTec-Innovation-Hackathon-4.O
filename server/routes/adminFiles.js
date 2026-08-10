const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const File = require('../models/File');
const storage = require('../utils/storage');
const { maintenanceMiddleware } = require('../middleware/maintenance');

const router = express.Router();

const ADMIN_ROLES = ['Super Admin', 'Admin', 'Moderator', 'Viewer'];

// Auth is handled here (rather than via authMiddleware) so the token can be
// supplied through the Authorization header OR the ?token= query string —
// plain <a href> clicks from the admin dashboard cannot attach headers.
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = (authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]) || req.query.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');
    if (!ADMIN_ROLES.includes(decoded.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }
    req.admin = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

router.use(authenticateAdmin);
router.use(maintenanceMiddleware);

// Header-safe filename: strips control chars and anything that would break the
// Content-Disposition header value.
const headerSafeName = (name) =>
  String(name || '')
    .replace(/[\x00-\x1f\x7f"\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// GET /api/admin/files/:fileId
// Streams an archived file to an authenticated admin. The file is located by its
// MongoDB File document _id; the storage key is resolved server-side against the
// storage root, so a raw filesystem path is never accepted from the client and
// path traversal is impossible. Images and PDFs are served inline (browser
// preview / open), everything else downloads as an attachment.
router.get('/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!mongoose.isValidObjectId(fileId)) {
    return res.status(400).json({ success: false, message: 'Invalid file ID.' });
  }

  // Retrieve metadata from MongoDB. Only the stored record decides which file
  // is served — the client never supplies a path.
  let file;
  try {
    file = await File.findById(fileId).lean();
  } catch (err) {
    console.error('[Files] Failed to load metadata for', fileId, ':', err.message);
    return res.status(500).json({ success: false, message: 'Failed to retrieve file metadata.' });
  }
  if (!file) {
    return res.status(404).json({ success: false, message: 'File not found.' });
  }

  // Resolve the stored relative key against the storage root. resolveStorageKey
  // rejects absolute paths, drive letters, null bytes, empty segments and "..".
  let abs;
  try {
    abs = storage.resolveStorageKey(file.storageKey);
  } catch (err) {
    console.error('[Files] Invalid storage key on file', fileId, ':', err.message);
    return res.status(400).json({ success: false, message: 'Invalid file key.' });
  }

  // Verify the file exists on disk.
  let stat;
  try {
    stat = await fs.promises.stat(abs);
  } catch (err) {
    return res.status(404).json({ success: false, message: 'File not found.' });
  }
  if (!stat.isFile()) {
    return res.status(404).json({ success: false, message: 'File not found.' });
  }

  const mimeType = file.mimeType || 'application/octet-stream';
  const isInline = mimeType.startsWith('image/') || mimeType === 'application/pdf';
  const displayName = headerSafeName(storage.safeOriginalName(file.originalName)) || 'file';

  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Disposition', `${isInline ? 'inline' : 'attachment'}; filename="${displayName}"`);

  const stream = storage.createReadStream(file.storageKey);
  stream.on('error', () => {
    if (!res.headersSent) res.status(500).end();
    else res.destroy();
  });
  stream.pipe(res);
});

module.exports = router;
