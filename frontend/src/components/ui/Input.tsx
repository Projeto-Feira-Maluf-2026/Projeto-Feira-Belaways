import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'field h-11 w-full rounded-control px-3.5 text-sm text-ink outline-none transition placeholder:text-faint focus:border-accent/60 focus:ring-4 focus:ring-accent/15',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
