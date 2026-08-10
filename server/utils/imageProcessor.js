const path = require('path');
const sharp = require('sharp');
const storage = require('./storage');

class ImageProcessingError extends Error {}

const WEBP_QUALITY = 80;
const MAX_INPUT_PIXELS = 100 * 1000 * 1000;

async function processImageFile({ filePath, originalName, field, maxOutputBytes }) {
  let meta;
  try {
    meta = await sharp(filePath, { failOn: 'error' }).metadata();
  } catch (err) {
    throw new ImageProcessingError('Uploaded file is not a valid image.');
  }
  if (!meta.format || !meta.width || !meta.height) {
    throw new ImageProcessingError('Uploaded file is not a valid image.');
  }

  let data;
  let info;
  try {
    ({ data, info } = await sharp(filePath, { failOn: 'error', limitInputPixels: MAX_INPUT_PIXELS })
      .rotate()
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true }));
  } catch (err) {
    throw new ImageProcessingError('Uploaded image could not be processed.');
  }

  if (maxOutputBytes && data.length > maxOutputBytes) {
    throw new ImageProcessingError('Processed image exceeds the maximum allowed size.');
  }

  const storageKey = storage.generateStorageKey('images', 'webp');
  await storage.saveFile(storageKey, data);

  return {
    kind: 'image',
    cleanTemp: true,
    field,
    category: 'image',
    storageKey,
    originalName: storage.safeOriginalName(originalName),
    mimeType: 'image/webp',
    size: data.length,
    sha256: storage.computeChecksum(data),
    width: info.width,
    height: info.height,
    format: info.format,
  };
}

module.exports = {
  ImageProcessingError,
  processImageFile,
};
