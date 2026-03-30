import { cn } from '@/src/lib/utils';

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              'flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
              i + 1 === current
                ? 'bg-[linear-gradient(145deg,#9c36b5_0%,#7e2d93_100%)] text-white shadow-[0_12px_28px_rgba(156,54,181,0.2)]'
                : i + 1 < current
                  ? 'text-secondary'
                  : 'text-[#475569]'
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold',
                i + 1 === current
                  ? 'bg-white text-secondary'
                  : i + 1 < current
                    ? 'bg-secondary text-white'
                    : 'bg-[var(--secondary-container)] text-secondary'
              )}
            >
              {i + 1 < current ? '✓' : i + 1}
            </span>
            {step}
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'mx-1 h-px w-8',
                i + 1 < current ? 'bg-secondary' : 'bg-[var(--secondary-container)]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
