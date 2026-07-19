import fs from 'fs';
import path from 'path';

try {
  fs.copyFileSync('contact image.png', 'public/contact_image.png');
  console.log('SUCCESS: copied "contact image.png" to "public/contact_image.png"');
} catch (err) {
  console.error('ERROR copying file:', err.message);
}
