import React from 'react';
import { CalendarCheck, Rocket, Flag, Award, ClipboardList } from 'lucide-react';

export default function Timeline() {
  const events = [
    {
      num: '01',
      title: 'Problem Statements Release',
      date: '10 Sep 2026',
      desc: 'Unveiling challenges to ignite innovative solutions in diverse domains.',
      icon: ClipboardList,
      iconColor: 'text-emerald-400',
      color: 'from-emerald-500/10 to-transparent',
      borderColor: 'hover:border-emerald-500/30 shadow-emerald-500/5',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      progressColor: 'from-emerald-500 to-emerald-300',
      nodeColor: 'group-hover:border-emerald-400 group-hover:bg-emerald-400/20',
      highlights: ['12+ Domains', 'Curated Statements', 'Open Track Active']
    },
    {
      num: '02',
      title: 'Registration Period',
      date: '10 Sep - 02 Nov 2026',
      desc: 'Participants sign up for the engaging hackathon and complete profile verification.',
      icon: CalendarCheck,
      iconColor: 'text-purple-400',
      color: 'from-purple-500/10 to-transparent',
      borderColor: 'hover:border-purple-500/30 shadow-purple-500/5',
      glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
      progressColor: 'from-purple-500 to-purple-300',
      nodeColor: 'group-hover:border-purple-400 group-hover:bg-purple-400/20',
      highlights: ['Online Register', '2-4 Members/Team', 'Verification Check']
    },
    {
      num: '03',
      title: 'Scrutiny Result',
      date: '04 Nov 2026',
      desc: 'Expert panel evaluates proposals and determines qualified entries for the grand hackathon.',
      icon: Flag,
      iconColor: 'text-cyan-400',
      color: 'from-cyan-500/10 to-transparent',
      borderColor: 'hover:border-cyan-500/30 shadow-cyan-500/5',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      progressColor: 'from-cyan-500 to-cyan-300',
      nodeColor: 'group-hover:border-cyan-400 group-hover:bg-cyan-400/20',
      highlights: ['Proposal Review', 'Shortlist Release', 'Email Invites Sent']
    },
    {
      num: '04',
      title: 'Inauguration & Hacking',
      date: '07 Nov 2026',
      desc: 'Grand opening ceremony, fostering collaboration, mentorship kickoff, and round 1 evaluation.',
      icon: Rocket,
      iconColor: 'text-pink-400',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'hover:border-pink-500/30 shadow-pink-500/5',
      glow: 'group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]',
      progressColor: 'from-pink-500 to-pink-300',
      nodeColor: 'group-hover:border-pink-400 group-hover:bg-pink-400/20',
      highlights: ['Mentorship Kick', '36h Continuous Build', 'Round 1 Eval']
    },
    {
      num: '05',
      title: 'Valedictory & Awards',
      date: '08 Nov 2026',
      desc: 'Recognizing outstanding student accomplishments, project presentations, and winner announcements.',
      icon: Award,
      iconColor: 'text-amber-400',
      color: 'from-amber-500/10 to-transparent',
      borderColor: 'hover:border-amber-500/30 shadow-amber-500/5',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      progressColor: 'from-amber-500 to-amber-300',
      nodeColor: 'group-hover:border-amber-400 group-hover:bg-amber-400/20',
      highlights: ['Jury Pitching', 'Cash Reward Distribution', 'Incubation Support']
    }
  ];

  return (
    <section id="timeline" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
            Timeline of <span className="text-gold-metallic">SIH 4.0</span>
          </h2>
        </div>

        {/* Desktop Alternating Animated Timeline Path (md:block only, hidden on mobile) */}
        <div className="hidden md:block relative max-w-5xl mx-auto pt-6">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue -translate-x-[1px] pointer-events-none"></div>

          <div className="space-y-12">
            {events.map((ev, idx) => {
              const IconComponent = ev.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-row relative items-center justify-between group ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing index node on the line */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-[calc(50%-16px)] w-8 h-8 rounded-full bg-brand-darker border border-white/10 ${ev.nodeColor} flex items-center justify-center z-20 transition-all duration-500 shadow-sm`}>
                    <span className="text-[10px] font-bold font-mono text-brand-gray group-hover:text-white transition-colors">
                      {ev.num}
                    </span>
                    <span className="absolute inset-0 rounded-full border border-brand-gold/0 group-hover:border-brand-gold/30 group-hover:scale-125 transition-all duration-500 pointer-events-none"></span>
                  </div>

                  {/* Horizontal Connection line indicator */}
                  <div 
                    className={`absolute top-1/2 h-[1px] bg-white/5 group-hover:bg-brand-gold/40 transition-all duration-500 pointer-events-none ${
                      isEven ? 'left-[50%] right-[44%]' : 'left-[44%] right-[50%]'
                    }`}
                  ></div>

                  {/* Glassmorphic Event Details Card */}
                  <div className={`w-[44%] p-5 rounded-[2rem] bg-brand-card/35 backdrop-blur-md border border-white/5 ${ev.borderColor} bg-gradient-to-b ${ev.color} transition-all duration-500 hover:-translate-y-1.5 shadow-card-shadow ${ev.glow} relative overflow-hidden text-left`}>
                    
                    {/* Background Watermark Icon */}
                    <div className="absolute right-0 bottom-0 text-[8rem] text-white/[0.005] pointer-events-none transform translate-x-4 translate-y-4 group-hover:scale-110 group-hover:text-white/[0.01] transition-all duration-500 flex items-center justify-center">
                      <IconComponent className="w-24 h-24" />
                    </div>

                    {/* Date Badge */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className={`w-4 h-4 ${ev.iconColor}`} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-brand-gold font-mono">
                        {ev.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">
                        {ev.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                        {ev.desc}
                      </p>
                    </div>

                    {/* Highlights tags */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5 relative z-10">
                      {ev.highlights.map((highlight, hIdx) => (
                        <span 
                          key={hIdx} 
                          className="text-[9px] font-semibold text-brand-gray/90 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Bottom animated progress indicator */}
                    <div className={`w-0 h-[1.5px] bg-gradient-to-r ${ev.progressColor} group-hover:w-full transition-all duration-500 mt-5 relative z-10`}></div>
                  </div>

                  {/* Empty Spacer Column */}
                  <div className="md:w-[44%]"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile-Only ProcessFlow-Style Vertical Timeline (md:hidden) */}
        <div className="md:hidden flex flex-col gap-10 max-w-xl mx-auto relative pl-2 text-left">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-3 bottom-3 w-[1.5px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue pointer-events-none"></div>

          {events.map((ev, idx) => {
            const IconComponent = ev.icon;
            return (
              <div 
                key={idx}
                className="flex gap-6 items-start relative group animate-fade-in"
              >
                {/* Left Timeline Step Node */}
                <div className={`w-12 h-12 rounded-2xl bg-brand-darker border border-white/10 ${ev.nodeColor} flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-all duration-500`}>
                  <span className="text-sm font-bold font-mono text-brand-gold">
                    {ev.num}
                  </span>
                </div>

                {/* Right Detail Glassmorphic Card */}
                <div className={`w-full p-5 rounded-[2rem] bg-brand-card/35 backdrop-blur-md border border-white/5 ${ev.borderColor} bg-gradient-to-b ${ev.color} transition-all duration-500 hover:-translate-y-1 shadow-card-shadow ${ev.glow} relative overflow-hidden text-left`}>
                  
                  {/* Background Watermark Icon */}
                  <div className="absolute right-0 bottom-0 text-[8rem] text-white/[0.003] pointer-events-none transform translate-x-4 translate-y-4 group-hover:scale-110 group-hover:text-white/[0.008] transition-all duration-500 flex items-center justify-center">
                    <IconComponent className="w-24 h-24" />
                  </div>

                  {/* Date and Icon */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner">
                      <IconComponent className={`w-4 h-4 ${ev.iconColor}`} />
                    </div>
                    <span className="text-xs font-bold text-brand-gold font-mono">
                      {ev.date}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-lg font-bold text-white tracking-wide font-display group-hover:text-brand-gold transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-brand-gray leading-relaxed font-normal">
                      {ev.desc}
                    </p>
                  </div>

                  {/* Highlights tags */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5 relative z-10">
                    {ev.highlights.map((highlight, hIdx) => (
                      <span 
                        key={hIdx} 
                        className="text-[9px] font-semibold text-brand-gray/90 bg-brand-darker/60 px-2 py-0.5 rounded border border-white/5"
                      >
                        {highlight}
                      </span>
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
