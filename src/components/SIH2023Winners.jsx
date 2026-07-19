import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight, Trophy, Sparkles, MapPin, Building, Shield } from 'lucide-react';

const winnersData = [
  {
    position: 1,
    psid: 'HT303',
    leader: 'Yogesh Kumar Soni',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'A patient management and video conference APP in which doctor and patient can communicate on live video, the patient unique data should be stored in the database with each prescription.',
    college: 'Sagar Institute of Science Technology and Research',
    prize: '₹25,000',
    color: 'from-amber-400 via-yellow-500 to-amber-600'
  },
  {
    position: 2,
    psid: 'FE501',
    leader: 'Amit patel',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Availability of all posted officers and Police personnels in police stations, status of work assigned with description and Progress.',
    college: 'Sage University Bhopal',
    prize: '₹20,000',
    color: 'from-slate-300 via-slate-400 to-slate-500'
  },
  {
    position: 3,
    psid: 'AG102',
    leader: 'Komal Jethwani',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Lakshmi Narain Collage of Technology',
    prize: '₹15,000',
    color: 'from-amber-600 via-orange-700 to-amber-800'
  }
];

export default function SIH2023Winners({ onViewChange }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      type: 'image',
      url: '/sih4.png',
      title: 'SIH 2023 Grand Finale',
      desc: 'SISTec Innovation Hackathon Celebrating Product Innovation and Problem Solving.'
    },
    {
      type: 'custom',
      title: 'Honor Roll - Top Teams',
      desc: 'Here are the podium finishers who conquered the challenges of SIH 1.0.'
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-brand-darker pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Trophy className="text-brand-gold" size={24} />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-gray to-brand-gold bg-clip-text text-transparent">
                Winners of SIH 2023
              </h2>
            </div>
            <p className="text-brand-gray text-xs sm:text-sm font-normal">
              Celebrating the brilliant minds and innovative prototypes of SIH 1.0 (2023).
            </p>
          </div>
          <button
            onClick={() => onViewChange && onViewChange('landing', '#home')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/50 text-xs font-bold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            &larr; Back to Home
          </button>
        </div>

        {/* Premium Slideshow Carousel */}
        <div className="w-full max-w-5xl mx-auto mb-16 relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-brand-card aspect-[4/3] xs:aspect-[16/9] sm:aspect-[21/9]">
          
          {/* Slide Renderer */}
          <div className="w-full h-full relative">
            {slides.map((slide, sIdx) => {
              const isActive = sIdx === activeSlide;
              return (
                <div
                  key={sIdx}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  {slide.type === 'image' ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={slide.url} 
                        alt={slide.title} 
                        className="w-full h-full object-cover opacity-35"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 text-left space-y-2">
                        <span className="text-[10px] sm:text-xs font-extrabold text-brand-gold tracking-[0.2em] uppercase mb-1 flex items-center gap-1.5">
                          <Sparkles size={12} className="animate-pulse" /> Hackathon Event Highlight
                        </span>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-wide">{slide.title}</h3>
                        <p className="text-[10px] sm:text-sm text-brand-gray/80 max-w-xl leading-relaxed">{slide.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-brand-dark/30 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,178,36,0.06),transparent_60%)] pointer-events-none"></div>
                      
                      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col items-center gap-1">
                          <Trophy className="text-brand-gold animate-bounce" size={40} />
                          <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-wide">{slide.title}</h3>
                          <p className="text-[10px] sm:text-xs text-brand-gray/80">{slide.desc}</p>
                        </div>

                        {/* Top 3 summary cards */}
                        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto pt-4">
                          {/* 2nd Place */}
                          <div className="p-3 sm:p-4 rounded-2xl bg-brand-card/60 border border-white/5 flex flex-col items-center justify-between shadow-lg transform translate-y-3">
                            <span className="text-[10px] font-bold text-slate-300">2ND PLACE</span>
                            <span className="text-xs sm:text-sm font-extrabold text-white block truncate w-full mt-1">Amit Patel</span>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-0.5">₹20,000</span>
                          </div>

                          {/* 1st Place */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-brand-card border border-brand-gold/20 flex flex-col items-center justify-between shadow-2xl relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-[9px] text-brand-dark font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Champion</div>
                            <span className="text-[10px] font-bold text-brand-gold">1ST PLACE</span>
                            <span className="text-xs sm:text-base font-extrabold text-white block truncate w-full mt-1">Yogesh K. Soni</span>
                            <span className="text-xs sm:text-sm font-extrabold text-brand-gold mt-0.5">₹25,000</span>
                          </div>

                          {/* 3rd Place */}
                          <div className="p-3 sm:p-4 rounded-2xl bg-brand-card/60 border border-white/5 flex flex-col items-center justify-between shadow-lg transform translate-y-6">
                            <span className="text-[10px] font-bold text-amber-600">3RD PLACE</span>
                            <span className="text-xs sm:text-sm font-extrabold text-white block truncate w-full mt-1">Komal Jethwani</span>
                            <span className="text-[10px] sm:text-xs font-bold text-amber-600 mt-0.5">₹15,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-dark/60 hover:bg-brand-card border border-white/10 hover:border-brand-gold/30 text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-dark/60 hover:bg-brand-card border border-white/10 hover:border-brand-gold/30 text-white transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setActiveSlide(sIdx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  sIdx === activeSlide ? 'bg-brand-gold w-6' : 'bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Podium Finishers Title */}
        <div className="text-left mb-8 max-w-xl">
          <h3 className="text-lg sm:text-xl font-extrabold text-white pl-1 border-l-4 border-brand-gold">
            Podium Details
          </h3>
          <p className="text-xs text-brand-gray pl-3 mt-1.5">
            Full problem, organization, and institution breakdown of the winning innovations.
          </p>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block rounded-[2rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow mb-10 text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-24">
                    <span className="text-gold-metallic">Position</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-24">
                    <span className="text-gold-metallic">PSID</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-48">
                    <span className="text-gold-metallic">Team Leader Name</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44">
                    <span className="text-gold-metallic">Organization</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-36">
                    <span className="text-gold-metallic">PS Category</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-[420px] max-w-md">
                    <span className="text-gold-metallic">Problem Statement</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-64">
                    <span className="text-gold-metallic">College Name</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {winnersData.map((item, idx) => (
                  <tr 
                    key={idx}
                    className="group border-b border-white/5 bg-brand-card/5 hover:bg-brand-card/25 hover:shadow-[inset_4px_0_0_0_#FFB224] transition-all duration-300"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-extrabold bg-gradient-to-r ${item.color} text-brand-dark`}>
                          {item.position}
                        </span>
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{item.prize}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-lg">
                        {item.psid}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-white leading-snug block">{item.leader}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-brand-gray/80">{item.org}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-block px-2 py-0.5 rounded-lg border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-wider text-brand-gray/80">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 w-[420px] max-w-md">
                      <span className="text-xs text-brand-gray/95 block leading-relaxed whitespace-normal break-words text-justify">
                        {item.problem}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold text-brand-gray/80 leading-normal block">{item.college}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards Stack View (md:hidden) */}
        <div className="md:hidden flex flex-col gap-4 w-full text-left">
          {winnersData.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-brand-card/45 backdrop-blur-md border border-white/10 bg-gradient-to-b from-brand-gold/5 to-transparent flex flex-col justify-between relative overflow-hidden shadow-card-shadow text-left"
            >
              {/* Decorative glowing top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-brand-blue"></div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-extrabold bg-gradient-to-r ${item.color} text-brand-dark`}>
                    {item.position}
                  </span>
                  <span className="text-[10px] font-bold text-brand-gold tracking-wider">{item.prize}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-lg">
                  {item.psid}
                </span>
              </div>
              
              <h4 className="text-xs font-bold text-white leading-snug mb-1">
                {item.leader}
              </h4>
              <p className="text-[10px] text-brand-gray/60 mb-3 font-semibold">
                {item.college}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-brand-gray mb-3">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[9px] uppercase font-bold text-white/40">Sponsor</span>
                  <span className="font-medium text-white/80 text-right truncate max-w-[70%]">{item.org}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-white/40">Category</span>
                  <span className="font-bold text-brand-gold">{item.category}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px]">
                <span className="text-[9px] uppercase font-bold text-white/40 block">Problem Statement</span>
                <p className="text-xs text-brand-gray leading-relaxed font-normal bg-brand-dark/45 p-3 rounded-xl border border-white/5 break-words text-justify">
                  {item.problem}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
