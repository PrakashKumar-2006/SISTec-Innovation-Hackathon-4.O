import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, ClipboardList, Info, Download, ArrowRight, MapPin, Layers } from 'lucide-react';

export default function Instructions({ onViewChange, onRegisterClick }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const guidelines = [
    {
      id: 1,
      title: "Team Formation Rules",
      desc: "Form teams of 2 to 6 members from the same institution. Including at least one female member is highly recommended.",
      icon: "👥",
      badge: "Mandatory",
      cardBg: "bg-[#EAF7EE]",
      borderColor: "border-[#10B981]/40",
      badgeStyle: "bg-[#10B981]/15 text-[#047857] border-[#10B981]/30",
      stageBadge: "bg-[#10B981] text-white",
      titleColor: "text-[#065F46]",
      descColor: "text-[#047857]",
      bulletDot: "bg-[#10B981]",
      buttonColor: "bg-[#10B981] hover:bg-[#059669] text-white shadow-emerald-600/20",
      bullets: [
        "Minimum 2 and Maximum 6 members per team",
        "All members must belong to the same college (No inter-college teams)",
        "At least one female member is highly recommended"
      ]
    },
    {
      id: 2,
      title: "Problem Statement Selection",
      desc: "Choose a track from the listed themes (AgriTech, HealthTech, etc.) or select 'Open Innovation' for custom projects.",
      icon: "🎯",
      badge: "Flexible",
      cardBg: "bg-[#FDF0F4]",
      borderColor: "border-[#EC4899]/40",
      badgeStyle: "bg-[#EC4899]/15 text-[#BE185D] border-[#EC4899]/30",
      stageBadge: "bg-[#EC4899] text-white",
      titleColor: "text-[#9D174D]",
      descColor: "text-[#BE185D]",
      bulletDot: "bg-[#EC4899]",
      buttonColor: "bg-[#EC4899] hover:bg-[#DB2777] text-white shadow-pink-600/20",
      bullets: [
        "Choose from 12+ pre-defined tracks/categories",
        "Select 'Open Innovation' for your own unique hardware/software idea",
        "Hardware and Software projects are evaluated in separate categories"
      ]
    },
    {
      id: 3,
      title: "PPT Presentation Template",
      desc: "Submit your idea using the official PPT template, detailing your problem statement, solution description, tech stack, and novelty.",
      icon: "📊",
      badge: "Format",
      cardBg: "bg-[#EEF4FE]",
      borderColor: "border-[#3B82F6]/40",
      badgeStyle: "bg-[#3B82F6]/15 text-[#1D4ED8] border-[#3B82F6]/30",
      stageBadge: "bg-[#3B82F6] text-white",
      titleColor: "text-[#1E40AF]",
      descColor: "text-[#1D4ED8]",
      bulletDot: "bg-[#3B82F6]",
      buttonColor: "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-blue-600/20",
      bullets: [
        "Strictly follow the official presentation slide structure",
        "Detail your problem, proposed solution, tech stack, and novelty",
        "Do not modify the slide master layout coordinates"
      ]
    },
    {
      id: 4,
      title: "HOD Consent Letter",
      desc: "A signed, stamped consent letter from your College Principal or HOD is mandatory for validation and submission.",
      icon: "📝",
      badge: "Required",
      cardBg: "bg-[#FDF6E9]",
      borderColor: "border-[#F2A93B]/40",
      badgeStyle: "bg-[#F2A93B]/20 text-[#B45309] border-[#F2A93B]/40",
      stageBadge: "bg-[#D97706] text-white",
      titleColor: "text-[#92400E]",
      descColor: "text-[#B45309]",
      bulletDot: "bg-[#D97706]",
      buttonColor: "bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-600/20",
      bullets: [
        "Signed and officially stamped HOD/Principal letter is mandatory",
        "Upload in PDF format during the registration process",
        "Submissions without a valid consent letter will be disqualified"
      ]
    },
    {
      id: 5,
      title: "Registration & Payments",
      desc: "Complete the registration form via your team leader. Ensure accurate student details for on-venue ID verification.",
      icon: "💳",
      badge: "Process",
      cardBg: "bg-[#F6F0FD]",
      borderColor: "border-[#8B5CF6]/40",
      badgeStyle: "bg-[#8B5CF6]/15 text-[#6D28D9] border-[#8B5CF6]/30",
      stageBadge: "bg-[#8B5CF6] text-white",
      titleColor: "text-[#5B21B6]",
      descColor: "text-[#6D28D9]",
      bulletDot: "bg-[#8B5CF6]",
      buttonColor: "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-purple-600/20",
      bullets: [
        "Registration must be submitted completely by the Team Leader",
        "Double-check all member details and contact numbers before submission",
        "Physical ID verification is mandatory on-venue at the event"
      ]
    },
    {
      id: 6,
      title: "Grand Finale Guidelines",
      desc: "Report to SISTec-R campus for the 24-hour non-stop hackathon. Teams must bring their own laptops and hardware resources.",
      icon: "⚡",
      badge: "Finale",
      cardBg: "bg-[#FDF0F9]",
      borderColor: "border-[#D946EF]/40",
      badgeStyle: "bg-[#D946EF]/15 text-[#A21CAF] border-[#D946EF]/30",
      stageBadge: "bg-[#D946EF] text-white",
      titleColor: "text-[#86198F]",
      descColor: "text-[#A21CAF]",
      bulletDot: "bg-[#D946EF]",
      buttonColor: "bg-[#D946EF] hover:bg-[#C026D3] text-white shadow-fuchsia-600/20",
      bullets: [
        "24-Hour continuous non-stop hacking event at SISTec-R campus",
        "Bring your own laptops, adapters, and necessary hardware modules",
        "Free meals, refreshments, high-speed Wi-Fi, and mentoring provided"
      ]
    }
  ];

  const activeGuideline = guidelines[activeTab];

  // Continuous Autoplay Loop with Hover Pause
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % guidelines.length);
    }, 4000); // 4 seconds loop, pauses when hovered

    return () => clearInterval(interval);
  }, [isHovered, guidelines.length]);

  return (
    <section className="relative min-h-screen bg-brand-darker pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8 text-white select-none overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      
      {/* Dynamic Animated background glows synced with active tab color */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[160px] pointer-events-none -z-10 transition-all duration-[1000ms]" 
        style={{ backgroundColor: activeGuideline.glowColor, opacity: 0.14 }}
      />
      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_12s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-brand-pink/3 rounded-full blur-[140px] pointer-events-none -z-10 animate-[pulse_14s_ease-in-out_infinite]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.007)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-35 pointer-events-none -z-10" />

      {/* Embedded CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-check {
          0% { stroke-dashoffset: 50; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes line-scale {
          0% { transform: scaleX(0); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: scaleX(1); opacity: 0.8; }
        }
        @keyframes float-clipboard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes card-float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .svg-check-1 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .svg-check-2 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s infinite;
        }
        .svg-check-3 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite;
        }
        .svg-list-line-1 {
          animation: line-scale 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .svg-list-line-2 {
          animation: line-scale 2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s infinite;
        }
        .svg-list-line-3 {
          animation: line-scale 2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite;
        }
        .svg-clipboard-group {
          animation: float-clipboard 5s ease-in-out infinite;
          transform-origin: center;
        }
        .pulse-ring-effect {
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
          transform-origin: center;
        }

        @keyframes card-fade-slide {
          0% { opacity: 0; transform: translateY(12px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        .animate-card-slide {
          animation: card-fade-slide 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-card-float-active {
          animation: card-float-slow 6s ease-in-out infinite;
        }
        
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 1; filter: brightness(1.12); }
        }
        .animate-glow-breathe {
          animation: glow-breathe 4.5s ease-in-out infinite;
        }
        .pulse-sonar {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
      `}} />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
        
        {/* Back Navigation & Page Header */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 text-left border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/25 shadow-sm">
              <ClipboardList size={11} className="text-brand-gold" />
              Official Guidelines
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--clay)] tracking-tight leading-none mt-1 font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              Instructions <span className="text-[var(--marigold-deep)]">&amp; Guidelines</span>
            </h1>
            <p className="text-[var(--ink-soft)] text-xs sm:text-sm font-medium font-sans">
              Carefully review the hackathon rules and registration requirements below.
            </p>

          </div>
        </div>

        {/* ── Graphic and Intro Block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 sm:mb-16 w-full">
          
          {/* Left Column: Animated SVG Checklist Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 relative">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.18)]"
              >
                {/* Orbiting glowing dust particles */}
                <circle cx="100" cy="100" r="88" fill="none" stroke="#D8AB55" strokeWidth="0.5" strokeDasharray="3 9" className="opacity-25 animate-[spin_55s_linear_infinite]" />
                <circle cx="100" cy="100" r="76" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="6 18" className="opacity-20 animate-[spin_35s_linear_infinite_reverse]" />

                {/* Main Floating Clipboard Group */}
                <g className="svg-clipboard-group">
                  
                  {/* Clipboard Board backing shadow */}
                  <rect x="52" y="32" width="96" height="136" rx="12" fill="#0D0D11" stroke="url(#clipboardBorder)" strokeWidth="2.5" />
                  
                  {/* Clipboard Clip */}
                  <path d="M85 32 L115 32 A 4 4 0 0 1 119 36 L119 44 A 4 4 0 0 1 115 48 L85 48 A 4 4 0 0 1 81 44 L81 36 A 4 4 0 0 1 85 32 Z" fill="url(#clipGradient)" className="opacity-95" />
                  
                  {/* Checklist Items: Line 1 (Check & Rect Text Line) */}
                  <circle cx="70" cy="70" r="8" fill="#10B981" className="opacity-15" />
                  <circle cx="70" cy="70" r="10" fill="none" stroke="#10B981" strokeWidth="1" className="pulse-ring-effect" />
                  <path d="M66 70 L69 73 L74 67" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" className="svg-check-1" />
                  <rect x="86" y="68.5" width="46" height="3" rx="1.5" fill="url(#lineGradientBlue)" className="svg-list-line-1" style={{ transformOrigin: '86px 70px' }} />

                  {/* Checklist Items: Line 2 (Check & Rect Text Line) */}
                  <circle cx="70" cy="98" r="8" fill="#06B6D4" className="opacity-15" />
                  <circle cx="70" cy="98" r="10" fill="none" stroke="#06B6D4" strokeWidth="1" className="pulse-ring-effect" style={{ animationDelay: '0.6s' }} />
                  <path d="M66 98 L69 101 L74 95" fill="none" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" className="svg-check-2" />
                  <rect x="86" y="96.5" width="38" height="3" rx="1.5" fill="url(#lineGradientCyan)" className="svg-list-line-2" style={{ transformOrigin: '86px 98px' }} />

                  {/* Checklist Items: Line 3 (Check & Rect Text Line) */}
                  <circle cx="70" cy="126" r="8" fill="#F59E0B" className="opacity-15" />
                  <circle cx="70" cy="126" r="10" fill="none" stroke="#F59E0B" strokeWidth="1" className="pulse-ring-effect" style={{ animationDelay: '1.2s' }} />
                  <path d="M66 126 L69 129 L74 123" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" className="svg-check-3" />
                  <rect x="86" y="124.5" width="50" height="3" rx="1.5" fill="url(#lineGradientGold)" className="svg-list-line-3" style={{ transformOrigin: '86px 126px' }} />
                  
                </g>

                {/* Floating sparkles outside */}
                <path d="M30 45 L32 49 L36 50 L32 51 L30 55 L28 51 L24 50 L28 49 Z" fill="#06B6D4" className="animate-pulse" />
                <path d="M170 120 L171.5 123.5 L175 124.5 L171.5 125.5 L170 129 L168.5 125.5 L165 124.5 L168.5 123.5 Z" fill="#D8AB55" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Gradients definitions */}
                <defs>
                  <linearGradient id="clipboardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#D8AB55" />
                  </linearGradient>
                  <linearGradient id="clipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D8AB55" />
                    <stop offset="100%" stopColor="#A27B2B" />
                  </linearGradient>
                  <linearGradient id="lineGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="lineGradientCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="lineGradientGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#D8AB55" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Column: Text Callout & Resource download (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#8C3A16] leading-snug">
              Important Submission Deliverables
            </h2>
            <p className="text-[#241708] text-xs sm:text-sm leading-relaxed font-bold">
              SISTec Innovation Hackathon 4.O requires teams to submit their ideas in a structured presentation format. Make sure you download the official templates below to guide your submission and prevent disqualification.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="/Idea-Sumission Format SIH 4.0.pptx" 
                download="Idea-Submission-Format-SIH-4.0.pptx"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#8C3A16] hover:bg-[#6B3213] text-white text-xs font-black uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto border border-[#8C3A16] cursor-pointer"
              >
                <Download size={16} className="text-white" />
                Download Idea PPT Template
              </a>
              
              <a 
                href="#process" 
                onClick={(e) => { e.preventDefault(); onViewChange('landing', '#process'); }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FAF6EE] text-[#8C3A16] text-xs font-black uppercase tracking-wider border-2 border-[#8C3A16]/50 shadow-md hover:scale-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
              >
                <Download size={16} className="text-[#8C3A16]" />
                Download Consent Format
              </a>
            </div>
          </div>

        </div>

        {/* ── GUIDELINES REPRESENTATION (Desktop Console / Mobile Accordion) ── */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full mb-10 w-full"
        >
          {/* 1. DESKTOP VIEW: Split-Pane Console Workspace (hidden on mobile screens) */}
          <div className="hidden lg:block w-full bg-[#FAF6EE] backdrop-blur-2xl border border-[#E3D7C5] rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-noise-overlay opacity-[0.02] pointer-events-none" />
            
            <div className="grid grid-cols-12 gap-8 items-stretch relative z-10">
              {/* Left Side: Step Tabs (Col 1 to 5) */}
              <div className="col-span-5 flex flex-col gap-2.5 border-r border-[#E3D7C5] pr-6">
                <span className="text-[10px] font-black text-[#6B5B49] uppercase tracking-widest mb-2 font-sans flex items-center gap-1.5">
                  <Layers size={12} className="text-[#8C3A16]" />
                  Guideline Steps
                </span>
                
                <div className="flex flex-col gap-2.5">
                  {guidelines.map((rule, idx) => {
                    const isActive = activeTab === idx;
                    return (
                      <button
                        key={rule.id}
                        onClick={() => setActiveTab(idx)}
                        onMouseEnter={() => { setIsHovered(true); setActiveTab(idx); }}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                          isActive
                            ? `${rule.cardBg} border-2 ${rule.borderColor} shadow-md scale-[1.02]`
                            : 'bg-[#FFFDF7] border-[#E3D7C5] text-[#241708] hover:text-[#8C3A16] hover:bg-[#FAF6EE] hover:border-[#8C3A16]/40 hover:translate-x-1.5'
                        }`}
                      >
                        {/* Icon */}
                        <div className="relative shrink-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border shadow-inner transition-colors duration-300 relative z-10 ${
                            isActive ? `${rule.badgeStyle}` : 'bg-[#FAF6EE] border-[#E3D7C5]'
                          }`}>
                            {rule.icon}
                          </div>
                        </div>

                        <div className="leading-tight">
                          <p className={`text-[8px] font-black uppercase tracking-wider font-sans ${isActive ? rule.titleColor : 'text-[#6B5B49]'}`}>Rule 0{rule.id}</p>
                          <h4 className={`text-xs font-black tracking-wide font-sans ${isActive ? rule.titleColor : 'text-[#241708]'}`}>{rule.title}</h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Active Card details */}
              <div 
                key={activeTab} 
                className={`col-span-7 flex flex-col justify-between ${activeGuideline.cardBg} border-2 ${activeGuideline.borderColor} p-7 rounded-[1.5rem] shadow-lg animate-card-slide text-left`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[9px] font-sans font-black text-white ${activeGuideline.stageBadge} px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm`}>
                        STAGE 0{activeGuideline.id}
                      </span>
                      <span className={`px-3.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${activeGuideline.badgeStyle}`}>
                        {activeGuideline.badge}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-2xl font-black font-display tracking-wide ${activeGuideline.titleColor}`}>{activeGuideline.title}</h3>
                    <p className={`text-sm leading-relaxed font-bold ${activeGuideline.descColor}`}>{activeGuideline.desc}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-black text-[#C97F1B] tracking-widest uppercase font-sans">Core Guidelines</p>
                    <ul className="space-y-2">
                      {activeGuideline.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={`flex items-start gap-2.5 text-xs font-bold leading-relaxed ${activeGuideline.descColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeGuideline.bulletDot}`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 mt-6 flex justify-end">
                  {activeGuideline.id === 3 ? (
                    <a 
                      href="/Idea-Sumission Format SIH 4.0.pptx" 
                      download="Idea-Submission-Format-SIH-4.0.pptx"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md border-none cursor-pointer ${activeGuideline.buttonColor}`}
                    >
                      <Download size={13} />
                      Download PPT Template
                    </a>
                  ) : activeGuideline.id === 5 ? (
                    <button 
                      onClick={() => onRegisterClick && onRegisterClick()}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md border-none cursor-pointer ${activeGuideline.buttonColor}`}
                    >
                      <ArrowRight size={13} />
                      Open Registration Form
                    </button>
                  ) : activeGuideline.id === 6 ? (
                    <a 
                      href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md border-none cursor-pointer ${activeGuideline.buttonColor}`}
                    >
                      <MapPin size={13} />
                      View Campus Location
                    </a>
                  ) : activeGuideline.id === 2 ? (
                    <a 
                      href="#themes"
                      onClick={(e) => { e.preventDefault(); onViewChange('landing', '#themes'); }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md border-none cursor-pointer ${activeGuideline.buttonColor}`}
                    >
                      <Layers size={13} />
                      Browse Themes
                    </a>
                  ) : (
                    <div className="text-[10px] text-[#6B5B49] font-bold font-sans uppercase tracking-widest">
                      SISTec-R Innovation Guidelines Console
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. MOBILE VIEW: Interactive Collapsible Accordions (hidden on desktop screens) */}
          <div className="block lg:hidden w-full flex flex-col gap-3.5 text-left">
            {guidelines.map((rule, idx) => {
              const isOpen = activeTab === idx;
              return (
                <div 
                  key={rule.id}
                  className={`border rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                    isOpen 
                      ? `${rule.cardBg} border-2 ${rule.borderColor} shadow-lg` 
                      : 'bg-[#FFFDF7] border-[#E3D7C5] shadow-sm'
                  }`}
                >
                  {/* Accordion Header Trigger */}
                  <button 
                    onClick={() => setActiveTab(idx)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer text-left focus:outline-none bg-transparent border-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base border shadow-inner transition-colors duration-300 relative z-10 ${
                          isOpen ? 'bg-white/80 border-black/10' : 'bg-[#FAF6EE] border-[#E3D7C5]'
                        }`}>
                          {rule.icon}
                        </div>
                      </div>

                      <div className="leading-tight">
                        <p className="text-[8px] font-black uppercase tracking-wider font-sans text-[#6B5B49]">Rule 0{rule.id}</p>
                        <h4 className={`text-xs font-black tracking-wide font-sans transition-colors duration-300 ${isOpen ? rule.titleColor : 'text-[#241708]'}`}>
                          {rule.title}
                        </h4>
                      </div>
                    </div>

                    {/* Chevron Indicator */}
                    <svg 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Collapsible Detail Drawer */}
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen 
                        ? 'max-h-[500px] border-t border-[#E3D7C5] opacity-100' 
                        : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-4 sm:p-5 space-y-4 text-left">
                      <p className="text-[#241708] text-xs font-bold leading-relaxed">
                        {rule.desc}
                      </p>

                      {/* Bullet Checklist */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-[#C97F1B] tracking-widest uppercase font-sans">Core Guidelines</p>
                        <ul className="space-y-2">
                          {rule.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-[11px] text-[#241708] font-bold leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#8C3A16]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button inside Accordion */}
                      <div className="pt-4 border-t border-[#E3D7C5] flex w-full">
                        {rule.id === 3 ? (
                          <a 
                            href="/Idea-Sumission Format SIH 4.0.pptx" 
                            download="Idea-Submission-Format-SIH-4.0.pptx"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8C3A16] hover:bg-[#6B3213] text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md w-full border-none cursor-pointer"
                          >
                            <Download size={13} />
                            Download PPT Template
                          </a>
                        ) : rule.id === 5 ? (
                          <button 
                            onClick={() => onRegisterClick && onRegisterClick()}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8C3A16] hover:bg-[#6B3213] text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md w-full border-none cursor-pointer"
                          >
                            <ArrowRight size={13} />
                            Open Registration Form
                          </button>
                        ) : rule.id === 6 ? (
                          <a 
                            href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8C3A16] hover:bg-[#6B3213] text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md w-full border-none cursor-pointer"
                          >
                            <MapPin size={13} />
                            View Campus Location
                          </a>
                        ) : rule.id === 2 ? (
                          <a 
                            href="#themes"
                            onClick={(e) => { e.preventDefault(); onViewChange('landing', '#themes'); }}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md w-full border-none ${rule.buttonColor}`}
                          >
                            <Layers size={13} />
                            Browse Themes
                          </a>
                        ) : (
                          <div className="text-[9px] text-slate-500 font-bold font-sans uppercase tracking-widest w-full text-right">
                            SISTec-R Innovation Guidelines Console
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Call to Action ── */}
        <div className="bg-gradient-to-r from-brand-gold/15 to-amber-500/5 border border-brand-gold/30 rounded-2xl p-5 sm:p-6 w-full text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
              <Info size={16} />
            </div>
            <div>
              <h4 className="text-white text-sm font-extrabold leading-snug">Ready to present your Innovation?</h4>
              <p className="text-slate-400 text-xs font-semibold">Make sure your team formation matches all rules before applying.</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              onViewChange('landing');
              // Trigger registration modal
              setTimeout(() => {
                const registerBtn = document.querySelector('.btn-premium-animate');
                if (registerBtn) registerBtn.click();
              }, 100);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-btn-gradient text-white text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 hover:scale-[1.02] border-none"
          >
            Register Now
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
