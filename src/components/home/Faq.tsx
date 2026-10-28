import { Link } from 'react-router';
import { faqs } from '../../data/faqs';
import { company } from '../../data/company';
import { Accordion } from '../ui/Accordion';
import { SectionHeading } from '../ui/Primitives';

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Can’t find what you’re looking for?{' '}
            <Link
              to="/contact/"
              className="font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-4"
            >
              Send us a message
            </Link>{' '}
            or call{' '}
            <a href={company.phone.href} className="font-semibold whitespace-nowrap text-navy-900">
              {company.phone.display}
            </a>
            .
          </p>
        </div>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
