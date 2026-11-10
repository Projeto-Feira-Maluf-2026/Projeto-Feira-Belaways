import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type DataColumn<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export const DataTable = <T extends { id: string }>({
  rows,
  columns,
  empty,
}: {
  rows: T[];
  columns: Array<DataColumn<T>>;
  empty?: string;
}) => (
  <div className="glass animate-rise overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left">
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column.header}
                className={cn(
                  'whitespace-nowrap px-4 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-faint first:pl-6 last:pr-6',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.id} className="transition-colors duration-200 hover:bg-chip">
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.header}`}
                  className={cn('px-4 py-3.5 text-ink first:pl-6 last:pr-6', column.className)}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {rows.length === 0 ? (
      <div className="px-4 py-12 text-center text-sm text-muted">
        {empty ?? 'Nenhum registro encontrado.'}
      </div>
    ) : null}
  </div>
);
