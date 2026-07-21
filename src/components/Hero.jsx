import React, { useState, useEffect, useRef } from 'react';
import { Rocket, ArrowRight, Bell, Megaphone } from 'lucide-react';
import hackathonLogo from '../../NEW HACKTHON LOGO TRANSPARENT.png';

export default function Hero({ onRegisterClick, onViewChange }) {

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date for SIH 4.0 (November 8, 2026)
    const targetDate = new Date('November 8, 2026 10:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d,
          hours: h,
          minutes: m,
          seconds: s
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  const renderUnit = (value, label) => {
    const display = formatNumber(value);
    return (
      <div className="flex flex-col items-center min-w-[48px] sm:min-w-[56px]">
        <span
          className="text-3xl sm:text-4xl text-[var(--clay)] leading-none select-none"
          style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}
        >
          {display}
        </span>
        <span className="text-[9px] sm:text-[10px] font-black text-[var(--clay)]/50 tracking-[0.2em] uppercase mt-1 font-sans">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen bg-brand-darker overflow-hidden pt-16 sm:pt-[72px] flex items-center">
      {/* Background Visual Grid & Glowing effects */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[var(--vermilion)]/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[var(--marigold)]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: Text and branding (Enlarged) ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8 sm:space-y-10 relative">
            
            {/* Department Full-Width Header — above the banner */}
            <div className="relative z-10 w-full">
              <p
                className="text-sm sm:text-base lg:text-lg tracking-[0.22em] text-[var(--marigold)] uppercase flex items-center gap-3 flex-wrap"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}
              >
                <span className="flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--marigold)]/60 inline-block" />
                  ))}
                </span>
                Department of CSE | AI &amp; ML | IOT
                <span className="flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--marigold)]/60 inline-block" />
                  ))}
                </span>
              </p>
            </div>

            {/* ── Banner Branding Block: Logo | Divider | Text ── */}
            <div className="flex items-center gap-0 relative z-10 w-full">

              {/* Logo - no box, transparent, bigger */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <img
                  src={hackathonLogo}
                  alt="SISTec Innovation Hackathon Logo"
                  className="w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60 object-contain select-none"
                />
              </div>

              {/* Gold Vertical Divider */}
              <div className="flex-shrink-0 mx-4 sm:mx-6 self-stretch flex flex-col items-center">
                <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-[var(--marigold)] to-transparent" />
              </div>

              {/* SISTec Innovation Hackathon 4.0 Stacked Heading */}
              <div className="flex flex-col items-start justify-center flex-1 min-w-0">
                <h1 className="leading-[0.88] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl text-[var(--clay)]">SISTec</span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl text-[var(--clay)]/70">Innovation</span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl text-[var(--clay)]/70">Hackathon</span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl text-[var(--marigold)] mt-1">4.0</span>
                </h1>
              </div>


            </div>


            {/* Countdown Box & Register Now Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-2xl relative z-10">
              {/* Countdown — no box, free-floating units */}
              <div className="flex-1 flex flex-col gap-2 relative z-10">
                {/* Live badge */}
                <div className="flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--vermilion)] animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--vermilion)] font-sans">Live Countdown</span>
                </div>
                {/* Units row */}
                <div className="flex items-end gap-4 sm:gap-6">
                  {renderUnit(timeLeft.days, 'Days')}
                  <span className="text-[var(--clay)]/30 font-black text-2xl mb-4 select-none">·</span>
                  {renderUnit(timeLeft.hours, 'Hrs')}
                  <span className="text-[var(--clay)]/30 font-black text-2xl mb-4 select-none">·</span>
                  {renderUnit(timeLeft.minutes, 'Mins')}
                  <span className="text-[var(--clay)]/30 font-black text-2xl mb-4 select-none">·</span>
                  {renderUnit(timeLeft.seconds, 'Secs')}
                </div>
              </div>

              {/* Register Now Button Pill */}
              <button
                onClick={onRegisterClick}
                className="flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[#F2A93B] hover:bg-[#C97F1B] transition-all duration-300 shadow-lg group cursor-pointer border-none text-[var(--panel)] hover:scale-[1.02] active:scale-95 text-left sm:w-64 shrink-0 font-bold"
              >
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-black tracking-tight leading-none uppercase">Register now</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[var(--panel)]/80 mt-1.5">Team of 4 · free entry</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--panel)] text-[var(--marigold)] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>

            {/* Horizontal Line Divider */}
            <div className="w-full h-[1px] bg-[var(--line)]/60 pt-2 relative z-10"></div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 w-full relative z-10 pt-2">
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-black text-brand-text font-sans">500+</span>
                <span className="block text-[9px] sm:text-[10px] font-black text-brand-gray tracking-widest uppercase mt-1">Participants</span>
              </div>
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-black text-brand-text font-sans">40+</span>
                <span className="block text-[9px] sm:text-[10px] font-black text-brand-gray tracking-widest uppercase mt-1">Problem Statements</span>
              </div>
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-black text-brand-text font-sans">₹2L</span>
                <span className="block text-[9px] sm:text-[10px] font-black text-brand-gray tracking-widest uppercase mt-1">Prize Pool</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Student Collage Graphic ── */}
          <div className="lg:col-span-6 relative w-full flex flex-col justify-center items-center">
            
            {/* Collage Image Container */}
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-[4/3] rounded-[2.5rem] p-1.5 bg-[#FAF6F0] border border-[var(--line)] shadow-[0_20px_50px_rgba(43,26,19,0.08)] mt-8 lg:mt-0 select-none">
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                <img 
                  src="/home_page_image.jpg" 
                  alt="Students Collaborating at Hackathon" 
                  className="w-full h-full object-cover opacity-95"
                />
                {/* Soft gradient bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Overlapping Badges */}
              
              {/* Badge 1: Registrations Open */}
              <div className="absolute -top-6 -left-4 sm:-left-8 z-20 animate-float-2 flex items-center gap-3 bg-[var(--paper)] border border-[var(--line-strong)] rounded-2xl p-3 sm:p-4 shadow-[0_12px_28px_rgba(43,26,19,0.06)] max-w-[240px] sm:max-w-[280px]">
                <div className="w-8 h-8 rounded-lg bg-[var(--vermilion)] text-white flex items-center justify-center shrink-0">
                  <Megaphone size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs font-bold text-brand-navy leading-snug">
                    Registrations are open.
                  </p>
                  <button 
                    onClick={onRegisterClick}
                    className="text-[9px] sm:text-[10px] font-black text-[var(--vermilion)] hover:underline uppercase mt-1 block border-none bg-transparent cursor-pointer p-0"
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Badge 2: Problem Statements Released */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 z-20 animate-float-3 flex items-center gap-3 bg-[var(--paper)] border border-[var(--line-strong)] rounded-2xl p-3 sm:p-4 shadow-[0_12px_28px_rgba(43,26,19,0.06)] max-w-[240px] sm:max-w-[280px]">
                <div className="w-8 h-8 rounded-lg bg-[var(--vermilion)] text-white flex items-center justify-center shrink-0">
                  <Bell size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs font-bold text-brand-navy leading-snug">
                    Problem statements released.
                  </p>
                  <button 
                    onClick={() => onViewChange && onViewChange('problem-statements')}
                    className="text-[9px] sm:text-[10px] font-black text-[var(--vermilion)] hover:underline uppercase mt-1 block border-none bg-transparent cursor-pointer p-0"
                  >
                    Check it
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
