import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { problemsService } from '../../services/problems.service';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Plus, Search, Eye, Edit, Trash2, Archive, RefreshCw, Upload, Download, FileSpreadsheet } from 'lucide-react';
import { DataTable } from '../../components/table/DataTable';
import { PageHeader } from '../../components/navigation/PageHeader';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import StatusBadge from '../../components/common/StatusBadge';
import ProblemFormModal from './ProblemFormModal';

export default function ProblemsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for search/filters/pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  // Check roles
  const canEdit = ['Super Admin', 'Admin', 'Moderator'].includes(user?.role);

  // Fetch problems
  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['problems', pagination.pageIndex, pagination.pageSize, searchTerm, domainFilter, statusFilter],
    queryFn: () => problemsService.getAllProblems({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchTerm,
      domain: domainFilter,
      status: statusFilter
    }),
    keepPreviousData: true,
  });

  const problemsData = response?.data?.data || [];
  const totalCount = response?.data?.pagination?.total || 0;

  // Mutations
  const createMutation = useMutation({
    mutationFn: problemsService.createProblem,
    onSuccess: () => {
      toast({ title: 'Problem Statement created successfully', variant: 'success' });
      queryClient.invalidateQueries(['problems']);
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast({ title: 'Failed to create', description: err.response?.data?.message || err.message, variant: 'destructive' });
    }
  });

  const importMutation = useMutation({
    mutationFn: problemsService.importProblems,
    onSuccess: (data) => {
      toast({ title: 'Import successful', description: `Inserted: ${data.data.data.inserted}, Updated: ${data.data.data.updated}`, variant: 'success' });
      queryClient.invalidateQueries(['problems']);
    },
    onError: (err) => {
      toast({ title: 'Import failed', description: err.response?.data?.message || err.message, variant: 'destructive' });
    }
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      toast({ title: 'Invalid file', description: 'Please upload a valid Excel file', variant: 'destructive' });
      return;
    }
    
    importMutation.mutate(file);
    event.target.value = ''; // Reset input
  };

  const handleExport = async () => {
    try {
      const blob = await problemsService.exportProblems();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'problem_statements.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({ title: 'Export failed', description: 'Failed to download excel file', variant: 'destructive' });
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const blob = await problemsService.downloadTemplate();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'problem_statements_template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({ title: 'Template download failed', description: 'Failed to download template', variant: 'destructive' });
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => problemsService.updateProblem(id, data),
    onSuccess: () => {
      toast({ title: 'Problem Statement updated successfully', variant: 'success' });
      queryClient.invalidateQueries(['problems']);
      setIsModalOpen(false);
      setEditingProblem(null);
    },
    onError: (err) => {
      toast({ title: 'Failed to update', description: err.response?.data?.message || err.message, variant: 'destructive' });
    }
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => problemsService.updateProblemStatus(id, status),
    onSuccess: () => {
      toast({ title: 'Status updated successfully', variant: 'success' });
      queryClient.invalidateQueries(['problems']);
    },
    onError: (err) => {
      toast({ title: 'Failed to update status', description: err.response?.data?.message || err.message, variant: 'destructive' });
    }
  });

  // Handlers
  const handleModalSubmit = (data) => {
    if (editingProblem) {
      updateMutation.mutate({ id: editingProblem._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const toggleStatus = (problem) => {
    const newStatus = problem.status === 'Active' ? 'Inactive' : 'Active';
    statusMutation.mutate({ id: problem._id, status: newStatus });
  };

  // Columns definition
  const columns = [
    {
      accessorKey: 'psNumber',
      header: 'PSID',
      cell: ({ row }) => <span className="font-mono text-brand-gold font-medium">{row.original.psNumber}</span>,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.original.title}>
          <span className="font-medium text-brand-text">{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: 'org',
      header: 'Organization',
      cell: ({ row }) => (
        <div className="max-w-[150px] truncate text-brand-gray text-xs" title={row.original.org}>
          {row.original.org}
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span className="text-xs text-brand-gray bg-brand-dark px-2 py-1 rounded border border-brand-purple/20">{row.original.category}</span>,
    },
    {
      accessorKey: 'domain',
      header: 'Domain Bucket',
      cell: ({ row }) => <span className="text-xs text-brand-teal truncate max-w-[120px] inline-block">{row.original.domain}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <StatusBadge 
          status={row.original.status === 'Active' ? 'verified' : 'rejected'} 
          type="verification" 
          className={row.original.status === 'Active' ? '' : 'opacity-70'}
        />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const problem = row.original;
        const isActive = problem.status === 'Active';
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/admin/problems/${problem._id}`)}
              className="h-8 w-8 p-0 text-brand-gray hover:text-brand-gold hover:bg-brand-dark rounded-full"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {canEdit && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEditModal(problem)}
                  className="h-8 w-8 p-0 text-brand-gray hover:text-brand-teal hover:bg-brand-dark rounded-full"
                  title="Edit Problem"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStatus(problem)}
                  className={`h-8 w-8 p-0 rounded-full hover:bg-brand-dark ${isActive ? 'text-brand-gray hover:text-destructive' : 'text-brand-gray hover:text-green-500'}`}
                  title={isActive ? 'Archive/Deactivate' : 'Restore/Activate'}
                >
                  {isActive ? <Archive className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </>
            )}
          </div>
        );
      },
    }
  ];

  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        <h3 className="text-xl font-bold mb-2">Error loading problem statements</h3>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Problem Statements" 
        description="Manage hackathon problem statements, categories, and domains."
        action={
          canEdit && (
            <div className="flex gap-2">
              <input 
                type="file" 
                id="excel-upload" 
                className="hidden" 
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              <Button 
                variant="outline" 
                onClick={handleDownloadTemplate}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Template
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('excel-upload').click()}
                disabled={importMutation.isLoading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {importMutation.isLoading ? 'Importing...' : 'Import'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => { setEditingProblem(null); setIsModalOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Problem Statement
              </Button>
            </div>
          )
        }
      />

      {/* Filters and Search */}
      <div className="bg-brand-card rounded-2xl p-4 border border-brand-purple/20 shadow-card-shadow flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray" />
          <Input
            type="search"
            placeholder="Search by PSID, Title, or Org..."
            className="pl-10 bg-brand-dark border-brand-purple/30 text-brand-text placeholder:text-brand-gray focus-visible:ring-brand-gold"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination({ ...pagination, pageIndex: 0 }); // Reset page on search
            }}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* We could populate this dynamically if we had a dedicated endpoint, but simple text filter works for now */}
          <Select 
            value={statusFilter} 
            onValueChange={(val) => { setStatusFilter(val); setPagination({ ...pagination, pageIndex: 0 }); }}
          >
            <SelectTrigger className="w-[160px] bg-brand-dark border-brand-purple/30 text-brand-text">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active Only</SelectItem>
              <SelectItem value="Inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={problemsData}
        pageCount={Math.ceil(totalCount / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />

      {/* Create/Edit Modal */}
      <ProblemFormModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProblem(null); }}
        onSubmit={handleModalSubmit}
        initialData={editingProblem}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  );
}
