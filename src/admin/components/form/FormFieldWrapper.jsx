import React from 'react';
import { Label } from '@/admin/components/ui/label';
import { cn } from '@/admin/lib/utils';

export function FormFieldWrapper({ label, id, error, required, children, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className={error ? "text-destructive" : ""}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
