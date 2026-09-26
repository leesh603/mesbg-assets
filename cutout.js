// Cut token sprites out of the roster sheets -> transparent PNGs.
// Sheets are dark-slate backgrounds; tokens have a saturated blue/red rim ring.
// Per cell: find the rim ring -> token circle; bg = border color median;
// foreground = inside-circle OR (differs from bg AND connected to the circle).
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const PAINTED = process.argv.includes('--painted');
const ONLY = ((process.argv.find(a => a.startsWith('--only=')) || '').slice(7)).split(',').filter(Boolean);
const OUT = path.join(SRC, PAINTED ? 'tokens_painted' : 'tokens');
fs.mkdirSync(OUT, { recursive: true });

// ground-truth faction per unit id — painted rims get occluded/tinted, and
// gold/brown figure pixels fake the red family (dwarf_axeshield, pixel ent),
// so the ring colour comes from the roster data, not pixel votes
const sideByName = {};
try {
  for (const s of require('./db-data.js'))
    for (const u of s.units) sideByName[u[0]] = (u[3] && u[3].side) || s.side;
} catch (e) { /* db-data optional */ }

const sheets = [
  { file: 'lotr-tokens-v1.png', rows: 2, cols: 3, names: ['aragorn', 'gandalf', 'warrior_minas_tirith', 'witchking_foot', 'orc_sword', 'cave_troll'] },
  { file: 'glorfindel-topdown-v2.png', rows: 1, cols: 2, names: ['glorfindel_foot', 'glorfindel_mounted'] },
  { file: 'fellbeast-full.png', rows: 1, cols: 1, clip: 2.0, paintedFile: 'fellbeast-topdown-v2.png', names: ['witchking_fellbeast'] },
  { file: 'witchking-mounted-topdown-v1.png', rows: 1, cols: 1, names: ['witchking_mounted'] },
  { file: 'roster-enemy-heroes-v1.png', rows: 2, cols: 3, names: ['witchking_mounted_sheet', 'witchking_foot_mace', 'nazgul_sword', 'saruman', 'orc_shaman', 'orc_captain'] },
  { file: 'roster-enemy-troops-v1.png', rows: 2, cols: 3, names: ['orc_spearman', 'orc_archer', 'uruk_swordshield', 'morannon_orc', 'warg_rider', 'haradrim_spearman'] },
  { file: 'roster-free-heroes-v1.png', rows: 2, cols: 3, names: ['legolas', 'gimli', 'boromir', 'eowyn', 'frodo', 'elrond'] },
  { file: 'roster-free-troops-v1.png', rows: 2, cols: 3, names: ['gondor_archer', 'elf_swordsman', 'dwarf_guardian', 'rohan_royal_guard', 'ithilien_ranger', 'rohan_rider'] },
  { file: 'roster-monsters-v1.png', rows: 2, cols: 3, names: ['balrog', 'mountain_troll', 'shelob', 'barrow_wight', 'moria_goblin', 'uruk_berserker'] },
  { file: 'roster-sauron-nazgul-v1.png', rows: 2, cols: 3, names: ['sauron', 'nazgul_sword_2', 'nazgul_mace', 'nazgul_mounted', 'morgul_knight', 'dwimmerlaik'] },
  { file: 'roster-minastirith-variants-v1.png', rows: 2, cols: 3, names: ['mt_swordshield', 'mt_spear', 'mt_spearshield', 'mt_bowman', 'mt_banner', 'mt_fountain_guard'] },
  { file: 'roster-orc-variants-v1.png', rows: 2, cols: 3, names: ['orc_sword2', 'orc_swordshield', 'orc_spear2', 'orc_twohanded', 'orc_bow', 'orc_drummer'] },
  { file: 'roster-dwarf-variants-v1.png', rows: 2, cols: 3, names: ['dwarf_axeshield', 'dwarf_2haxe', 'dwarf_ranger', 'khazad_guard', 'iron_guard', 'dwarf_banner'] },
  { file: 'roster-elf-variants-v1.png', rows: 2, cols: 3, names: ['elf_swordshield', 'elf_spear', 'elf_bow', 'elf_glaive', 'galadhrim_warrior', 'elf_knight'] },
  { file: 'roster-uruk-variants-v1.png', rows: 2, cols: 3, names: ['uruk_swordshield2', 'uruk_pike', 'uruk_crossbow', 'uruk_scout', 'uruk_berserker2', 'uruk_banner'] },
  { file: 'roster-haradrim-easterling-v1.png', rows: 2, cols: 3, names: ['haradrim_spear', 'haradrim_bow', 'haradrim_priest', 'easterling_phalanx', 'easterling_swordshield', 'easterling_kataphrakt'] },
  { file: 'roster-gondor-exp-v1.png', rows: 2, cols: 3, names: ['dol_amroth_knight', 'gondor_knight', 'osgiliath_veteran', 'lossarnach_axeman', 'citadel_guard', 'pelennor_militia'] },
  { file: 'roster-rohan-exp-v1.png', rows: 2, cols: 3, names: ['rohan_swordshield', 'rohan_spear', 'rohan_archer', 'eomer', 'rohan_outrider', 'rohan_banner'] },
  { file: 'roster-mordor-elite-v1.png', rows: 2, cols: 3, names: ['black_numenorean', 'black_numenorean_mounted', 'orc_tracker', 'war_troll', 'black_guard', 'orc_taskmaster'] },
  { file: 'roster-goblin-v1.png', rows: 2, cols: 3, names: ['goblin_spear', 'goblin_shield', 'goblin_bow', 'goblin_prowler', 'goblin_king', 'goblin_shaman'] },
  { file: 'roster-isengard-exp-v1.png', rows: 2, cols: 3, names: ['dunlending_warrior', 'dunlending_huscarl', 'warg', 'uruk_sapper', 'uruk_scout_archer', 'crebain_swarm'] },
  { file: 'roster-free-special-v1.png', rows: 2, cols: 3, noPad: ['hobbit_shirriff', 'hobbit_bounder'], names: ['hobbit_shirriff', 'hobbit_bounder', 'great_eagle', 'ent', 'beorning', 'ranger_north'] },
  { file: 'roster-free-heroes-exp-v1.png', rows: 2, cols: 3, names: ['theoden', 'faramir', 'haldir', 'galadriel', 'gamling', 'samwise'] },
  { file: 'roster-evil-heroes-exp-v1.png', rows: 2, cols: 3, names: ['mouth_of_sauron', 'gothmog', 'lurtz', 'sharku', 'grima', 'khamul'] },
  { file: 'terrain-natural-v1.png', rows: 2, cols: 3, noRim: true, names: ['terr_rock_outcrop', 'terr_standing_stones', 'terr_pine_copse', 'terr_oak_tree', 'terr_dead_tree', 'terr_hedgerow'] },
  { file: 'terrain-structures-v1.png', rows: 2, cols: 3, noRim: true, names: ['terr_ruined_wall', 'terr_ruined_tower', 'terr_gondor_house', 'terr_rohan_hall', 'terr_orc_camp', 'terr_barrow'] },
  { file: 'roster-legends-good-v1.png', rows: 2, cols: 3, names: ['fingolfin', 'imrahil', 'merry', 'pippin', 'beorn', 'elendil'] },
  { file: 'roster-legends-evil-v1.png', rows: 2, cols: 3, names: ['melkor', 'mumakil', 'smaug', 'ungoliant', 'bolg', 'easterling_warlord'] },
  { file: 'roster-legends-good-v2.png', rows: 2, cols: 3, names: ['radagast', 'thranduil', 'celeborn', 'bilbo', 'king_of_the_dead', 'dead_soldier'] },
  { file: 'roster-legends-evil-v2.png', rows: 2, cols: 3, names: ['olog_hai', 'watcher_in_the_water', 'mirkwood_spider', 'harad_chieftain', 'uruk_captain', 'hill_troll'] },
  { file: 'terrain-objects-v1.png', rows: 2, cols: 3, noRim: true, names: ['terr_rubble', 'terr_broken_pillar', 'terr_barricade', 'terr_crates', 'terr_spike_line', 'terr_brazier'] },
  { file: 'terrain-objects-v2.png', rows: 2, cols: 3, noRim: true, names: ['terr_orc_totem', 'terr_siege_ladder', 'terr_tent', 'terr_cart', 'terr_campfire', 'terr_statue_head'] },
  { file: 'roster-silmarillion-good-v1.png', rows: 2, cols: 3, names: ['feanor', 'luthien', 'beren', 'turin', 'beleg', 'huan'] },
  { file: 'roster-silmarillion-evil-v1.png', rows: 2, cols: 3, names: ['glaurung', 'carcharoth', 'gothmog_balrog', 'draugluin', 'thuringwethil', 'boldog'] },
  { file: 'roster-hobbit-good-v1.png', rows: 2, cols: 3, names: ['thorin', 'tauriel', 'bard', 'dain', 'fili', 'kili'] },
  { file: 'roster-hobbit-evil-v1.png', rows: 2, cols: 3, names: ['azog', 'azog_warg_rider', 'necromancer', 'hunter_orc', 'gundabad_orc', 'goblin_mercenary'] },
  { file: 'roster-exp-good-v1.png', rows: 2, cols: 3, names: ['halbarad', 'beregond', 'elladan', 'elrohir', 'grimbeorn', 'ghan_buri_ghan'] },
  { file: 'roster-exp-evil-v1.png', rows: 2, cols: 3, names: ['suladan', 'corsair_umbra', 'variag_horseman', 'shagrat', 'gorbag', 'warg_alpha'] },
  { file: 'roster-hobbit-company-v1.png', rows: 2, cols: 3, names: ['balin', 'dwalin', 'gloin', 'oin', 'nori', 'ori'] },
  { file: 'roster-hobbit-exp-v1.png', rows: 2, cols: 3, names: ['dori', 'bifur', 'bofur', 'bombur', 'goat_rider', 'gollum'] },
  { file: 'roster-elf-exp-v1.png', rows: 2, cols: 3, names: ['gil_galad', 'cirdan', 'arwen', 'lindir', 'erestor', 'elf_seer'] },
  { file: 'roster-elf-exp-v2.png', rows: 2, cols: 3, names: ['rumil', 'orophin', 'mirkwood_sentinel', 'noldor_warrior', 'silvan_archer', 'elven_lancer'] },
  { file: 'roster-mounted-heroes-v1.png', rows: 2, cols: 3, names: ['imrahil_mounted', 'gandalf_mounted', 'thranduil_mounted', 'aragorn_mounted', 'theoden_mounted', 'blackroot_archer'] },
  { file: 'roster-mordor-monsters-v1.png', rows: 2, cols: 3, names: ['half_troll', 'cave_drake', 'bat_swarm', 'muzgur', 'buhrdur', 'mahud_chieftain'] },
  { file: 'roster-west-heroes-v1.png', rows: 2, cols: 3, names: ['eowyn_mounted', 'forlong', 'erkenbrand', 'damrod', 'mablung', 'duinhir'] },
  { file: 'roster-east-monsters-v1.png', rows: 2, cols: 3, names: ['ugluk', 'mauhur', 'vrasku', 'stone_troll', 'werewolf', 'gulavhar'] },
  { file: 'terrain-objects-v3.png', rows: 2, cols: 3, noRim: true, names: ['terr_catapult', 'terr_trebuchet', 'terr_ballista', 'terr_grond', 'terr_siege_tower', 'terr_bomb'] },
  { file: 'eagle-full.png', rows: 1, cols: 1, pxOnly: true, names: ['great_eagle'] },
  // standalone full-frame regenerations — overwrite the sheet-cut versions below
  // (px-only: no painted counterparts exist, so the sheet cells cover these ids in --painted mode)
  { file: 'single-balrog.png', rows: 1, cols: 1, pxOnly: true, names: ['balrog'] },
  { file: 'single-glorfindel-mounted.png', rows: 1, cols: 1, pxOnly: true, names: ['glorfindel_mounted'] },
  { file: 'single-elf-bow.png', rows: 1, cols: 1, pxOnly: true, names: ['elf_bow'] },
  { file: 'single-hobbit-shirriff.png', rows: 1, cols: 1, pxOnly: true, names: ['hobbit_shirriff'] },
];

