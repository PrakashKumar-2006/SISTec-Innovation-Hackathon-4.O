import React, { useEffect, useState, useRef } from 'react';
import { ClipboardEdit, FileText, Megaphone, Trophy } from 'lucide-react';

export default function ProcessFlow({ isStandalone = false, onViewChange }) {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(isStandalone);

  // Intersection Observer to trigger entrance sequence when scrolled into view
  useEffect(() => {
    if (isStandalone) {
      setHasEnteredViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredViewport(true);
            observer.disconnect(); // Trigger once and disconnect
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the timeline is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [isStandalone]);

  useEffect(() => {
    if (!hasEnteredViewport) return;

    // Slow, elegant entrance sequence with path drawing & step activation
    const timers = [
      setTimeout(() => { setActiveStep(1); setCurrentFocus(0); }, 300),   // Highlight Step 1
      setTimeout(() => { setActiveStep(2); setCurrentFocus(1); }, 2500),  // Highlight Step 2
      setTimeout(() => { setActiveStep(3); setCurrentFocus(2); }, 4700),  // Highlight Step 3
      setTimeout(() => { setActiveStep(4); setCurrentFocus(3); }, 6900),  // Highlight Step 4
      setTimeout(() => { setActiveStep(5); }, 9100)                     // All steps loaded
    ];
    return () => timers.forEach(clearTimeout);
  }, [hasEnteredViewport]);

  // Shifting active glow loop once all cards are loaded
  useEffect(() => {
    if (activeStep < 5) return;

    const interval = setInterval(() => {
      setCurrentFocus((prev) => (prev + 1) % 4);
    }, 4500); // Switch highlighted step every 4.5 seconds

    return () => clearInterval(interval);
  }, [activeStep]);

  const steps = [
    {
      num: '01',
      phase: 'STAGE 01',
      title: 'Team Submission',
      desc: 'Form a team of 2–4 members, fill participant details and register online.',
      icon: ClipboardEdit,
      iconColor: 'text-[#10B981]',
      color: 'from-emerald-500/10 to-teal-600/5',
      borderColor: 'border-emerald-500/20 group-hover:border-emerald-500/50',
      activeColor: 'from-emerald-500/25 to-teal-500/10 border-[#10B981] shadow-[0_0_35px_rgba(16,185,129,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.06)]',
      progressColor: 'from-emerald-500 to-emerald-300',
      themeColor: '#10B981',
      nodeBorder: 'border-emerald-500/60',
      nodeGlow: 'rgba(16,185,129,0.4)',
      isLeftNode: true,
      floatClass: 'process-card-float-1'
    },
    {
      num: '02',
      phase: 'STAGE 02',
      title: 'Idea Nomination',
      desc: 'Submit your PPT/PDF proposal based on the official problem statements.',
      icon: FileText,
      iconColor: 'text-[#EC4899]',
      color: 'from-pink-500/10 to-rose-600/5',
      borderColor: 'border-pink-500/20 group-hover:border-pink-500/50',
      activeColor: 'from-pink-500/25 to-rose-500/10 border-[#EC4899] shadow-[0_0_35px_rgba(236,72,153,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(236,72,153,0.06)]',
      progressColor: 'from-pink-500 to-pink-300',
      themeColor: '#EC4899',
      nodeBorder: 'border-pink-500/60',
      nodeGlow: 'rgba(236,72,153,0.4)',
      isLeftNode: false,
      floatClass: 'process-card-float-2'
    },
    {
      num: '03',
      phase: 'STAGE 03',
      title: 'Announcement',
      desc: 'Expert panel reviews submissions and announces shortlisted teams on portal.',
      icon: Megaphone,
      iconColor: 'text-[#3B82F6]',
      color: 'from-blue-500/10 to-indigo-600/5',
      borderColor: 'border-blue-500/20 group-hover:border-blue-500/50',
      activeColor: 'from-blue-500/25 to-indigo-500/10 border-[#3B82F6] shadow-[0_0_35px_rgba(59,130,246,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.06)]',
      progressColor: 'from-blue-500 to-blue-300',
      themeColor: '#3B82F6',
      nodeBorder: 'border-blue-500/60',
      nodeGlow: 'rgba(59,130,246,0.4)',
      isLeftNode: true,
      floatClass: 'process-card-float-3'
    },
    {
      num: '04',
      phase: 'STAGE 04',
      title: 'Grand Finale',
      desc: '24-hour offline hack battle, final prototype evaluation, and awards ceremony.',
      icon: Trophy,
      iconColor: 'text-[#F2A93B]',
      color: 'from-amber-500/10 to-orange-600/5',
      borderColor: 'border-amber-500/20 group-hover:border-amber-500/50',
      activeColor: 'from-amber-500/25 to-orange-500/10 border-[#F2A93B] shadow-[0_0_35px_rgba(242,169,59,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(242,169,59,0.06)]',
      progressColor: 'from-amber-500 to-yellow-300',
      themeColor: '#F2A93B',
      nodeBorder: 'border-amber-500/60',
      nodeGlow: 'rgba(242,169,59,0.4)',
      isLeftNode: false,
      floatClass: 'process-card-float-4'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className={`relative ${isStandalone ? 'pt-24 pb-12 sm:pt-32 sm:pb-16' : 'py-8 sm:py-12'} bg-brand-dark overflow-hidden border-t border-white/5`}
    >
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-[pulse_12s_ease-in-out_infinite_2s]" />

      {/* CSS Animations for draw path and step sequence */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes process-dash-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-process-dash-flow {
          stroke-dasharray: 8 6;
          animation: process-dash-flow 1.5s linear infinite;
        }
        @keyframes process-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .process-card-float-1 { animation: process-card-float 5s ease-in-out infinite; }
        .process-card-float-2 { animation: process-card-float 5s ease-in-out infinite 1s; }
        .process-card-float-3 { animation: process-card-float 5s ease-in-out infinite 2s; }
        .process-card-float-4 { animation: process-card-float 5s ease-in-out infinite 3s; }

        @keyframes process-draw-path {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-process-draw-path {
          stroke-dasharray: 100;
          animation: process-draw-path 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes process-node-pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-process-node-pop {
          animation: process-node-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-[10px] font-black text-[var(--marigold-deep)] uppercase tracking-[0.25em] font-sans">
            Workflow Infographic
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--clay)] mt-2 leading-tight font-display">
            The Hackathon Process Flow
          </h2>
          <div className="w-12 h-0.5 bg-[var(--marigold)] mx-auto mt-3 rounded-full" />
        </div>

        {/* ── Desktop Snaking central timeline ── */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          
          {steps.map((ev, idx) => {
            const IconComponent = ev.icon;
            const isLeftNode = ev.isLeftNode; // Symmetrical timeline
            
            const isPathActive = activeStep > idx;
            const isNodeActive = activeStep > idx;
            const isCardActive = activeStep > idx;
            const isFocused = currentFocus === idx;

            return (
              <div 
                key={idx}
                className="relative w-full min-h-[130px] flex items-center justify-center"
              >
                {/* ── Segment Background SVG ── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                    
                    {/* Background Static Path (Straight Vertical Line) */}
                    <line 
                      x1="50" 
                      y1="0" 
                      x2="50" 
                      y2="100" 
                      stroke="rgba(220, 193, 144, 0.4)" 
                      strokeWidth="2.5" 
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Active Drawing Path - Straight vertical progress line */}
                    {isPathActive && (
                      <line 
                        x1="50" 
                        y1="0" 
                        x2="50" 
                        y2="100" 
                        stroke={ev.themeColor} 
                        strokeWidth={isFocused ? "3.2" : "2.8"} 
                        className={`transition-all duration-500 ${activeStep === idx + 1 ? 'animate-process-draw-path' : ''}`}
                        style={{
                          strokeDasharray: '100',
                          strokeDashoffset: activeStep > idx + 1 ? '0' : '100',
                          filter: isFocused ? `drop-shadow(0 0 6px ${ev.themeColor})` : 'none'
                        }}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    {/* Horizontal Straight Connector Pin-Line between Node and Card */}
                    {isNodeActive && (
                      <line 
                        x1="50" 
                        y1="50" 
                        x2={isLeftNode ? "41.6" : "58.3"} 
                        y2="50" 
                        stroke={ev.themeColor} 
                        strokeWidth={isFocused ? "2.5" : "2"} 
                        strokeDasharray="4 4"
                        className="animate-process-dash-flow opacity-80"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                  </svg>
                </div>

                {/* ── Perfect Circle Connector Dot (HTML-based, positioned at card border edge) ── */}
                {isNodeActive && (
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-20 shadow-md transition-all duration-300 ${
                      isLeftNode ? 'left-[41.6%] -translate-x-1/2' : 'left-[58.3%] -translate-x-1/2'
                    }`}
                    style={{ 
                      backgroundColor: ev.themeColor,
                      boxShadow: isFocused ? `0 0 8px ${ev.themeColor}` : 'none'
                    }}
                  />
                )}

                {/* Grid Content Layout */}
                <div className="w-full grid grid-cols-12 items-center relative z-20">
                  
                  {/* Left Column (Col 1 to 5) */}
                  <div className="col-span-5 flex justify-end pr-8">
                    {isLeftNode && (
                      /* Card on Left side (Step 1, 3) */
                      <div 
                        className={`w-full max-w-[460px] transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                          isCardActive 
                            ? `opacity-100 translate-y-0 ${isFocused ? 'scale-[1.03] z-30' : 'scale-100 opacity-90 z-20'} ${ev.floatClass}` 
                            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                        } relative group bg-gradient-to-br ${
                          isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                        } backdrop-blur-md rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-7 h-7 rounded-lg bg-brand-darker border ${isFocused ? 'border-brand-gold/45' : 'border-white/5'} flex items-center justify-center shadow-inner transition-colors`}>
                            <IconComponent className={`w-3.5 h-3.5 ${ev.iconColor} ${isFocused ? 'animate-pulse' : ''}`} />
                          </div>
                          <span className={`text-[10px] font-black font-mono tracking-wider transition-colors ${isFocused ? 'text-white' : 'text-brand-gold'}`}>{ev.phase}</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-extrabold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h3>
                          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-semibold">{ev.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Node Spacing */}
                  <div className="col-span-2" />

                  {/* Right Column (Col 7 to 12) */}
                  <div className="col-span-5 flex justify-start pl-8">
                    {!isLeftNode && (
                      /* Card on Right side (Step 2, 4) */
                      <div 
                        className={`w-full max-w-[460px] transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                          isCardActive 
                            ? `opacity-100 translate-y-0 ${isFocused ? 'scale-[1.03] z-30' : 'scale-100 opacity-90 z-20'} ${ev.floatClass}` 
                            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                        } relative group bg-gradient-to-br ${
                          isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                        } backdrop-blur-md rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-7 h-7 rounded-lg bg-brand-darker border ${isFocused ? 'border-brand-gold/45' : 'border-white/5'} flex items-center justify-center shadow-inner transition-colors`}>
                            <IconComponent className={`w-3.5 h-3.5 ${ev.iconColor} ${isFocused ? 'animate-pulse' : ''}`} />
                          </div>
                          <span className={`text-[10px] font-black font-mono tracking-wider transition-colors ${isFocused ? 'text-white' : 'text-brand-gold'}`}>{ev.phase}</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-extrabold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h3>
                          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-semibold">{ev.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Absolute Floating Nodes with active pulsing sonar ring */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 left-[50%] -translate-x-1/2 z-30"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="relative flex items-center justify-center w-16 h-16">
                    {/* Sonar Ring for the active focused step */}
                    {isNodeActive && isFocused && (
                      <div 
                        className="absolute w-16 h-16 rounded-full border-2 opacity-50 animate-[ping_1.8s_ease-out_infinite]"
                        style={{ borderColor: ev.themeColor }}
                      />
                    )}

                    {isNodeActive ? (
                      <div 
                        className={`w-10 h-10 rounded-full bg-white border-2 ${ev.nodeBorder} flex flex-col items-center justify-center shadow-lg transition-all duration-500 animate-process-node-pop ${
                          isFocused ? 'scale-110' : 'scale-100 opacity-90'
                        }`}
                        style={{ 
                          boxShadow: isFocused ? `0 0 15px ${ev.nodeGlow}` : 'none'
                        }}
                      >
                        <span className="text-[7px] font-black text-[var(--ink-soft)] tracking-wider leading-none">STAGE</span>
                        <span className="text-xs font-black text-[var(--clay)] mt-0.5 leading-none">{ev.num}</span>
                      </div>
                    ) : (
                      /* Greyed out / disabled uncompleted step node */
                      <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border-2 border-[var(--line-strong)]/30 flex flex-col items-center justify-center text-[var(--ink-faint)]">
                        <span className="text-[7px] font-bold tracking-wider leading-none">STAGE</span>
                        <span className="text-xs font-bold mt-0.5 leading-none">{ev.num}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Mobile Vertical Timeline (md:hidden) ── */}
        <div className="md:hidden flex flex-col gap-6 max-w-xl mx-auto relative pl-6 text-left">
          
          {/* Background vertical line (uncompleted) */}
          <div className="absolute left-6 top-3 bottom-3 w-[1.5px] bg-[var(--line-strong)]/40 pointer-events-none" />

          {/* Glowing active drawing vertical line */}
          <div 
            className="absolute left-6 top-3 w-[2px] bg-gradient-to-b from-[#10B981] via-[#EC4899] to-[#F2A93B] pointer-events-none transition-all duration-1000 ease-out"
            style={{
              height: `${Math.min(100, Math.max(0, (activeStep - 1) * 33.3))}%`,
              maxHeight: '96%'
            }}
          />

          {steps.map((ev, idx) => {
            const IconComponent = ev.icon;
            const isStepActive = activeStep > idx;
            const isFocused = currentFocus === idx;

            return (
              <div key={idx} className="flex gap-4 items-start relative group">
                
                {/* Left Timeline Step Node */}
                <div className="relative shrink-0 z-10">
                  {isStepActive && isFocused && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 opacity-50 animate-[ping_1.8s_ease-out_infinite]"
                      style={{ borderColor: ev.themeColor }}
                    />
                  )}
                  {isStepActive ? (
                    <div 
                      className={`w-10 h-10 rounded-full bg-white border-2 ${ev.nodeBorder} flex flex-col items-center justify-center shadow-lg transition-transform duration-500 ${
                        isFocused ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      <span className="text-[5px] font-black text-[var(--ink-soft)] tracking-wider">STAGE</span>
                      <span className="text-xs font-black text-[var(--clay)]">{ev.num}</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border-2 border-[var(--line-strong)]/30 flex flex-col items-center justify-center text-[var(--ink-faint)]">
                      <span className="text-[5px] font-bold tracking-wider">STAGE</span>
                      <span className="text-xs font-bold">{ev.num}</span>
                    </div>
                  )}
                </div>

                {/* Right Card Content */}
                <div 
                  className={`flex-1 transform transition-all duration-700 ${
                    isStepActive 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8 pointer-events-none'
                  } bg-gradient-to-br ${
                    isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                  } backdrop-blur-md rounded-2xl p-4 shadow-xl text-left`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center">
                      <IconComponent className={`w-3.5 h-3.5 ${ev.iconColor}`} />
                    </div>
                    <span className={`text-[10px] font-black font-mono tracking-wider ${isFocused ? 'text-white' : 'text-brand-gold'}`}>{ev.phase}</span>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-base font-extrabold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">{ev.desc}</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
