import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { Search, X, Building2, Cpu, Sparkles, AlertCircle, Filter, Tag, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, LayoutGrid, ListFilter } from 'lucide-react';
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

// Default Fallback Problem Statements
const fallbackProblemStatements = [
  {
    sNo: 1,
    psNumber: 'WE-01',
    org: 'Ministry of Women and Child Development',
    title: 'Women Safety & Emergency Response Platform',
    statement: 'AI-driven real-time emergency alert and geo-tracking safety platform for women in urban and rural environments.',
    category: 'Software',
    domain: 'Women Empowerment',
    detailedDescription: 'Develop an intelligent mobile & web application with offline SOS capability, automated audio recording, and live route safety score analysis.',
    techStack: 'React Native, Node.js, TensorFlow, WebSockets, MongoDB'
  },
  {
    sNo: 2,
    psNumber: 'PS001',
    org: 'Ministry of Education',
    title: 'AI-based Smart Attendance & Engagement System',
    statement: 'Automated facial recognition & emotion-tracking attendance system for schools and colleges.',
    category: 'Software',
    domain: 'Artificial Intelligence',
    detailedDescription: 'Build an automated classroom attendance monitoring system with fraud prevention and attendance analytics dashboard for faculty.',
    techStack: 'Python, OpenCV, PyTorch, React, FastApi'
  },
  {
    sNo: 3,
    psNumber: 'PS004',
    org: 'Ministry of Health and Family Welfare',
    title: 'Real-time Disease Outbreak Prediction Platform',
    statement: 'Predictive analytics portal for early detection of vector-borne disease outbreaks using epidemic models.',
    category: 'Software',
    domain: 'Healthcare',
    detailedDescription: 'Integrate hospital data feeds, weather data, and geographical indicators to generate early warning heatmaps for municipal authorities.',
    techStack: 'Python, SciPy, Leaflet.js, PostgreSQL, Docker'
  },
  {
    sNo: 4,
    psNumber: 'PS006',
    org: 'Municipal Corporation of Bhopal',
    title: 'Smart Waste Segregation and Collection System',
    statement: 'IoT-enabled smart bin monitoring & automated route optimization for municipal garbage collectors.',
    category: 'Hardware/Software',
    domain: 'Environment',
    detailedDescription: 'Ultrasonic sensor-based bin fill-level monitoring with real-time route optimization software for municipal garbage trucks.',
    techStack: 'ESP32, Arduino, MQTT, Node.js, React, Google Maps API'
  },
  {
    sNo: 5,
    psNumber: 'PS008',
    org: 'Smart City Mission',
    title: 'Digital Twin for Traffic Management',
    statement: 'Computer vision-based adaptive traffic signal control system for high-density junctions.',
    category: 'Software',
    domain: 'Urban Planning',
    detailedDescription: 'Dynamically adjust signal timings based on real-time vehicle density detected through traffic surveillance cameras.',
    techStack: 'YOLOv8, OpenCV, Python, Redis, React Dashboard'
  },
  {
    sNo: 6,
    psNumber: 'PS007',
    org: 'Ministry of Electronics and IT (MeitY)',
    title: 'Cybersecurity Threat Detection for Government Portals',
    statement: 'Automated vulnerability scanner and intrusion detection system for public infrastructure APIs.',
    category: 'Software',
    domain: 'Cybersecurity',
    detailedDescription: 'Real-time anomaly detection engine to identify SQL injection, DDoS attempts, and unauthorized API data extraction.',
    techStack: 'Go, ELK Stack, Snort, React, GraphQL'
  },
  {
    sNo: 7,
    psNumber: 'PS009',
    org: 'Department of Agriculture & Farmers Welfare',
    title: 'AI Crop Disease Diagnosis & Soil Health Assistant',
    statement: 'Mobile image analysis app for instant crop pest/disease identification and fertilizer recommendation.',
    category: 'Software',
    domain: 'Agriculture',
    detailedDescription: 'Allows farmers to take a picture of infected crop leaves to receive instant AI diagnosis in regional languages with treatment steps.',
    techStack: 'Flutter, TensorFlow Lite, Python, AWS Lambda'
  },
  {
    sNo: 8,
    psNumber: 'PS010',
    org: 'Ministry of Power & Renewable Energy',
    title: 'Smart Microgrid Power Distribution & Solar Optimization',
    statement: 'Grid load balancing and rooftop solar energy trading marketplace for residential communities.',
    category: 'Hardware/Software',
    domain: 'Smart Grid',
    detailedDescription: 'Peer-to-peer energy trading platform connecting solar panel owners with local grid consumers using smart meters.',
    techStack: 'Solidity, Web3.js, Node.js, React, Raspberry Pi'
  }
];

