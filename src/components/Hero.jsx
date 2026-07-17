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
    <section id="home" className="w-full bg-brand-darker overflow-hidden pt-[84px] sm:pt-[100px] lg:pt-[108px]">
      
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

        {/* Countdown Timer Overlay positioned below 'LET THE INNOVATION BEGINS' */}
        <div className="absolute left-[8.5%] top-[77%] w-[40.5%] flex justify-between gap-[0.8vw]">
          {[
            { label: 'Days', value: timeLeft.days, border: 'border-brand-orange/20' },
            { label: 'Hours', value: timeLeft.hours, border: 'border-brand-pink/20' },
            { label: 'Minutes', value: timeLeft.minutes, border: 'border-brand-purple/20' },
            { label: 'Seconds', value: timeLeft.seconds, border: 'border-brand-blue/20' }
          ].map((time, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center w-[22%] py-[0.8vw] rounded-[1vw] bg-brand-darker/60 backdrop-blur-[4px] border ${time.border} shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Top color accent strip */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>
              
              {/* Large Gradient Number */}
              <span className="text-[2.2vw] leading-none font-black font-display bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple bg-clip-text text-transparent">
                {formatNumber(time.value)}
              </span>
              
              {/* Tag Label */}
              <span className="text-[0.65vw] font-bold text-brand-navy mt-[0.3vw] tracking-widest font-sans uppercase">
                {time.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
