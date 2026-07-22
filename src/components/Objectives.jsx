import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, ZoomIn, X, Trophy } from 'lucide-react';
import winnerGroup from '../../winer group image.JPG';
import winner1st from '../../2025  1st prize winer.JPG';
import winner2nd from '../../2025 2nd Prize winer.JPG';
import winner3rd from '../../2025 3nd Prize winer.JPG';
import winnerTheme1 from '../../Themes Prize winer 1.JPG';
import winnerTheme2 from '../../Themes Prize winer 2.JPG';

export default function Objectives({ isStandalone = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: winnerGroup,
      title: "Grand Finale Winners",
      badge: "SIH 3.0 Champions Group",
      subtitle: "Celebrating teams, mentors, and coordinators in a moment of triumph."
    },
    {
      id: 2,
      src: winner1st,
      title: "1st Prize Winners — SIH 3.0",
      badge: "1st Prize Winner",
      subtitle: "Awarded for outstanding innovation, technical feasibility, and prototype execution."
    },
    {
      id: 3,
      src: winner2nd,
      title: "2nd Prize Winners — SIH 3.0",
      badge: "2nd Prize Winner",
      subtitle: "Runner-up team recognized for presenting a highly scalable, high-impact solution."
    },
    {
      id: 4,
      src: winner3rd,
      title: "3rd Prize Winners — SIH 3.0",
      badge: "3rd Prize Winner",
      subtitle: "Third place winners recognized for design excellence and coding execution."
    },
    {
      id: 5,
      src: winnerTheme1,
      title: "Theme Prize Winner — Track 1",
      badge: "Theme Winner",
      subtitle: "Special recognition for excellence in solving targeted domain-specific challenges."
    },
    {
      id: 6,
      src: winnerTheme2,
      title: "Theme Prize Winner — Track 2",
      badge: "Theme Winner",
      subtitle: "Special recognition for domain innovation and creative problem solving."
    }
  ];

  // Autoplay slider logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section id="objectives" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-dark overflow-hidden`}>
      {/* Decorative blur backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Description & Quote */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="mb-6">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                Objective of <span className="text-[var(--marigold-deep)]">SIH 4.0</span>
              </h2>
            </div>
            
            <p className="text-brand-gray leading-relaxed text-base">
              Hackathons bring students with technical backgrounds together for creative problem-solving and prototype development. It serves as a launchpad to sharpen coding abilities, share industrial insight, and exchange knowledge.
            </p>

            {/* Quote Card */}
            <div className="relative p-6 rounded-2xl bg-brand-card/45 border border-white/5 shadow-xl overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-brand-orange via-brand-pink to-brand-blue"></div>
              
              <div className="relative z-10 space-y-4">
                <Quote className="w-10 h-10 text-brand-gold/15 transform rotate-180 -translate-x-2" />
                <p className="text-base text-brand-navy font-bold tracking-wide italic leading-relaxed">
                  "Our core perspective is to design robust engineering solutions for existing societal challenges, building an ecosystem of innovation."
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-[10px] font-black text-brand-gold font-mono">
                    S
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">SISTec Innovation Cell</h5>
                    <p className="text-[10px] text-brand-gray">Sagar Group of Institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Side-by-Side Stacked Card Slider */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center pt-4 lg:pt-0 relative">
            
            {/* 3D Stack Container */}
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] flex items-center justify-center overflow-visible select-none">
              {galleryImages.map((image, idx) => {
                const total = galleryImages.length;
                let diff = idx - currentIndex;
                
                // Wrap-around difference
                if (diff < -total / 2) diff += total;
                if (diff > total / 2) diff -= total;

                let positionClass = '';

                if (diff === 0) {
                  // Active Center Card
                  positionClass = 'z-30 scale-100 opacity-100 translate-x-0 rotate-0 shadow-2xl border-[#8C3A16]/50 cursor-pointer';
                } else if (diff === -1 || (diff < 0 && diff >= -1)) {
                  // Left Side Card (angled)
                  positionClass = 'z-20 scale-[0.82] opacity-50 -translate-x-[28%] sm:-translate-x-[36%] -rotate-[6deg] hover:opacity-80 cursor-pointer border-[#E3D7C5]';
                } else if (diff === 1 || (diff > 0 && diff <= 1)) {
                  // Right Side Card (angled)
                  positionClass = 'z-20 scale-[0.82] opacity-50 translate-x-[28%] sm:translate-x-[36%] rotate-[6deg] hover:opacity-80 cursor-pointer border-[#E3D7C5]';
                } else {
                  // Hidden Cards behind
                  positionClass = 'z-10 scale-[0.6] opacity-0 pointer-events-none translate-x-0 rotate-0';
                }

                return (
                  <div
                    key={image.id}
                    onClick={() => {
                      if (diff === -1) handlePrev();
                      else if (diff === 1) handleNext();
                      else setSelectedPhoto(image);
                    }}
                    className={`absolute w-[260px] sm:w-[380px] md:w-[460px] aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF6EE] border-2 backdrop-blur-md transition-all duration-700 ease-out p-2 ${positionClass}`}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-900">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#8C3A16] !text-white shadow-sm">
                          {image.badge}
                        </span>
                      </div>

                      {/* Zoom Icon */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center">
                        <ZoomIn size={14} />
                      </div>

                      {/* Title at Bottom */}
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4 mt-6 z-40">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E3D7C5] hover:border-[#8C3A16] text-[#8C3A16] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots Indicators */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E3D7C5] shadow-inner">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-[#8C3A16]'
                        : 'w-2.5 bg-[#8C3A16]/30 hover:bg-[#8C3A16]/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E3D7C5] hover:border-[#8C3A16] text-[#8C3A16] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal for Photo Zoom */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-[#FFFDF7]/92 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full bg-[#FFFDF7] rounded-3xl p-3 sm:p-4 border-2 border-[#8C3A16] shadow-2xl overflow-hidden text-left" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 border-b border-[#E3D7C5]">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#8C3A16]" />
                <h4 className="text-sm font-black text-[#5C230C] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>{selectedPhoto.title}</h4>
              </div>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-[#8C3A16]/10 text-[#8C3A16] hover:bg-[#8C3A16] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-2 max-h-[75vh] overflow-hidden flex justify-center items-center bg-[#FAF6EE] rounded-2xl border border-[#E3D7C5]">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
