import type { ReactNode } from 'react';

export const PageHeader = ({
  title,
  description,
  eyebrow = 'Belaways Intelligence',
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) => (
  <div className="flex animate-rise flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-1.5 font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
        {title}
      </h1>
      {description ? <p className="mt-2 max-w-[62ch] text-sm text-muted">{description}</p> : null}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
  </div>
);
