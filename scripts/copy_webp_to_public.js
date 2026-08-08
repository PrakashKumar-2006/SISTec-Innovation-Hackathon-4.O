import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

const webpMappings = [
  { src: '2025  1st prize winer.webp', dest: 'winner_2025_1st.webp' },
  { src: '2025 2nd Prize winer.webp', dest: 'winner_2025_2nd.webp' },
  { src: '2025 3nd Prize winer.webp', dest: 'winner_2025_3rd.webp' },
  { src: 'home page image.webp', dest: 'home_page.webp' },
  { src: 'Lamp.webp', dest: 'lamp.webp' },
  { src: 'Themes Prize winer 1.webp', dest: 'winner_theme_1.webp' },
  { src: 'Themes Prize winer 2.webp', dest: 'winner_theme_2.webp' },
  { src: 'winer group image.webp', dest: 'winner_group.webp' }
];

const jpgFilesToRemove = [
  'winner_2025_1st.jpg',
  'winner_2025_2nd.jpg',
  'winner_2025_3rd.jpg',
  'winner_group.jpg',
  'winner_theme_1.jpg',
  'winner_theme_2.jpg',
  'home_page_image.jpg'
];

console.log('Copying WebP images to public/ directory...');

webpMappings.forEach(({ src, dest }) => {
  const srcPath = path.join(process.cwd(), src);
  const destPath = path.join(publicDir, dest);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`COPIED: "${src}" -> "public/${dest}"`);
    } else {
      console.warn(`NOT FOUND: "${src}"`);
    }
  } catch (err) {
    console.error(`ERROR copying "${src}":`, err.message);
  }
});

console.log('Removing old JPG images from public/...');
jpgFilesToRemove.forEach((file) => {
  const filePath = path.join(publicDir, file);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`REMOVED: "public/${file}"`);
    }
  } catch (err) {
    console.error(`ERROR removing "${file}":`, err.message);
  }
});
