import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-destructive/20 p-6 mb-6">
        <ShieldAlert className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-4xl font-bold text-brand-text mb-2">Access Denied</h1>
      <h2 className="text-xl font-medium text-destructive mb-4">403 Forbidden</h2>
      <p className="text-brand-gray max-w-md mx-auto mb-8">
        You do not have the required permissions to access this page. Please contact a Super Admin if you believe this is a mistake.
      </p>
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 bg-brand-gold text-brand-dark hover:bg-brand-teal h-10 px-4 py-2"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
