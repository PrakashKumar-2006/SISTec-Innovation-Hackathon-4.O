import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Coffee, Utensils, Lightbulb, Users, Trophy } from 'lucide-react';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeNode, setActiveNode] = useState(0);

  const day1Schedule = [
    {
      time: '10:00 AM - 11:30 AM',
      title: 'Inauguration Ceremony',
      desc: 'Official inauguration of the hackathon by chief guests, keynote speakers, and department heads.',
      category: 'Morning Session',
      icon: <Users size={16} className="text-brand-blue" />
    },
    {
      time: '11:30 AM',
      title: 'Coding Commences & First Judgement',
      desc: 'Hackathon starts! Teams begin coding. First round judgement by judges to evaluate initial architectural ideas.',
      category: 'Morning Session',
      icon: <Lightbulb size={16} className="text-brand-purple" />
    },
    {
      time: '01:30 PM',
      title: 'Lunch Break & Networking',
      desc: 'Refuel during lunch, fostering connections and providing an opportunity for participants to recharge.',
      category: 'Afternoon Session',
      icon: <Utensils size={16} className="text-brand-teal" />
    },
    {
      time: '05:00 PM',
      title: 'Tea & Refreshments',
      desc: 'Recharge with a brief high-tea break, creating a dynamic environment for the continuation of coding.',
      category: 'Afternoon Session',
      icon: <Coffee size={16} className="text-brand-orange" />
    },
    {
      time: '05:30 PM',
      title: 'Second Round of Judgement',
      desc: 'Start the second round of evaluations based on the suggestions and corrections given by the judges.',
      category: 'Evening Session',
      icon: <Clock size={16} className="text-brand-pink" />
    },
    {
      time: '11:30 PM',
      title: 'Late Night Dinner',
      desc: 'Conclude the Day 1 milestones with a hearty late-night meal, providing a relaxed setting for teams.',
      category: 'Night Session',
      icon: <Utensils size={16} className="text-brand-blue" />
    }
  ];

  const day2Schedule = [
    {
      time: '08:00 AM',
      title: 'Healthy Breakfast',
      desc: 'Morning refuel to boost energy levels for the final coding sprint.',
      category: 'Morning Session',
      icon: <Coffee size={16} className="text-brand-orange" />
    },
    {
      time: '09:00 AM - 12:00 PM',
      title: 'Final Coding Sprint',
      desc: 'Closing in on final integrations, UI polish, testing, and deployment preparation.',
      category: 'Morning Session',
      icon: <Clock size={16} className="text-brand-blue" />
    },
    {
      time: '12:00 PM - 02:30 PM',
      title: 'Grand Finale Evaluation',
      desc: 'Final round of project pitches and live prototype demonstrations to the expert judging panel.',
      category: 'Afternoon Session',
      icon: <Users size={16} className="text-brand-purple" />
    },
    {
      time: '03:00 PM',
      title: 'Valedictory & Prizes',
      desc: 'Announcement of the winners, runner-ups, and track-specific prizes, followed by the trophy ceremony.',
      category: 'Afternoon Session',
      icon: <Trophy size={16} className="text-brand-pink" />
    }
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  // Reset active node when day changes
  useEffect(() => {
    setActiveNode(0);
  }, [activeDay]);

  // Continuous looping sequence chase glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % currentSchedule.length);
    }, 3500); // shift glow every 3.5 seconds
    return () => clearInterval(interval);
  }, [currentSchedule.length]);

  return (
    <section id="schedule" className="relative py-24 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-navyDeep">
            Event{' '}
            <span className="text-gold-metallic">
              Schedule
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Stay on track with our day-wise timeline. Click on the day buttons to toggle details.
          </p>
        </div>

        {/* Day Toggles */}
        <div className="flex justify-center gap-4 mb-12">
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
                  : 'bg-white border border-brand-navy/10 text-brand-navy/60 hover:text-brand-blue hover:border-brand-blue/30'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Schedule Presentation Layout */}
        <div className="relative max-w-full mx-auto">

          {/* 1. DESKTOP VIEW: Alternating Grid Timeline with Loop Glow Chase */}
          <div className="hidden md:block relative h-[420px] max-w-full">
            {/* Horizontal middle connector line */}
            <div className="absolute top-[200px] left-6 right-6 h-[2px] bg-brand-navy/10 z-0"></div>
            
            {/* Active glowing connector line */}
            <div className="absolute top-[200px] left-6 right-6 h-[2px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue z-0 animate-pulse-slow"></div>

            {/* Alternating Cards Grid */}
            <div 
              key={activeDay} 
              className={`grid gap-4 z-10 relative h-[400px] ${
                currentSchedule.length === 6 ? 'grid-cols-6' : 'grid-cols-4'
              }`}
            >
              {currentSchedule.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const isActive = activeNode === idx;

                return (
                  <div 
                    key={idx} 
                    className="relative h-[400px] w-full group animate-fade-in opacity-0"
                    style={{ animationDelay: `${idx * 120}ms` }}
                    onMouseEnter={() => setActiveNode(idx)}
                  >
                    
                    {isEven ? (
                      /* Card Sits ABOVE center line */
                      <>
                        {/* Card Body */}
                        <div 
                          className={`absolute top-0 left-0 right-0 h-[180px] p-5 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between text-left ${
                            isActive
                              ? 'border-brand-pink/50 shadow-[0_0_20px_rgba(255,30,132,0.15)] scale-[1.02]'
                              : 'border-brand-navy/10 group-hover:border-brand-pink/30 shadow-card-shadow hover:shadow-card-hover'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-1">
                              <span className="inline-block px-3 py-1 rounded-full bg-brand-dark border border-brand-navy/5 text-[10px] text-brand-pink font-extrabold tracking-widest font-mono uppercase">
                                {item.time}
                              </span>
                            </div>
                            
                            <h3 className="text-xs font-bold text-brand-navy tracking-wide font-display flex items-center gap-1.5 mt-1">
                              <span className="shrink-0 p-0.5 rounded bg-brand-dark border border-brand-navy/5">
                                {item.icon}
                              </span>
                              {item.title}
                            </h3>
                            
                            <p className="text-[10px] text-brand-gray/80 leading-relaxed font-normal mt-1 line-clamp-4">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Stem line going down to center line */}
                        <div 
                          className={`absolute top-[180px] left-[24px] w-[2px] h-[20px] transition-colors duration-300 ${
                            isActive ? 'bg-brand-pink/60' : 'bg-brand-navy/15 group-hover:bg-brand-pink/30'
                          }`}
                        ></div>

                        {/* Node Dot (Centered at 200px) */}
                        <div className="absolute top-[186px] left-[11px] z-20">
                          <div 
                            className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 shadow-sm relative ${
                              isActive 
                                ? 'border-brand-pink text-brand-pink font-extrabold scale-110 shadow-[0_0_10px_rgba(255,30,132,0.3)] bg-brand-pink/5' 
                                : 'border-brand-navy/30 text-brand-navy/60 group-hover:border-brand-pink group-hover:text-brand-pink'
                            }`}
                          >
                            <span className="text-[10px] font-mono relative z-10">
                              0{idx + 1}
                            </span>
                            {isActive && (
                              <span className="w-full h-full rounded-full bg-brand-pink/20 animate-ping absolute scale-125"></span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Card Sits BELOW center line */
                      <>
                        {/* Node Dot (Centered at 200px) */}
                        <div className="absolute top-[186px] left-[11px] z-20">
                          <div 
                            className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 shadow-sm relative ${
                              isActive 
                                ? 'border-brand-pink text-brand-pink font-extrabold scale-110 shadow-[0_0_10px_rgba(255,30,132,0.3)] bg-brand-pink/5' 
                                : 'border-brand-navy/30 text-brand-navy/60 group-hover:border-brand-pink group-hover:text-brand-pink'
                            }`}
                          >
                            <span className="text-[10px] font-mono relative z-10">
                              0{idx + 1}
                            </span>
                            {isActive && (
                              <span className="w-full h-full rounded-full bg-brand-pink/20 animate-ping absolute scale-125"></span>
                            )}
                          </div>
                        </div>

                        {/* Stem line going down from center line to Card */}
                        <div 
                          className={`absolute top-[200px] left-[24px] w-[2px] h-[20px] transition-colors duration-300 ${
                            isActive ? 'bg-brand-pink/60' : 'bg-brand-navy/15 group-hover:bg-brand-pink/30'
                          }`}
                        ></div>

                        {/* Card Body */}
                        <div 
                          className={`absolute top-[220px] left-0 right-0 h-[180px] p-5 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between text-left ${
                            isActive
                              ? 'border-brand-pink/50 shadow-[0_0_20px_rgba(255,30,132,0.15)] scale-[1.02]'
                              : 'border-brand-navy/10 group-hover:border-brand-pink/30 shadow-card-shadow hover:shadow-card-hover'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-1">
                              <span className="inline-block px-3 py-1 rounded-full bg-brand-dark border border-brand-navy/5 text-[10px] text-brand-pink font-extrabold tracking-widest font-mono uppercase">
                                {item.time}
                              </span>
                            </div>
                            
                            <h3 className="text-xs font-bold text-brand-navy tracking-wide font-display flex items-center gap-1.5 mt-1">
                              <span className="shrink-0 p-0.5 rounded bg-brand-dark border border-brand-navy/5">
                                {item.icon}
                              </span>
                              {item.title}
                            </h3>
                            
                            <p className="text-[10px] text-brand-gray/80 leading-relaxed font-normal mt-1 line-clamp-4">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. MOBILE VIEW: Staggered Stacked Vertical Timeline with Loop Glow Chase */}
          <div className="md:hidden relative max-w-md mx-auto text-left pl-8">
            {/* Vertical connector line */}
            <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-brand-navy/10"></div>
            
            {/* Active glowing vertical line */}
            <div className="absolute left-[9px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue animate-pulse-slow"></div>

            {/* List */}
            <div key={`mobile-${activeDay}`} className="space-y-6">
              {currentSchedule.map((item, idx) => {
                const isActive = activeNode === idx;

                return (
                  <div 
                    key={idx} 
                    className="relative flex items-start gap-4 group animate-fade-in opacity-0"
                    style={{ animationDelay: `${idx * 120}ms` }}
                    onMouseEnter={() => setActiveNode(idx)}
                  >
                    
                    {/* Connected Node Dot */}
                    <div className="absolute -left-[27px] top-5 z-20">
                      <div 
                        className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-300 shadow-sm relative ${
                          isActive 
                            ? 'border-brand-pink text-brand-pink font-extrabold scale-110 shadow-[0_0_10px_rgba(255,30,132,0.3)] bg-brand-pink/5' 
                            : 'border-brand-navy/30 text-brand-navy/60 group-hover:border-brand-pink group-hover:text-brand-pink'
                        }`}
                      >
                        <span className="text-[10px] font-mono relative z-10">
                          0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="w-full h-full rounded-full bg-brand-pink/20 animate-ping absolute scale-125"></span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div 
                      className={`flex-1 p-5 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between ${
                        isActive
                          ? 'border-brand-pink/50 shadow-[0_0_20px_rgba(255,30,132,0.15)] scale-[1.02]'
                          : 'border-brand-navy/10 group-hover:border-brand-pink/30 shadow-card-shadow hover:shadow-card-hover'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-dark border border-brand-navy/5 text-[9px] text-brand-pink font-bold tracking-widest font-mono uppercase">
                            {item.time}
                          </span>
                          <span className="text-[9px] text-brand-gray/60 font-bold tracking-widest uppercase">
                            {item.category}
                          </span>
                        </div>
                        
                        <h3 className="text-sm font-bold text-brand-navy tracking-wide font-display flex items-center gap-1.5 mt-2">
                          <span className="shrink-0 p-1 rounded bg-brand-dark border border-brand-navy/5">
                            {item.icon}
                          </span>
                          {item.title}
                        </h3>
                        
                        <p className="text-xs text-brand-gray/80 leading-relaxed font-normal mt-1.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
