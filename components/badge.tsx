// ── Badge ─────────────────────────────────────────────────────────────────────
import { cn } from '@/src/lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'amber' | 'success' | 'warning' | 'error';
  className?: string;
}) {
  const variants = {
    default: 'bg-surface-container text-on-surface',
    amber: 'text-secondary',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-600',
  };

  const style =
    variant === 'amber'
      ? { background: 'var(--secondary-container)', color: 'var(--secondary)' }
      : {};

  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full',
        variants[variant],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
