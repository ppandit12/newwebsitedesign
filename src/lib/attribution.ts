import type { Attribution } from '../../shared/consultation';

const KEY = 'nx_attribution';

const UTM: [keyof Attribution, string][] = [
  ['utmSource', 'utm_source'],
  ['utmMedium', 'utm_medium'],
  ['utmCampaign', 'utm_campaign'],
  ['utmTerm', 'utm_term'],
  ['utmContent', 'utm_content'],
];

/**
 * Record how the visitor first arrived (landing page, external referrer, UTM tags)
 * for the duration of the browser session. Runs once on app start.
 */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = { landingPage: window.location.pathname + window.location.search };
    const ref = document.referrer;
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref.slice(0, 300);
    for (const [key, param] of UTM) {
      const v = params.get(param);
      if (v) data[key] = v.slice(0, 100);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — attribution is best-effort.
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}
