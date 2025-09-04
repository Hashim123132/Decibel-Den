import fs from 'fs';
import { resolve } from 'path';

const SITE_URL = 'https://decibelden.vercel.app/';

const pages = [
  '',        
  'about',
  'contact',
  'products',
  'Headphones',
  'Speakers',
  'ProductDisplayPage',

];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${SITE_URL}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>`;

fs.writeFileSync(resolve('./public/sitemap.xml'), sitemap);
console.log('Sitemap generated');
