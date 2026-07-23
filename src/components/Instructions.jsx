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
    <section className="relative min-h-screen bg-[var(--paper,#FFFDF7)] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-[#241708] font-sans">
      
      {/* Background Subtle Pattern matching website theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#8C3A16_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none -z-10" />

      {/* Toast Alert Component */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-[100] animate-bounce-in max-w-md">
          <div className="bg-[#241708] text-[#FAF6EE] border border-[#C97F1B] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#C97F1B] shrink-0" />
            <span className="text-xs font-bold font-sans">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full space-y-12">

        {/* ── Hero Header with Signature Dual-Tone Colors ── */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10.5px] font-extrabold uppercase tracking-wider shadow-2xs">
            <ClipboardList size={13} className="text-[#8C3A16]" />
            OFFICIAL RULEBOOK • SIH 4.0
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            <span className="text-[#8C3A16]">Instructions &amp; </span>
            <span className="text-[#C97F1B]">Guidelines</span>
          </h1>

          <p className="text-xs sm:text-base text-[#6B5B49] font-medium max-w-3xl leading-relaxed">
            Official rules, submission formats, and evaluation guidelines for SIH 4.0 — read this before you register your team.
          </p>
        </div>

        {/* ── Mandatory Submission Formats & Resources ── */}
        <div className="text-left space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10px] font-extrabold uppercase tracking-widest">FILES</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              <span className="text-[#8C3A16]">Mandatory Submission </span>
              <span className="text-[#C97F1B]">Formats &amp; Resources</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: PPT Template */}
            <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-center justify-center text-[#8C3A16] shadow-2xs shrink-0">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-lg font-black text-[#241708] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8C3A16] to-[#A84318] hover:from-[#6B2D12] hover:to-[#6B2D12] !text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border-none shrink-0 self-start sm:self-auto"
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
            <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-center justify-center text-[#8C3A16] shadow-2xs shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-black text-[#241708] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    HOD Consent Format
                  </h3>
                </div>

                <button
                  onClick={() => {
                    showToast('Consent Letter is currently unavailable. It will be uploaded soon!');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8C3A16] to-[#A84318] hover:from-[#6B2D12] hover:to-[#6B2D12] !text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border-none shrink-0 self-start sm:self-auto"
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

        {/* ── Official Guidelines & Rules Section (Polished Refined Vertical Stepper) ── */}
        <div className="text-left space-y-8">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10px] font-extrabold uppercase tracking-widest">RULES 01–06</span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
              <span className="text-[#8C3A16]">Official Guidelines </span>
              <span className="text-[#C97F1B]">&amp; Rules</span>
            </h2>
          </div>

          {/* Stepper Timeline List */}
          <div className="relative pl-3 sm:pl-5 space-y-7 sm:space-y-8">
            {/* Continuous Gradient Line on left */}
            <div className="absolute top-7 bottom-7 left-[27px] sm:left-[35px] w-0.5 bg-gradient-to-b from-[#8C3A16] via-[#C97F1B] to-[#E3D7C5] -z-0 rounded-full"></div>

            {rules.map((rule) => {
              const IconComp = rule.icon;
              return (
                <div key={rule.id} className="relative flex items-start gap-4 sm:gap-6 group z-10">
                  {/* Circle Badge with Warm Ring Overlay */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFFDF7] border-2 border-[#8C3A16] ring-4 ring-[#FAF0DD] flex flex-col items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <span className="text-[7.5px] font-extrabold uppercase tracking-widest leading-none text-[#C97F1B] font-mono">RULE</span>
                    <span className="text-sm sm:text-base font-black leading-none mt-0.5 text-[#8C3A16]" style={{ fontFamily: "'Outfit', sans-serif" }}>0{rule.id}</span>
                  </div>

                  {/* Rule Content Box */}
                  <div className="flex-1 bg-[#FAF6EE] border border-[#E3D7C5] rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#8C3A16]/50 transition-all duration-300 space-y-4 relative overflow-hidden">
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C3A16] via-[#C97F1B] to-transparent opacity-80" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] flex items-center justify-center shadow-2xs shrink-0">
                          <IconComp size={18} />
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-[#8C3A16] font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {rule.title}
                        </h3>
                      </div>

                      <span className={`w-fit px-3 py-1 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider ${rule.badgeStyle}`}>
                        {rule.badge}
                      </span>
                    </div>

                    <ul className="space-y-2.5 pt-2 border-t border-[#E3D7C5]/70">
                      {rule.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#241708] font-semibold leading-relaxed">
                          <CheckCircle2 size={15} className="text-[#8C3A16] shrink-0 mt-0.5" />
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
          <div className="mt-10 p-5 rounded-2xl bg-[#FAF0DD] border border-[#E3D7C5] flex items-start gap-3.5 text-xs sm:text-sm text-[#6B5B49] font-medium shadow-2xs">
            <span className="text-lg shrink-0">📌</span>
            <div className="leading-relaxed">
              <strong className="text-[#8C3A16] font-extrabold uppercase tracking-wider block text-xs mb-0.5">Important Note</strong>
              Teams that do not follow the mandatory PPT format or fail to submit the signed HOD Consent Letter will not be shortlisted for the Grand Finale, regardless of idea quality.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
