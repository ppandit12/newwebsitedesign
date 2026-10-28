import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * Four ascending bars — a motif lifted from the NumberX logo mark,
 * used as a small brand signature beside eyebrows and in decoration.
 */
export function Bars({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'navy' | 'white' }) {
  const fill = { gold: 'fill-gold-500', navy: 'fill-navy-900', white: 'fill-white' }[tone];
  return (
    <svg viewBox="0 0 16 14" aria-hidden="true" className={cn('h-3.5 w-4 shrink-0', fill, className)}>
      <rect x="0" y="8" width="2.6" height="6" rx="0.5" />
      <rect x="4.4" y="5.5" width="2.6" height="8.5" rx="0.5" />
      <rect x="8.8" y="3" width="2.6" height="11" rx="0.5" />
      <rect x="13.2" y="0" width="2.6" height="14" rx="0.5" />
    </svg>
  );
}

export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p className={cn('eyebrow', tone === 'light' ? 'text-gold-700' : 'text-gold-400', className)}>
      <Bars tone="gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  as: As = 'h2',
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={align === 'center' ? 'justify-center' : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <As
        id={id}
        className={cn(
          'mt-4 text-[2rem] leading-[1.12] font-bold sm:text-[2.5rem] lg:text-[2.75rem]',
          tone === 'dark' && 'text-white',
        )}
      >
        {title}
      </As>
      {intro && (
        <p className={cn('mt-5 text-lg leading-relaxed', tone === 'dark' ? 'text-navy-100/80' : 'text-muted')}>
          {intro}
        </p>
      )}
    </div>
  );
}
