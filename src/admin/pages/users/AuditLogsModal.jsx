import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { adminUsersService } from '../../services/adminUsers.service';
import { format } from 'date-fns';
import { ShieldAlert, Activity, LogIn, Edit, UserPlus, Key } from 'lucide-react';
import { DataTable } from '../../components/table/DataTable';

const getActionIcon = (action) => {
  switch (action) {
    case 'Login': return <LogIn className="h-4 w-4 text-brand-teal" />;
    case 'Account Creation': return <UserPlus className="h-4 w-4 text-brand-gold" />;
    case 'Role Change': return <ShieldAlert className="h-4 w-4 text-brand-purple" />;
    case 'Status Change': return <Activity className="h-4 w-4 text-blue-400" />;
    case 'Password Reset': return <Key className="h-4 w-4 text-destructive" />;
    default: return <Edit className="h-4 w-4 text-brand-gray" />;
  }
};

export function AuditLogsModal({ isOpen, onClose, user }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-audit-logs', user?._id, pagination.pageIndex, pagination.pageSize],
    queryFn: () => adminUsersService.getAuditLogs({ 
      targetAdminId: user?._id, 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize 
    }),
    enabled: !!user && isOpen,
  });

  const logs = response?.data?.data || [];

  const columns = [
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getActionIcon(row.original.action)}
          <span className="font-medium text-brand-text">{row.original.action}</span>
        </div>
      )
    },
    {
      accessorKey: 'adminId.name',
      header: 'Performed By',
      cell: ({ row }) => {
        const actor = row.original.adminId;
        return (
          <div>
            <p className="text-sm text-brand-text">{actor?.name || 'System'}</p>
            {actor?.email && <p className="text-xs text-brand-gray">{actor.email}</p>}
          </div>
        );
      }
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => (
        <pre className="text-xs text-brand-gray bg-brand-dark p-2 rounded max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {JSON.stringify(row.original.details)}
        </pre>
      )
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM d, yyyy h:mm a')
    }
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] bg-[#131316] border-brand-purple/20 text-brand-text max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-gold">
            Audit Logs for {user?.name || user?.email}
          </DialogTitle>
          <p className="text-sm text-brand-gray mt-1">Viewing all actions targeting this administrator account.</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 custom-scrollbar">
          <DataTable 
            data={logs}
            columns={columns}
            pageCount={response?.data?.pagination?.totalPages ?? 0}
            pagination={pagination}
            onPaginationChange={setPagination}
            isLoading={isLoading}
          />
        </div>
        
        <div className="flex justify-end pt-4 border-t border-brand-purple/20 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-brand-dark border border-brand-purple/30 text-brand-text rounded-md hover:bg-brand-purple/10 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
