// Builds one page per project (projects/<slug>/index.html) from js/data.js, and rewrites sitemap.xml.
// Each page has its own title, description, link preview and structured data, so a search for the
// project's name can land on a page that is about that project.
//
// Run after editing js/data.js:   node tools/build-projects.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://adithya210207.github.io/';
const TODAY = new Date().toISOString().slice(0, 10);

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8'), ctx);
const D = ctx.window.DATA;
const work = D.work.filter(w => w.slug && w.page);
const bySlug = Object.fromEntries(work.map(w => [w.slug, w]));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');
const PERSON = { '@type': 'Person', name: 'Adithya V', alternateName: ['Ryuu', 'Adithya210207'], url: SITE };

function page(w, n) {
  const url = `${SITE}projects/${w.slug}/`;
  const img = SITE + (w.shots?.[0]?.[0] || w.preview || 'img/share.jpg');
  const github = w.links.find(([, u]) => u.includes('github.com'))?.[1];
  const live = w.links.find(([, u]) => !u.includes('github.com'))?.[1];
  const isSite = w.slug === 'kct-idea-lab';
  const ld = [
    isSite
      ? { '@context': 'https://schema.org', '@type': 'WebSite', name: 'KCT AICTE IDEA Lab', url: 'https://idealab.kct.ac.in/',
          description: w.page.desc, image: img, creator: PERSON, maintainer: PERSON }
      : { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: w.title, url,
          description: w.page.desc, image: img, applicationCategory: w.slug === 'pawfinder' ? 'WebApplication' : 'DeveloperApplication',
          author: PERSON, ...(github || live ? { sameAs: [github, live].filter(Boolean) } : {}),
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Adithya V', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Work', item: SITE + '#work' },
      { '@type': 'ListItem', position: 3, name: w.title, item: url }] }
  ];
  const others = work.filter(o => o !== w);
  const related = (w.page.related || []).map(s => bySlug[s]).filter(Boolean);
  const shots = (w.shots || []).filter(s => s[2] !== 'logo');

  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(w.page.title)}</title>
<meta name="description" content="${esc(w.page.desc)}">
<meta name="author" content="Adithya V">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Adithya V">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(w.page.title)}">
<meta property="og:description" content="${esc(w.page.desc)}">
<meta property="og:image" content="${img}">
<meta property="og:image:alt" content="${esc(shots[0]?.[1] || w.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(w.page.title)}">
<meta name="twitter:description" content="${esc(w.page.desc)}">
<meta name="twitter:image" content="${img}">
<meta name="theme-color" content="#f4f1ea">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../project.css">
<script>try{var t=localStorage.getItem('folio-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${ld.map(o => `<script type="application/ld+json">${json(o)}</script>`).join('\n')}
</head>
<body class="pp">
<header class="pp-top">
  <a class="pp-name" href="../../">Adithya V</a>
  <nav aria-label="Site"><a href="../../#work">All work</a><a href="../../#about">About</a><a href="../../resume.pdf">Résumé</a><a href="../../#contact">Contact</a></nav>
</header>

<main>
  <nav class="pp-crumb" aria-label="Breadcrumb"><a href="../../">Adithya V</a><span aria-hidden="true">/</span><a href="../../#work">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(w.title)}</span></nav>

  <header class="pp-head">
    <p class="label">${String(n).padStart(2, '0')} · ${esc(w.kind)}</p>
    <h1>${esc(w.title)}</h1>
    <p class="pp-lead">${esc(w.desc)}</p>
    <p class="pp-by">Built by <a href="../../">Adithya V</a>, computer science student at KCT, Coimbatore.</p>
    <div class="pp-links">${w.links.map(([t, u], i) => `<a class="${i ? 'pp-link' : 'pp-btn'}" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} <span aria-hidden="true">↗</span></a>`).join('')}</div>
  </header>

${shots.length ? `  <div class="pp-shots pp-shots--${shots.length}">
${shots.map(([src, alt], i) => `    <figure><img src="../../${src}" alt="${esc(alt)}" width="1400" height="805"${i ? ' loading="lazy"' : ''} decoding="async"><figcaption>${esc(alt)}</figcaption></figure>`).join('\n')}
  </div>
` : ''}
  <div class="pp-body">
    <section aria-labelledby="about-h">
      <h2 class="pp-h" id="about-h">About ${esc(w.title)}</h2>
${w.page.about.map(a => `      <p>${esc(a)}</p>`).join('\n')}
    </section>
    <aside>
      <h2 class="pp-h">Highlights</h2>
      <ul class="pp-facts">${w.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <h2 class="pp-h">Made with</h2>
      <p class="pp-stack">${esc(w.stack)}</p>
    </aside>
  </div>

${related.length ? `  <section class="pp-related" aria-labelledby="rel-h">
    <h2 class="pp-h" id="rel-h">Related work</h2>
    <div class="pp-cards">${related.map(r => `<a class="pp-card" href="../${r.slug}/"><img src="../../${r.preview}" alt="" loading="lazy" decoding="async"><span><b>${esc(r.title)}</b><small>${esc(r.kind)}</small></span></a>`).join('')}</div>
  </section>
` : ''}
  <section class="pp-all" aria-labelledby="all-h">
    <h2 class="pp-h" id="all-h">More projects by Adithya V</h2>
    <ul>${others.map(o => `<li><a href="../${o.slug}/">${esc(o.title)}</a><span>${esc(o.kind)}</span></li>`).join('')}</ul>
  </section>
</main>

<footer class="pp-foot">
  <a href="../../">← Back to the portfolio</a>
  <span>© 2026 Adithya V · Coimbatore, India</span>
</footer>
</body>
</html>
`;
}

let i = 0;
for (const w of D.work) {
  i++;
  if (!w.slug || !w.page) continue;
  const dir = path.join(ROOT, 'projects', w.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(w, i));
}
// drop pages for projects that no longer exist
for (const d of fs.readdirSync(path.join(ROOT, 'projects'), { withFileTypes: true })) {
  if (d.isDirectory() && !bySlug[d.name]) fs.rmSync(path.join(ROOT, 'projects', d.name), { recursive: true });
}

const urls = [['', '1.0'], ...work.map(w => [`projects/${w.slug}/`, '0.8']), ['resume.pdf', '0.5']];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p]) => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod><priority>${p}</priority></url>`).join('\n')}
</urlset>
`);
console.log(`built ${work.length} project pages; sitemap has ${urls.length} URLs`);
