import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';
import { Toaster } from '../components/ui/toaster';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/errors/NotFound';

const TeamsList = lazy(() => import('../pages/teams/TeamsList'));
const TeamDetails = lazy(() => import('../pages/teams/TeamDetails'));
const ProblemsList = lazy(() => import('../pages/problems/ProblemsList'));
const ProblemDetails = lazy(() => import('../pages/problems/ProblemDetails'));
const ChangeRequestsList = lazy(() => import('../pages/requests/ChangeRequestsList'));
const ContactsList = lazy(() => import('../pages/contacts/ContactsList'));
const ResultsList = lazy(() => import('../pages/results/ResultsList'));
const AdminUsersList = lazy(() => import('../pages/users/AdminUsersList'));
const Settings = lazy(() => import('../pages/settings/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
              <Suspense fallback={<PageLoader />}><TeamsList /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="teams/:id" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <Suspense fallback={<PageLoader />}><TeamDetails /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="problems" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <Suspense fallback={<PageLoader />}><ProblemsList /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="problems/:id" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <Suspense fallback={<PageLoader />}><ProblemDetails /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="requests" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator']}>
              <Suspense fallback={<PageLoader />}><ChangeRequestsList /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="contacts" element={
            <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
              <Suspense fallback={<PageLoader />}><ContactsList /></Suspense>
            </RoleGuard>
          } />
          
          <Route path="users" element={
            <RoleGuard allowedRoles={['Super Admin']}>
              <Suspense fallback={<PageLoader />}><AdminUsersList /></Suspense>
            </RoleGuard>
          } />
          
          <Route 
            path="results" 
            element={
              <RoleGuard allowedRoles={['Super Admin', 'Admin', 'Moderator', 'Viewer']}>
                <Suspense fallback={<PageLoader />}><ResultsList /></Suspense>
              </RoleGuard>
            } 
          />

          <Route path="settings" element={
            <RoleGuard allowedRoles={['Super Admin']}>
              <Suspense fallback={<PageLoader />}><Settings /></Suspense>
            </RoleGuard>
          } />

          <Route path="" element={<Navigate to="dashboard" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}
