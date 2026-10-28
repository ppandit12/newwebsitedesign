import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, Phone, X } from 'lucide-react';
import { company, navigation } from '../../data/company';
import { consultationHref } from '../../lib/links';
import { cn } from '../../lib/cn';
import { ButtonLink } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, close on Escape, keep focus inside the panel.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(
        Boolean,
      ) as HTMLElement[];
    focusables()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab') {
        const els = focusables();
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // The bar is transparent at the top of the page (over the light homepage hero or the
  // navy band of inner pages) and becomes solid white once scrolled or the menu is open.
  const appearance = scrolled || open ? 'solid' : pathname === '/' ? 'clear-light' : 'clear-dark';
  const overDark = appearance === 'clear-dark';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300',
        appearance === 'solid' &&
          'border-line/80 bg-white/90 shadow-[0_8px_24px_-18px_rgb(11_31_58/0.25)] backdrop-blur-md',
        appearance === 'clear-light' && 'border-transparent bg-transparent',
        appearance === 'clear-dark' && 'border-white/10 bg-transparent',
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo tone={overDark ? 'white' : 'navy'} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-4 py-2 font-display text-[0.9375rem] font-semibold transition-colors',
                      overDark ? 'text-white/80 hover:text-white' : 'text-navy-900/70 hover:text-navy-900',
                      isActive && (overDark ? 'text-white' : 'text-navy-900'),
                      'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gold-500 after:transition-transform after:duration-300',
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.phone.href}
            className={cn(
              'hidden items-center gap-2 rounded-full px-3 py-2 font-display text-sm font-semibold transition-colors xl:inline-flex',
              overDark ? 'text-white/85 hover:text-white' : 'text-navy-900/80 hover:text-navy-900',
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {company.phone.display}
          </a>
          <ButtonLink
            to={consultationHref({ from: 'header' })}
            variant={overDark ? 'gold' : 'primary'}
            className="hidden sm:inline-flex"
          >
            Book Free Consultation
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden',
              overDark ? 'text-white hover:bg-white/10' : 'text-navy-900 hover:bg-navy-50',
            )}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-6">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 font-display text-2xl font-semibold',
                      isActive ? 'text-navy-900' : 'text-navy-900/60',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <ButtonLink to={consultationHref({ from: 'mobile-menu' })} size="lg">
              Book Free Consultation
            </ButtonLink>
            <a
              href={company.phone.href}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-line font-display font-semibold text-navy-900"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {company.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
