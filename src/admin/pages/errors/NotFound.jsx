import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="rounded-full bg-brand-purple/20 p-6 mb-6">
        <MapPinOff className="h-16 w-16 text-brand-gold" />
      </div>
      <h1 className="text-4xl font-bold text-brand-text mb-2">Page Not Found</h1>
      <h2 className="text-xl font-medium text-brand-gray mb-4">404 Error</h2>
      <p className="text-brand-gray max-w-md mx-auto mb-8">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
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
