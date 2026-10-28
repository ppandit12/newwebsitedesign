import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { HeadCollectorContext } from './components/layout/Seo';
import { renderHeadHtml, type HeadTag } from './lib/seo';
import { indexablePages, pages } from './data/seo';
import { company } from './data/company';

/** Render one route to HTML for the build-time prerenderer (scripts/prerender.mjs). */
export function render(url: string) {
  const collector: { tags: HeadTag[] } = { tags: [] };
  const html = renderToString(
    <StrictMode>
      <HeadCollectorContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadCollectorContext.Provider>
    </StrictMode>,
  );
  return { html, head: renderHeadHtml(collector.tags) };
}

export const routes = indexablePages.map((p) => p.path);
export const notFoundPath = pages.notFound.path;
export const siteUrl = company.siteUrl;
