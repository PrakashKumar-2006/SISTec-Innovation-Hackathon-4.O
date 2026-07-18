import React from 'react';

export default function ComingSoon({ moduleName }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-brand-card rounded-lg border border-brand-purple/20 shadow-sm p-8">
      <div className="rounded-full bg-brand-purple/10 p-6 mb-6">
        <svg className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-brand-text mb-2">{moduleName}</h2>
      <p className="text-brand-gray max-w-md">
        This module is currently under construction. It will be available in a future update.
      </p>
    </div>
  );
}
