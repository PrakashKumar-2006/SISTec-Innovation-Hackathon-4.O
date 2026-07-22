import React, { useState, useEffect, useRef } from 'react';
import { Rocket, ArrowRight, Bell, Megaphone, Users, FileText, Trophy } from 'lucide-react';
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
    // Target date for SIH 4.0 (September 30, 2026)
    const targetDate = new Date('September 30, 2026 10:00:00').getTime();

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
      <div className="flex flex-col items-center shrink-0">
        <div className="bg-[#FFFDF7] border-2 border-[#E3D7C5] shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl w-[54px] xs:w-[64px] sm:w-[84px] h-[54px] xs:h-[64px] sm:h-[84px] flex items-center justify-center relative overflow-hidden group hover:border-[#8C3A16] hover:shadow-xl transition-all duration-300 shrink-0">
          <div className="absolute top-0 inset-x-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#8C3A16] to-[#C97F1B] opacity-90" />
          <span
            className="text-xl xs:text-2xl sm:text-4xl text-[#8C3A16] leading-none select-none tracking-tight font-black tabular-nums text-center"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}
          >
            {display}
          </span>
        </div>
        <span className="text-[7.5px] xs:text-[9px] sm:text-[10px] font-black !text-white tracking-[0.12em] sm:tracking-[0.18em] uppercase mt-1 sm:mt-1.5 font-sans bg-[#8C3A16] px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full border border-[#8C3A16] shrink-0 shadow-xs">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen bg-brand-darker overflow-hidden pt-20 pb-8 sm:pt-[72px] sm:pb-12 flex items-center">
      {/* Background Visual Grid & Glowing effects */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[var(--vermilion)]/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[var(--marigold)]/5 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: Text and branding (Enlarged) ── */}
          <div className="lg:col-span-6 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 sm:space-y-10 relative">
            
            {/* Department Full-Width Header — above the banner */}
            <div className="w-full">
              <div
                className="flex items-center justify-center sm:justify-between border-b border-[var(--line)]/60 pb-2 sm:pb-2.5 select-none gap-2 text-center sm:text-left flex-wrap sm:flex-nowrap"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="hidden lg:flex gap-1.5 shrink-0">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[var(--marigold)] inline-block" />
                  ))}
                </span>
                <span className="flex items-center sm:items-baseline gap-1.5 sm:gap-2 flex-wrap justify-center sm:justify-start">
                  <span className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-[#6B5B49] uppercase tracking-normal">Department of</span>
                  <span className="text-xs xs:text-sm sm:text-2xl md:text-3xl font-black text-[#8C3A16] uppercase tracking-wider font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>CSE | AI &amp; ML | IOT</span>
                </span>
                <span className="hidden lg:flex gap-1.5 shrink-0">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[var(--marigold)] inline-block" />
                  ))}
                </span>
              </div>
            </div>

            {/* ── Banner Branding Block: Logo | Divider | Text ── */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-0 relative z-10 w-full text-center sm:text-left">

              {/* Logo */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <img
                  src={hackathonLogo}
                  alt="SISTec Innovation Hackathon Logo"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-28 h-28 xs:w-34 xs:h-34 sm:w-44 sm:h-44 lg:w-60 lg:h-60 object-contain select-none transition-all duration-300"
                />
              </div>

              {/* Gold Vertical Divider (Desktop Only) */}
              <div className="hidden sm:flex flex-shrink-0 mx-4 sm:mx-6 self-stretch flex-col items-center">
                <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-[var(--marigold)] to-transparent" />
              </div>

              {/* SISTec Innovation Hackathon 4.0 Stacked Heading */}
              <div className="flex flex-col items-center sm:items-start justify-center flex-1 min-w-0">
                <h1 className="leading-[0.95] tracking-tight text-center sm:text-left select-none" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                  <div className="flex items-baseline justify-center sm:justify-start">
                    <span className="text-[#D97B33] font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-none">S</span>
                    <span className="text-[#3D2210] font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl">ISTec</span>
                  </div>
                  <div className="flex items-baseline justify-center sm:justify-start -mt-0.5 sm:-mt-2">
                    <span className="text-[#D97B33] font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-none">I</span>
                    <span className="text-[#3D2210] font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl">nnovation</span>
                  </div>
                  <div className="flex items-baseline justify-center sm:justify-start -mt-0.5 sm:-mt-2">
                    <span className="text-[#D97B33] font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-none">H</span>
                    <span className="text-[#3D2210] font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl">ackathon</span>
                  </div>
                  <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#D97B33] font-black mt-0.5 sm:mt-1">
                    4.0
                  </div>
                </h1>
              </div>

            </div>

            {/* Countdown Box & Register Now Button Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 w-full relative z-10">
              {/* Countdown — Unit Cards */}
              <div className="flex flex-col items-center sm:items-start gap-2 relative z-10 w-full sm:w-auto">
                {/* Live badge */}
                <div className="flex items-center gap-1.5 sm:gap-2 select-none bg-[#8C3A16] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs border border-[#8C3A16]">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.2em] !text-white font-sans">Live Countdown</span>
                </div>

                {/* Units row with colons */}
                <div className="flex items-center justify-center sm:justify-start gap-1 xs:gap-1.5 sm:gap-2.5 w-full">
                  {renderUnit(timeLeft.days, 'Days')}
                  <span className="text-[#8C3A16] font-black text-lg xs:text-xl sm:text-3xl -mt-3.5 sm:-mt-5 animate-pulse select-none">:</span>
                  {renderUnit(timeLeft.hours, 'Hrs')}
                  <span className="text-[#8C3A16] font-black text-lg xs:text-xl sm:text-3xl -mt-3.5 sm:-mt-5 animate-pulse select-none">:</span>
                  {renderUnit(timeLeft.minutes, 'Mins')}
                  <span className="text-[#8C3A16] font-black text-lg xs:text-xl sm:text-3xl -mt-3.5 sm:-mt-5 animate-pulse select-none">:</span>
                  {renderUnit(timeLeft.seconds, 'Secs')}
                </div>
              </div>

              {/* Register Now Button Pill */}
              <button
                onClick={onRegisterClick}
                className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#8C3A16] via-[#A64B1E] to-[#C97F1B] hover:from-[#6B3213] hover:to-[#A64B1E] transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl group cursor-pointer border border-[#C97F1B]/40 hover:scale-[1.02] active:scale-95 text-left w-fit shrink-0 mt-1 sm:mt-2"
              >
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-white leading-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                    Register now
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] font-bold text-white/95 bg-black/25 px-2 py-0.5 rounded-full border border-white/20 mt-0.5 w-fit">
                    Team Size: 4 Members
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#8C3A16] flex items-center justify-center shrink-0 shadow-sm group-hover:translate-x-1 transition-transform duration-300 ml-1">
                  <ArrowRight size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2.5} />
                </div>
              </button>
            </div>

            {/* Horizontal Line Divider */}
            <div className="w-full h-[1px] bg-[var(--line)]/60 pt-1 relative z-10"></div>

            {/* Stats Row (3 Columns Side-by-Side on Mobile & Desktop) */}
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-3.5 w-full relative z-10 pt-1">
              {/* Card 1: Participants */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6EE] border border-[#E3D7C5] hover:border-[#8C3A16] transition-all duration-300 shadow-xs sm:shadow-sm hover:shadow-md hover:-translate-y-0.5 group cursor-pointer">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#8C3A16]/10 flex items-center justify-center shrink-0 group-hover:bg-[#8C3A16] transition-all duration-300">
                  <Users size={15} className="text-[#8C3A16] group-hover:text-white-force stroke-[#8C3A16] group-hover:stroke-white-force stroke-[2.2] transition-all duration-300 sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs xs:text-sm sm:text-2xl font-black text-[#8C3A16] font-display tracking-tight leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    500+
                  </span>
                  <span className="block text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-extrabold text-[#6B5B49] tracking-wider uppercase mt-0.5 sm:mt-1 truncate">
                    Participants
                  </span>
                </div>
              </div>

              {/* Card 2: Problem Statements */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6EE] border border-[#E3D7C5] hover:border-[#C97F1B] transition-all duration-300 shadow-xs sm:shadow-sm hover:shadow-md hover:-translate-y-0.5 group cursor-pointer">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C97F1B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C97F1B] transition-all duration-300">
                  <FileText size={15} className="text-[#C97F1B] group-hover:text-white-force stroke-[#C97F1B] group-hover:stroke-white-force stroke-[2.2] transition-all duration-300 sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs xs:text-sm sm:text-2xl font-black text-[#8C3A16] font-display tracking-tight leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    20+
                  </span>
                  <span className="block text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-extrabold text-[#6B5B49] tracking-wider uppercase mt-0.5 sm:mt-1 truncate">
                    Problems
                  </span>
                </div>
              </div>

              {/* Card 3: Prize Pool */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6EE] border border-[#E3D7C5] hover:border-[#E6491E] transition-all duration-300 shadow-xs sm:shadow-sm hover:shadow-md hover:-translate-y-0.5 group cursor-pointer">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E6491E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E6491E] transition-all duration-300">
                  <Trophy size={15} className="text-[#E6491E] group-hover:text-white-force stroke-[#E6491E] group-hover:stroke-white-force stroke-[2.2] transition-all duration-300 sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs xs:text-sm sm:text-2xl font-black text-[#8C3A16] font-display tracking-tight leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    ₹1 Lakh
                  </span>
                  <span className="block text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-extrabold text-[#6B5B49] tracking-wider uppercase mt-0.5 sm:mt-1 truncate">
                    Prize Pool
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Student Photo & Dedicated Live Announcement Cards ── */}
          <div className="lg:col-span-6 relative w-full flex flex-col justify-center items-center">
            
            {/* 1. Clean Student Photo Container (100% Unobstructed Image) */}
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] rounded-[1.5rem] sm:rounded-[2.2rem] p-1.5 bg-gradient-to-tr from-[#FAF6F0] via-[#FFFDF7] to-[#FAF6EE] border border-[#E3D7C5] shadow-xl select-none overflow-hidden group">
              <div className="w-full h-full rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden relative">
                <img 
                  src="/home_page_image.jpg" 
                  alt="Students Collaborating at Hackathon" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Soft gradient bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Live Campus Event Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20 text-[9px] sm:text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span>SIH 4.0 SISTec-R</span>
                </div>
              </div>
            </div>

            {/* 2. Dedicated Live Announcements Grid (Placed Cleanly Below Image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg lg:max-w-none mt-3.5 sm:mt-4 font-sans">
              
              {/* Announcement 1: Registrations Open */}
              <div 
                onClick={onRegisterClick}
                className="group/ann bg-[#FFFDF7] border border-[#E3D7C5] hover:border-[#8C3A16] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-xl bg-[#8C3A16] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover/ann:scale-105 transition-transform">
                    <Megaphone size={17} className="text-white" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-[#241708] leading-tight font-display truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Registrations Open!
                    </p>
                    <p className="text-[10px] font-bold text-[#6B5B49] truncate mt-0.5">
                      Join 500+ Innovators
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-[#8C3A16] group-hover/ann:translate-x-1 transition-transform">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </div>
              </div>

              {/* Announcement 2: Problem Statements Out */}
              <div 
                onClick={() => onViewChange && onViewChange('problem-statements')}
                className="group/ann bg-[#FFFDF7] border border-[#E3D7C5] hover:border-[#C97F1B] p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-xl bg-[#C97F1B] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover/ann:scale-105 transition-transform">
                    <Bell size={17} className="text-white" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-[#241708] leading-tight font-display truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Problem Statements
                    </p>
                    <p className="text-[10px] font-bold text-[#6B5B49] truncate mt-0.5">
                      20+ Statements Out
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-[#C97F1B] group-hover/ann:translate-x-1 transition-transform">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
