import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

const mappings = [
  { src: 'Dinner image.webp', dest: 'dinner_image.webp' },
  { src: 'Lunch image.webp', dest: 'lunch_image.webp' },
  { src: 'NEW HACKTHON LOGO TRANSPARENT.webp', dest: 'hackathon_logo_transparent.webp' },
  { src: 'Prakash Kumar Biswal.webp', dest: 'prakash_biswal.webp' },
  { src: 'Round 1.webp', dest: 'round_1.webp' },
  { src: 'Round 2.webp', dest: 'round_2.webp' },
  { src: 'Round 3 image.webp', dest: 'round_3.webp' },
  { src: 'Shivam Kumar Maurya.jpg', dest: 'shivam_maurya.jpg' },
  { src: 'Shivansh Mehra.webp', dest: 'shivansh_mehra.webp' },
  { src: 'Shubham Pawar.webp', dest: 'shubham_pawar.webp' },
  { src: 'Tea Brake Image.webp', dest: 'tea_break_image.webp' },
  { src: 'Trophy image.webp', dest: 'trophy_image.webp' },
  { src: 'Tushar Das.webp', dest: 'tushar_das.webp' },
  { src: 'yoga session image.webp', dest: 'yoga_session_image.webp' },
  { src: 'morning Breakfast.webp', dest: 'morning_breakfast.webp' }
];

console.log('Copying new WebP images to public/ directory...');

mappings.forEach(({ src, dest }) => {
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
