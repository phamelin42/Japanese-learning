// Après `ng build` : la page 404 pré-rendue devient `404.html` (Vercel la sert avec le statut 404)
// et `sitemap.xml` liste les routes pré-rendues indexables.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://japanese-learning.phamelin.fr';
const dist = 'dist/japanese-learning';
const browser = join(dist, 'browser');

const notFound = join(browser, '404', 'index.html');
if (!existsSync(notFound)) {
  console.error(`postbuild : ${notFound} manque, la route « 404 » n'a pas été pré-rendue.`);
  process.exit(1);
}
copyFileSync(notFound, join(browser, '404.html'));

const { routes } = JSON.parse(readFileSync(join(dist, 'prerendered-routes.json'), 'utf8'));
const indexable = Object.keys(routes)
  .filter((route) => {
    const file = join(browser, route === '/' ? '' : route, 'index.html');
    return !/<meta name="robots" content="noindex"/.test(readFileSync(file, 'utf8'));
  })
  .sort();

const urls = indexable.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n');
writeFileSync(
  join(browser, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`postbuild : 404.html et sitemap.xml (${indexable.length} pages).`);
