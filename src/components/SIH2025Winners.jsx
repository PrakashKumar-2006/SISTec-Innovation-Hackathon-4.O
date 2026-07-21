import React, { useState, useEffect } from 'react';
import { Trophy, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// Import the winner images directly
import winner1st from '../../2025  1st prize winer.JPG';
import winner2nd from '../../2025 2nd Prize winer.JPG';
import winner3rd from '../../2025 3nd Prize winer.JPG';

const winnersData = [
  {
    position: 1,
    psCode: 'AG-05',
    leader: 'Om Uikey',
    team: 'AgriNova',
    college: 'SISTec-GN, Bhopal',
    theme: 'AgriTech',
    problem: 'Smart crop Advisory system for small and marginal farmers.',
    prize: '₹25,000',
    image: winner1st
  },
  {
    position: 2,
    psCode: 'ET-01',
    leader: 'Shishul Kumar Chandel',
    team: 'Neo Campus',
    college: 'SISTec-R, Ratibad Bhopal',
    theme: 'EduTech',
    problem: 'Establish a centralized platform to enhance alumni engagement, ensuring structured opportunities for mentorship, networking, and institutional growth.',
    prize: '₹20,000',
    image: winner2nd
  },
  {
    position: 3,
    psCode: 'HCI-02',
    leader: 'Monika Kawre',
    team: 'GyaanSetu',
    college: 'SISTec-E, Ratibad Bhopal',
    theme: 'Human-Computer Interaction',
    problem: 'Custom Alexa Skills with Firebase & Web Integration.',
    prize: '₹15,000',
    image: winner3rd
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

export default function SIH2025Winners({ onViewChange, hideHeader = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Autoplay Logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + winnersData.length) % winnersData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % winnersData.length);
  };

  return (
    <section className={`relative ${hideHeader ? 'py-4' : 'min-h-screen bg-brand-darker pt-24 sm:pt-28 pb-20'} px-3 sm:px-6 lg:px-8 text-white select-none`}>
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Trophy className="text-[var(--marigold)] animate-pulse" size={24} />
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--clay)] uppercase font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                  Winners of SIH 2025
                </h2>
              </div>
              <p className="text-[var(--ink-soft)] text-xs sm:text-sm font-medium font-sans">
                SISTec Innovation Hackathon 3.0 (SIH 2025) winners and podium standings.
              </p>
            </div>
            
            <button
              onClick={() => onViewChange && onViewChange('landing')}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--panel)] border border-[var(--marigold)]/30 text-xs font-bold text-[var(--marigold)] hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0"
            >
              <ArrowLeft size={14} /> Back to Home
            </button>
          </div>
        )}


        {/* ── 3D Coverflow Slider for Winner Photos ── */}
        <div className="w-full flex flex-col items-center mb-14 relative">
          
          {/* Main 3D Card Stack */}
          <div className="relative w-full h-[260px] sm:h-[350px] md:h-[400px] flex items-center justify-center overflow-visible mt-2">
            {winnersData.map((winner, idx) => {
              const total = winnersData.length;
              let diff = idx - currentIndex;
              
              // Handle wrap-around diff
              if (diff < -1) diff += total;
              if (diff > 1) diff -= total;

              let positionClass = '';
              const isCenter = diff === 0;

              if (isCenter) {
                // Active Center Photo
                positionClass = 'z-30 scale-100 opacity-100 translate-x-0 rotate-0 shadow-[0_20px_50px_rgba(216,171,85,0.3)] border-brand-gold/40 cursor-default';
              } else if (diff === -1) {
                // Left Photo peeking in
                positionClass = 'z-20 scale-[0.8] opacity-35 -translate-x-[25%] sm:-translate-x-[35%] -rotate-[6deg] hover:opacity-55 cursor-pointer border-white/5';
              } else if (diff === 1) {
                // Right Photo peeking in
                positionClass = 'z-20 scale-[0.8] opacity-35 translate-x-[25%] sm:translate-x-[35%] rotate-[6deg] hover:opacity-55 cursor-pointer border-white/5';
              } else {
                // Hidden
                positionClass = 'z-10 scale-[0.6] opacity-0 pointer-events-none translate-x-0 rotate-0';
              }

              return (
                <div
                  key={winner.position}
                  onClick={() => {
                    if (diff === -1) handlePrev();
                    if (diff === 1) handleNext();
                  }}
                  className={`absolute w-[260px] sm:w-[460px] md:w-[520px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0D0D11] border backdrop-blur-md transition-all duration-700 ease-out ${positionClass}`}
                >
                  <img
                    src={winner.image}
                    alt={winner.team}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* Subtle vignette shadow overlay at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Clean Mini details Overlay (Only on active centered slide) */}
                  <div className={`absolute bottom-0 left-0 right-0 p-3 sm:p-5 flex items-end justify-between transition-opacity duration-500 text-left ${
                    isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider mb-1 ${
                        winner.position === 1 ? 'bg-brand-gold/15 border border-brand-gold/30 text-brand-gold' :
                        winner.position === 2 ? 'bg-slate-400/15 border border-slate-400/30 text-slate-300' :
                        'bg-amber-700/15 border border-amber-700/30 text-[#B45309]'
                      }`}>
                        {winner.position === 1 ? '1st Place' : winner.position === 2 ? '2nd Place' : '3rd Place'}
                      </span>
                      <h3 className="text-white text-xs sm:text-base md:text-lg font-black tracking-wide leading-tight drop-shadow">
                        Team {winner.team}
                      </h3>
                    </div>

                    <div className="text-brand-gold font-mono font-black text-[10px] sm:text-xs md:text-sm bg-brand-gold/10 border border-brand-gold/30 px-2.5 py-1 rounded-lg shrink-0">
                      {winner.prize}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5">
              {winnersData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-brand-gold shadow-[0_0_8px_rgba(216,171,85,0.4)]'
                      : 'w-2 bg-white/20 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-brand-card border border-white/10 hover:border-brand-gold hover:text-brand-gold text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* Podium Finishers Details Title */}
        <div className="text-left mb-6 max-w-xl">
          <h3 className="text-lg sm:text-xl font-extrabold text-[var(--clay)] pl-1 border-l-4 border-[var(--marigold)] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Podium Details
          </h3>
          <p className="text-xs text-[var(--ink-soft)] pl-3 mt-1.5 font-sans">
            Full problem, organization, and institution breakdown of the winning innovations.
          </p>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block rounded-2xl bg-[var(--panel)] border border-[var(--marigold)]/20 overflow-hidden shadow-2xl mb-10 text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-[var(--marigold)]/20 bg-[var(--panel-soft)]">
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-24 text-[var(--marigold)] font-sans">Position</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-24 text-[var(--marigold)] font-sans">PS Code</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-40 text-[var(--marigold)] font-sans">Leader Name</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-40 text-[var(--marigold)] font-sans">Team Name</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-36 text-[var(--marigold)] font-sans">Theme</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-[420px] max-w-md text-[var(--marigold)] font-sans">Problem Statement Title</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-64 text-[var(--marigold)] font-sans">Institute Name</th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider w-32 text-[var(--marigold)] font-sans">Prize Money</th>
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
                      {winner.psCode}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-300 font-bold">
                      {winner.leader}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-white font-extrabold">
                      {winner.team}
                    </td>
                    <td className="px-5 py-4 font-sans text-xs text-slate-400 font-semibold">
                      {winner.theme}
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
                  {winner.psCode}
                </span>
                <h4 className="text-white text-base font-extrabold pt-1">{winner.team}</h4>
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
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Theme</span>
                  <p className="text-slate-300 text-xs font-semibold mt-0.5">{winner.theme}</p>
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
