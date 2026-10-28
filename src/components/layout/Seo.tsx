import { createContext, useContext, useEffect } from 'react';
import type { PageSeo } from '../../data/seo';
import { applyHead, buildHead, type HeadTag } from '../../lib/seo';

/** During prerendering, the server passes a collector so each page can report its head tags. */
export const HeadCollectorContext = createContext<{ tags: HeadTag[] } | null>(null);

export function Seo({ page, jsonLd }: { page: PageSeo; jsonLd?: object[] }) {
  const collector = useContext(HeadCollectorContext);
  const tags = buildHead(page, jsonLd);
  if (collector) collector.tags = tags;

  const key = JSON.stringify(tags);
  useEffect(() => {
    applyHead(JSON.parse(key) as HeadTag[]);
  }, [key]);

  return null;
}
