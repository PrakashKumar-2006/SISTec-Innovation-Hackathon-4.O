import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { Search, X, Building2, Cpu, Sparkles, AlertCircle, Filter, Tag } from 'lucide-react';
import ClickRipple from './ClickRipple';

// Configuration
const backendUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : '');

const getDomainTheme = (domain) => {
  const d = domain.toLowerCase();
  if (d.includes('agriculture') || d.includes('agri')) {
    return {
      bg: "from-amber-500/20 to-orange-600/5",
      borderColor: "group-hover:border-amber-500/60 border-amber-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(245,158,11,0.2)]",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      psBadge: "bg-amber-500/15 border-amber-500/30 text-amber-300"
    };
  }
  if (d.includes('health') || d.includes('medical') || d.includes('bio') || d.includes('care')) {
    return {
      bg: "from-rose-500/20 to-red-600/5",
      borderColor: "group-hover:border-rose-500/60 border-rose-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(244,63,94,0.2)]",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      psBadge: "bg-rose-500/15 border-rose-500/30 text-rose-300"
    };
  }
  if (d.includes('education') || d.includes('edu') || d.includes('teach') || d.includes('learning')) {
    return {
      bg: "from-purple-500/20 to-indigo-600/5",
      borderColor: "group-hover:border-purple-500/60 border-purple-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(168,85,247,0.2)]",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      psBadge: "bg-purple-500/15 border-purple-500/30 text-purple-300"
    };
  }
  if (d.includes('security') || d.includes('cyber') || d.includes('defense') || d.includes('safe')) {
    return {
      bg: "from-cyan-500/20 to-blue-600/5",
      borderColor: "group-hover:border-cyan-500/60 border-cyan-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(6,182,212,0.2)]",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      psBadge: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
    };
  }
  if (d.includes('smart') || d.includes('iot') || d.includes('hardware') || d.includes('embedded') || d.includes('device')) {
    return {
      bg: "from-fuchsia-500/20 to-pink-600/5",
      borderColor: "group-hover:border-fuchsia-500/60 border-fuchsia-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(217,70,239,0.2)]",
      badge: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
      psBadge: "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300"
    };
  }
  if (d.includes('finance') || d.includes('fin') || d.includes('bank') || d.includes('commerce') || d.includes('payment')) {
    return {
      bg: "from-emerald-500/20 to-teal-600/5",
      borderColor: "group-hover:border-emerald-500/60 border-emerald-500/20",
      glow: "group-hover:shadow-[0_15px_30px_rgba(16,185,129,0.2)]",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      psBadge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
    };
  }
  return {
    bg: "from-blue-500/15 to-indigo-600/5",
    borderColor: "group-hover:border-blue-500/50 border-blue-500/15",
    glow: "group-hover:shadow-[0_15px_30px_rgba(59,130,246,0.15)]",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    psBadge: "bg-blue-500/15 border-blue-500/30 text-blue-300"
  };
};

