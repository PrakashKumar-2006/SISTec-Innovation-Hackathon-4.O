import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, Search, Plus, Filter, Download, 
  Trash2, Eye, Edit, Shield, Mail, Upload, CheckCircle, XCircle
} from 'lucide-react';
import { selectionsService } from '../../services/selections.service';
import { useAuth } from '../../contexts/AuthContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SelectionFormModal from './SelectionFormModal';
import SelectionDetailsModal from './SelectionDetailsModal';

const SelectionsList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const canManage = ['Super Admin', 'Admin', 'Moderator'].includes(user?.role);
  const canDelete = ['Super Admin', 'Admin'].includes(user?.role);

  // State
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    theme: 'All',
    evaluationRound: 'All',
    selectionStatus: 'All',
    isPublished: 'All'
  });

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // File Import State
  const [isImporting, setIsImporting] = useState(false);

  // Queries
  const { data: selectionsData, isLoading } = useQuery({
    queryKey: ['selections', { page, searchTerm, ...filters }],
    queryFn: () => selectionsService.getSelections({ 
      page, limit: 10, search: searchTerm, ...filters 
    }),
    keepPreviousData: true
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: selectionsService.deleteSelection,
    onSuccess: () => {
      queryClient.invalidateQueries(['selections']);
    }
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: selectionsService.bulkDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(['selections']);
      setSelectedIds([]);
    }
  });

  const bulkPublishMutation = useMutation({
    mutationFn: selectionsService.bulkPublish,
    onSuccess: () => {
      queryClient.invalidateQueries(['selections']);
      setSelectedIds([]);
      alert("Successfully published and queued notification emails!");
    }
  });

  const bulkUnpublishMutation = useMutation({
    mutationFn: selectionsService.bulkUnpublish,
    onSuccess: () => {
      queryClient.invalidateQueries(['selections']);
      setSelectedIds([]);
    }
  });

  const importMutation = useMutation({
    mutationFn: selectionsService.importSelections,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['selections']);
      if (data.data.errors && data.data.errors.length > 0) {
        alert(`Import completed with some errors:\\n${JSON.stringify(data.data.errors, null, 2)}`);
      } else {
        alert("Import successful!");
      }
    },
    onError: (error) => {
      alert("Import failed: " + (error.response?.data?.message || error.message));
    },
    onSettled: () => {
      setIsImporting(false);
    }
  });

  // Handlers
  const handleExport = async () => {
    try {
      const response = await selectionsService.exportSelections(filters);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Selections.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed');
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await selectionsService.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Selection_Import_Template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Template download failed:', error);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', file);
    importMutation.mutate(formData);
    
    // reset input
    e.target.value = null;
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === selectionsData?.data?.data?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectionsData?.data?.data?.map(s => s._id) || []);
    }
  };

  // Columns definition
  const columns = [
    {
      key: 'checkbox',
      label: (
        <input 
          type="checkbox" 
          onChange={toggleSelectAll}
          checked={selectionsData?.data?.data?.length > 0 && selectedIds.length === selectionsData?.data?.data?.length}
          className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500/20"
        />
      ),
      render: (item) => (
        <input 
          type="checkbox" 
          checked={selectedIds.includes(item._id)}
          onChange={() => toggleSelect(item._id)}
          className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500/20"
        />
      )
    },
    {
      key: 'team',
      label: 'Team Info',
      render: (item) => (
        <div>
          <div className="font-medium text-white">{item.teamName}</div>
          <div className="text-xs text-gray-400">{item.registrationId}</div>
        </div>
      )
    },
    {
      key: 'leader',
      label: 'Leader',
      render: (item) => (
        <div>
          <div className="text-gray-300">{item.leaderName}</div>
          <div className="text-xs text-gray-500">{item.leaderEmail}</div>
        </div>
      )
    },
    {
      key: 'ps',
      label: 'Problem Statement',
      render: (item) => (
        <div>
          <div className="text-gray-300">{item.psNumber}</div>
          <div className="text-xs text-gray-500 max-w-[200px] truncate" title={item.psTitle}>{item.psTitle}</div>
        </div>
      )
    },
    {
      key: 'round',
      label: 'Round',
      render: (item) => <span className="text-gray-300 text-sm">{item.evaluationRound}</span>
    },
    {
      key: 'status',
      label: 'Selection',
      render: (item) => (
        <StatusBadge 
          status={item.selectionStatus} 
          type={item.selectionStatus === 'Shortlisted' ? 'success' : item.selectionStatus === 'Not Shortlisted' ? 'error' : 'warning'} 
        />
      )
    },
    {
      key: 'published',
      label: 'Published',
      render: (item) => (
        <StatusBadge 
          status={item.isPublished ? 'Published' : 'Draft'} 
          type={item.isPublished ? 'success' : 'default'} 
        />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setSelectedItem(item); setIsDetailsOpen(true); }}
            className="p-1 hover:text-yellow-500 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {canManage && (
            <button
              onClick={() => { setSelectedItem(item); setIsFormOpen(true); }}
              className="p-1 hover:text-blue-500 transition-colors"
              title="Edit Selection"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}

          {canDelete && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this selection?')) {
                  deleteMutation.mutate(item._id);
                }
              }}
              className="p-1 hover:text-red-500 transition-colors"
              title="Delete Selection"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-yellow-500" />
            Selection Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage shortlisted teams, import evaluations, and publish results.
          </p>
        </div>
        
        {canManage && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Template
            </button>

            <div className="relative">
              <input 
                type="file" 
                id="excel-upload" 
                accept=".xlsx" 
                className="hidden" 
                onChange={handleImport}
                disabled={isImporting}
              />
              <label 
                htmlFor="excel-upload"
                className={`cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm ${isImporting ? 'opacity-50' : ''}`}
              >
                <Upload className="w-4 h-4" />
                {isImporting ? 'Importing...' : 'Import'}
              </label>
            </div>

            <button
              onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Manual
            </button>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Team, ID, Institute..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filters.evaluationRound}
              onChange={(e) => setFilters(prev => ({ ...prev, evaluationRound: e.target.value }))}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-yellow-500/20"
            >
              <option value="All">All Rounds</option>
              <option value="PPT Evaluation">PPT Evaluation</option>
              <option value="Offline Round">Offline Round</option>
              <option value="Grand Finale">Grand Finale</option>
            </select>

            <select
              value={filters.selectionStatus}
              onChange={(e) => setFilters(prev => ({ ...prev, selectionStatus: e.target.value }))}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-yellow-500/20"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Not Shortlisted">Not Shortlisted</option>
            </select>
            
            <select
              value={filters.isPublished}
              onChange={(e) => setFilters(prev => ({ ...prev, isPublished: e.target.value }))}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-yellow-500/20"
            >
              <option value="All">Published Status</option>
              <option value="true">Published</option>
              <option value="false">Draft / Hidden</option>
            </select>

            <button
              onClick={handleExport}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-300 hover:text-white"
              title="Export filtered data"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedIds.length > 0 && canManage && (
          <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-300">
              <span className="font-medium text-white">{selectedIds.length}</span> items selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to publish these selections and email teams?')) {
                    bulkPublishMutation.mutate(selectedIds);
                  }
                }}
                className="px-3 py-1.5 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded text-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                Publish & Email
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Unpublish these teams from the website?')) {
                    bulkUnpublishMutation.mutate(selectedIds);
                  }
                }}
                className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded text-sm transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                Unpublish
              </button>
              {canDelete && (
                <button
                  onClick={() => {
                    if (window.confirm('Delete these selections permanently?')) {
                      bulkDeleteMutation.mutate(selectedIds);
                    }
                  }}
                  className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded text-sm transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={selectionsData?.data?.data || []}
        isLoading={isLoading}
        pagination={{
          currentPage: page,
          totalPages: selectionsData?.data?.pagination?.totalPages || 1,
          totalItems: selectionsData?.data?.pagination?.total || 0,
          onPageChange: setPage
        }}
        emptyMessage="No selection records found matching the current filters."
      />

      {/* Modals */}
      {isFormOpen && (
        <SelectionFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedItem(null);
          }}
          selectionData={selectedItem}
          onSuccess={() => queryClient.invalidateQueries(['selections'])}
        />
      )}

      {isDetailsOpen && (
        <SelectionDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedItem(null);
          }}
          selection={selectedItem}
        />
      )}
    </div>
  );
};

export default SelectionsList;
