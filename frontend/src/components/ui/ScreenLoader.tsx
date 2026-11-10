import { Ambient } from '@/components/ui/Ambient';

export const ScreenLoader = ({ label }: { label: string }) => (
  <div className="relative flex min-h-screen items-center justify-center text-ink">
    <Ambient />
    <div className="glass relative z-10 flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-muted">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-accent/25 border-t-accent"
        aria-hidden="true"
      />
      {label}
    </div>
  </div>
);
