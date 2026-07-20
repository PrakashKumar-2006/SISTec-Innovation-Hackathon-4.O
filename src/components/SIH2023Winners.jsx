import React, { useState, useEffect } from 'react';
import { Award, Trophy, Sparkles, ArrowLeft, ChevronLeft, ChevronRight, Medal } from 'lucide-react';

const winnersData = [
  {
    position: 1,
    psid: 'HT303',
    leader: 'Yogesh Kumar Soni',
    org: 'DRMZ Tech',
    category: 'Software',
    problem: 'A patient management and video conference APP in which doctor and patient can communicate on live video, the patient unique data should be stored in the database with each prescription.',
    college: 'Sagar Institute of Science Technology and Research',
    prize: '₹25,000'
  },
  {
    position: 2,
    psid: 'FE501',
    leader: 'Amit patel',
    org: 'MP Police Crime Branch',
    category: 'Software',
    problem: 'Availability of all posted officers and Police personnels in police stations, status of work assigned with description and Progress.',
    college: 'Sage University Bhopal',
    prize: '₹20,000'
  },
  {
    position: 3,
    psid: 'AG102',
    leader: 'Komal Jethwani',
    org: 'ITSC LTD',
    category: 'Software/Hardware',
    problem: 'Crop Identification using Machine Learning Model, which will help farmers for better judgement of healthy crop.',
    college: 'Lakshmi Narain Collage of Technology',
    prize: '₹15,000'
  }
];

