/** Blobs de luz em lilás, rosa e índigo atrás do vidro. Só decoração. */
export const Ambient = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 90% at 10% 0%, rgb(var(--bg-2)) 0%, transparent 55%), radial-gradient(90% 80% at 100% 100%, rgb(var(--bg-2)) 0%, transparent 60%), rgb(var(--bg))',
      }}
    />
    <div
      className="absolute -left-36 -top-24 h-[560px] w-[560px] animate-float rounded-full opacity-70 blur-[70px]"
      style={{ background: 'radial-gradient(circle, var(--blob-1), transparent 70%)' }}
    />
    <div
      className="absolute -right-28 top-[20%] h-[480px] w-[480px] animate-float rounded-full opacity-45 blur-[70px] [animation-delay:-7s]"
      style={{ background: 'radial-gradient(circle, var(--blob-2), transparent 70%)' }}
    />
    <div
      className="absolute -bottom-72 left-[30%] h-[640px] w-[640px] animate-float rounded-full opacity-60 blur-[70px] [animation-delay:-13s]"
      style={{ background: 'radial-gradient(circle, var(--blob-3), transparent 70%)' }}
    />
  </div>
);
