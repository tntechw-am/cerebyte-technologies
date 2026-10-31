'use strict';
// Smoke test: renders every page and checks it returns the expected status. Run with `npm run check`.
const app = require('../server');
const site = require('../data/site');

const paths = ['/', '/services', '/technologies', '/industries', '/about', '/careers', '/contact', '/thank-you',
  '/blog', ...site.posts.map((p) => `/blog/${p.slug}`), '/privacy', '/terms', '/robots.txt', '/sitemap.xml'];

const server = app.listen(0, async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  let failed = 0;
  for (const p of paths) {
    const res = await fetch(base + p);
    const ok = res.status === 200;
    if (!ok) failed++;
    console.log(`${ok ? 'ok ' : 'ERR'} ${res.status} ${p}`);
  }
  const missing = await fetch(base + '/does-not-exist');
  console.log(`${missing.status === 404 ? 'ok ' : 'ERR'} ${missing.status} /does-not-exist (expects 404)`);
  if (missing.status !== 404) failed++;
  server.close();
  process.exitCode = failed ? 1 : 0;
});