// Helper component for expandable problem statements in the table
function ProblemCell({ text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 120;
  
  return (
    <div className="max-w-md text-xs leading-relaxed text-slate-300">
      <span>
        {expanded || !isLong ? text : `${text.slice(0, 110)}...`}
      </span>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-brand-gold hover:text-yellow-400 font-black ml-1.5 focus:outline-none cursor-pointer underline text-[10px] uppercase tracking-widest whitespace-nowrap bg-transparent border-none"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}

export default function SIH2023Winners({ onViewChange }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' or 'prev'

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

  // Auto slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const handlePrev = () => {
    setSlideDirection('prev');
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setSlideDirection('next');
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-brand-darker pt-24 sm:pt-28 pb-20 px-3 sm:px-6 lg:px-8 text-white select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Trophy className="text-brand-gold animate-pulse" size={24} />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-gray to-brand-gold bg-clip-text text-transparent">
                Winners of SIH 2023
              </h2>
            </div>
            <p className="text-brand-gray text-xs sm:text-sm font-normal">
              Celebrating the brilliant minds and innovative prototypes of SIH 1.0 (2023).
            </p>
          </div>
          
          <button
            onClick={() => onViewChange && onViewChange('landing')}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold/50 text-xs font-bold text-brand-gold hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* ── Slide-Transition Carousel (Adjusted Padding & Layout) ── */}
        <div className="w-full max-w-5xl mx-auto mb-12 relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-card h-[340px] sm:h-[400px] md:h-[440px]">
          
          <div className="w-full h-full relative overflow-hidden">
            {slides.map((slide, sIdx) => {
              const isActive = sIdx === activeSlide;

              return (
                <div
                  key={sIdx}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out"
                  style={{
                    transform: isActive 
                      ? 'translateX(0%)' 
                      : sIdx === (activeSlide - 1 + slides.length) % slides.length
                      ? 'translateX(-100%)'
                      : 'translateX(100%)'
                  }}
                >
                  {slide.type === 'image' ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={slide.url} 
                        alt={slide.title} 
                        className="w-full h-full object-cover opacity-85" 
                      />
                      {/* Dark overlay at bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>
                      
                      <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-left space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[9px] font-black uppercase tracking-widest">
                          <Sparkles size={10} className="animate-pulse" /> Event Highlight
                        </span>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-wide">{slide.title}</h3>
                        <p className="text-[11px] sm:text-sm text-slate-300 max-w-2xl leading-relaxed">{slide.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#0D0D11]/90 flex flex-col justify-center items-center px-4 py-6 sm:p-8 text-center relative overflow-hidden">
                      {/* Sunburst background effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(216,171,85,0.05),transparent_60%)] pointer-events-none"></div>
                      
                      <div className="relative z-10 w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
                        <div className="flex flex-col items-center gap-1.5">
                          <Trophy className="text-brand-gold animate-bounce" size={36} />
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">{slide.title}</h3>
                          <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">{slide.desc}</p>
                        </div>
 
                        {/* Interactive 3D Podium Block Visualizer inside Carousel */}
                        <div className="grid grid-cols-3 gap-3.5 sm:gap-6 items-end w-full max-w-lg mx-auto pt-2 select-none">
                          
                          {/* 2nd Place */}
                          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <span className="text-[9px] font-black text-slate-400 tracking-wider">2ND PLACE</span>
                            <h4 className="text-white text-[11px] sm:text-xs font-black truncate w-full">Amit patel</h4>
                            <span className="text-[10px] font-extrabold text-slate-400">₹20,000</span>
                            <div className="w-full h-14 sm:h-20 bg-gradient-to-t from-slate-400/20 to-slate-400/5 border-t border-[#94A3B8]/30 rounded-t-xl flex items-center justify-center shadow-inner">
                              <span className="text-slate-400 font-black text-lg">2</span>
                            </div>
                          </div>

                          {/* 1st Place */}
                          <div className="flex flex-col items-center gap-1.5 sm:gap-2 relative">
                            <span className="text-[9px] font-black text-brand-gold tracking-wider">1ST PLACE</span>
                            <h4 className="text-white text-[11px] sm:text-xs font-black truncate w-full">Yogesh Soni</h4>
                            <span className="text-[10px] font-extrabold text-brand-gold">₹25,000</span>
                            <div className="w-full h-20 sm:h-28 bg-gradient-to-t from-brand-gold/20 to-brand-gold/5 border-t border-brand-gold/40 rounded-t-xl flex items-center justify-center shadow-inner">
                              <span className="text-brand-gold font-black text-2xl">1</span>
                            </div>
                          </div>

                          {/* 3rd Place */}
                          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <span className="text-[9px] font-black text-[#B45309] tracking-wider">3RD PLACE</span>
                            <h4 className="text-white text-[11px] sm:text-xs font-black truncate w-full">Komal J.</h4>
                            <span className="text-[10px] font-extrabold text-[#B45309]">₹15,000</span>
                            <div className="w-full h-10 sm:h-14 bg-gradient-to-t from-amber-700/20 to-amber-700/5 border-t border-[#B45309]/30 rounded-t-xl flex items-center justify-center shadow-inner">
                              <span className="text-[#B45309] font-black text-lg">3</span>
                            </div>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setActiveSlide(sIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  sIdx === activeSlide ? 'bg-brand-gold w-6 shadow-[0_0_6px_rgba(216,171,85,0.4)]' : 'bg-white/30 hover:bg-white/60 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Honor Roll Details Title */}
        <div className="text-left mb-6 max-w-xl">
          <h3 className="text-lg sm:text-xl font-extrabold text-white pl-1 border-l-4 border-brand-gold">
            Podium Details
          </h3>
          <p className="text-xs text-brand-gray pl-3 mt-1.5">
            Full problem, organization, and institution breakdown of the winning innovations.
          </p>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block rounded-2xl bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl mb-10 text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-24 text-slate-400">Position</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-24 text-slate-400">PS ID</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-40 text-slate-400">Leader Name</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-40 text-slate-400">Organization</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-36 text-slate-400">Category</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-[420px] max-w-md text-slate-400">Problem Statement Title</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-64 text-slate-400">Institute Name</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-32 text-slate-400">Prize Money</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {winnersData.map((winner, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase ${
                        winner.position === 1 ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold' :
                        winner.position === 2 ? 'border-slate-400/40 bg-slate-400/10 text-slate-300' :
                        'border-amber-700/40 bg-amber-700/10 text-[#B45309]'
                      }`}>
                        {winner.position === 1 ? '1st Place' : winner.position === 2 ? '2nd Place' : '3rd Place'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-brand-gray font-bold">
                      {winner.psid}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-300 font-bold">
                      {winner.leader}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-white font-extrabold">
                      {winner.org}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-400 font-semibold">
                      {winner.category}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-300 max-w-md whitespace-normal leading-relaxed">
                      <ProblemCell text={winner.problem} />
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-300 max-w-xs truncate font-semibold" title={winner.college}>
                      {winner.college}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-brand-gold font-black">
                      {winner.prize}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View List */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {winnersData.map((winner, index) => (
            <div key={index} className="rounded-2xl bg-brand-card/45 border border-white/10 p-5 space-y-4 text-left relative">
              
              <div className="flex justify-between items-center">
                <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${
                  winner.position === 1 ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold' :
                  winner.position === 2 ? 'border-slate-400/40 bg-slate-400/10 text-slate-300' :
                  'border-amber-700/40 bg-amber-700/10 text-[#B45309]'
                }`}>
                  {winner.position === 1 ? '1st Place' : winner.position === 2 ? '2nd Place' : '3rd Place'}
                </span>
                
                <span className="font-mono text-xs text-brand-gold font-black">{winner.prize}</span>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-slate-500 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase">
                  {winner.psid}
                </span>
                <h4 className="text-white text-base font-extrabold pt-1">{winner.org}</h4>
                <p className="text-slate-400 text-xs font-bold">
                  Leader: <span className="text-slate-300">{winner.leader}</span>
                </p>
              </div>

              <div className="border-t border-white/5 pt-3.5 space-y-2.5">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Institution</span>
                  <p className="text-slate-300 text-xs font-semibold leading-relaxed mt-0.5">{winner.college}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Category</span>
                  <p className="text-slate-300 text-xs font-semibold mt-0.5">{winner.category}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Problem Statement</span>
                  <p className="text-slate-400 text-xs leading-relaxed mt-1">{winner.problem}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
