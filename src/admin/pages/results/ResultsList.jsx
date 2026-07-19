import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../../components/navigation/PageHeader';
import { DataTable } from '../../components/table/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { resultsService } from '../../services/results.service';
import { useToast } from '../../hooks/use-toast';
import { Eye, Edit, Trash2, Plus, Trophy, FileText, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ResultFormModal } from './ResultFormModal';
import { ResultDetailsModal } from './ResultDetailsModal';

export default function ResultsList() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedResult, setSelectedResult] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch Results
  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-results', pagination.pageIndex, pagination.pageSize, search, statusFilter],
    queryFn: () => resultsService.getResults({ 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize, 
      search, 
      status: statusFilter,
      sortField: 'createdAt',
      sortOrder: 'desc'
    }),
    keepPreviousData: true
  });

  // Fetch Stats
  const { data: statsResponse } = useQuery({
    queryKey: ['admin-results-stats'],
    queryFn: resultsService.getResultStats
  });

  const results = response?.data?.data || [];
  const stats = statsResponse?.data?.data || { totalResults: 0, publishedResults: 0, draftResults: 0, winners: 0 };

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => resultsService.deleteResult(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-results']);
      queryClient.invalidateQueries(['admin-results-stats']);
      toast({ title: 'Success', description: 'Result deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to delete result', variant: 'destructive' });
    }
  });

  // Toggle Status Mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) => resultsService.updateResultStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-results']);
      queryClient.invalidateQueries(['admin-results-stats']);
      toast({ title: 'Success', description: 'Status updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to update status', variant: 'destructive' });
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this result? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
    { 
      accessorKey: 'teamName', 
      header: 'Team Name', 
      cell: ({ row }) => <span className="font-bold text-brand-text">{row.original.teamName}</span>
    },
    { 
      accessorKey: 'problemStatement', 
      header: 'Problem Statement',
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.original.problemStatement?.title}>
          <span className="text-brand-gold font-mono text-xs">{row.original.problemStatement?.psNumber}</span>
          <br/>
          <span className="text-xs text-brand-gray">{row.original.problemStatement?.theme}</span>
        </div>
      )
    },
    { 
      accessorKey: 'rank', 
      header: 'Rank',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs font-bold rounded-md ${
          row.original.rank === '1st' ? 'bg-[#FFD700]/20 text-[#FFD700]' :
          row.original.rank === '2nd' ? 'bg-[#C0C0C0]/20 text-[#C0C0C0]' :
          row.original.rank === '3rd' ? 'bg-[#CD7F32]/20 text-[#CD7F32]' :
          'bg-brand-gray/20 text-brand-gray'
        }`}>
          {row.original.rank}
        </span>
      )
    },
    { 
      accessorKey: 'prizeTitle', 
      header: 'Prize',
      cell: ({ row }) => (
        <div>
          <span className="text-sm text-brand-text">{row.original.prizeTitle}</span>
          {row.original.prizeAmount && <span className="block text-xs text-brand-gold">{row.original.prizeAmount}</span>}
        </div>
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={row.original.status === 'Published' ? 'Approved' : 'Pending'} />
          <span className="text-xs">{row.original.status}</span>
        </div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => {
              toggleStatusMutation.mutate({ 
                id: row.original._id, 
                status: row.original.status === 'Published' ? 'Draft' : 'Published' 
              });
            }}
            className={`p-1.5 rounded-md transition-colors ${row.original.status === 'Published' ? 'text-brand-gray hover:bg-brand-gray/10' : 'text-brand-teal hover:bg-brand-teal/10'}`}
            title={row.original.status === 'Published' ? 'Unpublish to Draft' : 'Publish Result'}
          >
            {row.original.status === 'Published' ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          </button>
          
          <button 
            onClick={() => {
              setSelectedResult(row.original);
              setIsDetailsModalOpen(true);
            }}
            className="p-1.5 text-brand-teal hover:bg-brand-teal/10 rounded-md transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button 
            onClick={() => {
              setSelectedResult(row.original);
              setIsEditMode(true);
              setIsFormModalOpen(true);
            }}
            className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded-md transition-colors"
            title="Edit Result"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button 
            onClick={() => handleDelete(row.original._id)}
            className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            title="Delete Result"
          >
            <Trash2 className="h-4 w-4" />
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

  const statCards = [
    { title: 'Total Results', value: stats.totalResults, icon: FileText, color: 'text-brand-purple' },
    { title: 'Published', value: stats.publishedResults, icon: CheckCircle, color: 'text-brand-teal' },
    { title: 'Drafts', value: stats.draftResults, icon: Clock, color: 'text-brand-gray' },
    { title: 'Top Winners', value: stats.winners, icon: Trophy, color: 'text-brand-gold' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Results Management" 
          description="Manage and publish hackathon results and winners" 
        />
        
        <button
          onClick={() => {
            setSelectedResult(null);
            setIsEditMode(false);
            setIsFormModalOpen(true);
          }}
          className="px-4 py-2 bg-brand-gold text-[#131316] font-bold rounded-md hover:bg-[#c2984a] transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Result
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-brand-card border border-brand-purple/20 p-6 rounded-xl flex items-center gap-4 shadow-card-shadow">
              <div className={`p-4 rounded-lg bg-brand-dark ${stat.color} border border-brand-purple/10`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-brand-gray text-sm font-medium">{stat.title}</p>
                <h4 className="text-3xl font-bold text-brand-text mt-1">{stat.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Table */}
      <div className="flex flex-wrap gap-4 w-full">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="w-full sm:w-auto px-4 py-2 bg-brand-dark border border-brand-purple/20 rounded-md text-brand-text focus:outline-none focus:border-brand-gold"
        >
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-4 pr-4 py-2 bg-brand-dark border border-brand-purple/20 rounded-md text-brand-text placeholder-brand-gray focus:outline-none focus:border-brand-gold"
          />
        </div>
      </div>

      <div className="shadow-card-shadow">
        <DataTable 
          data={results}
          columns={columns}
          pageCount={response?.data?.pagination?.totalPages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
        />
      </div>

      {isFormModalOpen && (
        <ResultFormModal 
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          result={selectedResult}
          isEditMode={isEditMode}
        />
      )}

      {isDetailsModalOpen && selectedResult && (
        <ResultDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          resultId={selectedResult._id}
        />
      )}
    </div>
  );
}
