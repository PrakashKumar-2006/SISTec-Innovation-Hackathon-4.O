import React from 'react';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';

export default function StatusBadge({ status, type, className }) {
  const normalizedStatus = (status || 'pending').toLowerCase();
  
  let config = { label: status || 'Unknown', color: 'bg-brand-gray/20 text-brand-gray' };

  if (type === 'payment') {
    switch (normalizedStatus) {
      case 'completed': config = { label: 'Completed', color: 'bg-brand-teal/20 text-brand-teal border-brand-teal/50' }; break;
      case 'pending': config = { label: 'Pending', color: 'bg-brand-gold/20 text-brand-gold border-brand-gold/50' }; break;
      case 'failed': config = { label: 'Failed', color: 'bg-destructive/20 text-destructive border-destructive/50' }; break;
      default: config = { label: status, color: 'bg-brand-gray/20 text-brand-gray' };
    }
  } else if (type === 'verification') {
    switch (normalizedStatus) {
      case 'verified': config = { label: 'Verified', color: 'bg-brand-teal/20 text-brand-teal border-brand-teal/50' }; break;
      case 'pending': config = { label: 'Pending', color: 'bg-brand-gold/20 text-brand-gold border-brand-gold/50' }; break;
      case 'flagged': config = { label: 'Flagged', color: 'bg-destructive/20 text-destructive border-destructive/50' }; break;
      default: config = { label: status, color: 'bg-brand-gray/20 text-brand-gray' };
    }
  } else {
    // Default (e.g. registration)
    switch (normalizedStatus) {
      case 'approved': config = { label: 'Approved', color: 'bg-brand-teal/20 text-brand-teal border-brand-teal/50' }; break;
      case 'pending': config = { label: 'Pending', color: 'bg-brand-gold/20 text-brand-gold border-brand-gold/50' }; break;
      case 'rejected': config = { label: 'Rejected', color: 'bg-destructive/20 text-destructive border-destructive/50' }; break;
      default: config = { label: status, color: 'bg-brand-gray/20 text-brand-gray' };
    }
  }

  return (
    <Badge className={cn("px-2 py-0.5 uppercase text-[10px] font-bold rounded-sm border whitespace-nowrap", config.color, className)} variant="outline">
      {config.label}
    </Badge>
  );
}
