// Cut token sprites out of the roster sheets -> transparent PNGs.
// Sheets are dark-slate backgrounds; tokens have a saturated blue/red rim ring.
// Per cell: find the rim ring -> token circle; bg = border color median;
// foreground = inside-circle OR (differs from bg AND connected to the circle).
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Administrator/mesbg-assets';
const OUT = path.join(SRC, 'tokens');
fs.mkdirSync(OUT, { recursive: true });

const sheets = [
  { file: 'lotr-tokens-v1.png', rows: 2, cols: 3, names: ['aragorn', 'gandalf', 'warrior_minas_tirith', 'witchking_foot', 'orc_sword', 'cave_troll'] },
  { file: 'glorfindel-topdown-v2.png', rows: 1, cols: 2, names: ['glorfindel_foot', 'glorfindel_mounted'] },
  { file: 'fellbeast-full.png', rows: 1, cols: 1, clip: 2.0, names: ['witchking_fellbeast'] },
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
  { file: 'eagle-full.png', rows: 1, cols: 1, names: ['great_eagle'] },
  // standalone full-frame regenerations — overwrite the sheet-cut versions below
  { file: 'single-balrog.png', rows: 1, cols: 1, names: ['balrog'] },
  { file: 'single-glorfindel-mounted.png', rows: 1, cols: 1, names: ['glorfindel_mounted'] },
  { file: 'single-elf-bow.png', rows: 1, cols: 1, names: ['elf_bow'] },
  { file: 'single-hobbit-shirriff.png', rows: 1, cols: 1, names: ['hobbit_shirriff'] },
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
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const i = idx(cx0 + x, cy0 + y, W);
    const p = y * cw + x;
    const px = [d[i], d[i + 1], d[i + 2]];
    if (dist(px, bg) > TH) fg[p] = 1;
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), s = mx === 0 ? 0 : (mx - mn) / mx;
    if (s >= 0.45 && mx >= 60 && ((b > r + 25) || (r > g + 30 && r > b + 30))) rim[p] = 1;
  }
  // confident rim-ring fit: modal colour -> centroid -> dist-histogram peak ->
  // band refit -> require >=22/32 angular bins covered (clean ring only)
  let rimFit = null;
  if (!noRim) {
    const rimPts = [];
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (rim[y * cw + x]) rimPts.push([x, y]);
    if (rimPts.length > 200) {
      const cbins = new Map();
      for (const [x, y] of rimPts) {
        const i = idx(cx0 + x, cy0 + y, W);
        const key = ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4);
        cbins.set(key, (cbins.get(key) || 0) + 1);
      }
      let modeK = -1, modeN = 0;
      for (const [k, n] of cbins) if (n > modeN) { modeN = n; modeK = k; }
      const mc = [(modeK >> 8) << 4, ((modeK >> 4) & 15) << 4, (modeK & 15) << 4];
      const core = rimPts.filter(([x, y]) => {
        const i = idx(cx0 + x, cy0 + y, W);
        return Math.abs(d[i] - mc[0]) + Math.abs(d[i + 1] - mc[1]) + Math.abs(d[i + 2] - mc[2]) < 90;
      });
      const pts = core.length > 100 ? core : rimPts;
      let sx = 0, sy = 0;
      for (const [x, y] of pts) { sx += x; sy += y; }
      const ex = sx / pts.length, ey = sy / pts.length;
      const dmap = new Map();
      for (const [x, y] of pts) {
        const b = Math.round(Math.hypot(x - ex, y - ey) / 6);
        dmap.set(b, (dmap.get(b) || 0) + 1);
      }
      const minB = Math.round(Math.min(cw, ch) * 0.28 / 6);
      const maxB = Math.max(...dmap.keys());
      // outermost ring wins: scan distance bins downward; interior blobs of the
      // modal colour (robes, capes) stay interior so they can't fake a rim
      for (let b = maxB; b >= minB && !rimFit; b--) {
        if ((dmap.get(b) || 0) < 80) continue;
        const rr = b * 6;
        const band = pts.filter(([x, y]) => { const dd = Math.hypot(x - ex, y - ey); return dd >= rr * 0.85 && dd <= rr * 1.15; });
        if (band.length < 80) continue;
        let bx = 0, by = 0;
        for (const [x, y] of band) { bx += x; by += y; }
        const fx = bx / band.length, fy = by / band.length;
        const fds = band.map(([x, y]) => Math.hypot(x - fx, y - fy)).sort((a, c) => a - c);
        const fr = fds[fds.length >> 1];
        const ang = new Set();
        for (const [x, y] of band) {
          const dd = Math.hypot(x - fx, y - fy);
          if (dd >= fr * 0.85 && dd <= fr * 1.2) ang.add(Math.floor(Math.atan2(y - fy, x - fx) / (Math.PI / 16)) & 31);
        }
        if (ang.size >= 22 && fr > Math.min(cw, ch) * 0.2) rimFit = [fx, fy, fr];
      }
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
  let main = 0; area.forEach((a, i) => { if (a > area[main]) main = i; });
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
    // a confident rim-ring fit wins over the density estimate — but only when
    // it broadly agrees; a wild fit (fake ring in the art) falls back
    if (rimFit && Math.hypot(rimFit[0] - cx, rimFit[1] - cy) <= cr * 0.35 &&
        rimFit[2] >= cr * 0.7 && rimFit[2] <= cr * 1.3) {
      cx = rimFit[0]; cy = rimFit[1]; cr = rimFit[2];
    } else rimFit = null;
  }
  // inside-circle = foreground
  const cr2 = (cr * 1.02) ** 2;
  // keep a component only if it has >=50 px inside the circle: weapons/cloaks
  // anchored on the figure pass; scrap chains & neighbour bleed that merely
  // graze the rim don't.
  const inPix = new Int32Array(nc);
  const minD2 = new Float64Array(nc).fill(Infinity);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const l = lab[y * cw + x]; if (l < 0) continue;
    const dx = x - cx, dy = y - cy;
    const dd = dx * dx + dy * dy;
    if (dd < minD2[l]) minD2[l] = dd;
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
    if (!(anchored && dd <= clip2)) continue;
    const i = idx(cx0 + x, cy0 + y, W);
    if (dd <= cr2 || dist([d[i], d[i + 1], d[i + 2]], bg) > STRONG) keep[p] = 1;
  }
  // a fitted rim ring ends AT the rim: rim-coloured pixels beyond it are torn
  // arcs / neighbour bleed — cut them (figure colours pass unaffected)
  if (rimFit) {
    const rimCut2 = (cr * 1.10) ** 2;
    for (let p = 0; p < cw * ch; p++) {
      if (!rim[p] || !keep[p]) continue;
      const x = p % cw, y = (p / cw) | 0, dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy > rimCut2) keep[p] = 0;
    }
  }
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2) fg[y * cw + x] = 1;
  }
  // also keep interior of circle even if same color as bg
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2) keep[y * cw + x] = 1;
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
  // feather alpha: erode then 3x3 box blur
  const er = new Uint8Array(cw * ch);
  for (let y = 1; y < ch - 1; y++) for (let x = 1; x < cw - 1; x++) {
    const p = y * cw + x;
    if (keep[p] && keep[p - 1] && keep[p + 1] && keep[p - cw] && keep[p + cw]) er[p] = 1;
  }
  const alpha = new Float32Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    let s = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < cw && ny < ch) s += er[ny * cw + nx];
    }
    alpha[y * cw + x] = s / 9;
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
  for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++) {
    const si = idx(cx0 + bx0 + x, cy0 + by0 + y, W);
    const di = idx(x, y, ow);
    out.data[di] = d[si]; out.data[di + 1] = d[si + 1]; out.data[di + 2] = d[si + 2];
    out.data[di + 3] = Math.round(alpha[(by0 + y) * cw + (bx0 + x)] * 255);
  }
  fs.writeFileSync(path.join(OUT, name + '.png'), PNG.sync.write(out));
  console.log(`  ${name} -> ${ow}x${oh}`);
}

for (const s of sheets) {
  const fp = path.join(SRC, 'px-' + s.file);
  if (!fs.existsSync(fp)) { console.log(`MISSING px-${s.file}`); continue; }
  const png = PNG.sync.read(fs.readFileSync(fp));
  const cw = Math.floor(png.width / s.cols), ch = Math.floor(png.height / s.rows);
  console.log(`px-${s.file} ${png.width}x${png.height} cells ${cw}x${ch}`);
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
