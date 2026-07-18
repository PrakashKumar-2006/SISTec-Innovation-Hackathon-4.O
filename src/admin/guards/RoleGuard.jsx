import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RoleGuard({ allowedRoles, children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // AuthGuard already shows loader
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // Better to show a "Forbidden" page or redirect to dashboard if they don't have access
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Access Denied</h2>
          <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
