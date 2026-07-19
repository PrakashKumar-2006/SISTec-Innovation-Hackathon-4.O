import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Trophy,
  Settings,
  Contact,
  LogOut
} from 'lucide-react';

const ADMIN_NAVIGATION = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, roles: ['Super Admin', 'Admin', 'Moderator', 'Viewer'] },
  { name: 'Teams', path: '/admin/teams', icon: Users, roles: ['Super Admin', 'Admin', 'Moderator'] },
  { name: 'Problem Statements', path: '/admin/problems', icon: FileText, roles: ['Super Admin', 'Admin', 'Moderator', 'Viewer'] },
  { name: 'Change Requests', path: '/admin/requests', icon: MessageSquare, roles: ['Super Admin', 'Admin', 'Moderator', 'Viewer'] },
  { name: 'Contacts', path: '/admin/contacts', icon: Contact, roles: ['Super Admin', 'Admin', 'Moderator', 'Viewer'] },
  { name: 'Results', path: '/admin/results', icon: Trophy, roles: ['Super Admin', 'Admin', 'Moderator', 'Viewer'] },
  { name: 'Users', path: '/admin/users', icon: Users, roles: ['Super Admin'] },
  { name: 'Settings', path: '/admin/settings', icon: Settings, roles: ['Super Admin'] },
];

export function Sidebar({ className, onItemClick }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNav = ADMIN_NAVIGATION.filter(item => item.roles.includes(user.role));

  return (
    <div className={cn('flex h-full flex-col bg-brand-darker border-r border-brand-purple/20 text-brand-text', className)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-gold">SIH 4.0</h2>
        <p className="text-sm text-brand-gray mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onItemClick}
              className={cn(
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                isActive
                  ? 'bg-brand-purple/20 text-brand-gold shadow-sm'
                  : 'text-brand-gray hover:bg-brand-card hover:text-brand-text'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-brand-gold' : 'text-brand-gray group-hover:text-brand-text'
                )}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-purple/20">
        <button
          onClick={logout}
          className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-brand-gray rounded-md hover:bg-brand-card hover:text-brand-text transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5 text-brand-gray" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
