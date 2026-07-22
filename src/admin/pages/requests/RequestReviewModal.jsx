import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Check, X, ArrowRight, MessageSquare } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { format } from 'date-fns';

export default function RequestReviewModal({ isOpen, onClose, request, onReview, isLoading }) {
  const [adminRemarks, setAdminRemarks] = useState('');

  if (!request) return null;

  const handleAction = (status) => {
    onReview({ id: request._id, status, adminRemarks });
  };

  const isPending = request.status === 'Pending';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setAdminRemarks('');
        onClose();
      }
    }}>
      <style>{`
        body .modal-center-override,
        body .modal-center-override:hover {
          transform: translate(-50%, -50%) !important;
          top: 50% !important;
          left: 50% !important;
        }
      `}</style>
      <DialogContent 
        className="bg-brand-card modal-center-override border-brand-purple/20 text-brand-text max-w-2xl w-full max-h-[90vh] overflow-y-auto z-[9999]"
      >
        <DialogHeader>
          <DialogTitle className="text-brand-gold flex items-center gap-3">
            Change Request Review
            <StatusBadge 
              status={request.status === 'Approved' ? 'verified' : request.status === 'Rejected' ? 'rejected' : 'pending'} 
              type="verification" 
            />
          </DialogTitle>
          <DialogDescription className="text-brand-gray">
            Review the problem statement change request submitted by the team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-brand-gray block mb-1">Team Name</span>
              <p className="font-medium">{request.teamName}</p>
            </div>
            <div>
              <span className="text-brand-gray block mb-1">Requested Date</span>
              <p>{request.createdAt ? format(new Date(request.createdAt), 'PPp') : 'N/A'}</p>
            </div>
          </div>

          <div className="bg-brand-dark/50 border border-brand-purple/10 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex-1 text-center md:text-left">
              <span className="text-brand-gray block text-xs uppercase font-bold mb-1">Current Problem Statement</span>
              <p className="font-mono text-brand-text bg-brand-dark px-3 py-1 rounded inline-block border border-brand-purple/20">
                {request.currentPsid}
              </p>
            </div>
            <ArrowRight className="text-brand-gold hidden md:block" />
            <div className="flex-1 text-center md:text-right">
              <span className="text-brand-gray block text-xs uppercase font-bold mb-1">Requested Problem Statement</span>
              <p className="font-mono text-brand-teal bg-brand-dark px-3 py-1 rounded inline-block border border-brand-teal/20">
                {request.requestedPsid}
              </p>
              <p className="text-xs text-brand-gray mt-1 truncate max-w-[200px] ml-auto">{request.requestedPsTitle}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-brand-gold" /> Reason for Change</Label>
            <div className="bg-brand-dark p-4 rounded-md border border-brand-purple/20 text-sm whitespace-pre-wrap text-brand-gray">
              {request.reason}
            </div>
          </div>

          {!isPending && (
            <div className="space-y-2 bg-brand-dark/50 p-4 rounded-md border border-brand-purple/20">
              <span className="text-brand-gray block text-xs font-bold uppercase mb-2">Review Information</span>
              <div className="text-sm">
                <p><span className="text-brand-gray">Reviewed By:</span> {request.reviewedBy?.name || 'Admin'}</p>
                <p><span className="text-brand-gray">Reviewed At:</span> {request.reviewedAt ? format(new Date(request.reviewedAt), 'PPp') : 'N/A'}</p>
                {request.adminRemarks && (
                  <p className="mt-2"><span className="text-brand-gray block mb-1">Admin Remarks:</span> {request.adminRemarks}</p>
                )}
              </div>
            </div>
          )}

          {isPending && (
            <div className="space-y-2">
              <Label>Admin Remarks (Optional)</Label>
              <textarea 
                placeholder="Add comments, reasons for rejection, or notes for the team..."
                value={adminRemarks}
                onChange={(e) => setAdminRemarks(e.target.value)}
                className="flex w-full rounded-md border border-brand-purple/30 bg-brand-dark px-3 py-2 text-sm text-brand-text placeholder:text-brand-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold min-h-[80px]"
              />
              <p className="text-xs text-brand-gray">These remarks will be included in the email sent to the team.</p>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 flex items-center sm:justify-between w-full">
          <Button type="button" variant="ghost" onClick={() => { setAdminRemarks(''); onClose(); }} className="text-brand-gray hover:bg-brand-dark">
            {isPending ? 'Cancel' : 'Close'}
          </Button>
          
          {isPending && (
            <div className="flex gap-3">
              <Button 
                type="button" 
                disabled={isLoading}
                onClick={() => handleAction('Rejected')} 
                className="bg-brand-dark border border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                <X className="h-4 w-4 mr-2" /> Reject Request
              </Button>
              <Button 
                type="button" 
                disabled={isLoading}
                onClick={() => handleAction('Approved')} 
                className="bg-brand-gold text-brand-dark hover:bg-brand-teal shadow-cyan-glow"
              >
                <Check className="h-4 w-4 mr-2" /> Approve Request
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