function idx(x, y, w) { return (y * w + x) << 2; }
function sat_unused(px) { const mx = Math.max(px[0], px[1], px[2]); const mn = Math.min(px[0], px[1], px[2]); return mx === 0 ? 0 : (mx - mn) / mx; }
function isRim_unused(d, i) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const s = sat([r, g, b]);
  if (s < 0.45) return false;
  const mx = Math.max(r, g, b);
  if (mx < 60) return false;
  // blue rim or red rim
  return (b > r + 25) || (r > g + 30 && r > b + 30);
}
function dist(px, bg) {
  return Math.sqrt((px[0] - bg[0]) ** 2 + (px[1] - bg[1]) ** 2 + (px[2] - bg[2]) ** 2);
}

function medianBg(png, cx0, cy0, cw, ch, W) {
  const samples = [];
  const step = 4;
  for (let x = 0; x < cw; x += step) { for (const y of [0, 1, ch - 2, ch - 1]) samples.push(idx(cx0 + x, cy0 + y, W)); }
  for (let y = 0; y < ch; y += step) { for (const x of [0, 1, cw - 2, cw - 1]) samples.push(idx(cx0 + x, cy0 + y, W)); }
  const rs = [], gs = [], bs = [];
  for (const i of samples) { rs.push(png.data[i]); gs.push(png.data[i + 1]); bs.push(png.data[i + 2]); }
  const med = a => a.sort((p, q) => p - q)[Math.floor(a.length / 2)];
  return [med(rs), med(gs), med(bs)];
}

