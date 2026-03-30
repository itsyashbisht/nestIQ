// ── SectionHeader ─────────────────────────────────────────────────────────────
import { cn } from '@/src/lib/utils';

export function SectionHeader({
  label,
  title,
  subtitle,
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && <p className="section-label">{label}</p>}
      <h2 className="headline-display text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="text-primary max-w-xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}
