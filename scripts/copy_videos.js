const fs = require('fs');
const path = require('path');

const root = 'c:\\SHIVAM UI WORK\\SISTec-R HACKTHON WEBSITE';
const pub = path.join(root, 'public');

const files = [
  { src: 'animo-position-dance-1080p (1).mp4', dst: 'gallery_video_web.mp4' },
  { src: 'animo-position-dance-1920p phone.mp4', dst: 'gallery_video_mobile.mp4' },
];

for (const f of files) {
  const srcPath = path.join(root, f.src);
  const dstPath = path.join(pub, f.dst);
  console.log(`Copying: ${f.src} -> public/${f.dst}`);
  fs.copyFileSync(srcPath, dstPath);
  const stat = fs.statSync(dstPath);
  console.log(`Done: ${f.dst} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
}
console.log('All videos copied!');
