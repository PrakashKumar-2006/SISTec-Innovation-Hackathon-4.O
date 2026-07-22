import React from 'react';
import { Code2, Linkedin, Github } from 'lucide-react';
import shubhamImg from '../../Shubham Pawar.jpg';
import shivamImg from '../../Shivam Kumar Maurya.png';
import shivanshImg from '../../Shivansh Mehra.jpg';
import prakashImg from '../../Prakash Kumar Biswal.jpg';
import tusharImg from '../../Tushar Das.jpg';

export default function Developers() {
  const devs = [
    {
      name: 'Shubham Pawar',
      image: shubhamImg,
      socials: { 
        linkedin: 'https://www.linkedin.com/in/shubham-pawar-527b88284/', 
        github: 'https://github.com/codewithS1' 
      },
      theme: {
        glow: 'from-cyan-500/20 to-blue-500/20',
        border: 'border-cyan-500/20 hover:border-cyan-500/40',
        imgBorder: 'border-cyan-500/50 group-hover:border-cyan-400',
        social: 'hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]',
        line: 'from-cyan-500 to-blue-500'
      }
    },
    {
      name: 'Shivam Kumar Maurya',
      image: shivamImg,
      socials: { 
        linkedin: 'https://www.linkedin.com/in/shivam-kumar-maurya-000370251/', 
        github: 'https://github.com/shivam1264' 
      },
      theme: {
        glow: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/20 hover:border-purple-500/40',
        imgBorder: 'border-purple-500/50 group-hover:border-purple-400',
        social: 'hover:bg-purple-500 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]',
        line: 'from-purple-500 to-pink-500'
      }
    },
    {
      name: 'Shivansh Mehra',
      image: shivanshImg,
      socials: { 
        linkedin: 'https://www.linkedin.com/in/shivanshmehra01/', 
        github: 'https://github.com/shivansh-mehra-01' 
      },
      theme: {
        glow: 'from-emerald-500/20 to-teal-500/20',
        border: 'border-emerald-500/20 hover:border-emerald-500/40',
        imgBorder: 'border-emerald-500/50 group-hover:border-emerald-400',
        social: 'hover:bg-emerald-500 hover:border-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]',
        line: 'from-emerald-500 to-teal-500'
      }
    },
    {
      name: 'Prakash Kumar Biswal',
      image: prakashImg,
      socials: { 
        linkedin: 'https://www.linkedin.com/in/prakash-kumar-biswal-138160309/', 
        github: 'https://github.com/PrakashKumar-2006' 
      },
      theme: {
        glow: 'from-amber-500/20 to-brand-orange/20',
        border: 'border-amber-500/20 hover:border-amber-500/40',
        imgBorder: 'border-amber-500/50 group-hover:border-amber-400',
        social: 'hover:bg-amber-500 hover:border-amber-400 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]',
        line: 'from-amber-500 to-brand-orange'
      }
    },
    {
      name: 'Tushar Das',
      image: tusharImg,
      socials: { 
        linkedin: 'https://www.linkedin.com/in/tushar-das-96aa14266/', 
        github: 'https://github.com/KenKaneki23-ux' 
      },
      theme: {
        glow: 'from-pink-500/20 to-rose-500/20',
        border: 'border-pink-500/20 hover:border-pink-500/40',
        imgBorder: 'border-pink-500/50 group-hover:border-pink-400',
        social: 'hover:bg-pink-500 hover:border-pink-400 hover:shadow-[0_0_10px_rgba(244,63,94,0.4)]',
        line: 'from-pink-500 to-rose-500'
      }
    }
  ];

  return (
    <section id="developers" className="relative py-12 sm:py-16 bg-brand-darker overflow-hidden tech-grid-dense">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Website{' '}
            <span className="text-[var(--marigold-deep)]">
              Developers
            </span>
          </h2>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base font-medium font-sans">
            Meet the talented student development team behind the SIH web infrastructure.
          </p>
        </div>


        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {devs.map((dev, idx) => (
            <div
              key={idx}
              className={`group relative p-6 rounded-[32px] bg-brand-card/25 backdrop-blur-md border ${dev.theme.border} hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-between min-h-[270px] max-w-[250px] w-full mx-auto`}
            >
              {/* Blur Glow behind card */}
              <div className={`absolute -inset-px bg-gradient-to-r ${dev.theme.glow} rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[12px] -z-10`}></div>

              {/* Profile Image with Ring */}
              <div className={`w-36 h-36 rounded-full border-4 ${dev.theme.imgBorder} overflow-hidden shadow-lg relative transition-all duration-500 group-hover:scale-105`}>
                <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
              </div>

              {/* Developer Details */}
              <div className="text-center mt-4 flex-grow flex flex-col justify-center">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-display">
                  {dev.name}
                </h3>
              </div>

              {/* Social Icons */}
              <div className="flex gap-2.5 mt-4 z-10">
                {dev.socials.linkedin && (
                  <a
                    href={dev.socials.linkedin}
                    onClick={(e) => { if (dev.socials.linkedin === '#') e.preventDefault(); }}
                    target={dev.socials.linkedin !== '#' ? "_blank" : undefined}
                    rel={dev.socials.linkedin !== '#' ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                    </svg>
                  </a>
                )}
                {dev.socials.github && (
                  <a
                    href={dev.socials.github}
                    onClick={(e) => { if (dev.socials.github === '#') e.preventDefault(); }}
                    target={dev.socials.github !== '#' ? "_blank" : undefined}
                    rel={dev.socials.github !== '#' ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-xl bg-[#181717] border border-white/10 flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    title="GitHub"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Bottom Expanding Line */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r ${dev.theme.line} group-hover:w-1/2 transition-all duration-500 rounded-full`}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
