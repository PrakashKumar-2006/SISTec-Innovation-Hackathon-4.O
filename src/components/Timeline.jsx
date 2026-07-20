import React, { useEffect, useState } from 'react';
import { CalendarCheck, Rocket, Flag, Award, ClipboardList } from 'lucide-react';

export default function Timeline({ isStandalone = false }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const events = [
    {
      num: '01',
      title: 'Problem Statements Release',
      date: '10 Sep 2026',
      desc: 'Unveiling challenges to ignite innovative solutions in diverse domains.',
      icon: ClipboardList,
      iconColor: 'text-brand-gold',
      color: 'from-amber-500/15 to-orange-600/5',
      borderColor: 'border-amber-500/30 group-hover:border-amber-500/60',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]',
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
      color: 'from-purple-500/15 to-indigo-600/5',
      borderColor: 'border-purple-500/30 group-hover:border-purple-500/60',
      glow: 'shadow-[0_0_25px_rgba(139,92,246,0.12)] hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]',
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
      color: 'from-cyan-500/15 to-blue-600/5',
      borderColor: 'border-cyan-500/30 group-hover:border-cyan-500/60',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]',
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
      color: 'from-rose-500/15 to-red-600/5',
      borderColor: 'border-rose-500/30 group-hover:border-rose-500/60',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.12)] hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]',
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
      color: 'from-amber-500/15 to-orange-600/5',
      borderColor: 'border-amber-500/30 group-hover:border-amber-500/60',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]',
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
    <section id="timeline" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5`}>
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_12s_ease-in-out_infinite_2s]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.007)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-35 pointer-events-none -z-10" />

      {/* CSS Animation for Flowing Dashed Lines and Floating Cards */}
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
            Timeline of <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-amber-500 bg-clip-text text-transparent">SIH 4.0</span>
          </h2>
        </div>

        {/* ── Desktop Snaking central timeline (md:block only, hidden on mobile) ── */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          
          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            const isLeftNode = ev.isLeftNode; // Original Mockup Curve coordinates (41.6% and 58.3%)
            
            return (
              <div 
                key={idx}
                className="relative w-full min-h-[250px] flex items-center justify-center"
              >
                {/* ── Segment Background SVG ── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                    
                    {/* Centered Mockup Curve Path */}
                    <path 
                      d={isLeftNode ? "M 50 0 C 50 20, 41.6 20, 41.6 50 C 41.6 80, 50 80, 50 100" : "M 50 0 C 50 20, 58.3 20, 58.3 50 C 58.3 80, 50 80, 50 100"} 
                      stroke="#D8AB55" 
                      strokeWidth="2.5" 
                      className="opacity-70"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Horizontal Connector Pin-Line between Node and Card */}
                    <line 
                      x1={isLeftNode ? "41.6" : "58.3"} 
                      y1="50" 
                      x2="50" 
                      y2="50" 
                      stroke={ev.themeColor} 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      className="animate-dash-flow opacity-80"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Connector dot on card border edge */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="4" 
                      fill={ev.themeColor} 
                      className="animate-pulse"
                      style={{ filter: `drop-shadow(0 0 8px ${ev.themeColor})` }}
                    />
                    
                  </svg>
                </div>

                {/* Grid Content Layout */}
                <div className="w-full grid grid-cols-12 items-center relative z-20">
                  
                  {/* Left Column (Col 1 to 6) */}
                  <div className="col-span-6 flex justify-end pr-8">
                    {!isLeftNode && (
                      /* Card on Left side (Step 2, 4) - Styled matching guidelines page colors and loop float animation */
                      <div 
                        style={{ transitionDelay: `${idx * 150}ms` }}
                        className={`w-full max-w-[460px] transform transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
                          animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'
                        } ${ev.floatClass} relative group bg-gradient-to-br ${ev.color} backdrop-blur-md border ${ev.borderColor} ${ev.glow} rounded-2xl p-6 shadow-2xl hover:scale-[1.03] hover:rotate-[0.5deg] transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-3 mb-3.5">
                          <div className="w-8 h-8 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <IconComponent className={`w-4 h-4 ${ev.iconColor}`} />
                          </div>
                          <span className="text-xs font-black text-brand-gold font-mono tracking-wider">{ev.date}</span>
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
                  <div className="col-span-1" />

                  {/* Right Column (Col 7 to 12) */}
                  <div className="col-span-5 flex justify-start pl-8">
                    {isLeftNode && (
                      /* Card on Right side (Step 1, 3, 5) - Styled matching guidelines page colors and loop float animation */
                      <div 
                        style={{ transitionDelay: `${idx * 150}ms` }}
                        className={`w-full max-w-[460px] transform transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
                          animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'
                        } ${ev.floatClass} relative group bg-gradient-to-br ${ev.color} backdrop-blur-md border ${ev.borderColor} ${ev.glow} rounded-2xl p-6 shadow-2xl hover:scale-[1.03] hover:rotate-[0.5deg] transition-all duration-500 text-left`}
                      >
                        <div className="flex items-center gap-3 mb-3.5">
                          <div className="w-8 h-8 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <IconComponent className={`w-4 h-4 ${ev.iconColor}`} />
                          </div>
                          <span className="text-xs font-black text-brand-gold font-mono tracking-wider">{ev.date}</span>
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

                {/* Absolute Floating Nodes matching original mockup positions */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isLeftNode ? 'left-[41.6%]' : 'left-[58.3%]'
                  } -translate-x-1/2 z-30`}
                >
                  <div 
                    className={`w-16 h-16 rounded-full bg-[#0D0D11] border-2 ${ev.nodeBorder} flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 0 15px ${ev.nodeGlow}` }}
                  >
                    <span className="text-[8px] font-black text-slate-400 tracking-widest leading-none">STEP</span>
                    <span className="text-base font-black text-white mt-0.5 leading-none">{ev.num}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Mobile Vertical Timeline (md:hidden) ── */}
        <div className="md:hidden flex flex-col gap-10 max-w-xl mx-auto relative pl-6 text-left animate-fade-in">
          {/* Vertical Connecting Line on Left */}
          <div className="absolute left-6 top-3 bottom-3 w-[1.5px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue pointer-events-none"></div>

          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            return (
              <div key={idx} className="flex gap-6 items-start relative group">
                
                {/* Left Timeline Step Node */}
                <div 
                  className={`w-12 h-12 rounded-full bg-[#0d0d11] border-2 ${ev.nodeBorder} flex flex-col items-center justify-center shrink-0 z-10`}
                  style={{ boxShadow: `0 0 10px ${ev.nodeGlow}` }}
                >
                  <span className="text-[6px] font-black text-slate-400 tracking-widest leading-none">STEP</span>
                  <span className="text-xs font-black text-white leading-none mt-0.5">{ev.num}</span>
                </div>

                {/* Right Detail Card */}
                <div className={`w-full p-5 rounded-2xl bg-gradient-to-br ${ev.color} backdrop-blur-md border ${ev.borderColor} shadow-card-shadow ${ev.glow} relative overflow-hidden text-left`}>
                  
                  {/* Date and Icon */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner">
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
                    {ev.highlights.map((highlight, hIdx) => (
                      <span key={highlight} className="text-[9px] font-semibold text-brand-gray/90 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5">{highlight}</span>
                    ))}
                  </div>

                  {/* Bottom Border Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
