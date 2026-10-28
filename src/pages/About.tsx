import { Scale, Search, Sparkles } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { ConsultationCta } from '../components/home/ConsultationCta';
import { FounderPortrait } from '../components/home/FounderIntro';
import { PageHeader } from '../components/ui/PageHeader';
import { Eyebrow } from '../components/ui/Primitives';
import { Reveal } from '../components/ui/Reveal';
import { company } from '../data/company';
import { pages } from '../data/seo';

// Values are drawn directly from the founder's own words on the live About page.
const principles = [
  {
    icon: Scale,
    title: 'Integrity & precision',
    text: 'An approach grounded in integrity, precision, and a genuine desire to help clients achieve financial clarity.',
  },
  {
    icon: Search,
    title: 'Clarity over confusion',
    text: 'Serving with honesty and bringing clarity where there’s confusion — so your financial life is simpler and stronger.',
  },
  {
    icon: Sparkles,
    title: 'Curious & grateful',
    text: 'Staying curious, positive and grateful, and treating every client, project and challenge as a chance to learn.',
  },
];

export default function About() {
  const { founder } = company;
  return (
    <>
      <Seo
        page={pages.about}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: founder.name,
            jobTitle: founder.credential,
            worksFor: { '@id': `${company.siteUrl}/#business` },
            image: `${company.siteUrl}/images/kaleem-baig-800.jpg`,
          },
        ]}
      />
      <PageHeader
        breadcrumb="About"
        eyebrow="A few words"
        title="About NumberX"
        intro="A Richmond, Virginia practice led by a Certified Public Accountant who believes good financial advice starts with clarity and trust."
      />

      {/* Professional overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none lg:self-start">
            <div className="absolute -inset-3 rounded-[2.1rem] border border-gold-500/50" aria-hidden="true" />
            <FounderPortrait className="relative block" />
            <div className="relative mt-6 flex items-center justify-between gap-4 rounded-2xl bg-navy-900 px-6 py-5 text-white">
              <div>
                <p className="font-display text-lg font-bold">{founder.name}</p>
                <p className="text-sm text-navy-100/75">Founder · {founder.credential}</p>
              </div>
              <span className="rounded-full border border-gold-500/60 px-3 py-1 font-display text-sm font-bold text-gold-400">
                {founder.shortCredential}
              </span>
            </div>
          </Reveal>

          <div>
            <Eyebrow>Professional overview</Eyebrow>
            <h2 id="overview-title" className="mt-4 text-[2rem] leading-tight font-bold sm:text-[2.5rem]">
              Helping clients see beyond the numbers
            </h2>
            <div className="prose-nx mt-8 text-lg leading-relaxed text-ink/85">
              <p className="first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-navy-900">
                NumberX is founded by {founder.name}. Kaleem is a Certified Public Accountant with {founder.experience}{' '}
                of experience in financial reporting, taxation, accounting, and financial modeling.
              </p>
              <p>
                Known for his analytical mindset and clear communication style, Kaleem helps businesses see beyond the
                numbers to make confident, data-driven decisions.
              </p>
              <p>
                His approach is grounded in integrity, precision, and a genuine desire to help clients achieve financial
                clarity and long-term stability.
              </p>
            </div>

            <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {[
                ['Credential', founder.credential],
                ['Experience', 'Over a decade'],
                ['Expertise', 'Financial reporting · Taxation'],
                ['Also', 'Accounting · Financial modeling'],
              ].map(([k, v]) => (
                <div key={k} className="bg-white p-6">
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">{k}</dt>
                  <dd className="mt-2 font-display font-bold text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Personal mission */}
            <div className="mt-20">
              <Eyebrow>Mission</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-tight font-bold sm:text-[2.5rem]">Personal mission</h2>
              <figure className="mt-8 border-l-2 border-gold-500 pl-6 sm:pl-8">
                <blockquote className="prose-nx text-lg leading-relaxed text-ink/85">
                  <p>
                    I’m someone who finds real joy in solving problems and helping people feel at ease with their
                    finances. Numbers have always fascinated me, but what truly drives me is the trust and growth that
                    come from working closely with clients. Outside of work, I enjoy playing sports and spending time
                    with my family.
                  </p>
                  <p>
                    I believe in staying curious, positive, and grateful. Every client, every project, every challenge
                    is a chance to learn and to make someone’s financial life simpler and stronger. My goal is to serve
                    with honesty, bring clarity where there’s confusion, and build lasting relationships along the way.
                  </p>
                </blockquote>
                <figcaption className="mt-6 font-display font-semibold text-navy-900">— {founder.name}, CPA</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section bg-surface" aria-labelledby="philosophy-title">
        <div className="container-page">
          <div className="max-w-2xl">
            <Eyebrow>Financial philosophy</Eyebrow>
            <h2 id="philosophy-title" className="mt-4 text-[2rem] leading-tight font-bold sm:text-[2.5rem]">
              Our commitment to clients
            </h2>
          </div>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="rounded-card border border-line bg-white p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                  <p.icon className="h-5.5 w-5.5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ConsultationCta from="about-cta" title="Let’s talk about your finances" />
    </>
  );
}
