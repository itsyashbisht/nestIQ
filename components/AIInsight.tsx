// ── AIInsight ─────────────────────────────────────────────────────────────────
import { cn } from '@/src/lib/utils';
import { Sparkles } from 'lucide-react';

export function AIInsight({
  children,
  title = 'AI Insight',
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn('ai-insight', className)}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
          {title}
        </span>
      </div>
      <p className="text-sm text-on-surface leading-relaxed">{children}</p>
    </div>
  );
}
