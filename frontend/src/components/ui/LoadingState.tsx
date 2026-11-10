export const LoadingState = ({ label = 'Carregando dados' }: { label?: string }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="status" aria-label={label}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="glass h-36 overflow-hidden">
        <div className="h-full w-full animate-pulse bg-gradient-to-br from-transparent via-chip to-transparent" />
      </div>
    ))}
  </div>
);
