import React, { useState } from 'react';
import { Sprout, GraduationCap, Car, ShieldCheck, HeartPulse, Cpu, Search, Sparkles } from 'lucide-react';

export default function Themes({ onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const themes = [
    {
      title: 'AgriTech',
      category: 'Social Impact',
      description: 'Use technology to revolutionize agriculture. Improve productivity, sustainability, and efficiency through advanced farming techniques and smart IoT tools.',
      tags: ['Smart Farming', 'IoT Sensors', 'Crop Yield AI'],
      icon: <Sprout size={24} className="text-emerald-400" />,
      color: 'from-emerald-500/10 to-transparent',
      borderColor: 'hover:border-emerald-500/30 shadow-emerald-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
    },
    {
      title: 'EduTech',
      category: 'Social Impact',
      description: 'Leverage technology to transform education. Create engaging, interactive, and accessible learning platforms for diverse audiences worldwide.',
      tags: ['AI Tutors', 'AR/VR Classrooms', 'Gamification'],
      icon: <GraduationCap size={24} className="text-purple-400" />,
      color: 'from-purple-500/10 to-transparent',
      borderColor: 'hover:border-purple-500/30 shadow-purple-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]'
    },
    {
      title: 'Urban Mobility',
      category: 'Core Engineering',
      description: 'Develop smart transportation systems that enhance connectivity, reduce congestion, and promote sustainable mobility in urban spaces.',
      tags: ['EV Charging', 'Traffic IoT', 'Public Transit'],
      icon: <Car size={24} className="text-blue-400" />,
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'hover:border-blue-500/30 shadow-blue-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
    },
    {
      title: 'Healthcare & Biotech',
      category: 'Social Impact',
      description: 'Design digital health solutions, telemedicine applications, and biotech prototypes to improve clinical diagnosis, treatment access, and health equity.',
      tags: ['Telehealth IoT', 'AI Diagnostics', 'Bio-Prototyping'],
      icon: <HeartPulse size={24} className="text-pink-400" />,
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'hover:border-pink-500/30 shadow-pink-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]'
    },
    {
      title: 'Fintech & Web3',
      category: 'AI/Tech',
      description: 'Build decentralized applications, smart contract platforms, digital payment protocols, or secure transactions for financial inclusion.',
      tags: ['DeFi Micro-Loans', 'Crypto Security', 'Smart Contracts'],
      icon: <ShieldCheck size={24} className="text-amber-500" />,
      color: 'from-amber-500/10 to-transparent',
      borderColor: 'hover:border-amber-500/30 shadow-amber-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]'
    },
    {
      title: 'AI & Open Innovation',
      category: 'AI/Tech',
      description: 'Unlock real-world potential using Generative AI, machine learning frameworks, or computer vision to solve cross-disciplinary challenges.',
      tags: ['LLM Agents', 'Computer Vision', 'Generative Media'],
      icon: <Cpu size={24} className="text-cyan-400" />,
      color: 'from-cyan-500/10 to-transparent',
      borderColor: 'hover:border-cyan-500/30 shadow-cyan-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]'
    }
  ];

  const filteredThemes = themes.filter(theme => 
    theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="themes" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      {/* Background visual glowing blur circles */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Search Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/5 mb-16">
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
              SIH 4.0 <span className="text-gold-metallic">Themes & Tracks</span>
            </h2>
          </div>

          {/* Search Input wrapped in glowing gradient border */}
          <div className="relative w-full lg:max-w-xs p-[1.5px] rounded-2xl bg-gradient-to-r from-brand-orange/20 via-brand-pink/20 to-brand-blue/20">
            <div className="relative w-full rounded-[15px] overflow-hidden bg-brand-dark flex items-center">
              <Search className="absolute left-3.5 text-brand-gray" size={16} />
              <input
                type="text"
                placeholder="Search statements or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border-none text-sm text-white placeholder-brand-gray focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.length > 0 ? (
            filteredThemes.map((theme, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-[2rem] bg-brand-card/45 backdrop-blur-sm border border-white/5 bg-gradient-to-b ${theme.color} ${theme.borderColor} transition-all duration-500 hover:-translate-y-2 shadow-card-shadow ${theme.glow} group overflow-hidden flex flex-col justify-between`}
              >
                
                {/* Visual Watermark background icon */}
                <div className="absolute right-0 bottom-0 text-[10rem] text-white/[0.01] pointer-events-none transform translate-x-6 translate-y-6 group-hover:scale-110 group-hover:text-white/[0.02] transition-all duration-500 flex items-center justify-center">
                  {theme.icon}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    {/* Icon + Title side-by-side */}
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0">
                        {theme.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">
                        {theme.title}
                      </h3>
                    </div>
                    {/* Category Label */}
                    <span className="text-[9px] font-bold tracking-widest font-mono uppercase bg-white/5 text-brand-gray px-2.5 py-1 rounded-full border border-white/5 shrink-0">
                      {theme.category}
                    </span>
                  </div>

                  <div className="text-left pt-1">
                    <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Sub tags list inside card */}
                <div className="mt-8 relative z-10 pt-4 border-t border-white/5 text-left">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {theme.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[9px] font-semibold text-brand-gray/95 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Explore Problem Statements link */}
                  <button 
                    onClick={() => onViewChange && onViewChange('problem-statements')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold/80 hover:text-brand-gold bg-transparent border-none transition-colors duration-300 group-hover:translate-x-1 cursor-pointer"
                  >
                    Explore Problem Statements
                    <span className="text-sm font-light">→</span>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-brand-gray font-mono text-sm border border-dashed border-white/5 rounded-3xl bg-brand-card/20">
              No matching tracks found. Try adjusting your filter or searching for something else.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
