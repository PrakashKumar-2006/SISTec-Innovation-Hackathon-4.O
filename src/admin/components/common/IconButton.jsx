import React from 'react';
import { Button } from '@/admin/components/ui/button';
import { cn } from '@/admin/lib/utils';

export const IconButton = React.forwardRef(({ icon: Icon, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 rounded-full", className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Toggle icon</span>
    </Button>
  );
});

IconButton.displayName = "IconButton";
