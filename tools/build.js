// tools/build.js — splice src/game.js into index.html between the
// /*__LWB_SRC_BEGIN__*/ ... /*__LWB_SRC_END__*/ markers, then rebuild the
// self-contained MIDDLE-EARTH-WARBANDS_v1.9.html (offline bundle, not committed —
// it exceeds GitHub's 100MB file limit).
//
// index.html is the source of truth: it holds all markup, CSS, engine code
// and the asset key list, and it is what GitHub Pages serves. On a fresh
// clone this script works with no other prerequisites.
// Usage (repo root):  node tools/build.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const FAT = path.join(ROOT, 'MIDDLE-EARTH-WARBANDS_v1.9.html');
const SRC = path.join(ROOT, 'src', 'game.js');
const AROOT = path.join(ROOT, 'assets', 'mesbg');
const BEGIN = '/*__LWB_SRC_BEGIN__*/';
const END = '/*__LWB_SRC_END__*/';
const STUB = /window\.__MESBG_ASSETS__=\{\};window\.__MESBG_ASSET_KEYS__=\[[^\]]*\];/;

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', wav: 'audio/wav', mp3: 'audio/mpeg', ogg: 'audio/ogg', woff: 'font/woff', woff2: 'font/woff2' };

let html = fs.readFileSync(INDEX, 'utf8');
const src = fs.readFileSync(SRC, 'utf8');

const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < 0 || b < a) {
  console.error('markers not found in', INDEX);
  process.exit(1);
}
html = html.slice(0, a + BEGIN.length) + '\n' + src.replace(/^\n+|\s+$/g, '') + '\n' + html.slice(b);
// keep the served asset key list in sync with files on disk — a unit whose
// token isn't listed fails the boot-time "Missing unit art" check.
const _keys = [];
(function _walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? _walk(p) : _keys.push(path.relative(AROOT, p).split(path.sep).join('/'));
  }
})(AROOT);
_keys.sort();
{
  const m = html.match(STUB);
  if (m) html = html.slice(0, m.index) + 'window.__MESBG_ASSETS__={};window.__MESBG_ASSET_KEYS__=' + JSON.stringify(_keys) + ';' + html.slice(m.index + m[0].length);
  console.log('asset keys synced:', _keys.length);
}
fs.writeFileSync(INDEX, html);
console.log('spliced src/game.js → index.html', (html.length / 1048576).toFixed(2) + 'MB');

// Build the offline single-file bundle: replace the asset stub with a real
// base64 map of every file under assets/mesbg/.
const map = {};
let count = 0;
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    const key = path.relative(AROOT, p).split(path.sep).join('/');
    const mime = MIME[path.extname(p).slice(1).toLowerCase()];
    if (!mime) continue;
    map[key] = `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
    count++;
  }
})(AROOT);

const fat = html.replace(STUB, () => 'window.__MESBG_ASSETS__=' + JSON.stringify(map) + ';');
if (fat === html) { console.error('asset stub not found in index.html'); process.exit(1); }
fs.writeFileSync(FAT, fat);
console.log(`built offline bundle (${count} assets embedded) → MIDDLE-EARTH-WARBANDS_v1.9.html`, (fat.length / 1048576).toFixed(1) + 'MB');
