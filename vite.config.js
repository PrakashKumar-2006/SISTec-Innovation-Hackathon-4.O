import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy assets from brain directory to public directory at runtime
try {
  const destDir = './public';
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 1. Copy SISTec logo
  const sistecLogo = './SISTec Rb-03-01.png';
  if (fs.existsSync(sistecLogo)) {
    fs.copyFileSync(sistecLogo, path.join(destDir, 'logo.png'));
    console.log('SISTec logo copied successfully!');
  }

  // 2. Copy generated students hero image
  const studentsHero = 'C:/Users/maury/.gemini/antigravity-ide/brain/ea2c1b71-93fd-4bc6-9648-2e383777a6eb/hackathon_students_hero_1784492671984.png';
  if (fs.existsSync(studentsHero)) {
    fs.copyFileSync(studentsHero, path.join(destDir, 'hackathon_students.png'));
    console.log('Students hero image copied successfully!');
  }

  // 3. Copy Idea Submission Format PPTX template
  const ideaTemplate = './Idea-Sumission Format SIH 4.0.pptx';
  if (fs.existsSync(ideaTemplate)) {
    fs.copyFileSync(ideaTemplate, path.join(destDir, 'Idea-Sumission Format SIH 4.0.pptx'));
    console.log('Idea template PPTX copied successfully!');
  }
} catch (err) {
  console.error('Failed to copy assets:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
