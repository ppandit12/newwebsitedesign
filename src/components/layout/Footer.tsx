import { Link } from 'react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import { company, navigation } from '../../data/company';
import { services } from '../../data/services';
import { Logo } from '../ui/Logo';
import { Bars } from '../ui/Primitives';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100/75">
      <div
        className="bg-ledger-dark absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)] opacity-60"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.2fr]">
          <div>
            <Logo tone="white" />
            <p className="mt-6 max-w-sm leading-relaxed">
              {company.legalName} plans for the future of its clients with accounting, financial modelling, consulting
              and tax planning — so you have more time to run your business.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-navy-100/60">
              <Bars className="h-3 w-3.5" /> {company.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick" className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
              Quick links
            </h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/#${s.id}`} className="transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">Contact</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={company.phone.href}
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Phone: </span>
                    {company.phone.display}
                  </span>
                </a>
              </li>
              <li>
                <a href={company.email.href} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Email: </span>
                    {company.email.display}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500" aria-hidden="true" />
                <span>
                  Virtually operated from the
                  <br />
                  {company.serviceArea}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 pb-28 text-sm text-navy-100/60 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy-policy/" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            {company.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
