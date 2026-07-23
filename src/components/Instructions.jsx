import React, { useEffect } from 'react';
import { 
  ClipboardList, 
  Download, 
  Users, 
  Target, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  FileCheck
} from 'lucide-react';

export default function Instructions({ onViewChange, onRegisterClick }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const guidelines = [
    {
      id: 1,
      title: "Team Formation Rules",
      desc: "Form a team of 4 members from the same institution.",
      icon: Users,
      badge: "Mandatory",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#FFF9F0] via-[#FFFDF7] to-[#FAF0DD]",
        borderColor: "border-[#E8D0B5] hover:border-[#8C3A16]",
        topBar: "from-[#8C3A16] via-[#E6491E] to-[#F2A93B]",
        iconBg: "bg-[#8C3A16]/10 text-[#8C3A16] border-[#8C3A16]/20",
        badgeStyle: "bg-[#8C3A16]/15 text-[#8C3A16] border-[#8C3A16]/30",
        checkColor: "text-[#8C3A16]"
      },
      bullets: [
        "4 members per team from the same college (No inter-college teams)",
        "At least one female member is highly recommended in each team",
        "Each student can participate in only one team"
      ]
    },
    {
      id: 2,
      title: "Problem Selection",
      desc: "Choose from 12+ pre-defined innovation tracks or Open Innovation.",
      icon: Target,
      badge: "Flexible",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#F2FBF6] via-[#FFFDF7] to-[#E6F4ED]",
        borderColor: "border-[#BCE3CE] hover:border-[#0F6B48]",
        topBar: "from-[#0F6B48] via-[#10B981] to-[#34D399]",
        iconBg: "bg-[#0F6B48]/10 text-[#0F6B48] border-[#0F6B48]/20",
        badgeStyle: "bg-[#10B981]/15 text-[#0F6B48] border-[#10B981]/30",
        checkColor: "text-[#0F6B48]"
      },
      bullets: [
        "Select from 12+ pre-defined tracks or 'Open Innovation'",
        "Software & Hardware submissions are evaluated in separate tracks",
        "Specify your Problem Statement Code accurately during registration"
      ]
    },
    {
      id: 3,
      title: "PPT Presentation Format",
      desc: "Format solution using official SIH 4.O PPT template.",
      icon: FileText,
      badge: "Strict Format",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#F0F5FF] via-[#FFFDF7] to-[#E0EBFF]",
        borderColor: "border-[#BCD3FF] hover:border-[#1E40AF]",
        topBar: "from-[#1E40AF] via-[#3B82F6] to-[#60A5FA]",
        iconBg: "bg-[#1E40AF]/10 text-[#1E40AF] border-[#1E40AF]/20",
        badgeStyle: "bg-[#3B82F6]/15 text-[#1E40AF] border-[#3B82F6]/30",
        checkColor: "text-[#1E40AF]"
      },
      bullets: [
        "Strictly adhere to the official PPT template structure",
        "Include Problem Statement, Solution, Tech Stack, USP & Novelty",
        "Do not alter master slide coordinates or header formatting"
      ]
    },
    {
      id: 4,
      title: "HOD Consent Letter",
      desc: "Signed & stamped letter from Principal/HOD is mandatory.",
      icon: ShieldCheck,
      badge: "Required Document",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#FFF2F2] via-[#FFFDF7] to-[#FFE4E4]",
        borderColor: "border-[#F8B4B4] hover:border-[#B91C1C]",
        topBar: "from-[#B91C1C] via-[#EF4444] to-[#F87171]",
        iconBg: "bg-[#B91C1C]/10 text-[#B91C1C] border-[#B91C1C]/20",
        badgeStyle: "bg-[#EF4444]/15 text-[#B91C1C] border-[#EF4444]/30",
        checkColor: "text-[#B91C1C]"
      },
      bullets: [
        "Signed & stamped letter from College Principal or HOD is mandatory",
        "Must list all registered team members with official roll numbers",
        "Upload in high-quality PDF format during online registration"
      ]
    },
    {
      id: 5,
      title: "Registration Process",
      desc: "Team Leader completes single online registration form.",
      icon: FileCheck,
      badge: "Process",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#F7F3FF] via-[#FFFDF7] to-[#EDE5FF]",
        borderColor: "border-[#D7C4FF] hover:border-[#6D28D9]",
        topBar: "from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA]",
        iconBg: "bg-[#6D28D9]/10 text-[#6D28D9] border-[#6D28D9]/20",
        badgeStyle: "bg-[#8B5CF6]/15 text-[#6D28D9] border-[#8B5CF6]/30",
        checkColor: "text-[#6D28D9]"
      },
      bullets: [
        "Team Leader submits single online form for all members",
        "Ensure accurate member emails, phone numbers & roll numbers",
        "Physical college ID verification is mandatory on-venue"
      ]
    },
    {
      id: 6,
      title: "Grand Finale Guidelines",
      desc: "24-Hour non-stop hackathon at SISTec-R Campus, Bhopal.",
      icon: Zap,
      badge: "On-Campus",
      colorTheme: {
        cardBg: "bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF7] to-[#FEF3C7]",
        borderColor: "border-[#FDE68A] hover:border-[#C97F1B]",
        topBar: "from-[#C97F1B] via-[#F2A93B] to-[#FBBF24]",
        iconBg: "bg-[#C97F1B]/10 text-[#C97F1B] border-[#C97F1B]/20",
        badgeStyle: "bg-[#F2A93B]/20 text-[#8C3A16] border-[#C97F1B]/30",
        checkColor: "text-[#C97F1B]"
      },
      bullets: [
        "24-Hour non-stop physical hackathon at SISTec-R Campus",
        "Bring your own laptops, extension cords & hardware modules",
        "Meals, snacks, high-speed Wi-Fi & mentoring provided"
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-[var(--paper,#FFFDF7)] pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-[#241708] select-none font-sans">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#8C3A16_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3D7C5]">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF0DD] border border-[#E3D7C5] text-[#8C3A16] text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <ClipboardList size={13} className="text-[#8C3A16]" />
              Official Hackathon Guidelines
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#5C230C] tracking-tight uppercase font-display leading-none">
              Instructions <span className="text-[#C97F1B]">&amp; Guidelines</span>
            </h1>
            <p className="text-xs text-[#6B5B49] font-medium">
              Official rules, submission formats, and evaluation guidelines for SIH 4.O.
            </p>
          </div>

          {/* Removed Back to Home button */}
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

            <a 
              href="#process" 
              onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#process'); }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF7] border-2 border-[#8C3A16] text-[#8C3A16] hover:bg-[#FAF0DD] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              <FileCheck size={14} />
              <span>Consent Format</span>
            </a>
          </div>
        </div>

        {/* ── 6-Card Grid with Inter-Card Spacing ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 text-left">
          {guidelines.map((rule) => {
            const IconComponent = rule.icon;
            const theme = rule.colorTheme;
            return (
              <div 
                key={rule.id}
                className={`${theme.cardBg} border-2 ${theme.borderColor} rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Top Accent Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.topBar}`} />

                <div className="space-y-2.5 pt-0.5">
                  {/* Header: Icon + Title + Rule Badge */}
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8.5 h-8.5 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        <IconComponent size={16} />
                      </div>
                      <div className="truncate">
                        <span className="text-[8.5px] font-black text-[#8C3A16] font-mono uppercase block leading-none">RULE 0{rule.id}</span>
                        <h3 className="text-xs sm:text-sm font-black text-[#5C230C] truncate font-display group-hover:text-[#8C3A16] transition-colors leading-tight">
                          {rule.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0 ${theme.badgeStyle}`}>
                      {rule.badge}
                    </span>
                  </div>

                  {/* Subtitle description */}
                  <p className="text-[11px] text-[#6B5B49] font-medium leading-tight">
                    {rule.desc}
                  </p>

                  {/* Bullet Directives */}
                  <div className="pt-2 border-t border-[#E3D7C5]/70 space-y-1.5">
                    <span className="text-[9px] font-black text-[#C97F1B] uppercase tracking-widest block font-mono">
                      Key Directives
                    </span>
                    <ul className="space-y-1.5">
                      {rule.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#241708] font-semibold leading-normal">
                          <CheckCircle2 size={12.5} className={`${theme.checkColor} shrink-0 mt-0.5`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
