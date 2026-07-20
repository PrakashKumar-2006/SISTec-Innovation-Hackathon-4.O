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
      place: '02',
      title: '2ND PRIZE',
      amount: 'Runner Up',
      description: 'Runner Up Trophy & Certificates',
      subtitle: 'Claim the second spot in glory!',
      badge: 'Silver Medalist',
      perks: [
        'Exciting Cash Reward',
        'Official Runner-up Trophy',
        'Silver Medals for Team',
        'Excellence Certificates'
      ],
      themeColor: 'from-cyan-500/20 to-blue-600/5',
      borderColor: 'border-cyan-500/20 group-hover:border-cyan-500/60',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:shadow-[0_15px_35px_rgba(6,182,212,0.25)]',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      textGradient: 'from-white via-cyan-100 to-cyan-300',
      icon: <Trophy className="w-8 h-8 text-cyan-400 animate-pulse" />
    },
    {
      place: '01',
      title: '1ST PRIZE',
      amount: 'Champion',
      description: 'Grand Winner Trophy & Certificates',
      subtitle: 'Claim the ultimate victory prize!',
      badge: 'Grand Champion',
      featured: true,
      perks: [
        'Grand Cash Reward',
        'Official Champion Trophy',
        'Gold Medals for Team',
        'Excellence Certificates',
        'Incubation Opportunity'
      ],
      themeColor: 'from-amber-500/25 to-orange-600/5',
      borderColor: 'border-amber-500/30 group-hover:border-amber-500/70',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.25)] group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)]',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      textGradient: 'from-[#FFE8B6] via-[#D8AB55] to-[#A27B2B]',
      icon: <Trophy className="w-10 h-10 text-brand-gold animate-bounce" />
    },
    {
      place: '03',
      title: '3RD PRIZE',
      amount: '2nd Runner Up',
      description: '2nd Runner Up Trophy & Certificates',
      subtitle: 'Secure your place on the podium!',
      badge: 'Bronze Medalist',
      perks: [
        'Exciting Cash Reward',
        '2nd Runner-up Trophy',
        'Bronze Medals for Team',
        'Excellence Certificates'
      ],
      themeColor: 'from-orange-500/20 to-rose-600/5',
      borderColor: 'border-orange-500/20 group-hover:border-orange-500/60',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:shadow-[0_15px_35px_rgba(249,115,22,0.25)]',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      textGradient: 'from-[#FED7AA] via-[#F97316] to-[#C2410C]',
      icon: <Trophy className="w-8 h-8 text-orange-400 animate-pulse" />
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-tight">
            Total Cash Prizes Up to{' '}
            <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-amber-500 bg-clip-text text-transparent whitespace-nowrap">
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

        {/* Prizes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-end max-w-5xl mx-auto mb-16">
          {[prizes[0], prizes[1], prizes[2]].map((prize, idx) => {
            const orderClasses = [
              'order-2 md:order-1',
              'order-1 md:order-2',
              'order-3 md:order-3'
            ];
            return (
              <div
                key={idx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative rounded-3xl bg-gradient-to-br ${prize.themeColor} backdrop-blur-md border ${prize.borderColor} p-6 flex flex-col justify-between transition-shadow duration-300 ${prize.glow} ${orderClasses[idx]} ${
                  prize.featured 
                    ? 'lg:z-10 min-h-[390px]'
                    : 'min-h-[350px]'
                } group overflow-hidden`}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Large background number for editorial touch */}
                <span className="absolute -right-2 -bottom-4 text-[6.5rem] font-black font-display text-white/[0.02] select-none leading-none group-hover:text-white/[0.04] transition-colors duration-500">
                  {prize.place}
                </span>

                <div className="space-y-4 pt-2 relative z-10">
                  {/* Header Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-wider ${prize.badgeBg}`}>
                    {prize.badge}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-gray font-sans uppercase">
                      {prize.title}
                    </h3>
                    <p className={`text-3xl sm:text-4xl font-black font-display bg-gradient-to-b ${prize.textGradient} bg-clip-text text-transparent leading-none py-1`}>
                      {prize.amount}
                    </p>
                    <p className="text-xs text-brand-navy font-bold tracking-wide mt-0.5">
                      {prize.description}
                    </p>
                  </div>

                  {/* List of Perks */}
                  <ul className="space-y-2 pt-1.5">
                    {prize.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-left text-xs text-brand-gray font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom footer text of card */}
                <div className="pt-3 border-t border-white/5 mt-4 text-[10px] sm:text-xs text-brand-gray/80 font-medium italic relative z-10">
                  "{prize.subtitle}"
                </div>
              </div>
            );
          })}
        </div>

        {/* Venue and Date Panel */}
        <div className="relative max-w-4xl mx-auto mt-16 p-1 rounded-3xl bg-gradient-to-r from-brand-orange/20 via-brand-pink/20 to-brand-blue/20 shadow-xl border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-[1.7rem] bg-brand-card/85 backdrop-blur-xl">
            
            {/* Date block */}
            <div className="flex items-center gap-4 text-left group">
              <div className="p-3.5 rounded-2xl bg-brand-orange/15 border border-brand-orange/25 text-brand-orange shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-brand-gray font-bold tracking-widest uppercase">GRAND FINALE DATE</p>
                <p className="text-lg font-black text-white font-display mt-0.5">08 November 2026</p>
                <p className="text-xs text-brand-gray mt-0.5">Mark your calendars for the final pitch</p>
              </div>
            </div>

            {/* Visual separator line for larger screens */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10"></div>

            {/* Venue block */}
            <a 
              href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-left group pl-0 md:pl-8 cursor-pointer"
            >
              <div className="p-3.5 rounded-2xl bg-brand-blue/15 border border-brand-blue/25 text-brand-blue shadow-inner group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-brand-gray font-bold tracking-widest uppercase group-hover:text-brand-gold transition-colors">OFFICIAL VENUE</p>
                <p className="text-lg font-black text-white font-display mt-0.5 group-hover:text-brand-gold transition-colors">SISTec-R Campus</p>
                <p className="text-xs text-brand-gray mt-0.5 group-hover:text-slate-200 transition-colors">Ratibad, Bhopal, Madhya Pradesh</p>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
