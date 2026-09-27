const fs = require('fs');
let s = fs.readFileSync('build-db.js', 'utf8');

// 1) add base_mm derivation after rows are built (before sanity check)
const anchor = "// sanity: every row has a PNG; every PNG has a row";
const fn = `// MESBG base sizes: foot 25mm / cavalry 40mm / monster 50mm / big monster 60mm / huge 100mm
const HUGE = new Set(['mumakil','watcher_in_the_water','smaug','scatha','dragon_lord','durins_bane','durin_bane','gothmog_balrog','ancient_dragon']);
const BIG = new Set(['ent','fellbeast','witchking_fellbeast','nazgul_fellbeast','great_eagle','troll_cave','troll_mountain','troll_snow','troll_war','troll_drummer','moria_troll','olf_haunt','buhrdur','dwerghammer','mewlip','boat_troll']);
const baseMM = r => {
  if (r.role === 'terrain') return '';
  if (HUGE.has(r.id)) return '100mm';
  if (r.role === 'monster' || r.role === 'beast') {
    if (r.base === 'XXL' || BIG.has(r.id)) return '60mm';
    if (r.base === 'XL') return '50mm';
    if (r.base === 'L') return '50mm';
    return '50mm';
  }
  if (r.role === 'cavalry' || r.base === 'XL' || /mounted|warg_rider|chariot|chieftain.*warg/.test(r.id)) return '40mm';
  return '25mm';
};
rows.forEach(r => { r.base_mm = baseMM(r); });

` + anchor;
if (!s.includes(anchor)) { console.log('anchor missing'); process.exit(1); }
s = s.replace(anchor, fn);

// 2) add base_mm to COLS
s = s.replace("'weapon', 'base', 'sheet'", "'weapon', 'base', 'base_mm', 'sheet'");

// 3) show base_mm on cards instead of the size-code base
s = s.replace('r.weapon} · ${r.base}', 'r.weapon}${r.base_mm ? " · " + r.base_mm : ""}');

fs.writeFileSync('build-db.js', s);
console.log('ok');
