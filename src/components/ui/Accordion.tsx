import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Accessible disclosure list (WAI-ARIA accordion pattern), one item open at a time. */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question}>
            <h3 className="text-base sm:text-lg">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display font-semibold text-navy-900 transition-colors hover:text-navy-600"
              >
                {item.question}
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300',
                    isOpen ? 'rotate-45 border-navy-900 bg-navy-900 text-white' : 'border-line text-navy-900',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-2xl pr-12 pb-6 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
