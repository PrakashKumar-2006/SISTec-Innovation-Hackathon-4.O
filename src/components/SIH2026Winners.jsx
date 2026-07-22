import React from 'react';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';

export default function SIH2026Winners({ onViewChange }) {
  return (
    <section className="relative min-h-screen bg-brand-darker pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Embedded CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-trophy {
          0% { stroke-dashoffset: 800; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulse-stars {
          0%, 100% { transform: scale(0.8) translateY(0); opacity: 0.4; }
          50% { transform: scale(1.2) translateY(-4px); opacity: 1; }
        }
        @keyframes rotate-sunburst {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .svg-trophy-path {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: draw-trophy 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards infinite;
        }
        .svg-star-1 {
          animation: pulse-stars 2s ease-in-out infinite;
          transform-origin: 100px 70px;
        }
        .svg-star-2 {
          animation: pulse-stars 2.5s ease-in-out infinite 0.5s;
          transform-origin: 150px 110px;
        }
        .svg-star-3 {
          animation: pulse-stars 2.2s ease-in-out infinite 0.8s;
          transform-origin: 60px 100px;
        }
        .svg-sunburst {
          transform-origin: 105px 105px;
          animation: rotate-sunburst 25s linear infinite;
        }
      `}} />

      <div className="w-full max-w-lg mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* ── Animated SVG coming soon graphic ── */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative mb-6">
          <svg
            viewBox="0 0 210 210"
            className="w-full h-full drop-shadow-[0_0_35px_rgba(216,171,85,0.25)]"
          >
            {/* Rotating Sunburst Rays */}
            <g className="svg-sunburst">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="105"
                  y1="105"
                  x2="105"
                  y2="5"
                  stroke="#D8AB55"
                  strokeWidth="1"
                  strokeOpacity="0.08"
                  transform={`rotate(${i * 30} 105 105)`}
                />
              ))}
            </g>

            {/* Orbiting glowing rings */}
            <circle
              cx="105"
              cy="105"
              r="70"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeDasharray="6 12 18 12"
              className="opacity-45"
              style={{
                transformOrigin: '105px 105px',
                animation: 'rotate-sunburst 12s linear infinite reverse'
              }}
            />
            
            <circle
              cx="105"
              cy="105"
              r="85"
              fill="none"
              stroke="url(#blueGradient)"
              strokeWidth="1"
              strokeDasharray="20 30"
              className="opacity-30"
              style={{
                transformOrigin: '105px 105px',
                animation: 'rotate-sunburst 18s linear infinite'
              }}
            />

            {/* Orbiting Sparkles */}
            <path
              d="M100 50 L102 55 L107 57 L102 59 L100 64 L98 59 L93 57 L98 55 Z"
              fill="#D8AB55"
              className="svg-star-1"
            />
            <path
              d="M150 90 L151.5 93.5 L155 95 L151.5 96.5 L150 100 L148.5 96.5 L145 95 L148.5 93.5 Z"
              fill="#D8AB55"
              className="svg-star-2 opacity-80"
            />
            <path
              d="M60 85 L61 87.5 L63.5 88.5 L61 89.5 L60 92 L59 89.5 L56.5 88.5 L59 87.5 Z"
              fill="#D8AB55"
              className="svg-star-3 opacity-60"
            />

            {/* The Trophy Outline path */}
            <path
              d="M 75 75 
                 L 135 75 
                 L 135 105 
                 A 30 30 0 0 1 75 105 
                 Z 
                 M 105 135 
                 L 105 155 
                 M 85 155 
                 L 125 155 
                 M 75 85 
                 A 15 15 0 0 0 60 100 
                 A 15 15 0 0 0 75 115 
                 M 135 85 
                 A 15 15 0 0 1 150 100 
                 A 15 15 0 0 1 135 115"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-trophy-path"
            />

            {/* Gradients definitions */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#D8AB55" />
                <stop offset="100%" stopColor="#A27B2B" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Text Layout ── */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--marigold)]/15 border border-[var(--marigold)]/30 text-[var(--clay)] text-[10px] font-black uppercase tracking-widest animate-pulse font-sans">
            <Sparkles size={11} className="text-[var(--vermilion)]" />
            Evaluations Underway
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[var(--clay)] uppercase font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Coming Soon
          </h2>
          
          <h3 className="text-sm sm:text-base font-black text-[var(--marigold-deep)] uppercase tracking-[0.2em] font-sans">
            SIH 2026 Grand Finale Results
          </h3>
          
          <p className="text-[var(--ink-soft)] text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium font-sans">
            The evaluations for the final prototypes are currently in progress. The official team standings and special theme prizes will be published here soon!
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
          <button
            onClick={() => onViewChange('landing')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--panel)] hover:bg-[var(--panel-soft)] text-[var(--paper)] border border-[var(--marigold)]/30 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
          >
            <ArrowLeft size={14} />
            Back to Home
          </button>
          
          <button
            onClick={() => onViewChange('landing', '#timeline')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F2A93B] hover:bg-[#C97F1B] hover:scale-[1.02] active:scale-95 text-[var(--panel)] text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Calendar size={14} />
            Check Timeline
          </button>
        </div>


      </div>
    </section>
  );
}
