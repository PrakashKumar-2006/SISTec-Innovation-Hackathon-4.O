import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { teamsService } from '../../services/teams.service';
import { DataTable } from '../../components/table/DataTable';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Search, Eye } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/navigation/PageHeader';

export default function TeamsList() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [registrationFilter, setRegistrationFilter] = useState('all');

  // React Query for fetching teams
  const { data, isLoading, isError } = useQuery({
    queryKey: ['teams', pagination.pageIndex, pagination.pageSize, searchTerm, paymentFilter, registrationFilter],
    queryFn: () => teamsService.getTeams({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchTerm,
      paymentStatus: paymentFilter,
      registrationStatus: registrationFilter
    }),
    keepPreviousData: true,
  });

  const columns = [
    {
      accessorKey: 'registrationId',
      header: 'Reg ID',
      cell: ({ row }) => <span className="font-mono text-brand-gold">{row.original.registrationId || 'N/A'}</span>,
    },
    {
      accessorKey: 'teamName',
      header: 'Team Name',
      cell: ({ row }) => <span className="font-semibold">{row.original.teamName}</span>,
    },
    {
      accessorKey: 'instituteName',
      header: 'College',
      cell: ({ row }) => <span className="truncate max-w-[200px] inline-block" title={row.original.instituteName}>{row.original.instituteName}</span>,
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} type="payment" />,
    },
    {
      accessorKey: 'registrationStatus',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.registrationStatus} type="registration" />,
    },
    {
      accessorKey: 'verificationStatus',
      header: 'Verification',
      cell: ({ row }) => <StatusBadge status={row.original.verificationStatus} type="verification" />,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const team = row.original;
        return (
          <button
            onClick={() => navigate(`/admin/teams/${team._id}`)}
            className="p-2 text-brand-gray hover:text-brand-gold transition-colors rounded-full hover:bg-brand-purple/20"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Teams Management" 
        description="View and manage all registered teams, verify documents, and update statuses."
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-brand-card p-4 rounded-lg border border-brand-purple/20 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-brand-gray" />
          </div>
          <Input
            type="search"
            placeholder="Search teams by name, ID, or college..."
            className="pl-10 bg-brand-dark border-brand-purple/30 text-brand-text placeholder:text-brand-gray focus-visible:ring-brand-gold"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination({ ...pagination, pageIndex: 0 });
            }}
          />
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <Select 
            value={paymentFilter} 
            onValueChange={(val) => { setPaymentFilter(val); setPagination({ ...pagination, pageIndex: 0 }); }}
          >
            <SelectTrigger className="w-[160px] bg-brand-dark border-brand-purple/30 text-brand-text">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={registrationFilter} 
            onValueChange={(val) => { setRegistrationFilter(val); setPagination({ ...pagination, pageIndex: 0 }); }}
          >
            <SelectTrigger className="w-[180px] bg-brand-dark border-brand-purple/30 text-brand-text">
              <SelectValue placeholder="Registration Status" />
            </SelectTrigger>
            <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
              <SelectItem value="all">All Registrations</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isError ? (
        <div className="p-8 text-center bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
          Failed to load teams. Please try again.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.data || []}
          pageCount={data?.pagination?.totalPages || -1}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
