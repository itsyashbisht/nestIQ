// ── Select ────────────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils';

export function Select({
  label,
  options,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium text-primary block">{label}</label>}
      <select className={cn('input-field appearance-none pr-8', className)} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
