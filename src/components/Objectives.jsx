import React from 'react';
import { Target, Zap, Briefcase, GraduationCap, Quote } from 'lucide-react';

export default function Objectives({ isStandalone = false }) {
  const objectiveList = [
    {
      index: '01',
      title: 'Diverse Problem Domains',
      desc: 'Focus on more than 12 Domains with 10 to 15 curated Problem Statements in each area.',
      icon: Target,
      iconColor: 'text-emerald-400 animate-pulse',
      color: 'from-emerald-500/10 to-transparent',
      borderColor: 'hover:border-emerald-500/30 shadow-emerald-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      progressColor: 'from-emerald-500 to-emerald-300'
    },
    {
      index: '02',
      title: 'National Collaboration',
      desc: 'Expecting 60+ Elite Teams to participate from engineering colleges across various states.',
      icon: Zap,
      iconColor: 'text-pink-400',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'hover:border-pink-500/30 shadow-pink-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]',
      progressColor: 'from-pink-500 to-pink-300'
    },
    {
      index: '03',
      title: 'Career Opportunities',
      desc: 'Connect with top recruiters and secure high-value internships directly from the hackathon.',
      icon: Briefcase,
      iconColor: 'text-blue-400',
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'hover:border-blue-500/30 shadow-blue-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]',
      progressColor: 'from-blue-500 to-blue-300'
    },
    {
      index: '04',
      title: 'Incubation & Start-ups',
      desc: 'Get mentorship, incubation support, and opportunities to convert outstanding prototypes into startups.',
      icon: GraduationCap,
      iconColor: 'text-amber-400',
      color: 'from-amber-500/10 to-transparent',
      borderColor: 'hover:border-amber-500/30 shadow-amber-500/5',
      glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
      progressColor: 'from-amber-500 to-amber-300'
    }
  ];

  return (
    <section id="objectives" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-dark overflow-hidden`}>
      {/* Decorative blur backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Mission Description & Quote */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="mb-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
                Objective of <span className="text-gold-metallic">SIH 4.0</span>
              </h2>
            </div>
            
            <p className="text-brand-gray leading-relaxed text-base">
              Hackathons bring students with technical backgrounds together for creative problem-solving and prototype development. It serves as a launchpad to sharpen coding abilities, share industrial insight, and exchange knowledge.
            </p>

            {/* Quote Card */}
            <div className="relative p-6 rounded-2xl bg-brand-card/45 border border-white/5 shadow-xl overflow-hidden group">
              {/* Decorative side accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue"></div>
              
              <div className="relative z-10 space-y-4">
                <Quote className="w-10 h-10 text-brand-gold/15 transform rotate-180 -translate-x-2" />
                <p className="text-base text-brand-navy font-bold tracking-wide italic leading-relaxed">
                  "Our core perspective is to design robust engineering solutions for existing societal challenges, building an ecosystem of innovation."
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-[10px] font-black text-brand-gold font-mono">
                    S
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">SISTec Innovation Cell</h5>
                    <p className="text-[10px] text-brand-gray">Sagar Group of Institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Interactive Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-12">
            {objectiveList.map((obj, idx) => {
              const IconComponent = obj.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-[2rem] bg-brand-card/35 backdrop-blur-md border border-white/5 ${obj.borderColor} bg-gradient-to-b ${obj.color} flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-card-shadow ${obj.glow} group relative overflow-hidden`}
                >
                  {/* Visual Watermark background icon */}
                  <div className="absolute right-0 bottom-0 text-[10rem] text-white/[0.01] pointer-events-none transform translate-x-6 translate-y-6 group-hover:scale-110 group-hover:text-white/[0.02] transition-all duration-500 flex items-center justify-center">
                    <IconComponent className="w-40 h-40" />
                  </div>

                  {/* Index tag on the top right */}
                  <span className="absolute right-4 top-4 text-xs font-mono font-bold text-white/20 group-hover:text-white/40 transition-colors">
                    {obj.index}
                  </span>

                  <div className="relative z-10">
                    {/* Icon container with gradient border and hover rotation */}
                    <div className="w-12 h-12 rounded-2xl bg-brand-darker border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <IconComponent className={`w-5 h-5 ${obj.iconColor}`} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">
                      {obj.title
                    }</h3>
                    
                    <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed font-normal">
                      {obj.desc}
                    </p>
                  </div>

                  {/* Animated progress accent at the bottom */}
                  <div className={`w-0 h-[1.5px] bg-gradient-to-r ${obj.progressColor} group-hover:w-full transition-all duration-500 mt-6 relative z-10`}></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
