/**
 * scripts/migrate-indexes.js
 * ─────────────────────────────────────────────────────────────────────────────
 * PHASE 4: Safe one-time MongoDB index migration script.
 *
 * Purpose:
 *   Run this script ONCE manually when you need to rename, drop, or recreate
 *   indexes on existing collections. This avoids the race condition caused by
 *   putting dropIndex() calls inside server.js startup (which all N instances
 *   would race to execute simultaneously on boot).
 *
 * Usage:
 *   node server/scripts/migrate-indexes.js
 *
 * Safety:
 *   - Each operation is wrapped in try/catch and ignores "index not found" /
 *     "namespace not found" errors, making the script fully idempotent.
 *   - The script exits with code 0 on success and code 1 on unexpected error.
 *   - NEVER import or call this from server.js — it is standalone only.
 *
 * When to use:
 *   - Dropping an old non-sparse unique index to recreate it as sparse
 *   - Renaming compound indexes after a schema refactor
 *   - Bulk-removing stale/unused indexes to reduce write overhead
 */

'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sih_registrations';

/**
 * Safely drops an index on a collection, ignoring "not found" errors.
 * Returns true if dropped, false if it didn't exist, throws on real errors.
 */
async function safeDropIndex(collection, indexName) {
  try {
    await collection.dropIndex(indexName);
    console.log(`  ✓ Dropped index "${indexName}" on "${collection.collectionName}"`);
    return true;
  } catch (err) {
    // 26  = NamespaceNotFound (collection doesn't exist yet)
    // 27  = IndexNotFound
    if (err.code === 26 || err.code === 27 || err.codeName === 'IndexNotFound') {
      console.log(`  ─ Index "${indexName}" on "${collection.collectionName}" not found (already removed or never existed).`);
      return false;
    }
    throw err; // Re-throw unexpected errors
  }
}

async function runMigrations() {
  console.log('\n[MigrateIndexes] Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('[MigrateIndexes] Connected.\n');

  const db = mongoose.connection.db;

  // ─── Migration 1: registrations collection ──────────────────────────────────
  // Dropped in Phase 1 (from server.js startup). Kept here for documentation
  // and for anyone running this script on a pre-Phase-1 database.
  console.log('[Migration 1] registrations — clearing old non-sparse unique indexes...');
  const regsCol = db.collection('registrations');
  await safeDropIndex(regsCol, 'registrationId_1');
  await safeDropIndex(regsCol, 'paymentOrderId_1');
  // Mongoose will recreate these as sparse: true via registrationSchema.index()
  // when the server next starts up.

  // ─── Add future migrations below this line ─────────────────────────────────
  // Example:
  //   console.log('[Migration 2] selections — ...');
  //   const selectionsCol = db.collection('selections');
  //   await safeDropIndex(selectionsCol, 'old_index_name');

  console.log('\n[MigrateIndexes] All migrations completed successfully.');
}

runMigrations()
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n[MigrateIndexes] FATAL ERROR:', err.message);
    mongoose.disconnect();
    process.exit(1);
  });
