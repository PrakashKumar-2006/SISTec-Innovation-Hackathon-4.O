import React from 'react';
import { FileQuestion } from 'lucide-react';
import { cn } from '@/admin/lib/utils';

export function EmptyState({ title, description, icon: Icon = FileQuestion, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="bg-muted p-4 rounded-full mb-4">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
