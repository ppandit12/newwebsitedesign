import { ArrowRight } from 'lucide-react';
import { company } from '../../data/company';
import { ButtonLink } from '../ui/Button';
import { Eyebrow } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';

export function FounderPortrait({ className }: { className?: string }) {
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet="/images/kaleem-baig-480.webp 480w, /images/kaleem-baig-800.webp 800w, /images/kaleem-baig-1200.webp 1200w"
        sizes="(min-width: 1024px) 420px, 80vw"
      />
      <img
        src="/images/kaleem-baig-800.jpg"
        alt="Portrait of Kaleem Baig, CPA, founder of NumberX Financial Services"
        width={800}
        height={1067}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full rounded-[1.75rem] object-cover object-top"
      />
    </picture>
  );
}

export function FounderIntro() {
  const { founder } = company;
  return (
    <section className="section relative overflow-hidden bg-navy-900 text-white" aria-labelledby="founder-title">
      <div
        className="bg-ledger-dark absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2.1rem] border border-gold-500/40" aria-hidden="true" />
          <FounderPortrait className="relative block" />
        </Reveal>

        <div>
          <Eyebrow tone="dark">Meet the founder</Eyebrow>
          <h2 id="founder-title" className="mt-4 text-[2rem] leading-tight font-bold text-white sm:text-[2.5rem]">
            {founder.name}
          </h2>
          <p className="mt-2 font-display text-lg font-semibold text-gold-400">{founder.credential}</p>

          <p className="mt-8 text-lg leading-relaxed text-navy-100/85">
            NumberX is founded by {founder.name}, a Certified Public Accountant with {founder.experience} of experience
            in financial reporting, taxation, accounting, and financial modeling.
          </p>
          <p className="mt-5 leading-relaxed text-navy-100/70">
            Known for his analytical mindset and clear communication style, Kaleem helps businesses see beyond the
            numbers to make confident, data-driven decisions — with an approach grounded in integrity, precision, and a
            genuine desire to help clients achieve financial clarity and long-term stability.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Areas of expertise">
            {['Financial reporting', 'Taxation', 'Accounting', 'Financial modeling'].map((f) => (
              <li key={f} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-navy-100/90">
                {f}
              </li>
            ))}
          </ul>

          <ButtonLink to="/about/" variant="gold" className="mt-10">
            More about Kaleem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
