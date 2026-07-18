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
    <section id="developers" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Developers of{' '}
            <span className="text-gold-metallic">
              SIH
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
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
              <div className="flex gap-3 mt-4 z-10">
                {dev.socials.linkedin && (
                  <a
                    href={dev.socials.linkedin}
                    onClick={(e) => { if (dev.socials.linkedin === '#') e.preventDefault(); }}
                    target={dev.socials.linkedin !== '#' ? "_blank" : undefined}
                    rel={dev.socials.linkedin !== '#' ? "noopener noreferrer" : undefined}
                    className="p-2.5 rounded-xl bg-[#0077b5] border border-[#0077b5] text-white shadow-[0_4px_12px_rgba(0,119,181,0.25)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Linkedin size={14} />
                  </a>
                )}
                {dev.socials.github && (
                  <a
                    href={dev.socials.github}
                    onClick={(e) => { if (dev.socials.github === '#') e.preventDefault(); }}
                    target={dev.socials.github !== '#' ? "_blank" : undefined}
                    rel={dev.socials.github !== '#' ? "noopener noreferrer" : undefined}
                    className="p-2.5 rounded-xl bg-[#181717] border border-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Github size={14} />
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
