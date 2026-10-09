#!/usr/bin/env node
/* Engine regression snapshot (maintainers; not shipped with the plugin).
 * Builds the example module for EVERY dealer on a platform × {draft, --final} × {sales, service} into a temp folder and
 * records sha256 of every output file + the gate lines (paths stripped).
 *   node test/snapshot.js record [--platform apollo] [--out test/baseline-apollo.json]
 *   node test/snapshot.js compare [--platform apollo] [--baseline test/baseline-apollo.json]   → exit 1 on any difference
 * Rule: an engine refactor must keep the Apollo snapshot identical. Intended output changes = re-record + CHANGELOG note. */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const PLUGIN = path.join(REPO, 'plugins', 'dealer-articles');
const args = process.argv.slice(2);
const mode = args[0] || 'compare';
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const platform = opt('platform', 'apollo');
const file = path.resolve(opt(mode === 'record' ? 'out' : 'baseline', path.join(__dirname, `baseline-${platform}.json`)));

// run from an empty folder so ./dealers overrides can never interfere
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'da-snap-'));
process.chdir(work);
const E = require(path.join(PLUGIN, 'scripts', 'build.js'));
const example = path.join(PLUGIN, 'resources', 'examples', 'example-module.js');
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex').slice(0, 16);

const result = {};
const dealers = E.listDealers().filter((d) => (d.platform || 'apollo') === platform);
for (const d of dealers) {
  const D = E.loadDealer(d.key);
  for (const dept of ['sales', 'service']) {
    if (!D.depts[dept]) continue;
    for (const final of [false, true]) {
      delete require.cache[require.resolve(example)];
      const mod = Object.assign({}, require(example), { dealer: D.key, dept });
      const job = path.join(work, `${D.key}-${dept}-${final ? 'final' : 'draft'}`);
      fs.mkdirSync(job, { recursive: true });
      const lines = [];
      const log = console.log; console.log = (...a) => lines.push(a.join(' '));
      let r;
      try { r = E.build(mod, D, job, { final }); } finally { console.log = log; }
      const files = {};
      const walk = (p) => { for (const e of fs.readdirSync(p, { withFileTypes: true })) { const q = path.join(p, e.name); if (e.isDirectory()) walk(q); else files[path.relative(job, q).replace(/\\/g, '/')] = sha(fs.readFileSync(q)); } };
      walk(job);
      const gates = lines.join('\n').split('\n').filter((l) => /^\s+(✅|❌|⚠️)|^RESULT/.test(l)).map((l) => l.replace(/[A-Z]:\\[^\s]*|\/tmp\/[^\s]*/g, '<path>'));
      result[`${D.key}|${dept}|${final ? 'final' : 'draft'}`] = { files, gates, fails: r.fails, warns: r.warns };
    }
  }
}
try { fs.rmSync(work, { recursive: true, force: true }); } catch (e) { /* ignore */ }

if (mode === 'record') {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ platform, dealers: dealers.map((d) => d.key), cases: result }, null, 1) + '\n');
  console.log(`recorded ${Object.keys(result).length} case(s) for ${dealers.length} ${platform} dealer(s) → ${file}`);
  process.exit(0);
}
const base = JSON.parse(fs.readFileSync(file, 'utf8')).cases;
const diffs = [];
for (const k of new Set([...Object.keys(base), ...Object.keys(result)])) {
  const a = base[k], b = result[k];
  if (!a || !b) { diffs.push(`${k}: ${a ? 'missing now' : 'new case'}`); continue; }
  for (const f of new Set([...Object.keys(a.files), ...Object.keys(b.files)])) if (a.files[f] !== b.files[f]) diffs.push(`${k}: ${f} ${a.files[f] ? (b.files[f] ? 'changed' : 'missing') : 'new'}`);
  const ga = a.gates.join('\n'), gb = b.gates.join('\n');
  if (ga !== gb) diffs.push(`${k}: gate output changed`);
}
if (diffs.length) { console.log(`❌ ${diffs.length} difference(s) vs ${path.basename(file)}:\n  ` + diffs.slice(0, 40).join('\n  ')); process.exit(1); }
console.log(`✅ identical: ${Object.keys(result).length} case(s), ${Object.values(result).reduce((n, c) => n + Object.keys(c.files).length, 0)} files, gate lines included (${platform})`);
