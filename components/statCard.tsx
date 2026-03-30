// ── StatCard ──────────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils';

export function StatCard({
  value,
  label,
  delta,
  accent,
}: {
  value: string;
  label: string;
  delta?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'card-editorial p-6 flex flex-col justify-between h-40',
        accent && 'border-l-4 border-secondary'
      )}
    >
      <p className="text-xs text-primary font-medium">{label}</p>
      <div>
        <p className="headline-display text-3xl mb-1">{value}</p>
        {delta && (
          <p
            className={cn(
              'text-xs font-medium',
              delta.startsWith('+') ? 'text-green-600' : 'text-red-500'
            )}
          >
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}
