import fs from 'fs';
import path from 'path';

const targetDir = path.join(process.cwd(), 'src', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imageMappings = [
  { src: '2025  1st prize winer.webp', dest: 'winner_2025_1st.webp' },
  { src: '2025 2nd Prize winer.webp', dest: 'winner_2025_2nd.webp' },
  { src: '2025 3nd Prize winer.webp', dest: 'winner_2025_3rd.webp' },
  { src: 'home page image.webp', dest: 'home_page.webp' },
  { src: 'Lamp.webp', dest: 'lamp.webp' },
  { src: 'Themes Prize winer 1.webp', dest: 'winner_theme_1.webp' },
  { src: 'Themes Prize winer 2.webp', dest: 'winner_theme_2.webp' },
  { src: 'winer group image.webp', dest: 'winner_group.webp' }
];

console.log('Organizing images into src/assets/images/...');

imageMappings.forEach(({ src, dest }) => {
  const srcPath = path.join(process.cwd(), src);
  const destPath = path.join(targetDir, dest);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);
      console.log(`SUCCESS: Moved "${src}" -> "src/assets/images/${dest}"`);
    } else {
      console.warn(`WARNING: Source "${src}" not found.`);
    }
  } catch (err) {
    console.error(`ERROR processing "${src}":`, err.message);
  }
});