export default function ProblemStatements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['publicProblemStatements'],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/api/public/problem-statements`);
      return response.data.data;
    }
  });

  const problemStatements = data || [];
  // Unique domains for select options
  const uniqueDomains = ['All', ...new Set(problemStatements.map(item => item.domain).filter(Boolean))];

  // Filtering Logic
  const filteredStatements = problemStatements.filter(item => {
    const orgStr = item.org || '';
    const titleStr = item.title || item.statement || '';
    const psNumberStr = item.psNumber || '';
    const domainStr = item.domain || '';

    const matchesSearch = 
      orgStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      titleStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psNumberStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domainStr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;

    return matchesSearch && matchesCategory && matchesDomain;
  });

  return (
    <section className="relative pt-32 pb-24 bg-brand-darker min-h-screen overflow-hidden tech-grid-dense">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-12 animate-fade-in">
          <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[var(--vermilion)] font-sans uppercase mb-4 flex items-center gap-2">
            <Sparkles size={14} className="animate-pulse text-[var(--vermilion)]" />
            Problem Statements Portal
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--clay)] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            SIH 4.0 <span className="text-[var(--marigold-deep)]">National Challenges</span>
          </h1>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-2xl font-sans">
            Browse through active problem statements submitted by state corporations, municipal bodies, and corporate partners. Filter, search, and align your team to win.
          </p>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-red-400">Failed to load problem statements. Please try again later.</p>
          </div>
        )}

        {/* Filters and Grid */}
        {!isLoading && !isError && (
          <>
            {/* Uniform Filters Dashboard */}
            <div 
              style={{ animationDelay: '100ms' }}
              className="p-6 rounded-[2rem] bg-[var(--panel)] border border-[var(--marigold)]/20 shadow-xl mb-10 animate-fade-in opacity-0"
            >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search Input Box */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-[var(--marigold)] tracking-wider uppercase pl-1 flex items-center gap-1 font-sans">
                <Search size={10} /> Search Challenges
              </label>
              <div className="relative h-12 rounded-2xl bg-[var(--panel-soft)] border border-[var(--marigold)]/30 flex items-center px-4 transition-all focus-within:border-[var(--marigold)]">
                <Search className="text-[var(--ink-faint)] mr-2.5 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="PS number, keyword, organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder-[var(--ink-faint)] focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select Dropdown */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-[var(--marigold)] tracking-wider uppercase pl-1 flex items-center gap-1 font-sans">
                <Tag size={10} /> Category Type
              </label>
              <div className="relative h-12 rounded-2xl bg-[var(--panel-soft)] border border-[var(--marigold)]/30 flex items-center px-4 transition-all focus-within:border-[var(--marigold)]">
                <Filter className="text-[var(--ink-faint)] mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[var(--panel)] text-white">All Categories</option>
                  <option value="Software" className="bg-[var(--panel)] text-white">Software</option>
                  <option value="Hardware" className="bg-[var(--panel)] text-white">Hardware</option>
                  <option value="Hardware/Software" className="bg-[var(--panel)] text-white">Hardware/Software</option>
                </select>
              </div>
            </div>

            {/* Domain Dropdown Select */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-[var(--marigold)] tracking-wider uppercase pl-1 flex items-center gap-1 font-sans">
                <Cpu size={10} /> Domain Bucket
              </label>
              <div className="relative h-12 rounded-2xl bg-[var(--panel-soft)] border border-[var(--marigold)]/30 flex items-center px-4 transition-all focus-within:border-[var(--marigold)]">
                <Cpu className="text-[var(--ink-faint)] mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  {uniqueDomains.map((dom, dIdx) => (
                    <option key={dIdx} value={dom} className="bg-[var(--panel)] text-white">
                      {dom === 'All' ? 'All Domains' : dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>


        {/* Desktop Table View */}
        <div className="hidden md:block rounded-[2rem] bg-[var(--panel)] border border-[var(--marigold)]/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-[var(--marigold)]/20 bg-[var(--panel-soft)]">
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-20 text-[var(--marigold)] font-sans">
                    S. No.
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-64 text-[var(--marigold)] font-sans">
                    Organization
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider max-w-sm text-[var(--marigold)] font-sans">
                    Problem Statement
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-32 text-[var(--marigold)] font-sans">
                    PS Number
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-44 text-[var(--marigold)] font-sans">
                    Category
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-48 text-[var(--marigold)] font-sans">
                    Domain Bucket
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-44 text-center text-[var(--marigold)] font-sans">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredStatements.length > 0 ? (
                  filteredStatements.map((item, idx) => (
                    <tr 
                      key={idx}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="hover:bg-white/[0.02] transition-colors duration-200 group animate-fade-in opacity-0"
                    >
                      {/* S.No */}
                      <td className="px-6 py-5 text-sm font-bold text-white/90 font-mono">
                        {idx + 1}
                      </td>

                      {/* Sponsoring Organization */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium leading-relaxed max-w-[240px]">
                        {item.org}
                      </td>

                      {/* Problem Statement */}
                      <td className="px-6 py-5 text-xs text-white font-medium leading-relaxed max-w-md">
                        <span className="block border-l-2 border-brand-gold pl-3">
                          {item.title || item.statement}
                        </span>
                      </td>

                      {/* PS Number */}
                      <td className="px-6 py-5 text-xs font-bold text-white/90 font-mono">
                        {item.psNumber}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium">
                        {item.category}
                      </td>

                      {/* Domain Bucket */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium">
                        {item.domain}
                      </td>

                      {/* Action View Details */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="text-xs font-bold text-brand-gold hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer hover:underline"
                        >
                          View Description
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-brand-gray">
                        <AlertCircle size={32} className="text-brand-orange animate-bounce" />
                        <p className="font-mono text-sm">No matching problem statements found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-5">
          {filteredStatements.length > 0 ? (
            filteredStatements.map((item, idx) => {
              const theme = getDomainTheme(item.domain);
              return (
                <div 
                  key={idx}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${theme.bg} backdrop-blur-md border ${theme.borderColor} ${theme.glow} flex flex-col gap-3.5 relative overflow-hidden shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 text-left animate-fade-in opacity-0 group`}
                >
                  {/* Header: S.No & PS Number badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white/35">#{item.sNo}</span>
                    <span className={`px-2.5 py-1 rounded-lg border font-mono text-[9px] font-bold tracking-wider ${theme.psBadge}`}>
                      {item.psNumber}
                    </span>
                  </div>

                  {/* Sponsoring Org */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Sponsoring Org</span>
                    <h3 className="text-sm font-extrabold text-white leading-snug group-hover:text-brand-gold transition-colors">{item.org}</h3>
                  </div>

                  {/* Problem Statement Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[9px] font-black tracking-widest text-brand-gold uppercase flex items-center gap-1">
                      <Sparkles size={10} className="text-brand-gold shrink-0 animate-pulse" /> Problem Statement
                    </span>
                    <div className="pl-3 border-l-2 border-brand-gold bg-white/5 p-2.5 rounded-r-xl">
                      <p className="text-xs text-white font-medium leading-relaxed break-words text-justify line-clamp-3">
                        {item.statement}
                      </p>
                    </div>
                  </div>

                  {/* Categories / Info Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/5">
                    <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-brand-gray text-[9px] font-black uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${theme.badge}`}>
                      {item.domain}
                    </span>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-brand-dark border border-white/10 hover:border-brand-gold hover:text-brand-gold text-xs font-extrabold text-slate-300 transition-all text-center cursor-pointer active:scale-[0.98] shadow-md"
                  >
                    View Details & Tech Stack
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-14 text-center rounded-2xl bg-brand-card/25 border border-dashed border-white/5">
              <div className="flex flex-col items-center gap-3 text-brand-gray">
                <AlertCircle size={28} className="text-brand-orange animate-bounce" />
                <p className="font-mono text-xs">No matching problem statements found.</p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Modal Overlay */}
        {activeModalItem && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-brand-darker/80 backdrop-blur-md"
              onClick={() => setActiveModalItem(null)}
            ></div>
            
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-brand-card/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 md:p-8 z-10 text-left animate-fade-in custom-scrollbar">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>

              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-brand-gray hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
                <span className="px-3 py-1 rounded-lg bg-brand-dark border border-white/5 font-mono text-xs font-bold text-brand-blue tracking-wide">
                  PS Number: {activeModalItem.psNumber}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-brand-gray text-[10px] font-bold uppercase">
                  {activeModalItem.category}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-brand-pink/20 bg-brand-pink/10 text-brand-pink text-[10px] font-bold uppercase">
                  {activeModalItem.domain}
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Sponsoring Organization</h4>
                  <div className="flex items-center gap-2.5 text-base font-bold text-white">
                    <span>{activeModalItem.org}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gold uppercase flex items-center gap-1">
                    <Sparkles size={10} className="text-brand-gold shrink-0" /> Problem Statement Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-white font-medium leading-relaxed bg-brand-dark/45 p-4 rounded-2xl border-l-4 border-brand-gold border-y border-r border-white/5">
                    {activeModalItem.title || activeModalItem.statement}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Detailed Scope & Requirements</h4>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                    {activeModalItem.detailedDescription}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-bold tracking-widest text-brand-gray uppercase">Suggested Technologies</h4>
                  <p className="text-xs font-mono font-bold text-brand-gold tracking-wide">
                    {activeModalItem.techStack}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold text-white shadow-lg active:scale-95 transition-all cursor-pointer border-none"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        , document.body)}
        </>
        )}
      </div>
    </section>
  );
}
