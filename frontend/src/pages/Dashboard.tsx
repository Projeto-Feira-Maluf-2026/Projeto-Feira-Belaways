import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  PackageX,
  RefreshCw,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { orderLabels } from '@/components/ui/StatusBadge';
import { useAuth } from '@/hooks/use-auth';
import { useDashboard, useSyncProducts } from '@/hooks/use-data';
import { useTheme } from '@/hooks/use-theme';
import { cn, formatCurrency, formatDate, formatNumber } from '@/lib/utils';
import type { OrderStatus } from '@/types/domain';

type Metric = 'receita' | 'pedidos';

const statusTone: Record<OrderStatus, string> = {
  new: 'var(--info)',
  awaiting_payment: 'var(--warn)',
  paid: 'var(--pos)',
  awaiting_shipping: 'var(--warn)',
  shipped: 'var(--accent)',
  delivered: 'var(--pos)',
  delayed: 'var(--neg)',
  cancelled: 'var(--faint)',
};

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

/** Número que conta até o valor; parado para quem prefere menos movimento. */
const CountUp = ({
  value,
  format = formatNumber,
}: {
  value: number;
  format?: (v: number) => string;
}) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  const from = useRef(0);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return undefined;
    }
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(origin + (value - origin) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);

  return <>{format(shown)}</>;
};

const SectionTitle = ({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: ReactNode;
  action?: ReactNode;
}) => (
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div>
      <h2 className="text-base font-bold tracking-tight text-ink">{title}</h2>
      {sub ? <p className="mt-0.5 text-[13px] text-muted">{sub}</p> : null}
    </div>
    {action}
  </div>
);

/** Alternador com polegar que desliza, no estilo do GreensManage. */
const Segmented = ({ value, onChange }: { value: Metric; onChange: (v: Metric) => void }) => (
  <div
    role="radiogroup"
    aria-label="Métrica do gráfico"
    className="flex gap-0.5 rounded-full bg-chip p-1"
  >
    {(
      [
        ['receita', 'Receita'],
        ['pedidos', 'Pedidos'],
      ] as const
    ).map(([key, label]) => {
      const on = key === value;
      return (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={on}
          onClick={() => onChange(key)}
          className={cn(
            'relative rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
            on ? 'text-ink' : 'text-muted hover:text-ink',
          )}
        >
          {on ? (
            <motion.span
              layoutId="metric-thumb"
              transition={{ type: 'spring', stiffness: 520, damping: 36 }}
              className="absolute inset-0 rounded-full bg-[var(--glass-a)] shadow-[0_4px_12px_-4px_rgb(0_0_0/.25),inset_0_1px_0_var(--rim)]"
            />
          ) : null}
          <span className="relative">{label}</span>
        </button>
      );
    })}
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: number }) => (
  <div className="min-w-0">
    <p className="text-[12px] font-semibold text-muted">{label}</p>
    <p className="mt-1 font-display text-2xl font-extrabold leading-none tracking-[-0.03em] text-ink tabular-nums">
      <CountUp value={value} />
    </p>
  </div>
);

const AttentionRow = ({
  icon: Icon,
  label,
  hint,
  value,
  to,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  value: number;
  to: string;
  tone: 'neg' | 'warn';
}) => {
  const ok = value === 0;
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-[18px] px-3 py-3 transition hover:bg-chip"
    >
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-[14px]',
          ok
            ? 'bg-pos/12 text-pos'
            : tone === 'neg'
              ? 'bg-neg/12 text-neg'
              : 'bg-warn/12 text-warn',
        )}
      >
        {ok ? (
          <CheckCircle2 className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-ink">{label}</span>
        <span className="block truncate text-xs text-muted">
          {ok ? 'Tudo certo por aqui' : hint}
        </span>
      </span>
      <span
        className={cn(
          'font-display text-2xl font-extrabold tracking-[-0.03em] tabular-nums',
          ok ? 'text-faint' : tone === 'neg' ? 'text-neg' : 'text-warn',
        )}
      >
        {formatNumber(value)}
      </span>
      <ChevronRight
        className="h-4 w-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink"
        aria-hidden="true"
      />
    </Link>
  );
};

/** Barra empilhada com legenda; cada parte é um span com largura proporcional. */
const StackBar = ({ parts }: { parts: Array<{ key: string; value: number; color: string }> }) => {
  const total = parts.reduce((sum, part) => sum + part.value, 0) || 1;
  return (
    <div className="flex h-3 w-full gap-[3px] overflow-hidden rounded-full" aria-hidden="true">
      {parts
        .filter((part) => part.value > 0)
        .map((part, index) => (
          <motion.span
            key={part.key}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-full origin-left rounded-full"
            style={{ width: `${(part.value / total) * 100}%`, background: `rgb(${part.color})` }}
          />
        ))}
    </div>
  );
};

