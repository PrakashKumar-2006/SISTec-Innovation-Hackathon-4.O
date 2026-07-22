import React from 'react';
import { Sparkles, Trophy, Users, CheckCircle2 } from 'lucide-react';

export default function About({ isStandalone = false }) {

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

            {/* Stats Cards Grid (Compact Horizontal Layout: Icon Side-by-Side with Text) */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 pt-3 font-sans">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-2 xs:p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF7] border-2 border-[#E3D7C5] hover:border-[#8C3A16] flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Hover Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8C3A16] to-[#C97F1B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                  
                  <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#8C3A16]/10 border border-[#8C3A16]/20 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <span className="block text-xs xs:text-sm sm:text-base lg:text-lg font-black font-display text-[#241708] leading-tight tracking-tight truncate" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                      {stat.value}
                    </span>
                    <span className="block text-[7px] xs:text-[8px] sm:text-[10px] font-extrabold text-[#8C3A16] uppercase tracking-wider truncate mt-0.5">
                      {stat.label}
                    </span>
                    <span className="hidden lg:block text-[9.5px] text-[#6B5B49] font-medium truncate mt-0.5">
                      {stat.description}
                    </span>
                  </div>
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
                <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-[1.8rem] overflow-hidden bg-brand-darker">
                  <iframe
                    className="w-full h-full border-none rounded-[1.8rem]"
                    src="https://www.youtube.com/embed/CM4Q8pvKgG4?autoplay=1&mute=1&loop=1&playlist=CM4Q8pvKgG4&playsinline=1&controls=1&rel=0"
                    title="SISTec Innovation Hackathon (SIH 4.0)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Extra branding details below video */}
              <div className="mt-6 flex justify-center text-[10px] sm:text-xs text-brand-gray/80 font-semibold font-mono">
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
