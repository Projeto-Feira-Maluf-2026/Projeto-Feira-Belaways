import { Mail, Shield, UserCircle } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/hooks/use-auth';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Perfil" description="Dados do usuário autenticado." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent">
                <UserCircle className="h-10 w-10" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-xl font-extrabold tracking-[-0.03em] text-ink">
                {user?.fullName}
              </h2>
              <p className="text-sm text-muted">{user?.email}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Conta" />
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-chip p-4 shadow-[inset_0_0_0_1px_var(--line)]">
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted">E-mail</p>
              <p className="mt-1 font-medium text-ink">{user?.email}</p>
            </div>
            <div className="rounded-[18px] bg-chip p-4 shadow-[inset_0_0_0_1px_var(--line)]">
              <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted">Perfil</p>
              <p className="mt-1 font-medium text-ink">{user?.role}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
