import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeRequestsService } from '../../services/changeRequests.service';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Search, Eye } from 'lucide-react';
import { DataTable } from '../../components/table/DataTable';
import { PageHeader } from '../../components/navigation/PageHeader';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import StatusBadge from '../../components/common/StatusBadge';
import RequestReviewModal from './RequestReviewModal';
import { format } from 'date-fns';

export default function ChangeRequestsList() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canReview = ['Super Admin', 'Admin', 'Moderator'].includes(user?.role);

  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['change-requests', pagination.pageIndex, pagination.pageSize, searchTerm, statusFilter],
    queryFn: () => changeRequestsService.getChangeRequests({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchTerm,
      status: statusFilter
    }),
    keepPreviousData: true,
  });

  const requestsData = response?.data?.data || [];
  const totalCount = response?.data?.pagination?.total || 0;

  const statusMutation = useMutation({
    mutationFn: ({ id, status, adminRemarks }) => changeRequestsService.updateRequestStatus(id, status, adminRemarks),
    onSuccess: () => {
      toast({ title: 'Request status updated successfully', variant: 'success' });
      queryClient.invalidateQueries(['change-requests']);
      setIsModalOpen(false);
      setSelectedRequest(null);
    },
    onError: (err) => {
      toast({ title: 'Failed to update status', description: err.response?.data?.message || err.message, variant: 'destructive' });
    }
  });

  const handleReview = (data) => {
    statusMutation.mutate(data);
  };

  const openReviewModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: 'teamName',
      header: 'Team Name',
      cell: ({ row }) => <span className="font-medium text-brand-text">{row.original.teamName}</span>,
    },
    {
      accessorKey: 'currentPsid',
      header: 'Current PSID',
      cell: ({ row }) => <span className="font-mono text-brand-gray text-xs">{row.original.currentPsid}</span>,
    },
    {
      accessorKey: 'requestedPsid',
      header: 'Requested PSID',
      cell: ({ row }) => <span className="font-mono text-brand-teal text-xs font-bold">{row.original.requestedPsid}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Submitted',
      cell: ({ row }) => <span className="text-xs text-brand-gray">{format(new Date(row.original.createdAt), 'MMM d, yyyy')}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <StatusBadge 
          status={row.original.status === 'Approved' ? 'verified' : row.original.status === 'Rejected' ? 'rejected' : 'pending'} 
          type="verification" 
        />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openReviewModal(request)}
              className="text-brand-gray hover:text-brand-gold hover:bg-brand-dark"
            >
              <Eye className="h-4 w-4 mr-2" /> {request.status === 'Pending' && canReview ? 'Review' : 'View'}
            </Button>
          </div>
        );
      },
    }
  ];

  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        <h3 className="text-xl font-bold mb-2">Error loading change requests</h3>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Problem Statement Change Requests" 
        description="Review and process requests from teams wanting to switch their problem statements." 
      />

      <div className="bg-brand-card rounded-2xl p-4 border border-brand-purple/20 shadow-card-shadow flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray" />
          <Input
            type="search"
            placeholder="Search team or PSID..."
            className="pl-10 bg-brand-dark border-brand-purple/30 text-brand-text placeholder:text-brand-gray focus-visible:ring-brand-gold"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination({ ...pagination, pageIndex: 0 });
            }}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Select 
            value={statusFilter} 
            onValueChange={(val) => { setStatusFilter(val); setPagination({ ...pagination, pageIndex: 0 }); }}
          >
            <SelectTrigger className="w-[160px] bg-brand-dark border-brand-purple/30 text-brand-text">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending Only</SelectItem>
              <SelectItem value="Approved">Approved Only</SelectItem>
              <SelectItem value="Rejected">Rejected Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={requestsData}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />

      <RequestReviewModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedRequest(null); }}
        request={selectedRequest}
        onReview={handleReview}
        isLoading={statusMutation.isLoading}
      />
    </div>
  );
}
