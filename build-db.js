// Build units.csv (Excel, UTF-8 BOM), units.json (engine), gallery.html (visual check).
const fs = require('fs');
const path = require('path');
const sheets = require('./db-data.js');
const SRC = __dirname;
const TOKENS = path.join(SRC, 'tokens');
const HERO_STATS = require('./mesbg-stats.js');

const rows = [];
for (const s of sheets) {
  for (const u of s.units) {
    const [id, ko, en, ov = {}] = u;
    const row = {
      id,
      name_ko: ko,
      name_en: en,
      side: ov.side ?? s.side ?? '',
      faction: ov.faction ?? s.faction ?? '',
      role: ov.role ?? s.role ?? '',
      weapon: ov.weapon ?? s.weapon ?? '',
      base: ov.base ?? s.base ?? '',
      sheet: s.sheet,
      file: `tokens/${id}.png`,
    };
    if (ov.traits) row.traits = ov.traits;
    if (ov.artScale) row.artScale = ov.artScale;
    if (HERO_STATS[id]) { row.stats = HERO_STATS[id]; if (HERO_STATS[id].rules) row.rules = HERO_STATS[id].rules; }
    rows.push(row);
  }
}

// MESBG base sizes: foot 25mm / cavalry 40mm / monster 50mm / big monster 60mm / huge 100mm / titan 120mm
const TITAN = new Set(['smaug','ancalagon','glaurung']);
const HUGE = new Set(['mumakil','watcher_in_the_water','scatha','dragon_lord','durins_bane','durin_bane','gothmog_balrog','ancient_dragon','balrog']);
const BIG = new Set(['ent','fellbeast','witchking_fellbeast','nazgul_fellbeast','great_eagle','troll_cave','troll_mountain','troll_snow','troll_war','troll_drummer','moria_troll','olf_haunt','buhrdur','dwerghammer','mewlip','boat_troll']);
const baseMM = r => {
  if (r.role === 'terrain') return '';
  if (TITAN.has(r.id)) return '120mm';
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

// sanity: every row has a PNG; every PNG has a row
const pngs = new Set(fs.readdirSync(TOKENS).filter(f => f.endsWith('.png')));
const ids = new Set(rows.map(r => r.id));
const missingFile = rows.filter(r => !pngs.has(r.id + '.png')).map(r => r.id);
const missingRow = [...pngs].filter(f => !ids.has(f.replace('.png', ''))).map(f => f.replace('.png', ''));
if (missingFile.length) console.log('DB rows without PNG:', missingFile.join(', '));
if (missingRow.length) console.log('PNGs without DB row:', missingRow.join(', '));

const COLS = ['id', 'name_ko', 'name_en', 'side', 'faction', 'role', 'weapon', 'base', 'base_mm', 'sheet', 'file'];
const esc = v => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
const csv = '﻿' + COLS.join(',') + '\n' + rows.map(r => COLS.map(c => esc(String(r[c]))).join(',')).join('\n') + '\n';
fs.writeFileSync(path.join(SRC, 'units.csv'), csv);

fs.writeFileSync(path.join(SRC, 'units.json'), JSON.stringify({ version: 1, count: rows.length, units: rows }, null, 2));

// dice manifest
const factions = ['minastirith', 'mordor', 'isengard', 'rohan', 'elf', 'dwarf', 'haradrim'];
const dice = factions.map(f => ({ faction: f, faces: { 1: `dice-faces/${f}-1.png`, 2: `dice-faces/${f}-2.png`, 3: `dice-faces/${f}-3.png`, 4: `dice-faces/${f}-4.png`, 5: `dice-faces/${f}-5.png`, 6: `dice-faces/${f}-emblem.png` } }));
fs.writeFileSync(path.join(SRC, 'dice.json'), JSON.stringify({ dice }, null, 2));

// gallery.html — 인게임 표시 크기 그대로 보는 시각 검증 도구.
// 사이즈는 게임 엔진과 동일 알고리즘: E=baseMm*3.04*artScale 을 피겨 코어(알파 80%)에 맞춤.
const { PNG } = require('pngjs');
// 게임이 실제로 쓰는 유닛 메타: index.html CAMPAIGN_META + src/game.js EXTRA 배열.
// registerUnit 순서(E1→E2→E3)가 뒤에 온 항목을 덮어쓰므로 같은 순서로 병합.
const grabArr = (txt, name) => { const m = txt.match(new RegExp(name + '=(\\[[\\s\\S]*?\\]);')); return m ? eval(m[1]) : []; };
const gameMeta = new Map();
try {
  const htmlSrc = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
  const gameSrc = fs.readFileSync(path.join(SRC, 'src', 'game.js'), 'utf8');
  for (const m of grabArr(htmlSrc, 'CAMPAIGN_META')) gameMeta.set(m.id, m);
  for (const n of ['MESBG_EXTRA_UNITS', 'MESBG_EXTRA_UNITS2', 'MESBG_EXTRA_UNITS3'])
    for (const d of grabArr(gameSrc, n)) if (d && d.meta) gameMeta.set(d.id, d.meta);
} catch (e) { console.log('game meta parse warn:', e.message); }
// 게임엔 등록됐지만 DB 행이 없는 유닛도 갤러리에 표시 (실측 대상이므로)
{
  const known = new Set(rows.map(r => r.id));
  for (const [id, m] of gameMeta) {
    if (known.has(id) || !m.file || m.side === 'terrain') continue;
    rows.push({ id, name_ko: m.name_ko || id, name_en: m.name_en || '', side: m.side || '', faction: m.faction || '', role: m.role || '', weapon: m.weapon || '', base: m.base || '', sheet: '(game-only)', file: m.file, base_mm: (m.baseMm || 25) + 'mm', game_only: true });
    ids.add(id);
  }
}
// 엔진 __figCenterPx 재현: 96px 다운스케일 → 알파>16 컬럼/로우 합 → 80% 질량 코어 비율
const figCache = {};
const figInfo = id => {
  if (figCache[id]) return figCache[id];
  const f = path.join(TOKENS, id + '.png');
  try {
    const png = PNG.sync.read(fs.readFileSync(f));
    const W = 96, H = Math.max(1, Math.round(96 * png.height / png.width));
    const sx = png.width / W, sy = png.height / H;
    const col = new Float64Array(W), row = new Float64Array(H);
    let x0 = W, x1 = -1, y0 = H, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      // 박스 평균 알파 (캔버스 다운스케일 근사)
      let a = 0, n = 0;
      const px0 = Math.floor(x * sx), px1 = Math.min(png.width, Math.ceil((x + 1) * sx));
      const py0 = Math.floor(y * sy), py1 = Math.min(png.height, Math.ceil((y + 1) * sy));
      for (let py = py0; py < py1; py++) for (let px = px0; px < px1; px++) { a += png.data[(py * png.width + px) * 4 + 3]; n++; }
      a = n ? a / n : 0;
      if (a > 16) { col[x] += a; row[y] += a; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 < 0) return figCache[id] = { ratio: png.width / png.height, fx: 1, fy: 1 };
    const core = (arr, lo, hi) => {
      let s = 0, cx = 0; for (let i = lo; i <= hi; i++) { s += arr[i]; cx += i * arr[i]; }
      cx = s ? cx / s : (lo + hi) / 2;
      let L = Math.max(lo, Math.floor(cx)), R = Math.min(hi, L), acc = arr[L] || 0; const goal = s * .8;
      while (acc < goal && (L > lo || R < hi)) { const a2 = L > lo ? arr[L - 1] : -1, b2 = R < hi ? arr[R + 1] : -1; if (a2 >= b2) { L--; acc += Math.max(0, a2); } else { R++; acc += Math.max(0, b2); } }
      return (R - L + 1) / (hi - lo + 1);
    };
    return figCache[id] = { ratio: png.width / png.height, fx: core(col, x0, x1), fy: core(row, y0, y1) };
  } catch (e) { return figCache[id] = { ratio: 0.7, fx: 1, fy: 1, missing: true }; }
};
// 엔진 표시 크기: E=radius*2*artScale, 피겨 폭/높이 E에 맞춤, E*1.95/1.3 클램프 (game.js Ve.sync)
const dispWH = r => {
  if (r.role === 'terrain') return [140, 76, 0];
  const gm = gameMeta.get(r.id) || {};
  const mm = gm.baseMm || parseInt(r.base_mm) || 25;
  const art = gm.artScale ?? r.artScale ?? 1;
  const E = mm * 3.04 * art;
  const { ratio, fx, fy } = figInfo(r.id);
  let dw, dh;
  if (ratio >= 1) { dw = Math.min(E / Math.max(.35, fx || 1), E * 1.95); dh = dw / ratio; }
  else { dh = Math.min(E / Math.max(.35, fy || 1), E * 1.95); dw = dh * ratio; }
  const mx = E * 1.3, lg = Math.max(dw, dh);
  if (lg > mx) { const k = mx / lg; dw *= k; dh *= k; }
  return [Math.round(dw), Math.round(dh), mm * 3.04]; // [표시폭, 표시높이, 베이스 직경]
};
const ROLE_KO = { hero: '영웅', infantry: '보병', cavalry: '기병', monster: '괴물', bigmonster: '대형괴물', support: '지원/기수', civil: '민간인', beast: '짐승', terrain: '지형지물' };
const ROLE_ORDER = ['hero', 'infantry', 'cavalry', 'monster', 'bigmonster', 'support', 'civil', 'beast', 'terrain'];
const grp = r => r.role === 'monster' ? (r.base === 'XXL' ? 'bigmonster' : 'monster')
  : r.role === 'beast' ? 'monster'
  : r.role === 'soldier' ? 'infantry'
  : (r.role === 'cavalry' || (r.base === 'XL' && r.role !== 'monster')) ? 'cavalry'
  : r.role;
// 종족(팩션) 분류 — 인게임과 동일한 faction 값
const FACTION_KO = { gondor: '곤도르', rohan: '로한', elf: '엘프', rivendell: '리븐델', lothlorien: '로스로리엔', dwarf: '난쟁이', erebor: '에레보르', dale: '데일', men: '인간', arnor: '아르노르', numenor: '누메노르', valinor: '발리노르', shire: '샤이어(호빗)', bree: '브리', beorning: '베오르닝', eagle: '대독수리', ent: '엔트', fangorn: '팡고른', dead: '망자', maiar: '마이아', doriath: '도리아스', mordor: '모르도르', isengard: '아이센가드', moria: '모리아', gundabad: '군다바드', angmar: '앙그마르', angband: '앙그반드', dol_guldur: '돌 굴두르', harad: '하라드', easterling: '동부인', rhun: '룬', umbar: '움바르', dunland: '던랜드', dragon: '용', other: '기타', terrain: '지형' };
const FACTION_ORDER_GOOD = ['gondor', 'rohan', 'elf', 'rivendell', 'lothlorien', 'dwarf', 'erebor', 'dale', 'men', 'arnor', 'numenor', 'valinor', 'shire', 'bree', 'beorning', 'eagle', 'ent', 'fangorn', 'dead', 'maiar', 'doriath', 'other'];
const FACTION_ORDER_EVIL = ['mordor', 'isengard', 'moria', 'gundabad', 'angmar', 'angband', 'dol_guldur', 'harad', 'easterling', 'rhun', 'umbar', 'dunland', 'erebor', 'numenor', 'dragon', 'bree', 'other'];
const groups = {};
for (const r of rows) { (groups[r.side] ??= []).push(r); }
const facOrder = k => k === 'good' ? FACTION_ORDER_GOOD : FACTION_ORDER_EVIL;
const facOf = r => { const gm = gameMeta.get(r.id) || {}; return gm.faction || r.faction || 'other'; };
// 팩션 내 유닛도 엔진 메타 기준으로 병합해 이름/역할 표시
const TABS = [['good', '자유민족'], ['evil', '악의 세력'], ['terrain', '지형지물']].filter(([k]) => groups[k]);
const card = (r, fh) => {
  const [w, h, baseD] = dispWH(r);
  const gm = gameMeta.get(r.id) || {};
  const art = gm.artScale ?? r.artScale;
  const st = r.stats ? '<div class="meta" style="color:#d8c98a">F' + r.stats.f + ' S' + r.stats.s + ' D' + r.stats.d + ' A' + r.stats.a + ' W' + r.stats.w + ' C' + r.stats.c + ' · M' + r.stats.might + ' W' + r.stats.will + ' F' + r.stats.fate + '</div>' : '';
  const rl = (r.rules && r.rules.length) ? '<div class="meta" style="color:#9a8ac0">' + r.rules.join(' · ') + '</div>' : '';
  const baseRing = baseD ? `<i class="basering" style="width:${baseD}px;height:${baseD}px"></i>` : '';
  const szLine = r.role === 'terrain' ? '' : `<div class="meta" style="color:#8fb3d9">${gm.baseMm || parseInt(r.base_mm) || '?'}mm${art && art !== 1 ? ' · 스케일 ' + art : ''} · 표시 ${w}×${h}px</div>`;
  return `<div class="card ucard" style="height:${fh + 132}px"><div class="fig" style="height:${fh}px">${baseRing}<img src="tokens/${r.id}.png" loading="lazy" style="width:${w}px;height:${h}px"></div><div class="id">${r.id}</div><div class="ko">${r.name_ko}</div><div class="meta">${ROLE_KO[r.role] || r.role} · ${r.weapon}${(r.traits && r.traits.length) ? " · " + r.traits.join("·") : ""}</div>${szLine}${st}${rl}</div>`;
};
// 팩션 그룹 → 역할 소그룹 → 카드. fig 높이는 팩션 최대치로 통일.
const factionGrid = list => {
  const facs = {};
  for (const r of list) { (facs[facOf(r)] ??= []).push(r); }
  const order = facOrder(list[0] && list[0].side === 'evil' ? 'evil' : 'good');
  const keys = [...order.filter(f => facs[f]), ...Object.keys(facs).filter(f => !order.includes(f)).sort()];
  return keys.map(f => {
    const us = facs[f];
    const fh = Math.min(340, Math.max(...us.map(r => dispWH(r)[1]))) + 10;
    return `<h2>${FACTION_KO[f] || f} — ${us.length}</h2>` +
      ROLE_ORDER.filter(ro => us.some(r => grp(r) === ro)).map(ro =>
        `<h3>${ROLE_KO[ro] || ro} — ${us.filter(r => grp(r) === ro).length}</h3><div class="grid">${us.filter(r => grp(r) === ro).map(r => card(r, fh)).join('')}</div>`).join('');
  }).join('');
};
const TIER_ORDER = ['normal', 'rare', 'magic', 'unique', 'status', 'resource', 'tower', 'node', 'ability', 'projectile', 'trap', 'tile', 'ui'];
const TIER_KO = { normal: '노말', rare: '레어', magic: '매직', unique: '유니크', status: '상태 효과', resource: '자원', tower: '방어탑', node: '로그라이크 노드', ability: '능력/스킬', projectile: '발사체', trap: '함정', tile: '지형 타일', ui: 'UI' };
const TIER_COLOR = { normal: '#9aa0a6', rare: '#5b9bd5', magic: '#a06bd8', unique: '#e0b040', status: '#e07070', resource: '#c9a04a', tower: '#7fae6e', node: '#b088d0', ability: '#e09b50', projectile: '#c0c8d8', trap: '#a07858', tile: '#88b060', ui: '#6fd0c8' };
let relicHtml = '';
let relicCount = 0;
try {
  const man = JSON.parse(fs.readFileSync(path.join(SRC, 'icons', 'manifest.json')));
  relicCount = man.relics.length;
  relicHtml = TIER_ORDER.filter(t => man.relics.some(r => r.tier === t)).map(t =>
    `<h3 style="color:${TIER_COLOR[t]}">${TIER_KO[t]} — ${man.relics.filter(r => r.tier === t).length}</h3><div class="grid">` +
    man.relics.filter(r => r.tier === t).map(r =>
      `<div class="card"><div class="fig" style="height:76px"><img src="${r.file}" loading="lazy" style="max-height:76px;max-width:160px;height:auto;width:auto"></div><div class="id">${r.id}</div><div class="ko">${r.name_ko}</div><div class="meta">${r.name_en}</div></div>`).join('') + `</div>`).join('');
  TABS.push(['relics', '유물']);
} catch (e) { /* no manifest yet */ }
let mapsHtml = '';
let mapsCount = 0;
try {
  const bgs = fs.readdirSync(path.join(SRC, 'backgrounds')).filter(f => f.endsWith('.png')).sort();
  mapsCount = bgs.length;
  mapsHtml = bgs.map(f => {
    const id = f.replace(/\.png$/, '');
    return '<div class="card" style="width:330px"><div class="fig" style="height:210px;align-items:center"><img src="backgrounds/' + f + '" loading="lazy" style="max-height:200px;max-width:320px;height:auto;width:auto"></div><div class="id">' + id + '</div></div>';
  }).join('');
  TABS.push(['maps', '전장 맵']);
} catch (e) { /* no backgrounds dir */ }
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>에셋 매칭 갤러리</title><style>
:root{--bg:#0f120c;--panel:#1a1d14;--panel2:#232718;--line:#5d5233;--gold:#c9a959;--gold2:#efe0ae;--txt:#ece4cd;--dim:#a89d7f}
*{box-sizing:border-box}
body{background:radial-gradient(ellipse at 50% -5%,#26301b 0%,#141a10 45%,#0f120c 100%);color:var(--txt);font-family:'Malgun Gothic',Georgia,serif;margin:0;padding:24px}
h1{font-family:Georgia,serif;font-size:20px;color:var(--gold2);letter-spacing:2px;font-variant:small-caps;text-shadow:0 0 12px rgba(201,169,89,.3)}
h2{font-family:Georgia,serif;font-size:15px;margin:28px 0 10px;color:var(--gold);border-bottom:1px solid var(--line);padding-bottom:6px;letter-spacing:1px}
h3{font-family:Georgia,serif;font-size:13px;margin:18px 0 8px;color:var(--gold2);letter-spacing:1px}
.tabs{display:flex;gap:8px;margin:14px 0 4px;position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:10;flex-wrap:wrap}
.tabs button{background:var(--panel);border:1px solid var(--line);color:var(--dim);padding:8px 18px;border-radius:6px;cursor:pointer;font-size:13px}
.tabs button.on{background:var(--gold);color:#1a150f;border-color:var(--gold);font-weight:700}
.grid{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end}
.card{background:linear-gradient(170deg,#20241a,#181b12);border:1px solid var(--line);border-radius:8px;padding:12px;text-align:center;transition:border-color .15s;position:relative;flex:none}
.card:hover{border-color:var(--gold);box-shadow:0 6px 16px rgba(0,0,0,.5)}
.card::before{content:'';position:absolute;inset:3px;border:1px solid rgba(201,169,89,.15);border-radius:5px;pointer-events:none}
.fig{display:flex;align-items:flex-end;justify-content:center;position:relative;width:100%}
.fig .basering{position:absolute;bottom:0;left:50%;transform:translateX(-50%);border:1.5px solid rgba(140,190,230,.45);border-radius:50%;pointer-events:none}
.ucard{width:205px;overflow:hidden}
@media (max-width:760px){
.fig{zoom:1.9}
.ucard{width:auto;flex:1 1 46%}
}
.card img{image-rendering:auto;object-fit:contain;display:block;position:relative;filter:drop-shadow(0 3px 4px rgba(0,0,0,.6))}
.id{font-size:11px;color:#7fa3cc;word-break:break-all;margin-top:8px;max-width:170px}
.ko{font-size:13px;font-weight:600;margin-top:2px;color:var(--txt)}
.meta{font-size:10px;color:var(--dim);margin-top:3px}
</style></head><body>
<h1>MESBG 에셋 갤러리 — 인게임 표시 크기 · ${rows.length}종 <button id="vsw" onclick="let p=document.querySelectorAll('img'),pt=document.body.dataset.pt!=='1';document.body.dataset.pt=pt?'1':'0';p.forEach(i=>i.src=i.src.replace(pt?'tokens/':'tokens_painted/',pt?'tokens_painted/':'tokens/'));this.textContent=pt?'보는중: 도색 (클릭→픽셀)':'보는중: 픽셀 (클릭→도색)';" style="font-size:12px;padding:4px 10px;cursor:pointer">보는중: 픽셀 (클릭→도색)</button></h1>
<div class="tabs">${TABS.map(([k, n], i) => `<button data-t="${k}" class="${i ? '' : 'on'}" onclick="document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('on'));this.classList.add('on');document.querySelectorAll('.tabpane').forEach(p=>p.style.display=p.dataset.t===this.dataset.t?'block':'none')">${n} — ${k === 'relics' ? relicCount : (k === 'maps' ? mapsCount : groups[k].length)}</button>`).join('')}</div>
${TABS.map(([k, n], i) => `<div class="tabpane" data-t="${k}" style="display:${i ? 'none' : 'block'}"><h2>${n} — ${k === 'relics' ? relicCount : (k === 'maps' ? mapsCount : groups[k].length)}</h2>${k === 'relics' ? relicHtml : (k === 'maps' ? mapsHtml : factionGrid(groups[k]))}</div>`).join('')}
</body></html>`;
fs.writeFileSync(path.join(SRC, 'gallery.html'), html);

console.log(`OK: ${rows.length} rows -> units.csv / units.json / gallery.html`);
