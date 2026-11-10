import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'green' | 'amber' | 'red' | 'purple' | 'blue';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-chip text-muted shadow-[inset_0_0_0_1px_var(--line)]',
  green: 'bg-pos/15 text-pos shadow-[inset_0_0_0_1px_rgb(var(--pos)/.3)]',
  amber: 'bg-warn/15 text-warn shadow-[inset_0_0_0_1px_rgb(var(--warn)/.3)]',
  red: 'bg-neg/15 text-neg shadow-[inset_0_0_0_1px_rgb(var(--neg)/.3)]',
  purple: 'bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgb(var(--accent)/.3)]',
  blue: 'bg-info/15 text-info shadow-[inset_0_0_0_1px_rgb(var(--info)/.3)]',
};

export const Badge = ({
  tone = 'neutral',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) => (
  <span
    className={cn(
      'inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold tabular-nums',
      tones[tone],
      className,
    )}
    {...props}
  />
);
