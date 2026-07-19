import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../../components/navigation/PageHeader';
import { DataTable } from '../../components/table/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { contactsService } from '../../services/contacts.service';
import { useToast } from '../../hooks/use-toast';
import { Eye, Mail, MessageSquare } from 'lucide-react';
import { ContactDetailsModal } from './ContactDetailsModal';
import { format } from 'date-fns';

export default function ContactsList() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-contacts', pagination.pageIndex, pagination.pageSize, search, statusFilter],
    queryFn: () => contactsService.getContacts({ 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize, 
      search, 
      status: statusFilter,
      sortField: 'createdAt',
      sortOrder: 'desc'
    }),
    keepPreviousData: true
  });

  const contacts = response?.data?.data || [];

  const columns = [
    { 
      accessorKey: 'name', 
      header: 'Name', 
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-brand-text">{row.original.name}</p>
          <p className="text-xs text-brand-gray">{row.original.email}</p>
        </div>
      )
    },
    { accessorKey: 'subject', header: 'Subject' },
    { 
      accessorKey: 'message', 
      header: 'Message',
      cell: ({ row }) => (
        <p className="truncate max-w-[200px] text-brand-gray text-sm" title={row.original.message}>
          {row.original.message}
        </p>
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ row }) => (
        <StatusBadge status={row.original.status} />
      )
    },
    { 
      accessorKey: 'createdAt', 
      header: 'Date',
      cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM d, yyyy')
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => openDetails(row.original)}
            className="p-2 text-brand-teal hover:bg-brand-teal/10 rounded-md transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => openReply(row.original)}
            className="p-2 text-brand-gold hover:bg-brand-gold/10 rounded-md transition-colors"
            title="Reply"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPagination(p => ({ ...p, pageIndex: 0 }));
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(p => ({ ...p, pageIndex: 0 }));
  };

  const openDetails = (contact) => {
    setSelectedContact(contact);
    setIsReplyMode(false);
    setIsDetailsModalOpen(true);
  };

  const openReply = (contact) => {
    setSelectedContact(contact);
    setIsReplyMode(true);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Contacts Management" 
          description="View and reply to contact form submissions" 
        />
        
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-full sm:w-auto px-4 py-2 bg-brand-dark border border-brand-purple/20 rounded-md text-brand-text focus:outline-none focus:border-brand-gold"
          >
            <option value="All">All Statuses</option>
            <option value="Unread">Unread</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-brand-dark border border-brand-purple/20 rounded-md text-brand-text placeholder-brand-gray focus:outline-none focus:border-brand-gold"
            />
            <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-brand-gray" />
          </div>
        </div>
      </div>

      <div className="shadow-card-shadow">
        <DataTable 
          data={contacts}
          columns={columns}
          pageCount={response?.data?.pagination?.totalPages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
        />
      </div>

      {selectedContact && (
        <ContactDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedContact(null);
          }}
          contactId={selectedContact._id}
          initialReplyMode={isReplyMode}
        />
      )}
    </div>
  );
}
