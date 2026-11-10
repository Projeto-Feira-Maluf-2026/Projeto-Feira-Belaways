import {
  AlertTriangle,
  Boxes,
  CalendarDays,
  ClipboardList,
  PackageCheck,
  PackageX,
  RefreshCw,
  ShoppingBag,
  Wifi,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { useDashboard, useSyncProducts } from '@/hooks/use-data';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency, formatDate } from '@/lib/utils';

export const Dashboard = () => {
  const { data, isLoading, refetch, isFetching } = useDashboard();
  const syncProducts = useSyncProducts();
  const { theme } = useTheme();
  const isSyncing = isFetching || syncProducts.isPending;

  const handleSync = () => {
    void syncProducts
      .mutateAsync()
      .then(() => refetch())
      .catch(() => undefined);
  };

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Indicadores operacionais consolidados." />
        <LoadingState />
      </div>
    );
  }

  const metrics = data.metrics;
  const dark = theme === 'dark';
  const chart = {
    accent: dark ? '#c48cff' : '#9333ea',
    grid: dark ? 'rgba(255,255,255,0.08)' : 'rgba(60,30,90,0.09)',
    axis: dark ? '#968cac' : '#8c7ca0',
    bar: dark ? ['#f0abfc', '#7e22ce'] : ['#e879f9', '#9333ea'],
  };
  const tooltipProps = {
    cursor: { fill: dark ? 'rgba(255,255,255,0.05)' : 'rgba(147,51,234,0.06)' },
    contentStyle: {
      borderRadius: 16,
      border: 'none',
      background: dark ? 'rgba(28,14,44,0.92)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 18px 40px -18px rgba(40,10,70,0.55)',
      color: dark ? '#f8f1ff' : '#1c0c2e',
      fontWeight: 600,
    },
    labelStyle: { color: dark ? '#cebee2' : '#5c4a70' },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Indicadores operacionais consolidados."
        actions={
          <>
            <Badge tone={data.apiStatus === 'online' ? 'green' : 'amber'}>
              <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
              API {data.apiStatus}
            </Badge>
            <Button variant="secondary" onClick={handleSync} disabled={isSyncing}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Sincronizar
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          title="Produtos cadastrados"
          value={metrics.totalProducts}
          icon={PackageCheck}
          tone="purple"
        />
        <StatCard
          title="Pedidos hoje"
          value={metrics.ordersToday}
          icon={ShoppingBag}
          tone="green"
        />
        <StatCard
          title="Pedidos na semana"
          value={metrics.ordersWeek}
          icon={CalendarDays}
          tone="blue"
        />
        <StatCard
          title="Pedidos no mês"
          value={metrics.ordersMonth}
          icon={ClipboardList}
          tone="purple"
        />
        <StatCard
          title="Sem estoque"
          value={metrics.outOfStockProducts}
          icon={PackageX}
          tone="red"
        />
        <StatCard
          title="Estoque baixo"
          value={metrics.lowStockProducts}
          icon={Boxes}
          tone="amber"
        />
        <StatCard
          title="Pedidos atrasados"
          value={metrics.delayedOrders}
          icon={AlertTriangle}
          tone="red"
        />
        <StatCard
          title="Inconsistências"
          value={metrics.inconsistencies}
          icon={AlertTriangle}
          tone="amber"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader
            title="Pedidos e receita"
            description={`Última sincronização: ${formatDate(data.lastSyncAt)}`}
          />
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesTrend}>
                <defs>
                  <linearGradient id="ordersGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor={chart.accent} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={chart.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke={chart.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke={chart.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  {...tooltipProps}
                  formatter={(value, name) =>
                    name === 'receita'
                      ? [formatCurrency(Number(value)), 'Receita']
                      : [value, 'Pedidos']
                  }
                />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke={chart.accent}
                  fill="url(#ordersGradient)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Estoque por categoria" />
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stockByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke={chart.axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke={chart.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipProps} />
                <defs>
                  <linearGradient id="stockGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={chart.bar[0]} />
                    <stop offset="100%" stopColor={chart.bar[1]} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="estoque"
                  radius={[10, 10, 4, 4]}
                  fill="url(#stockGradient)"
                  maxBarSize={44}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Pedidos por situação" />
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.ordersByStatus.map((item) => (
            <div
              key={item.status}
              className="rounded-[18px] bg-chip p-4 shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <p className="text-sm text-muted">{item.status}</p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink tabular-nums">
                {item.quantidade}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
