import React from 'react';
import { CalendarCheck, Rocket, ClipboardList, Flag, Award, Sparkles } from 'lucide-react';

export default function Timeline() {
  const events = [
    {
      title: 'Release Problem Statements',
      date: '10 Sep 2026',
      desc: 'Unveiling challenges to ignite innovative solutions in diverse domains.',
      icon: <ClipboardList size={18} className="text-brand-blue" />,
      glowColor: 'shadow-sm'
    },
    {
      title: 'Registration Period',
      date: '10 Sep 2026 - 02 Nov 2026',
      desc: 'Participants sign up for the engaging hackathon and complete profile verification.',
      icon: <CalendarCheck size={18} className="text-brand-purple" />,
      glowColor: 'shadow-sm'
    },
    {
      title: 'Scrutiny Result',
      date: '04 Nov 2026',
      desc: 'Expert panel evaluates proposals and determines qualified entries for the grand hackathon.',
      icon: <Flag size={18} className="text-brand-teal" />,
      glowColor: 'shadow-sm'
    },
    {
      title: 'Inauguration',
      date: '07 Nov 2026',
      desc: 'Grand opening ceremony, fostering collaboration, mentorship kickoff, and round 1 evaluation.',
      icon: <Rocket size={18} className="text-brand-pink" />,
      glowColor: 'shadow-sm'
    },
    {
      title: 'Valedictory & Awards',
      date: '08 Nov 2026',
      desc: 'Recognizing outstanding student accomplishments, project presentations, and winner announcements.',
      icon: <Award size={18} className="text-brand-orange" />,
      glowColor: 'shadow-sm'
    }
  ];

  return (
    <section id="timeline" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto text-center mb-16">

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy">
            Timeline of{' '}
            <span className="bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
              SIH 4.0
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Stay updated with crucial dates, application cycles, screening phases, and direct coding dates.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-5xl mx-auto pt-6">
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue"></div>

          <div className="space-y-12">
            {events.map((ev, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row relative items-start md:items-center ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node Dot */}
                <div className={`absolute left-6 md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full bg-white border-2 border-brand-blue z-20 flex items-center justify-center ${ev.glowColor}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse"></span>
                </div>

                {/* Content Panel */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 text-left">
                  <div className="p-6 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/30 transition-all duration-300 shadow-card-shadow hover:shadow-card-hover">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="p-2 rounded-xl bg-brand-dark border border-brand-navy/5">
                        {ev.icon}
                      </div>
                      <span className="text-xs font-bold text-brand-pink tracking-wider font-mono">
                        {ev.date}
                      </span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-brand-navy tracking-wide font-display">
                      {ev.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed font-normal">
                      {ev.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer column */}
                <div className="hidden md:block md:w-[10%]"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
