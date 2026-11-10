import { Bell, Database, KeyRound, Save } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { Select } from '@/components/ui/Select';
import { usePreferences } from '@/hooks/use-data';

export const Settings = () => {
  const { data } = usePreferences();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Preferências, integrações e parâmetros operacionais."
        actions={
          <Button>
            <Save className="h-4 w-4" aria-hidden="true" />
            Salvar
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Preferências" action={<Bell className="h-5 w-5 text-accent" />} />
          <CardContent className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink/80">Tema</span>
              <Select defaultValue={data?.theme ?? 'system'}>
                <option value="system">Sistema</option>
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </Select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink/80">
                Estoque mínimo padrão
              </span>
              <Input type="number" defaultValue={data?.lowStockThreshold ?? 10} />
            </label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Integrações" action={<Database className="h-5 w-5 text-accent" />} />
          <CardContent className="space-y-4">
            {['Tiny ERP', 'Supabase Auth', 'Supabase Database'].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 rounded-[18px] bg-chip p-4 shadow-[inset_0_0_0_1px_var(--line)]"
              >
                <div className="flex items-center gap-3">
                  <KeyRound className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span className="font-medium text-ink">{item}</span>
                </div>
                <span className="text-sm text-pos">Preparado</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
