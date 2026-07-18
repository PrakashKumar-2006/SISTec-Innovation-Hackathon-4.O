import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Forbidden from '../pages/errors/Forbidden';

export default function RoleGuard({ allowedRoles, children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // AuthGuard already shows loader
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Forbidden />;
  }

  return <>{children}</>;
}
