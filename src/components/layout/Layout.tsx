import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { CalendarCheck, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { consultationHref } from '../../lib/links';
import { cn } from '../../lib/cn';
import { Footer } from './Footer';
import { Header } from './Header';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Scroll to the top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useIsoLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

/** Sticky call/book bar for small screens, shown after the hero has scrolled away. */
function MobileCtaBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The contact page already centres on the form.
  if (pathname.startsWith('/contact')) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 sm:hidden',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <a
          href={company.phone.href}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 font-display font-semibold text-navy-900"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
        <Link
          to={consultationHref({ from: 'mobile-bar' })}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-900 font-display font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Free Consultation
        </Link>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-navy-900 px-5 py-3 font-display font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
