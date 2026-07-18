import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/admin/lib/utils';

export function LoadingSpinner({ className, size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <Loader2 
      className={cn("animate-spin text-brand-gold", sizeClasses[size] || sizeClasses.md, className)} 
    />
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-inherit">
      <LoadingSpinner size="lg" />
    </div>
  );
}
