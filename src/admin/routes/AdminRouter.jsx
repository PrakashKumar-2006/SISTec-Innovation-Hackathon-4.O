import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';
import { Toaster } from '../components/ui/toaster';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ComingSoon from '../components/feedback/ComingSoon';
import NotFound from '../pages/errors/NotFound';

import TeamsList from '../pages/teams/TeamsList';
import TeamDetails from '../pages/teams/TeamDetails';

import ProblemsList from '../pages/problems/ProblemsList';
import ProblemDetails from '../pages/problems/ProblemDetails';

import ChangeRequestsList from '../pages/requests/ChangeRequestsList';

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
              <Dashboard />
            </RoleGuard>
          } />
          
          <Route path="teams" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <TeamsList />
            </RoleGuard>
          } />
          
          <Route path="teams/:id" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <TeamDetails />
            </RoleGuard>
          } />
          
          <Route path="problems" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <ProblemsList />
            </RoleGuard>
          } />
          
          <Route path="problems/:id" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <ProblemDetails />
            </RoleGuard>
          } />
          
          <Route path="requests" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <ChangeRequestsList />
            </RoleGuard>
          } />
          
          <Route path="contacts" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator']}>
              <ComingSoon moduleName="Contacts Management" />
            </RoleGuard>
          } />
          
          <Route path="results" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin']}>
              <ComingSoon moduleName="Hackathon Results" />
            </RoleGuard>
          } />
          
          <Route path="users" element={
            <RoleGuard allowedRoles={['Super Admin']}>
              <ComingSoon moduleName="User Management" />
            </RoleGuard>
          } />
          
          <Route path="settings" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin']}>
              <ComingSoon moduleName="System Settings" />
            </RoleGuard>
          } />

          {/* Default redirect for root admin path */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
          
          {/* 404 Catch-all for admin routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}
