import { ArrowRight, Building2, Check, UserRound } from 'lucide-react';
import { Link } from 'react-router';
import { SectionHeading } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';

const paths = [
  {
    key: 'individuals',
    icon: UserRound,
    label: 'For individuals',
    title: 'File with confidence and plan ahead',
    items: ['Tax preparation', 'Tax planning', 'Financial guidance'],
    to: '/services/#individual-tax',
    cta: 'Individual services & pricing',
    dark: false,
  },
  {
    key: 'businesses',
    icon: Building2,
    label: 'For businesses',
    title: 'Keep your books clean and your strategy sharp',
    items: ['Bookkeeping', 'Business tax filing', 'CFO services', 'Financial modelling', 'Consulting'],
    to: '/services/#business-tax',
    cta: 'Business services & pricing',
    dark: true,
  },
];

export function Pathways() {
  return (
    <section className="section" aria-labelledby="pathways-title">
      <div className="container-page">
        <SectionHeading
          id="pathways-title"
          align="center"
          eyebrow="Who we help"
          title="Support for individuals and businesses"
          intro="Whether it’s your personal return or your company’s finances, start with the path that fits you."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <article
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 sm:p-11',
                  p.dark ? 'bg-navy-900 text-white' : 'border border-line bg-surface',
                )}
              >
                {p.dark && <div className="bg-ledger-dark absolute inset-0 opacity-70" aria-hidden="true" />}
                <div className="relative flex flex-1 flex-col">
                  <span
                    className={cn(
                      'grid h-13 w-13 place-items-center rounded-2xl',
                      p.dark ? 'bg-white/10 text-gold-400' : 'bg-white text-navy-900 shadow-card',
                    )}
                  >
                    <p.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <p className={cn('eyebrow mt-8', p.dark ? 'text-gold-400' : 'text-gold-700')}>{p.label}</p>
                  <h3 className={cn('mt-3 text-2xl leading-snug font-bold sm:text-[1.75rem]', p.dark && 'text-white')}>
                    {p.title}
                  </h3>
                  <ul className="mt-8 grid flex-1 content-start gap-3.5 sm:grid-cols-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className={cn(
                            'grid h-6 w-6 shrink-0 place-items-center rounded-full',
                            p.dark ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-white',
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className={p.dark ? 'text-navy-100' : 'text-ink'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.to}
                    className={cn(
                      'group mt-10 inline-flex items-center gap-2 self-start font-display font-semibold',
                      p.dark ? 'text-white' : 'text-navy-900',
                    )}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
