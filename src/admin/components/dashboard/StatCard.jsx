import React from 'react';
import { Card, CardContent } from '@/admin/components/ui/card';
import { cn } from '@/admin/lib/utils';

export function StatCard({ title, value, description, icon: Icon, trend, className }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground leading-none">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
              {trend && (
                <span className={cn("text-xs font-medium", trend > 0 ? "text-green-500" : "text-red-500")}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              )}
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
