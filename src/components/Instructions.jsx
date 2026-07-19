import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, ClipboardList, CheckCircle, Info, Download, ArrowRight } from 'lucide-react';

export default function Instructions({ onViewChange }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const guidelines = [
    {
      id: 1,
      title: "Team Formation Rules",
      desc: "Each team must consist of 2 to 6 student members. Having at least one female member is highly recommended. All members must belong to the same institution (inter-college teams are not permitted).",
      icon: "👥",
      badge: "Mandatory"
    },
    {
      id: 2,
      title: "Problem Statement Selection",
      desc: "Select a problem statement from the listed categories (AgriTech, HealthTech, EduTech, Smart Devices, etc.) or choose 'Open Innovation' if you are developing a custom idea outside the listed tracks.",
      icon: "🎯",
      badge: "Flexible"
    },
    {
      id: 3,
      title: "PPT Presentation Template",
      desc: "All ideas must be submitted using the official SIH 4.O PPT template. Make sure to cover the problem statement, solution description, technology stack, and novelty of your idea.",
      icon: "📊",
      badge: "Format"
    },
    {
      id: 4,
      title: "HOD Consent Letter",
      desc: "A signed consent letter from your College Principal, Director, or HOD is mandatory. Submissions without a valid, officially stamped consent letter will be disqualified.",
      icon: "📝",
      badge: "Required"
    },
    {
      id: 5,
      title: "Registration & Payments",
      desc: "Fill in the registration form completely through the team leader. Provide accurate student details, contact numbers, and emails. ID verification will be conducted at the venue.",
      icon: "💳",
      badge: "Process"
    },
    {
      id: 6,
      title: "Grand Finale Guidelines",
      desc: "Shortlisted teams must report to the SISTec-R Bhopal campus for the 36-hour non-stop hackathon. Teams are required to bring their own laptops, development boards, and hardware modules.",
      icon: "⚡",
      badge: "Finale"
    }
  ];

  return (
    <section className="relative min-h-screen bg-brand-darker pt-28 pb-20 px-3 sm:px-6 lg:px-8 text-white select-none">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-orange/4 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-purple/4 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Embedded CSS Animations for the SVG Checklist */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-check {
          0% { stroke-dashoffset: 50; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes line-slide {
          0% { stroke-dashoffset: 200; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.8; }
        }
        @keyframes float-clipboard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .svg-check-1 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards infinite;
        }
        .svg-check-2 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards infinite;
        }
        .svg-check-3 {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 1.5s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards infinite;
        }
        .svg-list-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: line-slide 3s linear infinite;
        }
        .svg-clipboard-group {
          animation: float-clipboard 6s ease-in-out infinite;
          transform-origin: center;
        }
      `}} />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Back Navigation & Page Header */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 text-left border-b border-white/5 pb-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              <ClipboardList size={11} />
              Official Guidelines
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mt-1">
              Instructions <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-amber-500 bg-clip-text text-transparent">& Guidelines</span>
            </h1>
            <p className="text-brand-gray text-xs sm:text-sm font-medium">
              Carefully review the hackathon rules and registration requirements below.
            </p>
          </div>
          
          <button
            onClick={() => onViewChange && onViewChange('landing')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/50 text-xs font-bold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* ── Graphic and Intro Block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 w-full">
          
          {/* Left Column: Animated SVG Checklist Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-56 h-56 sm:w-64 sm:h-64 relative">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full drop-shadow-[0_0_35px_rgba(216,171,85,0.18)]"
              >
                {/* Orbiting glowing dust particles */}
                <circle cx="100" cy="100" r="88" fill="none" stroke="#D8AB55" strokeWidth="0.5" strokeDasharray="3 9" className="opacity-20 animate-[spin_50s_linear_infinite]" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="6 18" className="opacity-15 animate-[spin_30s_linear_infinite_reverse]" />

                {/* Main Floating Clipboard Group */}
                <g className="svg-clipboard-group">
                  
                  {/* Clipboard Board backing shadow */}
                  <rect x="52" y="32" width="96" height="136" rx="12" fill="#0D0D11" stroke="url(#goldGradient)" strokeWidth="2.5" />
                  
                  {/* Clipboard Clip */}
                  <path d="M85 32 L115 32 A 4 4 0 0 1 119 36 L119 44 A 4 4 0 0 1 115 48 L85 48 A 4 4 0 0 1 81 44 L81 36 A 4 4 0 0 1 85 32 Z" fill="#D8AB55" className="opacity-90" />
                  
                  {/* Checklist Items: Line 1 (Check & Text) */}
                  <circle cx="70" cy="70" r="8" fill="#E65C00" className="opacity-10" />
                  <path d="M66 70 L69 73 L74 67" fill="none" stroke="#D8AB55" strokeWidth="2.2" strokeLinecap="round" className="svg-check-1" />
                  <line x1="86" y1="70" x2="132" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="svg-list-line opacity-75" />

                  {/* Checklist Items: Line 2 (Check & Text) */}
                  <circle cx="70" cy="98" r="8" fill="#E65C00" className="opacity-10" />
                  <path d="M66 98 L69 101 L74 95" fill="none" stroke="#D8AB55" strokeWidth="2.2" strokeLinecap="round" className="svg-check-2" />
                  <line x1="86" y1="98" x2="124" y2="98" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="svg-list-line opacity-75" />

                  {/* Checklist Items: Line 3 (Check & Text) */}
                  <circle cx="70" cy="126" r="8" fill="#E65C00" className="opacity-10" />
                  <path d="M66 126 L69 129 L74 123" fill="none" stroke="#D8AB55" strokeWidth="2.2" strokeLinecap="round" className="svg-check-3" />
                  <line x1="86" y1="126" x2="136" y2="126" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="svg-list-line opacity-75" />
                  
                </g>

                {/* Floating sparkles outside */}
                <path d="M30 45 L32 49 L36 50 L32 51 L30 55 L28 51 L24 50 L28 49 Z" fill="#D8AB55" className="animate-pulse" />
                <path d="M170 120 L171.5 123.5 L175 124.5 L171.5 125.5 L170 129 L168.5 125.5 L165 124.5 L168.5 123.5 Z" fill="#D8AB55" className="animate-pulse" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D8AB55" />
                    <stop offset="100%" stopColor="#A27B2B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Column: Text Callout & Resource download (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              Important Submission Deliverables
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
              SISTec Innovation Hackathon 4.O requires teams to submit their ideas in a structured presentation format. Make sure you download the official templates below to guide your submission and prevent disqualification.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#process" 
                onClick={(e) => { e.preventDefault(); onViewChange('landing', '#process'); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-card hover:bg-brand-card/85 text-xs font-bold text-brand-gold border border-white/10 hover:border-brand-gold/40 shadow-md active:scale-95 transition-all"
              >
                <Download size={14} />
                Download Idea PPT Template
              </a>
              
              <a 
                href="#process" 
                onClick={(e) => { e.preventDefault(); onViewChange('landing', '#process'); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/10 hover:border-brand-gold/30 shadow-md active:scale-95 transition-all"
              >
                <Download size={14} />
                Download Consent Format
              </a>
            </div>
          </div>

        </div>

        {/* ── Guidelines Grid (Structured Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          {guidelines.map((rule) => (
            <div
              key={rule.id}
              className="bg-brand-card/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-brand-gold/30 hover:shadow-[0_12px_25px_rgba(216,171,85,0.08)] transition-all duration-300 text-left relative flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                {/* Icon header with ID tag */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-brand-gold/10 text-xl flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:scale-105 transition-transform">
                    {rule.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2.5 py-0.5 rounded-full">
                    {rule.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-white text-base font-extrabold group-hover:text-brand-gold transition-colors">
                    {rule.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed font-medium">
                    {rule.desc}
                  </p>
                </div>
              </div>

              {/* ID counter decoration inside */}
              <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-slate-500/20 select-none">
                0{rule.id}
              </div>
            </div>
          ))}
        </div>

        {/* ── Call to Action ── */}
        <div className="bg-gradient-to-r from-brand-gold/10 to-amber-500/5 border border-brand-gold/30 rounded-2xl p-5 sm:p-6 w-full text-center mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
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
              // Trigger registration modal (which is managed by App.jsx state)
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
