const File = require('../models/File');
const storage = require('./storage');

// Unified file lifecycle helpers for private local storage (UPLOAD_DIR).
//
// Every artifact is represented by a File document (ownerRef + field +
// storageKey + category) and a byte blob under the storage root. These helpers
// enforce the required replacement ordering and failure semantics:
//
//   1. validate the new file      -> done by the image/pdf/archive processors
//   2. process it                 -> done by the processors
//   3. save the new file          -> done by the processors (storage.saveFile)
//   4. update MongoDB             -> registration save, then File docs inserted
//   5. only then delete old file  -> old File docs + old bytes removed last
//
// If the MongoDB update fails the newly-created files are removed and the old
// files are kept. If deleting an old file fails after a successful replacement
// the database update is NOT rolled back and the orphan is logged clearly.

function buildFileDoc(result, ownerRef) {
  const doc = {
    ownerType: 'registration',
    ownerRef,
    field: result.field,
    storageKey: result.storageKey,
    category: result.category,
    originalName: result.originalName,
    mimeType: result.mimeType,
    size: result.size,
    sha256: result.sha256,
    uploadedBy: { type: 'public' },
  };
  if (result.category === 'image') {
    doc.image = { width: result.width, height: result.height, format: result.format };
    doc.processed = { status: 'done', tool: 'sharp' };
  } else if (result.category === 'pdf') {
    doc.processed = result.processed || { status: 'done', tool: 'qpdf' };
  } else {
    doc.processed = result.processed || { status: 'done', tool: 'archive' };
  }
  return doc;
}

function logOrphanedFile(storageKey, ownerRef, reason, err) {
  console.error(
    `[OrphanedFile] storageKey="${storageKey}" ownerRef=${ownerRef} ${reason}. ` +
    `The database record is committed, but the file bytes may remain on disk. ` +
    `Cause: ${err ? err.message : 'unknown'}`
  );
}

// Syncs a registration's File documents to a freshly processed set of results
// (imageResults / pdfResults / archivedResults). If the registration already
// had File docs, they are superseded and removed only AFTER the new docs are
// committed.
//
// Returns { inserted, replaced }. Throws only when the new-metadata insert
// fails — in that case the newly created docs and bytes are removed and the
// old docs/bytes are left untouched (requirement: keep old, remove new).
async function syncRegistrationFiles(ownerRef, { imageResults = [], pdfResults = [], archivedResults = [] } = {}) {
  const newDocs = [
    ...imageResults.map((r) => buildFileDoc(r, ownerRef)),
    ...pdfResults.map((r) => buildFileDoc(r, ownerRef)),
    ...archivedResults.map((r) => buildFileDoc(r, ownerRef)),
  ];
  const oldDocs = await File.find({ ownerRef, ownerType: 'registration' }).select('_id storageKey').lean();
  const inserted = [];

  // Nothing to commit: leave any existing docs untouched.
  if (!newDocs.length) return { inserted, replaced: 0 };

  // 4a. Insert the new File docs (the MongoDB update that references the new files).
  try {
    for (const doc of newDocs) {
      inserted.push(await File.create(doc));
    }
  } catch (err) {
    // MongoDB update failed: keep old files, remove the newly-created files.
    await rollbackNewDocs(inserted);
    throw err;
  }

  if (!oldDocs.length) return { inserted, replaced: 0 };

  // 5. Update MongoDB, only then delete the old files.
  let oldDocsRemoved = true;
  try {
    await File.deleteMany({ _id: { $in: oldDocs.map((d) => d._id) } });
  } catch (err) {
    oldDocsRemoved = false;
    // Do NOT roll back the committed replacement; keep old docs+bytes intact.
    console.error(
      `[OrphanedFile] Could not remove superseded File documents for ownerRef=${ownerRef}: ${err.message}`
    );
  }

  if (oldDocsRemoved) {
    for (const d of oldDocs) {
      try {
        await storage.deleteFile(d.storageKey);
      } catch (err) {
        // Old byte deletion failed after a successful replacement: the DB stays
        // updated and the orphan is logged clearly (no rollback).
        logOrphanedFile(d.storageKey, ownerRef, 'replaced file could not be deleted', err);
      }
    }
  }

  return { inserted, replaced: oldDocs.length };
}

// Removes the File docs + bytes that were just committed by a failed
// replacement. Only the bytes for docs that were ACTUALLY inserted are touched,
// so a failed insert can never delete bytes owned by another record (the caller
// route's catch block handles any freshly-processed bytes of the failed doc).
async function rollbackNewDocs(inserted) {
  if (!inserted.length) return;
  await File.deleteMany({ _id: { $in: inserted.map((d) => d._id) } }).catch(() => {});
  for (const d of inserted) {
    await storage.deleteFile(d.storageKey).catch(() => {});
  }
}

// Safely deletes the File docs + bytes belonging to specific owner records.
// Filtering strictly by ownerRef guarantees one record's deletion can never
// remove another record's file. Missing bytes are ignored; real deletion
// errors are logged (bytes kept) so no DB record is left pointing at a
// partially-deleted artifact.
async function deleteFilesForOwners(ownerRefs, { ownerType } = {}) {
  const refs = Array.isArray(ownerRefs) ? ownerRefs : [ownerRefs];
  const cleaned = refs.filter((r) => r);
  if (!cleaned.length) return { deletedDocs: 0, orphanedBytes: 0, orphanedDocs: 0 };

  const filter = { ownerRef: { $in: cleaned } };
  if (ownerType) filter.ownerType = ownerType;

  const docs = await File.find(filter).select('_id storageKey ownerRef').lean();
  let orphanedBytes = 0;
  let orphanedDocs = 0;

  for (const d of docs) {
    try {
      await storage.deleteFile(d.storageKey);
    } catch (err) {
      orphanedBytes += 1;
      logOrphanedFile(d.storageKey, d.ownerRef, 'file could not be deleted during record cleanup', err);
    }
  }
  if (docs.length) {
    try {
      await File.deleteMany({ _id: { $in: docs.map((d) => d._id) } });
    } catch (err) {
      orphanedDocs = docs.length;
      console.error(`[OrphanedFile] Could not delete File documents during record cleanup: ${err.message}`);
    }
  }
  return { deletedDocs: docs.length, orphanedBytes, orphanedDocs };
}

// Deletes the file artifacts (File docs + bytes) owned by one registration.
async function deleteRegistrationFiles(ownerRef) {
  return deleteFilesForOwners(ownerRef, { ownerType: 'registration' });
}

// Removes bytes + any File docs for results that were processed but never made
// it into a committed registration (rollback on failure). Idempotent.
async function cleanupFileResults({ imageResults = [], pdfResults = [], archivedResults = [] } = {}) {
  const results = [...imageResults, ...pdfResults, ...archivedResults];
  for (const r of results) {
    if (!r || !r.storageKey) continue;
    await File.deleteMany({ storageKey: r.storageKey }).catch(() => {});
    await storage.deleteFile(r.storageKey).catch(() => {});
  }
}

module.exports = {
  buildFileDoc,
  syncRegistrationFiles,
  deleteFilesForOwners,
  deleteRegistrationFiles,
  cleanupFileResults,
};
