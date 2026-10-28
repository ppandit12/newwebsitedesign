import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../../data/services';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/Primitives';
import { ButtonLink } from '../ui/Button';

export function ServiceHighlights() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Financial services built around your goals"
            intro="Accounting, tax and advisory support for individuals and businesses — handled with care, so you can focus on what you do best."
          />
          <ButtonLink to="/services/" variant="outline" className="self-start md:self-auto">
            View services & pricing
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.06}>
              <Link
                to={`/services/#${s.id}`}
                className="group relative flex h-full flex-col rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lift sm:p-8"
              >
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-navy-50 text-navy-900 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-gold-400">
                  <s.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-7 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{s.summary}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold text-navy-900">
                  Learn more
                  <span className="sr-only"> about {s.title}</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="absolute inset-x-8 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-gold-500 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
