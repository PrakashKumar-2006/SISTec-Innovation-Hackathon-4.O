import React from 'react';

// ── Official Partner & Association Badges Data with Real Image Logos ──
const ROW_1_PARTNERS = [
  {
    name: 'MPSEDC',
    sub: 'Infotech Engine of M.P.',
    logoImg: '/logo_mpsedc.jpg',
  },
  {
    name: 'M.P. Police',
    sub: 'Desh Bhakti - Jan Seva',
    logoImg: '/logo_mp_police.png',
  },
  {
    name: 'Cyber Police MP',
    sub: 'Madhya Pradesh Police',
    logoImg: '/logo_cyber_police.jpg',
  },
  {
    name: 'RGPV Bhopal',
    sub: 'Rajiv Gandhi University',
    logoImg: '/logo_rgpv.jpg',
  },
  {
    name: 'CSI India',
    sub: 'Computer Society of India',
    logoImg: '/logo_csi.jpg',
  },
  {
    name: 'The Kabadiwala',
    sub: 'Green Tech & Recycling',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-emerald-600 fill-current">
        <circle cx="50" cy="50" r="38" fill="currentColor" opacity="0.15"/>
        <text x="50" y="64" textAnchor="middle" fill="currentColor" fontSize="38" fontWeight="black" fontFamily="sans-serif">क</text>
      </svg>
    )
  }
];

const ROW_2_PARTNERS = [
  {
    name: 'B-NEST',
    sub: 'Incubation Centre',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-purple-600 fill-current">
        <path d="M20 70 L35 30 L50 60 L65 30 L80 70 Z" fill="none" stroke="currentColor" strokeWidth="10"/>
      </svg>
    )
  },
  {
    name: 'DRMZ Tech',
    sub: 'Green Tech Solutions',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-green-600 fill-current">
        <path d="M50 20 Q80 35 50 60 Q20 35 50 20 Z" fill="currentColor"/>
        <path d="M50 60 Q80 75 50 90 Q20 75 50 60 Z" fill="currentColor" opacity="0.6"/>
      </svg>
    )
  },
  {
    name: 'Cybrom',
    sub: 'Technology & Training',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-teal-600 fill-current">
        <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="160 40"/>
      </svg>
    )
  },
  {
    name: 'ITSC Tech',
    sub: 'Pvt. Ltd. Estd 1999',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-red-600 fill-current">
        <rect x="15" y="25" width="70" height="50" rx="6" fill="none" stroke="currentColor" strokeWidth="8"/>
        <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="20" fontWeight="bold">ITSC</text>
      </svg>
    )
  },
  {
    name: 'Bank of Baroda',
    sub: 'Financial Partner',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-orange-500 fill-current">
        <path d="M20 20 L50 80 L80 20 L50 50 Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Institution’s Innovation Council',
    sub: 'Ministry of Education',
    icon: (
      <svg viewBox="0 0 100 100" className="w-5 h-5 text-amber-500 fill-current">
        <circle cx="35" cy="40" r="14" fill="currentColor"/>
        <circle cx="65" cy="40" r="14" fill="currentColor"/>
        <path d="M30 65 Q50 85 70 65" fill="none" stroke="currentColor" strokeWidth="10"/>
      </svg>
    )
  }
];

export default function PartnerMarquee() {
  // Duplicate arrays to create continuous 100% infinite marquee loop
  const listRow1 = [...ROW_1_PARTNERS, ...ROW_1_PARTNERS, ...ROW_1_PARTNERS];
  const listRow2 = [...ROW_2_PARTNERS, ...ROW_2_PARTNERS, ...ROW_2_PARTNERS];

  return (
    <section className="relative bg-[#FAF6EE] py-10 sm:py-14 overflow-hidden border-y border-[#E3D7C5] select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C3A16]/10 border border-[#8C3A16]/25 text-[#8C3A16] text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#8C3A16] animate-pulse"></span>
          <span>Associations &amp; Incubation Partners</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-black text-[#241708] uppercase tracking-tight font-display" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Supported &amp; Powered By Industry Leaders
        </h3>
        <p className="text-[#6B5B49] text-xs sm:text-sm font-semibold max-w-2xl mx-auto mt-1">
          Collaborating with leading government bodies, university ecosystems, and technology enterprises.
        </p>
      </div>

      {/* Infinite Marquee Sliders Container */}
      <div className="relative w-full space-y-3.5 sm:space-y-4 overflow-hidden">
        {/* Left & Right Vignette Shadows for Soft Fade Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF6EE] via-[#FAF6EE]/80 to-transparent z-20 pointer-events-none"></div>

        {/* ── ROW 1: Sliding Left (Featured Government & University Logos) ── */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-3 sm:gap-4">
            {listRow1.map((partner, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#FFFDF7] border-2 border-[#E3D7C5] hover:border-[#8C3A16] shadow-sm hover:shadow-md flex items-center gap-3 shrink-0 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
              >
                {/* Logo Image or Fallback SVG Icon */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-[#E3D7C5] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                  {partner.logoImg ? (
                    <img 
                      src={partner.logoImg} 
                      alt={partner.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    partner.icon
                  )}
                </div>
                <div className="min-w-0 pr-1">
                  <p className="text-xs sm:text-sm font-black text-[#241708] leading-tight font-display group-hover:text-[#8C3A16] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {partner.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-[#6B5B49] truncate max-w-[130px] sm:max-w-[170px] mt-0.5">
                    {partner.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2: Sliding Right (Incubation & Tech Partners) ── */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-3 sm:gap-4">
            {listRow2.map((partner, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#FFFDF7] border-2 border-[#E3D7C5] hover:border-[#8C3A16] shadow-sm hover:shadow-md flex items-center gap-3 shrink-0 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-[#E3D7C5] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                  {partner.logoImg ? (
                    <img 
                      src={partner.logoImg} 
                      alt={partner.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    partner.icon
                  )}
                </div>
                <div className="min-w-0 pr-1">
                  <p className="text-xs sm:text-sm font-black text-[#241708] leading-tight font-display group-hover:text-[#8C3A16] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {partner.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-[#6B5B49] truncate max-w-[130px] sm:max-w-[170px] mt-0.5">
                    {partner.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
