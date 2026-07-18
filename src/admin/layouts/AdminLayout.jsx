import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-brand-navy">
      <aside className="w-64 bg-brand-darker shadow-md flex-shrink-0">
        <div className="p-4 border-b border-brand-purple">
          <h1 className="text-xl font-bold text-brand-gold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2"><a href="/admin/dashboard" className="text-brand-purple hover:text-brand-gold">Dashboard</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto text-brand-dark">
        <Outlet />
      </main>
    </div>
  );
}
