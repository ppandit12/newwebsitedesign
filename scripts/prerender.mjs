// Build-time prerendering: renders every public route to static HTML (with its
// own title, meta description, canonical, Open Graph and JSON-LD), then writes
// sitemap.xml and robots.txt. Runs after `vite build` and `vite build --ssr`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const { render, routes, notFoundPath, siteUrl } = await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
);

function page(url) {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

for (const route of routes) {
  const file = path.join(dist, route, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(route));
  console.log(`  prerendered ${route}`);
}
await fs.writeFile(path.join(dist, '404.html'), page(notFoundPath));
console.log('  prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log('  wrote sitemap.xml, robots.txt');

await fs.rm(path.resolve('dist-ssr'), { recursive: true, force: true });
