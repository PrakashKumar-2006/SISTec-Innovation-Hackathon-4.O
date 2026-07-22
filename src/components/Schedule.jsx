import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Coffee, Utensils, Lightbulb, Users, Trophy, Sparkles, CheckCircle, Mic, FileText, Award } from 'lucide-react';
import lampImg from '../../Lamp.png';
import round1Img from '../../Round 1.png';
import lunchImg from '../../Lunch image.png';
import teaImg from '../../Tea Brake Image.png';
import round2Img from '../../Round 2.png';
import round3Img from '../../Round 3 image.png';
import yogaImg from '../../yoga session image.png';
import breakfastImg from '../../morning Breakfast.png';
import dinnerImg from '../../Dinner image.png';

// Custom Category Inline SVGs

const InaugurationBadgeSVG = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    <path d="M12 17.77V22" strokeDasharray="2 2"/>
  </svg>
);

const JudgementBadgeSVG = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3V21" />
    <path d="M4 7H20" />
    <path d="M7 7L4 13C4 14.1 4.9 15 6 15C7.1 15 8 14.1 8 13L7 7Z" />
    <path d="M17 7L14 13C14 14.1 14.9 15 16 15C17.1 15 18 14.1 18 13L17 7Z" />
    <path d="M9 21H15" />
  </svg>
);

const FoodMealSVG = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8C18 6.9 17.1 6 16 6H8C6.9 6 6 6.9 6 8V12C6 15.3 18 15.3 18 12V8Z" />
    <path d="M12 18V21" />
    <path d="M8 21H16" />
    <path d="M12 3V6" strokeDasharray="2 2" />
  </svg>
);

const YogaLotusSVG = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C10.5 6 7 8 7 12C7 16 12 21 12 21C12 21 17 16 17 12C17 8 13.5 6 12 3Z" />
    <path d="M12 12C9 10 4 10 2 13C4 16 8 17 12 17C16 17 20 16 22 13C20 10 15 10 12 12Z" />
  </svg>
);

const TrophyAwardSVG = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9C6 11.7614 8.23858 14 11 14H13C15.7614 14 18 11.7614 18 9V3H6V9Z" />
    <path d="M6 5H3C2.44772 5 2 5.44772 2 6V7C2 8.65685 3.34315 10 5 10H6" />
    <path d="M18 5H21C21.5523 5 22 5.44772 22 6V7C22 8.65685 20.6569 10 19 10H18" />
    <path d="M12 14V18" />
    <path d="M8 21H16" />
  </svg>
);

