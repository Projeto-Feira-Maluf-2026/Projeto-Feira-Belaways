import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('glass min-w-0 animate-rise', className)} {...props} />
);

export const CardHeader = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) => (
  <div className="flex flex-col gap-3 px-5 pb-1 pt-5 sm:flex-row sm:items-center sm:justify-between md:px-6 md:pt-6">
    <div>
      <h2 className="text-base font-bold tracking-tight text-ink">{title}</h2>
      {description ? <p className="mt-0.5 text-[13px] text-muted">{description}</p> : null}
    </div>
    {action}
  </div>
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5 md:p-6', className)} {...props} />
);
