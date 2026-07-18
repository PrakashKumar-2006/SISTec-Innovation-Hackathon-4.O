import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // We only care about paths inside /admin
  if (pathnames[0] !== 'admin') return null;

  return (
    <nav className="flex items-center text-sm font-medium text-brand-gray" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/admin/dashboard" className="hover:text-brand-gold transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {pathnames.slice(1).map((value, index) => {
          const isLast = index === pathnames.length - 2; // -2 because we sliced 1 off
          const to = `/admin/${pathnames.slice(1, index + 2).join('/')}`;
          
          // Format label: capitalize, replace dashes
          const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0 text-brand-purple/50" />
              {isLast ? (
                <span className="text-brand-text cursor-default" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link to={to} className="hover:text-brand-gold transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
