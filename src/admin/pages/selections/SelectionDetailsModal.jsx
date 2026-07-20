import React from 'react';
import { X, Users, Mail, Phone, BookOpen, Clock, Building, Shield, FileText, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

const SelectionDetailsModal = ({ isOpen, onClose, selection }) => {
  if (!isOpen || !selection) return null;

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
      <div className="p-2 bg-gray-800 rounded-lg text-yellow-500">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-white font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Team {selection.teamName}
            </h2>
            <div className="flex gap-2 mt-2">
              <StatusBadge 
                status={selection.selectionStatus} 
                type={selection.selectionStatus === 'Shortlisted' ? 'success' : selection.selectionStatus === 'Not Shortlisted' ? 'error' : 'warning'} 
              />
              <StatusBadge 
                status={selection.isPublished ? 'Published' : 'Draft'} 
                type={selection.isPublished ? 'success' : 'default'} 
              />
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow icon={Shield} label="Registration ID" value={selection.registrationId} />
            <DetailRow icon={Users} label="Team Name" value={selection.teamName} />
            <DetailRow icon={Building} label="Institute" value={selection.instituteName} />
            <DetailRow icon={BookOpen} label="Theme" value={selection.theme} />
          </div>

          <div className="bg-gray-900/30 border border-gray-700 rounded-xl p-4">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-yellow-500" />
              Leader Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailRow icon={Users} label="Leader Name" value={selection.leaderName} />
              <DetailRow icon={Mail} label="Leader Email" value={selection.leaderEmail} />
            </div>
          </div>

          <div className="bg-gray-900/30 border border-gray-700 rounded-xl p-4">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-yellow-500" />
              Problem Statement
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <DetailRow icon={FileText} label="PS Number" value={selection.psNumber} />
              <DetailRow icon={FileText} label="PS Title" value={selection.psTitle} />
              <DetailRow icon={Clock} label="Evaluation Round" value={selection.evaluationRound} />
            </div>
          </div>

          <div className="space-y-4">
            {selection.evaluationRemarks && (
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Evaluation Remarks</h4>
                <p className="text-white whitespace-pre-wrap">{selection.evaluationRemarks}</p>
              </div>
            )}

            {selection.internalNotes && (
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <h4 className="text-sm font-medium text-yellow-500 mb-2">Internal Notes</h4>
                <p className="text-white whitespace-pre-wrap">{selection.internalNotes}</p>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Created by Admin ID: {selection.createdBy?.name || selection.createdBy}</p>
            <p>Last Updated: {new Date(selection.updatedAt).toLocaleString()}</p>
            {selection.isPublished && (
              <p>Published At: {new Date(selection.publishedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionDetailsModal;