// Which sides of this cell does the token's largest component reach?
// Used to expand the crop window only into sides the token bleeds through.
function probeEdges(png, cx0, cy0, cw, ch) {
  const d = png.data, W = png.width;
  const bg = medianBg(png, cx0, cy0, cw, ch, W);
  const fg = new Uint8Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const i = idx(cx0 + x, cy0 + y, W);
    if (dist([d[i], d[i + 1], d[i + 2]], bg) > 26) fg[y * cw + x] = 1;
  }
  const lab = new Int32Array(cw * ch).fill(-1), areas = [];
  const stack = [];
  for (let p = 0; p < cw * ch; p++) {
    if (!fg[p] || lab[p] >= 0) continue;
    const c = areas.length; areas.push(0);
    stack.push(p); lab[p] = c;
    while (stack.length) {
      const q = stack.pop(); areas[c]++;
      const qx = q % cw, qy = (q / cw) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
        const np = ny * cw + nx;
        if (fg[np] && lab[np] < 0) { lab[np] = c; stack.push(np); }
      }
    }
  }
  let big = 0;
  for (let c = 1; c < areas.length; c++) if (areas[c] > areas[big]) big = c;
  const t = { t: false, b: false, l: false, r: false };
  for (let p = 0; p < cw * ch; p++) {
    if (lab[p] !== big) continue;
    const x = p % cw, y = (p / cw) | 0;
    if (y < 4) t.t = true;
    if (y >= ch - 4) t.b = true;
    if (x < 4) t.l = true;
    if (x >= cw - 4) t.r = true;
  }
  return t;
}

