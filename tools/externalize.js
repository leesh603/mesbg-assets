// tools/externalize.js — extract embedded data-URI assets out of
// LAST-WAR-BAND_v1.9.html into assets/mesbg/<key> files, then write a slim
// index.html that streams them over HTTP (game resolves via ./assets/mesbg/<key>).
// LAST-WAR-BAND_v1.9.html stays fully self-contained for offline use.
// Usage (repo root):  node tools/externalize.js   (build.js runs this automatically)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HTML = path.join(ROOT, 'LAST-WAR-BAND_v1.9.html');
const OUT_HTML = path.join(ROOT, 'index.html');
const AROOT = path.join(ROOT, 'assets', 'mesbg');

const html = fs.readFileSync(HTML, 'utf8');
const tag = 'window.__MESBG_ASSETS__=';
const i = html.indexOf(tag);
if (i < 0) { console.error('asset map not found'); process.exit(1); }
const mstart = html.indexOf('{', i);
let depth = 0, mend = -1;
for (let j = mstart; j < html.length; j++) {
  const c = html[j];
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (!depth) { mend = j; break; } }
}
if (mend < 0) { console.error('asset map not closed'); process.exit(1); }
const body = html.slice(mstart, mend + 1);

const entryRe = /"((?:[^"\\]|\\.)+)":\s*"((?:[^"\\]|\\.)*)"/g;
const dataRe = /^data:([^;,]+)(;base64)?,(.*)$/s;
const keys = [];
let m, written = 0;
while ((m = entryRe.exec(body))) {
  const key = JSON.parse('"' + m[1] + '"');
  const uri = JSON.parse('"' + m[2] + '"');
  const dm = dataRe.exec(uri);
  if (!dm) continue;
  const buf = dm[2] ? Buffer.from(dm[3], 'base64') : Buffer.from(decodeURIComponent(dm[3]));
  const f = path.join(AROOT, ...key.split('/'));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, buf);
  keys.push(key);
  written++;
}
if (!keys.length) { console.error('no assets extracted'); process.exit(1); }

// Only clean up stale files for keys that no longer exist.
const wanted = new Set(keys.map(k => k.split('/').join(path.sep)));
(function prune(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { prune(p); if (!fs.readdirSync(p).length) fs.rmdirSync(p); }
    else if (!wanted.has(path.relative(AROOT, p))) fs.unlinkSync(p);
  }
})(AROOT);

const lite = html.slice(0, i) +
  `window.__MESBG_ASSETS__={};window.__MESBG_ASSET_KEYS__=${JSON.stringify(keys)};` +
  html.slice(mend + 1);
fs.writeFileSync(OUT_HTML, lite);
console.log(`externalized ${written} assets → assets/mesbg/ ; index.html ${(lite.length / 1048576).toFixed(2)}MB`);
