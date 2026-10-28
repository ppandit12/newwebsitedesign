import { ArrowRight, Phone } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { ConsultationCta } from '../components/home/ConsultationCta';
import { PricingTabs } from '../components/services/PricingTabs';
import { ServiceDetail } from '../components/services/ServiceDetail';
import { ButtonAnchor, ButtonLink } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/Primitives';
import { company } from '../data/company';
import { pages } from '../data/seo';
import { services } from '../data/services';
import { consultationHref } from '../lib/links';

export default function Services() {
  return (
    <>
      <Seo page={pages.services} />
      <PageHeader
        breadcrumb="Services"
        eyebrow="What we do"
        title="Tax Filing & Advisory Services — Tailored for You"
        intro="Explore our individual filing, business filing, tax planning and accounting services — with clear starting prices, so you know what to expect."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={consultationHref({ from: 'services-header' })} variant="gold" size="lg">
            Book a Free Consultation
            <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonAnchor href="#pricing" variant="outline-light" size="lg">
            View pricing
          </ButtonAnchor>
        </div>
      </PageHeader>

      <section id="pricing" className="section scroll-mt-20 bg-surface" aria-labelledby="pricing-title">
        <div className="container-page">
          <SectionHeading
            id="pricing-title"
            eyebrow="Pricing"
            title="Transparent starting prices"
            intro="Choose a category to compare services. Every engagement starts with a free initial consultation."
          />
          <div className="mt-12">
            <PricingTabs />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="all-services-title">
        <div className="container-page">
          <SectionHeading
            id="all-services-title"
            eyebrow="Our services"
            title="Expertise across accounting, tax and advisory"
            intro="Support for individuals, businesses and non-profit organizations — from day-to-day bookkeeping to strategic financial leadership."
          />
          <div className="mt-16">
            {services.map((s, i) => (
              <ServiceDetail key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4" aria-labelledby="speak-title">
        <div className="container-page">
          <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-2">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/office-640.webp 640w, /images/office-960.webp 960w"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
              <img
                src="/images/office-960.jpg"
                alt="A professional working at a computer in a bright, modern office"
                width={960}
                height={785}
                loading="lazy"
                decoding="async"
                className="h-full max-h-[26rem] w-full object-cover"
              />
            </picture>
            <div className="px-6 pb-10 sm:px-10 lg:py-12 lg:pr-14 lg:pl-0">
              <SectionHeading id="speak-title" eyebrow="Certified Public Accountant" title="Speak to a CPA" />
              <p className="mt-5 leading-relaxed text-muted">
                Connect with a Certified Public Accountant for personalized financial guidance. Whether you need tax
                advice, business consulting or accounting support, we’re here to help you make informed decisions with
                confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to={consultationHref({ from: 'services-speak-to-cpa' })}>
                  Schedule your consultation
                </ButtonLink>
                <ButtonAnchor href={company.phone.href} variant="outline">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {company.phone.display}
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCta
        from="services-cta"
        title="Request a personalized quote"
        text="Looking for a reliable CPA? Request a personalized quote for tax preparation, bookkeeping or business accounting."
      />
    </>
  );
}
