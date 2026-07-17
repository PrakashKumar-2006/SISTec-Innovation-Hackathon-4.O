import React, { useState, useEffect } from 'react';

export default function Hero({ onRegisterClick }) {
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

  return (
    <section id="home" className="w-full bg-brand-darker overflow-hidden pt-[64px] sm:pt-[72px]">
      
      {/* Edge-to-Edge Full-Bleed Banner Container */}
      <div className="relative w-full">
        
        {/* Main Banner Image stretching 100% screen width */}
        <img 
          src="/sih4.png" 
          alt="SISTec Innovation Hackathon SIH 4.0 Banner" 
          className="w-full h-auto block"
        />

        {/* Interactive Hotspot Overlay Button */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center">
          <button
            onClick={onRegisterClick}
            className="absolute left-[27.5%] top-[61%] w-[26%] h-[9%] rounded-full cursor-pointer pointer-events-auto opacity-0 hover:opacity-10 bg-white/20 transition-opacity"
            title="Register Now"
          />
        </div>
      </div>

      {/* Reverted back to the original card blocks countdown style as requested */}
      <div className="mt-12 mb-12 flex justify-center gap-4 sm:gap-6 px-4">
        {[
          { label: 'Days', value: timeLeft.days, border: 'border-brand-orange/30' },
          { label: 'Hours', value: timeLeft.hours, border: 'border-brand-pink/30' },
          { label: 'Minutes', value: timeLeft.minutes, border: 'border-brand-purple/30' },
          { label: 'Seconds', value: timeLeft.seconds, border: 'border-brand-blue/30' }
        ].map((time, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center justify-center min-w-[75px] sm:min-w-[110px] p-4 rounded-[2rem] bg-white border ${time.border} shadow-card-shadow hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Top color accent strip */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>
            
            {/* Large Gradient Number */}
            <span className="text-3xl sm:text-5xl font-black font-display bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple bg-clip-text text-transparent">
              {formatNumber(time.value)}
            </span>
            
            {/* Tag Label */}
            <span className="text-[10px] sm:text-xs font-bold text-brand-navy mt-1 tracking-widest font-sans uppercase">
              {time.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
