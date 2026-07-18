import React, { useState, useEffect } from 'react';
import { CheckCircle2, Award, ClipboardEdit, Sparkles, ArrowRight } from 'lucide-react';

export default function ProcessFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Team Submission',
      desc: 'Form a team of 2-4 members, fill in developer profiles, and register online.',
      icon: ClipboardEdit,
      iconColor: 'text-emerald-400',
      color: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      progressColor: 'from-emerald-500 to-emerald-300'
    },
    {
      num: '02',
      title: 'Idea Nomination',
      desc: 'Submit your PPT/PDF proposal based on the official problem statements.',
      icon: CheckCircle2,
      iconColor: 'text-pink-400',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(236,72,153,0.15)]',
      progressColor: 'from-pink-500 to-pink-300'
    },
    {
      num: '03',
      title: 'Announcement',
      desc: 'Expert panel reviews nominations; shortlisted teams are announced on the portal.',
      icon: Sparkles,
      iconColor: 'text-blue-400',
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
      progressColor: 'from-blue-500 to-blue-300'
    },
    {
      num: '04',
      title: 'Grand Finale',
      desc: '36-hour coding battle at SISTec campus, followed by judging rounds and awards.',
      icon: Award,
      iconColor: 'text-amber-400',
      color: 'from-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]',
      progressColor: 'from-amber-500 to-amber-300'
    }
  ];

  // Autoplay loop to highlight steps one after another in normal state
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3000); // Shift every 3 seconds
    return () => clearInterval(interval);
  }, [isHovered, steps.length]);

  return (
    <section id="process" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Custom Styles for moving timeline light beam */}
      <style>{`
        @keyframes timeline-beam {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-timeline-beam {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 200px;
          background: linear-gradient(90deg, transparent, rgba(216, 171, 85, 0.4), transparent);
          animation: timeline-beam 6s linear infinite;
        }
      `}</style>

      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
            The Hackathon <span className="text-gold-metallic">Process Flow</span>
          </h2>
        </div>

        {/* Desktop Process Timeline Flow */}
        <div className="hidden lg:grid grid-cols-4 gap-8 items-stretch relative max-w-7xl mx-auto pt-16">
          
          {/* Connector Line Container */}
          <div className="absolute top-0 left-[12%] right-[12%] h-[2px] bg-white/5 -translate-y-4 overflow-hidden">
            {/* Glowing animated beam */}
            <div className="animate-timeline-beam"></div>
          </div>
          
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = idx === activeIndex;

            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center group relative cursor-pointer"
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveIndex(idx);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              >
                
                {/* Floating Timeline Index Node */}
                <div className={`absolute top-0 -translate-y-9 w-10 h-10 rounded-full bg-brand-darker border transition-all duration-500 shadow-inner z-20 flex items-center justify-center ${
                  isActive ? 'border-brand-gold/60 text-brand-gold' : 'border-white/10 text-brand-gray'
                }`}>
                  <span className={`text-xs sm:text-sm font-bold font-mono transition-colors duration-500 ${
                    isActive ? 'text-brand-gold' : 'text-brand-gray'
                  }`}>
                    {step.num}
                  </span>
                  {/* Subtle pulsing outer ring */}
                  <span className={`absolute inset-0 rounded-full border transition-all duration-500 pointer-events-none ${
                    isActive ? 'border-brand-gold/40 scale-125' : 'border-brand-gold/0 scale-100'
                  }`}></span>
                </div>

                {/* Vertical connecting line indicator */}
                <div className={`absolute top-0 w-[1px] h-10 bg-gradient-to-b transition-all duration-500 pointer-events-none -translate-y-2 ${
                  isActive ? 'from-brand-gold/35 to-transparent' : 'from-white/10 to-transparent'
                }`}></div>

                {/* Progressive Arrow Indicator (except last step) */}
                {idx < 3 && (
                  <div className={`absolute top-0 right-[-24px] -translate-y-6 z-20 transition-colors duration-500 ${
                    isActive ? 'text-brand-gold/30' : 'text-white/10'
                  }`}>
                    <ArrowRight size={16} className="animate-pulse" />
                  </div>
                )}

                {/* Detail Glassmorphic Card */}
                <div className={`p-6 rounded-[2.5rem] bg-brand-card/35 backdrop-blur-md border bg-gradient-to-b ${step.color} transition-all duration-500 shadow-card-shadow w-full h-full flex flex-col justify-between relative overflow-hidden mt-6 ${
                  isActive 
                    ? `border-white/20 -translate-y-2 ${step.borderColor} ${step.activeGlow}` 
                    : 'border-white/5 translate-y-0'
                }`}>
                  
                  {/* Visual Watermark backdrop icon */}
                  <div className={`absolute right-0 bottom-0 text-[10rem] text-white/5 pointer-events-none transform translate-x-6 translate-y-6 transition-all duration-500 flex items-center justify-center ${
                    isActive ? 'scale-110 opacity-[0.02]' : 'scale-100 opacity-[0.01]'
                  }`}>
                    <IconComponent className="w-32 h-32" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-2xl bg-brand-darker border border-white/5 flex items-center justify-center mb-6 mx-auto shadow-inner transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${step.iconColor}`} />
                    </div>

                    <h3 className={`text-lg font-bold tracking-wide font-display transition-colors duration-500 ${
                      isActive ? 'text-brand-gold' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand-gray mt-3 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {/* Card bottom progress matching gradient */}
                  <div className={`h-[1.5px] bg-gradient-to-r ${step.progressColor} transition-all duration-500 mt-6 mx-auto relative z-10 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Process Timeline Flow */}
        <div className="lg:hidden flex flex-col gap-10 max-w-md mx-auto relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-3 bottom-3 w-[1px] bg-white/5 pointer-events-none"></div>

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = idx === activeIndex;

            return (
              <div 
                key={idx} 
                className="flex gap-6 items-start relative group cursor-pointer"
                onTouchStart={() => {
                  setActiveIndex(idx);
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveIndex(idx);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              >
                
                {/* Left Timeline Step Node */}
                <div className={`w-12 h-12 rounded-2xl bg-brand-darker border flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-colors duration-500 ${
                  isActive ? 'border-brand-gold text-brand-gold' : 'border-white/10 text-brand-gray'
                }`}>
                  <span className="text-sm sm:text-base font-bold font-mono">
                    {step.num}
                  </span>
                </div>
                
                {/* Detail Glassmorphic Card */}
                <div className={`p-6 rounded-3xl bg-brand-card/35 backdrop-blur-md border bg-gradient-to-b ${step.color} transition-all duration-500 shadow-card-shadow w-full text-left relative overflow-hidden ${
                  isActive 
                    ? `border-white/20 -translate-y-1 ${step.borderColor} ${step.activeGlow}` 
                    : 'border-white/5 translate-y-0'
                }`}>
                  
                  {/* Visual Watermark backdrop icon */}
                  <div className={`absolute right-0 bottom-0 text-[10rem] text-white/5 pointer-events-none transform translate-x-6 translate-y-6 transition-all duration-500 flex items-center justify-center ${
                    isActive ? 'scale-110 opacity-[0.02]' : 'scale-100 opacity-[0.01]'
                  }`}>
                    <IconComponent className="w-24 h-24" />
                  </div>

                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className={`w-9 h-9 rounded-xl bg-brand-darker border border-white/5 flex items-center justify-center transition-transform duration-300 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}>
                      <IconComponent className={`w-4.5 h-4.5 ${step.iconColor}`} />
                    </div>
                    <h3 className={`text-base font-bold tracking-wide font-display transition-colors duration-500 ${
                      isActive ? 'text-brand-gold' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-brand-gray leading-relaxed font-normal relative z-10">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
