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
  const srcLogo = 'c:/SHIVAM UI WORK/SISTec-R HACKTHON WEBSITE/SISTec Rb-03-01.png';
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          navy: "var(--ink-soft)",       // #6B5B49 (Muted body text)
          blue: "var(--vermilion)",      // #E6491E (Vibrant vermilion orange)
          purple: "var(--clay)",         // #8C3A16 (Clay brown/rust accent)
          cyan: "var(--vermilion)",      // #E6491E (Secondary accent)
          teal: "var(--marigold-deep)",  // #C97F1B (Deep marigold gold)
          orange: "var(--vermilion)",    // #E6491E (Accent orange)
          pink: "var(--marigold)",       // #F2A93B (Bright marigold)
          dark: "#FAF6F0",               // Soft warm cream section background
          darker: "var(--paper)",        // #FFFDF7 (Paper cream base background)
          card: "var(--paper)",          // #FFFDF7 (Card background)
          text: "var(--ink)",            // #241708 (Deep ink brown for headings)
          gray: "var(--ink-soft)",       // #6B5B49 (Muted text gray-brown)
          gold: "var(--marigold)",       // #F2A93B (Custom marigold)
          navyDeep: "var(--panel)"       // #2B1607 (Dark panel background)
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        cinzel: ["Outfit", "sans-serif"],
        outfit: ["Outfit", "sans-serif"]
      },
      backgroundImage: {
        'sih-gradient': 'linear-gradient(135deg, var(--paper) 0%, var(--marigold) 100%)', 
        'bg-gradient': 'linear-gradient(180deg, var(--paper) 0%, #FAF5EE 100%)',
        'btn-gradient': 'linear-gradient(90deg, var(--vermilion) 0%, var(--marigold) 100%)', 
        'wave-gradient': 'linear-gradient(135deg, var(--paper) 0%, #FAF5EE 100%)',
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
  plugins: [require("tailwindcss-animate")],
}
