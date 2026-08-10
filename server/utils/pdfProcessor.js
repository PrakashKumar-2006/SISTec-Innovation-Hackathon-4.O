const path = require('path');
const fsp = require('fs/promises');
const crypto = require('crypto');
const { execFile } = require('child_process');
const storage = require('./storage');

class PdfValidationError extends Error {}
class PdfProcessingError extends Error {}

const PDF_MAGIC = '%PDF-';
const MAGIC_SCAN_BYTES = 1024;
const QPDF_MAX_BUFFER = 16 * 1024 * 1024;

function resolveQpdfBinary() {
  const configured = process.env.QPDF_PATH;
  return configured && configured.trim() ? configured.trim() : 'qpdf';
}

function runQpdf(args) {
  return new Promise((resolve, reject) => {
    execFile(resolveQpdfBinary(), args, { maxBuffer: QPDF_MAX_BUFFER }, (err, stdout, stderr) => {
      if (err && typeof err.code !== 'number') {
        reject(new PdfProcessingError('qpdf is not installed or could not be executed. PDF validation is unavailable.'));
        return;
      }
      resolve({
        exitCode: err && typeof err.code === 'number' ? err.code : 0,
        stdout: String(stdout || ''),
        stderr: String(stderr || ''),
      });
    });
  });
}

// Structural + content validation. A PDF is only accepted when the magic
// header is present AND qpdf --check exits 0 (no warnings, no errors).
// Rejects renamed binaries, truncated/corrupt files, and password-protected
// documents that qpdf cannot open.
async function validatePdfFile(filePath) {
  let head;
  try {
    const fd = await fsp.open(filePath, 'r');
    try {
      const buf = Buffer.alloc(MAGIC_SCAN_BYTES);
      const { bytesRead } = await fd.read(buf, 0, MAGIC_SCAN_BYTES, 0);
      head = buf.subarray(0, bytesRead);
    } finally {
      await fd.close();
    }
  } catch (err) {
    throw new PdfValidationError('Uploaded PDF could not be read.');
  }
  if (!head.includes(PDF_MAGIC)) {
    throw new PdfValidationError('Uploaded file is not a valid PDF document.');
  }
  const { exitCode } = await runQpdf(['--check', filePath]);
  if (exitCode !== 0) {
    throw new PdfValidationError('Uploaded PDF is corrupt or invalid and cannot be accepted.');
  }
  return true;
}

// Lossless optimization via qpdf: object streams + stream recompression.
// The original file is kept whenever qpdf cannot make it smaller, so valid
// PDFs are never enlarged or damaged. Embedded images (DCTDecode etc.) are
// preserved byte-for-byte.
async function processPdfFile({ filePath, originalName, field, maxOutputBytes }) {
  await validatePdfFile(filePath);

  const tmpDir = path.join(storage.getRoot(), 'tmp');
  const tmpOut = path.join(tmpDir, `${crypto.randomBytes(8).toString('hex')}.pdf`);

  let data = null;
  let optimizeFailed = false;
  try {
    await fsp.mkdir(tmpDir, { recursive: true });
    const { exitCode } = await runQpdf([
      filePath,
      '--object-streams=generate',
      '--compress-streams=y',
      '--recompress-flate',
      tmpOut,
    ]);
    if (exitCode === 0) {
      const outStat = await fsp.stat(tmpOut).catch(() => null);
      const originalSize = await fsp.stat(filePath).then((s) => s.size).catch(() => 0);
      if (outStat && outStat.size > 0 && outStat.size < originalSize) {
        data = await fsp.readFile(tmpOut);
      }
    } else {
      optimizeFailed = true;
    }
  } catch (err) {
    if (err instanceof PdfProcessingError) throw err;
    optimizeFailed = true;
  } finally {
    await fsp.unlink(tmpOut).catch(() => {});
  }

  if (!data) {
    data = await fsp.readFile(filePath);
  }

  if (maxOutputBytes && data.length > maxOutputBytes) {
    throw new PdfValidationError('Uploaded PDF exceeds the maximum allowed size.');
  }

  const storageKey = storage.generateStorageKey('pdfs', 'pdf');
  await storage.saveFile(storageKey, data);

  return {
    kind: 'pdf',
    cleanTemp: true,
    field,
    category: 'pdf',
    storageKey,
    originalName: storage.safeOriginalName(originalName),
    mimeType: 'application/pdf',
    size: data.length,
    sha256: storage.computeChecksum(data),
    processed: optimizeFailed
      ? { status: 'failed', tool: 'qpdf', error: 'qpdf optimization failed; original PDF stored unchanged.' }
      : { status: 'done', tool: 'qpdf' },
  };
}

module.exports = {
  PdfValidationError,
  PdfProcessingError,
  processPdfFile,
};
