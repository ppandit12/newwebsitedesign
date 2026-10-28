import { ArrowRight, BadgeCheck } from 'lucide-react';
import { company } from '../../data/company';
import { consultationHref } from '../../lib/links';
import { ButtonLink } from '../ui/Button';
import { Bars, Eyebrow } from '../ui/Primitives';

const proofPoints = [
  'Led by a Certified Public Accountant',
  'Over a decade of experience',
  'Free initial consultation',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="hero-title">
      <div
        className="bg-ledger absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-14 pt-32 pb-20 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-40 lg:pb-28">
        <div className="max-w-xl">
          <Eyebrow>{company.tagline}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-[2.625rem] leading-[1.04] font-extrabold tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          >
            Clarity in Your Numbers.{' '}
            <span className="relative whitespace-nowrap text-navy-600">
              Confidence
              <svg
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-gold-500"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 60 3, 150 2, 218 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            in Your Future.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">
            Expert accounting, tax planning, and financial advisory services designed to help individuals and businesses
            make smarter financial decisions.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={consultationHref({ from: 'hero' })} size="lg">
              Book a Free Consultation
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/services/" variant="outline" size="lg">
              Explore Services
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-3 text-[0.9375rem] text-ink sm:grid-cols-1">
            {proofPoints.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <BadgeCheck className="h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual composition */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
          <div
            className="absolute -top-6 -right-6 bottom-16 left-14 rounded-[2rem] bg-navy-900 sm:-right-8"
            aria-hidden="true"
          >
            <div className="bg-ledger-dark absolute inset-0 rounded-[2rem]" />
          </div>
          <picture>
            <source
              type="image/webp"
              srcSet="/images/office-640.webp 640w, /images/office-960.webp 960w, /images/office-1400.webp 1400w"
              sizes="(min-width: 1024px) 520px, 92vw"
            />
            <img
              src="/images/office-960.jpg"
              alt="A professional working at a computer in a bright, modern office"
              width={960}
              height={785}
              fetchPriority="high"
              className="relative aspect-[4/4.4] w-full rounded-[1.75rem] object-cover object-[60%_center] shadow-lift"
            />
          </picture>

          {/* Founder card */}
          <div className="absolute -bottom-8 left-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 pr-6 shadow-lift sm:-left-10">
            <img
              src="/images/kaleem-baig-480.webp"
              alt=""
              width={96}
              height={96}
              className="h-14 w-14 rounded-full bg-navy-100 object-cover object-top"
            />
            <div>
              <p className="font-display font-bold text-navy-900">{company.founder.name}, CPA</p>
              <p className="text-sm text-muted">Founder, {company.legalName}</p>
            </div>
          </div>

          {/* Services tag */}
          <div className="absolute top-8 -left-3 hidden rounded-2xl bg-white/95 px-5 py-4 shadow-card backdrop-blur sm:block lg:-left-12">
            <div className="flex items-end gap-1.5" aria-hidden="true">
              {[10, 16, 22, 30].map((h, i) => (
                <span
                  key={h}
                  className={i === 3 ? 'w-2.5 rounded-sm bg-gold-500' : 'w-2.5 rounded-sm bg-navy-900'}
                  style={{ height: h }}
                />
              ))}
            </div>
            <p className="mt-3 font-display text-sm font-bold text-navy-900">Tax · Accounting · Advisory</p>
          </div>
          <Bars className="absolute -right-2 -bottom-3 h-10 w-12 opacity-90 sm:-right-4" tone="gold" />
        </div>
      </div>
    </section>
  );
}
