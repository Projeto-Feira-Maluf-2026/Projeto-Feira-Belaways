import { AlertCircle, ArrowRight, LockKeyhole } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/belaways-logo.png';
import { Ambient } from '@/components/ui/Ambient';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/use-auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const target =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  if (user) return <Navigate to={target} replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate(target, { replace: true });
    } catch (currentError) {
      setError(
        currentError instanceof Error ? currentError.message : 'Não foi possível autenticar.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative grid min-h-screen text-ink lg:grid-cols-[1.05fr_0.95fr]">
      <Ambient />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="glass w-full max-w-md animate-rise rounded-glass-xl p-7 sm:p-9">
          <img src={logo} alt="Belaways" className="mb-9 h-11 w-auto object-contain" />
          <div className="mb-7">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-[16px] bg-accent/12 text-accent">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="eyebrow">Acesso interno</span>
            <h1 className="mt-1.5 font-display text-3xl font-extrabold tracking-[-0.035em]">
              Entre na sua conta
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Gestão operacional, estoque, pedidos, auditoria e indicadores em uma única camada.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-muted">E-mail</span>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@belaways.com.br"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-muted">Senha</span>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error ? (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-control bg-neg/10 px-3.5 py-2.5 text-sm text-neg shadow-[inset_0_0_0_1px_rgb(var(--neg)/.3)]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando…' : 'Entrar'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </section>

      <section className="relative z-10 hidden min-h-screen p-10 lg:flex lg:flex-col lg:justify-end">
        <div className="max-w-xl animate-rise [animation-delay:.15s]">
          <span className="eyebrow">Belaways Intelligence</span>
          <h2 className="mt-3 font-display text-[clamp(40px,4.2vw,60px)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            Operação diária com dados <span className="text-accent">centralizados</span>, alerta
            cedo e decisão rápida.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Estoque', 'Pedidos', 'Logística', 'Auditoria'].map((item) => (
              <span
                key={item}
                className="glass rounded-full px-4 py-2 text-[13px] font-semibold text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
