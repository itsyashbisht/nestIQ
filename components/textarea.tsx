// ── Textarea ──────────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils';

export function Textarea({
  label,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-primary block">{label}</label>}
      <textarea className={cn('input-field resize-none', className)} {...props} />
    </div>
  );
}
