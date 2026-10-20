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

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', wav: 'audio/wav', mp3: 'audio/mpeg', ogg: 'audio/ogg', opus: 'audio/ogg', woff: 'font/woff', woff2: 'font/woff2' };

let html = fs.readFileSync(INDEX, 'utf8');
let src = fs.readFileSync(SRC, 'utf8');
// The pure terrain module is embedded so online and offline boot stay identical.
const terrain = fs.readFileSync(path.join(ROOT,'src','tactical-terrain.js'),'utf8');
src=src.replace(/\/\*__TERRAIN_BEGIN__\*\/[\s\S]*?\/\*__TERRAIN_END__\*\//,()=> '/*__TERRAIN_BEGIN__*/\n'+terrain+'\n/*__TERRAIN_END__*/');
fs.writeFileSync(SRC,src);

// Editable world art profiles are shared by engine and offline output.
const world=fs.readFileSync(path.join(ROOT,'src','world-art.js'),'utf8');
src=src.replace(/\/\*__WORLD_ART_BEGIN__\*\/[\s\S]*?\/\*__WORLD_ART_END__\*\//,()=> '/*__WORLD_ART_BEGIN__*/\n'+world+'\n/*__WORLD_ART_END__*/');
fs.writeFileSync(SRC,src);

// Fixed point costs and the point-budget rules share the online/offline build.
const points = fs.readFileSync(path.join(ROOT,'src','warband-points.js'),'utf8');
const pointsBegin = '/*__WARBAND_POINTS_BEGIN__*/', pointsEnd = '/*__WARBAND_POINTS_END__*/';
const pa = src.indexOf(pointsBegin), pb = src.indexOf(pointsEnd);
if (pa < 0 || pb < pa) throw Error('Warband point markers not found in src/game.js');
src = src.slice(0,pa+pointsBegin.length)+'\n'+points+'\n'+src.slice(pb);
fs.writeFileSync(SRC,src);

// Troop careers and explicit variant profiles are embedded in online/offline builds.
const troopData=fs.readFileSync(path.join(ROOT,'data','troop-promotions.json'),'utf8');
const troopUnits=fs.readFileSync(path.join(ROOT,'data','troop-new-units.json'),'utf8');
let troops=fs.readFileSync(path.join(ROOT,'src','troop-promotions.js'),'utf8');
troops=troops.replace('/*__TROOP_DATA__*/ {}',()=>troopData.trim()).replace('/*__TROOP_NEW_UNITS__*/ []',()=>troopUnits.trim());
const ta=src.indexOf('/*__TROOP_PROMOTIONS_BEGIN__*/'),tb=src.indexOf('/*__TROOP_PROMOTIONS_END__*/');
if(ta<0||tb<ta)throw Error('Troop promotion markers not found');
src=src.slice(0,ta)+'/*__TROOP_PROMOTIONS_BEGIN__*/\n'+troops+'\n'+src.slice(tb);
fs.writeFileSync(SRC,src);

// Recruitment and dark-event rules execute after every catalog and career registration.
// Campaign training executes after troop registration, before encounter power checks.
let growth=fs.readFileSync(path.join(ROOT,'src','warband-growth.js'),'utf8');
growth=growth.replace('/*__WARBAND_GROWTH_DATA__*/ {}',()=>fs.readFileSync(path.join(ROOT,'data','warband-growth.json'),'utf8').trim());
const ga=src.indexOf('/*__WARBAND_GROWTH_BEGIN__*/'),gb=src.indexOf('/*__WARBAND_GROWTH_END__*/');
const block='/*__WARBAND_GROWTH_BEGIN__*/\n'+growth+'\n/*__WARBAND_GROWTH_END__*/\n';
if(ga>=0&&gb>ga)src=src.slice(0,ga)+block+src.slice(gb+'/*__WARBAND_GROWTH_END__*/'.length).replace(/^\n/,'');
else{const at=src.indexOf('/*__RECRUIT_DARK_EVENTS_BEGIN__*/');if(at<0)throw Error('Growth insertion marker not found');src=src.slice(0,at)+block+src.slice(at);}
const encounterBegin='/*__RECRUIT_DARK_EVENTS_BEGIN__*/',encounterEnd='/*__RECRUIT_DARK_EVENTS_END__*/';
const ea=src.indexOf(encounterBegin),eb=src.indexOf(encounterEnd);
if(ea<0||eb<ea)throw Error('Recruit/dark-event markers not found');
src=src.slice(0,ea+encounterBegin.length)+'\n'+fs.readFileSync(path.join(ROOT,'src','recruit-dark-events.js'),'utf8')+'\n'+src.slice(eb);
fs.writeFileSync(SRC,src);

const deployBegin='/*__WARBAND_DEPLOYMENT_BEGIN__*/',deployEnd='/*__WARBAND_DEPLOYMENT_END__*/';
const da=src.indexOf(deployBegin),db=src.indexOf(deployEnd);
if(da<0||db<da)throw Error('Deployment module markers not found');
src=src.slice(0,da+deployBegin.length)+'\n'+fs.readFileSync(path.join(ROOT,'src','warband-deployment.js'),'utf8')+'\n'+src.slice(db);
fs.writeFileSync(SRC,src);

const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < 0 || b < a) {
  console.error('markers not found in', INDEX);
  process.exit(1);
}
html = html.slice(0, a + BEGIN.length) + '\n' + src.replace(/^\n+|\s+$/g, '') + '\n' + html.slice(b);
// keep the served asset key list in sync with files on disk — a unit whose
// token isn't listed fails the boot-time "Missing unit art" check.
const onlineOnly = process.argv.includes('--online-only');
// Preserve the current manifest and append new troop art, including online-only builds.
{
  const m=html.match(STUB);
  if(m){const keys=JSON.parse(m[0].match(/__MESBG_ASSET_KEYS__=(\[[\s\S]*\]);/)[1]);
    for(const d of JSON.parse(troopUnits))if(!keys.includes(d.meta.file))keys.push(d.meta.file);
    html=html.slice(0,m.index)+'window.__MESBG_ASSETS__={};window.__MESBG_ASSET_KEYS__='+JSON.stringify(keys)+';'+html.slice(m.index+m[0].length);
  }
}
const _keys = [];
if (!onlineOnly) {
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
}
// src/ui.css (shared design rules for the mobile UI/HUD) → <style id="ui-overhaul">, kept last in <head>
// so it sits on top of the older style blocks. Edit src/ui.css, not that block.
{
  const UICSS = path.join(ROOT, 'src', 'ui.css');
  if (fs.existsSync(UICSS)) {
    const tag = '<style id="ui-overhaul">\n' + fs.readFileSync(UICSS, 'utf8').trim() + '\n</style>';
    const re = /<style id="ui-overhaul">[\s\S]*?<\/style>/;
    html = re.test(html) ? html.replace(re, () => tag) : html.replace('</head>', () => tag + '</head>');
    console.log('spliced src/ui.css → index.html');
  }
}
fs.writeFileSync(INDEX, html);
console.log('spliced src/game.js → index.html', (html.length / 1048576).toFixed(2) + 'MB');
// smoke check: every inline <script> in index.html must parse — a merge-corrupted
// script (e.g. fused asset keys) black-screens the whole game at boot.
{
  const re = new RegExp('<script(?![^>]*src)[^>]*>([\\s\\S]*?)</' + 'script>', 'g');
  let mm, n = 0;
  while ((mm = re.exec(html))) {
    try { new Function(mm[1]); } catch (e) { console.error('inline script', n, 'fails to parse:', e.message); process.exit(1); }
    n++;
  }
}

if (process.argv.includes('--no-bundle')) process.exit(0); // quick UI iterations: skip the 200MB+ offline bundle
if (onlineOnly) { console.log('online build: existing asset manifest preserved; offline bundle skipped'); process.exit(0); }

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



