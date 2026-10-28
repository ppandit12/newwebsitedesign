import { company } from '../data/company';
import type { PageSeo } from '../data/seo';

export type HeadTag =
  | { tag: 'title'; text: string }
  | { tag: 'meta'; attrs: Record<string, string> }
  | { tag: 'link'; attrs: Record<string, string> }
  | { tag: 'jsonld'; data: object };

export const absoluteUrl = (path: string) => `${company.siteUrl}${path}`;

const OG_IMAGE = '/images/og-image.jpg';

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${company.siteUrl}/#business`,
    name: company.legalName,
    alternateName: company.name,
    url: `${company.siteUrl}/`,
    logo: absoluteUrl('/images/numberx-logo-stacked.png'),
    image: absoluteUrl(OG_IMAGE),
    telephone: company.phone.e164,
    email: company.email.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.street}, ${company.address.suite}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Richmond, VA' },
      { '@type': 'State', name: 'Virginia' },
    ],
    founder: { '@type': 'Person', name: company.founder.name, jobTitle: company.founder.credential },
    knowsAbout: [
      'Tax preparation',
      'Tax planning',
      'Bookkeeping',
      'Accounting',
      'Financial modelling',
      'CFO services',
      'QuickBooks',
    ],
  };
}

export function breadcrumbJsonLd(page: PageSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: absoluteUrl(page.path) },
    ],
  };
}

export function buildHead(page: PageSeo, jsonLd: object[] = []): HeadTag[] {
  const url = absoluteUrl(page.path);
  const tags: HeadTag[] = [
    { tag: 'title', text: page.title },
    { tag: 'meta', attrs: { name: 'description', content: page.description } },
    { tag: 'meta', attrs: { name: 'robots', content: page.noindex ? 'noindex, follow' : 'index, follow' } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: company.legalName } },
    { tag: 'meta', attrs: { property: 'og:title', content: page.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: page.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: absoluteUrl(OG_IMAGE) } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
  ];
  if (!page.noindex) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } });
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: url } });
  }
  tags.push({ tag: 'jsonld', data: businessJsonLd() });
  if (page.breadcrumb) tags.push({ tag: 'jsonld', data: breadcrumbJsonLd(page) });
  for (const data of jsonLd) tags.push({ tag: 'jsonld', data });
  return tags;
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Prevent "</script>" inside JSON from terminating the tag early.
const safeJson = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Serialise head tags for the prerendered HTML. */
export function renderHeadHtml(tags: HeadTag[]): string {
  return tags
    .map((t) => {
      switch (t.tag) {
        case 'title':
          return `<title>${escText(t.text)}</title>`;
        case 'meta':
        case 'link': {
          const attrs = Object.entries(t.attrs)
            .map(([k, v]) => `${k}="${escAttr(v)}"`)
            .join(' ');
          return `<${t.tag} data-seo ${attrs}>`;
        }
        case 'jsonld':
          return `<script data-seo type="application/ld+json">${safeJson(t.data)}</script>`;
      }
    })
    .join('\n    ');
}

/** Replace the page's managed head tags on client-side navigation. */
export function applyHead(tags: HeadTag[]) {
  const head = document.head;
  head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const t of tags) {
    if (t.tag === 'title') {
      document.title = t.text;
      continue;
    }
    const el = document.createElement(t.tag === 'jsonld' ? 'script' : t.tag);
    el.setAttribute('data-seo', '');
    if (t.tag === 'jsonld') {
      el.setAttribute('type', 'application/ld+json');
      el.textContent = JSON.stringify(t.data);
    } else {
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    }
    head.appendChild(el);
  }
}