export default function ProblemStatements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [mobileViewMode, setMobileViewMode] = useState('slider'); // 'slider' | 'compact'
  const [mobileIndex, setMobileIndex] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['publicProblemStatements'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/public/problem-statements`, { timeout: 3000 });
        if (response.data && response.data.data && response.data.data.length > 0) {
          return response.data.data;
        }
      } catch (e) {
        console.warn('API offline or empty, using fallback problem statements', e);
      }
      return fallbackProblemStatements;
    }
  });

  const problemStatements = data && data.length > 0 ? data : fallbackProblemStatements;
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--clay)] font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            SIH 4.0 <span className="text-[var(--marigold-deep)]">National Challenges</span>
          </h1>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-2xl font-sans">
            Browse through active problem statements submitted by state corporations, municipal bodies, and corporate partners. Filter, search, and align your team to win.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3A16]"></div>
          </div>
        )}

        {/* Filters and Grid */}
        {!isLoading && (
          <>
            {/* Uniform Filters Dashboard */}
            <div 
              style={{ animationDelay: '100ms' }}
              className="p-6 rounded-[2rem] bg-[#FAF6EE] border border-[#E3D7C5] shadow-md mb-10"
            >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Search Input Box */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-xs font-black text-[#8C3A16] tracking-wider uppercase pl-1 flex items-center gap-1.5 font-sans">
                <Search size={14} className="text-[#8C3A16]" /> Search Challenges
              </label>
              <div className="relative h-12 rounded-2xl bg-[#FFFDF7] border border-[#E3D7C5] flex items-center px-4 transition-all focus-within:border-[#8C3A16] focus-within:ring-2 focus-within:ring-[#8C3A16]/10 shadow-2xs">
                <Search className="text-[#8C3A16] mr-2.5 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="PS number, keyword, organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-[#241708] font-bold placeholder-[#6B5B49] focus:outline-none"
                />
              </div>
            </div>

            {/* Category Select Dropdown */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-xs font-black text-[#8C3A16] tracking-wider uppercase pl-1 flex items-center gap-1.5 font-sans">
                <Tag size={14} className="text-[#8C3A16]" /> Category Type
              </label>
              <div className="relative h-12 rounded-2xl bg-[#FFFDF7] border border-[#E3D7C5] flex items-center px-4 transition-all focus-within:border-[#8C3A16] focus-within:ring-2 focus-within:ring-[#8C3A16]/10 shadow-2xs">
                <Filter className="text-[#8C3A16] mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-[#241708] font-extrabold focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#FFFDF7] text-[#241708]">All Categories</option>
                  <option value="Software" className="bg-[#FFFDF7] text-[#241708]">Software</option>
                  <option value="Hardware" className="bg-[#FFFDF7] text-[#241708]">Hardware</option>
                  <option value="Hardware/Software" className="bg-[#FFFDF7] text-[#241708]">Hardware/Software</option>
                </select>
              </div>
            </div>

            {/* Domain Dropdown Select */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-xs font-black text-[#8C3A16] tracking-wider uppercase pl-1 flex items-center gap-1.5 font-sans">
                <Cpu size={14} className="text-[#8C3A16]" /> Domain Bucket
              </label>
              <div className="relative h-12 rounded-2xl bg-[#FFFDF7] border border-[#E3D7C5] flex items-center px-4 transition-all focus-within:border-[#8C3A16] focus-within:ring-2 focus-within:ring-[#8C3A16]/10 shadow-2xs">
                <Cpu className="text-[#8C3A16] mr-2.5 shrink-0" size={14} />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-[#241708] font-extrabold focus:outline-none cursor-pointer"
                >
                  {uniqueDomains.map((dom, dIdx) => (
                    <option key={dIdx} value={dom} className="bg-[#FFFDF7] text-[#241708]">
                      {dom === 'All' ? 'All Domains' : dom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>


        {/* Desktop Table View */}
        <div className="hidden md:block rounded-[2rem] bg-[#FFFDF7] border border-[#E3D7C5] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#E3D7C5] bg-[#FAF6EE]">
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-20 text-[#8C3A16] font-display">
                    S. No.
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-64 text-[#8C3A16] font-display">
                    Organization
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider max-w-sm text-[#8C3A16] font-display">
                    Problem Statement
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-32 text-[#8C3A16] font-display">
                    PS Number
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-44 text-[#8C3A16] font-display">
                    Category
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-48 text-[#8C3A16] font-display">
                    Domain Bucket
                  </th>
                  <th className="px-6 py-4.5 text-[11px] font-black uppercase tracking-wider w-44 text-center text-[#8C3A16] font-display">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EBDAB9]">
                {filteredStatements.length > 0 ? (
                  filteredStatements.map((item, idx) => (
                    <tr 
                      key={idx}
                      className="hover:bg-[#8C3A16]/5 transition-colors duration-200 group"
                    >
                      {/* S.No */}
                      <td className="px-6 py-5 text-sm font-black text-[#8C3A16] font-mono">
                        {idx + 1}
                      </td>

                      {/* Sponsoring Organization */}
                      <td className="px-6 py-5 text-xs text-[#241708] font-extrabold leading-relaxed max-w-[240px]">
                        {item.org || item.sponsoringOrg || item.organization || 'N/A'}
                      </td>

                      {/* Problem Statement */}
                      <td className="px-6 py-5 text-xs text-[#5C230C] font-semibold leading-relaxed max-w-md">
                        <span className="block border-l-2 border-[#C97F1B] pl-3">
                          {item.title || item.statement || item.problemStatement || item.description || item.detailedDescription || 'N/A'}
                        </span>
                      </td>

                      {/* PS Number */}
                      <td className="px-6 py-5 text-xs font-mono">
                        <span className="bg-[#FFE8D6] text-[#8C3A16] px-2.5 py-1 rounded-md border border-[#E3D7C5] font-black inline-block shadow-2xs">
                          {item.psNumber}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-xs text-[#6B5B49] font-bold">
                        {item.category}
                      </td>

                      {/* Domain Bucket */}
                      <td className="px-6 py-5 text-xs text-[#8C3A16] font-black">
                        {item.domain}
                      </td>

                      {/* Action View Details */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#FFE8D6] text-[#8C3A16] hover:bg-[#8C3A16] hover:!text-white font-black text-xs border border-[#E3D7C5] transition-all cursor-pointer shadow-2xs hover:scale-105"
                        >
                          View Description
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-[#6B5B49]">
                        <AlertCircle size={32} className="text-[#8C3A16] animate-bounce" />
                        <p className="font-mono text-sm font-bold text-[#8C3A16]">No matching problem statements found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View Section (Optimized to eliminate long vertical scrolling) */}
        <div className="md:hidden flex flex-col gap-4">
          
          {/* Mobile View Controls & Mode Switcher Bar */}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#E3D7C5] p-1 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setMobileViewMode('slider')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  mobileViewMode === 'slider'
                    ? 'bg-[#8C3A16] text-white shadow-sm'
                    : 'text-[#6B5B49] hover:text-[#241708]'
                }`}
              >
                <LayoutGrid size={13} /> Card Slider
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('compact')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  mobileViewMode === 'compact'
                    ? 'bg-[#8C3A16] text-white shadow-sm'
                    : 'text-[#6B5B49] hover:text-[#241708]'
                }`}
              >
                <ListFilter size={13} /> Compact List
              </button>
            </div>

            {filteredStatements.length > 0 && (
              <span className="text-xs font-mono font-extrabold text-[#8C3A16] bg-[#FFE8D6] px-2.5 py-1 rounded-lg border border-[#E3D7C5] shadow-2xs">
                {mobileViewMode === 'slider' ? `${Math.min(mobileIndex + 1, filteredStatements.length)} / ${filteredStatements.length}` : `${filteredStatements.length} Total`}
              </span>
            )}
          </div>

          {/* Conditional Mobile View Content */}
          {filteredStatements.length > 0 ? (
            mobileViewMode === 'slider' ? (
              /* Option 1: Card Slider View (1 card at a time, zero vertical scrolling) */
              <div className="flex flex-col gap-3.5">
                {(() => {
                  const activeIdx = Math.max(0, Math.min(filteredStatements.length - 1, mobileIndex));
                  const item = filteredStatements[activeIdx];
                  if (!item) return null;

                  return (
                    <div 
                      key={activeIdx}
                      className="p-5 rounded-2xl bg-[#FFFDF7] border-2 border-[#8C3A16]/30 shadow-xl flex flex-col gap-3.5 relative overflow-hidden transition-all text-left animate-fade-in"
                    >
                      {/* Header: S.No & PS Number badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-extrabold text-[#6B5B49]">#{item.sNo || activeIdx + 1}</span>
                        <span className="px-3 py-1 rounded-lg bg-[#FFE8D6] border border-[#E3D7C5] font-mono text-xs font-black text-[#8C3A16] tracking-wider shadow-2xs">
                          {item.psNumber || item.ps_number || item.code}
                        </span>
                      </div>

                      {/* Sponsoring Org */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black tracking-widest text-[#8C3A16] uppercase">Sponsoring Org</span>
                        <h3 className="text-sm font-extrabold text-[#5C230C] leading-snug">
                          {item.org || item.sponsoringOrg || item.organization || 'N/A'}
                        </h3>
                      </div>

                      {/* Problem Statement Preview */}
                      <div className="space-y-1.5 pt-2 border-t border-[#E3D7C5]/60">
                        <span className="text-[9px] font-black tracking-widest text-[#8C3A16] uppercase flex items-center gap-1">
                          <Sparkles size={10} className="text-[#8C3A16] shrink-0 animate-pulse" /> Problem Statement
                        </span>
                        <div className="pl-3 border-l-2 border-[#C97F1B] bg-[#FAF6EE] p-3 rounded-r-xl">
                          <p className="text-xs text-[#241708] font-extrabold leading-relaxed break-words text-left">
                            {item.title || item.statement || item.problemStatement || item.description || item.detailedDescription || 'Problem Statement Details Available'}
                          </p>
                          {item.title && item.statement && item.title !== item.statement && (
                            <p className="text-[11px] text-[#6B5B49] font-medium leading-relaxed mt-1 break-words text-left">
                              {item.statement}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Categories / Info Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3D7C5]/60">
                        <span className="px-2.5 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FAF6EE] text-[#6B5B49] text-[9px] font-black uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FFE8D6] text-[#8C3A16] text-[9px] font-black uppercase tracking-wider">
                          {item.domain}
                        </span>
                      </div>

                      {/* Action button */}
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-[#8C3A16] via-[#A64B1E] to-[#C97F1B] text-xs font-black text-white transition-all text-center cursor-pointer active:scale-[0.98] shadow-md border-none"
                      >
                        View Details & Tech Stack →
                      </button>
                    </div>
                  );
                })()}

                {/* Slider Navigation Controls & Indicator Dots */}
                <div className="flex items-center justify-between gap-3 px-1 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileIndex(prev => Math.max(0, prev - 1))}
                    disabled={mobileIndex === 0}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] text-[#8C3A16] disabled:opacity-40 disabled:cursor-not-allowed font-extrabold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-[140px] px-1 no-scrollbar">
                    {filteredStatements.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMobileIndex(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === mobileIndex ? 'w-6 bg-[#8C3A16]' : 'w-2 bg-[#E3D7C5]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileIndex(prev => Math.min(filteredStatements.length - 1, prev + 1))}
                    disabled={mobileIndex >= filteredStatements.length - 1}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] text-[#8C3A16] disabled:opacity-40 disabled:cursor-not-allowed font-extrabold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Option 2: Compact Accordion List View (Ultra compact rows) */
              <div className="flex flex-col gap-2.5">
                {filteredStatements.map((item, idx) => {
                  const isExpanded = expandedRow === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#FFFDF7] border border-[#E3D7C5] shadow-2xs overflow-hidden transition-all text-left"
                    >
                      {/* Compact Header Row */}
                      <div
                        onClick={() => setExpandedRow(isExpanded ? null : idx)}
                        className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF6EE] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="px-2 py-0.5 rounded bg-[#FFE8D6] border border-[#E3D7C5] font-mono text-[10px] font-black text-[#8C3A16] shrink-0">
                            {item.psNumber || item.ps_number || item.code}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-extrabold text-[#241708] truncate">
                              {item.title || item.statement || item.problemStatement}
                            </h4>
                            <p className="text-[10px] text-[#6B5B49] font-medium truncate mt-0.5">
                              {item.org || item.sponsoringOrg}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FAF6EE] text-[#8C3A16] text-[9px] font-black uppercase">
                            {item.category}
                          </span>
                          {isExpanded ? (
                            <ChevronUp size={18} className="text-[#8C3A16]" />
                          ) : (
                            <ChevronDown size={18} className="text-[#8C3A16]" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="p-4 border-t border-[#E3D7C5]/60 bg-[#FAF6EE]/50 flex flex-col gap-3 animate-fade-in">
                          <div className="space-y-1">
                            <span className="text-[9px] font-black tracking-widest text-[#8C3A16] uppercase">Sponsoring Organization</span>
                            <p className="text-xs font-bold text-[#5C230C]">{item.org || item.sponsoringOrg}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-black tracking-widest text-[#8C3A16] uppercase">Problem Statement</span>
                            <p className="text-xs text-[#241708] font-semibold leading-relaxed bg-[#FFFDF7] p-2.5 rounded-xl border-l-2 border-[#C97F1B]">
                              {item.statement || item.title || item.detailedDescription}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex gap-1.5">
                              <span className="px-2 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FAF6EE] text-[#6B5B49] text-[9px] font-black uppercase">
                                {item.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FFE8D6] text-[#8C3A16] text-[9px] font-black uppercase">
                                {item.domain}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalItem(item);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#8C3A16] text-white text-xs font-black cursor-pointer shadow-2xs hover:bg-[#6B3213]"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="py-14 text-center rounded-2xl bg-[#FFFDF7] border border-dashed border-[#E3D7C5]">
              <div className="flex flex-col items-center gap-3 text-[#6B5B49]">
                <AlertCircle size={28} className="text-[#8C3A16] animate-bounce" />
                <p className="font-mono text-xs font-bold text-[#8C3A16]">No matching problem statements found.</p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Modal Overlay */}
        {activeModalItem && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-[#FFFDF7]/92 backdrop-blur-lg"
              onClick={() => setActiveModalItem(null)}
            ></div>
            
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FFFDF7] border-2 border-[#8C3A16] shadow-2xl p-6 md:p-8 z-10 text-left animate-fade-in custom-scrollbar">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8C3A16] via-[#C97F1B] to-[#F2A93B]"></div>

              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#FFE8D6] hover:bg-[#8C3A16] hover:!text-white border border-[#E3D7C5] text-[#8C3A16] transition-all cursor-pointer group shadow-2xs hover:scale-105"
              >
                <X size={18} className="text-[#8C3A16] group-hover:!text-white transition-colors" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-6 mt-2">
                <span className="px-3 py-1 rounded-lg bg-[#FFE8D6] border border-[#E3D7C5] font-mono text-xs font-black text-[#8C3A16] tracking-wide">
                  PS Number: {activeModalItem.psNumber}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FAF6EE] text-[#6B5B49] text-[10px] font-black uppercase">
                  {activeModalItem.category}
                </span>
                <span className="px-3 py-0.5 rounded-full border border-[#E3D7C5] bg-[#FFE8D6] text-[#8C3A16] text-[10px] font-black uppercase">
                  {activeModalItem.domain}
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-black tracking-widest text-[#8C3A16] uppercase">Sponsoring Organization</h4>
                  <div className="flex items-center gap-2.5 text-base font-extrabold text-[#5C230C]">
                    <span>{activeModalItem.org || activeModalItem.sponsoringOrg || activeModalItem.organization || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black tracking-widest text-[#8C3A16] uppercase flex items-center gap-1">
                    <Sparkles size={10} className="text-[#8C3A16] shrink-0" /> Problem Statement Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-[#241708] font-semibold leading-relaxed bg-[#FAF6EE] p-4 rounded-2xl border-l-4 border-[#C97F1B] border-y border-r border-[#E3D7C5]">
                    {activeModalItem.title || activeModalItem.statement || activeModalItem.problemStatement || activeModalItem.description || activeModalItem.detailedDescription || 'N/A'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-black tracking-widest text-[#8C3A16] uppercase">Detailed Scope & Requirements</h4>
                  <p className="text-xs sm:text-sm text-[#6B5B49] leading-relaxed font-medium">
                    {activeModalItem.detailedDescription}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-[#E3D7C5]/60">
                  <h4 className="text-[10px] font-black tracking-widest text-[#8C3A16] uppercase">Suggested Technologies</h4>
                  <p className="text-xs font-mono font-extrabold text-[#8C3A16] tracking-wide">
                    {activeModalItem.techStack}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8C3A16] via-[#A64B1E] to-[#C97F1B] text-sm font-black text-white shadow-lg active:scale-95 transition-all cursor-pointer border-none"
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
