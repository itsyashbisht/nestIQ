// ── Input ─────────────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils';

export function Input({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-primary block">{label}</label>}
      <input className={cn('input-field', className)} {...props} />
    </div>
  );
}
