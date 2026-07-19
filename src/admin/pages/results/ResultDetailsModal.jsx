import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { resultsService } from '../../services/results.service';
import StatusBadge from '../../components/common/StatusBadge';
import { format } from 'date-fns';
import { Trophy, FileText, User, Users, Calendar, MapPin, Hash, CheckCircle, Clock } from 'lucide-react';

export function ResultDetailsModal({ isOpen, onClose, resultId }) {
  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-result-details', resultId],
    queryFn: () => resultsService.getResultById(resultId),
    enabled: !!resultId && isOpen,
  });

  const result = response?.data?.data;
  const team = result?.registrationDetails;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-[#131316] border-brand-purple/20 text-brand-text max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader className="border-b border-brand-purple/20 pb-4 mb-4">
          <div className="flex items-start justify-between pr-8">
            <div>
              <DialogTitle className="text-2xl font-bold text-brand-gold flex items-center gap-2">
                <Trophy className="h-6 w-6" /> {result?.prizeTitle}
              </DialogTitle>
              <p className="text-brand-gray mt-1 flex items-center gap-2">
                <span className="font-semibold text-brand-text">{result?.teamName}</span> • Rank: {result?.rank}
              </p>
            </div>
            {result && (
              <StatusBadge status={result.status === 'Published' ? 'Approved' : 'Pending'} />
            )}
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold"></div>
          </div>
        ) : !result ? (
          <div className="p-8 text-center text-destructive">
            Failed to load result details.
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Prize & Rank Section */}
            <div className="bg-brand-dark rounded-xl p-5 border border-brand-purple/20 shadow-card-shadow">
              <h4 className="text-sm font-semibold text-brand-gold mb-4 uppercase tracking-wider flex items-center gap-2">
                <Trophy className="h-4 w-4" /> Award Information
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-brand-gray mb-1">Rank</p>
                  <p className="font-medium text-brand-text">{result.rank}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-gray mb-1">Status</p>
                  <p className="font-medium text-brand-text">{result.status}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-brand-gray mb-1">Prize Amount</p>
                  <p className="font-medium text-brand-gold">{result.prizeAmount || 'N/A'}</p>
                </div>
              </div>
              {result.remarks && (
                <div className="mt-4 pt-4 border-t border-brand-purple/10">
                  <p className="text-xs text-brand-gray mb-2">Remarks / Jury Comments</p>
                  <div className="bg-[#1A1A24] p-3 rounded-md text-sm text-brand-text whitespace-pre-wrap">
                    {result.remarks}
                  </div>
                </div>
              )}
            </div>

            {/* Problem Statement Section */}
            <div className="bg-brand-dark rounded-xl p-5 border border-brand-purple/20 shadow-card-shadow">
              <h4 className="text-sm font-semibold text-brand-gold mb-4 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" /> Problem Statement
              </h4>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-brand-purple/20 text-brand-purple rounded text-xs font-bold border border-brand-purple/30">
                    {result.problemStatement?.psNumber}
                  </span>
                  <span className="text-sm font-medium text-brand-text">{result.problemStatement?.title}</span>
                </div>
                <p className="text-sm text-brand-gray">Theme: {result.problemStatement?.theme}</p>
              </div>
            </div>

            {/* Team Details Section */}
            <div className="bg-brand-dark rounded-xl p-5 border border-brand-purple/20 shadow-card-shadow">
              <h4 className="text-sm font-semibold text-brand-gold mb-4 uppercase tracking-wider flex items-center gap-2">
                <Users className="h-4 w-4" /> Team Details
              </h4>
              {team ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-xs text-brand-gray mb-1 flex items-center gap-1"><Hash className="h-3 w-3"/> Registration ID</p>
                    <p className="text-sm text-brand-text font-mono">{team.registrationId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-gray mb-1 flex items-center gap-1"><User className="h-3 w-3"/> Team Leader</p>
                    <p className="text-sm text-brand-text">{team.leaderName} <span className="text-brand-gray text-xs">({team.leaderEmail})</span></p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-xs text-brand-gray mb-1 flex items-center gap-1"><MapPin className="h-3 w-3"/> Institute</p>
                    <p className="text-sm text-brand-text">{team.instituteName}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-brand-gray italic">Registration details unavailable.</p>
              )}
            </div>

            {/* Audit Log */}
            <div className="bg-brand-dark rounded-xl p-5 border border-brand-purple/20 shadow-card-shadow">
              <h4 className="text-sm font-semibold text-brand-gold mb-4 uppercase tracking-wider flex items-center gap-2">
                <Clock className="h-4 w-4" /> Audit Log
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-brand-purple/10">
                  <span className="text-brand-gray">Created By</span>
                  <div className="text-right">
                    <p className="text-brand-text">{result.createdBy?.name || 'System'}</p>
                    <p className="text-xs text-brand-gray">{format(new Date(result.createdAt), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-purple/10">
                  <span className="text-brand-gray">Last Updated By</span>
                  <div className="text-right">
                    <p className="text-brand-text">{result.updatedBy?.name || 'System'}</p>
                    <p className="text-xs text-brand-gray">{format(new Date(result.updatedAt), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                </div>
                {result.publishedAt && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-brand-gray flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-brand-teal" /> Published At
                    </span>
                    <span className="text-brand-text text-right">
                      {format(new Date(result.publishedAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
        
        <div className="mt-6 flex justify-end pt-4 border-t border-brand-purple/20">
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
