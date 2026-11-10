import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Ambient } from '@/components/ui/Ambient';

export const NotFound = () => (
  <main className="relative flex min-h-screen items-center justify-center px-6 text-ink">
    <Ambient />
    <div className="glass relative z-10 max-w-md animate-rise rounded-glass-xl px-8 py-10 text-center">
      <p className="bg-gradient-to-br from-[#c084fc] to-[#7e22ce] bg-clip-text font-display text-7xl font-extrabold tracking-[-0.05em] text-transparent">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em]">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        O endereço acessado não corresponde a uma tela ativa do sistema.
      </p>
      <Link
        to="/dashboard"
        className="btn-primary mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition active:scale-[0.97]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar ao dashboard
      </Link>
    </div>
  </main>
);
