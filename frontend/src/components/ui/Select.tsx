import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'field h-11 rounded-control px-3.5 pr-9 text-sm text-ink outline-none transition focus:border-accent/60 focus:ring-4 focus:ring-accent/15 [&>option]:bg-bg [&>option]:text-ink',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
