import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy logo and banner files on startup
try {
  const destDir = './public';
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 1. Copy user uploaded official logo
  const srcLogo = 'C:/Users/maury/.gemini/antigravity-ide/brain/cbbc2073-e3d3-4b21-a502-612be00a29b5/media__1784228731805.png';
  if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, path.join(destDir, 'logo.png'));
    console.log('Official logo copied successfully!');
  }

  // 2. Copy Sih 4.0 banner image
  const srcBanner = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/#Sih 4.0.png';
  if (fs.existsSync(srcBanner)) {
    fs.copyFileSync(srcBanner, path.join(destDir, 'sih4.png'));
    console.log('Sih 4.0 banner copied successfully!');
  } else {
    console.warn('Source banner not found at:', srcBanner);
  }
} catch (err) {
  console.error('Failed to copy files:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