function cutToken(png, cx0, cy0, cw, ch, name, noRim, clipMul, gate) {
  const d = png.data, W = png.width;
  const bg = medianBg(png, cx0, cy0, cw, ch, W);
  const TH = 26;
  const fg = new Uint8Array(cw * ch);
  const rim = new Uint8Array(cw * ch);
  let rimBlue = 0, rimRed = 0;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const i = idx(cx0 + x, cy0 + y, W);
    const p = y * cw + x;
    const px = [d[i], d[i + 1], d[i + 2]];
    if (dist(px, bg) > TH) fg[p] = 1;
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), s = mx === 0 ? 0 : (mx - mn) / mx;
    if (s >= 0.45 && mx >= 60 && ((b > r + 25) || (r > g + 30 && r > b + 30))) {
      rim[p] = 1;
      if (b > r + 25) rimBlue++; else rimRed++;
    }
  }
  // faction for the clean redrawn edge ring: canonical saturated colour reads
  // at game size where a photographed rim does not. Filled in below from the
  // FITTED rim band — whole-cell votes let gold shields/orange beards
  // (red-channel hues) outvote a blue rim (dwarf_axeshield went red)
  let faction = null;
  // rim-ring candidates: modal colour -> centroid -> dist-histogram peak ->
  // band refit -> partial coverage ok (figure bits can occlude the ring — the
  // downstream disc-edge density test filters interior colour blobs)
  const rimCands = [];
  let rimFit = null;
  // rimPts [x, y, family] — family 0 = blue-ish, 1 = red-ish (gold/brown/skin
  // count as red, so faction votes must come from the fitted ring band only)
  const rimPts = [];
  if (!noRim) {
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (rim[y * cw + x]) {
      const i = idx(cx0 + x, cy0 + y, W);
      rimPts.push([x, y, d[i + 2] > d[i] + 25 ? 0 : 1]);
    }
  }
  // label fg components FIRST — the token is the largest one; its centroid +
  // 90th-percentile distance gives the base circle (rim colours unreliable)
  const lab = new Int32Array(cw * ch).fill(-1);
  let nc = 0;
  const area = [];
  const stack = [];
  for (let p = 0; p < cw * ch; p++) {
    if (!fg[p] || lab[p] >= 0) continue;
    const comp = nc++; area.push(0);
    stack.push(p); lab[p] = comp;
    while (stack.length) {
      const q = stack.pop(); area[comp]++;
      const qx = q % cw, qy = (q / cw) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
        const np = ny * cw + nx;
        if (fg[np] && lab[np] < 0) { lab[np] = comp; stack.push(np); }
      }
    }
  }
  // main = the comp that best fills its bounding disc, among comps >=30% of the
  // largest — a token base+figure is disc-dense, a neighbour canopy/smear is
  // thin even when it covers more pixels (painted hobbit cell: canopy 38k thin
  // vs token 33k dense — raw area would pick the canopy)
  let main = 0, maxArea = 0;
  area.forEach((a, i) => { if (a > maxArea) maxArea = a; });
  {
    let bestScore = -1;
    for (let i = 0; i < nc; i++) {
      if (area[i] < maxArea * 0.3) continue;
      let mx = cw, mX = 0, my = ch, mY = 0;
      for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === i) {
        if (x < mx) mx = x; if (x > mX) mX = x; if (y < my) my = y; if (y > mY) mY = y;
      }
      const span = Math.max(mX - mx + 1, mY - my + 1);
      const score = area[i] / (span * span);
      if (score > bestScore) { bestScore = score; main = i; }
    }
  }
  let cx = cw / 2, cy = ch / 2, cr = Math.min(cw, ch) * 0.40;
  {
    let sx = 0, sy = 0;
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === main) { sx += x; sy += y; }
    cx = sx / area[main]; cy = sy / area[main];
    const ds = [];
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === main) ds.push(Math.hypot(x - cx, y - cy));
    ds.sort((a, b) => a - b);
    cr = ds[Math.floor(ds.length * 0.90)] || cr;
    cr = Math.max(cr, Math.min(cw, ch) * 0.28);
    // tighten to the real base edge: scan outward, the rim is where the comp's
    // radial fill-density collapses (base interior is dense, smears/scraps thin)
    const rMax = Math.min(cw, ch) * 0.55, lo = cr * 0.7;
    let lastDense = lo;
    for (let r = lo; r < rMax; r += 4) {
      let tot = 0, hit = 0;
      for (let a = 0; a < 64; a++) {
        const x = Math.round(cx + r * Math.cos(a * Math.PI / 32)), y = Math.round(cy + r * Math.sin(a * Math.PI / 32));
        if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
        tot++; if (lab[y * cw + x] >= 0) hit++;
      }
      if (tot && hit / tot > 0.30) lastDense = r; else if (r > lastDense + 12) break;
    }
    // recenter on the dense core (protrusions pull the component centroid off
    // the base, leaving a bg crescent on one side), then rescan once
    {
      let sx = 0, sy = 0, n = 0;
      const lim = (lastDense * 0.95) ** 2;
      for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === main) {
        const dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy <= lim) { sx += x; sy += y; n++; }
      }
      if (n > 0) { cx = sx / n; cy = sy / n; }
      lastDense = lo;
      for (let r = lo; r < rMax; r += 4) {
        let tot = 0, hit = 0;
        for (let a = 0; a < 64; a++) {
          const x = Math.round(cx + r * Math.cos(a * Math.PI / 32)), y = Math.round(cy + r * Math.sin(a * Math.PI / 32));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          tot++; if (lab[y * cw + x] >= 0) hit++;
        }
        if (tot && hit / tot > 0.30) lastDense = r; else if (r > lastDense + 12) break;
      }
    }
    cr = Math.max(lastDense * 1.03, Math.min(cw, ch) * 0.25);
    // rim-ring candidates around the density-est centre: per colour family,
    // weight radial bins by ANGULAR COVERAGE — a true rim ring spans most of
    // the circle even when figure bits occlude parts, while interior blobs
    // (gold shield, cape, flag) pile up at few angles.
    for (const fam of [0, 1]) {
      const band = rimPts.filter(([x, y, f]) => {
        if (f !== fam) return false;
        const dd = Math.hypot(x - cx, y - cy);
        return dd >= cr * 0.72 && dd <= cr * 1.45;
      });
      if (band.length < 120) continue;
      const abin = new Map();   // dist bin -> Set of angular sectors
      for (const [x, y] of band) {
        const dd = Math.hypot(x - cx, y - cy);
        const b = Math.round(dd / 6);
        let s = abin.get(b); if (!s) abin.set(b, s = new Set());
        s.add(Math.floor(Math.atan2(y - cy, x - cx) / (Math.PI / 16)) & 31);
      }
      const bins = [...abin.entries()].filter(([, s]) => s.size >= 10)
        .sort((a, b) => b[1].size - a[1].size).slice(0, 3);
      for (const [bb, s] of bins) {
        const rr = bb * 6;
        const ring = band.filter(([x, y]) => { const dd = Math.hypot(x - cx, y - cy); return dd >= rr * 0.88 && dd <= rr * 1.12; });
        if (ring.length < 60) continue;
        let bx = 0, by = 0;
        for (const [x, y] of ring) { bx += x; by += y; }
        const fx = bx / ring.length, fy = by / ring.length;
        const fds = ring.map(([x, y]) => Math.hypot(x - fx, y - fy)).sort((a, c) => a - c);
        const fr = fds[fds.length >> 1];
        const ang = new Set();
        for (const [x, y] of ring) {
          const dd = Math.hypot(x - fx, y - fy);
          if (dd >= fr * 0.85 && dd <= fr * 1.2) ang.add(Math.floor(Math.atan2(y - fy, x - fx) / (Math.PI / 16)) & 31);
        }
        if (process.env.DBG === name) console.log(`  DBGfam fam=${fam} rr=${rr} fr=${fr.toFixed(1)} fxy=${fx.toFixed(0)},${fy.toFixed(0)} ang=${ang.size} cover=${s.size}`);
        if (ang.size >= 12 && fr > Math.min(cw, ch) * 0.28)
          rimCands.push([fx, fy, fr, ang.size, fam]);
      }
    }
    // a confident rim-ring fit wins over the density estimate — a real rim
    // bounds a DENSE disc: inside it the fg stays solid, just outside it drops
    // to bg/scraps. Interior rim-coloured blobs (navy capes, shields) fake a
    // ring but the fg continues dense past them, so they fail the drop test.
    // The radius may sit well inside the density estimate (figure protrusions
    // inflate density past the true base — dwarf_banner's dark annulus).
    // pick the biggest candidate that looks like a real base edge — interior
    // colour blobs are bounded by the disc so the true rim is always the
    // largest plausible ring; require dense inside, dropping outside
    rimCands.sort((a, b) => b[2] - a[2]);
    for (const [fx, fy, fr, ang, fam] of rimCands) {
      if (rimFit) break;
      if (fr < Math.min(cw, ch) * 0.25 || fr < cr * 0.5) continue;
      if (Math.hypot(fx - cx, fy - cy) > cr * 0.35) continue;
      let inH = 0, inT = 0, outH = 0, outT = 0, rimInH = 0, rimInT = 0;
      for (let r = fr * 0.2; r < fr * 0.88; r += 6) {
        for (let a = 0; a < 48; a++) {
          const x = Math.round(fx + r * Math.cos(a * Math.PI / 24)), y = Math.round(fy + r * Math.sin(a * Math.PI / 24));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          inT++; if (fg[y * cw + x]) inH++;
        }
      }
      // the band just inside must be solid disc — a ring bounding a dark gap
      // (an outer arc of cape/flag pixels) fails here
      for (let r = fr * 0.86; r < fr * 0.99; r += 3) {
        for (let a = 0; a < 64; a++) {
          const x = Math.round(fx + r * Math.cos(a * Math.PI / 32)), y = Math.round(fy + r * Math.sin(a * Math.PI / 32));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          rimInT++; if (lab[y * cw + x] >= 0) rimInH++;
        }
      }
      const ann0 = fr * 1.10, ann1 = Math.min(fr * 1.5, Math.min(cw, ch) * 0.56);
      for (let r = ann0; r < ann1; r += 5) {
        for (let a = 0; a < 64; a++) {
          const x = Math.round(fx + r * Math.cos(a * Math.PI / 32)), y = Math.round(fy + r * Math.sin(a * Math.PI / 32));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          outT++; if (lab[y * cw + x] >= 0) outH++;
        }
      }
      const inF = inT ? inH / inT : 0, outF = outT ? outH / outT : 1;
      const rimInF = rimInT ? rimInH / rimInT : 0;
      if (process.env.DBG === name) console.log(`  DBGcand fr=${fr.toFixed(1)} ang=${ang} inF=${inF.toFixed(2)} rimIn=${rimInF.toFixed(2)} outF=${outF.toFixed(2)}`);
      if (inF >= 0.55 && rimInF >= 0.55 && inF - outF >= 0.30) rimFit = [fx, fy, fr, fam];
    }
    if (rimFit) { cx = rimFit[0]; cy = rimFit[1]; cr = rimFit[2]; }
    // faction: roster ground truth first; art inference (fitted ring family /
    // whole-cell votes) only when the unit is not in db-data
    const knownSide = sideByName[name];
    if (knownSide === 'good') faction = [74, 130, 246];
    else if (knownSide === 'evil') faction = [208, 50, 38];
    else if (rimFit) faction = rimFit[3] === 1 ? [208, 50, 38] : [74, 130, 246];
    else if (!noRim && rimBlue + rimRed >= 40)
      faction = rimRed > rimBlue ? [208, 50, 38] : [74, 130, 246];
  }
  // inside-circle = foreground
  const cr2 = (cr * 1.02) ** 2;
  // keep a component only if it has >=50 px inside the circle: weapons/cloaks
  // anchored on the figure pass; scrap chains & neighbour bleed that merely
  // graze the rim don't.
  const inPix = new Int32Array(nc);
  const minD2 = new Float64Array(nc).fill(Infinity);
  const maxD2 = new Float64Array(nc);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const l = lab[y * cw + x]; if (l < 0) continue;
    const dx = x - cx, dy = y - cy;
    const dd = dx * dx + dy * dy;
    if (dd < minD2[l]) minD2[l] = dd;
    if (dd > maxD2[l]) maxD2[l] = dd;
    if (dd <= cr2) inPix[l]++;
  }
  // anchored = solidly inside (>=500px AND >=20% of the comp) OR rooted deep in
  // the figure (<=0.55cr with a real inside footprint). Shadow-smear arcs that
  // only graze the rim edge fail both and drop.
  const deep2 = (cr * 0.55) ** 2;
  const clip2 = (cr * (clipMul || 2.3)) ** 2;
  const STRONG = 55; // outside the circle only strongly-fg pixels survive (kills wispy blends)
  const keep = new Uint8Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const p = y * cw + x, l = lab[p];
    const dx = x - cx, dy = y - cy, dd = dx * dx + dy * dy;
    const anchored = l >= 0 && ((inPix[l] >= 500 && inPix[l] * 5 >= area[l]) || (minD2[l] <= deep2 && inPix[l] >= 150));
    // neighbour-bleed comps: reach far outside the disc yet have only a thin
    // chord inside — a token part anchored on the figure never looks like that
    const bleed = l >= 0 && maxD2[l] > (cr * 1.35) ** 2 && inPix[l] * 5 < area[l];
    if (l >= 0 && bleed) continue;
    if (!(anchored && dd <= clip2)) continue;
    const i = idx(cx0 + x, cy0 + y, W);
    if (dd <= cr2 || dist([d[i], d[i + 1], d[i + 2]], bg) > STRONG) keep[p] = 1;
  }
  // rim-coloured pixels far past the disc edge are torn arcs / neighbour bleed
  // (a neighbouring cell's rim leaking in) — cut them whether or not a rim fit
  // succeeded; figure parts anchor inside so they rarely reach this far out
  {
    const rimCut2 = (cr * 1.06) ** 2;
    for (let p = 0; p < cw * ch; p++) {
      if (!rim[p] || !keep[p]) continue;
      const x = p % cw, y = (p / cw) | 0, dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy > rimCut2) keep[p] = 0;
    }
  }
  // neighbour-bleed comps again for the inside-keep pass
  const bleedComp = new Uint8Array(nc);
  for (let l = 0; l < nc; l++) if (maxD2[l] > (cr * 1.35) ** 2 && inPix[l] * 5 < area[l]) bleedComp[l] = 1;
  // also keep interior of circle even if same color as bg
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const p = y * cw + x;
    const l = lab[p];
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2 && (l < 0 || !bleedComp[l])) keep[p] = 1;
  }
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2) fg[y * cw + x] = 1;
  }
  // cut thin scrap bridges: erode keep by 2, relabel, drop islands <150px,
  // dilate survivors back within the original keep (keeps weapon thickness)
  {
    const er = new Uint8Array(cw * ch);
    for (let y = 2; y < ch - 2; y++) for (let x = 2; x < cw - 2; x++) {
      const p = y * cw + x;
      if (keep[p] && keep[p - 1] && keep[p + 1] && keep[p - cw] && keep[p + cw] &&
          keep[p - 2] && keep[p + 2] && keep[p - 2 * cw] && keep[p + 2 * cw]) er[p] = 1;
    }
    const el = new Int32Array(cw * ch).fill(-1);
    const earea = [];
    for (let p = 0; p < cw * ch; p++) {
      if (!er[p] || el[p] >= 0) continue;
      const c = earea.length; earea.push(0);
      stack.push(p); el[p] = c;
      while (stack.length) {
        const q = stack.pop(); earea[c]++;
        const qx = q % cw, qy = (q / cw) | 0;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = qx + dx, ny = qy + dy;
          if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
          const np = ny * cw + nx;
          if (er[np] && el[np] < 0) { el[np] = c; stack.push(np); }
        }
      }
    }
    const survive = earea.map(a => a >= 100);
    const dil = new Uint8Array(cw * ch);
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const p = y * cw + x, l = el[p];
      if (l < 0 || !survive[l]) continue;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < cw && ny < ch) dil[ny * cw + nx] = 1;
      }
    }
    for (let p = 0; p < cw * ch; p++) keep[p] &= dil[p];
    // erosion can split a smear/arc off the main comp — re-label and apply the
    // anchor rule again so detached islands fail like they should have
    const rl = new Int32Array(cw * ch).fill(-1);
    const rin = [], rmin = [], rarea = [], rsx = [], rsy = [];
    for (let p = 0; p < cw * ch; p++) {
      if (!keep[p] || rl[p] >= 0) continue;
      const c = rarea.length; rarea.push(0); rin.push(0); rmin.push(Infinity); rsx.push(0); rsy.push(0);
      stack.push(p); rl[p] = c;
      while (stack.length) {
        const q = stack.pop(); rarea[c]++;
        const qx = q % cw, qy = (q / cw) | 0;
        rsx[c] += qx; rsy[c] += qy;
        const dd = (qx - cx) ** 2 + (qy - cy) ** 2;
        if (dd < rmin[c]) rmin[c] = dd;
        if (dd <= cr2) rin[c]++;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = qx + dx, ny = qy + dy;
          if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
          const np = ny * cw + nx;
          if (keep[np] && rl[np] < 0) { rl[np] = c; stack.push(np); }
        }
      }
    }
    for (let p = 0; p < cw * ch; p++) {
      const l = rl[p]; if (l < 0) continue;
      if (!((rin[l] >= 500 && rin[l] * 5 >= rarea[l]) || (rmin[l] <= deep2 && rin[l] >= 150))) keep[p] = 0;
      else if (gate) {
        // padded window: drop comps whose centre of mass sits outside the
        // original cell bounds — they're neighbour tokens' bleed, not ours
        const gx = rsx[l] / rarea[l], gy = rsy[l] / rarea[l];
        if (gx < gate.x0 || gx >= gate.x1 || gy < gate.y0 || gy >= gate.y1) keep[p] = 0;
      }
    }
    // far-off scraps: small comps floating fully outside the base ring are
    // leftover smears/splatters, not gear — real protrusions stay connected
    for (let p = 0; p < cw * ch; p++) {
      const l = rl[p]; if (l < 0 || !keep[p]) continue;
      if (rarea[l] < 600 && rmin[l] > cr2 * 1.35) keep[p] = 0;
    }
  }
  // tangential shadow-halo arcs: dark keep-pixels sweeping 24+ angle bins in the
  // protrusion annulus are painted ground-shadow, not gear — weapons stick out
  // radially over few bins and bright pixels pass untouched
  if (!clipMul || clipMul > 1.3) {
    for (let r = cr * 1.05; r < cr * 1.5; r += 3) {
      let cov = 0, dark = 0;
      for (let a = 0; a < 96; a++) {
        const x = Math.round(cx + r * Math.cos(a * Math.PI / 48));
        const y = Math.round(cy + r * Math.sin(a * Math.PI / 48));
        if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
        if (!keep[y * cw + x]) continue;
        cov++;
        const i = idx(cx0 + x, cy0 + y, W);
        if (Math.max(d[i], d[i + 1], d[i + 2]) < 70) dark++;
      }
      if (cov > 24 && dark * 2 >= cov) {
        // a legit wide hem/cloak keeps covering ~14px inward; a shadow band
        // floats in the annulus with a gap toward the base — spared vs erased
        let covIn = 0;
        for (let a = 0; a < 96; a++) {
          const x = Math.round(cx + (r - 14) * Math.cos(a * Math.PI / 48));
          const y = Math.round(cy + (r - 14) * Math.sin(a * Math.PI / 48));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          if (keep[y * cw + x]) covIn++;
        }
        if (covIn >= cov * 0.5) continue;
        for (let a = 0; a < 96; a++) for (let rr = -3; rr <= 3; rr++) {
          const x = Math.round(cx + (r + rr) * Math.cos(a * Math.PI / 48));
          const y = Math.round(cy + (r + rr) * Math.sin(a * Math.PI / 48));
          if (x < 0 || y < 0 || x >= cw || y >= ch) continue;
          const p = y * cw + x, i = idx(cx0 + x, cy0 + y, W);
          if (keep[p] && Math.max(d[i], d[i + 1], d[i + 2]) < 80) keep[p] = 0;
        }
      }
    }
  }
  // figure fringe past the base edge reads as a detached bleed at token size:
  // when it's a thin overhang (<15% of kept px) fade it out — but only the far
  // fringe (1.16-1.30cr): spear/axe/banner tips at ~1.05-1.15cr are legitimate
  // weapon overhang and stay; big structural overflow (wings) keeps its shape
  let trimT0 = Infinity, trimT1 = Infinity;
  if (rimFit) {
    let outN = 0, totN = 0;
    for (let p = 0; p < cw * ch; p++) if (keep[p]) {
      totN++;
      const x = p % cw, y = (p / cw) | 0;
      if ((x - cx) ** 2 + (y - cy) ** 2 > (cr * 1.05) ** 2) outN++;
    }
    if (outN > 0 && outN * 20 < totN * 3) {
      trimT0 = cr * 1.16; trimT1 = cr * 1.30;
      for (let p = 0; p < cw * ch; p++) {
        if (!keep[p]) continue;
        const x = p % cw, y = (p / cw) | 0;
        if ((x - cx) ** 2 + (y - cy) ** 2 > trimT1 * trimT1) keep[p] = 0;
      }
    }
  }
  // feather alpha: erode then 3x3 box blur
  const er = new Uint8Array(cw * ch);
  for (let y = 1; y < ch - 1; y++) for (let x = 1; x < cw - 1; x++) {
    const p = y * cw + x;
    if (keep[p] && keep[p - 1] && keep[p + 1] && keep[p - cw] && keep[p + cw]) er[p] = 1;
  }
  const alpha = new Float32Array(cw * ch);
  // short radial fade at the clip edge: anti-aliases protrusion tips without
  // the wide fuzzy halo a long fade leaves around the silhouette
  const clipR = cr * (clipMul || 2.3);
  const fadeW = Math.max(3, cr * 0.04), fade0 = clipR - fadeW;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    let s = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < cw && ny < ch) s += er[ny * cw + nx];
    }
    let a = s / 9;
    const dd = Math.hypot(x - cx, y - cy);
    if (dd > fade0) a *= Math.max(0, (clipR - dd) / fadeW);
    if (dd > trimT0) a *= Math.max(0, (trimT1 - dd) / (trimT1 - trimT0));
    alpha[y * cw + x] = a;
  }
  // bbox of keep
  let bx0 = cw, bx1 = -1, by0 = ch, by1 = -1;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (keep[y * cw + x]) {
    if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y;
  }
  if (bx1 < 0) { console.log(`  !! ${name}: empty mask`); return; }
  const pad = 6;
  bx0 = Math.max(0, bx0 - pad); by0 = Math.max(0, by0 - pad);
  bx1 = Math.min(cw - 1, bx1 + pad); by1 = Math.min(ch - 1, by1 + pad);
  const ow = bx1 - bx0 + 1, oh = by1 - by0 + 1;
  const out = new PNG({ width: ow, height: oh });
  // game-readability pass: repaint a uniform saturated faction ring over the
  // whole rim zone — the painted rim is thick and partly occluded by figure
  // bits, so reach inward far enough to swallow dark inner borders and
  // rim-hugging figure pixels; lift interior mids/saturation so figures don't
  // read as dark mush
  const ringIn = cr * 0.86, ringOut = cr * 1.03;
  // rim repaint mask: detected rim pixels dilated a few px, plus strongly
  // faction-hued pixels inside the band. Figure parts crossing the ring are
  // NOT in the mask, so the painted ring sits visually UNDER the figure
  const rimBand = new Uint8Array(cw * ch);
  if (faction) {
    const isBlue = faction[2] >= faction[0];
    const RD = 4;
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const p = y * cw + x;
      const dd = Math.hypot(x - cx, y - cy);
      if (dd < ringIn || dd > ringOut) continue;
      if (rim[p]) { rimBand[p] = 1; continue; }
      let near = false;
      for (let dy = -RD; dy <= RD && !near; dy++) for (let dx = -RD; dx <= RD; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < cw && ny >= 0 && ny < ch && rim[ny * cw + nx]) { near = true; break; }
      }
      if (near) { rimBand[p] = 1; continue; }
      const i0 = idx(cx0 + x, cy0 + y, W);
      const R0 = d[i0], G0 = d[i0 + 1], B0 = d[i0 + 2];
      const mn = Math.min(R0, G0, B0), mx = Math.max(R0, G0, B0);
      if ((R0 + G0 + B0) / 3 > 40 && mx - mn > 45 && (isBlue ? B0 > R0 + 30 : R0 > B0 + 30)) rimBand[p] = 1;
    }
  }
  const lift = v => Math.min(255, Math.round(255 * Math.pow(v / 255, 0.80)));
  for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++) {
    const gx = bx0 + x, gy = by0 + y;
    const a = alpha[gy * cw + gx];
    const si = idx(cx0 + gx, cy0 + gy, W);
    const di = idx(x, y, ow);
    let R = d[si], G = d[si + 1], B = d[si + 2];
    const dd = Math.hypot(gx - cx, gy - cy);
    if (faction && a > 0 && rimBand[gy * cw + gx]) {
      R = Math.round(R * 0.15 + faction[0] * 0.85);
      G = Math.round(G * 0.15 + faction[1] * 0.85);
      B = Math.round(B * 0.15 + faction[2] * 0.85);
    } else if (a > 0) {
      R = lift(R); G = lift(G); B = lift(B);
      const l = 0.299 * R + 0.587 * G + 0.114 * B;
      R = Math.max(0, Math.min(255, Math.round(l + (R - l) * 1.28)));
      G = Math.max(0, Math.min(255, Math.round(l + (G - l) * 1.28)));
      B = Math.max(0, Math.min(255, Math.round(l + (B - l) * 1.28)));
    }
    out.data[di] = R; out.data[di + 1] = G; out.data[di + 2] = B;
    // hard-clip the low-alpha fringe: below ~19% opacity it only shows as a
    // grey halo at game size — drop it for a crisp silhouette
    out.data[di + 3] = a * 255 < 48 ? 0 : Math.round(a * 255);
  }
  // detail/visibility pass: unsharp mask the opaque interior (skip the repainted
  // ring band and alpha edge) so weapons/armour read crisp at game size
  {
    const src8 = out.data.slice();
    const AMT = 0.65;
    for (let y = 1; y < oh - 1; y++) for (let x = 1; x < ow - 1; x++) {
      const gx = bx0 + x, gy = by0 + y;
      const dd = Math.hypot(gx - cx, gy - cy);
      if ((dd >= ringIn && rimBand[gy * cw + gx]) || out.data[(y * ow + x) * 4 + 3] < 200) continue;
      for (let chn = 0; chn < 3; chn++) {
        let b9 = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++)
          b9 += src8[((y + dy) * ow + x + dx) * 4 + chn];
        const c = src8[(y * ow + x) * 4 + chn];
        out.data[(y * ow + x) * 4 + chn] = Math.max(0, Math.min(255, Math.round(c + AMT * (c - b9 / 9))));
      }
    }
  }
  fs.writeFileSync(path.join(OUT, name + '.png'), PNG.sync.write(out));
  console.log(`  ${name} -> ${ow}x${oh}`);
}

