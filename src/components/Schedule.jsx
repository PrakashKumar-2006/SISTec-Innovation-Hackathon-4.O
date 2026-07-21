import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Coffee, Utensils, Lightbulb, Users, Trophy, Sparkles, CheckCircle, ArrowRight, Bell, ChevronDown, Zap, MapPin } from 'lucide-react';

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
    <path d="M18 8C18 6.9 17.1 6 16 6H8C6.9 6 6 6.9 6 8V12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12V8Z" />
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
  const [expandedId, setExpandedId] = useState('d1-1');
  const [isHovered, setIsHovered] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  // Timeline Page-Inspired Colors & Themes per Event Type
  const day1Schedule = [
    {
      id: 'd1-1',
      time: '10:00 AM - 11:30 AM',
      title: 'Inauguration Ceremony',
      desc: 'Official inauguration of SISTec SIH 4.0 Hackathon with chief guest welcome, lamp lighting, and keynote briefing.',
      category: 'Inauguration',
      location: 'Main Auditorium',
      icon: Users,
      badgeSVG: InaugurationBadgeSVG,
      cardBg: 'bg-gradient-to-br from-amber-500/10 via-[#FFFDF7] to-amber-500/5',
      activeCardBg: 'bg-gradient-to-br from-amber-500/20 via-[#FFFDF7] to-orange-500/10 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
      iconColor: 'text-amber-600',
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      accentStripe: 'from-amber-500 to-orange-500',
      highlights: ['Chief Guests Welcome & Lamp Lighting', 'Keynote Speeches by Industry Experts', 'Event Rules & Marking Guidelines Briefing']
    },
    {
      id: 'd1-2',
      time: '11:30 AM - 01:00 PM',
      title: 'Round 1 Evaluation',
      desc: 'Expert panel visits all team bays to review initial problem statements, architecture plans, and technology stacks.',
      category: 'Judgement 1',
      location: 'Innovation Labs',
      icon: Lightbulb,
      badgeSVG: JudgementBadgeSVG,
      cardBg: 'bg-gradient-to-br from-rose-500/10 via-[#FFFDF7] to-red-600/5',
      activeCardBg: 'bg-gradient-to-br from-rose-500/20 via-[#FFFDF7] to-red-500/10 border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.25)]',
      borderColor: 'border-rose-500/30',
      iconBg: 'bg-rose-500/15 text-rose-600 border-rose-500/30',
      iconColor: 'text-rose-600',
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      accentStripe: 'from-rose-500 to-red-500',
      highlights: ['1-on-1 Judges Pitching Session', 'Architectural Feedback Collection', 'Immediate Refinement Sprint Starts']
    },
    {
      id: 'd1-3',
      time: '01:00 PM - 02:00 PM',
      title: 'Networking Buffet Lunch',
      desc: 'Recharge with a catered buffet lunch, connect with mentors, and collaborate across participating teams.',
      category: 'Lunch Break',
      location: 'Dining Hall',
      icon: Utensils,
      badgeSVG: FoodMealSVG,
      cardBg: 'bg-gradient-to-br from-purple-500/10 via-[#FFFDF7] to-indigo-600/5',
      activeCardBg: 'bg-gradient-to-br from-purple-500/20 via-[#FFFDF7] to-indigo-500/10 border-purple-500/60 shadow-[0_0_25px_rgba(139,92,246,0.25)]',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
      iconColor: 'text-purple-600',
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
      accentStripe: 'from-purple-500 to-indigo-500',
      highlights: ['Catered Buffet Lunch', 'Cross-Team & Mentor Networking', 'Informal Technical Q&A']
    },
    {
      id: 'd1-4',
      time: '05:00 PM - 05:30 PM',
      title: 'High-Tea & Snacks Break',
      desc: 'Recharge with hot tea, snacks, and refreshing energy drinks to power through the evening development sprint.',
      category: 'High-Tea',
      location: 'Cafeteria Lawn',
      icon: Coffee,
      badgeSVG: FoodMealSVG,
      cardBg: 'bg-gradient-to-br from-cyan-500/10 via-[#FFFDF7] to-blue-600/5',
      activeCardBg: 'bg-gradient-to-br from-cyan-500/20 via-[#FFFDF7] to-blue-500/10 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30',
      iconColor: 'text-cyan-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/30',
      accentStripe: 'from-cyan-500 to-blue-500',
      highlights: ['Hot Tea & Fresh Refreshments', 'Relaxation Lounge Access', 'Tech Support Desk Active']
    },
    {
      id: 'd1-5',
      time: '05:30 PM - 07:30 PM',
      title: 'Round 2 Evaluation',
      desc: 'Judges assess progress on suggestions offered in Round 1, inspecting live code repositories and working prototypes.',
      category: 'Judgement 2',
      location: 'Innovation Labs',
      icon: Clock,
      badgeSVG: JudgementBadgeSVG,
      cardBg: 'bg-gradient-to-br from-rose-500/10 via-[#FFFDF7] to-red-600/5',
      activeCardBg: 'bg-gradient-to-br from-rose-500/20 via-[#FFFDF7] to-red-500/10 border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.25)]',
      borderColor: 'border-rose-500/30',
      iconBg: 'bg-rose-500/15 text-rose-600 border-rose-500/30',
      iconColor: 'text-rose-600',
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      accentStripe: 'from-rose-500 to-red-500',
      highlights: ['Working Prototype Demo', 'Codebase & API Inspection', 'Midway Score Card Logging']
    },
    {
      id: 'd1-6',
      time: '08:00 PM Onwards',
      title: 'Dinner & Midnight Hackathon',
      desc: 'Hearty evening dinner and kick-off for the midnight coding marathon with non-stop coffee and mentor support.',
      category: 'Night Hack',
      location: 'Overnight Labs',
      icon: Utensils,
      badgeSVG: FoodMealSVG,
      cardBg: 'bg-gradient-to-br from-emerald-500/10 via-[#FFFDF7] to-teal-600/5',
      activeCardBg: 'bg-gradient-to-br from-emerald-500/20 via-[#FFFDF7] to-teal-500/10 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
      iconColor: 'text-emerald-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
      accentStripe: 'from-emerald-500 to-teal-500',
      highlights: ['Nutritious Dinner Spread', 'Midnight Coffee & Energy Bar Desk', 'Overnight Lab Access & Hardware Desk']
    }
  ];

  const day2Schedule = [
    {
      id: 'd2-1',
      time: '03:30 AM - 05:00 AM',
      title: 'Round 3 Evaluation (Final Pitch)',
      desc: 'Crucial third round of evaluation reviewing deployment readiness, live hosting, UI/UX polish, and final pitch deck.',
      category: 'Final Judgement',
      location: 'Main Stage',
      icon: Clock,
      badgeSVG: JudgementBadgeSVG,
      cardBg: 'bg-gradient-to-br from-rose-500/10 via-[#FFFDF7] to-red-600/5',
      activeCardBg: 'bg-gradient-to-br from-rose-500/20 via-[#FFFDF7] to-red-500/10 border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.25)]',
      borderColor: 'border-rose-500/30',
      iconBg: 'bg-rose-500/15 text-rose-600 border-rose-500/30',
      iconColor: 'text-rose-600',
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      accentStripe: 'from-rose-500 to-red-500',
      highlights: ['Final Prototype Polish', 'Live Cloud Hosting Verification', 'Pitch Deck & Presentation Sync']
    },
    {
      id: 'd2-2',
      time: '05:00 AM - 06:00 AM',
      title: 'Sunrise Yoga & Wellness',
      desc: 'Refresh your mind and body with an invigorating morning yoga & breathing exercise session at sunrise.',
      category: 'Wellness',
      location: 'Green Lawns',
      icon: Sparkles,
      badgeSVG: YogaLotusSVG,
      cardBg: 'bg-gradient-to-br from-cyan-500/10 via-[#FFFDF7] to-blue-600/5',
      activeCardBg: 'bg-gradient-to-br from-cyan-500/20 via-[#FFFDF7] to-blue-500/10 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30',
      iconColor: 'text-cyan-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/30',
      accentStripe: 'from-cyan-500 to-blue-500',
      highlights: ['Guided Breathing Exercises', 'Mental Wellness Stretch', 'Sunrise Energy Recharge']
    },
    {
      id: 'd2-3',
      time: '09:00 AM - 10:00 AM',
      title: 'Grand Breakfast Served',
      desc: 'Wholesome breakfast buffet to fuel participants before the grand valedictory and final results announcement.',
      category: 'Breakfast',
      location: 'Dining Hall',
      icon: Coffee,
      badgeSVG: FoodMealSVG,
      cardBg: 'bg-gradient-to-br from-purple-500/10 via-[#FFFDF7] to-indigo-600/5',
      activeCardBg: 'bg-gradient-to-br from-purple-500/20 via-[#FFFDF7] to-indigo-500/10 border-purple-500/60 shadow-[0_0_25px_rgba(139,92,246,0.25)]',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
      iconColor: 'text-purple-600',
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
      accentStripe: 'from-purple-500 to-indigo-500',
      highlights: ['Wholesome Breakfast Buffet', 'Fresh Juice & Coffee Counter', 'Day 2 Final Setup Wrap-Up']
    },
    {
      id: 'd2-4',
      time: '10:00 AM - 01:00 PM',
      title: 'Valedictory & Prize Distribution',
      desc: 'Grand closing ceremony celebrating outstanding innovations, distribution of cash prizes, trophies, and certificates.',
      category: 'Valedictory',
      location: 'Main Auditorium',
      icon: Trophy,
      badgeSVG: TrophyAwardSVG,
      cardBg: 'bg-gradient-to-br from-amber-500/10 via-[#FFFDF7] to-orange-600/5',
      activeCardBg: 'bg-gradient-to-br from-amber-500/20 via-[#FFFDF7] to-orange-500/10 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
      iconColor: 'text-amber-600',
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      accentStripe: 'from-amber-500 to-orange-500',
      highlights: ['Winner Trophy & Cash Prize Ceremony', 'Chief Guests Closing Address', 'Official Certificate Distribution']
    }
  ];

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  // Reset active index when day changes
  useEffect(() => {
    setActiveIndex(0);
    if (currentSchedule.length > 0) {
      setExpandedId(currentSchedule[0].id);
    }
  }, [activeDay]);

  // Sync expandedId with activeIndex
  useEffect(() => {
    if (currentSchedule[activeIndex]) {
      setExpandedId(currentSchedule[activeIndex].id);
    }
  }, [activeIndex, currentSchedule]);

  // 🔄 Autoplay Animation: Step by step item expansion. Pauses when isHovered = true, Resumes when isHovered = false
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % currentSchedule.length);
    }, 3200); // Shift active expanding card every 3.2 seconds

    return () => clearInterval(interval);
  }, [isHovered, currentSchedule.length]);

  const handleReminder = (item) => {
    setToastNotification({
      title: item.title,
      time: item.time
    });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  return (
    <section id="schedule" className="relative py-16 sm:py-24 bg-[var(--paper)] text-[#241708] overflow-hidden border-t border-[#EBDAB9]">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 animate-bounce flex items-center gap-3.5 bg-[#2B1607] text-[#FFFDF7] border-2 border-[#F2A93B] px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-[90vw]">
          <div className="w-8 h-8 rounded-full bg-[#8C3A16] text-[#FFFDF7] flex items-center justify-center font-bold shrink-0">
            <Bell className="w-4 h-4 text-[#F2A93B] animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#F2A93B]">Session Reminder Set! 🔔</p>
            <p className="text-xs font-bold text-[#FFFDF7]">{toastNotification.title} ({toastNotification.time})</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E3D7C5] text-xs font-mono font-bold text-[#8C3A16] mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#E6491E]" />
            <span>SIH 4.0 OFFICIAL EVENT SCHEDULE</span>
          </div>
          
          <h2 className="text-3.5xl sm:text-5xl font-black tracking-tight text-[#241708] leading-tight font-display">
            Event <span className="text-[#8C3A16]">Schedule</span>
          </h2>
          
          <p className="mt-2.5 text-xs sm:text-sm text-[#6B5B49] max-w-lg mx-auto font-medium leading-relaxed">
            Auto-cycling timeline schedule. Hover over any card to pause auto-play, unhover to resume.
          </p>
        </div>

        {/* Day Switcher Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto">
          {[
            { id: 1, label: 'DAY 1', sub: '30 Sep • 6 Sessions' },
            { id: 2, label: 'DAY 2', sub: '01 Oct • 4 Sessions' }
          ].map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black tracking-wider transition-all duration-300 cursor-pointer flex flex-col items-center justify-center border text-center ${
                activeDay === day.id
                  ? 'bg-[#8C3A16] text-[#FFFDF7] border-[#8C3A16] shadow-md scale-[1.02]'
                  : 'bg-[#FAF6EE] text-[#6B5B49] border-[#E3D7C5] hover:border-[#8C3A16]/40 hover:text-[#241708]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Calendar className={`w-3.5 h-3.5 ${activeDay === day.id ? 'text-[#F2A93B]' : 'text-[#8C3A16]'}`} />
                <span>{day.label}</span>
              </div>
              <span className={`text-[9px] font-mono font-medium ${activeDay === day.id ? 'text-[#FFFDF7]/80' : 'text-[#6B5B49]'}`}>
                {day.sub}
              </span>
            </button>
          ))}
        </div>

        {/* ── AUTOPLAY STEP-BY-STEP ANIMATION CARDS LIST (HOVER TO PAUSE, UNHOVER TO RESUME) ── */}
        <div 
          className="space-y-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {currentSchedule.map((item, idx) => {
            const ItemIcon = item.icon;
            const ItemBadgeSVG = item.badgeSVG || InaugurationBadgeSVG;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveIndex(idx);
                }}
                onMouseLeave={() => setIsHovered(false)}
                className={`rounded-2xl transition-all duration-500 border overflow-hidden relative ${
                  isExpanded ? `${item.activeCardBg} scale-[1.01]` : `${item.cardBg} ${item.borderColor} hover:border-[#8C3A16]/50`
                }`}
              >
                {/* Top Accent Gradient Line */}
                <div className={`h-1 w-full bg-gradient-to-r ${item.accentStripe}`} />

                {/* Clickable Header Bar */}
                <button
                  onClick={() => {
                    setIsHovered(true);
                    setActiveIndex(idx);
                    setExpandedId(isExpanded ? null : item.id);
                  }}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    
                    {/* Icon Circle Box with Step Index */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border text-xs sm:text-sm font-black font-mono transition-all ${item.iconBg}`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top Time Pill & Category Tag */}
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono font-black text-[#241708] bg-[#FFFDF7] px-2.5 py-0.5 rounded border border-[#E3D7C5] flex items-center gap-1 shadow-2xs">
                          <Clock className="w-3 h-3 text-[#8C3A16]" />
                          <span>{item.time}</span>
                        </span>
                        
                        <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                          <ItemBadgeSVG className="w-3 h-3" />
                          <span>{item.category}</span>
                        </span>

                        {isExpanded && (
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#E6491E] bg-[#E6491E]/10 px-2 py-0.5 rounded-full border border-[#E6491E]/20 animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      {/* Main Title */}
                      <h3 className="text-sm sm:text-base font-black text-[#241708] leading-tight font-display">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isExpanded ? 'rotate-180 bg-[#8C3A16] text-[#FFFDF7]' : 'bg-[#FFFDF7] text-[#8C3A16] border border-[#E3D7C5]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-[#E3D7C5]/60 bg-[#FFFDF7]/90 backdrop-blur-xs animate-fadeIn">
                    
                    {/* Location Badge */}
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-[#6B5B49] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E3D7C5] inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8C3A16]" />
                        <span>Venue: {item.location}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#6B5B49] font-medium leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Agenda Highlights Checklist */}
                    <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E3D7C5] mb-4 space-y-2">
                      <h4 className="text-[9px] font-black tracking-widest uppercase text-[#8C3A16]">
                        SESSION AGENDA HIGHLIGHTS:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#241708]">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2">
                            <CheckCircle className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E3D7C5]/60">
                      <span className="text-[10px] font-mono text-[#6B5B49] font-semibold">
                        SIH 4.0 Official Track
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReminder(item);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#8C3A16] text-[#FFFDF7] text-xs font-black uppercase tracking-wider hover:bg-[#6B3213] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bell className="w-3.5 h-3.5 text-[#F2A93B]" />
                        <span>Set Reminder 🔔</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
