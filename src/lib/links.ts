import type { ServiceInterest } from '../../shared/consultation';

/**
 * Build a link to the consultation form with the service (and optional package)
 * preselected. `from` records which CTA was clicked, for lead-source attribution.
 */
export function consultationHref(opts: { service?: ServiceInterest; pkg?: string; from?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.service) params.set('service', opts.service);
  if (opts.pkg) params.set('package', opts.pkg);
  if (opts.from) params.set('from', opts.from);
  const qs = params.toString();
  return `/contact/${qs ? `?${qs}` : ''}#consultation`;
}
