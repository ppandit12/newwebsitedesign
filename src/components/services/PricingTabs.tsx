import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight, Info } from 'lucide-react';
import { pricing, pricingDisclaimer, type PriceItem, type PricingCategory } from '../../data/pricing';
import { consultationHref } from '../../lib/links';
import { cn } from '../../lib/cn';

function PriceCard({ item, category }: { item: PriceItem; category: PricingCategory }) {
  return (
    <li className="group flex flex-col rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-navy-900/20 hover:shadow-lift">
      <h4 className="text-lg leading-snug font-bold text-navy-900">{item.name}</h4>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{item.description}</p>
      <div className="mt-7 border-t border-line pt-6">
        <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">{item.qualifier ?? 'Price'}</p>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 font-display text-navy-900">
          <span className="text-[2.25rem] leading-none font-extrabold tracking-tight">{item.amount}</span>
          {item.unit && <span className="font-semibold text-muted">{item.unit}</span>}
        </p>
        {item.alternative && <p className="mt-1.5 text-sm font-semibold text-gold-700">{item.alternative}</p>}
      </div>
      <Link
        to={consultationHref({ service: category.interest, pkg: item.name, from: `pricing:${category.id}` })}
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-navy-900/15 font-display text-[0.9375rem] font-semibold text-navy-900 transition-colors group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white"
      >
        Book Consultation
        <span className="sr-only"> for {item.name}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </li>
  );
}

/** Tabbed pricing (WAI-ARIA tabs pattern). Deep-linkable via /services/#<category-id>. */
export function PricingTabs() {
  const { hash } = useLocation();
  const [active, setActive] = useState(pricing[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = hash.slice(1);
    if (pricing.some((c) => c.id === id)) {
      setActive(id);
      sectionRef.current?.scrollIntoView();
    }
  }, [hash]);

  const select = (index: number) => {
    const next = pricing[(index + pricing.length) % pricing.length];
    setActive(next.id);
    tabRefs.current[(index + pricing.length) % pricing.length]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: pricing.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  };

  return (
    <div ref={sectionRef} className="scroll-mt-28">
      <div
        role="tablist"
        aria-label="Pricing categories"
        className="-mx-5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 lg:inline-flex lg:rounded-full lg:border lg:border-line lg:bg-white lg:p-1.5"
      >
        {pricing.map((c, i) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${c.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'h-11 shrink-0 rounded-full px-5 font-display text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-200',
                selected
                  ? 'bg-navy-900 text-white shadow-[0_8px_20px_-12px_rgb(11_31_58/0.8)]'
                  : 'border border-line bg-white text-navy-900/70 hover:text-navy-900 lg:border-transparent',
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {pricing.map((c) => (
        <div
          key={c.id}
          id={`panel-${c.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${c.id}`}
          hidden={c.id !== active}
          tabIndex={0}
          className="mt-10 rounded-[1.5rem] focus-visible:outline-offset-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold sm:text-[1.75rem]">{c.heading}</h3>
            <p className="mt-3 text-lg text-muted">{c.intro}</p>
          </div>
          <ul
            className={cn('mt-8 grid gap-5 sm:grid-cols-2', c.items.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3')}
          >
            {c.items.map((item) => (
              <PriceCard key={item.name} item={item} category={c} />
            ))}
          </ul>
        </div>
      ))}

      <p className="mt-8 flex items-start gap-2.5 text-sm text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {pricingDisclaimer}
      </p>
    </div>
  );
}
