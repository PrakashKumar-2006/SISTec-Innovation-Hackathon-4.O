import React from 'react';
import { ArrowLeft, Users, Sparkles, Code2 } from 'lucide-react';

export default function SIH2026Finalists({ onViewChange, onRegisterClick }) {
  return (
    <section className="relative min-h-screen bg-brand-darker pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Embedded CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-nodes {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.4)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 22px rgba(6, 182, 212, 0.8)); }
        }
        @keyframes pulse-node-gold {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(216, 171, 85, 0.4)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 22px rgba(216, 171, 85, 0.8)); }
        }
        @keyframes dash-link {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .svg-orbit-container {
          transform-origin: 100px 100px;
          animation: orbit-nodes 30s linear infinite;
        }
        .svg-node-1 {
          animation: pulse-node 3s ease-in-out infinite;
        }
        .svg-node-2 {
          animation: pulse-node-gold 3.5s ease-in-out infinite 0.7s;
        }
        .svg-node-3 {
          animation: pulse-node 4s ease-in-out infinite 1.4s;
        }
        .svg-link {
          stroke-dasharray: 8 6;
          animation: dash-link 4s linear infinite;
        }
      `}} />

      <div className="w-full max-w-xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* ── Animated SVG Teamwork / Connection Graphic ── */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative mb-6">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            {/* Outer dotted decorative boundary */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#D8AB55"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="opacity-30"
            />
            
            {/* Central glowing core (SIH Logo background glow) */}
            <circle
              cx="100"
              cy="100"
              r="22"
              fill="#06B6D4"
              className="opacity-5"
            />

            <g className="svg-orbit-container">
              {/* Connection links forming a triangle */}
              <line
                x1="100"
                y1="50"
                x2="150"
                y2="135"
                stroke="url(#blueGradient)"
                strokeWidth="2"
                className="svg-link"
              />
              <line
                x1="150"
                y1="135"
                x2="50"
                y2="135"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                className="svg-link"
              />
              <line
                x1="50"
                y1="135"
                x2="100"
                y2="50"
                stroke="url(#blueGradient)"
                strokeWidth="2"
                className="svg-link"
              />

              {/* Node 1: Top (Cyan theme - Developer / Coder) */}
              <g className="svg-node-1" transform="translate(100, 50)">
                <circle cx="0" cy="0" r="14" fill="#0D0D11" stroke="#06B6D4" strokeWidth="2.5" />
                <path d="M-6 -4 L-2 0 L-6 4 M6 -4 L2 0 L6 4 M-2 -2 L2 2" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Node 2: Bottom-Right (Gold theme - Leader / Innovator) */}
              <g className="svg-node-2" transform="translate(150, 135)">
                <circle cx="0" cy="0" r="14" fill="#0D0D11" stroke="#D8AB55" strokeWidth="2.5" />
                <path d="M-5 -4 A5 5 0 0 1 5 -4 L5 1 A5 5 0 0 1 -5 1 Z M-5 1 L5 1 M-3 4 L3 4" fill="none" stroke="#D8AB55" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Node 3: Bottom-Left (Cyan theme - Tech Stack) */}
              <g className="svg-node-3" transform="translate(50, 135)">
                <circle cx="0" cy="0" r="14" fill="#0D0D11" stroke="#06B6D4" strokeWidth="2.5" />
                <rect x="-5" y="-5" width="10" height="10" rx="1.5" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#06B6D4" strokeWidth="1" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#06B6D4" strokeWidth="1" />
              </g>
            </g>

            {/* Central icon - Users */}
            <g transform="translate(88, 88)" className="opacity-90">
              <rect x="0" y="0" width="24" height="24" fill="none" />
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="#D8AB55" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" fill="none" stroke="#D8AB55" strokeWidth="1.8" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="#D8AB55" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="#D8AB55" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Definitions */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8AB55" />
                <stop offset="100%" stopColor="#A27B2B" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0891B2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Text Content ── */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-black uppercase tracking-widest animate-pulse">
            <Sparkles size={11} />
            Selection Underway
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white uppercase">
            Grand Finale
          </h2>
          
          <h3 className="text-sm sm:text-base font-extrabold text-brand-gold uppercase tracking-[0.2em] font-sans">
            SIH 4.O Finalist Teams
          </h3>
          
          <p className="text-brand-gray text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium">
            Registrations are currently active! Once evaluations are complete, the official list of shortlisted teams qualified for the Grand Finale of SIH 4.O will be published here.
          </p>
        </div>

        {/* ── Stats Highlights ── */}
        <div className="grid grid-cols-3 gap-3 w-full bg-brand-card/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 mt-8">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-black text-brand-gold">100+</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Teams expected</div>
          </div>
          <div className="border-x border-white/5 text-center">
            <div className="text-lg sm:text-xl font-black text-[#06B6D4]">50+</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">colleges</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-black text-white">1000+</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">submissions</div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
          <button
            onClick={() => onViewChange('landing')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-gold/40 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
          >
            <ArrowLeft size={14} />
            Back to Home
          </button>
          
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-btn-gradient hover:scale-[1.02] active:scale-95 text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-orange-950/15"
          >
            <Code2 size={14} />
            Register Team
          </button>
        </div>

      </div>
    </section>
  );
}
