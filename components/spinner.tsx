// ── Loading Spinner ────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils';

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block w-5 h-5 border-2 border-surface-container-high border-t-secondary rounded-full animate-spin',
        className
      )}
    />
  );
}
