import React, { useState, useEffect } from 'react';
import { Award, Search, AlertCircle, ArrowLeft, Loader } from 'lucide-react';

const getThemeStyle = () => 'text-brand-gold bg-brand-gold/10 border-brand-gold/20';

const ITEMS_PER_PAGE = 15;

export default function ShortlistedTeams({ onViewChange }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [filterTheme, setFilterTheme] = useState('All');
  const [filterInstitute, setFilterInstitute] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/shortlisted-teams');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const allThemes = ['All', ...Array.from(new Set(data.map(d => d.theme))).sort()];
  const allInstitutes = ['All', ...Array.from(new Set(data.map(d => d.instituteName))).sort()];

  const filteredData = data.filter(item => {
    const sTerm = search.toLowerCase();
    const matchSearch = 
      (item.teamName || '').toLowerCase().includes(sTerm) || 
      (item.registrationId || '').toLowerCase().includes(sTerm) || 
      (item.instituteName || '').toLowerCase().includes(sTerm) || 
      (item.psNumber || '').toLowerCase().includes(sTerm) || 
      (item.psTitle || '').toLowerCase().includes(sTerm);

    const matchTheme = filterTheme === 'All' || item.theme === filterTheme;
    const matchInstitute = filterInstitute === 'All' || item.instituteName === filterInstitute;

    return matchSearch && matchTheme && matchInstitute;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterTheme, filterInstitute]);

  return (
    <div className="min-h-screen bg-brand-darker py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-12 text-left">
          <button 
            onClick={() => onViewChange('landing')}
            className="flex items-center text-[var(--marigold-deep)] hover:text-[var(--clay)] transition-colors mb-6 group w-fit font-bold text-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--marigold)]/15 border border-[var(--marigold)]/30 text-[var(--clay)] text-xs font-black uppercase tracking-widest mb-4 font-sans">
                <Award className="w-4 h-4 text-[var(--vermilion)]" />
                SIH 4.0 Selection Results
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[var(--clay)] mb-4 font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                Shortlisted Teams
              </h1>
              <p className="text-[var(--ink-soft)] text-base max-w-2xl font-sans font-medium">
                Congratulations to all the selected teams! Find your team below using the search or filter options.
              </p>
            </div>


            {/* Stats (from fetched data) */}
            {data.length > 0 && (
              <div className="flex items-center gap-4 bg-brand-card p-4 rounded-xl border border-brand-purple/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-gold">{data.length}</div>
                  <div className="text-xs text-brand-gray uppercase tracking-wider">Total Teams</div>
                </div>
                <div className="w-px h-10 bg-brand-purple/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-gold">{new Set(data.map(d => d.instituteName)).size}</div>
                  <div className="text-xs text-brand-gray uppercase tracking-wider">Institutions</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        {data.length > 0 && (
          <div className="bg-brand-card/50 backdrop-blur-sm border border-brand-purple/20 p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4">
            
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray" />
              <input
                type="text"
                placeholder="Search by Team, Registration ID, Institute, or PS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-brand-darker border border-brand-purple/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <select
                value={filterTheme}
                onChange={(e) => setFilterTheme(e.target.value)}
                className="bg-brand-darker border border-brand-purple/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none min-w-[200px]"
              >
                {allThemes.map((theme, index) => (
                  <option key={index} value={theme}>{theme}</option>
                ))}
              </select>
              
              <select
                value={filterInstitute}
                onChange={(e) => setFilterInstitute(e.target.value)}
                className="bg-brand-darker border border-brand-purple/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none min-w-[200px]"
              >
                {allInstitutes.map((institute, index) => (
                  <option key={index} value={institute}>{institute === 'All' ? 'All Institutes' : institute}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-4" />
            <p className="text-brand-gray">Loading shortlisted teams...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-[var(--clay)] mb-2 font-display">Error Loading Data</h3>
            <p className="text-[var(--ink-soft)] font-sans">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="py-24 text-center bg-[var(--panel)] border border-[var(--marigold)]/20 rounded-2xl">
            <Award className="w-16 h-16 text-[var(--marigold)] mx-auto mb-6 opacity-70" />
            <h3 className="text-2xl font-black text-white mb-3 font-display">Results Are Coming Soon!</h3>
            <p className="text-[var(--ink-faint)] max-w-lg mx-auto text-base font-sans">
              The evaluation process is currently underway. Please check back later for the official list of shortlisted teams.
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center bg-[var(--panel)] border border-[var(--marigold)]/20 rounded-2xl">
            <AlertCircle className="w-12 h-12 text-[var(--marigold)] mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-black text-white mb-2 font-display">No matches found</h3>
            <p className="text-[var(--ink-faint)] font-sans">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => { setSearch(''); setFilterTheme('All'); setFilterInstitute('All'); }}
              className="mt-6 px-6 py-2 bg-[var(--panel-soft)] border border-[var(--marigold)]/30 text-white rounded-lg hover:bg-[var(--marigold)] hover:text-[var(--panel)] transition-colors text-xs font-bold"
            >
              Clear all filters
            </button>
          </div>

        ) : (
          <div className="space-y-6">
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-brand-card/50 backdrop-blur-sm border border-brand-purple/20 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-purple/20 bg-brand-darker/50">
                    <th className="py-4 px-6 text-sm font-semibold text-brand-gray">S.No</th>
                    <th className="py-4 px-6 text-sm font-semibold text-brand-gray">Reg. ID</th>
                    <th className="py-4 px-6 text-sm font-semibold text-brand-gray">Team Details</th>
                    <th className="py-4 px-6 text-sm font-semibold text-brand-gray">Problem Statement</th>
                    <th className="py-4 px-6 text-sm font-semibold text-brand-gray">Institute</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-purple/10">
                  {currentData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 text-brand-gray font-mono">
                        {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                      </td>
                      <td className="py-4 px-6 text-brand-gold font-mono whitespace-nowrap">
                        {item.registrationId}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-base mb-1">{item.teamName}</div>
                        <div className="text-sm text-brand-gray flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                          Leader: {item.leaderName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20 whitespace-nowrap">
                            {item.psNumber}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${getThemeStyle(item.theme)}`}>
                            {item.theme}
                          </span>
                        </div>
                        <div className="text-sm text-white line-clamp-2 max-w-md" title={item.psTitle}>
                          {item.psTitle}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-brand-gray">
                        {item.instituteName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {currentData.map((item, idx) => (
                <div key={idx} className="bg-brand-card/50 backdrop-blur-sm border border-brand-purple/20 p-5 rounded-xl hover:border-brand-gold/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">{item.teamName}</h3>
                      <p className="text-sm text-brand-gray flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                        {item.leaderName}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded border border-brand-gold/20">
                      {item.registrationId}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-brand-darker/50 p-3 rounded-lg border border-brand-purple/10">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-white px-2 py-0.5 rounded bg-white/10">
                          {item.psNumber}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getThemeStyle(item.theme)}`}>
                          {item.theme}
                        </span>
                      </div>
                      <p className="text-sm text-brand-gray line-clamp-2">{item.psTitle}</p>
                    </div>

                    <div className="text-sm text-brand-gray border-t border-brand-purple/10 pt-3">
                      <span className="font-semibold text-white/50 block text-xs uppercase mb-1">Institute</span>
                      {item.instituteName}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-brand-card/30 p-4 rounded-xl border border-brand-purple/20">
                <p className="text-sm text-brand-gray text-center sm:text-left">
                  Showing <span className="text-white font-medium">{startIndex + 1}</span> to <span className="text-white font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}</span> of <span className="text-white font-medium">{filteredData.length}</span> entries
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-brand-darker border border-brand-purple/30 text-white rounded-lg disabled:opacity-50 hover:bg-brand-purple/20 transition-colors"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-brand-darker border border-brand-purple/30 text-white rounded-lg disabled:opacity-50 hover:bg-brand-purple/20 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
