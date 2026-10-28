import { SectionHeading } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';

// CLIENT-APPROVE: proposed engagement process — not described on the current site.
const steps = [
  {
    title: 'Initial Consultation',
    text: 'A free conversation about where you are today, what you need help with, and what you want to achieve.',
  },
  {
    title: 'Financial Assessment',
    text: 'We review your records, returns and current processes to understand the full picture.',
  },
  {
    title: 'Personalized Strategy',
    text: 'You receive clear recommendations and a plan tailored to your situation.',
  },
  {
    title: 'Ongoing Support',
    text: 'We handle the work and stay available year-round as your needs change.',
  },
];

export function Process() {
  return (
    <section className="section bg-surface" aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="A simple, transparent process"
          intro="From the first conversation to ongoing support, you always know what happens next."
        />
        <div className="relative mt-16">
          <div
            className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-navy-900/15 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-navy-900 font-display text-sm font-bold text-white ring-8 ring-surface">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
