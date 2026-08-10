const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const crypto = require('crypto');

const SERVER_DIR = path.join(__dirname, '..');

const CATEGORY_DIRS = ['images', 'pdfs', 'documents'];

// Storage root resolution:
//  - UPLOAD_DIR set + absolute  -> used verbatim (e.g. /var/lib/sih/storage on the VPS)
//  - UPLOAD_DIR set + relative  -> resolved against server/ (cwd-independent, portable)
//  - UPLOAD_DIR unset           -> defaults to server/storage
function resolveRoot() {
  const configured = process.env.UPLOAD_DIR;
  if (!configured || !configured.trim()) {
    return path.join(SERVER_DIR, 'storage');
  }
  const trimmed = configured.trim();
  return path.isAbsolute(trimmed)
    ? path.normalize(trimmed)
    : path.resolve(SERVER_DIR, trimmed);
}

const root = resolveRoot();

function isPathInside(parent, target) {
  const rel = path.relative(parent, target);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

// Normalizes a storageKey and rejects anything unsafe: absolute paths,
// drive letters, null bytes, ".." segments, empty/current-directory segments.
function sanitizeStorageKey(storageKey) {
  if (typeof storageKey !== 'string' || !storageKey.trim()) {
    throw new Error('Invalid storage key: must be a non-empty relative path.');
  }
  const normalized = storageKey.replace(/\\/g, '/');
  if (normalized.includes('\0')) {
    throw new Error('Invalid storage key: contains a null byte.');
  }
  if (normalized.startsWith('/')) {
    throw new Error('Invalid storage key: must be relative to the storage root.');
  }
  if (/^[a-zA-Z]:\//.test(normalized)) {
    throw new Error('Invalid storage key: absolute drive paths are not allowed.');
  }
  const parts = normalized.split('/');
  if (parts.some((p) => p === '..')) {
    throw new Error('Invalid storage key: path traversal is not allowed.');
  }
  if (parts.some((p) => p === '' || p === '.')) {
    throw new Error('Invalid storage key: empty or current-directory segments are not allowed.');
  }
  return parts.join(path.sep);
}

function getRoot() {
  return root;
}

function getCategoryDir(category) {
  if (!CATEGORY_DIRS.includes(category)) {
    throw new Error(`Invalid storage category "${category}". Allowed: ${CATEGORY_DIRS.join(', ')}.`);
  }
  return path.join(root, category);
}

// Cryptographically random, non-guessable filename. The original client
// filename is intentionally NOT used on disk.
function generateFileName(ext = '') {
  const rawExt = String(ext || '').trim().toLowerCase();
  const suffix = rawExt ? (rawExt.startsWith('.') ? rawExt : `.${rawExt}`) : '';
  return `${crypto.randomBytes(16).toString('hex')}${suffix}`;
}

// Relative, portable storage key: <category>/<yyyy>/<mm>/<random>.<ext>
// e.g. "images/2026/08/<hex>.webp" or "pdfs/2026/08/<hex>.pdf"
function generateStorageKey(category, ext = '') {
  if (!CATEGORY_DIRS.includes(category)) {
    throw new Error(`Invalid storage category "${category}". Allowed: ${CATEGORY_DIRS.join(', ')}.`);
  }
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${category}/${yyyy}/${mm}/${generateFileName(ext)}`;
}

// Resolves a validated relative key to an absolute path inside the root.
// Throws if the key escapes the storage root.
function resolveStorageKey(storageKey) {
  const safe = sanitizeStorageKey(storageKey);
  const abs = path.resolve(root, safe);
  if (!isPathInside(root, abs)) {
    throw new Error('Invalid storage key: resolves outside the storage root.');
  }
  return abs;
}

// Creates the storage tree on boot: root + images/ + pdfs/ + documents/ + tmp/.
async function ensureDirectories() {
  const dirs = [root, path.join(root, 'tmp'), ...CATEGORY_DIRS.map((d) => path.join(root, d))];
  for (const dir of dirs) {
    await fsp.mkdir(dir, { recursive: true });
  }
  return root;
}

// Writes data to <storageKey> atomically (write to sibling temp, then rename).
async function saveFile(storageKey, data) {
  const abs = resolveStorageKey(storageKey);
  await fsp.mkdir(path.dirname(abs), { recursive: true });
  const staging = `${abs}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  await fsp.writeFile(staging, data);
  await fsp.rename(staging, abs);
  return storageKey;
}

async function readFile(storageKey, { encoding } = {}) {
  const abs = resolveStorageKey(storageKey);
  return fsp.readFile(abs, encoding);
}

function createReadStream(storageKey) {
  const abs = resolveStorageKey(storageKey);
  return fs.createReadStream(abs);
}

// Returns true if the file existed and was removed.
async function deleteFile(storageKey) {
  const abs = resolveStorageKey(storageKey);
  try {
    await fsp.unlink(abs);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

async function exists(storageKey) {
  const abs = resolveStorageKey(storageKey);
  try {
    await fsp.access(abs);
    return true;
  } catch (_) {
    return false;
  }
}

async function getFileInfo(storageKey) {
  const abs = resolveStorageKey(storageKey);
  return fsp.stat(abs);
}

// Keeps only the basename and strips control characters, so the original
// client filename can be preserved safely as metadata / download name.
function safeOriginalName(name) {
  if (typeof name !== 'string') return '';
  const base = path.basename(name).replace(/[\x00-\x1f\x7f]/g, '').trim();
  return base && base !== '.' && base !== '..' ? base : '';
}

function computeChecksum(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = {
  root,
  getRoot,
  CATEGORY_DIRS,
  ensureDirectories,
  getCategoryDir,
  generateFileName,
  generateStorageKey,
  resolveStorageKey,
  sanitizeStorageKey,
  saveFile,
  readFile,
  createReadStream,
  deleteFile,
  exists,
  getFileInfo,
  safeOriginalName,
  computeChecksum,
};
