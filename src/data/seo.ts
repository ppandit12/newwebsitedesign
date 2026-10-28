export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Breadcrumb label; omitted for the homepage. */
  breadcrumb?: string;
  noindex?: boolean;
}

/** Per-route metadata, used both by the prerenderer and on client-side navigation. */
export const pages = {
  home: {
    path: '/',
    title: 'NumberX Financial Services | Richmond, VA CPA — Tax, Accounting & Advisory',
    description:
      'NumberX is a Richmond, VA CPA firm offering accounting and bookkeeping, tax preparation and planning, outsourced CFO services, financial modelling and business consulting. Request a free consultation.',
  },
  services: {
    path: '/services/',
    title: 'Services & Pricing | Tax Filing, Bookkeeping & CFO Services — NumberX',
    description:
      'Transparent starting prices for individual and business tax filing, tax planning, IRS audit assistance, bookkeeping, and CFO & controller services from Richmond CPA firm NumberX.',
    breadcrumb: 'Services',
  },
  about: {
    path: '/about/',
    title: 'About Kaleem Baig, CPA | NumberX Financial Services',
    description:
      'Meet Kaleem Baig, the Certified Public Accountant behind NumberX, with over a decade of experience in financial reporting, taxation, accounting and financial modeling.',
    breadcrumb: 'About',
  },
  contact: {
    path: '/contact/',
    title: 'Contact NumberX | Request a Free CPA Consultation in Richmond, VA',
    description:
      'Request a free consultation with NumberX Financial Services. Call 804-630-1091, email info@mynumberx.com, or send us a message about your tax and accounting needs.',
    breadcrumb: 'Contact',
  },
  privacy: {
    path: '/privacy-policy/',
    title: 'Privacy Policy | NumberX Financial Services',
    description:
      'How NumberX Financial Services collects, uses and protects the information you share through this website.',
    breadcrumb: 'Privacy Policy',
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found | NumberX Financial Services',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
} satisfies Record<string, PageSeo>;

/** Routes that are prerendered and listed in the sitemap. */
export const indexablePages: PageSeo[] = [pages.home, pages.services, pages.about, pages.contact, pages.privacy];
