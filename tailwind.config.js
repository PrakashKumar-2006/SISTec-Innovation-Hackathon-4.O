import fs from 'fs'
import path from 'path'

// Dynamic copy logic executed in Tailwind config process on node side
try {
  const srcBanner = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/Sih 4.0.png';
  const destLogo = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/public/logo.png';
  const destBanner = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/public/sih4.png';

  // Copy banner
  if (fs.existsSync(srcBanner)) {
    fs.copyFileSync(srcBanner, destBanner);
    console.log('SUCCESS: Banner copied in Tailwind execution block!');
  }
  
  // Copy logo
  const srcLogo = 'C:/Users/maury/.gemini/antigravity-ide/brain/cbbc2073-e3d3-4b21-a502-612be00a29b5/media__1784228731805.png';
  if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, destLogo);
    console.log('SUCCESS: Logo copied in Tailwind execution block!');
  }
} catch (err) {
  console.error('Tailwind copy error:', err);
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D8AB55",
        navyDeep: "#FFFFFF",
        brand: {
          navy: "#F8FAFC",       // Clean Off-White for text/contrast in Dark Mode
          blue: "#FFFFFF",       // Primary Color (White)
          purple: "#E2E8F0",     // Light Silver-Gray
          cyan: "#D8AB55",       // Secondary Color (Gold)
          teal: "#A27B2B",       // Darker Gold
          orange: "#D8AB55",     // Secondary Color (Gold)
          pink: "#FFE8B6",       // Amber/Light Gold
          dark: "#0F0F11",       // Obsidian black base background
          darker: "#080809",     // Pitch black body background
          card: "#161619",       // Obsidian card surface background
          text: "#F8FAFC",       // Clean Off-White for headings
          gray: "#A1A1AA",       // Muted gray for readable body text
          gold: "#D8AB55",       // Custom gold color
          navyDeep: "#FFFFFF"    // Custom white color
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        'sih-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #D8AB55 100%)', // White to Gold gradient
        'bg-gradient': 'linear-gradient(180deg, #0F0F11 0%, #080809 100%)',
        'btn-gradient': 'linear-gradient(90deg, #D8AB55 0%, #A27B2B 100%)', // Gold gradient for buttons
        'wave-gradient': 'linear-gradient(135deg, #0F0F11 0%, #080809 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(216, 171, 85, 0.20)', // Gold glow
        'purple-glow': '0 0 15px rgba(255, 255, 255, 0.15)', // White glow
        'pink-glow': '0 0 15px rgba(216, 171, 85, 0.20)', // Gold glow
        'card-shadow': '0 10px 30px -10px rgba(0, 0, 0, 0.6)', // Obsidian card shadow
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.8)', // Obsidian hover shadow
      }
    },
  },
  plugins: [],
}
