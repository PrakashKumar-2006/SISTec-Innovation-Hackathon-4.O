import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Coffee, Utensils, Lightbulb, Users, Trophy, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeNode, setActiveNode] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const day1Schedule = [
    {
      time: '10:00 AM - 11:30 AM',
      title: 'Inauguration Ceremony',
      desc: 'Official inauguration of the hackathon by chief guests, keynote speakers, and department heads.',
      category: 'Morning Session',
      icon: Users,
      iconColor: 'text-brand-orange',
      color: 'from-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      highlights: ['Keynote Addresses', 'Chief Guests Welcome', 'Rules & Guidelines Briefing']
    },
    {
      time: '11:30 AM',
      title: 'Coding Commences & First Judgement',
      desc: 'Hackathon starts! Teams begin coding. First round judgement by judges to evaluate initial architectural ideas.',
      category: 'Morning Session',
      icon: Lightbulb,
      iconColor: 'text-brand-pink',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(236,72,153,0.15)]',
      highlights: ['36-Hour Coding Kickoff', 'Mentor Allocation', 'Initial Idea Pitching']
    },
    {
      time: '01:30 PM',
      title: 'Lunch Break & Networking',
      desc: 'Refuel during lunch, fostering connections and providing an opportunity for participants to recharge.',
      category: 'Afternoon Session',
      icon: Utensils,
      iconColor: 'text-brand-blue',
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
      highlights: ['Catered Buffet Lunch', 'Cross-Team Networking', 'Informal Mentor Q&A']
    },
    {
      time: '05:00 PM',
      title: 'Tea & Refreshments',
      desc: 'Recharge with a brief high-tea break, creating a dynamic environment for the continuation of coding.',
      category: 'Afternoon Session',
      icon: Coffee,
      iconColor: 'text-brand-orange',
      color: 'from-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      highlights: ['Hot Tea & Snacks', 'Relaxation Zone Access', 'Tech Support Desk Open']
    },
    {
      time: '05:30 PM',
      title: 'Second Round of Judgement',
      desc: 'Start the second round of evaluations based on the suggestions and corrections given by the judges.',
      category: 'Evening Session',
      icon: Clock,
      iconColor: 'text-brand-pink',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(236,72,153,0.15)]',
      highlights: ['Prototype Progress Check', 'Code Base Inspection', 'Mentor Feedback Sync']
    },
    {
      time: '11:30 PM',
      title: 'Late Night Dinner',
      desc: 'Conclude the Day 1 milestones with a hearty late-night meal, providing a relaxed setting for teams.',
      category: 'Night Session',
      icon: Utensils,
      iconColor: 'text-brand-blue',
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
      highlights: ['Overnight Energy Refuel', 'Midnight Coffee Station', 'Continuous Hacking Support']
    }
  ];

  const day2Schedule = [
    {
      time: '08:00 AM',
      title: 'Healthy Breakfast',
      desc: 'Morning refuel to boost energy levels for the final coding sprint.',
      category: 'Morning Session',
      icon: Coffee,
      iconColor: 'text-brand-orange',
      color: 'from-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      highlights: ['Breakfast Buffet', 'Energy Drink Stations', 'Day 2 Overview Brief']
    },
    {
      time: '09:00 AM - 12:00 PM',
      title: 'Final Coding Sprint',
      desc: 'Closing in on final integrations, UI polish, testing, and deployment preparation.',
      category: 'Morning Session',
      icon: Clock,
      iconColor: 'text-brand-pink',
      color: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(236,72,153,0.15)]',
      highlights: ['Deployment & Hosting', 'Final UI/UX Refinement', 'Slide Deck Preparation']
    },
    {
      time: '12:00 PM - 02:30 PM',
      title: 'Grand Finale Evaluation',
      desc: 'Final round of project pitches and live prototype demonstrations to the expert judging panel.',
      category: 'Afternoon Session',
      icon: Sparkles,
      iconColor: 'text-brand-blue',
      color: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
      highlights: ['3-Min Live Pitching', 'Prototype Demonstrations', 'Jury Q&A Sessions']
    },
    {
      time: '03:00 PM',
      title: 'Valedictory & Prizes',
      desc: 'Announcement of the winners, runner-ups, and track-specific prizes, followed by the trophy ceremony.',
      category: 'Afternoon Session',
      icon: Trophy,
      iconColor: 'text-brand-orange',
      color: 'from-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      activeGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      highlights: ['Winner Trophy Ceremony', 'Incubation Opportunity Awards', 'Participation Certs']
    }
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  // Reset active node when day changes
  useEffect(() => {
    setActiveNode(0);
  }, [activeDay]);

  // Autoplay loop sequence chase glow effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % currentSchedule.length);
    }, 3000); // shift active node every 3 seconds
    return () => clearInterval(interval);
  }, [isHovered, currentSchedule.length]);

  const activeItem = currentSchedule[activeNode] || currentSchedule[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section id="schedule" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      {/* Background visual glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display">
            Event <span className="text-gold-metallic">Schedule</span>
          </h2>
        </div>

        {/* Day Toggles */}
        <div className="flex justify-center gap-4 mb-16">
          {[
            { id: 1, label: 'Day 1' },
            { id: 2, label: 'Day 2' }
          ].map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-wider transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeDay === day.id
                  ? 'bg-btn-gradient text-white shadow-cyan-glow'
                  : 'bg-brand-card/25 border border-white/5 text-brand-gray hover:text-white hover:border-white/10'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Desktop Schedule Dashboard layout (lg:grid only, hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Interactive Winding Timeline Stepper list */}
          <div className="col-span-5 flex flex-col gap-3 pr-4 border-r border-white/5 relative">
            
            {/* Desktop Vertical timeline track */}
            <div className="absolute left-[31px] top-6 bottom-6 w-[1.5px] bg-white/5 -z-10"></div>
            
            {currentSchedule.map((item, idx) => {
              const ItemIcon = item.icon;
              const isActive = activeNode === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIsHovered(true);
                    setActiveNode(idx);
                  }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setActiveNode(idx);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl border text-left transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `bg-brand-card/45 border-brand-gold/40 shadow-inner -translate-y-0.5 ${item.activeGlow}`
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  {/* Step Circle Node */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0 ${
                    isActive 
                      ? 'border-brand-gold bg-brand-gold/20 text-brand-gold shadow-md'
                      : 'border-white/10 bg-brand-darker/60 text-brand-gray'
                  }`}>
                    <ItemIcon className="w-4.5 h-4.5" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-brand-gold/85 block">
                      {item.time}
                    </span>
                    <h4 className="text-xs font-bold text-white tracking-wide truncate">
                      {item.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Fidelity Details Panel Display */}
          <div className="col-span-7 flex">
            <div className={`w-full rounded-[2.5rem] bg-brand-card/45 backdrop-blur-md border border-white/5 bg-gradient-to-b ${activeItem.color} ${activeItem.borderColor} ${activeItem.activeGlow} p-8 text-left transition-all duration-500 flex flex-col justify-between relative overflow-hidden group`}>
              
              {/* Background Watermark Icon */}
              <div className="absolute right-0 bottom-0 text-[16rem] text-white/[0.005] pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:text-white/[0.01] transition-all duration-700 flex items-center justify-center">
                <ActiveIcon className="w-56 h-56" />
              </div>

              {/* Upper Section */}
              <div className="space-y-6 relative z-10">
                
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full bg-brand-darker border border-white/5 text-[10px] ${activeItem.iconColor} font-bold font-mono uppercase`}>
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-bold font-mono text-brand-gold">
                    {activeItem.time}
                  </span>
                </div>

                {/* Main Session Title */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-darker border border-white/5 flex items-center justify-center shadow-inner">
                      <ActiveIcon className={`w-5.5 h-5.5 ${activeItem.iconColor}`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-display">
                      {activeItem.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                    {activeItem.desc}
                  </p>
                </div>

              </div>

              {/* Lower Section: Highlights Checkbox List */}
              <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                <h4 className="text-[10px] font-bold tracking-wider text-white/50 uppercase mb-4">What to Expect</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-brand-gray font-normal">
                  {activeItem.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 ${activeItem.iconColor} shrink-0`} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic bottom border slide glow indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue pointer-events-none"></div>

            </div>
          </div>
        </div>

        {/* Mobile Schedule Vertical List (lg:hidden) - Styled like ProcessFlow */}
        <div className="lg:hidden flex flex-col gap-10 max-w-xl mx-auto relative pl-2 text-left">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-3 bottom-3 w-[1.5px] bg-white/5 pointer-events-none"></div>

          {currentSchedule.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div 
                key={idx}
                className="flex gap-6 items-start relative group"
              >
                {/* Left Timeline Step Node */}
                <div className="w-12 h-12 rounded-2xl bg-brand-darker border border-brand-gold/30 text-brand-gold flex items-center justify-center shrink-0 shadow-sm relative z-10">
                  <ItemIcon className="w-5 h-5" />
                </div>

                {/* Right Detail Glassmorphic Card */}
                <div className={`p-6 rounded-[2rem] bg-brand-card/45 backdrop-blur-md border border-white/5 bg-gradient-to-b ${item.color} ${item.borderColor} ${item.activeGlow} text-left relative overflow-hidden flex flex-col gap-4 shadow-card-shadow w-full group-hover:-translate-y-1 transition-all duration-500`}
                >
                  {/* Background Watermark Icon */}
                  <div className="absolute right-0 bottom-0 text-[8rem] text-white/[0.003] pointer-events-none transform translate-x-6 translate-y-6 flex items-center justify-center">
                    <ItemIcon className="w-24 h-24" />
                  </div>

                  {/* Top Row: Category and Time */}
                  <div className="flex flex-wrap items-center justify-between gap-2 z-10">
                    <span className={`inline-block px-3 py-0.5 rounded-full bg-brand-darker border border-white/5 text-[9px] ${item.iconColor} font-bold font-mono uppercase`}>
                      {item.category}
                    </span>
                    <span className="text-xs font-bold font-mono text-brand-gold">
                      {item.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-display z-10">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-brand-gray leading-relaxed font-normal z-10">
                    {item.desc}
                  </p>

                  {/* Highlights List */}
                  <div className="pt-4 border-t border-white/5 z-10">
                    <h4 className="text-[9px] font-bold tracking-wider text-white/50 uppercase mb-2">What to Expect</h4>
                    <div className="flex flex-col gap-2 text-xs text-brand-gray">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <CheckCircle className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
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
