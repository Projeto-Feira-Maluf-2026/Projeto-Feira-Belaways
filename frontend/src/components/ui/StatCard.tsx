import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn, formatNumber } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  tone?: 'purple' | 'green' | 'amber' | 'red' | 'blue';
  helper?: ReactNode;
};

const tones = {
  purple: 'from-[#e9d5ff] to-[#a855f7] text-[#3b0764] shadow-[0_10px_24px_-8px_rgb(168_85_247/.7)]',
  green: 'from-[#bbf7d0] to-[#22c55e] text-[#052e16] shadow-[0_10px_24px_-8px_rgb(34_197_94/.6)]',
  amber: 'from-[#fde68a] to-[#f59e0b] text-[#451a03] shadow-[0_10px_24px_-8px_rgb(245_158_11/.6)]',
  red: 'from-[#fecdd3] to-[#f43f5e] text-[#4c0519] shadow-[0_10px_24px_-8px_rgb(244_63_94/.6)]',
  blue: 'from-[#bae6fd] to-[#38bdf8] text-[#082f49] shadow-[0_10px_24px_-8px_rgb(56_189_248/.6)]',
};

export const StatCard = ({ title, value, icon: Icon, tone = 'purple', helper }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.985 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ y: -3 }}
    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    className="glass p-4 sm:p-5"
  >
    <div className="flex items-start justify-between gap-4">
      <p className="text-[13px] font-semibold text-muted">{title}</p>
      <div
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br',
          tones[tone],
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
      </div>
    </div>
    <p className="mt-3 font-display text-[28px] sm:text-[34px] font-extrabold leading-none tracking-[-0.04em] text-ink tabular-nums">
      {typeof value === 'number' ? formatNumber(value) : value}
    </p>
    {helper ? <div className="mt-3 text-xs text-muted">{helper}</div> : null}
  </motion.div>
);
