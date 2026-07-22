import React, { useState } from 'react';

export default function SIH2024View({ onViewChange }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-brand-darker z-40 overflow-hidden select-none">
      
      {/* Compact Cybernetic Control Panel */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3 p-1.5 rounded-full bg-brand-card/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-brand-gold/30">
        <button
          onClick={() => onViewChange && onViewChange('landing', '#home')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-btn-gradient text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-none"
        >
          &larr; Back to Home
        </button>
        <div className="flex items-center gap-2 pr-4 pl-1 text-[11px] font-mono font-bold tracking-wider text-brand-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>SIH 2024 ARCHIVE</span>
        </div>
      </div>

      {/* Full screen Iframe with smooth fade-in transition */}
      <div className="w-full h-full relative">
        {loading && (
          <div className="absolute inset-0 bg-brand-darker flex flex-col items-center justify-center gap-6 z-30">
            {/* Cyberpunk Grid/Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,178,36,0.06),transparent_70%)] pointer-events-none"></div>
            
            {/* Spinning Neon Rings */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-t-brand-gold border-r-transparent border-b-brand-blue border-l-transparent animate-spin"></div>
              <div className="absolute w-16 h-16 rounded-full border-2 border-t-brand-blue border-r-transparent border-b-brand-gold border-l-transparent animate-[spin_1.8s_linear_infinite_reverse]"></div>
              <span className="text-[11px] font-mono text-brand-gold uppercase tracking-widest font-extrabold animate-pulse">SIH</span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center relative z-10">
              <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase font-mono">
                Establishing Secure Link
              </h3>
              <p className="text-[10px] font-mono text-brand-gray/50 animate-pulse tracking-wide">
                CONNECTING TO ARCHIVE DATABASE...
              </p>
            </div>
          </div>
        )}
        <iframe 
          src="https://www.sistecrsih.in/sih%202024" 
          className={`w-full h-full border-none transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
          title="SIH 2024 Archive"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
