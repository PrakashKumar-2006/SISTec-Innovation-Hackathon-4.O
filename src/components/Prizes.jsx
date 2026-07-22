import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';

export default function Prizes({ isStandalone = false }) {
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Rotate card max 10 degrees on hover
    const rotateX = -(y / (box.height / 2)) * 10;
    const rotateY = (x / (box.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease-out';
  };

  const prizes = [
    {
      place: '01',
      title: '1ST PRIZE — THEME WISE',
      amount: 'WINNER',
      description: 'Theme Champion Trophy & Cash Prize',
      subtitle: 'Awarded to top performing team in each theme category!',
      badge: 'Theme Winner',
      featured: true,
      themeColor: 'bg-[#FAF6EE]',
      borderColor: 'border-[#E3D7C5] hover:border-[#8C3A16]/60',
      glow: 'shadow-md hover:shadow-xl hover:-translate-y-1',
      badgeBg: 'bg-[#8C3A16] !text-white border-[#8C3A16] font-extrabold shadow-sm',
      titleColor: 'text-[#C97F1B]',
      amountColor: 'text-[#8C3A16]',
      descColor: 'text-[#241708]',
      subtitleColor: 'text-[#6B5B49]',
      icon: <Trophy className="w-10 h-10 text-[#8C3A16] animate-bounce" />
    },
    {
      place: '02',
      title: '2ND PRIZE — THEME WISE',
      amount: 'RUNNER UP',
      description: 'Theme Runner-Up Trophy & Cash Prize',
      subtitle: 'Awarded to second spot team in each theme category!',
      badge: 'Theme Runner Up',
      featured: false,
      themeColor: 'bg-[#FAF6EE]',
      borderColor: 'border-[#E3D7C5] hover:border-[#C97F1B]/60',
      glow: 'shadow-md hover:shadow-xl hover:-translate-y-1',
      badgeBg: 'bg-[#C97F1B] !text-white border-[#C97F1B] font-extrabold shadow-sm',
      titleColor: 'text-[#C97F1B]',
      amountColor: 'text-[#8C3A16]',
      descColor: 'text-[#241708]',
      subtitleColor: 'text-[#6B5B49]',
      icon: <Trophy className="w-9 h-9 text-[#C97F1B] animate-pulse" />
    }
  ];

  return (
    <section id="prizes" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5`}>
      {/* Visual glowing effects in the background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Embedded CSS Animations for Trophy SVG */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes trophy-float-prize {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes star-pulse-prize {
          0%, 100% { transform: scale(0.6); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes spin-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-trophy-float-prize {
          animation: trophy-float-prize 4s ease-in-out infinite;
          transform-origin: 100px 105px;
        }
        .animate-star-prize-1 { animation: star-pulse-prize 2s ease-in-out infinite; transform-origin: 40px 50px; }
        .animate-star-prize-2 { animation: star-pulse-prize 2.5s ease-in-out infinite 0.5s; transform-origin: 160px 60px; }
        .animate-star-prize-3 { animation: star-pulse-prize 1.8s ease-in-out infinite 1s; transform-origin: 50px 130px; }
        .animate-star-prize-4 { animation: star-pulse-prize 2.2s ease-in-out infinite 1.5s; transform-origin: 150px 140px; }
        .animate-spin-orbit {
          animation: spin-orbit 15s linear infinite;
          transform-origin: 100px 115px;
        }
      `}} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* ── Section Heading with Inline Animated SVG Trophy ── */}
        <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 flex-wrap">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Total Cash Prizes Up to{' '}
            <span className="text-[var(--marigold-deep)] whitespace-nowrap">
              ₹1 Lakh!
            </span>
          </h2>

          
          {/* Animated SVG Trophy placed inline right next to '1 Lakh!' */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_0_25px_rgba(216,171,85,0.3)] shrink-0 select-none pointer-events-none mt-2 md:mt-0">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible"
            >
              {/* Glowing Background Aura */}
              <circle cx="100" cy="105" r="45" fill="url(#auraGradient)" opacity="0.35" className="animate-pulse" />

              {/* 3D Orbit Ring */}
              <ellipse cx="100" cy="115" rx="72" ry="18" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" strokeDasharray="5 7" className="animate-spin-orbit opacity-75" />

              {/* Floating Trophy Group */}
              <g className="animate-trophy-float-prize">
                {/* Trophy Base */}
                <rect x="75" y="142" width="50" height="10" rx="3" fill="url(#goldGradient)" stroke="#FFE8B6" strokeWidth="0.5" />
                <path d="M 85 142 L 90 122 L 110 122 L 115 142 Z" fill="url(#goldGradient)" stroke="#A27B2B" strokeWidth="0.5" />
                
                {/* Trophy Cup Bowl */}
                <path d="M 65 65 L 135 65 C 135 110, 115 122, 100 122 C 85 122, 65 110, 65 65 Z" fill="url(#goldGradient)" stroke="#FFE8B6" strokeWidth="0.5" />
                
                {/* Left Handle */}
                <path d="M 65 72 C 48 72, 48 94, 65 99" fill="none" stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Right Handle */}
                <path d="M 135 72 C 152 72, 152 94, 135 99" fill="none" stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Glowing White Star Badge on Cup */}
                <path d="M 100 81 L 103 88 L 110 89 L 105 94 L 106 101 L 100 97 L 94 101 L 95 94 L 90 89 L 97 88 Z" fill="#FFFFFF" className="opacity-95 drop-shadow-[0_0_8px_#FFF]" />
              </g>

              {/* Sparkling animated stars */}
              <path d="M40 50 L42 54 L46 55 L42 56 L40 60 L38 56 L34 55 L38 54 Z" fill="#FFE8B6" className="animate-star-prize-1" />
              <path d="M160 60 L162 64 L166 65 L162 66 L160 70 L158 66 L154 65 L158 64 Z" fill="#06B6D4" className="animate-star-prize-2" />
              <path d="M50 130 L52 134 L56 135 L52 136 L50 140 L48 136 L44 135 L48 134 Z" fill="#F59E0B" className="animate-star-prize-3" />
              <path d="M150 140 L152 144 L156 145 L152 146 L150 150 L148 146 L144 145 L148 144 Z" fill="#EC4899" className="animate-star-prize-4" />

              {/* Definitions */}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE8B6" />
                  <stop offset="50%" stopColor="#D8AB55" />
                  <stop offset="100%" stopColor="#A27B2B" />
                </linearGradient>
                <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D8AB55" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D8AB55" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Prizes Cards Grid (Theme-Wise 2 Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-3xl mx-auto mb-16">
          {prizes.map((prize, idx) => {
            return (
              <div
                key={idx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative rounded-3xl ${prize.themeColor} border ${prize.borderColor} p-8 flex flex-col justify-between transition-all duration-300 ${prize.glow} ${
                  prize.featured 
                    ? 'ring-2 ring-[#8C3A16]/20'
                    : ''
                } group overflow-hidden text-left`}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Large background number */}
                <span className="absolute -right-2 -bottom-4 text-[8rem] font-black font-display text-[#8C3A16]/[0.05] select-none leading-none group-hover:text-[#8C3A16]/[0.10] transition-colors duration-500">
                  {prize.place}
                </span>

                <div className="space-y-6 pt-2 relative z-10">
                  {/* Header Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div 
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider text-white-force ${prize.badgeBg}`}
                    >
                      <span className="text-white-force font-extrabold">
                        {prize.badge}
                      </span>
                    </div>
                    {prize.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-xs font-black tracking-widest ${prize.titleColor} font-sans uppercase`}>
                      {prize.title}
                    </h3>
                    <p className={`text-5xl sm:text-6xl font-black font-display ${prize.amountColor} leading-none py-1`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {prize.amount}
                    </p>
                    <p className={`text-base ${prize.descColor} font-extrabold tracking-wide pt-1`}>
                      {prize.description}
                    </p>
                  </div>
                </div>

                {/* Bottom footer text of card */}
                <div className={`pt-4 border-t border-[#D9CCBA] mt-8 text-xs ${prize.subtitleColor} font-extrabold italic relative z-10`}>
                  "{prize.subtitle}"
                </div>
              </div>
            );
          })}
        </div>

        {/* Theme-wise Notification Banner */}
        <div className="max-w-2xl mx-auto -mt-8 mb-12 p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#8C3A16]/30 flex items-center justify-center gap-3 text-xs font-black text-[#8C3A16] text-center shadow-md">
          <Trophy size={18} className="text-[#8C3A16] shrink-0 animate-bounce" />
          <span>Winner &amp; Runner-Up trophies and cash rewards will be awarded for <strong className="text-[#241708] underline">EVERY</strong> theme category!</span>
        </div>

        {/* Venue and Date Panel */}
        <div className="relative max-w-4xl mx-auto mt-16 p-1 rounded-3xl bg-gradient-to-r from-[#8C3A16]/20 via-[#C97F1B]/20 to-[#8C3A16]/20 shadow-lg border border-[#E3D7C5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center p-5 sm:p-8 rounded-[1.7rem] bg-[#FFFDF7]">
            
            {/* Date block */}
            <div className="flex items-center gap-4 text-left group">
              <div className="p-3.5 rounded-2xl bg-[#8C3A16]/10 border border-[#8C3A16]/20 text-[#8C3A16] shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#8C3A16] font-bold tracking-widest uppercase">GRAND FINALE DATE</p>
                <p className="text-lg font-black text-[#241708] font-display mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>30 Sept &amp; 01 Oct 2026</p>
                <p className="text-xs text-[#6B5B49] font-medium mt-0.5">Mark your calendars for the final pitch</p>
              </div>
            </div>

            {/* Visual separator line for larger screens */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#E3D7C5]"></div>

            {/* Venue block */}
            <a 
              href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-left group pl-0 md:pl-8 cursor-pointer"
            >
              <div className="p-3.5 rounded-2xl bg-[#C97F1B]/10 border border-[#C97F1B]/20 text-[#C97F1B] shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#8C3A16] font-bold tracking-widest uppercase group-hover:text-[#C97F1B] transition-colors">OFFICIAL VENUE</p>
                <p className="text-lg font-black text-[#241708] font-display mt-0.5 group-hover:text-[#8C3A16] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>SISTec-R Campus</p>
                <p className="text-xs text-[#6B5B49] font-medium mt-0.5 group-hover:text-[#241708] transition-colors">Ratibad, Bhopal, Madhya Pradesh</p>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
