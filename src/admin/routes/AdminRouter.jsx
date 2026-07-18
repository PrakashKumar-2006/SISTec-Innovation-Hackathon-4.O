import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';
import { Toaster } from '../components/ui/toaster';

import Login from '../pages/Login';
import DashboardPlaceholder from '../pages/DashboardPlaceholder';

export default function AdminRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route path="dashboard" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <DashboardPlaceholder />
            </RoleGuard>
          } />
          {/* Default redirect for root admin path */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}
