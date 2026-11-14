/* Adithya V — portfolio. Rendering and quiet interactions. */
(() => {
  'use strict';
  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const D = window.DATA, root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const animate = hasG && !reduce;
  const pad = n => String(n).padStart(2, '0');
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ── smooth scrolling ── */
  let lenis = null;
  if (animate && window.Lenis) {
    lenis = new Lenis({ lerp: .085 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const lock = on => { if (lenis) on ? lenis.stop() : lenis.start(); else document.body.style.overflow = on ? 'hidden' : ''; };
  const refresh = () => { lenis?.resize(); window.ScrollTrigger?.refresh(); };

  /* ── render: work ── */
  const ART = {
    five: '<circle cx="60" cy="30" r="13"/><circle cx="31" cy="52" r="13"/><circle cx="89" cy="52" r="13"/><circle cx="42" cy="86" r="13"/><circle cx="78" cy="86" r="13"/><path d="M60 43v18M44 54l12 8M76 54l-12 8M48 74l8-8M72 74l-8-8"/><circle cx="60" cy="64" r="3"/>',
    chat: '<rect x="14" y="24" width="92" height="58" rx="10"/><path d="M40 82 34 100 58 82"/><circle cx="44" cy="53" r="2.5"/><circle cx="60" cy="53" r="2.5"/><circle cx="76" cy="53" r="2.5"/>',
    window: '<rect x="12" y="20" width="96" height="80" rx="6"/><path d="M12 38h96"/><circle cx="23" cy="29" r="2"/><circle cx="32" cy="29" r="2"/><circle cx="41" cy="29" r="2"/><rect x="24" y="50" width="38" height="36"/><path d="M72 52h24M72 64h24M72 76h16"/>',
    duo: '<rect x="12" y="20" width="60" height="42" rx="9"/><path d="M28 62 24 76 42 62"/><rect x="48" y="56" width="60" height="42" rx="9"/><path d="M92 98 96 110 78 98"/>',
    paw: '<ellipse cx="60" cy="78" rx="22" ry="17"/><ellipse cx="28" cy="54" rx="8" ry="11"/><ellipse cx="48" cy="34" rx="8" ry="11"/><ellipse cx="72" cy="34" rx="8" ry="11"/><ellipse cx="92" cy="54" rx="8" ry="11"/>',
    gauge: '<path d="M16 84a44 44 0 0 1 88 0"/><path d="M60 84 82 50"/><circle cx="60" cy="84" r="4"/><path d="M24 84h6M90 84h6M60 46v6M33 57l4 4M87 57l-4 4M36 102h48"/>',
    code: '<path d="M44 36 20 60l24 24M76 36l24 24-24 24M68 28 52 92"/>',
    layers: '<path d="M60 20 104 42 60 64 16 42Z"/><path d="M16 60l44 22 44-22M16 78l44 22 44-22"/>'
  };
  const workList = $('#work-list');
  // the featured project has its own case study above the list; the list numbers continue from it
  const WORK = D.work.filter(p => !p.featured), FEAT = D.work.length - WORK.length;
  workList.innerHTML = WORK.map((p, i) => `<li class="work__item">
    <button class="work__head" type="button" aria-expanded="false" aria-controls="work-${i}">
      <span class="work__no">${pad(i + 1 + FEAT)}</span>${p.preview ? `<img class="work__thumb" src="${p.preview}" alt="" loading="lazy" decoding="async">` : ''}<span class="work__title">${p.title}</span><span class="work__kind">${p.kind}</span><span class="work__plus" aria-hidden="true"></span>
    </button>
    <div class="work__panel" id="work-${i}"><div class="work__inner">${p.preview && !(p.shots && !p.shots[0][2]) ? `<figure class="work__mshot"><img src="${p.preview}" alt="${p.title} preview" loading="lazy" decoding="async"></figure>` : ''}${p.cast ? `<ul class="cast">${p.cast.map(([src, name, line]) => `<li><figure class="cast__card"><span class="cast__crop"><img src="${src}" alt="${name}, a persona in Personality AI" loading="lazy" decoding="async"></span><figcaption><b>${name}</b><span>${line}</span></figcaption></figure></li>`).join('')}</ul>` : ''}${p.shots && !p.shots[0][2] ? `<div class="shots shots--${p.shots.length}${p.crop ? ' shots--crop' : ''}">${p.shots.map(([src, alt]) => `<figure class="shot"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"></figure>`).join('')}</div>` : ''}<div class="work__grid${p.shots && !p.shots[0][2] ? ' work__grid--noart' : ''}">
      <div class="work__art" aria-hidden="true">${p.shots && p.shots[0][2] === 'logo' ? `<img class="work__logo" src="${p.shots[0][0]}" alt="" loading="lazy">` : `<svg viewBox="0 0 120 120">${ART[p.art]}</svg>`}</div>
      <div><p class="work__desc">${p.desc}</p><ul class="work__facts">${p.facts.map(f => `<li>${f}</li>`).join('')}</ul></div>
      <div class="work__side"><div><p class="label">Made with</p><p>${p.stack}</p></div><div class="work__links">${p.links.map(([t, u]) => `<a class="link" href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join('')}</div></div>
    </div></div></div>
  </li>`).join('');
  workList.addEventListener('click', e => {
    const head = e.target.closest('.work__head'); if (!head) return;
    const item = head.parentElement, open = !item.classList.contains('is-open');
    $$('.work__item', workList).forEach(li => { li.classList.remove('is-open'); $('.work__head', li).setAttribute('aria-expanded', 'false'); });
    if (open) { item.classList.add('is-open'); head.setAttribute('aria-expanded', 'true'); }
    setTimeout(refresh, 820);
  });

  /* ── project preview that follows the cursor ── */
  if (matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)').matches) {
    // every preview lives in the card from the start, so switching projects is instant
    const wp = document.createElement('figure'); wp.className = 'wpeek is-logo is-square'; wp.setAttribute('aria-hidden', 'true');
    wp.innerHTML = WORK.map((p, i) => p.preview ? `<img data-i="${i}" src="${p.preview}" alt="" decoding="async">` : '').join('');
    document.body.append(wp);
    const imgs = $$('img', wp);
    let tx = 0, ty = 0, x = 0, y = 0, on = false, raf = 0, cur = -1;
    const loop = () => {
      x += (tx - x) * .32; y += (ty - y) * .32;
      wp.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${Math.max(-6, Math.min(6, (tx - x) * .05)).toFixed(2)}deg)`;
      raf = on || Math.abs(tx - x) > .5 || Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0;
    };
    const hide = () => { on = false; wp.classList.remove('is-on'); };
    let px = -1, py = -1;
    const update = (target, cx, cy) => {
      const head = target?.closest?.('.work__head'), item = head?.parentElement;
      const i = item ? [...workList.children].indexOf(item) : -1, p = WORK[i];
      if (!head || !p?.preview || item.classList.contains('is-open')) return hide();
      if (cur !== i) { cur = i; imgs.forEach(im => im.classList.toggle('is-cur', +im.dataset.i === i)); }
      tx = cx + 32; ty = cy - wp.offsetHeight / 2;
      if (!on) { on = true; if (!wp.classList.contains('is-on')) { x = tx; y = ty; wp.style.transform = `translate3d(${x}px,${y}px,0)`; } wp.classList.add('is-on'); }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    workList.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; update(e.target, px, py); });
    // smooth scrolling keeps firing scroll events after you stop: re-check what is under the cursor instead of hiding
    let scrollQueued = false;
    addEventListener('scroll', () => {
      if (px < 0 || scrollQueued) return; scrollQueued = true;
      requestAnimationFrame(() => { scrollQueued = false; update(document.elementFromPoint(px, py), px, py); });
    }, { passive: true });
    workList.addEventListener('pointerleave', () => { px = py = -1; });
    addEventListener('load', () => imgs.forEach(im => im.decode?.().catch(() => {})));
    workList.addEventListener('pointerleave', hide);
    workList.addEventListener('click', hide);
  }

  /* ── fit the masthead name to the width ── */
  const fit = $('.hero__fit');
  const mastEl = $('.hero__mast');
  const fitName = () => {
    const box = fit.parentElement.clientWidth; if (!box) return;
    const wide = innerWidth >= 960;
    // on wide screens the subtitle tucks up under the baseline of "Adith" (no descenders there),
    // measured from a zero-size marker sitting on the name's baseline
    const title = $('.hero__title'), base = $('.hero__base');
    const nameBox = fit.parentElement;
    const setSize = s => {
      fit.style.fontSize = s.toFixed(2) + 'px';
      // room below the baseline for the "y" tail while the rise mask clips the name;
      // padding and margin cancel out, so the layout below does not move
      nameBox.style.paddingBottom = (s * .34).toFixed(1) + 'px';
      nameBox.style.marginBottom = (6 - s * .34).toFixed(1) + 'px';
      if (!wide) return mastEl.style.removeProperty('--sub-pull');
      const cur = parseFloat(mastEl.style.getPropertyValue('--sub-pull')) || 0;
      const natural = title.offsetTop - cur, want = base.offsetTop + s * .07;
      mastEl.style.setProperty('--sub-pull', Math.min(0, want - natural).toFixed(1) + 'px');
    };
    fit.style.fontSize = '100px';
    let size = 100 * box / (fit.getBoundingClientRect().width || 1) * .985;
    setSize(size);
    for (let i = 0; i < 8 && fit.getBoundingClientRect().width > box; i++) { size *= .99; setSize(size); }
    // keep the whole first screen visible: shrink the name if the facts row would fall below the fold
    const heroEl = $('#hero'), meta = $('.hero__meta');
    const padB = parseFloat(getComputedStyle(heroEl).paddingBottom) || 0;
    for (let i = 0; i < 5; i++) {
      const over = meta.offsetTop + meta.offsetHeight + padB - innerHeight;
      if (over <= 1) break;
      size = Math.max(64, size - over / (wide ? .75 : .92) - 2); setSize(size);
      if (size === 64) break;
    }
  };
  /* "Let's talk." spans the full width too, capped at about 40% of the window height */
  const talk = $('.contact__fit');
  const fitTalk = () => {
    const box = talk.parentElement.clientWidth; if (!box) return;
    talk.style.fontSize = '100px';
    let size = Math.min(100 * box / (talk.getBoundingClientRect().width || 1) * .97, innerHeight * .4 / .84);
    talk.style.fontSize = size.toFixed(2) + 'px';
    for (let i = 0; i < 4 && talk.getBoundingClientRect().width > box; i++) { size *= .98; talk.style.fontSize = size.toFixed(2) + 'px'; }
  };
  const fitAll = () => { fitName(); fitTalk(); };
  fitAll(); addEventListener('resize', fitAll); addEventListener('load', fitAll);
  if ('ResizeObserver' in window) { new ResizeObserver(fitName).observe(fit.parentElement); new ResizeObserver(fitTalk).observe(talk.parentElement); }
  document.fonts?.ready.then(() => { fitAll(); refresh(); });
  document.fonts?.addEventListener?.('loadingdone', () => { fitAll(); refresh(); });
  document.fonts?.load?.('italic 100px "Instrument Serif"').then(() => { fitAll(); refresh(); });

  /* ── render: skills, journey ── */
  $('#skills-list').innerHTML = D.skills.map(([h, list]) => `<div><h3>${h}</h3><ul>${list.map(s => `<li>${s}</li>`).join('')}</ul></div>`).join('');
  $('#journey-list').innerHTML = D.journey.map(([y, t, d]) => `<li><p class="journey__y">${y}</p><div><h3 class="journey__t">${t}</h3><p class="journey__d">${d}</p></div></li>`).join('');

  /* ── render: credentials ── */
  const certs = D.certs, LIMIT = 10;
  const CATS = ['All', 'AI', 'Development', 'Beyond code'];
  const certList = $('#cert-list'), filters = $('#filters'), more = $('#cert-more');
  let cat = 'All', expanded = false;
  certList.innerHTML = certs.map((c, i) => `<li class="cert" data-i="${i}"><button type="button"><span class="cert__no">${pad(i + 1)}</span><span class="cert__thumb" aria-hidden="true">${c.img ? `<img src="${c.img}" alt="" loading="lazy" decoding="async">` : `<b>${c.paper[1]}</b>`}</span><span class="cert__t">${c.title}</span><span class="cert__m"><span>${c.issuer}</span><span>${c.date}</span></span><span class="cert__a" aria-hidden="true">→</span></button></li>`).join('');
  filters.innerHTML = CATS.map(c => `<button type="button" aria-pressed="${c === 'All'}" data-cat="${c}">${c}<span>${c === 'All' ? certs.length : certs.filter(x => x.cat === c).length}</span></button>`).join('');
  const rows = $$('.cert', certList);
  const inCat = () => certs.filter(c => cat === 'All' || c.cat === cat);
  const applyCerts = fade => {
    let shown = 0; const fresh = [];
    rows.forEach((li, i) => {
      const ok = (cat === 'All' || certs[i].cat === cat) && (cat !== 'All' || expanded || shown < LIMIT);
      if (cat === 'All' || certs[i].cat === cat) shown++;
      if (ok && li.hidden) fresh.push(li);
      li.hidden = !ok;
    });
    more.hidden = cat !== 'All';
    more.textContent = expanded ? 'Show fewer' : `Show all ${certs.length}`;
    if (fade && animate && fresh.length) gsap.fromTo(fresh, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .03 });
    refresh();
  };
  applyCerts(false);
  filters.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    cat = b.dataset.cat; $$('button', filters).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    rows.forEach(li => { li.hidden = true; }); applyCerts(true);
  });
  more.addEventListener('click', () => { expanded = !expanded; applyCerts(true); if (!expanded) (lenis ? lenis.scrollTo('#credentials', { duration: 1 }) : $('#credentials').scrollIntoView()); });

  /* ── credential viewer ── */
  const lb = $('#lb');
  let lbList = certs, lbIdx = 0;
  const fillPaper = (el, c) => { [...el.children].forEach((n, k) => { n.textContent = c.paper[k]; }); };
  const lbShow = i => {
    lbIdx = (i + lbList.length) % lbList.length; const c = lbList[lbIdx];
    const img = $('#lb-img'), paper = $('#lb-paper');
    img.hidden = !c.img; paper.hidden = !!c.img;
    if (c.img) { img.src = c.img; img.alt = c.title; } else fillPaper(paper, c);
    $('#lb-title').textContent = c.title;
    $('#lb-meta').textContent = [c.cat, c.issuer, c.date].filter(Boolean).join(' · ');
    $('#lb-count').textContent = `${pad(lbIdx + 1)} / ${pad(lbList.length)}`;
    $('#lb-open').href = c.file;
    const v = $('#lb-verify'); v.hidden = !c.verify; if (c.verify) v.href = c.verify;
  };
  certList.addEventListener('click', e => {
    const li = e.target.closest('.cert'); if (!li) return;
    lbList = inCat(); lbShow(lbList.indexOf(certs[+li.dataset.i]));
    peek.classList.remove('is-on'); lb.showModal(); lock(true);
  });
  lb.addEventListener('close', () => lock(false));
  $('#lb-close').addEventListener('click', () => lb.close());
  $('#lb-prev').addEventListener('click', () => lbShow(lbIdx - 1));
  $('#lb-next').addEventListener('click', () => lbShow(lbIdx + 1));
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') lbShow(lbIdx - 1); if (e.key === 'ArrowRight') lbShow(lbIdx + 1); });

  /* ── preview that follows the cursor ── */
  const peek = $('#peek');
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const img = $('img', peek), paper = $('.paper', peek);
    let tx = 0, ty = 0, x = 0, y = 0, on = false, raf = 0;
    const loop = () => { x += (tx - x) * .32; y += (ty - y) * .32; peek.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`; raf = on || Math.abs(tx - x) > .5 || Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0; };
    let px = -1, py = -1;
    const update = (target, cx, cy) => {
      const li = target?.closest?.('.cert');
      if (!li || li.hidden) { on = false; return peek.classList.remove('is-on'); }
      const c = certs[+li.dataset.i];
      if (peek.dataset.i !== li.dataset.i) { peek.dataset.i = li.dataset.i; img.hidden = !c.img; paper.hidden = !!c.img; if (c.img) img.src = c.img; else fillPaper(paper, c); }
      const w = peek.offsetWidth, h = peek.offsetHeight;
      tx = Math.min(innerWidth - w - 16, cx + 28); ty = Math.max(16, Math.min(innerHeight - h - 16, cy - h / 2));
      if (!on) { on = true; if (!peek.classList.contains('is-on')) { x = tx; y = ty; peek.style.transform = `translate3d(${x}px,${y}px,0)`; } peek.classList.add('is-on'); }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    certList.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; update(e.target, px, py); });
    certList.addEventListener('pointerleave', () => { px = py = -1; on = false; peek.classList.remove('is-on'); });
    let scrollQueued = false;
    addEventListener('scroll', () => {
      if (px < 0 || scrollQueued) return; scrollQueued = true;
      requestAnimationFrame(() => { scrollQueued = false; update(document.elementFromPoint(px, py), px, py); });
    }, { passive: true });
    // warm the browser cache with every certificate image once the page has settled
    addEventListener('load', () => setTimeout(() => certs.forEach(c => { if (c.img) { const im = new Image(); im.decoding = 'async'; im.src = c.img; } }), 1500));
  }

  /* ── header: hide on the way down, return on the way up ── */
  const top = $('#top'); let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    top.classList.toggle('is-solid', y > 40);
    top.classList.toggle('is-hidden', y > 320 && y > lastY && !menuOpen);
    lastY = y;
  };
  let menuOpen = false;
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    const links = $$('.top__nav a');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('is-here', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => io.observe(s));
  }

  /* ── mobile menu ── */
  const menu = $('#menu'), menuBtn = $('#menu-btn');
  const setMenu = open => { menuOpen = open; menu.hidden = !open; menuBtn.textContent = open ? 'Close' : 'Menu'; menuBtn.setAttribute('aria-expanded', String(open)); lock(open); if (open) top.classList.remove('is-hidden'); };
  menuBtn.addEventListener('click', () => setMenu(!menuOpen));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  /* ── in-page links ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const el = $(a.getAttribute('href')); if (!el) return;
    e.preventDefault(); if (menuOpen) setMenu(false);
    lenis ? lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ── theme ── */
  const themeBtn = $('#theme');
  const setTheme = t => { root.dataset.theme = t; themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark'; themeBtn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`); $('meta[name="theme-color"]').content = t === 'dark' ? '#121110' : '#f4f1ea'; try { localStorage.setItem('folio-theme', t); } catch (e) {} };
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* ── clock, copy ── */
  const clock = () => { const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()); $$('#clock, [data-clock]').forEach(el => { el.textContent = t; }); };
  clock(); setInterval(clock, 20000);
  let toastT;
  const toast = msg => { const el = $('#toast'); el.textContent = msg; el.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2200); };
  $('#copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(D.email); toast('Address copied'); } catch (e) { toast(D.email); } });

  /* ── motion ── */
  if (!animate) return;
  const split = el => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return; if (/^\s+$/.test(part)) return frag.append(' ');
        const w = document.createElement('span'); w.className = 'w'; const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = part; w.append(wi); frag.append(w);
      });
      node.replaceWith(frag);
    });
    return $$('.wi', el);
  };
  const hero = $('#hero');

  /* ── welcome screen: plays once per visit, then hands over to the hero ── */
  const welcome = $('#welcome');
  let W = 0;
  if (welcome && root.classList.contains('has-welcome')) {
    W = 3.05;
    lock(true);
    const lines = $$('.welcome__line > span', welcome);
    const tl = gsap.timeline({ onComplete: () => finishWelcome() });
    tl.from(lines[0], { yPercent: 115, duration: .9, ease: 'expo.out' }, .15)
      .from(lines[1], { yPercent: 115, duration: .9, ease: 'expo.out' }, .55)
      .from(lines[2], { yPercent: 115, duration: 1.1, ease: 'expo.out' }, .85)
      .from('.welcome__rule', { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, .9)
      .from('.welcome__meta', { opacity: 0, y: 10, duration: .7, ease: 'power3.out' }, 1.25)
      .to(lines, { yPercent: -115, duration: .7, ease: 'expo.in', stagger: .05 }, 2.15)
      .to('.welcome__rule, .welcome__meta', { opacity: 0, duration: .4 }, 2.15)
      .to(welcome, { yPercent: -100, duration: .95, ease: 'expo.inOut' }, 2.45);
    let done = false;
    const finishWelcome = () => {
      if (done) return; done = true;
      welcome.remove(); root.classList.remove('has-welcome'); lock(false);
      try { sessionStorage.setItem('folio-welcomed', '1'); } catch (e) {}
      removeEventListener('keydown', skip); refresh();
    };
    const skip = () => {
      const jump = 2.45 - tl.time(); if (jump <= 0) return;
      gsap.globalTimeline.getChildren(true, true, false).forEach(t => { if (t !== tl && t.delay() >= W - .1) t.delay(t.delay() - jump); });
      tl.seek(2.45);
    };
    welcome.addEventListener('click', skip); addEventListener('keydown', skip);
    setTimeout(() => { if (!done) { gsap.set(welcome, { yPercent: -100 }); finishWelcome(); } }, 6500);
  } else welcome?.remove();

  const nameEl = $('.hero__name'); nameEl.classList.add('is-masked');
  gsap.from('.hero__n1, .hero__n2', { yPercent: 105, duration: 1.5, ease: 'expo.out', stagger: .12, delay: W + .1, onComplete: () => nameEl.classList.remove('is-masked') });
  $$('[data-rise]').forEach(el => {
    const words = split(el), inHero = hero.contains(el);
    gsap.from(words, { yPercent: 112, duration: 1.15, ease: 'expo.out', stagger: inHero ? .025 : .028, delay: inHero ? W + .55 : 0, scrollTrigger: inHero ? null : { trigger: el, start: 'top 86%', once: true } });
  });
  $$('.shot img').forEach(img => gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('[data-fade]').forEach((el, i) => {
    const inHero = hero.contains(el);
    gsap.from(el, { opacity: 0, y: 22, duration: 1.1, ease: 'power3.out', delay: inHero ? W + .55 + i * .12 : 0, scrollTrigger: inHero ? null : { trigger: el, start: 'top 90%', once: true } });
  });
  $$('[data-rule]').forEach(el => gsap.from(el, { scaleX: 0, duration: 1.6, ease: 'expo.inOut', delay: W + .4 }));
  gsap.from('.top', { opacity: 0, y: -14, duration: 1, ease: 'power3.out', delay: W + .3, clearProps: 'all' });
  const batch = (sel, y = 26) => ScrollTrigger.batch(sel, { start: 'top 92%', once: true, onEnter: els => gsap.from(els, { opacity: 0, y, duration: 1, ease: 'power3.out', stagger: .07 }) });
  batch('.work__head'); batch('.skills > div'); batch('.cert:not([hidden])', 16); batch('.journey li'); batch('.contact__links li', 16);
  $$('.figures b').forEach(b => {
    const node = b.firstChild, end = parseInt(node.textContent, 10), o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 92%', once: true }, onUpdate: () => { node.textContent = Math.round(o.v); } });
  });
  gsap.to('.hero__title', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('.contact__title', { xPercent: -3 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 20%', scrub: true } });
  document.fonts?.ready.then(refresh);
  addEventListener('load', refresh);
})();
