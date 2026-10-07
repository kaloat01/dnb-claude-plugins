#!/usr/bin/env node
/* dealer-articles engine: "Editorial v2" long-form article builder for Apollo (Team Velocity) custom pages.
 * Dealers: resources/dealers/<key>.json (./dealers/<key>.json in the working folder overrides). Pure Node >= 18, no deps.
 * Spec: repository docs/CONTRACT.md (maintainers).  node build.js env | dealers | new --dealer "<name>" --title "<title>" [--out <dir>]
 *   | status <job> | build <job> [--final] | shot <job> [--widths 1280,375] | images <job> */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const os = require('os');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const RES = path.join(ROOT, 'resources');
const APOLLO_IMG = 'https://service.secureoffersites.com/images/GetLibraryImage?fileNameOrId=';
const GOOGLE_FONT = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';

/* Editorial v2 base tokens: identical for EVERY dealer. A dealer changes only its link color/hover/underline (style.*). */
const BASE = {
  head: 'Georgia,"Times New Roman",Times,serif',
  body: '"Roboto","Helvetica Neue",Arial,sans-serif',
  headWeight: 400, h1: 48, h2: 32, bodySize: 18,
  ink: '#111111', text: '#333333', muted: '#666666', soft: '#777777', marker: '#8A9099', line: '#E0E0E0', gray: '#F5F5F5', dark: '#0A0A0A',
  radius: 2,
};
const GLOBAL_BANNED = ['look no further', 'premier', 'seamless', 'elevate', 'nestled', 'unmatched', 'best-in-class', 'state-of-the-art', 'unlock',
  'peace of mind', 'top dollar', 'guarantee', 'best price', 'highest price', 'certified technician', 'factory-trained', 'factory-certified',
  'master technician', 'price match', 'whether you are', 'when it comes to', "in today's market", 'closer than most', 'outguns', 'fast-paced',
  'comprehensive solution', 'lorem', 'TODO', 'UNVERIFIED'];

/* ------------------------------------------------------------------ helpers */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s) => String(s).replace(/<[^>]+>/g, ' ');
const decode = (s) => String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const digits10 = (p) => String(p).replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
const telHref = (p) => 'tel:+1' + digits10(p);
const e164 = (p) => '+1-' + digits10(p).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const countWords = (s) => String(s).split(/\s+/).filter(Boolean).length;
const DAY = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };
function t12(t) { let [h, m] = t.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${String(m).padStart(2, '0')} ${ap}`; }
function hoursText(rows) { return rows.map(([d, o, c]) => `${DAY[d[0]]}${d.length > 1 ? ' to ' + DAY[d[d.length - 1]] : ''}: ${t12(o)} to ${t12(c)}`).join('  ·  '); }
function minCss(s) { return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim(); }
function hexRgba(hex, a) { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; }
function readJson(f) { return JSON.parse(fs.readFileSync(f, 'utf8').replace(/^﻿/, '')); }
function today() { const d = new Date(); const p = (n) => String(n).padStart(2, '0'); return { iso: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`, label: `${p(d.getMonth() + 1)}/${p(d.getDate())}/${d.getFullYear()}` }; }
function die(msg, code = 1) { console.error(msg); process.exit(code); }

/* ------------------------------------------------------------------ dealers */
const dealerDirs = () => [path.join(process.cwd(), 'dealers'), path.join(RES, 'dealers')];
function dealerFile(key, ext = '.json') { for (const d of dealerDirs()) { const f = path.join(d, key + ext); if (fs.existsSync(f)) return f; } return null; }
function listDealers() {
  const keys = new Set();
  for (const d of dealerDirs()) if (fs.existsSync(d)) fs.readdirSync(d).filter((f) => /\.json$/i.test(f)).forEach((f) => keys.add(f.replace(/\.json$/i, '')));
  return [...keys].sort().map((k) => { try { return Object.assign({ key: k }, readJson(dealerFile(k)), { file: dealerFile(k) }); } catch (e) { return { key: k, name: `(unreadable: ${e.message})`, aliases: [], file: dealerFile(k) }; } });
}
function loadDealer(k) {
  let f = dealerFile(k);
  if (!f) { const hit = listDealers().find((d) => d.prefix === k); if (hit) f = hit.file; }
  if (!f) die(`Unknown dealer "${k}". Run: node build.js dealers`);
  const j = readJson(f);
  const a = j.address || {};
  const miss = ['key', 'prefix', 'name', 'brand', 'domain'].filter((x) => !j[x]).concat(['street', 'city', 'region', 'zip'].filter((x) => !a[x]).map((x) => 'address.' + x));
  if (!j.departments || !Object.keys(j.departments).length) miss.push('departments');
  if (miss.length) die(`Dealer file ${f} is missing: ${miss.join(', ')}`);
  const domain = j.domain.replace(/\/+$/, '');
  const routes = j.routes || {};
  return {
    key: j.key, P: j.prefix, platform: j.platform || 'apollo', name: j.name, brand: j.brand, group: j.group, domain,
    street: a.street, city: a.city, region: a.region, zip: a.zip, country: a.country || 'US', geo: j.geo, mainPhone: j.mainPhone,
    depts: j.departments, routes, areas: j.areas || [], excluded: j.excluded || [], bans: j.bans || [],
    directions: routes.directions || null, // builder-owned buttons are emitted only for routes the dealer file has
    style: j.style || {}, apollo: j.apollo || {}, shared: j.images || {}, file: f,
  };
}
function loadSitemap(key) {
  const f = dealerFile(key, '.sitemap.txt');
  if (!f) return null;
  return fs.readFileSync(f, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    .map((l) => { try { return /^https?:/i.test(l) ? new URL(l).pathname : l; } catch (e) { return l; } });
}
function matchDealer(q) {
  const all = listDealers();
  const n = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const qq = n(q);
  const qt = qq.split(' ').filter(Boolean);
  const names = (d) => [d.key, d.name, d.prefix, ...(d.aliases || [])].map(n).filter(Boolean);
  const exact = all.filter((d) => names(d).includes(qq));
  if (exact.length === 1) return { hit: exact[0], cands: exact, all };
  if (exact.length > 1) return { cands: exact, all };
  const fuzzy = all.filter((d) => {
    const ns = names(d);
    const toks = new Set(ns.join(' ').split(' '));
    return ns.some((s) => s.includes(qq) || (s.length > 3 && qq.includes(s))) || (qt.length && qt.every((t) => toks.has(t)));
  });
  return fuzzy.length === 1 ? { hit: fuzzy[0], cands: fuzzy, all } : { cands: fuzzy, all };
}
function slugify(t) {
  let s = String(t).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length > 80) s = s.slice(0, 80).replace(/-[^-]*$/, '');
  return s;
}

