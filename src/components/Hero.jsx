import React, { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';

export default function Hero({ onRegisterClick }) {
  const canvasRef = useRef(null);

  // Particle Canvas Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const mouse = { x: null, y: null, radius: 120 };
    
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize particles based on screen area
    const particleCount = Math.min(70, Math.floor((width * height) / 20000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw link lines between close particles
      ctx.strokeStyle = 'rgba(216, 171, 85, 0.06)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw and update particles
      ctx.fillStyle = 'rgba(216, 171, 85, 0.45)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off bounds smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Mouse interaction (push away)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen bg-brand-darker overflow-hidden pt-[90px] sm:pt-[110px] lg:pt-[120px] flex items-center py-12 lg:py-0">
      {/* Background Visual Grid & Glowing effects */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: Text and branding (Enlarged) ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8 sm:space-y-10">
            
            {/* Top Dot Accent & CSE Dept Title */}
            <div className="space-y-3">
              {/* Dot Grid representation */}
              <div className="flex flex-wrap gap-2 w-44 opacity-40">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-brand-gold"></div>
                ))}
              </div>
              
              <p className="text-[9px] sm:text-sm md:text-base lg:text-lg font-black tracking-[0.18em] sm:tracking-[0.28em] text-brand-gold font-cinzel uppercase whitespace-nowrap">
                Department of Computer Science & Engineering
              </p>
            </div>

            {/* Logo + Title Section (matching the screenshot block but larger) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8 w-full">
              {/* Brain logo (unboxed with custom shape glow) */}
              <div className="shrink-0 flex items-center justify-center hover:scale-105 transition-all duration-300">
                <img 
                  src="/sih_logo.png" 
                  alt="SISTec Innovation Hackathon Logo" 
                  className="w-32 h-32 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_0_20px_rgba(216,171,85,0.5)] drop-shadow-[0_0_35px_rgba(236,72,153,0.3)]"
                />
              </div>

              {/* Golden line divider (Horizontal fade on mobile, Vertical fade on desktop - more to less) */}
              <div className="w-24 h-[2px] sm:w-[2px] sm:h-auto bg-gradient-to-r from-[#D8AB55] to-transparent sm:bg-gradient-to-b sm:from-[#D8AB55] sm:to-transparent my-1 sm:my-0 shrink-0"></div>

              {/* Title texts */}
              <div className="flex flex-col justify-center text-center sm:text-left space-y-2 sm:space-y-3">
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-none font-display">
                  SIH <span className="text-gold-metallic">4.0</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-wide text-white leading-none font-sans uppercase whitespace-nowrap">
                  <span className="normal-case">SISTec</span> Innovation <span className="text-brand-gold">Hackathon</span>
                </p>
              </div>
            </div>

            {/* Let the Innovation Begins rocket badge */}
            <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-brand-gold/50 via-brand-orange/30 to-transparent shadow-lg">
              <div className="bg-brand-card/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3.5">
                <Rocket className="text-brand-gold animate-bounce" size={20} />
                <span className="text-xs sm:text-sm lg:text-base font-extrabold tracking-[0.25em] text-white font-mono uppercase">
                  LET THE INNOVATION BEGINS
                </span>
              </div>
            </div>

            {/* Countdown Timer Grid (Enlarged cards and numbers) */}
            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: 'Days', value: timeLeft.days, border: 'border-brand-orange/30 hover:border-brand-orange/60', shadow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]', numClass: 'text-brand-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.45)]' },
                  { label: 'Hours', value: timeLeft.hours, border: 'border-brand-pink/30 hover:border-brand-pink/60', shadow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]', numClass: 'text-brand-pink drop-shadow-[0_0_10px_rgba(236,72,153,0.45)]' },
                  { label: 'Minutes', value: timeLeft.minutes, border: 'border-brand-blue/30 hover:border-brand-blue/60', shadow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]', numClass: 'text-brand-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.45)]' },
                  { label: 'Seconds', value: timeLeft.seconds, border: 'border-brand-gold/30 hover:border-brand-gold/60', shadow: 'hover:shadow-[0_0_25px_rgba(216,171,85,0.25)]', numClass: 'text-gold-metallic drop-shadow-[0_0_10px_rgba(216,171,85,0.45)]' }
                ].map((time, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center p-4 sm:p-6 lg:p-7 rounded-[1.5rem] bg-brand-card/45 backdrop-blur-md border ${time.border} ${time.shadow} transition-all duration-300 relative overflow-hidden group`}
                  >
                    {/* Top indicator stripe */}
                    <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue opacity-85"></div>
                    <span className={`text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none ${time.numClass}`}>
                      {formatNumber(time.value)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-white/50 mt-2 sm:mt-3 tracking-widest font-sans uppercase">
                      {time.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: register now button */}
            <div className="w-full sm:w-auto pt-3">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-btn-gradient text-sm sm:text-base font-extrabold tracking-widest text-white shadow-xl shadow-brand-pink/15 active:scale-95 hover:shadow-brand-pink/30 hover:translate-y-[-3px] transition-all duration-300 cursor-pointer border-none uppercase btn-premium-animate"
              >
                Register Now
              </button>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Student Collage Graphic (Enlarged & Slanted) ── */}
          <div className="lg:col-span-6 relative w-full flex flex-col justify-center items-center">
            
            {/* Top Right Quote bubble (Enlarged, unboxed layout to match the banner graphic) */}
            <div className="absolute top-[-35px] right-2 sm:right-6 lg:top-[-50px] lg:right-10 z-20 animate-float flex items-start gap-3 select-none">
              {/* Left quotes */}
              <span className="text-brand-gold text-4xl sm:text-5xl font-serif leading-none -mt-2">“</span>
              
              {/* Text lines */}
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-xs lg:text-sm font-black tracking-widest text-white uppercase leading-none">
                  IDEAS TODAY,
                </span>
                <span className="text-[11px] sm:text-xs lg:text-sm font-black tracking-widest text-white uppercase mt-1 relative pb-1.5 leading-none">
                  IMPACT TOMORROW
                  {/* Subtle golden underline to match the banner */}
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-brand-gold to-transparent"></span>
                </span>
              </div>

              {/* Right quotes */}
              <span className="text-brand-gold text-4xl sm:text-5xl font-serif leading-none self-end -mb-2">”</span>
            </div>

            {/* Futuristic Slanted Student Photo Container */}
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-square lg:aspect-[4/3] overflow-hidden lg:overflow-visible group mt-8 lg:mt-0">
              
              {/* Decorative backglow */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] -z-10"></div>

              {/* Slanted Underlay Border/Shadow Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold via-brand-orange to-brand-blue clip-path-hero-slant rounded-3xl p-[2.5px] opacity-90 group-hover:scale-[1.01] transition-transform duration-500 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                {/* Slanted Image Wrapper */}
                <div className="relative w-full h-full bg-brand-darker clip-path-hero-slant rounded-[22px] overflow-hidden">
                  <img 
                    src="/home_page_image.jpg" 
                    alt="Students Collaborating at Hackathon" 
                    className="absolute inset-0 w-full h-full object-cover opacity-95 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-brand-blue/15 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
