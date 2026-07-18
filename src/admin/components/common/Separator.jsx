import React from 'react';
import { cn } from '@/admin/lib/utils';

export function Separator({ className, orientation = "horizontal" }) {
  return (
    <div
      role="separator"
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
}
