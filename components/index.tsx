'use client';
import { cn } from '@/lib/utils';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';

// ── Badge ─────────────────────────────────────────────────────────────────────
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

// ── Input ─────────────────────────────────────────────────────────────────────
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

// ── Textarea ──────────────────────────────────────────────────────────────────
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

// ── Select ────────────────────────────────────────────────────────────────────
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

// ── AIInsight ─────────────────────────────────────────────────────────────────
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

// ── StepIndicator ─────────────────────────────────────────────────────────────
export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              'flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
              i + 1 === current
                ? 'bg-on-surface text-white'
                : i + 1 < current
                  ? 'text-secondary'
                  : 'text-primary'
            )}
          >
            <span
              className={cn(
                'w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold',
                i + 1 === current
                  ? 'bg-white text-on-surface'
                  : i + 1 < current
                    ? 'bg-secondary text-white'
                    : 'bg-surface-container text-primary'
              )}
            >
              {i + 1 < current ? '✓' : i + 1}
            </span>
            {step}
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'w-8 h-px mx-1',
                i + 1 < current ? 'bg-secondary' : 'bg-surface-container-high'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────
export function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden bg-surface-container-lowest"
      style={{ boxShadow: '0 2px 8px rgba(45,52,50,0.04)' }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-primary transition-transform duration-200 flex-shrink-0 ml-4',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-primary leading-relaxed border-t border-surface-container">
          {answer}
        </div>
      )}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
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

// ── StatCard ──────────────────────────────────────────────────────────────────
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

// ── Loading Spinner ────────────────────────────────────────────────────────────
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

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="font-poppins font-semibold text-lg text-on-surface mb-2">{title}</h3>
      {description && <p className="text-sm text-primary max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}
