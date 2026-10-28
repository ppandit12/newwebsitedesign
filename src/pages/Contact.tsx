import { lazy, Suspense, type ReactNode } from 'react';
import { CalendarDays, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { PageHeader } from '../components/ui/PageHeader';
import { company } from '../data/company';
import { pages } from '../data/seo';

// The form (and its validation libraries) is only needed on this page, so it loads as a separate chunk.
const ConsultationForm = lazy(() =>
  import('../components/forms/ConsultationForm').then((m) => ({ default: m.ConsultationForm })),
);

function FormSkeleton() {
  return (
    <div className="grid gap-5" aria-busy="true" aria-label="Loading form">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-[4.5rem] animate-pulse rounded-xl bg-surface" />
      ))}
      <div className="h-32 animate-pulse rounded-xl bg-surface" />
      <div className="h-13 w-56 animate-pulse rounded-full bg-navy-100" />
    </div>
  );
}

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-400">{icon}</span>
      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-navy-100/60 uppercase">{label}</p>
        <div className="mt-1 font-display text-[1.0625rem] font-semibold text-white">{children}</div>
      </div>
    </li>
  );
}

export default function Contact() {
  const { address } = company;
  return (
    <>
      <Seo page={pages.contact} />
      <PageHeader
        breadcrumb="Contact"
        eyebrow="Get in touch"
        title="Request a free consultation"
        intro="Get expert tax and accounting advice. Tell us a little about your needs and we’ll be in touch — or call us directly."
      />

      <section id="consultation" className="section scroll-mt-16 bg-surface" aria-labelledby="form-title">
        <div className="container-page grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10">
          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 id="form-title" className="text-2xl font-bold sm:text-[1.75rem]">
              Tell us about your needs
            </h2>
            <p className="mt-2 mb-8 text-muted">We offer a free initial consultation to small business owners.</p>
            <Suspense fallback={<FormSkeleton />}>
              <ConsultationForm />
            </Suspense>
          </div>

          <aside className="grid content-start gap-6" aria-label="Contact details">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 p-8 sm:p-10">
              <div className="bg-ledger-dark absolute inset-0 opacity-70" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-xl font-bold text-white">Contact details</h2>
                <ul className="mt-8 grid gap-7">
                  <DetailRow icon={<Phone className="h-5 w-5" aria-hidden="true" />} label="Phone">
                    <a href={company.phone.href} className="hover:text-gold-400">
                      {company.phone.display}
                    </a>
                  </DetailRow>
                  <DetailRow icon={<Mail className="h-5 w-5" aria-hidden="true" />} label="Email">
                    <a href={company.email.href} className="break-all hover:text-gold-400">
                      {company.email.display}
                    </a>
                  </DetailRow>
                  <DetailRow icon={<MapPin className="h-5 w-5" aria-hidden="true" />} label="Address">
                    <address className="not-italic">
                      {address.street}, {address.suite}
                      <br />
                      {address.city}, {address.region} {address.postalCode}
                    </address>
                  </DetailRow>
                  <DetailRow icon={<Clock className="h-5 w-5" aria-hidden="true" />} label="How we work">
                    Virtually, from the {company.serviceArea}
                  </DetailRow>
                </ul>
              </div>
            </div>

            {company.bookingUrl ? (
              <div className="rounded-[1.75rem] border border-line bg-white p-8">
                <CalendarDays className="h-6 w-6 text-gold-700" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-bold">Prefer to pick a time?</h2>
                <p className="mt-2 text-muted">Choose a time that suits you for your free consultation.</p>
                <a
                  href={company.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-4"
                >
                  Schedule online <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-line bg-white p-8">
                <h2 className="text-lg font-bold">Prefer to talk now?</h2>
                <p className="mt-2 leading-relaxed text-muted">
                  Call us at{' '}
                  <a href={company.phone.href} className="font-semibold text-navy-900">
                    {company.phone.display}
                  </a>{' '}
                  to start working with a Greater Richmond area firm with a reputation for integrity and quality
                  service.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
