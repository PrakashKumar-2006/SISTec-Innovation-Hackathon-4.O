import fs from 'fs'
import path from 'path'

// Dynamic copy logic executed in Tailwind config process on node side
try {
  const srcBanner = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/#Sih 4.0.png';
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
        brand: {
          navy: "#0D246C",
          blue: "#2F66FF",
          purple: "#7B3FF2",
          cyan: "#00E5FF",
          teal: "#12C8A5",
          orange: "#FF6A00",
          pink: "#FF1B75",
          dark: "#FFFAFA",      // Snow White base background
          darker: "#FFFAFA",    // Snow White main background
          text: "#0D246C",      // Deep navy for text
          gray: "#4A5568"       // Slate gray for body text
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        'sih-gradient': 'linear-gradient(135deg, #FF6A00 0%, #FF1B75 50%, #7B3FF2 100%)',
        'bg-gradient': 'linear-gradient(180deg, #FFFAFA 0%, #FFFAFA 100%)',
        'btn-gradient': 'linear-gradient(90deg, #0D246C 0%, #2F66FF 100%)',
        'wave-gradient': 'linear-gradient(135deg, #FFFAFA 0%, #FFFAFA 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 229, 255, 0.2)',
        'purple-glow': '0 0 15px rgba(123, 63, 242, 0.2)',
        'pink-glow': '0 0 15px rgba(255, 27, 117, 0.2)',
        'card-shadow': '0 10px 30px -10px rgba(13, 36, 108, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(13, 36, 108, 0.15)',
      }
    },
  },
  plugins: [],
}
