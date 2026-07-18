import React from 'react';
import { Input } from '@/admin/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/admin/lib/utils';

export const SearchInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        className={cn("pl-9", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";
