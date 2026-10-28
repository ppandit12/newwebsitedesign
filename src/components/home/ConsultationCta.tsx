import { ArrowRight, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { consultationHref } from '../../lib/links';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { Bars } from '../ui/Primitives';

export function ConsultationCta({
  title = 'Ready to Take Control of Your Financial Future?',
  text = 'Request a free consultation or call us today to start working with a Greater Richmond area firm with a reputation for integrity and quality service.',
  from = 'cta-band',
}: {
  title?: string;
  text?: string;
  from?: string;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-labelledby={`${from}-title`}>
      <div className="relative mx-auto max-w-[76rem] overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          className="bg-ledger-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-navy-600/50 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl">
          <Bars className="mx-auto h-6 w-7" />
          <h2 id={`${from}-title`} className="mt-6 text-[2rem] leading-tight font-bold text-white sm:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-100/80">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to={consultationHref({ from })} variant="gold" size="lg">
              Book Free Consultation
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonAnchor href={company.phone.href} variant="outline-light" size="lg">
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
              Call Now: {company.phone.display}
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
