import React from 'react';
import { Badge } from '@/admin/components/ui/badge';
import { cn } from '@/admin/lib/utils';

export function StatusBadge({ status, className }) {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
    default: { label: status, color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.default;

  return (
    <Badge className={cn("px-2 py-1 uppercase text-xs font-semibold rounded-full", config.color, className)} variant="outline">
      {config.label}
    </Badge>
  );
}
