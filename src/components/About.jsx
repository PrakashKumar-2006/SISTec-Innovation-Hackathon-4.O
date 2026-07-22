import React, { useState } from 'react';
import { Play, Sparkles, Trophy, Users, CheckCircle2, Award } from 'lucide-react';

export default function About({ isStandalone = false }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Stats data with descriptions and icons
  const stats = [
    { 
      label: 'Coding Duration', 
      value: '24 Hours', 
      description: 'Non-stop hacking & creation',
      icon: <Sparkles className="w-5 h-5 text-brand-orange" />
    },
    { 
      label: 'Total Prize Pool', 
      value: '₹1 Lakh+', 
      description: 'Cash rewards & awards',
      icon: <Trophy className="w-5 h-5 text-brand-gold" />
    },
    { 
      label: 'Nationwide Teams', 
      value: '100+ Teams', 
      description: 'Top talent from India',
      icon: <Users className="w-5 h-5 text-brand-pink" />
    }
  ];

  // Key Event Highlights
  const highlights = [
    "Nationwide Platform for Product Innovation",
    "Real-world Industry-grade Problem Statements",
    "Expert Mentorship & Evaluation Panels",
    "Empowering Young Minds to Prototype Wild Ideas"
  ];

  return (
    <section id="about" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-dark overflow-hidden`}>
      {/* Decorative Glow Backgrounds */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Rich Text & Event Highlights */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Top Dot Accent & CSE Dept Title (unboxed to match hero banner) */}
            <div className="space-y-3">
              <p className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-xs sm:text-sm md:text-base font-bold text-[#6B5B49] uppercase tracking-normal">Department of</span>
                <span className="text-base sm:text-2xl md:text-3xl font-black text-[#8C3A16] font-display uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>CSE | AI &amp; ML | IOT</span>
              </p>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] leading-[1.1] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              SIH is{' '}
              <span className="text-[var(--marigold-deep)] block sm:inline">
                Organized by SISTec Ratibad
              </span>
            </h2>

            
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4 pb-5 border-b border-[#E3D7C5]/60 group">
                <div className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] shrink-0 border border-[#E3D7C5] flex items-center justify-center mt-0.5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                  <Sparkles size={20} className="text-[#8C3A16]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-[#5C230C] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Product Innovation Platform</h4>
                  <p className="text-[#6B5B49] text-xs sm:text-sm leading-relaxed font-medium">
                    SISTec Innovation Hackathon is a nationwide initiative to provide a platform for students to solve pressing real-world problems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-5 border-b border-[#E3D7C5]/60 group">
                <div className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] shrink-0 border border-[#E3D7C5] flex items-center justify-center mt-0.5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                  <Trophy size={20} className="text-[#8C3A16]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-[#5C230C] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Problem-Solving Culture</h4>
                  <p className="text-[#6B5B49] text-xs sm:text-sm leading-relaxed font-medium">
                    Inculcates a culture of product innovation, out-of-the-box thinking, and a coding/building mindset.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] shrink-0 border border-[#E3D7C5] flex items-center justify-center mt-0.5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                  <Users size={20} className="text-[#8C3A16]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-[#5C230C] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Idea to Viable Prototypes</h4>
                  <p className="text-[#6B5B49] text-xs sm:text-sm leading-relaxed font-medium">
                    Empowering young engineering minds across India to turn bold ideas into real-world technology prototypes.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist of highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-brand-gray text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-5 rounded-2xl bg-brand-card/35 border border-white/5 flex flex-col items-start hover:border-brand-gold/30 shadow-card-shadow hover:shadow-[0_10px_30px_rgba(216,171,85,0.08)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Hover Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-orange to-brand-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                  
                  <div className="p-2.5 rounded-xl bg-brand-dark/80 border border-white/5 mb-4 group-hover:border-brand-gold/20 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-black font-display text-white leading-none tracking-tight">{stat.value}</span>
                  <span className="text-xs font-bold text-brand-gold mt-1.5 tracking-wide uppercase">{stat.label}</span>
                  <span className="text-[10px] text-brand-gray mt-1 leading-normal font-medium">{stat.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Futuristic Video Screen Showcase */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              
              {/* Decorative behind screen glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] -z-10"></div>
              
              {/* Premium Gradient Outer Frame */}
              <div className="relative p-1.5 rounded-[2.2rem] bg-gradient-to-tr from-brand-orange/40 via-brand-pink/20 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-3xl">
                <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-[1.8rem] overflow-hidden bg-brand-darker group">
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                      
                      {/* Blurred backdrop image from sih4 banner */}
                      <img 
                        src="/sih4.png" 
                        alt="Background Thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Grid overlay lines */}
                      <div className="absolute inset-0 tech-grid opacity-30"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/60 to-transparent"></div>
                      
                      {/* Pulsing play button */}
                      <div className="relative z-10">
                        <div className="absolute inset-0 rounded-full bg-brand-gold/30 blur-md animate-ping"></div>
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-darker/80 border border-brand-gold/45 flex items-center justify-center cursor-pointer group-hover:scale-110 group-hover:bg-brand-darker group-hover:border-brand-gold transition-all duration-300 shadow-cyan-glow">
                          <Play size={22} className="text-brand-gold fill-brand-gold translate-x-0.5 sm:scale-125" />
                        </div>
                      </div>
                      
                      {/* Banner Video Title Text */}
                      <div className="relative z-10 mt-3 sm:mt-6 space-y-1 sm:space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[10px] font-bold tracking-widest uppercase">
                          Featured Video
                        </div>
                        <h4 className="font-bold text-sm sm:text-lg text-white font-display tracking-wide drop-shadow-sm">
                          SISTec Innovation Hackathon (SIH 4.0)
                        </h4>
                        <p className="text-[10px] sm:text-xs text-brand-gray/80 font-medium">
                          Bhopal's Biggest National Tech Festival
                        </p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full border-none rounded-[1.8rem]"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="SISTec Innovation Hackathon SIH 4.0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  
                  {/* Invisible click handler */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                </div>
              </div>

              {/* Extra branding details below video */}
              <div className="mt-6 flex justify-center gap-6 text-[10px] sm:text-xs text-brand-gray/70 font-semibold font-mono">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-brand-orange" />
                  NAAC A+ ACCREDITED
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 mt-1.5"></span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-gold" />
                  SAGAR GROUP OF INSTITUTIONS
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
