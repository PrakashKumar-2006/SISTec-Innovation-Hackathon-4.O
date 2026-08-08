import fs from 'fs';
import path from 'path';

try {
  fs.copyFileSync('home page image.JPG', 'public/home_page_image.jpg');
  console.log('SUCCESS: copied "home page image.JPG" to "public/home_page_image.jpg"');
} catch (err) {
  console.error('ERROR copying file:', err.message);
}