/* ------------------------------------------------------------------ CSS (Editorial v2 core, tokenized) */
function tokens(D) {
  const st = D.style || {};
  const link = st.linkColor || BASE.ink;
  const u = !!st.linkUnderline;
  return Object.assign({}, BASE, {
    link: u ? BASE.ink : link,
    linkSoft: u ? BASE.ink : hexRgba(link, 0.35),
    linkHover: st.linkHover || link,
  });
}
function css(P, B) {
  const R = `.${P}-art`;
  const V = `--${P}a`;
  const r = B.radius;
  return `
/* ${P}-art: Editorial v2 article system (site-wide; every rule scoped to .${P}-art) */
${R}{${V}-ink:${B.ink};${V}-text:${B.text};${V}-muted:${B.muted};${V}-soft:${B.soft};${V}-marker:${B.marker};${V}-line:${B.line};${V}-gray:${B.gray};${V}-dark:${B.dark};${V}-link:${B.link};${V}-link-soft:${B.linkSoft};${V}-link-hover:${B.linkHover};
display:block;font-family:${B.body};font-size:${B.bodySize}px;line-height:1.7;color:var(${V}-text);background:#ffffff;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;margin:0;padding:0 0 8px;overflow-wrap:break-word;text-align:left}
${R} *,${R} *::before,${R} *::after{box-sizing:border-box}
${R} img{display:block;max-width:100%;height:auto;border:0}
${R} p{margin:0 0 22px;padding:0;font-size:inherit;line-height:inherit;color:inherit}
${R} h1,${R} h2,${R} h3{font-family:${B.head};font-weight:${B.headWeight};color:var(${V}-ink);margin:0;padding:0;text-transform:none;letter-spacing:0}
${R} h1,${R} h2,${R} h3,${R} .${P}-more-t,${R} .${P}-inline-cta p{text-wrap:balance}
${R} p,${R} li,${R} figcaption{text-wrap:pretty}
${R} figure{margin:0}
${R} .${P}-wrap{max-width:760px;margin:0 auto;padding:0 20px}
/* hero + header */
${R} .${P}-hero{max-width:1440px;margin:0 auto;padding:0}
${R} .${P}-hero img{width:100%;aspect-ratio:16/9;object-fit:cover;object-position:center}
${R} .${P}-hero.${P}-hero-contained{max-width:1160px;padding:24px 20px 0}
${R} .${P}-head{max-width:760px;margin:0 auto;padding:44px 20px 0}
${R} .${P}-eyebrow{display:flex;align-items:center;gap:12px;font-size:12px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:var(${V}-muted);margin:0 0 18px;font-weight:600}
${R} .${P}-eyebrow::before{content:"";display:block;width:28px;height:1px;background:var(${V}-ink)}
${R} h1.${P}-title{font-size:32px;line-height:1.12;margin:0 0 20px}
${R} .${P}-dek{font-size:20px;line-height:1.55;color:#444444;margin:0 0 26px}
${R} .${P}-meta{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:13px;line-height:1.4;color:var(${V}-soft);border-top:1px solid var(${V}-line);padding:14px 0 0;margin:0}
${R} .${P}-meta span{white-space:nowrap}
/* at a glance + toc */
${R} .${P}-glance{background:var(${V}-gray);border-top:3px solid var(${V}-ink);padding:26px 30px 8px;margin:40px 0 0}
${R} .${P}-label{font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;color:var(${V}-ink);margin:0 0 14px}
${R} .${P}-glance ul{list-style:none;margin:0;padding:0}
${R} .${P}-glance li{position:relative;padding:0 0 0 22px;margin:0 0 16px;font-size:17px;line-height:1.6}
${R} .${P}-glance li::before{content:"";position:absolute;left:0;top:10px;width:8px;height:8px;background:var(${V}-marker)}
${R} .${P}-toc{margin:30px 0 0;padding:0 0 26px;border-bottom:1px solid var(${V}-line)}
${R} .${P}-toc ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:8px 28px}
${R} .${P}-toc li{position:relative;font-size:15px;line-height:1.45;margin:0;padding:0 0 0 18px}
${R} .${P}-toc li::before{content:"";position:absolute;left:0;top:9px;width:6px;height:6px;background:var(${V}-marker)}
/* body typography (section rules, square bullets) */
${R} .${P}-body{padding-top:8px}
${R} .${P}-body h2{font-size:26px;line-height:1.22;margin:48px 0 18px;scroll-margin-top:120px}
${R} .${P}-body h2[id]:not(#${P}-faq)::before{content:"";display:block;width:44px;height:0;border-top:2px solid var(${V}-ink);margin:0 0 20px}
${R} .${P}-body h3{font-family:${B.body};font-size:20px;line-height:1.35;font-weight:700;margin:34px 0 10px}
${R} .${P}-body ul,${R} .${P}-body ol{margin:0 0 24px;padding:0 0 0 22px}
${R} .${P}-body li{margin:0 0 10px;padding:0}
${R} .${P}-body ul:not(.${P}-steps){list-style:none;padding-left:0}
${R} .${P}-body ul:not(.${P}-steps)>li{position:relative;padding-left:24px}
${R} .${P}-body ul:not(.${P}-steps)>li::before{content:"";position:absolute;left:2px;top:12px;width:7px;height:7px;background:var(${V}-marker)}
${R} .${P}-body strong{color:var(${V}-ink);font-weight:700}
${R} .${P}-body a:not(.${P}-btn),${R} .${P}-glance a,${R} .${P}-faq a,${R} .${P}-dealer-facts a,${R} .${P}-dealer-values a{color:var(${V}-link);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;text-decoration-color:var(${V}-link-soft)}
${R} .${P}-body a:not(.${P}-btn):hover,${R} .${P}-glance a:hover,${R} .${P}-faq a:hover,${R} .${P}-dealer-facts a:hover,${R} .${P}-dealer-values a:hover{color:var(${V}-link-hover);text-decoration-color:var(${V}-link-hover)}
${R} .${P}-toc a,${R} .${P}-toc a:hover{color:var(${V}-ink);text-decoration:none}
/* figures (square corners) */
${R} .${P}-fig{max-width:1080px;margin:48px auto;padding:0 20px}
${R} .${P}-fig.${P}-fig-prose{max-width:800px}
${R} .${P}-fig img{width:100%;aspect-ratio:16/9;object-fit:cover}
${R} .${P}-fig figcaption,${R} .${P}-pair figcaption{max-width:720px;margin:12px auto 0;font-size:13px;line-height:1.5;color:var(${V}-soft)}
${R} .${P}-pair{max-width:1080px;margin:48px auto;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
${R} .${P}-pair img{width:100%;aspect-ratio:4/3;object-fit:cover}
${R} .${P}-pair figcaption{margin:10px 0 0}
/* table */
${R} .${P}-table{margin:30px 0 34px}
${R} .${P}-table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
${R} .${P}-table table{width:100%;min-width:560px;border-collapse:collapse;font-size:15px;line-height:1.5;margin:0;background:transparent}
${R} .${P}-table th{text-align:left;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:var(${V}-ink);background:var(${V}-gray);padding:13px 14px;border:0;border-bottom:1px solid var(${V}-ink);vertical-align:bottom}
${R} .${P}-table td{padding:14px;border:0;border-bottom:1px solid var(${V}-line);vertical-align:top;color:var(${V}-text)}
${R} .${P}-table td:first-child{font-weight:700;color:var(${V}-ink)}
${R} .${P}-table .${P}-note{font-size:13px;line-height:1.5;color:var(${V}-soft);margin:10px 0 0}
/* callout, steps, checklist, stats, inline cta */
${R} .${P}-callout{background:var(${V}-gray);border-left:2px solid var(${V}-ink);padding:20px 24px 2px;margin:30px 0 34px;font-size:16px;line-height:1.65}
${R} .${P}-callout .${P}-label{margin:0 0 8px}
${R} .${P}-steps{list-style:none;margin:28px 0 30px;padding:0;counter-reset:st}
${R} .${P}-steps li{counter-increment:st;position:relative;padding:0 0 0 58px;margin:0 0 24px}
${R} .${P}-steps li::before{content:counter(st);position:absolute;left:0;top:-4px;font-family:${B.head};font-size:30px;line-height:1;color:var(${V}-marker)}
${R} .${P}-steps strong{display:block;margin:0 0 4px}
${R} .${P}-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(${V}-ink);border-bottom:1px solid var(${V}-line);margin:40px 0}
${R} .${P}-stat{padding:22px 18px 20px 0}
${R} .${P}-stat+.${P}-stat{padding-left:18px;border-left:1px solid var(${V}-line)}
${R} .${P}-stat-n{display:block;font-family:${B.head};font-size:38px;line-height:1.1;color:var(${V}-ink);margin:0 0 6px}
${R} .${P}-stat-l{display:block;font-size:13px;line-height:1.45;color:var(${V}-muted)}
${R} .${P}-inline-cta{display:flex;align-items:center;justify-content:space-between;gap:18px;border-top:1px solid var(${V}-ink);border-bottom:1px solid var(${V}-ink);padding:22px 0;margin:40px 0}
${R} .${P}-inline-cta p{margin:0;font-family:${B.head};font-size:22px;line-height:1.3;color:var(${V}-ink)}
/* buttons (uniform: ink uppercase; white + ghost on the black closer) */
${R} .${P}-btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 28px;border-radius:${r}px;font-family:${B.body};font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;line-height:1.2;text-align:center;border:1px solid transparent;transition:background-color .2s ease,transform .2s ease;cursor:pointer;text-decoration:none}
${R} a.${P}-btn:hover,${R} a.${P}-btn:focus{text-decoration:none;transform:translateY(-1px)}
${R} a.${P}-btn-ink,${R} a.${P}-btn-ink:hover,${R} a.${P}-btn-ink:focus{background:var(${V}-ink);border-color:var(${V}-ink);color:#ffffff}
${R} a.${P}-btn-ink:hover{background:#000000}
${R} a.${P}-btn-outline,${R} a.${P}-btn-outline:hover,${R} a.${P}-btn-outline:focus{background:transparent;border-color:var(${V}-ink);color:var(${V}-ink)}
${R} a.${P}-btn-outline:hover{background:var(${V}-gray)}
${R} a.${P}-btn-white,${R} a.${P}-btn-white:hover,${R} a.${P}-btn-white:focus{background:#ffffff;border-color:#ffffff;color:#111111}
${R} a.${P}-btn-white:hover{background:#F5F5F5}
${R} a.${P}-btn-ghost,${R} a.${P}-btn-ghost:hover,${R} a.${P}-btn-ghost:focus{background:transparent;border-color:rgba(255,255,255,0.55);color:#ffffff}
${R} a.${P}-btn-ghost:hover{background:rgba(255,255,255,0.08);border-color:#ffffff}
/* faq */
${R} .${P}-faq-sec{margin-top:72px}
${R} .${P}-faq-intro p{font-size:16px;line-height:1.6;color:var(${V}-muted);margin:0 0 18px}
${R} .${P}-faq-intro .${P}-faq-call{font-size:15px;color:var(${V}-text);border-top:1px solid var(${V}-line);padding-top:16px}
${R} .${P}-faq{margin:0}
${R} .${P}-faq details{border-bottom:1px solid var(${V}-line);margin:0}
${R} .${P}-faq details:first-of-type{border-top:1px solid var(${V}-ink)}
${R} .${P}-faq summary{display:block;list-style:none;cursor:pointer;position:relative;padding:20px 44px 20px 0;font-size:18px;line-height:1.45;font-weight:600;color:var(${V}-ink)}
${R} .${P}-faq summary::-webkit-details-marker{display:none}
${R} .${P}-faq summary::after{content:"+";position:absolute;right:4px;top:15px;font-size:26px;font-weight:300;line-height:1;color:var(${V}-ink)}
${R} .${P}-faq details[open] summary::after{content:"\\2212"}
${R} .${P}-faq details p{font-size:16px;line-height:1.7;margin:0 0 22px;padding:0 20px 0 0}
/* dealership section (hairline frame, square corners, ink buttons) */
${R} .${P}-dealer{max-width:1160px;margin:80px auto 0;padding:0 20px}
${R} .${P}-dealer-in{display:grid;grid-template-columns:1fr;gap:0;border-top:3px solid var(${V}-ink);background:var(${V}-gray)}
${R} .${P}-dealer-media{margin:0;min-height:260px;background:var(${V}-gray)}
${R} .${P}-dealer-media img{width:100%;height:100%;min-height:260px;object-fit:cover}
${R} .${P}-dealer-body{padding:30px 26px 32px}
${R} .${P}-dealer-logo{display:block;width:100%;max-width:340px;height:auto;margin:0 0 22px;mix-blend-mode:multiply}
${R} .${P}-dealer-logo.${P}-dealer-logo-sm{width:auto;max-width:96px;margin:0 0 16px}
${R} .${P}-dealer-band{background:var(${V}-dark);padding:20px 24px;margin:0 0 22px;border-radius:var(${V}-radius)}
${R} .${P}-dealer-band .${P}-dealer-logo{margin:0;mix-blend-mode:normal}
${R} .${P}-dealer-solo .${P}-dealer-body{max-width:860px}
${R} .${P}-dealer-media{position:relative;overflow:hidden}
${R} .${P}-dealer-plaque{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;gap:4px;padding:56px 24px 20px;background:linear-gradient(to top,rgba(10,10,10,0.88),rgba(10,10,10,0));color:#fff}
${R} .${P}-dealer-plaque-label{font-family:${B.body};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#fff}
${R} .${P}-dealer-plaque-addr{font-family:${B.body};font-size:15px;line-height:1.4;color:#fff}
${R} .${P}-dealer-values{list-style:none;display:grid;grid-template-columns:1fr;gap:10px 28px;margin:0 0 22px;padding:0}
${R} .${P}-dealer-values li{position:relative;margin:0;padding:0 0 0 18px;font-size:15px;line-height:1.5;color:var(${V}-text)}
${R} .${P}-dealer-values li::before{content:"";position:absolute;left:0;top:8px;width:6px;height:6px;background:var(${V}-marker)}
${R} .${P}-dealer-values strong{display:block;color:var(${V}-ink);font-weight:700}
${R} .${P}-dealer-name{font-family:${B.head};font-size:24px;line-height:1.2;color:var(${V}-ink);margin:0 0 22px;padding:0 0 14px;border-bottom:1px solid var(${V}-line)}
${R} .${P}-dealer h2{font-size:28px;line-height:1.25;margin:0 0 12px}
${R} .${P}-dealer-body>p{font-size:16px;line-height:1.65;color:var(${V}-muted);margin:0 0 18px}
${R} .${P}-dealer-facts{display:grid;grid-template-columns:1fr;gap:12px 28px;margin:0 0 24px;padding:16px 0 0;border-top:1px solid var(${V}-line)}
${R} .${P}-dealer-facts div{margin:0}
${R} .${P}-dealer-facts dt{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:var(${V}-soft);margin:0 0 2px}
${R} .${P}-dealer-facts dd{font-size:15px;line-height:1.5;color:var(${V}-ink);margin:0}
${R} .${P}-dealer .${P}-ctas{justify-content:flex-start;margin:0}
/* closer */
${R} .${P}-closer{background:var(${V}-dark);color:#ffffff;margin:80px 0 0;padding:72px 20px 76px;text-align:center}
${R} .${P}-closer-in{max-width:760px;margin:0 auto}
${R} .${P}-closer .${P}-eyebrow{justify-content:center;color:rgba(255,255,255,0.6)}
${R} .${P}-closer .${P}-eyebrow::before{background:rgba(255,255,255,0.6)}
${R} .${P}-closer h2{color:#ffffff;font-size:36px;line-height:1.2;margin:0 0 16px}
${R} .${P}-closer p{color:rgba(255,255,255,0.78);font-size:17px;margin:0 0 18px}
${R} .${P}-closer-phone{font-size:17px}
${R} .${P}-closer-phone strong{color:#ffffff}
${R} .${P}-closer-phone a,${R} .${P}-closer-phone a:hover{color:#ffffff;text-decoration:none}
${R} .${P}-closer-hours{font-size:13px;color:rgba(255,255,255,0.7)}
${R} .${P}-closer-hours strong{color:#ffffff;font-weight:700;margin-right:4px}
${R} .${P}-ctas{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:30px 0 0}
/* keep reading + fine print */
${R} .${P}-more{max-width:1080px;margin:0 auto;padding:64px 20px 24px}
${R} .${P}-more-grid{display:grid;grid-template-columns:1fr;gap:22px}
${R} .${P}-more-card{position:relative;border-top:2px solid var(${V}-ink);padding:18px 0 0}
${R} .${P}-more-k{display:block;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:var(${V}-muted);margin:0 0 8px}
${R} .${P}-more-t{display:block;font-family:${B.head};font-size:21px;line-height:1.3;color:var(${V}-ink);margin:0 0 8px}
${R} .${P}-more-d{display:block;font-size:15px;line-height:1.55;color:var(${V}-muted)}
${R} a.${P}-more-link,${R} a.${P}-more-link:hover{color:var(${V}-ink);text-decoration:none}
${R} .${P}-more-link::after{content:"";position:absolute;inset:0}
${R} .${P}-more-card:hover .${P}-more-t{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
${R} .${P}-fine{max-width:760px;margin:26px auto 0;padding:0 20px;font-size:12px;line-height:1.6;color:var(${V}-soft)}
/* tablet and up (mobile-first) */
@media (min-width:640px){
${R} .${P}-toc ol{grid-template-columns:1fr 1fr}
${R} .${P}-more-grid{grid-template-columns:repeat(3,1fr);gap:28px}
${R} .${P}-dealer-facts{grid-template-columns:1fr 1fr}
${R} .${P}-dealer-values{grid-template-columns:1fr 1fr}
}
@media (min-width:768px){
${R} h1.${P}-title{font-size:40px}
${R} .${P}-body h2{font-size:30px}
${R} .${P}-dealer-in{grid-template-columns:1.05fr 1fr}
${R} .${P}-dealer-in.${P}-dealer-solo{grid-template-columns:1fr}
${R} .${P}-dealer-body{padding:40px 40px 42px}
}
@media (max-width:767px){
${R}{font-size:17px}
${R} .${P}-hero img{aspect-ratio:4/3}
${R} .${P}-head{padding-top:30px}
${R} .${P}-dek{font-size:18px}
${R} .${P}-glance{padding:22px 20px 6px}
${R} .${P}-pair{grid-template-columns:1fr}
${R} .${P}-stats{grid-template-columns:1fr}
${R} .${P}-stat,${R} .${P}-stat+.${P}-stat{padding:18px 0;border-left:0}
${R} .${P}-stat+.${P}-stat{border-top:1px solid var(${V}-line)}
${R} .${P}-inline-cta{flex-direction:column;align-items:flex-start}
${R} .${P}-closer{padding:56px 20px 60px}
${R} .${P}-closer h2{font-size:28px}
${R} .${P}-btn{width:100%}
}
@media (min-width:1100px){
${R}{font-size:19px;line-height:1.75}
${R} .${P}-wrap,${R} .${P}-head{max-width:800px}
${R} .${P}-hero img{aspect-ratio:12/5}
${R} .${P}-hero.${P}-hero-contained img{aspect-ratio:16/9}
${R} h1.${P}-title{font-size:${B.h1}px;line-height:1.08}
${R} .${P}-body h2{font-size:${B.h2}px}
${R} .${P}-dek{font-size:22px}
${R} .${P}-glance,${R} .${P}-toc,${R} .${P}-table,${R} .${P}-stats,${R} .${P}-inline-cta{margin-left:-80px;margin-right:-80px}
${R} .${P}-glance{padding:30px 40px 12px}
${R} .${P}-glance ul{display:grid;grid-template-columns:1fr 1fr;gap:0 44px}
${R} .${P}-toc ol{grid-template-columns:repeat(3,1fr)}
${R} .${P}-table table{font-size:16px}
${R} .${P}-fig,${R} .${P}-pair{max-width:1160px}
${R} .${P}-fig.${P}-fig-prose{max-width:880px}
${R} .${P}-pair{gap:24px}
${R} .${P}-fig figcaption{max-width:760px}
${R} .${P}-faq-sec{margin-top:88px}
${R} .${P}-faq-grid{max-width:1040px;display:grid;grid-template-columns:300px minmax(0,1fr);gap:72px;align-items:start}
${R} .${P}-faq-intro{position:sticky;top:140px}
${R} .${P}-faq-intro h2{margin-top:0}
${R} .${P}-more{max-width:1160px}
}
@media (prefers-reduced-motion:reduce){${R} .${P}-btn{transition:none}${R} a.${P}-btn:hover{transform:none}}
@media print{${R} .${P}-closer,${R} .${P}-ctas,${R} .${P}-more{display:none}}
`;
}
/* Apollo (Gemini) hardening, verified against live theme CSS (09/28/2026):
 *   body h1{font-size:20px!important}                               -> H1 size needs !important (documented exception)
 *   h1,h2,h3{font-family:var(--fontBold)!important;font-weight:800} -> heading family needs !important (documented exception)
 *   Mazda_OEM: h1-h5{text-transform:uppercase!important}            -> heading text-transform:none needs !important (10/07/2026)
 *   .editor a:not(.no-hover){color:#212529;text-decoration:underline} / :hover{color:inherit}
 * Every other guard is prefixed with "body" so it outranks the theme without !important. */
