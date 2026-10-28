import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import type { Service } from '../../data/services';
import { pricing } from '../../data/pricing';
import { consultationHref } from '../../lib/links';
import { ButtonLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const tab = pricing.find((p) => p.id === service.pricingTab);
  return (
    <Reveal>
      <article
        id={service.id}
        aria-labelledby={`${service.id}-title`}
        className="grid scroll-mt-28 gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 lg:grid-cols-[0.35fr_1fr_0.75fr] lg:gap-12"
      >
        <div className="flex items-start gap-4 lg:flex-col lg:gap-6">
          <span className="font-display text-sm font-bold text-gold-700" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-gold-400">
            <service.icon className="h-6.5 w-6.5" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>

        <div>
          <h3 id={`${service.id}-title`} className="text-2xl font-bold sm:text-[1.75rem]">
            {service.title}
          </h3>
          <div className="prose-nx mt-4 text-[1.0625rem] leading-relaxed text-muted">
            {service.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink to={consultationHref({ service: service.interest, from: `service:${service.id}` })}>
              Book Consultation
              <span className="sr-only"> for {service.title}</span>
            </ButtonLink>
            {tab && (
              <Link
                to={`/services/#${tab.id}`}
                className="group inline-flex items-center gap-1.5 font-display font-semibold text-navy-900"
              >
                See pricing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        <ul
          className="grid content-start gap-3 rounded-card bg-surface p-6 sm:p-7"
          aria-label={`${service.title} includes`}
        >
          {service.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-[0.9375rem] text-ink">
              <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-700" strokeWidth={2.5} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
