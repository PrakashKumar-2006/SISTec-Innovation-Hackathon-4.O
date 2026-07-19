import React, { useState } from 'react';
import { Search, X, Building2, Cpu, Sparkles, AlertCircle, Filter, Tag } from 'lucide-react';
import { problemStatements } from '../data/problemStatements';

export default function ProblemStatements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Unique domains for select options
  const uniqueDomains = ['All', ...new Set(problemStatements.map(item => item.domain))];

  // Filtering Logic
  const filteredStatements = problemStatements.filter(item => {
    const matchesSearch = 
      item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.psNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchTerm.toLowerCase());

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 animate-pulse">
            <Sparkles size={12} />
            Problem Statements Portal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            SIH 4.0 <span className="text-gold-metallic">National Challenges</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-2xl">
            Browse through active problem statements submitted by state corporations, municipal bodies, and corporate partners. Filter, search, and align your team to win.
          </p>
        </div>

        {/* Uniform Filters Dashboard */}
        <div 
          style={{ animationDelay: '100ms' }}
          className="p-6 rounded-[2rem] bg-brand-card/30 backdrop-blur-md border border-white/5 shadow-card-shadow mb-10 animate-fade-in opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search Input Box */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Search size={10} /> Search Challenges
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Search className="text-brand-gray mr-2.5 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="PS number, keyword, organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder-brand-gray focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select Dropdown */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Tag size={10} /> Category Type
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Filter className="text-brand-gray mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-brand-dark text-white">All Categories</option>
                  <option value="Software" className="bg-brand-dark text-white">Software</option>
                  <option value="Hardware" className="bg-brand-dark text-white">Hardware</option>
                  <option value="Hardware/Software" className="bg-brand-dark text-white">Hardware/Software</option>
                </select>
              </div>
            </div>

            {/* Domain Dropdown Select */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold text-brand-gray tracking-wider uppercase pl-1 flex items-center gap-1">
                <Cpu size={10} /> Domain Bucket
              </label>
              <div className="relative h-12 rounded-2xl bg-brand-dark/45 border border-white/5 flex items-center px-4 transition-all focus-within:border-brand-blue/30">
                <Cpu className="text-brand-gray mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  {uniqueDomains.map((dom, dIdx) => (
                    <option key={dIdx} value={dom} className="bg-brand-dark text-white">
                      {dom === 'All' ? 'All Domains' : dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>


        {/* Desktop Table View */}
        <div className="hidden md:block rounded-[2rem] bg-brand-card/15 backdrop-blur-md border border-white/5 overflow-hidden shadow-card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5 bg-brand-darker/60">
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-20">
                    <span className="text-gold-metallic">S. No.</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-64">
                    <span className="text-gold-metallic">Organization</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider max-w-sm">
                    <span className="text-gold-metallic">Problem Statement</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-32">
                    <span className="text-gold-metallic">PS Number</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44">
                    <span className="text-gold-metallic">Category</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-48">
                    <span className="text-gold-metallic">Domain Bucket</span>
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider w-44 text-center">
                    <span className="text-gold-metallic">Problem Description</span>
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
                        {item.sNo}
                      </td>

                      {/* Sponsoring Organization */}
                      <td className="px-6 py-5 text-xs text-brand-gray font-medium leading-relaxed max-w-[240px]">
                        {item.org}
                      </td>

                      {/* Problem Statement */}
                      <td className="px-6 py-5 text-xs text-white font-medium leading-relaxed max-w-md">
                        <span className="block border-l-2 border-brand-gold pl-3">
                          {item.statement}
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
        <div className="md:hidden flex flex-col gap-4">
          {filteredStatements.length > 0 ? (
            filteredStatements.map((item, idx) => (
              <div 
                key={idx}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="p-5 rounded-2xl bg-brand-card/30 backdrop-blur-md border border-white/5 flex flex-col gap-3 relative overflow-hidden shadow-card-shadow text-left animate-fade-in opacity-0 hover:border-brand-gold/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-pink to-brand-blue"></div>
                
                {/* Header: S.No & PS Number badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white/30">#{item.sNo}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-brand-dark border border-white/5 font-mono text-[10px] font-bold text-brand-blue tracking-wide">
                    {item.psNumber}
                  </span>
                </div>

                {/* Sponsoring Org */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest text-brand-gray uppercase">Sponsoring Org</span>
                  <h3 className="text-sm font-extrabold text-white leading-snug">{item.org}</h3>
                </div>

                {/* Problem Statement Preview */}
                <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                  <span className="text-[9px] font-bold tracking-widest text-brand-gold uppercase flex items-center gap-1">
                    <Sparkles size={10} className="text-brand-gold shrink-0" /> Problem Statement
                  </span>
                  <div className="pl-3 border-l-2 border-brand-gold bg-white/[0.02] p-2.5 rounded-r-xl">
                    <p className="text-xs text-white font-medium leading-relaxed break-words text-justify line-clamp-3">
                      {item.statement}
                    </p>
                  </div>
                </div>

                {/* Categories / Info Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/5">
                  <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-brand-gray text-[9px] font-bold uppercase">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-brand-pink/20 bg-brand-pink/10 text-brand-pink text-[9px] font-bold uppercase">
                    {item.domain}
                  </span>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-brand-card hover:bg-brand-card/85 text-xs font-bold text-brand-gold hover:text-white border border-white/10 transition-all text-center cursor-pointer active:scale-[0.98]"
                >
                  View Details & Tech Stack
                </button>
              </div>
            ))
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
        {activeModalItem && (
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
                    {activeModalItem.statement}
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
        )}

      </div>
    </section>
  );
}