for (const s of sheets) {
  if (PAINTED && s.pxOnly) continue;
  if (ONLY.length && !ONLY.includes(s.file)) continue;
  const fname = PAINTED ? (s.paintedFile || s.file) : 'px-' + s.file;
  const fp = path.join(SRC, fname);
  if (!fs.existsSync(fp)) { console.log(`MISSING ${fname}`); continue; }
  const png = PNG.sync.read(fs.readFileSync(fp));
  const cw = Math.floor(png.width / s.cols), ch = Math.floor(png.height / s.rows);
  console.log(`${fname} ${png.width}x${png.height} cells ${cw}x${ch}`);
  s.names.forEach((name, i) => {
    const r = Math.floor(i / s.cols), c = i % s.cols;
    // adaptive padding: only widen the window on sides where the token's own
    // largest connected component actually reaches the cell edge — this captures
    // spears/banners/wings bleeding into neighbours without dragging foreign
    // art in through clean sides (e.g. the ent canopy inside hobbit cells)
    const px0 = c * cw, py0 = r * ch, px1 = px0 + cw, py1 = py0 + ch;
    let pt = 0, pb = 0, pl = 0, pr = 0;
    if (!(s.noPad && s.noPad.includes(name))) {
      const touch = probeEdges(png, px0, py0, cw, ch);
      const PAD = 96;
      if (touch.t) pt = PAD; if (touch.b) pb = PAD; if (touch.l) pl = PAD; if (touch.r) pr = PAD;
    }
    const x0 = Math.max(0, px0 - pl), y0 = Math.max(0, py0 - pt);
    const x1 = Math.min(png.width, px1 + pr), y1 = Math.min(png.height, py1 + pb);
    cutToken(png, x0, y0, x1 - x0, y1 - y0, name, !!s.noRim, s.clip,
      { x0: px0 - x0, y0: py0 - y0, x1: px1 - x0, y1: py1 - y0 });
  });
}
console.log('done');
