import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  Download,
  ClipboardList,
  Users,
  Target,
  FileCheck,
  Zap,
  CheckCircle2
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

  const rules = [
    {
      id: 1,
      title: "Team Formation Rules",
      badge: "MANDATORY",
      badgeStyle: "bg-[#8C3A16]/12 text-[#8C3A16] border border-[#8C3A16]/30",
      icon: Users,
      bullets: [
        "4 members per team from the same college (no inter-college teams allowed).",
        "At least one female member is highly recommended in each team.",
        "Each student can participate in only one team."
      ]
    },
    {
      id: 2,
      title: "Problem Selection",
      badge: "FLEXIBLE",
      badgeStyle: "bg-[#C97F1B]/15 text-[#C97F1B] border border-[#C97F1B]/40",
      icon: Target,
      bullets: [
        "Select from 12+ pre-defined tracks or \"Open Innovation.\"",
        "Software & Hardware submissions are evaluated in separate tracks.",
        "Specify your Problem Statement code accurately during registration."
      ]
    },
    {
      id: 3,
      title: "PPT Presentation Format",
      badge: "STRICT FORMAT",
      badgeStyle: "bg-[#8C3A16]/12 text-[#8C3A16] border border-[#8C3A16]/30",
      icon: FileText,
      bullets: [
        "Strictly adhere to the official PPT template structure.",
        "Include Problem Statement, Solution, Tech Stack, USP & Novelty.",
        "Do not alter master slide coordinates or header formatting."
      ]
    },
    {
      id: 4,
      title: "HOD Consent Letter",
      badge: "REQUIRED DOCUMENT",
      badgeStyle: "bg-[#C97F1B]/15 text-[#C97F1B] border border-[#C97F1B]/40",
      icon: ShieldCheck,
      bullets: [
        "Signed & stamped letter from College Principal or HOD is mandatory.",
        "Must list all registered team members with official roll numbers.",
        "Upload in high-quality PDF format during online registration."
      ]
    },
    {
      id: 5,
      title: "Registration Process",
      badge: "PROCESS",
      badgeStyle: "bg-[#8C3A16]/12 text-[#8C3A16] border border-[#8C3A16]/30",
      icon: FileCheck,
      bullets: [
        "Team Leader submits a single online form for all members.",
        "Ensure accurate member emails, phone numbers & roll numbers.",
        "Physical college ID verification is mandatory on-venue."
      ]
    },
    {
      id: 6,
      title: "Grand Finale Guidelines",
      badge: "ON-CAMPUS",
      badgeStyle: "bg-[#C97F1B]/15 text-[#C97F1B] border border-[#C97F1B]/40",
      icon: Zap,
      bullets: [
        "24-hour non-stop physical hackathon at SISTec-R Campus, Bhopal.",
        "Bring your own laptops, extension cords & hardware modules.",
        "Meals, snacks, high-speed Wi-Fi & mentoring provided."
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-[var(--paper,#FFFDF7)] pt-20 sm:pt-28 pb-16 sm:pb-20 px-3.5 sm:px-6 lg:px-8 text-[#241708] font-sans">
      
      {/* Background Subtle Pattern matching website theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#8C3A16_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none -z-10" />

      {/* Toast Alert Component - Responsive Positioning */}
      {toastMessage && (
        <div className="fixed top-20 sm:top-24 left-3 right-3 sm:left-auto sm:right-5 z-[100] animate-bounce-in max-w-md mx-auto sm:mx-0">
          <div className="bg-[#241708] text-[#FAF6EE] border border-[#C97F1B] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#C97F1B] shrink-0" />
            <span className="text-xs font-bold font-sans">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full space-y-10 sm:space-y-12">

        {/* ── Hero Header with Signature Dual-Tone Colors ── */}
        <div className="text-left space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider shadow-2xs">
            <ClipboardList size={13} className="text-[#8C3A16]" />
            OFFICIAL RULEBOOK • SIH 4.0
          </div>

          <h1 className="text-2xl sm:text-5xl font-black uppercase tracking-tight font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            <span className="text-[#8C3A16]">Instructions &amp; </span>
            <span className="text-[#C97F1B]">Guidelines</span>
          </h1>

          <p className="text-xs sm:text-base text-[#6B5B49] font-medium max-w-3xl leading-relaxed">
            Official rules, submission formats, and evaluation guidelines for SIH 4.0 — read this before you register your team.
          </p>
        </div>

        {/* ── Mandatory Submission Formats & Resources ── */}
        <div className="text-left space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest">FILES</span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              <span className="text-[#8C3A16]">Mandatory Submission </span>
              <span className="text-[#C97F1B]">Formats &amp; Resources</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: PPT Template */}
            <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-center justify-center text-[#8C3A16] shadow-2xs shrink-0">
                    <FileText size={18} className="sm:hidden" />
                    <FileText size={20} className="hidden sm:block" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#241708] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    PPT Template
                  </h3>
                </div>

                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Idea-Sumission Format SIH 4.0.pptx';
                    link.download = 'Idea-Submission-Format-SIH-4.0.pptx';
                    link.click();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2 rounded-xl bg-gradient-to-r from-[#8C3A16] to-[#A84318] hover:from-[#6B2D12] hover:to-[#6B2D12] !text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border-none w-full sm:w-auto shrink-0"
                  style={{ color: '#ffffff' }}
                >
                  <Download size={14} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Download Template</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#6B5B49] font-medium leading-relaxed">
                Download the official Idea Presentation format. Every team must submit their idea using this exact structure.
              </p>
            </div>

            {/* Card 2: HOD Consent Format */}
            <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-center justify-center text-[#8C3A16] shadow-2xs shrink-0">
                    <ShieldCheck size={18} className="sm:hidden" />
                    <ShieldCheck size={20} className="hidden sm:block" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#241708] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    HOD Consent Format
                  </h3>
                </div>

                <button
                  onClick={() => {
                    showToast('Consent Letter is currently unavailable. It will be uploaded soon!');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2 rounded-xl bg-gradient-to-r from-[#8C3A16] to-[#A84318] hover:from-[#6B2D12] hover:to-[#6B2D12] !text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border-none w-full sm:w-auto shrink-0"
                  style={{ color: '#ffffff' }}
                >
                  <Download size={14} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Download Format</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#6B5B49] font-medium leading-relaxed">
                Download and verify the official Principal / HOD Consent Letter format before completing online registration.
              </p>
            </div>
          </div>
        </div>

        {/* ── Official Guidelines & Rules Section (Mobile-Optimized Vertical Stepper) ── */}
        <div className="text-left space-y-6 sm:space-y-8">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest">RULES 01–06</span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              <span className="text-[#8C3A16]">Official Guidelines </span>
              <span className="text-[#C97F1B]">&amp; Rules</span>
            </h2>
          </div>

          {/* Stepper Timeline List - Pixel Perfect Center Alignment on Mobile */}
          <div className="relative pl-0 sm:pl-2 space-y-5 sm:space-y-8">
            {/* Continuous Gradient Line on left */}
            <div className="absolute top-6 bottom-6 left-[21px] sm:left-[33px] w-0.5 bg-gradient-to-b from-[#8C3A16] via-[#C97F1B] to-[#E3D7C5] -z-0 rounded-full"></div>

            {rules.map((rule) => {
              const IconComp = rule.icon;
              return (
                <div key={rule.id} className="relative flex items-start gap-3 sm:gap-6 group z-10">
                  {/* Circle Badge with Warm Ring Overlay */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#FFFDF7] border-2 border-[#8C3A16] ring-4 ring-[#FAF0DD] flex flex-col items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <span className="text-[6.5px] sm:text-[7.5px] font-extrabold uppercase tracking-widest leading-none text-[#C97F1B] font-mono">RULE</span>
                    <span className="text-xs sm:text-base font-black leading-none mt-0.5 text-[#8C3A16]" style={{ fontFamily: "'Outfit', sans-serif" }}>0{rule.id}</span>
                  </div>

                  {/* Rule Content Box */}
                  <div className="flex-1 bg-[#FAF6EE] border border-[#E3D7C5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/50 transition-all duration-300 space-y-3 sm:space-y-4 relative overflow-hidden">
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C3A16] via-[#C97F1B] to-transparent opacity-80" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pt-0.5">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] flex items-center justify-center shadow-2xs shrink-0">
                          <IconComp size={16} className="sm:hidden" />
                          <IconComp size={18} className="hidden sm:block" />
                        </div>
                        <h3 className="text-sm sm:text-lg font-black text-[#8C3A16] font-display leading-snug" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {rule.title}
                        </h3>
                      </div>

                      <span className={`w-fit px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8.5px] sm:text-[9.5px] font-extrabold uppercase tracking-wider ${rule.badgeStyle}`}>
                        {rule.badge}
                      </span>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-[#E3D7C5]/70">
                      {rule.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#241708] font-semibold leading-relaxed">
                          <CheckCircle2 size={14} className="text-[#8C3A16] shrink-0 mt-0.5 sm:hidden" />
                          <CheckCircle2 size={15} className="text-[#8C3A16] shrink-0 mt-0.5 hidden sm:block" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Note Box */}
          <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-[#6B5B49] font-medium shadow-2xs">
            <span className="text-base sm:text-lg shrink-0">📌</span>
            <div className="leading-relaxed">
              <strong className="text-[#8C3A16] font-extrabold uppercase tracking-wider block text-[11px] sm:text-xs mb-0.5">Important Note</strong>
              Teams that do not follow the mandatory PPT format or fail to submit the signed HOD Consent Letter will not be shortlisted for the Grand Finale, regardless of idea quality.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