export default function Schedule({ isStandalone = false }) {
  const [activeDay, setActiveDay] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);

  const day1Schedule = [
    {
      id: 'd1-1',
      time: '10:00 AM - 11:30 AM',
      title: 'Inauguration',
      desc: 'Official inauguration of SIH 4.0 Hackathon by distinguished chief guests, traditional lamp lighting ceremony, and keynote briefing.',
      category: 'INAUGURATION',
      shortTag: 'Inauguration',
      icon: Users,
      badgeSVG: InaugurationBadgeSVG,
      image: lampImg,
      highlights: [
        { text: 'Chief Guests Welcome & Lamp Lighting', icon: Users },
        { text: 'Keynote Speeches by Industry Experts', icon: Mic },
        { text: 'Event Rules & Marking Guidelines Briefing', icon: FileText }
      ]
    },
    {
      id: 'd1-2',
      time: '11:30 AM',
      title: 'First Round Of SIH 4.0',
      desc: 'Start of First Round Judgement by various Judges. Teams present initial ideas, technology architecture, and can start making corrections/updations.',
      category: 'FIRST ROUND',
      shortTag: 'First Round',
      icon: Lightbulb,
      badgeSVG: JudgementBadgeSVG,
      image: round1Img,
      highlights: [
        { text: '1-on-1 Judges Pitching & Evaluation', icon: Mic },
        { text: 'Architectural & Tech Stack Review', icon: Lightbulb },
        { text: 'Immediate Feedback & Refinement Sprint', icon: Sparkles }
      ]
    },
    {
      id: 'd1-3',
      time: '01:00 PM',
      title: 'Lunch',
      desc: 'Refuel during lunch, fostering camaraderie and providing an opportunity for participants to recharge for the upcoming coding tasks.',
      category: 'LUNCH BREAK',
      shortTag: 'Lunch',
      icon: Utensils,
      badgeSVG: FoodMealSVG,
      image: lunchImg,
      highlights: [
        { text: 'Catered Buffet Lunch Spread', icon: Utensils },
        { text: 'Cross-Team & Mentor Networking', icon: Users },
        { text: 'Informal Technical Discussion', icon: Mic }
      ]
    },
    {
      id: 'd1-4',
      time: '05:00 PM',
      title: 'Tea Break',
      desc: 'Recharge with tea, providing a boost of energy and creating a dynamic environment for the continuation of coding.',
      category: 'TEA BREAK',
      shortTag: 'Tea Break',
      icon: Coffee,
      badgeSVG: FoodMealSVG,
      image: teaImg,
      highlights: [
        { text: 'Hot Tea & Energy Refreshments', icon: Coffee },
        { text: 'Relaxation & Stretch Pause', icon: Sparkles },
        { text: 'Technical Support Desk Active', icon: FileText }
      ]
    },
    {
      id: 'd1-5',
      time: '05:30 PM',
      title: 'Second Round Of Judgement',
      desc: 'Start the Second Round of Judgement based on suggestion corrections and feedback given by the judges in the first round.',
      category: 'SECOND ROUND',
      shortTag: 'Second Round',
      icon: Clock,
      badgeSVG: JudgementBadgeSVG,
      image: round2Img,
      highlights: [
        { text: 'Working Prototype Demonstration', icon: Lightbulb },
        { text: 'Review of Implemented Feedback', icon: FileText },
        { text: 'Midway Score Card Logging by Jury', icon: Award }
      ]
    },
    {
      id: 'd1-6',
      time: '08:00 PM',
      title: 'Dinner',
      desc: 'Conclude the day with a hearty evening meal, providing a relaxed setting for participants to unwind and reflect on their achievements.',
      category: 'DINNER',
      shortTag: 'Dinner',
      icon: Utensils,
      badgeSVG: FoodMealSVG,
      image: dinnerImg,
      highlights: [
        { text: 'Nutritious Evening Buffet Meal', icon: Utensils },
        { text: 'Overnight Development Marathon Prep', icon: Coffee },
        { text: 'Non-stop Mentor & Lab Support Desk', icon: Sparkles }
      ]
    }
  ];

  const day2Schedule = [
    {
      id: 'd2-1',
      time: '03:30 AM',
      title: 'Third Round Of Judgement',
      desc: 'Third Round of Judgement based on Suggestion correction given by the judges in first round and second round.',
      category: 'THIRD ROUND',
      shortTag: 'Third Round',
      icon: Clock,
      badgeSVG: JudgementBadgeSVG,
      image: round3Img,
      highlights: [
        { text: 'Final Codebase & Hosting Pitch', icon: Lightbulb },
        { text: 'Review of Cumulative Improvements', icon: FileText },
        { text: 'Final Scoring & Evaluation Sync', icon: Award }
      ]
    },
    {
      id: 'd2-2',
      time: '05:00 AM',
      title: 'Yoga Session',
      desc: 'Refresh with a morning yoga session, promoting physical and mental well-being to enhance focus and creativity.',
      category: 'WELLNESS',
      shortTag: 'Yoga Session',
      icon: Sparkles,
      badgeSVG: YogaLotusSVG,
      image: yogaImg,
      highlights: [
        { text: 'Guided Breathing & Meditation', icon: Sparkles },
        { text: 'Physical Stretch & Energy Wellness', icon: Users },
        { text: 'Morning Focus & Mind Refresh', icon: Coffee }
      ]
    },
    {
      id: 'd2-3',
      time: '09:00 AM',
      title: 'Breakfast Served',
      desc: 'Begin the day with a wholesome breakfast, setting the tone for the final round of evaluations and activities.',
      category: 'BREAKFAST',
      shortTag: 'Breakfast',
      icon: Coffee,
      badgeSVG: FoodMealSVG,
      image: breakfastImg,
      highlights: [
        { text: 'Wholesome Morning Buffet', icon: FoodMealSVG },
        { text: 'Fresh Juice & Coffee Counter', icon: Coffee },
        { text: 'Grand Finale Wrap-Up Prep', icon: FileText }
      ]
    },
    {
      id: 'd2-4',
      time: '10:00 AM',
      title: 'Valedictory Function And Prize Distribution',
      desc: 'Celebrate the conclusion of the event with a valedictory function, recognizing outstanding contributions and distributing prizes to deserving participants.',
      category: 'VALEDICTORY',
      shortTag: 'Prize Ceremony',
      icon: Trophy,
      badgeSVG: TrophyAwardSVG,
      image: lampImg,
      highlights: [
        { text: 'Trophy & Cash Prize Awarding', icon: Trophy },
        { text: 'Valedictory Keynote Address', icon: Mic },
        { text: 'Certificate Distribution Ceremony', icon: Award }
      ]
    }
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;
  const currentItem = currentSchedule[activeIndex] || currentSchedule[0];
  const ItemBadgeSVG = currentItem.badgeSVG || InaugurationBadgeSVG;

  // Reset active index & resume loop when day changes
  useEffect(() => {
    setActiveIndex(0);
    setIsPaused(false);
  }, [activeDay]);

  // 🎯 Global Click Listener: Tapping outside the schedule container resumes loop automatically!
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsPaused(false); // Resume autoplay loop
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Helper function for ultra-smooth slide transitions
  const transitionToSlide = (newIndex) => {
    if (animating) return;
    setAnimating(true);
    
    // Step 1: Smooth fade out over 300ms
    setTimeout(() => {
      setActiveIndex(newIndex);
      // Step 2: Smooth fade in after index updates
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 300);
  };

  // 🔄 Autoplay Loop: Cycle session every 5.5 seconds with silky smooth transition
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % currentSchedule.length;
      transitionToSlide(nextIndex);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex, currentSchedule.length, animating]);

  const handleNodeTap = (index) => {
    if (index === activeIndex) {
      setIsPaused(true);
      return;
    }
    transitionToSlide(index);
    setIsPaused(true); // Pause auto-loop on manual tab/node tap
  };

  return (
    <section id="schedule" className="relative py-16 sm:py-24 bg-[var(--paper)] text-[#241708] overflow-hidden border-t border-[#EBDAB9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3.5xl sm:text-5xl font-black tracking-tight text-[#241708] leading-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Event <span className="text-[#8C3A16]">Schedule</span>
          </h2>
          
          <p className="mt-2.5 text-xs sm:text-sm text-[#6B5B49] max-w-lg mx-auto font-medium leading-relaxed">
            Interactive schedule. Tap any vertical step node to inspect details. Tap outside anytime to resume auto-loop.
          </p>
        </div>

        {/* Day Switcher Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
          {[
            { id: 1, label: 'DAY 1', sub: '30 Sep • 6 Sessions' },
            { id: 2, label: 'DAY 2', sub: '01 Oct • 4 Sessions' }
          ].map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black tracking-wider transition-all duration-500 ease-out cursor-pointer flex flex-col items-center justify-center border text-center ${
                activeDay === day.id
                  ? 'bg-[#8C3A16] text-white-force border-[#8C3A16] shadow-md'
                  : 'bg-[#FAF6EE] text-[#6B5B49] border-[#E3D7C5] hover:border-[#8C3A16]/40 hover:text-[#241708]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Calendar className={`w-3.5 h-3.5 ${activeDay === day.id ? 'text-[#F2A93B]' : 'text-[#8C3A16]'}`} />
                <span className={activeDay === day.id ? 'text-white-force font-bold' : 'text-[#241708] font-bold'}>{day.label}</span>
              </div>
              <span className={`text-[10px] font-semibold ${activeDay === day.id ? 'text-white-force/90' : 'text-[#6B5B49]'}`}>
                {day.sub}
              </span>
            </button>
          ))}
        </div>

        {/* ── 2-COLUMN FIXED-DIMENSION STABLE LAYOUT WITH CONTAINER REF FOR OUTSIDE CLICK RESUME ── */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[480px]">
          
          {/* ── LEFT COLUMN: VERTICAL CONNECTED ICON NODES (TOP TO BOTTOM) ── */}
          <div className="md:col-span-4 relative pl-4 sm:pl-6 bg-[#FAF6EE] p-5 sm:p-6 rounded-3xl border border-[#E3D7C5] flex flex-col justify-between shadow-sm shrink-0">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[2.4rem] sm:left-[2.9rem] top-8 bottom-8 w-1 bg-gradient-to-b from-[#8C3A16] via-[#C97F1B] to-[#F2A93B] rounded-full shadow-xs" />

            <div className="space-y-4 sm:space-y-5 relative z-10 flex-1 flex flex-col justify-between">
              {currentSchedule.map((item, idx) => {
                const NodeIcon = item.icon;
                const isSelected = activeIndex === idx;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNodeTap(idx)}
                    className={`flex items-center gap-3.5 group cursor-pointer w-full text-left transition-all duration-500 ease-in-out p-2 rounded-2xl ${
                      isSelected ? 'bg-[#8C3A16]/10 border border-[#8C3A16]/20' : 'hover:bg-[#8C3A16]/5 border border-transparent'
                    }`}
                  >
                    {/* Vertical Icon Node Box */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border-2 shrink-0 transition-all duration-500 ease-in-out shadow-sm ${
                      isSelected
                        ? 'bg-[#8C3A16] border-[#8C3A16] text-white-force shadow-md scale-105'
                        : 'bg-[#FFFDF7] border-[#E3D7C5] text-[#8C3A16] group-hover:border-[#8C3A16]'
                    }`}>
                      <NodeIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${isSelected ? 'text-white-force' : 'text-[#8C3A16]'}`} />
                    </div>

                    {/* Step Tag & Label */}
                    <div className="min-w-0 flex-1">
                      <span className={`block text-xs font-bold tracking-tight truncate transition-colors duration-500 ${
                        isSelected ? 'text-[#8C3A16] font-extrabold' : 'text-[#241708] group-hover:text-[#8C3A16]'
                      }`}>
                        {item.shortTag}
                      </span>
                      <span className="block text-[11px] text-[#6B5B49] font-medium truncate">
                        {item.time}
                      </span>
                    </div>

                    {/* Active Indicator Dot */}
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C3A16] shrink-0 transition-all duration-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: ROCK-SOLID SINGLE ACTIVE CARD (LUXURIOUS SILKY CROSS-FADE TRANSITION) ── */}
          <div className="md:col-span-8 flex flex-col">
            <div 
              onClick={() => setIsPaused(true)}
              className="w-full h-full rounded-[32px] border-2 overflow-hidden flex flex-col justify-between relative bg-[#FFFDF7] border-[#EBDAB9] shadow-xl cursor-pointer"
            >
              
              {/* Top Corner Ribbon Decor Overlay */}
              <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-20">
                <div className="bg-gradient-to-br from-[#5C230C] via-[#8C3A16] to-[#C97F1B] w-36 h-36 transform rotate-45 translate-x-16 -translate-y-20 shadow-md flex items-end justify-center pb-2">
                  <Sparkles className="w-4 h-4 text-amber-300 transform -rotate-45 translate-y-8" />
                </div>
              </div>

              {/* Main Card Inner Body with 2-Stage Silky Smooth Cross-Fade & Glide Transition */}
              <div className={`p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 transition-all duration-500 ease-in-out transform ${
                animating 
                  ? 'opacity-0 scale-[0.99] translate-y-1' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}>
                
                {/* Header Bar: Time Badge + Category Tag */}
                <div className="flex items-center gap-3 flex-wrap shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#E3D7C5] bg-[#FAF6EE] text-[#8C3A16] font-bold text-xs shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-[#8C3A16]" />
                    <span>{currentItem.time}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8C3A16] text-white-force font-extrabold text-xs tracking-wider shadow-xs">
                    <ItemBadgeSVG className="w-3.5 h-3.5 text-white-force" />
                    <span className="text-white-force">{currentItem.category}</span>
                  </span>
                </div>

                {/* 2-Column Content Layout: Title + Description on Left | Fixed-Size Image Box on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center flex-1">
                  
                  {/* Left Text Block */}
                  <div className="sm:col-span-8 space-y-2">
                    <h3 className="text-2.5xl sm:text-3.5xl font-black text-[#5C230C] font-display leading-tight min-h-[40px] flex items-center" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                      {currentItem.title}
                    </h3>
                    
                    {/* Stylish Underline Accent Bar */}
                    <div className="w-14 h-1 bg-gradient-to-r from-[#C97F1B] to-[#F2A93B] rounded-full my-2.5" />

                    <p className="text-xs sm:text-sm text-[#6B5B49] font-medium leading-relaxed min-h-[48px]">
                      {currentItem.desc}
                    </p>
                  </div>

                  {/* Right Session Specific Illustration Image (FIXED CONTAINER DIMENSIONS PREVENTS LAYOUT SHIFT) */}
                  <div className="sm:col-span-4 flex justify-center items-center py-2 sm:py-0 shrink-0">
                    <div className="w-36 sm:w-44 h-40 sm:h-44 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[#F2A93B]/15 rounded-full blur-xl pointer-events-none -z-10" />
                      <img 
                        src={currentItem.image} 
                        alt={currentItem.title} 
                        className="max-w-full max-h-full object-contain drop-shadow-xl transition-all duration-700 ease-out hover:scale-105" 
                      />
                    </div>
                  </div>

                </div>

                {/* ── SESSION AGENDA HIGHLIGHTS CONTAINER (FIXED STABLE GRID) ── */}
                <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl border border-[#E3D7C5] space-y-4 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#8C3A16]">
                    <Calendar className="w-4 h-4 text-[#8C3A16]" />
                    <span>SESSION AGENDA HIGHLIGHTS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {currentItem.highlights.map((hl, hIdx) => {
                      const HlIcon = hl.icon || CheckCircle;
                      return (
                        <div key={hIdx} className="flex items-start gap-3 bg-[#FFFDF7] p-3 rounded-xl border border-[#E3D7C5]/60 shadow-2xs min-h-[64px]">
                          <div className="w-8 h-8 rounded-full bg-[#FFE8D6] text-[#8C3A16] flex items-center justify-center shrink-0 border border-[#E3D7C5]">
                            <HlIcon className="w-4 h-4 text-[#8C3A16]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-extrabold text-[#241708] leading-snug">
                              {hl.text}
                            </p>
                            <div className="w-6 h-0.5 bg-[#C97F1B] rounded-full mt-1.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Smooth Animated Loop Progress Bar at the Bottom */}
              {!isPaused && (
                <div className="w-full bg-[#FAF6EE] h-1.5 overflow-hidden border-t border-[#E3D7C5]">
                  <div 
                    key={`${activeDay}-${activeIndex}`}
                    className="h-full bg-gradient-to-r from-[#8C3A16] via-[#C97F1B] to-[#F2A93B] animate-progressBar"
                    style={{ animationDuration: '5.5s' }}
                  />
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
