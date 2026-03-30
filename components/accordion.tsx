// ── Accordion ─────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
