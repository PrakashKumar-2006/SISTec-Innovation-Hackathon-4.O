import React, { useState } from 'react';
import { Sprout, GraduationCap, Car, ShieldCheck, HeartPulse, Cpu, Search, Sparkles } from 'lucide-react';

export default function Themes() {
  const [searchTerm, setSearchTerm] = useState('');

  const themes = [
    {
      title: 'AgriTech',
      description: 'Use technology to revolutionize agriculture. Improve productivity, sustainability, and efficiency through advanced farming techniques and smart IoT tools.',
      icon: <Sprout size={24} className="text-brand-teal" />,
      color: 'border-brand-teal/30 hover:border-brand-teal/60'
    },
    {
      title: 'EduTech',
      description: 'Leverage technology to transform education. Create engaging, interactive, and accessible learning platforms for diverse audiences worldwide.',
      icon: <GraduationCap size={24} className="text-brand-purple" />,
      color: 'border-brand-purple/30 hover:border-brand-purple/60'
    },
    {
      title: 'Urban Mobility',
      description: 'Develop smart transportation systems that enhance connectivity, reduce congestion, and promote sustainable mobility in urban spaces.',
      icon: <Car size={24} className="text-brand-blue" />,
      color: 'border-brand-blue/30 hover:border-brand-blue/60'
    },
    {
      title: 'Healthcare & Biotech',
      description: 'Design digital health solutions, telemedicine applications, and biotech prototypes to improve clinical diagnosis, treatment access, and health equity.',
      icon: <HeartPulse size={24} className="text-brand-pink" />,
      color: 'border-brand-pink/30 hover:border-brand-pink/60'
    },
    {
      title: 'Fintech & Web3',
      description: 'Build decentralized applications, smart contract platforms, digital payment protocols, or secure transactions for financial inclusion.',
      icon: <ShieldCheck size={24} className="text-brand-orange" />,
      color: 'border-brand-orange/30 hover:border-brand-orange/60'
    },
    {
      title: 'AI & Open Innovation',
      description: 'Unlock real-world potential using Generative AI, machine learning frameworks, or computer vision to solve cross-disciplinary challenges.',
      icon: <Cpu size={24} className="text-brand-blue" />,
      color: 'border-brand-blue/30 hover:border-brand-blue/60'
    }
  ];

  const filteredThemes = themes.filter(theme => 
    theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="themes" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 text-left max-w-xl">

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy">
              SIH 4.0{' '}
              <span className="bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
                Themes & Tracks
              </span>
            </h2>
            <p className="text-brand-gray text-sm sm:text-base font-normal">
              Explore our core focus domains. Filter or search to find the track that matches your team's technical interests and innovation targets.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" size={16} />
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-dark border border-brand-navy/10 focus:border-brand-blue focus:outline-none text-sm text-brand-navy placeholder-brand-gray transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.length > 0 ? (
            filteredThemes.map((theme, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border ${theme.color} transition-all duration-300 shadow-card-shadow hover:shadow-card-hover hover:-translate-y-1 h-full flex flex-col`}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-navy/5 flex items-center justify-center mb-6 shadow-sm">
                  {theme.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy tracking-wide font-display">
                  {theme.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-gray mt-3 leading-relaxed font-normal">
                  {theme.description}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-brand-gray font-mono text-sm">
              No matching tracks found. Try searching for "Agri" or "AI".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
