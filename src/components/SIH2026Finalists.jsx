import React, { useState } from 'react';
import { ArrowLeft, Search, Sparkles, Users, Award, AlertCircle, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

// MOCK DATA - Your team member can replace this array with a state populated from API fetch.
// If this array is empty (i.e. []), the component will automatically show the "Coming Soon" screen!
const mockFinalists = [
  { 
    sNo: 1,  
    psCode: 'AG-04',          
    leader: 'Aarav Sharma',          
    team: 'Pixel Pioneers',          
    college: 'Sagar Institute of Science and Technology (SISTec-R), Ratibad Bhopal',                      
    theme: 'AgriTech',                          
    problem: 'AI-based Smart Crop Disease Detection & Irrigation System for small-scale marginal farmers.' 
  },
  { 
    sNo: 2,  
    psCode: 'FT-12',           
    leader: 'Ananya Iyer',     
    team: 'Fintech Wizards',               
    college: 'Vellore Institute of Technology (VIT), Vellore',                
    theme: 'Fintech & Web3',                        
    problem: 'Decentralized Micro-lending platform using smart contracts to eliminate intermediaries.' 
  },
  { 
    sNo: 3,  
    psCode: 'HT-09',           
    leader: 'Kabir Verma',     
    team: 'MedSync AI',               
    college: 'Indian Institute of Information Technology (IIIT), Pune',                      
    theme: 'HealthTech',                        
    problem: 'Real-time USG Report Analysis System using Deep Learning models to assist doctors in remote clinics.' 
  },
  { 
    sNo: 4,  
    psCode: 'UM-05',           
    leader: 'Diya Patel',         
    team: 'EcoGrid Solutions',             
    college: 'Delhi Technological University (DTU), Delhi',                        
    theme: 'Urban Mobility',                
    problem: 'Dynamic IoT-enabled Traffic Light Synchronization System for high-congestion metro areas.' 
  },
  { 
    sNo: 5,  
    psCode: 'ET-18',           
    leader: 'Rohan Deshmukh',                  
    team: 'Classroom VR',            
    college: 'SISTec-E, Ratibad Bhopal',                        
    theme: 'EduTech',                          
    problem: 'Interactive AR/VR educational modules for immersive science laboratory learning in rural schools.' 
  }
];

export default function SIH2026Finalists({ onViewChange, onRegisterClick }) {
  // If your team member connects the backend, they can initialize this state as:
  // const [finalists, setFinalists] = useState([]);
  // And fetch data inside a useEffect hook.
  const [finalists, setFinalists] = useState(mockFinalists);
  const [search, setSearch] = useState('');
  const [filterTheme, setFilterTheme] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Render Coming Soon screen if there are no teams in the array
  const hasTeams = finalists.length > 0;

  // Filter Logic
  const filteredData = finalists.filter((item) => {
    const matchesSearch =
      item.team.toLowerCase().includes(search.toLowerCase()) ||
      item.leader.toLowerCase().includes(search.toLowerCase()) ||
      item.college.toLowerCase().includes(search.toLowerCase()) ||
      item.psCode.toLowerCase().includes(search.toLowerCase());

    const matchesTheme = filterTheme === 'All' || item.theme === filterTheme;

    return matchesSearch && matchesTheme;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Dynamic lists for filters & stats
  const allThemes = ['All', ...Array.from(new Set(finalists.map(d => d.theme))).sort()];
  const uniqueColleges = Array.from(new Set(finalists.map(d => d.college))).length;
  const uniquePsCodes = Array.from(new Set(finalists.map(d => d.psCode))).length;

  if (!hasTeams) {
    // ── FALLBACK COMING SOON VIEW (If finalists array is empty) ──
    return (
      <section className="relative min-h-screen bg-brand-darker pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="w-full max-w-lg mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <circle cx="100" cy="100" r="85" fill="none" stroke="#D8AB55" strokeWidth="1" strokeDasharray="4 8" className="opacity-30" />
              <circle cx="100" cy="100" r="22" fill="#06B6D4" className="opacity-5" />
              <g className="svg-orbit-container">
                <line x1="100" y1="50" x2="150" y2="135" stroke="#06B6D4" strokeWidth="2" strokeDasharray="8 6" />
                <line x1="150" y1="135" x2="50" y2="135" stroke="#D8AB55" strokeWidth="2" strokeDasharray="8 6" />
                <line x1="50" y1="135" x2="100" y2="50" stroke="#06B6D4" strokeWidth="2" strokeDasharray="8 6" />
                <circle cx="100" cy="50" r="14" fill="#0D0D11" stroke="#06B6D4" strokeWidth="2.5" />
                <circle cx="150" cy="135" r="14" fill="#0D0D11" stroke="#D8AB55" strokeWidth="2.5" />
                <circle cx="50" cy="135" r="14" fill="#0D0D11" stroke="#06B6D4" strokeWidth="2.5" />
              </g>
              <g transform="translate(88, 88)" className="opacity-90">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="#D8AB55" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" fill="none" stroke="#D8AB55" strokeWidth="1.8" />
              </g>
            </svg>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-black uppercase tracking-widest animate-pulse">
              <Sparkles size={11} /> Selection Underway
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white uppercase">Grand Finale</h2>
            <h3 className="text-sm sm:text-base font-extrabold text-brand-gold uppercase tracking-[0.2em] font-sans">SIH 4.O Finalist Teams</h3>
            <p className="text-brand-gray text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium">
              Registrations are currently active! Once evaluations are complete, the official list of shortlisted teams qualified for the Grand Finale of SIH 4.O will be published here.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
            <button onClick={() => onViewChange('landing')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
              <ArrowLeft size={14} /> Back to Home
            </button>
            <button onClick={onRegisterClick} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-btn-gradient text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-orange-950/15">
              Register Team
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── ACTIVE LIVE TABLE VIEW (When finalists array contains data) ──
  return (
    <section className="relative min-h-screen bg-brand-darker pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-brand-pink/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Back navigation */}
        <button
          onClick={() => onViewChange('landing')}
          className="mb-8 px-4 py-2 rounded-xl bg-brand-card/50 backdrop-blur-md border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-brand-gold text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-left mb-10">
          <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-gold font-sans uppercase mb-3 flex items-center gap-2">
            <Award size={14} className="text-brand-gold animate-pulse" />
            Qualified Teams
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none mb-3">
            SIH 4.O <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-amber-500 bg-clip-text text-transparent">Grand Finale Teams</span>
          </h1>
          <p className="text-brand-gray text-xs sm:text-sm max-w-2xl leading-relaxed">
            The official shortlist of teams selected for the Grand Finale of SISTec Innovation Hackathon 4.O. Use the search bar and filters below to browse teams, problem statements, and ideas.
          </p>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-brand-card/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:border-brand-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{filteredData.length}</div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Teams</div>
            </div>
          </div>
          <div className="bg-brand-card/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:border-brand-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{uniqueColleges}</div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Institutions</div>
            </div>
          </div>
          <div className="bg-brand-card/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:border-brand-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-pink/10 text-brand-pink border border-brand-pink/20 flex items-center justify-center shrink-0">
              <AlertCircle size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{uniquePsCodes}</div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Problem Statements</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-brand-card/25 border border-white/5 p-4 rounded-2xl">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search team, leader, college, or PS code..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#0D0D11]/60 text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-brand-gold/60 focus:outline-none text-xs sm:text-sm font-semibold transition-colors placeholder:text-slate-500"
            />
          </div>

          {/* Theme Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Theme:</span>
            <select
              value={filterTheme}
              onChange={(e) => {
                setFilterTheme(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#0D0D11]/60 text-slate-300 border border-white/10 hover:border-brand-gold/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-brand-gold transition-colors cursor-pointer"
            >
              {allThemes.map((theme) => (
                <option key={theme} value={theme} className="bg-[#0D0D11] text-slate-300">
                  {theme === 'All' ? 'All Themes' : theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Table / Grid Layouts ── */}
        {paginatedData.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-brand-card/30 backdrop-blur-md shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-card/90 border-b border-white/10">
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[6%] text-center">S.No</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[10%]">PS Code</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[15%]">Team Name</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[15%]">Team Leader</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[22%]">Institution / College</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[12%]">Theme</th>
                    <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-wider w-[20%]">Problem Statement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedData.map((item, index) => (
                    <tr 
                      key={item.sNo} 
                      className="hover:bg-white/3 transition-colors group"
                    >
                      <td className="py-4 px-4 text-xs font-mono text-slate-400 text-center font-bold">
                        {startIndex + index + 1}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block font-mono text-[10px] sm:text-xs font-black text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded uppercase">
                          {item.psCode}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white text-xs sm:text-sm font-extrabold group-hover:text-brand-gold transition-colors">
                          {item.team}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-300 font-bold">
                        {item.leader}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-300 font-semibold leading-relaxed max-w-[220px] truncate" title={item.college}>
                        {item.college}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[10px] font-bold text-[#06B6D4] whitespace-nowrap">
                          {item.theme}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-400 leading-relaxed max-w-[320px] whitespace-normal">
                        {item.problem}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {paginatedData.map((item, index) => (
                <div 
                  key={item.sNo} 
                  className="bg-brand-card/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg space-y-4 hover:border-brand-gold/30 transition-all text-left relative group"
                >
                  <div className="absolute top-4 right-4 text-xs font-mono text-slate-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    #{startIndex + index + 1}
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block font-mono text-[9px] font-black text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded uppercase">
                      {item.psCode}
                    </span>
                    <h3 className="text-white text-base font-extrabold group-hover:text-brand-gold transition-colors pt-1">
                      {item.team}
                    </h3>
                    <p className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                      <span className="text-slate-500">Leader:</span> {item.leader}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2.5">
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Institution / College</div>
                      <p className="text-slate-300 text-xs font-semibold leading-relaxed mt-0.5">{item.college}</p>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1">Theme</div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[9px] font-bold text-[#06B6D4]">
                        {item.theme}
                      </span>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Problem Statement</div>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">{item.problem}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4 mt-8 bg-brand-card/25 border border-white/5 p-4 rounded-xl">
                <span className="text-slate-400 text-xs font-bold">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-xl bg-[#0D0D11]/60 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === i + 1
                          ? 'bg-brand-gold text-brand-card font-black border border-brand-gold'
                          : 'bg-[#0D0D11]/60 text-slate-300 border border-white/10 hover:border-brand-gold/40'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-xl bg-[#0D0D11]/60 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Search Fallback */
          <div className="bg-brand-card/45 border border-white/10 rounded-2xl p-12 text-center shadow-lg">
            <HelpCircle size={44} className="text-brand-gold mx-auto mb-4 animate-bounce" />
            <h3 className="text-white text-lg font-extrabold mb-1">No Teams Found</h3>
            <p className="text-brand-gray text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              No finalist teams matched your search queries or selected theme filter. Try revising your query.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
