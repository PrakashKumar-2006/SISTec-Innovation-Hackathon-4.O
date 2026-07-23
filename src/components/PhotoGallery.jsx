import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ImageIcon, Sparkles, Play, Pause } from 'lucide-react';

// Winner image assets served from public directory (.webp)
const winnerGroup = '/winner_group.webp';
const winner1st = '/winner_2025_1st.webp';
const winner2nd = '/winner_2025_2nd.webp';
const winner3rd = '/winner_2025_3rd.webp';
const winnerTheme1 = '/winner_theme_1.webp';
const winnerTheme2 = '/winner_theme_2.webp';

const galleryImages = [
  {
    id: 1,
    src: winnerGroup,
    title: "Grand Finale Winners",
    subtitle: "SIH 3.0 Celebrating teams, mentors, and coordinators in a moment of triumph.",
    category: "Group Photo"
  },
  {
    id: 2,
    src: winner1st,
    title: "1st Prize Winners — SIH 3.0",
    subtitle: "Awarded for outstanding innovation, technical feasibility, and prototype execution.",
    category: "Podium"
  },
  {
    id: 3,
    src: winner2nd,
    title: "2nd Prize Winners — SIH 3.0",
    subtitle: "Runner-up team recognized for presenting a highly scalable, high-impact solution.",
    category: "Podium"
  },
  {
    id: 4,
    src: winner3rd,
    title: "3rd Prize Winners — SIH 3.0",
    subtitle: "Third place winners recognized for design excellence and coding execution.",
    category: "Podium"
  },
  {
    id: 5,
    src: winnerTheme1,
    title: "Theme Prize Winner — Track 1",
    subtitle: "Special recognition for excellence in solving targeted domain-specific challenges.",
    category: "Theme Winner"
  },
  {
    id: 6,
    src: winnerTheme2,
    title: "Theme Prize Winner — Track 2",
    subtitle: "Special recognition for domain innovation and creative problem solving.",
    category: "Theme Winner"
  }
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [sliderVisible, setSliderVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
    setTimeout(() => setSliderVisible(true), 200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Autoplay Logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500); // 4.5 seconds auto-slide
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  // Keyboard Arrow Key Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section className="relative min-h-screen bg-brand-darker pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-start">

      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-brand-pink/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-gold/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">

        {/* ── Header ── */}
        <div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          style={{
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            <span className="text-[var(--clay)]">SIH 3.0 </span>
            <span className="text-[var(--marigold-deep)]">
              Moments of Glory
            </span>
          </h1>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans font-medium">
            Relive the triumphs of the outstanding teams and individuals from SISTec Innovation Hackathon 3.0.
          </p>
        </div>


        {/* ── 3D Coverflow Slider Container ── */}
        <div
          className="w-full relative flex flex-col items-center"
          style={{
            transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
            opacity: sliderVisible ? 1 : 0,
            transform: sliderVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
          }}
        >
          
          {/* Main 3D Card Stack */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[460px] flex items-center justify-center mt-6 overflow-visible select-none">
            {galleryImages.map((image, idx) => {
              const total = galleryImages.length;
              let diff = idx - currentIndex;
              
              // Handle wrap-around diff
              if (diff < -1) diff += total;
              if (diff > 1) diff -= total;

              let positionClass = '';
              let style = {};

              if (diff === 0) {
                // Active Center Slide
                positionClass = 'z-30 scale-100 opacity-100 translate-x-0 rotate-0 shadow-[0_20px_50px_rgba(216,171,85,0.25)] border-brand-gold/40 cursor-default';
              } else if (diff === -1) {
                // Left Slide (partially behind, rotated)
                positionClass = 'z-20 scale-[0.8] sm:scale-[0.83] opacity-40 -translate-x-[25%] sm:-translate-x-[35%] -rotate-[6deg] hover:opacity-60 cursor-pointer pointer-events-auto border-white/5';
              } else if (diff === 1) {
                // Right Slide (partially behind, rotated)
                positionClass = 'z-20 scale-[0.8] sm:scale-[0.83] opacity-40 translate-x-[25%] sm:translate-x-[35%] rotate-[6deg] hover:opacity-60 cursor-pointer pointer-events-auto border-white/5';
              } else {
                // Completely hidden slide
                positionClass = 'z-10 scale-[0.6] opacity-0 pointer-events-none translate-x-0 rotate-0';
              }

              return (
                <div
                  key={image.id}
                  onClick={() => {
                    if (diff === -1) handlePrev();
                    if (diff === 1) handleNext();
                  }}
                  className={`absolute w-[280px] sm:w-[480px] md:w-[560px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-card border backdrop-blur-md transition-all duration-700 ease-out ${positionClass}`}
                  style={style}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Subtle vignette shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* ── Slide Navigation Controls ── */}
          <div className="flex items-center gap-6 mt-8 sm:mt-10">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              className="w-10 h-10 rounded-full bg-brand-card/80 border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* ── Active Slide Dots Indicator ── */}
          <div className="flex items-center gap-2 mt-4 sm:mt-5">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-brand-gold shadow-[0_0_8px_rgba(216,171,85,0.4)]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* ── Active Slide Details Card ── */}
          <div className="w-full max-w-2xl bg-brand-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 mt-8 sm:mt-10 shadow-2xl text-center">
            <span className="text-[10px] font-black tracking-widest text-white bg-[#8C3A16] px-3.5 py-1 rounded-full border border-[#8C3A16] uppercase font-sans shadow-sm">
              {galleryImages[currentIndex].category}
            </span>
            
            <h2 className="text-white text-lg sm:text-xl font-extrabold mt-3.5 mb-2 flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-brand-gold animate-pulse" />
              {galleryImages[currentIndex].title}
            </h2>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {galleryImages[currentIndex].subtitle}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
