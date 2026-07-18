import React from 'react';
import { Menu, Search, Bell, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Breadcrumbs } from './Breadcrumbs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-brand-purple/20 bg-brand-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-brand-gray hover:text-brand-gold lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator for mobile */}
      <div className="h-6 w-px bg-brand-purple/20 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center gap-x-4">
          <div className="hidden lg:block w-1/2 max-w-md">
            <Breadcrumbs />
          </div>
          
          <div className="flex flex-1 lg:hidden">
             {/* Mobile space filler if needed */}
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications placeholder */}
          <button type="button" className="-m-2.5 p-2.5 text-brand-gray hover:text-brand-gold">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-brand-gold" />
                </div>
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-3 text-sm font-semibold leading-6 text-brand-text" aria-hidden="true">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-brand-card border-brand-purple/20 text-brand-text" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-brand-text">{user?.email}</p>
                  <p className="text-xs leading-none text-brand-gray">
                    {user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-brand-purple/20" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-brand-purple/20 focus:text-brand-gold cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-brand-purple/20 focus:text-brand-gold cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-brand-purple/20" />
              <DropdownMenuItem onClick={logout} className="focus:bg-destructive/20 focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
