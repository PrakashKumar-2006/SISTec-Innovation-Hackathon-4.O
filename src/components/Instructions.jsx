import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  ClipboardList, 
  Download, 
  FileCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function Instructions({ onViewChange }) {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const leftInstructions = [
    "All members of a team should be from same institute.",
    "Each team would mandatorily comprise of 5 members including the team leader.",
    "Each team must have at least one female team member.",
    "One mentor can accompany each team.",
    "Every student can be part of only one team.",
    "Each team has to submit consent letter duly signed by head of institute (in given format available at the website)."
  ];

  const rightInstructions = [
    "Each team has to carry all project related equipment with them.",
    "Only UG students are allowed to participate.",
    "The team’s name should be unique and must not contain the name of your institute in any form.",
    "All participating students have to carry their ID card with team. Without ID card there will be no-entry.",
    "Throughout the hackathon at least three members of the team must be present on their assigned work place."
  ];

  return (
    <section className="relative min-h-screen bg-[var(--paper,#FFFDF7)] pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-[#241708] select-none font-sans">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#8C3A16_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none -z-10" />

      {/* Toast Alert Component */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 left-3 right-3 sm:left-auto sm:right-5 z-[100] animate-bounce-in max-w-md mx-auto sm:mx-0">
          <div className="bg-[#241708] text-[#FAF6EE] border border-[#C97F1B] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#C97F1B] shrink-0" />
            <span className="text-xs font-bold font-sans">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3D7C5]">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <ClipboardList size={13} className="text-[#8C3A16]" />
              Official Hackathon Guidelines
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#5C230C] tracking-tight uppercase font-display leading-none">
              Instructions <span className="text-[#C97F1B]">&amp; Rules</span>
            </h1>
            <p className="text-xs text-[#6B5B49] font-medium">
              Official rules, team formation requirements, and venue guidelines for SIH 4.O.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button
              onClick={() => onViewChange && onViewChange('landing')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C3A16] hover:bg-[#6B3213] !text-white text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm border-none"
              style={{ color: '#ffffff' }}
            >
              <ArrowLeft size={14} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>Back to Home</span>
            </button>
          </div>
        </div>

        {/* ── Quick Resources Banner ── */}
        <div className="bg-gradient-to-r from-[#FAF0DD] via-[#FFFDF7] to-[#FAF0DD] border-2 border-[#E3D7C5] rounded-2xl p-4 sm:p-4.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs text-left">
          <div className="flex items-center gap-3">
            <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-br from-[#8C3A16] to-[#C97F1B] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Download size={18} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm font-black text-[#5C230C] font-display">
                Mandatory Submission Formats
              </h3>
              <p className="text-[11px] text-[#6B5B49] font-medium">
                Download the official PPT template and HOD consent letter format before registration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            <a 
              href="/Idea-Sumission Format SIH 4.0.pptx" 
              download="Idea-Submission-Format-SIH-4.0.pptx"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#8C3A16] hover:bg-[#6B3213] !text-white text-xs font-black uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer border-none"
              style={{ color: '#ffffff' }}
            >
              <Download size={14} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>PPT Template</span>
            </a>

            <button 
              onClick={() => showToast('Consent Letter format will be uploaded soon!')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF7] border-2 border-[#8C3A16] text-[#8C3A16] hover:bg-[#FAF0DD] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              <FileCheck size={14} />
              <span>Consent Format</span>
            </button>
          </div>
        </div>

        {/* ── Main Clean Guidelines Section (2-Column Left / Right without inner boxes) ── */}
        <div className="bg-[#FFFDF7] border-2 border-[#E8D0B5] rounded-3xl p-6 sm:p-10 shadow-sm relative text-left overflow-hidden">
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8C3A16] via-[#E6491E] to-[#C97F1B]" />

          {/* Section Header */}
          <div className="flex items-center gap-3 pb-6 mb-8 border-b border-[#E8D0B5]">
            <div className="w-10 h-10 rounded-xl bg-[#8C3A16]/10 text-[#8C3A16] border border-[#8C3A16]/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#5C230C] font-display">
                Mandatory Guidelines &amp; Directives
              </h2>
              <p className="text-xs text-[#6B5B49] font-medium">
                Please follow all instructions strictly for participation in SIH 4.O.
              </p>
            </div>
          </div>

          {/* 2-Column Split (Left vs Right Bullet Points without individual sub-boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
            {/* Center Vertical Divider for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E8D0B5] -translate-x-1/2" />

            {/* Left Column (Items 1 to 6) */}
            <div className="space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#8C3A16] font-mono pb-2 border-b border-[#FAF0DD] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8C3A16]" />
                Team &amp; Registration Rules
              </h3>

              <ul className="space-y-4">
                {leftInstructions.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#241708] font-semibold leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF0DD] text-[#8C3A16] text-[11px] font-black shrink-0 font-mono mt-0.5 border border-[#E8D0B5]">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column (Items 7 to 11) */}
            <div className="space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#C97F1B] font-mono pb-2 border-b border-[#FAF0DD] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C97F1B]" />
                Venue &amp; Conduct Rules
              </h3>

              <ul className="space-y-4">
                {rightInstructions.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#241708] font-semibold leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF0DD] text-[#8C3A16] text-[11px] font-black shrink-0 font-mono mt-0.5 border border-[#E8D0B5]">
                      {idx + 7}
                    </span>
                    <span className="pt-0.5">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
