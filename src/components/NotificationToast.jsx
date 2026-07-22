import React, { useState, useEffect } from 'react';
import { Minus, Sparkles, Lightbulb, Bell, Megaphone, ArrowRight } from 'lucide-react';

export default function NotificationToast({ onRegisterClick, onViewChange, isRegisterOpen }) {
  const [showReg, setShowReg] = useState(false);
  const [showPs, setShowPs] = useState(false);
  
  // Track minimized state for each card independently
  const [regMinimized, setRegMinimized] = useState(false);
  const [psMinimized, setPsMinimized] = useState(false);

  useEffect(() => {
    // Staggered slide-in entry
    const regTimer = setTimeout(() => setShowReg(true), 1200); // 1.2s delay for first popup
    const psTimer = setTimeout(() => setShowPs(true), 2400);   // 2.4s delay for second popup

    return () => {
      clearTimeout(regTimer);
      clearTimeout(psTimer);
    };
  }, []);

  // Compute how many are currently minimized
  const minimizedCount = (regMinimized && showReg ? 1 : 0) + (psMinimized && showPs ? 1 : 0);

  if (!showReg && !showPs) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4 max-w-sm w-[90%] pointer-events-none ${isRegisterOpen ? 'hidden' : ''}`}>
      
      {/* ── Card 1: Registrations Open (Light Cream & Orange Theme) ── */}
      {showReg && !regMinimized && (
        <div className="w-full animate-float-1 pointer-events-auto">
          <div className="bg-[var(--paper)]/95 backdrop-blur-xl border border-[var(--line-strong)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(43,26,19,0.06)] flex items-center gap-3.5 relative group animate-slide-in hover:border-[var(--vermilion)]/50 transition-all duration-300">
            {/* Subtle orange underglow glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--vermilion)]/5 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Orange circular icon badge */}
            <div className="w-10 h-10 rounded-xl bg-[var(--vermilion)] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 toast-icon">
              <Megaphone size={18} className="animate-pulse" />
            </div>

            {/* Content & Inline Button */}
            <div className="flex-1 text-left pr-4">
              <p className="text-[11px] sm:text-xs text-brand-navy font-bold leading-relaxed font-sans inline">
                SIH 4.O Registrations have been officially opened.&nbsp;
              </p>
              <button
                onClick={onRegisterClick}
                className="bg-[var(--paper)] hover:bg-[#FAF6F0] text-brand-navy border border-[var(--line-strong)] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer border-none"
              >
                Register
              </button>
            </div>

            {/* Minimize button */}
            <button
              onClick={() => setRegMinimized(true)}
              title="Minimize Alert"
              className="absolute top-2 right-2 text-brand-gray hover:text-[var(--vermilion)] transition-colors cursor-pointer border-none bg-transparent"
            >
              <Minus size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Card 2: Problem Statements Live (Light Cream & Orange Theme) ── */}
      {showPs && !psMinimized && (
        <div className="w-full animate-float-2 pointer-events-auto">
          <div className="bg-[var(--paper)]/95 backdrop-blur-xl border border-[var(--line-strong)] rounded-2xl p-4 shadow-[0_12px_28px_rgba(43,26,19,0.06)] flex items-center gap-3.5 relative group animate-slide-in hover:border-[var(--vermilion)]/50 transition-all duration-300">
            {/* Subtle orange underglow glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--vermilion)]/5 via-transparent to-transparent pointer-events-none"></div>

            {/* Orange circular icon badge */}
            <div className="w-10 h-10 rounded-xl bg-[var(--vermilion)] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 toast-icon">
              <Bell size={18} className="animate-pulse" />
            </div>

            {/* Content & Inline Button */}
            <div className="flex-1 text-left pr-4">
              <p className="text-[11px] sm:text-xs text-brand-navy font-bold leading-relaxed font-sans inline">
                SIH 4.O Problem Statements have been officially released.&nbsp;
              </p>
              <button
                onClick={() => onViewChange('problem-statements')}
                className="bg-[var(--paper)] hover:bg-[#FAF6F0] text-brand-navy border border-[var(--line-strong)] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer border-none"
              >
                Check it
              </button>
            </div>

            {/* Minimize button */}
            <button
              onClick={() => setPsMinimized(true)}
              title="Minimize Alert"
              className="absolute top-2 right-2 text-brand-gray hover:text-[var(--vermilion)] transition-colors cursor-pointer border-none bg-transparent"
            >
              <Minus size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── MINIMIZED BUBBLE (Pure Gold Theme - "purana color") ── */}
      {minimizedCount > 0 && (
        <div className="pointer-events-auto animate-float-bubble mt-1">
          <button
            onClick={() => {
              setRegMinimized(false);
              setPsMinimized(false);
            }}
            title="Expand Alerts"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-card/95 backdrop-blur-xl border border-brand-gold/45 flex items-center justify-center shadow-[0_10px_25px_rgba(216,171,85,0.25)] hover:shadow-[0_15px_35px_rgba(216,171,85,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
          >
            {/* Pulse Rings */}
            <span className="absolute inset-0 rounded-full border border-brand-gold/40 animate-ping opacity-60"></span>
            
            <div className="w-11 h-11 rounded-full bg-[#0C0C0F] text-brand-gold flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:rotate-12 transition-transform duration-300">
              <Bell size={22} className="animate-pulse" />
            </div>

            {/* Notification Count Badge */}
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-brand-gold text-[9px] font-black text-white w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-brand-card">
              {minimizedCount}
            </span>
          </button>
        </div>
      )}

    </div>
  );
}