function cssApollo(P, B) {
  const R = `body .${P}-art`;
  const V = `--${P}a`;
  const on = (sel, decl) => `${sel.map((s) => `${R} ${s}`).join(',')}{${decl}}`;
  const x = (...a) => a.map((s) => s.replace(/~/g, P));
  return `
/* Apollo/Gemini theme guards (scoped: only affect .${P}-art) */
#custompageblock:has(.${P}-art),#custompageblock .editor:has(.${P}-art){padding:0;margin:0;max-width:none;background:#ffffff}
${R} h1,${R} h2,${R} h3{font-family:${B.head}!important;font-weight:${B.headWeight};text-transform:none!important}
${R} .${P}-body h3{font-family:${B.body}!important;font-weight:700}
${R} h1.${P}-title{font-size:32px!important}
@media (min-width:768px){${R} h1.${P}-title{font-size:40px!important}}
@media (min-width:1100px){${R} h1.${P}-title{font-size:${B.h1}px!important}}
${on(x('a.~-btn', 'a.~-btn:hover', 'a.~-btn:focus', 'a.~-more-link', 'a.~-more-link:hover', '.~-toc a', '.~-toc a:hover', '.~-closer-phone a', '.~-closer-phone a:hover'), 'text-decoration:none')}
${on(x('a.~-btn-ink', 'a.~-btn-ink:hover', 'a.~-btn-ghost', 'a.~-btn-ghost:hover', '.~-closer-phone a', '.~-closer-phone a:hover'), 'color:#ffffff')}
${on(x('a.~-btn-white', 'a.~-btn-white:hover', 'a.~-btn-outline', 'a.~-btn-outline:hover', 'a.~-more-link', 'a.~-more-link:hover', '.~-toc a', '.~-toc a:hover'), `color:var(${V}-ink)`)}
${on(x('.~-glance a', '.~-faq a', '.~-dealer-facts a', '.~-dealer-values a', '.~-body a:not(.~-btn)'), `color:var(${V}-link);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;text-decoration-color:var(${V}-link-soft)`)}
${on(x('.~-glance a:hover', '.~-faq a:hover', '.~-dealer-facts a:hover', '.~-dealer-values a:hover', '.~-body a:not(.~-btn):hover'), `color:var(${V}-link-hover);text-decoration-color:var(${V}-link-hover)`)}
${R} .${P}-faq summary:focus-visible,${R} a:focus-visible{outline:2px solid var(${V}-ink);outline-offset:3px}
`;
}
const fullCss = (D) => { const B = tokens(D); return css(D.P, B) + (D.platform === 'apollo' ? cssApollo(D.P, B) : ''); };
function sitewideCss(D) {
  const min = minCss(fullCss(D));
  const hash = crypto.createHash('sha1').update(min).digest('hex').slice(0, 8);
  const text = `<style>\n@import url("${GOOGLE_FONT}");\n/* dealer-articles css ${hash} */\n/* ${D.name} editorial articles: site-wide CSS (Apollo style slot, applies to all pages; every rule scoped to .${D.P}-art) */\n${min}\n</style>\n`;
  return { min, hash, text };
}
function splitTop(s) { const out = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; }
function cssScopeIssues(min, P) {
  const roots = [`.${P}-art`, `body .${P}-art`, `body:has(.${P}-art)`, `#custompageblock:has(.${P}-art)`, `#custompageblock .editor:has(.${P}-art)`];
  const bad = [];
  const re = /([^{}]+)\{/g;
  let m;
  while ((m = re.exec(min))) {
    const pre = m[1].trim();
    if (!pre || pre.startsWith('@')) continue;
    for (const sel of splitTop(pre).map((s) => s.trim())) if (!roots.some((r) => sel === r || (sel.startsWith(r) && /^[ .:[>]/.test(sel.slice(r.length))))) bad.push(sel);
  }
  return bad;
}

/* ------------------------------------------------------------------ images */
function apolloUrl(v, w) { // package URL (proven rule): ids with params stay as-is; big originals are resized to 1920; webp q85
  if (!v) return null;
  v = String(v).trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (/&/.test(v)) return APOLLO_IMG + v;
  return APOLLO_IMG + v + (w > 2400 ? '&Width=1920&Height=0' : '') + '&type=webp&quality=85';
}
function fetchUrl(v) { v = String(v).trim(); if (/^https?:\/\//i.test(v)) return v; return APOLLO_IMG + v + (/&/.test(v) ? '' : '&type=webp&quality=85'); }
function wrapText(s, n) { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { if ((cur + ' ' + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) out.push(cur); return out; }
function placeholderSvg(key, im, isHero) {
  const W = 1600;
  const H = im.w && im.h ? Math.round((W * im.h) / im.w) : Math.round(isHero ? (W * 9) / 16 : (W * 2) / 3);
  const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
  const lines = wrapText(im.desc || im.alt || 'Image to source', 52).slice(0, 5);
  const y0 = Math.round(H / 2 - (lines.length * 50) / 2);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'><rect width='${W}' height='${H}' fill='#EEEEEE'/>`
    + `<rect x='18' y='18' width='${W - 36}' height='${H - 36}' fill='none' stroke='#C4C4C4' stroke-width='2' stroke-dasharray='12 10'/>`
    + `<text x='${W / 2}' y='${y0 - 34}' font-family='Arial,sans-serif' font-size='26' font-weight='700' letter-spacing='4' fill='#8A8A8A' text-anchor='middle'>${x(key)} · PLACEHOLDER</text>`
    + lines.map((l, i) => `<text x='${W / 2}' y='${y0 + 30 + i * 50}' font-family='Arial,sans-serif' font-size='38' fill='#555555' text-anchor='middle'>${x(l)}</text>`).join('')
    + `</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function imageSize(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { type: 'png', w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.length > 10 && b.toString('ascii', 0, 4) === 'GIF8') return { type: 'gif', w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const c = b.toString('ascii', 12, 16);
    if (c === 'VP8 ') return { type: 'webp', w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (c === 'VP8L') { const n = b.readUInt32LE(21); return { type: 'webp', w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
    if (c === 'VP8X') return { type: 'webp', w: b.readUIntLE(24, 3) + 1, h: b.readUIntLE(27, 3) + 1 };
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const mk = b[i + 1];
      if (mk === 0xd8 || mk === 0x01 || (mk >= 0xd0 && mk <= 0xd7) || mk === 0xff) { i += mk === 0xff ? 1 : 2; continue; }
      if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) return { type: 'jpeg', w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
    return { type: 'jpeg' };
  }
  const ispe = b.indexOf('ispe');
  if (b.toString('ascii', 4, 12).startsWith('ftypavi') && ispe > 0) return { type: 'avif', w: b.readUInt32BE(ispe + 8), h: b.readUInt32BE(ispe + 12) };
  return { type: 'unknown' };
}

/* ------------------------------------------------------------------ jobs */
function resolveJob(arg) {
  if (!arg) die('Missing <job> (folder that contains module.js)');
  let p = path.resolve(arg);
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return { job: path.dirname(p), modFile: p };
  const modFile = path.join(p, 'module.js');
  if (!fs.existsSync(modFile)) die(`No module.js in ${p}`);
  return { job: p, modFile };
}
function loadModule(modFile) { delete require.cache[require.resolve(modFile)]; return require(modFile); }
function outPaths(job, mod, P) {
  const pk = path.join(job, 'package');
  return {
    preview: path.join(job, `${mod.slug}-preview.html`), pkg: pk,
    html: path.join(pk, `${mod.slug}-HTML.html`), css: path.join(pk, `${P}-articles-sitewide-CSS.html`),
    sd: path.join(pk, `${mod.slug}-Structured-Data.txt`), seo: path.join(pk, `${mod.slug}-SEO.md`), readme: path.join(pk, 'README.md'),
  };
}
const MOD_FIELDS = ['dealer', 'dept', 'slug', 'path', 'title', 'meta', 'focus', 'keywords', 'datePublished', 'dateModified', 'updatedLabel', 'eyebrow', 'section', 'h1', 'dek', 'hero', 'images', 'glance', 'blocks', 'faq', 'dealerSection', 'closer', 'related'];

/* ------------------------------------------------------------------ build one article */
function build(mod, D, job, opts = {}) {
  const missing = MOD_FIELDS.filter((f) => mod[f] === undefined || mod[f] === null);
  if (missing.length) die(`❌ module fields missing: ${missing.join(', ')}`);
  const B = tokens(D);
  const P = D.P;
  const url = D.domain + mod.path;
  const dept = D.depts[mod.dept];
  if (!dept) die(`❌ dept "${mod.dept}" not in dealer ${D.key} (has: ${Object.keys(D.depts).join(', ')})`);
  const cta = mod.cta || dept.cta;
  const images = Object.assign({}, D.shared, mod.images);
  // dealer images are optional: STORE without Apollo id = text-only dealership section; LOGO without = name band
  const hasLogo = !!(images.LOGO && images.LOGO.apollo);
  const logoSmall = hasLogo && images.LOGO.w > 0 && images.LOGO.w < 300;
  const hasStore = !!(images.STORE && images.STORE.apollo);
  const slots = new Set([mod.hero]);
  mod.blocks.forEach((b) => { if (b.t === 'fig') slots.add(b.img); if (b.t === 'pair') b.items.forEach((i) => slots.add(i.img)); });
  const used = new Set([...slots, ...(hasStore ? ['STORE'] : []), ...(hasLogo ? ['LOGO'] : [])]);
  const placeholders = [...slots].filter((k) => images[k] && !images[k].apollo);

  function img(key, mode) {
    const im = images[key];
    if (!im) die(`❌ image "${key}" is used but not defined in module.images or dealer images`);
    const u = apolloUrl(im.apollo, im.w);
    if (u) return u;
    return mode === 'preview' ? placeholderSvg(key, im, key === mod.hero) : null;
  }
  function imgTag(key, mode, extra) {
    const im = images[key];
    const src = img(key, mode) || `MISSING-APOLLO-ID-${key}`;
    return `<img src="${esc(src)}" alt="${esc(im.alt || '')}"${im.w ? ` width="${im.w}" height="${im.h}"` : ''}${extra === 'eager' ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${extra && extra !== 'eager' ? ` class="${extra}"` : ''}>`;
  }
  // a department phone may be null (e.g. only a toll-free number exists): never print or link one, never fall back
  const phoneLink = (d) => (d && d.phone ? `<a href="${telHref(d.phone)}">${d.phone}</a>` : '');
  const phoneMiss = new Map();
  const tokPhone = (t, d, name) => { if (d && d.phone) return phoneLink(d); phoneMiss.set(t, `${t}: token for a dept with no phone (${name})`); return t; };
  const fill = (html) => String(html).replace(/\{\{PHONE\}\}/g, (t) => tokPhone(t, dept, mod.dept))
    .replace(/\{\{SALESPHONE\}\}/g, (t) => tokPhone(t, D.depts.sales, 'sales'))
    .replace(/\{\{SERVICEPHONE\}\}/g, (t) => tokPhone(t, D.depts.service, 'service'));
  const hrs = (d) => (d && d.hours && d.hours.length ? hoursText(d.hours) : '');
  const ctaBtn = (cls) => (cta && cta.href ? `<a class="${P}-btn ${P}-btn-${cls}" href="${cta.href}">${cta.label}</a>` : '');
  const btns = (a, b) => (a || b ? `<div class="${P}-ctas">${a}${b}</div>` : '');
  const h2s = mod.blocks.filter((b) => b.t === 'h2' && b.id);

  function blocksHtml(mode) {
    let out = '';
    let open = false;
    let lead = '';
    const openCol = () => { if (!open) { out += `<div class="${P}-wrap ${P}-body">`; open = true; } };
    const closeCol = () => { if (open) { out += '</div>'; open = false; } };
    mod.blocks.forEach((b, idx) => {
      switch (b.t) {
        case 'h2': openCol(); out += `<h2${b.id ? ` id="${P}-${b.id}"` : ''}>${b.text}</h2>`; break;
        case 'h3': openCol(); out += `<h3>${b.text}</h3>`; break;
        case 'p': {
          // answer-first pattern: a bold-only answer paragraph runs inline into the paragraph that follows it
          openCol();
          const nx = mod.blocks[idx + 1];
          if (/^<strong>[\s\S]*<\/strong>$/.test(b.html.trim()) && nx && nx.t === 'p') { lead = fill(b.html) + ' '; break; }
          out += `<p>${lead}${fill(b.html)}</p>`; lead = '';
          break;
        }
        case 'list': openCol(); out += `<${b.ordered ? 'ol' : 'ul'}${b.check ? ` class="${P}-check"` : ''}>${b.items.map((i) => `<li>${fill(i)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`; break;
        case 'steps': openCol(); out += `<ol class="${P}-steps">${b.items.map((i) => `<li><strong>${i.h}</strong> ${fill(i.html)}</li>`).join('')}</ol>`; break;
        case 'callout': openCol(); out += `<div class="${P}-callout"><div class="${P}-label">${b.label}</div><p>${fill(b.html)}</p></div>`; break;
        case 'table': openCol();
          out += `<div class="${P}-table">${b.caption ? `<div class="${P}-label">${b.caption}</div>` : ''}<div class="${P}-table-scroll"><table><thead><tr>${b.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${fill(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${b.note ? `<p class="${P}-note">${b.note}</p>` : ''}</div>`;
          break;
        case 'stats': openCol(); out += `<div class="${P}-stats">${b.items.map((s) => `<div class="${P}-stat"><span class="${P}-stat-n">${s.n}</span><span class="${P}-stat-l">${s.l}</span></div>`).join('')}</div>`; break;
        case 'cta': openCol(); out += `<div class="${P}-inline-cta"><p>${b.text}</p><a class="${P}-btn ${P}-btn-ink" href="${b.href}">${b.label}</a></div>`; break;
        case 'fig': closeCol(); out += `<figure class="${P}-fig${b.prose ? ` ${P}-fig-prose` : ''}">${imgTag(b.img, mode)}${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}</figure>`; break;
        case 'pair': closeCol(); out += `<div class="${P}-pair">${b.items.map((i) => `<figure>${imgTag(i.img, mode)}${i.caption ? `<figcaption>${i.caption}</figcaption>` : ''}</figure>`).join('')}</div>`; break;
        default: die(`❌ unknown block type "${b.t}" (block ${idx + 1})`);
      }
    });
    closeCol();
    return out;
  }

  const words = countWords(stripTags(decode([mod.dek, ...mod.glance, ...mod.blocks.map((b) => b.html || b.text || (b.items ? JSON.stringify(b.items) : '') + (b.rows ? JSON.stringify(b.rows) : '')), ...mod.faq.map((f) => f.q + ' ' + f.a), mod.dealerSection.p].join(' '))));
  const readMin = Math.max(1, Math.round(words / 230));

  function article(mode) {
    const faq = mod.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
    const more = mod.related.map((r) => `<div class="${P}-more-card"><span class="${P}-more-k">${r.k}</span><a class="${P}-more-link" href="${r.href}"><span class="${P}-more-t">${r.t}</span></a><span class="${P}-more-d">${r.d}</span></div>`).join('');
    const toc = h2s.length ? `<nav class="${P}-toc" aria-label="In this article"><div class="${P}-label">In this article</div><ol>${h2s.map((h) => `<li><a href="#${P}-${h.id}">${h.toc || stripTags(h.text)}</a></li>`).join('')}</ol></nav>` : '';
    const ds = mod.dealerSection;
    const otherDept = Object.entries(D.depts).find(([k, d]) => k !== mod.dept && d && d.phone);
    const other = ds.other ? [ds.otherLabel || 'Main line', phoneLink(ds.other)]
      : D.mainPhone ? [ds.otherLabel || 'Main line', `<a href="${telHref(D.mainPhone)}">${D.mainPhone}</a>`]
        : otherDept ? [otherDept[1].label, phoneLink(otherDept[1])] : null;
    // logo: wide lockup alone; small emblem (<300 px) + name band; no Apollo logo = name band only;
    // LOGO.onDark (white artwork) = logo on the Editorial v2 black brand band (as the Mercedes white star)
    const logoImg = hasLogo ? imgTag('LOGO', mode, `${P}-dealer-logo${logoSmall ? ` ${P}-dealer-logo-sm` : ''}`) : '';
    const logo = (hasLogo && images.LOGO.onDark ? `<div class="${P}-dealer-band">${logoImg}</div>` : logoImg) + (hasLogo && !logoSmall ? '' : `<div class="${P}-dealer-name">${esc(D.name)}</div>`);
    const facts = [['Address', `${D.street}, ${D.city}, ${D.region} ${D.zip}`], dept.phone && [dept.label, phoneLink(dept)], hrs(dept) && [`${dept.label} hours`, hrs(dept).replace(/ {2}· {2}/g, '<br>')], other]
      .filter(Boolean).map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('');
    // storefront plaque (department + address) and factual value lines: the structure of the dealers' service-specials
    // "Brand Anchor", restyled in Editorial v2 ink. Facts only from the dealer file: no credential or capability claims.
    const plaque = `<figcaption class="${P}-dealer-plaque"><span class="${P}-dealer-plaque-label">${esc(dept.label)} Department</span><span class="${P}-dealer-plaque-addr">${esc(D.street)} · ${esc(D.city)}, ${esc(D.region)} ${esc(D.zip)}</span></figcaption>`;
    const media = hasStore ? `<figure class="${P}-dealer-media">${imgTag('STORE', mode)}${plaque}</figure>` : '';
    const daysOpen = dept.hours ? new Set(dept.hours.flatMap((r) => r[0])).size : 0;
    const R2 = D.routes || {};
    const specials = mod.dept === 'service' ? (R2.specials || R2.serviceSpecials) : (R2.vehicleSpecials || R2.specials);
    const values = [
      daysOpen ? [`Open ${daysOpen} days a week`, `${esc(dept.label)} hours are listed below.`] : null,
      cta && cta.href ? ['Book online', `<a href="${cta.href}">${esc(cta.label)}</a> any time.`] : null,
      specials ? [mod.dept === 'service' ? 'Current service specials' : 'Current offers', `<a href="${specials}">See this month's ${mod.dept === 'service' ? 'service specials' : 'offers'}</a> and their terms.`] : null,
      D.group ? [esc(D.group), `${esc(D.name)} is part of the ${esc(D.group)}.`] : null,
    ].filter(Boolean).slice(0, 4).map(([t, d]) => `<li><strong>${t}</strong>${d}</li>`).join('');
    const dealer = `<section class="${P}-dealer" aria-labelledby="${P}-dealer-h"><div class="${P}-dealer-in${hasStore ? '' : ` ${P}-dealer-solo`}">${media}<div class="${P}-dealer-body">${logo}<div class="${P}-eyebrow">${ds.eyebrow || `Visit us in ${D.city}`}</div><h2 id="${P}-dealer-h">${ds.h}</h2><p>${fill(ds.p)}</p>${values ? `<ul class="${P}-dealer-values">${values}</ul>` : ''}<dl class="${P}-dealer-facts">${facts}</dl>${btns(ctaBtn('ink'), D.directions ? `<a class="${P}-btn ${P}-btn-outline" href="${D.directions}">Get Directions</a>` : '')}</div></div></section>`;
    return `<div class="${P}-art ${P}-art-${mod.slug}">`
      + `<figure class="${P}-hero${mod.heroContained ? ` ${P}-hero-contained` : ''}">${imgTag(mod.hero, mode, 'eager')}</figure>`
      + `<header class="${P}-head"><div class="${P}-eyebrow">${mod.eyebrow}</div><h1 class="${P}-title">${mod.h1}</h1><p class="${P}-dek">${fill(mod.dek)}</p><div class="${P}-meta"><span>${D.name}</span><span>Updated ${mod.updatedLabel}</span><span>${readMin} min read</span></div>`
      + `<div class="${P}-glance"><div class="${P}-label">At a glance</div><ul>${mod.glance.map((g) => `<li>${fill(g)}</li>`).join('')}</ul></div>${toc}</header>`
      + blocksHtml(mode)
      + `<section class="${P}-faq-sec"><div class="${P}-wrap ${P}-body ${P}-faq-grid"><div class="${P}-faq-intro"><h2 id="${P}-faq">${mod.faqTitle || 'Frequently asked questions'}</h2><p>${mod.faqIntro || 'Quick, straight answers to the questions drivers ask most.'}</p><p class="${P}-faq-call">${fill(mod.faqCall || (dept.phone ? `Questions about your ${D.brand}? Call our ${dept.label.toLowerCase()} team at {{PHONE}}.` : `Questions about your ${D.brand}? ${D.routes.contact ? `<a href="${D.routes.contact}">Contact our ${dept.label.toLowerCase()} team</a>.` : `Ask our ${dept.label.toLowerCase()} team.`}`))}</p></div><div class="${P}-faq">${faq}</div></div></section>`
      + dealer
      + `<section class="${P}-closer"><div class="${P}-closer-in"><div class="${P}-eyebrow">${D.name}</div><h2>${mod.closer.h}</h2><p>${fill(mod.closer.p)}</p>${dept.phone ? `<p class="${P}-closer-phone"><strong>${dept.label}:</strong> ${phoneLink(dept)}</p>` : ''}${hrs(dept) ? `<p class="${P}-closer-hours"><strong>${dept.label} Hours:</strong> ${hrs(dept)}</p>` : ''}${btns(ctaBtn('white'), mod.closer.secondary ? `<a class="${P}-btn ${P}-btn-ghost" href="${mod.closer.secondary.href}">${mod.closer.secondary.label}</a>` : '')}</div></section>`
      + `<section class="${P}-more"><div class="${P}-label">Keep reading</div><div class="${P}-more-grid">${more}</div></section>`
      + (mod.fine ? `<p class="${P}-fine">${mod.fine}</p>` : '')
      + `</div>`;
  }

  function schema() {
    const org = D.domain + '/#organization';
    const storeUrl = hasStore ? apolloUrl(images.STORE.apollo, images.STORE.w) : null;
    const heroUrl = img(mod.hero, 'package') || storeUrl || undefined;
    const hoursSpec = (rows) => (rows && rows.length ? rows.map(([d, o, c]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: d, opens: o, closes: c })) : undefined);
    const tel = (p) => (p ? e164(p) : undefined);
    const orgPhone = D.mainPhone || dept.phone || (Object.values(D.depts).find((d) => d && d.phone) || {}).phone;
    const addr = { '@type': 'PostalAddress', streetAddress: D.street, addressLocality: D.city, addressRegion: D.region, postalCode: D.zip, addressCountry: D.country };
    const crumbs = [{ n: 'Home', u: D.domain + '/' }, ...(mod.crumbs || []).map((c) => ({ n: c.n, u: D.domain + c.u })), { n: stripTags(mod.crumbTitle || mod.h1).trim(), u: url }];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['AutoDealer', 'AutoRepair'], '@id': org, name: D.name, url: D.domain + '/',
          telephone: tel(orgPhone),
          address: addr,
          geo: D.geo ? { '@type': 'GeoCoordinates', latitude: D.geo[0], longitude: D.geo[1] } : undefined,
          areaServed: D.areas.length ? D.areas.map((a) => ({ '@type': 'Place', name: a })) : undefined,
          brand: { '@type': 'Brand', name: D.brand },
          image: hasStore ? APOLLO_IMG + images.STORE.apollo : undefined,
          logo: hasLogo ? APOLLO_IMG + images.LOGO.apollo : undefined,
          contactPoint: Object.values(D.depts).filter(Boolean).map((d) => ({ '@type': 'ContactPoint', contactType: d.label.toLowerCase(), telephone: tel(d.phone), hoursAvailable: hoursSpec(d.hours) })),
          department: { '@type': mod.dept === 'service' ? 'AutoRepair' : 'AutoDealer', '@id': D.domain + '/#' + mod.dept, name: D.name + ' ' + dept.label, telephone: tel(dept.phone), address: addr, openingHoursSpecification: hoursSpec(dept.hours) },
        },
        { '@type': 'WebPage', '@id': url + '#webpage', url, name: mod.title, description: mod.meta, isPartOf: { '@id': D.domain + '/#website' }, about: { '@id': org }, breadcrumb: { '@id': url + '#breadcrumb' }, primaryImageOfPage: heroUrl, inLanguage: 'en-US', datePublished: mod.datePublished, dateModified: mod.dateModified },
        { '@type': 'WebSite', '@id': D.domain + '/#website', url: D.domain + '/', name: D.name, publisher: { '@id': org } },
        { '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.n, item: c.u })) },
        {
          '@type': 'BlogPosting', '@id': url + '#article', mainEntityOfPage: { '@id': url + '#webpage' }, url,
          headline: stripTags(mod.h1).trim(), description: mod.meta, image: heroUrl ? [heroUrl] : undefined,
          datePublished: mod.datePublished, dateModified: mod.dateModified, inLanguage: 'en-US',
          author: { '@id': org }, publisher: { '@id': org },
          keywords: mod.keywords.join(', '), articleSection: mod.section, wordCount: words,
          about: mod.about || undefined,
        },
        { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: mod.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      ],
    };
  }

  const out = outPaths(job, mod, P);
  fs.mkdirSync(out.pkg, { recursive: true });
  const cssText = fullCss(D);
  const sw = sitewideCss(D);
  const sd = schema();
  const sdJson = JSON.stringify(sd);
  const frag = article('package');
  const isFinal = !!opts.final && !placeholders.length;
  const heroPkg = img(mod.hero, 'package');

  /* preview: dealer Apollo theme CSS + Gemini-like shell + site-wide CSS inline + schema inline */
  const ap = D.apollo || {};
  const font = ap.themeFont ? `:root{--fontBold:"${ap.themeFont}";--fontRegular:"${ap.themeFont}";--website-primary-theme-color:${ap.themeColor || B.link}}` : '';
  const inner = article('preview').replace(/href="\/(?!\/)/g, `href="${D.domain}/`);
  const shellOpen = ap.shell === 'gemini' ? '<div id="_website_gemini"><div class="h-auto"><div class="Website_Gemini_header_Utility_body"><div id="custompageblock"><div class="editor">' : '<div id="custompageblock"><div class="editor">';
  const shellClose = ap.shell === 'gemini' ? '</div></div></div></div></div>' : '</div></div>';
  const ogImg = esc(heroPkg || (images.STORE && apolloUrl(images.STORE.apollo, images.STORE.w)) || '');
  const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(mod.title)}</title>
<meta name="description" content="${esc(mod.meta)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(mod.ogTitle || mod.title)}"><meta property="og:description" content="${esc(mod.meta)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:site_name" content="${esc(D.name)}"><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary_large_image">
${(ap.themeCss || []).map((h) => `<link rel="stylesheet" href="${esc(h)}">`).join('\n')}
<link rel="stylesheet" href="${GOOGLE_FONT}">
<style>
/* PREVIEW GROUND ONLY: Apollo base (Bootstrap reboot + theme variables) so theme leaks show up locally */
${font}
body{background:#fff;color:#212529;font-size:1rem;line-height:1.5;margin:0}
a{color:#007bff;text-decoration:none}a:hover{color:#0056b3;text-decoration:underline}
h1,h2,h3{font-weight:500;line-height:1.2;margin-bottom:.5rem}h1{font-size:2.5rem}h2{font-size:2rem}h3{font-size:1.75rem}
p,ul,ol{margin-top:0;margin-bottom:1rem}
.pv-bar{position:sticky;top:0;z-index:50;background:${isFinal ? '#e9f7ee' : '#fffbe6'};border-bottom:1px solid ${isFinal ? '#2e8b57' : '#e0c200'};font:12px/1.5 Arial,sans-serif;color:#333;padding:8px 16px}
.pv-bar b{color:#000}.pv-hdr{height:96px;background:#fff;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:18px;padding:0 28px;font:600 14px Arial;color:#555}
.pv-ftr{height:160px;background:#0b1220;margin-top:0}
</style>
<style>
${cssText}
</style>
<script type="application/ld+json">${sdJson}</script>
</head><body>
<div class="pv-bar"><b>${isFinal ? 'LOCAL PREVIEW · FINAL' : 'LOCAL PREVIEW · DRAFT (placeholders) · not for pasting'}</b> · Title (${mod.title.length}): <b>${esc(mod.title)}</b> · Meta (${mod.meta.length}) · Focus: <b>${esc(mod.focus)}</b> · ${url}</div>
<div class="pv-hdr"${hasLogo && images.LOGO.onDark ? ' style="background:#111;color:#ccc"' : ''}>${hasLogo ? `<img src="${esc(APOLLO_IMG + images.LOGO.apollo)}" alt="" style="height:44px;width:auto">` : `<b>${esc(D.name)}</b>`} Site header (Apollo ${esc(ap.shell || 'theme')} shell)</div>
${shellOpen}
${inner}
${shellClose}
<div class="pv-ftr"></div>
</body></html>
`;
  fs.writeFileSync(out.preview, preview);
  fs.writeFileSync(out.css, sw.text);
  fs.writeFileSync(out.html, frag + '\n');
  fs.writeFileSync(out.sd, JSON.stringify(sd, null, 2) + '\n');
  const f = (k, v) => `* ${k}  →  ${v}\n`;
  fs.writeFileSync(out.seo, `# ${mod.slug}: Apollo SEO settings (General SEO Settings)\n\n`
    + f('URL / slug', mod.path) + f('H1 Tag Text', 'leave blank (the H1 is in the page content)') + f('Page Title', mod.title) + f('Meta Description', mod.meta)
    + f('Canonical Url', url) + f('OG Site Name', '#DealerName') + f('OG Title', mod.ogTitle || mod.title) + f('OG Description', mod.meta) + f('OG Locale', 'en_US')
    + f('Meta Keywords', 'leave empty') + f('Robots', 'leave all unchecked') + f('Focus keyword', mod.focus) + f('Hero image URL', heroPkg || 'MISSING (no Apollo id yet)')
    + f('Custom Structured Data', `paste ${path.basename(out.sd)} and CHECK "Replace Structured Data"`));
  const imgList = Object.entries(images).filter(([k, v]) => v && used.has(k)).map(([k, v]) => `- ${k}: ${apolloUrl(v.apollo, v.w) || 'MISSING Apollo id (placeholder)'}${v.desc ? ` · ${v.desc}` : ''}`).join('\n');
  fs.writeFileSync(out.readme, `# ${mod.slug}: Apollo upload map (${D.name})\n\n`
    + (isFinal ? '' : `> **DRAFT: do not paste.** Built without \`--final\`${placeholders.length ? ` and ${placeholders.length} image(s) are still placeholders (${placeholders.join(', ')})` : ''}. Rebuild with \`build <job> --final\` after approval.\n\n`)
    + `1. **Site-wide CSS (once per dealer, shared by all articles):** paste \`${path.basename(out.css)}\` into the site-wide style slot (applies to all pages). Version: \`dealer-articles css ${sw.hash}\`. Re-paste only if the live site shows a different hash (view source, search "dealer-articles css").\n`
    + `2. **New custom page** at \`${mod.path}\` → paste \`${path.basename(out.html)}\` into the page HTML/content area (source view).\n`
    + `3. **Custom Structured Data** → paste \`${path.basename(out.sd)}\` and CHECK "Replace Structured Data".\n`
    + `4. **SEO Settings** → enter each line of \`${path.basename(out.seo)}\` (leave H1 Tag Text blank).\n`
    + `5. **Publish.**\n`
    + `6. **Checks:** exactly one H1; headings render in Georgia${ap.themeFont ? ` (not ${ap.themeFont})` : ''}; images load; buttons show white or ink text, not underlined; FAQ items open; Rich Results Test detects Article, FAQ and Breadcrumb; canonical is ${url}.\n\n`
    + `Images:\n${imgList}\n`);

  /* ---------------- QA gates ---------------- */
  const G = [];
  const gate = (name, fails, ok) => G.push(fails.length ? ['❌', name, fails.join('; ')] : ['✅', name, ok || '']);
  const warnG = (name, msgs, ok) => G.push(msgs.length ? ['⚠️', name, msgs.join('; ')] : ['✅', name, ok || '']);
  const visible = decode(stripTags(frag)).replace(/’/g, "'");
  const seoText = [mod.title, mod.ogTitle || '', mod.meta, mod.h1].join(' ').replace(/’/g, "'");
  const allText = (mod.allowPhrases || []).reduce((t, a) => t.split(a).join(' '), visible + ' ' + seoText);
  let ok = true;
  try { JSON.parse(sdJson); } catch (e) { ok = false; gate('JSON-LD parses', [e.message]); }
  if (ok) gate('JSON-LD parses', [], `${sd['@graph'].length} nodes`);
  const h1n = (frag.match(/<h1\b/g) || []).length;
  gate('Exactly one <h1>', h1n === 1 ? [] : [`found ${h1n}`]);
  const dOpen = (frag.match(/<div\b/g) || []).length, dClose = (frag.match(/<\/div>/g) || []).length;
  gate('Balanced <div>', dOpen === dClose ? [] : [`${dOpen} open / ${dClose} close`], `${dOpen}`);
  gate('No rem units', /[0-9]rem\b/.test(cssText + frag) ? ['rem found in CSS or fragment'] : []);
  const dash = [];
  if (/—/.test(allText)) dash.push('em dash');
  if (/–/.test(allText.replace(/\d\s?–\s?\d/g, '').replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)–/g, ''))) dash.push('en dash outside a digit range');
  gate('No em/en dashes', dash);
  const lower = allText.toLowerCase();
  const hits = [];
  [...GLOBAL_BANNED, ...D.bans].forEach((b) => { if (/^[A-Z]+$/.test(b) ? allText.includes(b) : lower.includes(b.toLowerCase())) hits.push(`"${b}"`); });
  (mod.banned || []).forEach((re) => { if (new RegExp(re, 'i').test(allText)) hits.push(`/${re}/`); });
  gate('Banned phrases (global + dealer + module)', hits);
  gate('Excluded towns', D.excluded.filter((c) => allText.includes(c)));
  // toll-free numbers are allowed only when they are the dealer file's verified About Us number for a department/main line
  const fileDigits = new Set([D.mainPhone, ...Object.values(D.depts || {}).map((d) => d && d.phone)].filter(Boolean).map((p) => String(p).replace(/\D/g, '').slice(-10)));
  const tollFree = (visible.match(/(?<![\d,$])\(?8(77|88|00|66|55|44|33)\)?[-. ]?\d{3}[-. ]\d{4}/g) || []).filter((n) => !fileDigits.has(n.replace(/\D/g, '').slice(-10)));
  gate('No toll-free numbers', tollFree.length ? [`8xx number not in the dealer file: ${tollFree[0]}`] : []);
  const dollars = [];
  for (const m of allText.matchAll(/\$\s?\d[\d,.]*/g)) { const ctx = allText.slice(Math.max(0, m.index - 140), m.index + 140); if (!mod.allowMsrp || !/MSRP/.test(ctx)) dollars.push(m[0]); }
  gate('$ figures only as MSRP (allowMsrp)', dollars.length ? [`${dollars.slice(0, 5).join(', ')} without allowMsrp + "MSRP" within 140 chars`] : []);
  const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  const links = [];
  for (const m of frag.matchAll(/href="([^"]*)"/g)) {
    const h = decode(m[1]).split('#')[0];
    if (h.startsWith('/') && !h.startsWith('//')) links.push(norm(h));
    else if (h.toLowerCase().startsWith(D.domain.toLowerCase())) links.push(norm(h.slice(D.domain.length) || '/'));
  }
  const sitemap = loadSitemap(D.key);
  const listSrc = mod.allowedLinks ? 'module allowedLinks' : sitemap ? `${D.key}.sitemap.txt` : null;
  const owned = [...Object.values(D.routes), ...Object.values(D.depts).map((d) => d && d.cta && d.cta.href)].filter((x) => typeof x === 'string');
  const allowed = new Set([...(mod.allowedLinks || sitemap || []), ...owned].map(norm));
  const uniq = [...new Set(links)];
  if (listSrc) gate('Internal links in allow-list', [...new Set(links.filter((l) => !allowed.has(l)))].map((l) => 'not allowed: ' + l), `${uniq.length} unique, source: ${listSrc}`);
  else G.push(['⚠️', 'Internal links in allow-list', 'no sitemap snapshot and no module allowedLinks; links NOT verified']);
  const parity = mod.faq.filter((q) => !visible.includes(decode(q.a).replace(/’/g, "'").slice(0, 60))).map((q) => 'not visible: ' + q.q);
  const faqSchema = sd['@graph'].find((n) => n['@type'] === 'FAQPage').mainEntity.map((q) => q.acceptedAnswer.text);
  if (faqSchema.join('|') !== mod.faq.map((q) => q.a).join('|')) parity.push('FAQ schema != visible FAQ');
  gate('FAQ parity (visible + schema)', parity, `${mod.faq.length} Q&A`);
  const bare = (frag.match(/<p>\s*<strong>(?:(?!<\/?strong>)[\s\S])*<\/strong>\s*<\/p>/g) || []).length;
  gate('No stand-alone bold paragraph', bare ? [`${bare} found (bold answers must run inline into the next paragraph)`] : []);
  const tok = [...new Set([...(frag + ' ' + seoText + ' ' + (mod.focus || '')).matchAll(/\{\{[^}]*\}?\}?|__[A-Z][A-Z0-9_]*__/g)].map((m) => m[0]))];
  gate('No unresolved {{tokens}} / __MARKERS__', tok.map((t) => phoneMiss.get(t) || t.slice(0, 30)));
  const fragBad = [];
  if (/<(style|script|link|meta|html|head|body)\b|<!doctype/i.test(frag)) fragBad.push('contains style/script/link/meta/doctype/html/head/body');
  if (!frag.startsWith(`<div class="${P}-art ${P}-art-${mod.slug}">`) || !frag.endsWith('</div>')) fragBad.push('must start with the .' + P + '-art wrapper div and end with </div>');
  gate('Fragment is Apollo-safe', fragBad);
  const scope = cssScopeIssues(sw.min, P);
  gate('Site-wide CSS fully scoped', scope.slice(0, 5).map((s) => 'unscoped: ' + s), `css ${sw.hash}`);
  if (opts.final) gate('Final: every article image has an Apollo value', placeholders.map((k) => k + ' has no Apollo id/URL'), `${slots.size} slots`);
  // warnings
  const cleanForNum = frag.replace(/\d{2}\/\d{2}\/\d{4}/g, '');
  warnG('No "01, 02" numbering', /\b0[1-9]\b(?=[^<]*<\/(li|h2|h3|span|div)>)/.test(cleanForNum) ? ['possible "01, 02" style numbering'] : []);
  warnG('Title length ≤65', mod.title.length > 65 ? [`${mod.title.length} chars`] : [], `${mod.title.length}`);
  warnG('Meta 130–165', mod.meta.length < 130 || mod.meta.length > 165 ? [`${mod.meta.length} chars`] : [], `${mod.meta.length}`);
  warnG('H1 ≤80', stripTags(mod.h1).length > 80 ? [`${stripTags(mod.h1).length} chars`] : [], `${stripTags(mod.h1).length}`);
  const blockText = (b) => b.html || b.text || (b.t === 'list' ? b.items.join(' ') : b.t === 'steps' ? b.items.map((i) => i.h + ' ' + i.html).join(' ') : b.t === 'table' ? [...b.head, ...b.rows.flat()].join(' ') : b.t === 'stats' ? b.items.map((s) => s.n + ' ' + s.l).join(' ') : '');
  const bodyWords = countWords(decode(stripTags(mod.blocks.map(blockText).join(' '))));
  warnG('Body words 1,700–2,300 (blocks only)', bodyWords < 1700 || bodyWords > 2300 ? [`${bodyWords} words`] : [], `${bodyWords}`);
  const modText = decode(stripTags([mod.title, mod.h1, mod.dek, ...mod.blocks.map(blockText)].join(' ')));
  warnG('Dealer fit (brand + city in article copy)', [!modText.includes(D.brand) && `brand "${D.brand}" never mentioned`, !modText.includes(D.city) && `city "${D.city}" never mentioned`].filter(Boolean));
  warnG('Question H2s 8–9', h2s.length < 8 || h2s.length > 9 ? [`${h2s.length} H2s`] : [], `${h2s.length}`);
  const faqW = mod.faq.map((q) => countWords(q.a));
  const faqMsg = [];
  if (mod.faq.length < 9 || mod.faq.length > 10) faqMsg.push(`${mod.faq.length} questions (want 9–10)`);
  const offW = faqW.map((w, i) => [w, i + 1]).filter(([w]) => w < 40 || w > 90);
  if (offW.length) faqMsg.push(`answers outside 40–90 words: ${offW.map(([w, i]) => `#${i}=${w}`).join(', ')}`);
  warnG('FAQ 9–10 × 40–90 words', faqMsg, `${mod.faq.length} × ${Math.min(...faqW)}–${Math.max(...faqW)} words`);
  warnG('≥12 unique internal links', uniq.length < 12 ? [`${uniq.length}`] : [], `${uniq.length}`);
  const bodyText = decode(stripTags([mod.dek, ...mod.glance, ...mod.blocks.filter((b) => !/^(h2|h3|table|stats)$/.test(b.t)).map(blockText), ...mod.faq.map((q) => q.a)].join(' ')));
  const longS = bodyText.split(/(?<=[.!?])\s+/).filter((s) => countWords(s) > 25).length;
  warnG('Sentences ≤25 words', longS ? [`${longS} sentence(s) over 25 words`] : []);
  if (!opts.final) warnG('Images sourced', placeholders.map((k) => `${k} placeholder`), `${slots.size} article slots with Apollo values`);
  warnG('Dealer images (optional)', [...(hasStore ? [] : ['no STORE photo → text-only dealership section']), ...(hasLogo ? [] : ['no LOGO → dealer name text band'])], logoSmall ? 'small LOGO emblem + name band' : 'STORE + LOGO');
  warnG('Department contact', [...(dept.phone ? [] : [`${dept.label} has no phone → no number shown anywhere`]), ...(cta && cta.href ? [] : ['no department CTA button']), ...(D.directions ? [] : ['no directions route → no Get Directions button'])]);

  const fails = G.filter((g) => g[0] === '❌').length;
  const warns = G.filter((g) => g[0] === '⚠️').length;
  console.log(`\n=== ${D.name} · ${mod.slug} ${opts.final ? '(FINAL)' : '(draft)'} ===  words≈${words} (body ${bodyWords})  read=${readMin}min  h2=${h2s.length}  faq=${mod.faq.length}  links=${uniq.length}  css=${sw.hash}`);
  G.forEach(([s, n, m]) => console.log(`  ${s} ${n}${m ? ': ' + m : ''}`));
  console.log(`RESULT: ${fails ? `❌ FAIL (${fails} gate${fails > 1 ? 's' : ''})` : '✅ PASS'}${warns ? `, ${warns} warning${warns > 1 ? 's' : ''}` : ''}`);
  console.log(`Outputs:\n  ${out.preview}\n  ${out.pkg}${path.sep}  (${[out.html, out.css, out.sd, out.seo, out.readme].map((p) => path.basename(p)).join(', ')})`);
  return { fails, warns, words, hash: sw.hash, isFinal };
}

/* ------------------------------------------------------------------ commands */
function findBrowser() {
  const c = [];
  if (process.env.DA_BROWSER) c.push(process.env.DA_BROWSER);
  if (process.platform === 'win32') {
    const roots = [process.env['ProgramFiles(x86)'], process.env.ProgramFiles, process.env.LOCALAPPDATA].filter(Boolean);
    roots.forEach((r) => c.push(path.join(r, 'Microsoft', 'Edge', 'Application', 'msedge.exe')));
    roots.forEach((r) => c.push(path.join(r, 'Google', 'Chrome', 'Application', 'chrome.exe')));
  } else if (process.platform === 'darwin') {
    c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium');
  } else {
    const dirs = (process.env.PATH || '').split(path.delimiter).filter(Boolean);
    ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge', 'microsoft-edge-stable'].forEach((n) => dirs.forEach((d) => c.push(path.join(d, n))));
  }
  return c.find((p) => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } }) || null;
}
function cmdEnv() {
  const major = Number(process.versions.node.split('.')[0]);
  const dealers = listDealers();
  const local = path.join(process.cwd(), 'dealers');
  console.log(`${major >= 18 ? '✅' : '❌'} Node ${process.version} (need ≥18)`);
  console.log(`✅ Plugin root: ${ROOT}`);
  const br = findBrowser();
  console.log(`${br ? '✅' : '⚠️'} Screenshot browser: ${br || 'none (shot will be skipped)'}`);
  console.log(`${fs.existsSync(path.join(RES, 'templates', 'module.template.js')) ? '✅' : '❌'} Module template`);
  console.log(`${dealers.length ? '✅' : '❌'} Dealers (${dealers.length}): ${dealers.map((d) => d.key + (loadSitemap(d.key) ? '' : ' [no sitemap]')).join(', ')}`);
  if (fs.existsSync(local)) console.log(`ℹ️ Local overrides from ${local}`);
  process.exit(major >= 18 ? 0 : 1);
}
function cmdDealers() {
  const ds = listDealers();
  if (!ds.length) die('No dealer files found in resources/dealers/');
  ds.forEach((d) => console.log(`${String(d.key).padEnd(26)} ${String(d.prefix || '?').padEnd(5)} ${String(d.name).padEnd(30)} ${d.platform || ''}  aliases: ${(d.aliases || []).join(', ')}${d.lastVerified ? `  (verified ${d.lastVerified})` : ''}${d.file && d.file.startsWith(process.cwd() + path.sep + 'dealers') ? '  [local override]' : ''}`));
}
function cmdNew(a) {
  if (!a.dealer || !a.title) die('Usage: build.js new --dealer "<name or key>" --title "<title>" [--out <dir>]');
  const m = matchDealer(a.dealer);
  if (!m.hit) {
    const list = (m.cands.length ? m.cands : m.all).map((d) => `  ${d.key}  (${d.name}; aliases: ${(d.aliases || []).join(', ')})`).join('\n');
    console.error(`${m.cands.length ? 'Ambiguous' : 'No'} dealer match for "${a.dealer}". ${m.cands.length ? 'Candidates' : 'Available'}:\n${list}`);
    process.exit(2);
  }
  const D = loadDealer(m.hit.key);
  const slug = slugify(a.title);
  if (!slug) die('Title produces an empty slug');
  const dir = path.resolve(a.out || 'articles', D.key, slug);
  if (fs.existsSync(path.join(dir, 'module.js'))) die(`Job already exists (not overwritten): ${dir}`);
  const tplFile = path.join(RES, 'templates', 'module.template.js');
  if (!fs.existsSync(tplFile)) die('Missing template ' + tplFile);
  const t = today();
  const js = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
  const map = { DEALER_NAME: D.name, DEALER: D.key, BRAND: D.brand, CITY: D.city, TITLE: a.title, SLUG: slug, PATH: '/' + slug, DATE_LABEL: t.label, DATE: t.iso };
  let src = fs.readFileSync(tplFile, 'utf8');
  for (const [k, v] of Object.entries(map)) src = src.split(`__${k}__`).join(js(v));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'module.js'), src);
  fs.writeFileSync(path.join(dir, 'job.json'), JSON.stringify({ dealer: D.key, title: a.title, slug, phase: 'intake', created: new Date().toISOString() }, null, 2) + '\n');
  console.log(`✅ ${D.name} (${D.key}) · slug: ${slug}\nJOB: ${dir}`);
}
function cmdStatus(arg) {
  const { job, modFile } = resolveJob(arg);
  const jf = path.join(job, 'job.json');
  console.log(fs.existsSync(jf) ? fs.readFileSync(jf, 'utf8').trim() : '(no job.json)');
  let mod = null;
  try { mod = loadModule(modFile); } catch (e) { console.log(`❌ module.js does not load: ${e.message}`); }
  const slug = (mod && mod.slug) || (fs.existsSync(jf) && readJson(jf).slug) || '?';
  let P = '?';
  try { if (mod) P = loadDealer(mod.dealer).P; } catch (e) { /* reported by build */ }
  const o = outPaths(job, { slug }, P);
  const qa = path.join(job, 'qa');
  const imgs = path.join(job, 'images');
  [['module.js', modFile], ['preview', o.preview], ['package HTML', o.html], ['site-wide CSS', o.css], ['Structured Data', o.sd], ['SEO sheet', o.seo], ['README', o.readme]]
    .forEach(([n, p]) => console.log(`${fs.existsSync(p) ? '✅' : '—'} ${n.padEnd(16)} ${p}`));
  console.log(`${fs.existsSync(qa) ? '✅' : '—'} screenshots      ${fs.existsSync(qa) ? fs.readdirSync(qa).filter((x) => /\.png$/.test(x)).join(', ') : qa}`);
  console.log(`${fs.existsSync(imgs) ? '✅' : '—'} images           ${fs.existsSync(imgs) ? fs.readdirSync(imgs).join(', ') : imgs}`);
  if (fs.existsSync(o.readme)) console.log(/DRAFT: do not paste/.test(fs.readFileSync(o.readme, 'utf8')) ? 'Package: DRAFT' : 'Package: FINAL');
}
function cmdBuild(arg, opts) {
  const { job, modFile } = resolveJob(arg);
  const mod = loadModule(modFile);
  const D = loadDealer(mod.dealer);
  const r = build(mod, D, job, opts);
  const jf = path.join(job, 'job.json');
  try {
    const j = fs.existsSync(jf) ? readJson(jf) : { dealer: D.key, title: mod.title, slug: mod.slug, phase: 'intake', created: new Date().toISOString() };
    j.lastBuild = { at: new Date().toISOString(), final: !!opts.final, pass: !r.fails, warnings: r.warns, words: r.words, css: r.hash };
    fs.writeFileSync(jf, JSON.stringify(j, null, 2) + '\n');
  } catch (e) { console.log('⚠️ could not update job.json: ' + e.message); }
  process.exit(r.fails ? 1 : 0);
}
function cmdShot(arg, a) {
  const { job, modFile } = resolveJob(arg);
  const mod = loadModule(modFile);
  const prev = path.join(job, `${mod.slug}-preview.html`);
  if (!fs.existsSync(prev)) die(`No preview yet (${prev}). Run build first.`);
  const br = findBrowser();
  if (!br) { console.log('⚠️ No Edge/Chrome/Chromium found; screenshots skipped. Open the preview file in a browser instead:\n  ' + prev); process.exit(0); }
  const qa = path.join(job, 'qa');
  fs.mkdirSync(qa, { recursive: true });
  const widths = String(a.widths || '1280,375').split(',').map((s) => parseInt(s, 10)).filter((n) => n > 0);
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'da-shot-'));
  let bad = 0;
  for (const w of widths) {
    const h = a.height ? parseInt(a.height, 10) : w <= 480 ? 9000 : 7000;
    const png = path.join(qa, `preview-${w}.png`);
    try { fs.unlinkSync(png); } catch (e) { /* none */ }
    const r = cp.spawnSync(br, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${prof}`, '--virtual-time-budget=8000', `--screenshot=${png}`, `--window-size=${w},${h}`, pathToFileURL(prev).href], { timeout: 120000, stdio: 'pipe' });
    if (fs.existsSync(png) && fs.statSync(png).size > 1000) console.log(`✅ ${w}×${h} → ${png}`);
    else { bad++; console.log(`⚠️ ${w}px screenshot failed (${r.error ? r.error.message : 'exit ' + r.status}) ${String(r.stderr || '').split('\n').slice(-3).join(' ').trim()}`); }
  }
  try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { /* locked profile files are harmless */ }
  if (bad) console.log('⚠️ Some screenshots failed; open the preview in a browser instead: ' + prev);
}
function advice(role, w) {
  if (!w) return '';
  if (role === 'hero') return w >= 1900 ? 'hero: full-bleed OK' : 'hero <1900 wide → set heroContained: true';
  if (role === 'fig') return w >= 1100 ? 'fig: wide OK' : w >= 880 ? 'fig <1100 → use prose: true (880 column)' : 'fig <880 → use in a pair or replace';
  if (role === 'fig-prose') return w >= 880 ? 'narrow fig: OK' : 'narrow fig <880 → use in a pair or replace';
  if (role === 'pair') return w >= 500 ? 'pair: OK (pairs suit images ≤1000)' : 'pair <500 → replace';
  if (role === 'dealer') return 'dealer section';
  return 'unplaced → ' + (w >= 1900 ? 'hero or fig' : w >= 1100 ? 'fig' : w >= 880 ? 'prose fig' : 'pair');
}
async function cmdImages(arg) {
  const { job, modFile } = resolveJob(arg);
  const mod = loadModule(modFile);
  const D = loadDealer(mod.dealer);
  const images = Object.assign({}, D.shared, mod.images);
  const role = { STORE: 'dealer', LOGO: 'dealer' };
  role[mod.hero] = 'hero';
  (mod.blocks || []).forEach((b) => { if (b.t === 'fig') role[b.img] = b.prose ? 'fig-prose' : 'fig'; if (b.t === 'pair') b.items.forEach((i) => { role[i.img] = 'pair'; }); });
  const dir = path.join(job, 'images');
  fs.mkdirSync(dir, { recursive: true });
  const EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/avif': 'avif', 'image/svg+xml': 'svg' };
  const rows = [];
  let bad = 0;
  for (const [k, im] of Object.entries(images)) {
    const r = role[k] || 'unplaced';
    if (!im) { rows.push([k, r, '—', 'not set (optional dealer image)', '', '', '']); continue; }
    if (!im.apollo) { rows.push([k, r, '—', r === 'dealer' ? 'no Apollo value (optional: text fallback)' : 'no Apollo value (placeholder)', '', '', im.desc || '']); continue; }
    const u = fetchUrl(im.apollo);
    try {
      const res = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', Accept: 'image/avif,image/webp,image/*,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9', Referer: D.domain + '/' } });
      const ct = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      if (res.status !== 200 || !ct.startsWith('image/')) { bad++; rows.push([k, r, '❌', `HTTP ${res.status} ${ct || 'no content-type'}`, '', '', u]); continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const sz = imageSize(buf);
      fs.readdirSync(dir).filter((x) => x.startsWith(k + '.')).forEach((x) => fs.unlinkSync(path.join(dir, x)));
      const file = path.join(dir, `${k}.${EXT[ct] || sz.type || 'img'}`);
      fs.writeFileSync(file, buf);
      const notes = [advice(r, sz.w)];
      if (sz.w && (!im.w || !im.h)) notes.push(`set w: ${sz.w}, h: ${sz.h}`);
      else if (sz.w && Math.abs(im.w / im.h - sz.w / sz.h) > 0.02) notes.push(`declared ${im.w}×${im.h} ratio differs → update w/h`);
      rows.push([k, r, '✅', `${sz.type} ${sz.w ? sz.w + '×' + sz.h : '?'}`, `${Math.round(buf.length / 1024)} KB`, im.w ? `${im.w}×${im.h}` : '—', notes.filter(Boolean).join('; ')]);
    } catch (e) { bad++; rows.push([k, r, '❌', 'fetch failed: ' + e.message, '', '', u]); }
  }
  const head = ['KEY', 'ROLE', '', 'REAL', 'SIZE', 'DECLARED', 'ADVICE'];
  const wd = head.map((h, i) => Math.max(h.length, ...rows.map((x) => String(x[i]).length)));
  [head, ...rows].forEach((x) => console.log(x.map((c, i) => (i === x.length - 1 ? String(c) : String(c).padEnd(wd[i]))).join('  ')));
  console.log(`\nSaved to ${dir}\nPlacement: hero ≥1900 wide = full-bleed, else heroContained; fig ≥1100; prose fig 880; pairs suit images ≤1000.`);
  process.exit(bad ? 1 : 0);
}

/* ------------------------------------------------------------------ main */
function parseArgs(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const s = argv[i];
    if (s.startsWith('--')) { const k = s.slice(2); const nx = argv[i + 1]; if (k !== 'final' && nx !== undefined && !nx.startsWith('--')) { a[k] = nx; i++; } else a[k] = true; } else a._.push(s);
  }
  return a;
}
if (require.main === module) {
  const a = parseArgs(process.argv.slice(2));
  const cmd = a._[0];
  const job = a._[1];
  const run = {
    env: () => cmdEnv(), dealers: () => cmdDealers(), new: () => cmdNew(a), status: () => cmdStatus(job),
    build: () => cmdBuild(job, { final: !!a.final }), shot: () => cmdShot(job, a), images: () => cmdImages(job),
  }[cmd];
  if (!run) die('Usage: node build.js <env|dealers|new|status|build|shot|images> ...\n  new --dealer "<name>" --title "<title>" [--out <dir>]\n  build <job> [--final] · shot <job> [--widths 1280,375] · images <job> · status <job>');
  Promise.resolve().then(run).catch((e) => die('❌ ' + (e && e.stack ? e.stack : e)));
}
module.exports = { build, loadDealer, listDealers, matchDealer, slugify, fullCss, sitewideCss, cssScopeIssues, imageSize, apolloUrl };
