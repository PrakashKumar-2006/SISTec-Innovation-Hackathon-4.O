import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import SIH2023Winners from './SIH2023Winners';
import SIH2024Winners from './SIH2024Winners';
import SIH2025Winners from './SIH2025Winners';

export default function PreviousSIH({ onViewChange }) {
  const [activeEdition, setActiveEdition] = useState('3.0'); // Default to SIH 3.0 (2025)

  const editions = [
    {
      id: '1.0',
      title: 'SIH 1.0',
      year: '2023',
      label: 'SIH 1.0 (2023)',
      subtitle: 'First Edition Grand Finale Winners & Moments'
    },
    {
      id: '2.0',
      title: 'SIH 2.0',
      year: '2024',
      label: 'SIH 2.0 (2024)',
      subtitle: 'Second Edition Winners & Innovation Highlights'
    },
    {
      id: '3.0',
      title: 'SIH 3.0',
      year: '2025',
      label: 'SIH 3.0 (2025)',
      subtitle: 'Third Edition Grand Champions & Podium Gallery'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark tech-grid-dense pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-[#241708] relative overflow-hidden">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C97F1B]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#8C3A16]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#241708] font-display mb-3" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Previous Editions of <span className="text-[#C97F1B]">SIH</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6B5B49] font-medium leading-relaxed">
            Explore past hackathon editions, view winner podium photos, and relive glorious moments from SIH 1.0, SIH 2.0, and SIH 3.0.
          </p>
        </div>

        {/* 3 Edition Toggles */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-10 flex-wrap">
          {editions.map((ed) => (
            <button
              key={ed.id}
              onClick={() => setActiveEdition(ed.id)}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                activeEdition === ed.id
                  ? 'bg-[#8C3A16] text-white border-[#8C3A16] shadow-md scale-105'
                  : 'bg-[#FFFDF7] text-[#241708] border-[#E3D7C5] hover:border-[#8C3A16] hover:bg-[#FAF6EE] shadow-sm'
              }`}
            >
              <Trophy size={16} className={activeEdition === ed.id ? 'text-[#C97F1B]' : 'text-[#8C3A16]/60'} />
              <span>{ed.label}</span>
            </button>
          ))}
        </div>

        {/* Render Selected Edition Winners Gallery */}
        <div className="w-full">
          {activeEdition === '1.0' && <SIH2023Winners onViewChange={onViewChange} hideHeader={true} />}
          {activeEdition === '2.0' && <SIH2024Winners onViewChange={onViewChange} hideHeader={true} />}
          {activeEdition === '3.0' && <SIH2025Winners onViewChange={onViewChange} hideHeader={true} />}
        </div>

      </div>
    </div>
  );
}
