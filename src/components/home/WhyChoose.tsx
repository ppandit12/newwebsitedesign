import { CalendarClock, Compass, HeartHandshake, Lightbulb, MessagesSquare, Building2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/Primitives';

const reasons = [
  {
    icon: Compass,
    title: 'Personalized financial guidance',
    text: 'Advice shaped around your situation and goals — not a one-size-fits-all package.',
  },
  {
    icon: Lightbulb,
    title: 'Clear financial insights',
    text: 'We help you see beyond the numbers so you can make confident, data-driven decisions.',
  },
  {
    icon: CalendarClock,
    title: 'Proactive tax planning',
    text: 'Year-round planning rather than a once-a-year scramble, with quarterly and year-end strategy sessions.',
  },
  {
    icon: Building2,
    title: 'Business-focused accounting',
    text: 'From bookkeeping to CFO-level reporting, support that grows with your business.',
  },
  {
    icon: MessagesSquare,
    title: 'Professional communication',
    text: 'A clear communication style — straightforward explanations without the jargon.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term relationships',
    text: 'A practice grounded in integrity and precision, built on lasting client relationships.',
  },
];

export function WhyChoose() {
  return (
    <section className="section bg-surface" aria-labelledby="why-title">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="why-title"
            eyebrow="Why NumberX"
            title="A trusted partner for your financial decisions"
            intro="With NumberX on your side, you’ll have more time to run your business while leaving your accounting, bookkeeping and tax concerns to us."
          />
          <div className="relative mt-10 hidden lg:block">
            <img
              src="/images/calculator-notes-640.webp"
              alt="Working through figures with a calculator and handwritten notes"
              width={640}
              height={426}
              loading="lazy"
              decoding="async"
              className="w-full max-w-md rounded-card object-cover shadow-card"
            />
            <div className="absolute -right-0 -bottom-6 max-w-[15rem] rounded-2xl bg-navy-900 p-5 text-white shadow-lift xl:right-6">
              <p className="font-display text-sm leading-snug font-semibold">
                “My goal is to serve with honesty, bring clarity where there’s confusion, and build lasting
                relationships along the way.”
              </p>
              <p className="mt-2 text-xs text-gold-400">Kaleem Baig, CPA</p>
            </div>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 2) * 0.06} className="border-t border-navy-900/10 pt-7">
              <r.icon className="h-6 w-6 text-gold-700" aria-hidden="true" strokeWidth={1.75} />
              <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
