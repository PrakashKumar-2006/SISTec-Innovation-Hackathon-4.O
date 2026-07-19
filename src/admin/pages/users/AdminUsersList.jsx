import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../../components/navigation/PageHeader';
import { DataTable } from '../../components/table/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { adminUsersService } from '../../services/adminUsers.service';
import { Users, Shield, UserCheck, UserX, Plus, Edit, Key, ActivitySquare } from 'lucide-react';
import { format } from 'date-fns';
import { AdminUserFormModal } from './AdminUserFormModal';
import { AuditLogsModal } from './AuditLogsModal';
import { PasswordResetModal } from './PasswordResetModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

export default function AdminUsersList() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Queries
  const { data: statsData } = useQuery({
    queryKey: ['admin-users-stats'],
    queryFn: () => adminUsersService.getAdminStats(),
  });

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-users', pagination.pageIndex, pagination.pageSize, search, roleFilter, statusFilter],
    queryFn: () => adminUsersService.getAdmins({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search,
      role: roleFilter,
      status: statusFilter
    }),
  });

  const users = response?.data?.data || [];
  const stats = statsData?.data?.data || { total: 0, superAdmins: 0, active: 0, suspended: 0 };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">
            {row.original.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="font-medium text-brand-text">
            {row.original.name || 'Admin User'}
          </div>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded ${
          row.original.role === 'Super Admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
          row.original.role === 'Admin' ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30' :
          row.original.role === 'Moderator' ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30' :
          row.original.role === 'Reviewer' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }`}>
          {row.original.role}
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) => (
        <span className="text-sm text-brand-gray">
          {row.original.lastLogin?.timestamp 
            ? format(new Date(row.original.lastLogin.timestamp), 'MMM d, yyyy h:mm a')
            : 'Never'}
        </span>
      )
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-brand-dark rounded-md text-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-gold">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-current rounded-full" />
                <span className="w-1 h-1 bg-current rounded-full" />
                <span className="w-1 h-1 bg-current rounded-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-brand-card border-brand-purple/20">
              <DropdownMenuItem onClick={() => handleEdit(user)} className="text-brand-text hover:bg-brand-purple/10 cursor-pointer focus:bg-brand-purple/10 focus:text-brand-text">
                <Edit className="h-4 w-4 mr-2" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedUser(user); setIsResetOpen(true); }} className="text-brand-text hover:bg-brand-purple/10 cursor-pointer focus:bg-brand-purple/10 focus:text-brand-text">
                <Key className="h-4 w-4 mr-2" /> Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedUser(user); setIsAuditOpen(true); }} className="text-brand-text hover:bg-brand-purple/10 cursor-pointer focus:bg-brand-purple/10 focus:text-brand-text">
                <ActivitySquare className="h-4 w-4 mr-2" /> View Audit Logs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Users & RBAC"
        description="Manage administrator accounts, roles, and system permissions."
        action={
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-brand-gold text-[#131316] font-bold rounded-md hover:bg-[#c2984a] transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            Create Admin
          </button>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-brand-card border border-brand-purple/20 p-4 rounded-xl shadow-card-shadow flex items-center gap-4">
          <div className="p-3 bg-brand-purple/10 rounded-lg">
            <Users className="h-6 w-6 text-brand-purple" />
          </div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Total Admins</p>
            <h3 className="text-2xl font-bold text-brand-text">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-brand-card border border-brand-gold/20 p-4 rounded-xl shadow-card-shadow flex items-center gap-4">
          <div className="p-3 bg-brand-gold/10 rounded-lg">
            <Shield className="h-6 w-6 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Super Admins</p>
            <h3 className="text-2xl font-bold text-brand-text">{stats.superAdmins}</h3>
          </div>
        </div>

        <div className="bg-brand-card border border-brand-teal/20 p-4 rounded-xl shadow-card-shadow flex items-center gap-4">
          <div className="p-3 bg-brand-teal/10 rounded-lg">
            <UserCheck className="h-6 w-6 text-brand-teal" />
          </div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Active Users</p>
            <h3 className="text-2xl font-bold text-brand-text">{stats.active}</h3>
          </div>
        </div>

        <div className="bg-brand-card border border-destructive/20 p-4 rounded-xl shadow-card-shadow flex items-center gap-4">
          <div className="p-3 bg-destructive/10 rounded-lg">
            <UserX className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-brand-gray font-medium">Suspended</p>
            <h3 className="text-2xl font-bold text-brand-text">{stats.suspended}</h3>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="shadow-card-shadow">
        <DataTable 
          data={users}
          columns={columns}
          pageCount={response?.data?.pagination?.totalPages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
        />
      </div>

      <AdminUserFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        user={selectedUser} 
        isEditMode={isEditMode} 
      />

      <AuditLogsModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        user={selectedUser} 
      />

      <PasswordResetModal 
        isOpen={isResetOpen} 
        onClose={() => setIsResetOpen(false)} 
        user={selectedUser} 
      />
    </div>
  );
}
