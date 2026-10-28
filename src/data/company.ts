/**
 * Verified business facts, taken from mynumberx.com (audited Oct 2026).
 * Anything marked CLIENT-CONFIRM should be confirmed by the client before launch.
 */
export const company = {
  name: 'NumberX',
  legalName: 'NumberX Financial Services',
  tagline: 'Richmond, VA Certified Public Accountant',
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://mynumberx.com',

  phone: {
    display: '804-630-1091',
    href: 'tel:+18046301091',
    e164: '+18046301091',
  },
  email: {
    display: 'info@mynumberx.com',
    href: 'mailto:info@mynumberx.com',
  },
  // CLIENT-CONFIRM: exact suite formatting ("Suite 1051 536") as published on the contact page.
  address: {
    street: '701 E Franklin Street',
    suite: 'Suite 1051 536',
    city: 'Richmond',
    region: 'VA',
    postalCode: '23219',
    country: 'US',
  },
  serviceArea: 'Greater Richmond Area, Virginia',
  /** The live site's footer states the practice is operated virtually. */
  operatesVirtually: true,

  founder: {
    name: 'Kaleem Baig',
    credential: 'Certified Public Accountant',
    shortCredential: 'CPA',
    experience: 'over a decade',
    focus: ['financial reporting', 'taxation', 'accounting', 'financial modeling'],
  },

  /** Approved scheduling link (e.g. Calendly). Empty = online booking hidden. */
  bookingUrl: (import.meta.env.VITE_BOOKING_URL as string | undefined) || '',

  /** No verified social profiles exist on the current site; add URLs here once confirmed. */
  social: [] as { label: string; href: string }[],
} as const;

export const fullAddress = `${company.address.street}, ${company.address.suite}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}`;

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services/' },
  { label: 'About', to: '/about/' },
  { label: 'Contact', to: '/contact/' },
] as const;
