import React from 'react';
import { Badge } from '@/admin/components/ui/badge';
import { cn } from '@/admin/lib/utils';

export function PaymentStatusBadge({ status, className }) {
  const statusConfig = {
    completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' },
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
    failed: { label: 'Failed', color: 'bg-rose-100 text-rose-800 hover:bg-rose-200' },
    default: { label: status || 'Unknown', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.default;

  return (
    <Badge className={cn("px-2 py-1 font-semibold rounded-full border-0", config.color, className)}>
      {config.label}
    </Badge>
  );
}
