import React, { useEffect, useState, useRef } from 'react';
import { CalendarCheck, Rocket, Flag, Award, ClipboardList } from 'lucide-react';

export default function Timeline({ isStandalone = false }) {
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

    // Phase 1: Slow, elegant entrance sequence with path drawing & step activation
    const timers = [
      setTimeout(() => { setActiveStep(1); setCurrentFocus(0); }, 300),   // Draw Step 1, highlight Step 1
      setTimeout(() => { setActiveStep(2); setCurrentFocus(1); }, 2500),  // Draw Step 2, highlight Step 2
      setTimeout(() => { setActiveStep(3); setCurrentFocus(2); }, 4700),  // Draw Step 3, highlight Step 3
      setTimeout(() => { setActiveStep(4); setCurrentFocus(3); }, 6900),  // Draw Step 4, highlight Step 4
      setTimeout(() => { setActiveStep(5); setCurrentFocus(4); }, 9110),  // Draw Step 5, highlight Step 5
      setTimeout(() => { setActiveStep(6); }, 11300)                     // All steps loaded
    ];
    return () => timers.forEach(clearTimeout);
  }, [hasEnteredViewport]);

  // Phase 2: Shifting active glow loop once all cards are loaded (Slowed down to 4.5s)
  useEffect(() => {
    if (activeStep < 6) return;

    const interval = setInterval(() => {
      setCurrentFocus((prev) => (prev + 1) % 5);
    }, 4500); // Switch highlighted step every 4.5 seconds (relaxed pace)

    return () => clearInterval(interval);
  }, [activeStep]);

  const events = [
    {
      num: '01',
      title: 'Problem Statements Release',
      date: '10 Sep 2026',
      desc: 'Unveiling challenges to ignite innovative solutions in diverse domains.',
      icon: ClipboardList,
      iconColor: 'text-brand-gold',
      color: 'from-amber-500/10 to-orange-600/5',
      borderColor: 'border-amber-500/20 group-hover:border-amber-500/50',
      activeColor: 'from-amber-500/25 to-orange-500/10 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.06)]',
      progressColor: 'from-brand-gold to-yellow-300',
      highlights: ['12+ Domains', 'Curated Statements', 'Open Track Active'],
      themeColor: '#D8AB55',
      nodeBorder: 'border-brand-gold/60',
      nodeGlow: 'rgba(216,171,85,0.4)',
      isLeftNode: true,
      floatClass: 'timeline-card-float-1'
    },
    {
      num: '02',
      title: 'Registration Period',
      date: '10 Sep - 02 Nov 2026',
      desc: 'Participants sign up for the engaging hackathon and complete profile verification.',
      icon: CalendarCheck,
      iconColor: 'text-purple-400',
      color: 'from-purple-500/10 to-indigo-600/5',
      borderColor: 'border-purple-500/20 group-hover:border-purple-500/50',
      activeColor: 'from-purple-500/25 to-indigo-500/10 border-purple-400/80 shadow-[0_0_35px_rgba(139,92,246,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.06)]',
      progressColor: 'from-purple-500 to-purple-300',
      highlights: ['Online Register', '2-4 Members/Team', 'Verification Check'],
      themeColor: '#8B5CF6',
      nodeBorder: 'border-purple-500/60',
      nodeGlow: 'rgba(139,92,246,0.4)',
      isLeftNode: false,
      floatClass: 'timeline-card-float-2'
    },
    {
      num: '03',
      title: 'Scrutiny Result',
      date: '04 Nov 2026',
      desc: 'Expert panel evaluates proposals and determines qualified entries for the grand hackathon.',
      icon: Flag,
      iconColor: 'text-cyan-400',
      color: 'from-cyan-500/10 to-blue-600/5',
      borderColor: 'border-cyan-500/20 group-hover:border-cyan-500/50',
      activeColor: 'from-cyan-500/25 to-blue-500/10 border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.06)]',
      progressColor: 'from-cyan-500 to-cyan-300',
      highlights: ['Proposal Review', 'Shortlist Release', 'Email Invites Sent'],
      themeColor: '#06B6D4',
      nodeBorder: 'border-cyan-500/60',
      nodeGlow: 'rgba(6,182,212,0.4)',
      isLeftNode: true,
      floatClass: 'timeline-card-float-3'
    },
    {
      num: '04',
      title: 'Inauguration & Hacking',
      date: '07 Nov 2026',
      desc: 'Grand opening ceremony, fostering collaboration, mentorship kickoff, and round 1 evaluation.',
      icon: Rocket,
      iconColor: 'text-pink-400',
      color: 'from-rose-500/10 to-red-600/5',
      borderColor: 'border-rose-500/20 group-hover:border-rose-500/50',
      activeColor: 'from-rose-500/25 to-red-500/10 border-rose-400/80 shadow-[0_0_35px_rgba(244,63,94,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.06)]',
      progressColor: 'from-pink-500 to-pink-300',
      highlights: ['Mentorship Kick', '24h Continuous Build', 'Round 1 Eval'],
      themeColor: '#EC4899',
      nodeBorder: 'border-pink-500/60',
      nodeGlow: 'rgba(236,72,153,0.4)',
      isLeftNode: false,
      floatClass: 'timeline-card-float-4'
    },
    {
      num: '05',
      title: 'Valedictory & Awards',
      date: '08 Nov 2026',
      desc: 'Recognizing outstanding student accomplishments, project presentations, and winner announcements.',
      icon: Award,
      iconColor: 'text-brand-gold',
      color: 'from-amber-500/10 to-orange-600/5',
      borderColor: 'border-amber-500/20 group-hover:border-amber-500/50',
      activeColor: 'from-amber-500/25 to-orange-500/10 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.28)]',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.06)]',
      progressColor: 'from-brand-gold to-yellow-300',
      highlights: ['Jury Pitching', 'Cash Reward Distribution', 'Incubation Support'],
      themeColor: '#D8AB55',
      nodeBorder: 'border-brand-gold/60',
      nodeGlow: 'rgba(216,171,85,0.4)',
      isLeftNode: true,
      floatClass: 'timeline-card-float-5'
    }
  ];

  return (
    <section ref={sectionRef} id="timeline" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5`}>
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_12s_ease-in-out_infinite_2s]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.007)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-35 pointer-events-none -z-10" />

      {/* CSS Animations for draw path and step sequence */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-dash-flow {
          stroke-dasharray: 8 6;
          animation: dash-flow 1.5s linear infinite;
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .timeline-card-float-1 { animation: card-float 5s ease-in-out infinite; }
        .timeline-card-float-2 { animation: card-float 5s ease-in-out infinite 1s; }
        .timeline-card-float-3 { animation: card-float 5s ease-in-out infinite 2s; }
        .timeline-card-float-4 { animation: card-float 5s ease-in-out infinite 3s; }
        .timeline-card-float-5 { animation: card-float 5s ease-in-out infinite 4s; }

        @keyframes draw-path {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-path {
          stroke-dasharray: 120;
          animation: draw-path 2.0s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes node-pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-node-pop {
          animation: node-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--vermilion)] font-sans uppercase mb-3 flex items-center justify-center gap-2">
            Roadmap &amp; Milestones
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] leading-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Timeline of <span className="text-[var(--marigold-deep)]">SIH 4.0</span>
          </h2>
        </div>


        {/* ── Desktop Snaking central timeline ── */}
        <div className="hidden md:block max-w-5xl mx-auto relative">

          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            const isLeftNode = ev.isLeftNode; // Original Mockup Curve coordinates
            const pathD = isLeftNode
              ? "M 50 0 C 50 20, 41.6 20, 41.6 50 C 41.6 80, 50 80, 50 100"
              : "M 50 0 C 50 20, 58.3 20, 58.3 50 C 58.3 80, 50 80, 50 100";

            const isPathActive = activeStep > idx;
            const isNodeActive = activeStep > idx;
            const isCardActive = activeStep > idx;

            // Check if this specific step is currently focused/highlighted
            const isFocused = currentFocus === idx;

            return (
              <div
                key={idx}
                className="relative w-full min-h-[250px] flex items-center justify-center"
              >
                {/* ── Segment Background SVG ── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">

                    {/* Background Static Path (Visible soft warm line) */}
                    <path
                      d={pathD}
                      stroke="rgba(220, 193, 144, 0.4)"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Active Drawing S-Curve Path - Draw speed slowed to 2.0s */}
                    {isPathActive && (
                      <path
                        d={pathD}
                        stroke={ev.themeColor}
                        strokeWidth={isFocused ? "3.2" : "2.8"}
                        className={`transition-all duration-500 ${activeStep === idx + 1 ? 'animate-draw-path' : ''}`}
                        style={{
                          strokeDasharray: '120',
                          strokeDashoffset: activeStep > idx + 1 ? '0' : '120',
                          filter: isFocused ? `drop-shadow(0 0 6px ${ev.themeColor})` : 'none'
                        }}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    {/* Horizontal Connector Pin-Line between Node and Card */}
                    {isNodeActive && (
                      <line
                        x1={isLeftNode ? "41.6" : "58.3"}
                        y1="50"
                        x2={isLeftNode ? "55" : "45"}
                        y2="50"
                        stroke={ev.themeColor}
                        strokeWidth={isFocused ? "2.5" : "2"}
                        strokeDasharray="4 4"
                        className="animate-dash-flow opacity-80"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                  </svg>
                </div>

                {/* ── Perfect Circle Connector Dot (HTML-based, positioned at card border edge) ── */}
                {isNodeActive && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full z-20 shadow-md transition-all duration-300 ${isLeftNode ? 'left-[55%] -translate-x-1/2' : 'left-[45%] -translate-x-1/2'
                      }`}
                    style={{
                      backgroundColor: ev.themeColor,
                      boxShadow: isFocused ? `0 0 10px ${ev.themeColor}` : 'none'
                    }}
                  />
                )}

                {/* Grid Content Layout */}
                <div className="w-full grid grid-cols-12 items-center relative z-20">

                  {/* Left Column (Col 1 to 5) */}
                  <div className="col-span-5 flex justify-end pr-8">
                    {!isLeftNode && (
                      /* Card on Left side (Step 2, 4) - Highlighted with activeColor and extra scale if focused */
                      <div
                        className={`w-full max-w-[460px] transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isCardActive
                            ? `opacity-100 translate-y-0 ${isFocused ? 'scale-[1.05] z-30' : 'scale-100 opacity-90 z-20'} ${ev.floatClass}`
                            : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                          } relative group bg-gradient-to-br ${isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                          } backdrop-blur-md rounded-2xl p-6 shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-3 mb-3.5">
                          <div className={`w-8 h-8 rounded-lg bg-brand-darker border ${isFocused ? 'border-brand-gold/45' : 'border-white/5'} flex items-center justify-center shadow-inner transition-colors`}>
                            <IconComponent className={`w-4 h-4 ${ev.iconColor} ${isFocused ? 'animate-pulse' : ''}`} />
                          </div>
                          <span className={`text-xs font-black font-mono tracking-wider transition-colors ${isFocused ? 'text-white' : 'text-brand-gold'}`}>{ev.date}</span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">{ev.desc}</p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                          {ev.highlights.map((h, i) => (
                            <span key={i} className="text-[9px] sm:text-[10px] font-black text-slate-300 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5">{h}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Node Spacing */}
                  <div className="col-span-2" />

                  {/* Right Column (Col 7 to 12) */}
                  <div className="col-span-5 flex justify-start pl-8">
                    {isLeftNode && (
                      /* Card on Right side (Step 1, 3, 5) - Highlighted with activeColor and extra scale if focused */
                      <div
                        className={`w-full max-w-[460px] transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isCardActive
                            ? `opacity-100 translate-y-0 ${isFocused ? 'scale-[1.05] z-30' : 'scale-100 opacity-90 z-20'} ${ev.floatClass}`
                            : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                          } relative group bg-gradient-to-br ${isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                          } backdrop-blur-md rounded-2xl p-6 shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-3 mb-3.5">
                          <div className={`w-8 h-8 rounded-lg bg-brand-darker border ${isFocused ? 'border-brand-gold/45' : 'border-white/5'} flex items-center justify-center shadow-inner transition-colors`}>
                            <IconComponent className={`w-4 h-4 ${ev.iconColor} ${isFocused ? 'animate-pulse' : ''}`} />
                          </div>
                          <span className={`text-xs font-black font-mono tracking-wider transition-colors ${isFocused ? 'text-white' : 'text-brand-gold'}`}>{ev.date}</span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">{ev.desc}</p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                          {ev.highlights.map((h, i) => (
                            <span key={i} className="text-[9px] sm:text-[10px] font-black text-slate-300 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5">{h}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Absolute Floating Nodes with active pulsing sonar ring */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${isLeftNode ? 'left-[41.6%]' : 'left-[58.3%]'
                    } -translate-x-1/2 z-30`}
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <div className="relative flex items-center justify-center w-24 h-24">
                    {/* Sonar Ring for the active focused step */}
                    {isNodeActive && isFocused && (
                      <div
                        className="absolute w-24 h-24 rounded-full border-2 opacity-50 animate-[ping_1.8s_ease-out_infinite]"
                        style={{ borderColor: ev.themeColor }}
                      />
                    )}

                    {isNodeActive ? (
                      <div
                        className={`w-16 h-16 rounded-full bg-white border-2 ${ev.nodeBorder} flex flex-col items-center justify-center shadow-lg transition-all duration-500 animate-node-pop ${isFocused ? 'scale-110' : 'scale-100 opacity-90'
                          }`}
                        style={{
                          boxShadow: isFocused ? `0 0 20px ${ev.nodeGlow}` : 'none'
                        }}
                      >
                        <span className="text-[8px] font-black text-[var(--ink-soft)] tracking-widest leading-none">STEP</span>
                        <span className="text-base font-black text-[var(--clay)] mt-0.5 leading-none">{ev.num}</span>
                      </div>
                    ) : (
                      /* Greyed out / disabled uncompleted step node */
                      <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[var(--line-strong)]/30 flex flex-col items-center justify-center text-[var(--ink-faint)]">
                        <span className="text-[8px] font-bold tracking-widest leading-none">STEP</span>
                        <span className="text-base font-bold mt-0.5 leading-none">{ev.num}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Mobile Vertical Timeline (md:hidden) ── */}
        <div className="md:hidden flex flex-col gap-10 max-w-xl mx-auto relative pl-6 text-left">

          {/* Background vertical line (uncompleted) */}
          <div className="absolute left-6 top-3 bottom-3 w-[1.5px] bg-[var(--line-strong)]/40 pointer-events-none" />

          {/* Glowing active drawing vertical line */}
          <div
            className="absolute left-6 top-3 w-[2px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue pointer-events-none transition-all duration-1000 ease-out"
            style={{
              height: `${Math.min(100, Math.max(0, (activeStep - 1) * 25))}%`,
              maxHeight: '96%'
            }}
          />

          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            const isStepActive = activeStep > idx;
            const isFocused = currentFocus === idx;

            return (
              <div key={idx} className="flex gap-6 items-start relative group">

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
                      className={`w-12 h-12 rounded-full bg-white border-2 ${ev.nodeBorder} flex flex-col items-center justify-center animate-node-pop ${isFocused ? 'scale-105 shadow-lg' : 'scale-100 opacity-90'
                        }`}
                      style={{ boxShadow: isFocused ? `0 0 12px ${ev.nodeGlow}` : 'none' }}
                    >
                      <span className="text-[6px] font-black text-[var(--ink-soft)] tracking-widest leading-none">STEP</span>
                      <span className="text-xs font-black text-[var(--clay)] leading-none mt-0.5">{ev.num}</span>
                    </div>
                  ) : (
                    /* Disabled state node */
                    <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border-2 border-[var(--line-strong)]/30 flex flex-col items-center justify-center text-[var(--ink-faint)]">
                      <span className="text-[6px] font-bold tracking-widest leading-none">STEP</span>
                      <span className="text-xs font-bold leading-none mt-0.5">{ev.num}</span>
                    </div>
                  )}
                </div>

                {/* Right Detail Card */}
                <div
                  className={`w-full p-5 rounded-2xl bg-gradient-to-br ${isFocused ? ev.activeColor : `${ev.color} border ${ev.borderColor} ${ev.glow}`
                    } backdrop-blur-md shadow-card-shadow relative overflow-hidden text-left transition-all duration-700 ${isStepActive
                      ? `opacity-100 translate-y-0 ${isFocused ? 'scale-[1.02]' : 'scale-100 opacity-95'}`
                      : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
                >
                  {/* Date and Icon */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className={`w-8 h-8 rounded-lg bg-brand-darker border ${isFocused ? 'border-brand-gold/45' : 'border-white/5'} flex items-center justify-center shadow-inner transition-colors`}>
                      <IconComponent className={`w-4 h-4 ${ev.iconColor}`} />
                    </div>
                    <span className="text-xs font-bold text-brand-gold font-mono">{ev.date}</span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-lg font-bold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">{ev.title}</h3>
                    <p className="text-xs text-brand-gray leading-relaxed font-normal">{ev.desc}</p>
                  </div>

                  {/* Highlights tags */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5 relative z-10">
                    {ev.highlights.map((highlight) => (
                      <span key={highlight} className="text-[9px] font-semibold text-brand-gray/90 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5">{highlight}</span>
                    ))}
                  </div>

                  {/* Bottom Border Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
