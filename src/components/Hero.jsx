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



        {/* Countdown Timer Overlay positioned below 'LET THE INNOVATION BEGINS' (Desktop Only) */}
        <div className="hidden md:flex absolute left-[8.5%] top-[77%] w-[40.5%] justify-between gap-[0.8vw]">
          {[
            { label: 'Days', value: timeLeft.days, border: 'border-brand-orange/60', shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.35)]', numClass: 'text-brand-orange drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' },
            { label: 'Hours', value: timeLeft.hours, border: 'border-brand-pink/60', shadow: 'shadow-[0_0_20px_rgba(236,72,153,0.35)]', numClass: 'text-brand-pink drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' },
            { label: 'Minutes', value: timeLeft.minutes, border: 'border-brand-blue/60', shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.35)]', numClass: 'text-brand-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' },
            { label: 'Seconds', value: timeLeft.seconds, border: 'border-brand-gold/60', shadow: 'shadow-[0_0_20px_rgba(216,171,85,0.35)]', numClass: 'text-gold-metallic drop-shadow-[0_0_8px_rgba(216,171,85,0.6)]' }
          ].map((time, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center w-[22%] py-[0.8vw] rounded-[1vw] bg-black/90 backdrop-blur-[12px] border-2 ${time.border} ${time.shadow} transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Top color accent strip */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>

              {/* Large Glowing Number */}
              <span className={`text-[2.2vw] leading-none font-black font-display ${time.numClass}`}>
                {formatNumber(time.value)}
              </span>

              {/* Tag Label */}
              <span className="text-[0.65vw] font-bold text-white mt-[0.3vw] tracking-widest font-sans uppercase opacity-90 group-hover:opacity-100 group-hover:text-brand-gold transition-all duration-300">
                {time.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile-Only Below-Banner Container (Side-by-Side Countdown & Register Button) */}
        <div className="md:hidden bg-brand-dark/95 border-b border-white/5 px-[4vw] py-[3.5vw] flex items-center justify-between gap-[3vw] w-full">
          {/* Left Side: Countdown Timer */}
          <div className="flex gap-[1.5vw] shrink-0">
            {[
              { label: 'Days', value: timeLeft.days, border: 'border-brand-orange/60', numClass: 'text-brand-orange' },
              { label: 'Hrs', value: timeLeft.hours, border: 'border-brand-pink/60', numClass: 'text-brand-pink' },
              { label: 'Min', value: timeLeft.minutes, border: 'border-brand-blue/60', numClass: 'text-brand-blue' },
              { label: 'Sec', value: timeLeft.seconds, border: 'border-brand-gold/60', numClass: 'text-gold-metallic' }
            ].map((time, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center w-[12.5vw] h-[12.5vw] max-w-[54px] max-h-[54px] min-w-[42px] min-h-[42px] rounded-xl bg-black/85 backdrop-blur-[6px] border ${time.border} relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>
                <span className={`text-[4.5vw] sm:text-base leading-none font-black font-display ${time.numClass}`}>
                  {formatNumber(time.value)}
                </span>
                <span className="text-[2vw] sm:text-[9px] font-bold text-white/90 mt-[0.5vw] uppercase tracking-wider">
                  {time.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right Side: Register Button */}
          <div className="flex-grow max-w-[130px] sm:max-w-[150px]">
            <button
              onClick={onRegisterClick}
              className="w-full py-[3vw] sm:py-3.5 rounded-xl bg-btn-gradient text-[3vw] sm:text-xs font-bold tracking-wide text-white shadow-lg active:scale-95 transition-all duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