export const Dashboard = () => {
  const { data, isLoading, refetch, isFetching } = useDashboard();
  const syncProducts = useSyncProducts();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [metric, setMetric] = useState<Metric>('receita');
  const isSyncing = isFetching || syncProducts.isPending;
  const firstName = user?.fullName?.split(' ')[0];

  const handleSync = () => {
    void syncProducts
      .mutateAsync()
      .then(() => refetch())
      .catch(() => undefined);
  };

  const header = (
    <PageHeader
      eyebrow="Dashboard"
      title={firstName ? `${greeting()}, ${firstName}` : greeting()}
      description={
        data
          ? `Última sincronização: ${formatDate(data.lastSyncAt)}`
          : 'Indicadores operacionais consolidados.'
      }
      actions={
        <>
          {data ? (
            <Badge
              tone={
                data.apiStatus === 'online'
                  ? 'green'
                  : data.apiStatus === 'degraded'
                    ? 'amber'
                    : 'red'
              }
            >
              <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
              API {data.apiStatus}
            </Badge>
          ) : null}
          <Button variant="secondary" onClick={handleSync} disabled={isSyncing}>
            <RefreshCw className={cn('h-4 w-4', isSyncing && 'animate-spin')} aria-hidden="true" />
            {isSyncing ? 'Sincronizando' : 'Sincronizar'}
          </Button>
        </>
      }
    />
  );

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        {header}
        <LoadingState />
      </div>
    );
  }

  const { metrics } = data;
  const dark = theme === 'dark';
  const pink = dark ? '#ff78c8' : '#e0399f';
  const grid = dark ? 'rgba(255,255,255,0.07)' : 'rgba(70,20,50,0.08)';
  const axis = dark ? '#8c7884' : '#96808e';

  const revenue7d = data.salesTrend.reduce((sum, day) => sum + day.receita, 0);
  const orders7d = data.salesTrend.reduce((sum, day) => sum + day.pedidos, 0);
  const ticket = orders7d ? revenue7d / orders7d : 0;

  const healthy = Math.max(
    0,
    metrics.totalProducts - metrics.outOfStockProducts - metrics.lowStockProducts,
  );
  const stockParts = [
    { key: 'ok', label: 'Com estoque', value: healthy, color: 'var(--pos)' },
    { key: 'low', label: 'Estoque baixo', value: metrics.lowStockProducts, color: 'var(--warn)' },
    { key: 'out', label: 'Sem estoque', value: metrics.outOfStockProducts, color: 'var(--neg)' },
  ];
  const categories = [...data.stockByCategory].sort((a, b) => b.estoque - a.estoque).slice(0, 6);
  const maxCategory = Math.max(1, ...categories.map((item) => item.estoque));

  const statusRows = [...data.ordersByStatus]
    .sort((a, b) => b.quantidade - a.quantidade)
    .map((item) => ({
      key: item.status,
      label: orderLabels[item.status as OrderStatus] ?? item.status,
      value: item.quantidade,
      color: statusTone[item.status as OrderStatus] ?? 'var(--faint)',
    }));
  const statusTotal = statusRows.reduce((sum, row) => sum + row.value, 0) || 1;

  return (
    <div className="space-y-5">
      {header}

      <div className="grid gap-5 xl:grid-cols-12">
        {/* Vendas: total da semana, ticket e gráfico */}
        <Card className="p-5 md:p-6 xl:col-span-8">
          <SectionTitle
            title="Vendas"
            sub="Últimos 7 dias"
            action={<Segmented value={metric} onChange={setMetric} />}
          />
          <div className="mt-5 flex flex-wrap items-end gap-x-10 gap-y-5">
            <div>
              <p className="text-[12px] font-semibold text-muted">Receita na semana</p>
              <p className="mt-1 font-display text-[clamp(34px,4vw,48px)] font-extrabold leading-none tracking-[-0.04em] text-ink tabular-nums">
                <CountUp value={revenue7d} format={formatCurrency} />
              </p>
              <p className="mt-2 text-[13px] text-muted">
                Ticket médio{' '}
                <span className="font-bold text-ink tabular-nums">{formatCurrency(ticket)}</span> em{' '}
                {formatNumber(orders7d)} pedidos
              </p>
            </div>
            <div className="grid min-w-[16rem] flex-1 grid-cols-3 gap-5">
              <MiniStat label="Hoje" value={metrics.ordersToday} />
              <MiniStat label="Na semana" value={metrics.ordersWeek} />
              <MiniStat label="No mês" value={metrics.ordersMonth} />
            </div>
          </div>
          <div className="-mx-2 mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesTrend} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={pink} stopOpacity={0.32} />
                    <stop offset="100%" stopColor={pink} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={grid} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke={axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={axis}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={metric === 'receita' ? 64 : 36}
                  tickFormatter={(value: number) =>
                    metric === 'receita' ? `R$ ${formatNumber(value / 1000)}k` : formatNumber(value)
                  }
                />
                <Tooltip
                  cursor={{ stroke: pink, strokeOpacity: 0.3 }}
                  formatter={(value) =>
                    metric === 'receita'
                      ? [formatCurrency(Number(value)), 'Receita']
                      : [formatNumber(Number(value)), 'Pedidos']
                  }
                  contentStyle={{
                    borderRadius: 16,
                    border: 'none',
                    background: dark ? 'rgba(30,20,27,0.94)' : 'rgba(255,255,255,0.96)',
                    boxShadow: '0 18px 40px -18px rgba(60,10,40,0.5)',
                    color: dark ? '#faf0f6' : '#21101b',
                    fontWeight: 600,
                  }}
                  labelStyle={{ color: dark ? '#c8b4c0' : '#685260' }}
                />
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={pink}
                  strokeWidth={2.5}
                  fill="url(#trendFill)"
                  activeDot={{ r: 5, strokeWidth: 0, fill: pink }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Atenção: o que precisa de alguém hoje */}
        <Card className="p-5 md:p-6 xl:col-span-4">
          <SectionTitle title="Precisa de atenção" sub="Clique para resolver" />
          <div className="-mx-3 mt-3 space-y-1">
            <AttentionRow
              icon={Clock}
              label="Pedidos atrasados"
              hint="Fora do prazo de envio"
              value={metrics.delayedOrders}
              to="/orders"
              tone="neg"
            />
            <AttentionRow
              icon={PackageX}
              label="Sem estoque"
              hint="Produtos zerados no Tiny"
              value={metrics.outOfStockProducts}
              to="/products"
              tone="neg"
            />
            <AttentionRow
              icon={Bell}
              label="Alertas abertos"
              hint="Aguardando tratamento"
              value={metrics.openAlerts}
              to="/alerts"
              tone="warn"
            />
            <AttentionRow
              icon={AlertTriangle}
              label="Inconsistências"
              hint="Dados divergentes entre sistemas"
              value={metrics.inconsistencies}
              to="/alerts"
              tone="warn"
            />
          </div>
        </Card>

        {/* Estoque: saúde do catálogo e categorias */}
        <Card className="p-5 md:p-6 xl:col-span-5">
          <SectionTitle
            title="Estoque"
            sub={`${formatNumber(metrics.totalProducts)} produtos cadastrados`}
            action={
              <Link to="/products" className="text-[13px] font-bold text-accent hover:underline">
                Ver produtos
              </Link>
            }
          />
          <div className="mt-5">
            <StackBar parts={stockParts} />
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {stockParts.map((part) => (
                <li key={part.key} className="flex items-center gap-2 text-[13px] text-muted">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: `rgb(${part.color})` }}
                  />
                  {part.label}
                  <span className="font-bold text-ink tabular-nums">
                    {formatNumber(part.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mb-3 mt-6 text-[11.5px] font-bold uppercase tracking-[0.08em] text-faint">
            Unidades por categoria
          </p>
          <ul className="space-y-3">
            {categories.map((item, index) => (
              <li
                key={item.category}
                className="grid grid-cols-[minmax(0,7.5rem)_1fr_auto] items-center gap-3 text-sm"
              >
                <span className="truncate font-semibold text-ink">{item.category}</span>
                <span className="h-2 overflow-hidden rounded-full bg-chip">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                    className="block h-full origin-left rounded-full bg-pink"
                    style={{ width: `${(item.estoque / maxCategory) * 100}%` }}
                  />
                </span>
                <span className="w-12 text-right font-semibold text-muted tabular-nums">
                  {formatNumber(item.estoque)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Pedidos por situação */}
        <Card className="p-5 md:p-6 xl:col-span-7">
          <SectionTitle
            title="Pedidos por situação"
            sub={`${formatNumber(statusTotal)} pedidos no período`}
            action={
              <Link to="/orders" className="text-[13px] font-bold text-accent hover:underline">
                Ver pedidos
              </Link>
            }
          />
          <div className="mt-5">
            <StackBar parts={statusRows} />
          </div>
          <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
            {statusRows.map((row) => (
              <li
                key={row.key}
                className="flex items-center gap-3 border-b border-line py-3 text-sm"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: `rgb(${row.color})` }}
                />
                <span className="flex-1 font-semibold text-ink">{row.label}</span>
                <span className="text-xs text-muted tabular-nums">
                  {row.value > 0 && row.value / statusTotal < 0.01
                    ? '<1'
                    : Math.round((row.value / statusTotal) * 100)}
                  %
                </span>
                <span className="w-12 text-right font-bold text-ink tabular-nums">
                  {formatNumber(row.value)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
