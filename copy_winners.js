import fs from 'fs';

const files = [
  { src: 'winer group image.JPG', dest: 'public/winner_group.jpg' },
  { src: '2025  1st prize winer.JPG', dest: 'public/winner_2025_1st.jpg' },
  { src: '2025 2nd Prize winer.JPG', dest: 'public/winner_2025_2nd.jpg' },
  { src: '2025 3nd Prize winer.JPG', dest: 'public/winner_2025_3rd.jpg' },
  { src: 'Themes Prize winer 1.JPG', dest: 'public/winner_theme_1.jpg' },
  { src: 'Themes Prize winer 2.JPG', dest: 'public/winner_theme_2.jpg' }
];

console.log('Starting file copy...');

files.forEach(({ src, dest }) => {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`SUCCESS: Copied "${src}" to "${dest}"`);
    } else {
      console.warn(`WARNING: Source file "${src}" does not exist in root.`);
    }
  } catch (err) {
    console.error(`ERROR copying "${src}":`, err.message);
  }
});
