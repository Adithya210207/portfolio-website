// Builds the redirect-only user site for the old address (https://adithya210207.github.io/...).
// Every old link forwards to the same path under /portfolio-website/, so Google results and old
// bookmarks keep working and search engines learn where each page moved.
//
// Run:  node tools/build-redirects.mjs <output folder>
// The output folder is the Adithya210207.github.io repository (pushed separately).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw new Error('usage: node tools/build-redirects.mjs <output folder>');
const NEW = 'https://adithya210207.github.io/portfolio-website/';

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8'), ctx);
const slugs = ctx.window.DATA.work.filter(w => w.slug).map(w => w.slug);

const page = to => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Adithya V — moved</title>
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>location.replace(${JSON.stringify(to)} + location.hash)</script>
<style>body{font:16px/1.6 system-ui,sans-serif;background:#f4f1ea;color:#171614;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#a04c2a}</style>
</head>
<body><p>This page has moved to <a href="${to}">${to.replace('https://', '')}</a>.</p></body>
</html>
`;

const write = (rel, text) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };

write('index.html', page(NEW));
write('resume.html', page(NEW + 'resume.html'));
for (const s of slugs) write(`projects/${s}/index.html`, page(`${NEW}projects/${s}/`));

// Anything else (old images, PDFs, mistyped links): GitHub Pages serves this for missing paths,
// and it forwards to the same path on the new site.
write('404.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Adithya V — moved</title>
<meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>location.replace(${JSON.stringify(NEW)} + location.pathname.replace(/^\\/+/, '') + location.search + location.hash)</script>
<style>body{font:16px/1.6 system-ui,sans-serif;background:#f4f1ea;color:#171614;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#a04c2a}</style>
</head>
<body><p>My portfolio has moved to <a href="${NEW}">${NEW.replace('https://', '')}</a>.</p></body>
</html>
`);

// This robots.txt covers the whole host, including /portfolio-website/, so it must allow everything.
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${NEW}sitemap.xml\n`);
write('.nojekyll', '');
// Keeps the Search Console verification for the root address.
fs.copyFileSync(path.join(ROOT, 'google49750d4cdb849ed4.html'), path.join(OUT, 'google49750d4cdb849ed4.html'));
write('README.md', `# Adithya210207.github.io\n\nRedirects only. My portfolio lives at **${NEW}** (repository [portfolio-website](https://github.com/Adithya210207/portfolio-website)).\nEvery old link here forwards to the same page there.\n`);

console.log(`redirects: /, /resume.html, ${slugs.length} project pages, 404 catch-all -> ${OUT}`);
