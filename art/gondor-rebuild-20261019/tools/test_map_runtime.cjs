// Run with a copy of the production game HTML used by the workshop.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
if (!process.argv[2]) throw Error('Usage: node test_map_runtime.cjs <game-source.html>');
const game = fs.readFileSync(process.argv[2], 'utf8');
const runtime = fs.readFileSync(path.join(root, 'review/map-runtime.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const roster = JSON.parse(fs.readFileSync(path.join(root, 'roster-source.json'), 'utf8'));

function expressionAfter(marker, open = '{', close = '}') {
  const start = game.indexOf(marker) + marker.length;
  assert.ok(start >= marker.length, `Game declaration missing: ${marker}`);
  let depth = 0, quote = '', escaped = false;
  for (let i = start; i < game.length; i++) {
    const c = game[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = '';
    } else if ('"\'`'.includes(c)) quote = c;
    else if (c === open) depth++;
    else if (c === close && --depth === 0) return game.slice(start, i + 1);
  }
  throw Error(`Unclosed game declaration: ${marker}`);
}

const context = vm.createContext({structuredClone, Map, setTimeout() { throw Error('Unexpected startup retry'); }});
vm.runInContext(`const Ft=${expressionAfter('Ft=')};const zt=${expressionAfter('zt=')};const $t=${expressionAfter('$t=')};`, context);
vm.runInContext(`const newProfiles=${expressionAfter('const newProfiles = ')};for(const [id,p] of Object.entries(newProfiles))zt[id]={...structuredClone(Ft),...structuredClone(p)};`, context);
vm.runInContext(`const extra=${expressionAfter('window.MESBG_EXTRA_UNITS=', '[', ']')};for(const d of extra)zt[d.id]={...structuredClone(Ft),...structuredClone(d.profile)};`, context);
for (const suffix of ['2', '3']) {
  vm.runInContext(`for(const d of ${expressionAfter('window.MESBG_EXTRA_UNITS' + suffix + '=', '[', ']')})zt[d.id]={...structuredClone(Ft),...structuredClone(d.profile)};`, context);
}
// New troop profiles are registered after the game's original profile table.
vm.runInContext(`const TROOP_NEW_UNITS=${expressionAfter('const TROOP_NEW_UNITS = ', '[', ']')};for(const d of TROOP_NEW_UNITS)zt[d.id]={...structuredClone(Ft),...structuredClone(d.profile)};`, context);
context.q = {meta: new Map(roster.map(m => [m.id, structuredClone(m)])), units: [], counter: 0, steadfast: false};
context.UX = {ready: true};
context.Tt = {sys: {isActive: () => true}, asset: file => 'production/' + file};
context.UNIT_ART_PROFILES = {};
context.window = {__WORKSHOP_ORIGIN__: 'https://workshop.example', __WORKSHOP_DATA__: manifest};

const methodStart = game.indexOf('spawn(Y, b, H) {');
const methodEnd = game.indexOf('\n    start(Y)', methodStart);
assert.ok(methodStart >= 0 && methodEnd > methodStart, 'Production spawn method missing');
vm.runInContext(`q.spawn=({${game.slice(methodStart, methodEnd)}}).spawn;`, context);
const install = runtime.slice(0, runtime.indexOf('// Injected at the end'));

// Reproduce the reported failure before testing the corrected installer.
vm.runInContext(install.replace('zt[id]=structuredClone(profile);', ''), context);
const ready = manifest.units.filter(r => r.status === 'ready');
assert.ok(ready.length > 0);
for (const row of ready) {
  const id = 'trial__' + row.id;
  assert.throws(() => context.q.spawn(id, 'good', {x: 100, y: 100}), /Unknown unit trial__/);
}
vm.runInContext(install, context);
for (const row of ready) {
  const id = 'trial__' + row.id;
  const original = context.q.spawn(row.id, 'good', {x: 100, y: 100});
  const trial = context.q.spawn(id, 'good', {x: 250, y: 100});
  assert.equal(trial.id, id);
  assert.deepEqual(trial.stats, original.stats);
  assert.equal(trial.currentWounds, original.currentWounds);
  assert.equal(trial.radius, original.radius);
  assert.equal(context.Tt.asset(context.q.meta.get(id).file), 'https://workshop.example/' + row.image);
  assert.deepEqual(Array.from(context.UNIT_ART_PROFILES[id].slice(1, 6)), [row.top, row.bottom, row.centerX, row.centerY, row.stature]);
  vm.runInContext(`zt[${JSON.stringify(id)}].traits.push('preview-only');`, context);
  assert.equal(vm.runInContext(`zt[${JSON.stringify(row.id)}].traits.includes('preview-only')`, context), false);
  assert.ok(fs.existsSync(path.join(root, row.image)), `Missing image: ${row.image}`);
}
for (const row of manifest.units.filter(r => r.status !== 'ready')) {
  assert.equal(context.q.meta.has('trial__' + row.id), false);
}
assert.throws(() => context.q.spawn('trial__missing', 'good', {}), /Unknown unit/);
console.log(`PASS: ${ready.length} new + ${ready.length} original units spawn with production code; pending excluded; stats isolated.`);
