// ---- Tactical upgrade overlay (ported from feat/last-war-band-tactical-upgrade) ----
const metaFor = id => q.meta.get(id);
const __lwbRoleNames = { infantry: '전열', support: '창 지원', archer: '사격', cavalry: '기병 돌격', monster: '괴수', hero: '영웅 지휘' };
const supportFor = (group, all = q.alive()) => window.LWBTactics.supportLinks(group, all, metaFor, (a, b) => _t(a, b, q.terrain) === 'clear');
supportAlly = function (u) {
    const all = q.alive();
    for (const group of Oe(all)) {
        const l = supportFor(group, all).find(l => l.unit.uid === u.uid);
        if (l) return l.via;
    }
    return null;
};
for (const def of (window.LWB_TERRAIN_DEFS || []))
    if (!q.meta.has(def.id)) q.meta.set(def.id, def);
const __lwbBR = P.beginRound;
P.beginRound = function () { for (const u of this.units) u.supportSpent = false; return __lwbBR.call(this); };
const __lwbAC = P.applyCombat;
P.applyCombat = function (r) {
    for (const id of r.supports || []) { const u = this.unit(id); if (u) u.supportSpent = true; }
    for (const id of r.knockedDownUnits || []) { const u = this.unit(id); if (u) u.prone = true; }
    return __lwbAC.call(this, r);
};
const __lwbHC = P.heroic;
P.heroic = function (uid, key) {
    const u = this.unit(uid);
    if (!u || !['move', 'shoot', 'fight'].includes(this.phase) || (this.mode === 'ai' && this.side === 'evil' && this.phase !== 'fight')) return false;
    if (this.phase === 'fight' && !this.fightQueue.some(g => g.includes(uid))) return false;
    return __lwbHC.call(this, uid, key);
};
const __lwbDR = P.drain;
P.drain = function () {
    const e = __lwbDR.call(this);
    return e.some(e => e.result) ? [...e.filter(e => e.type !== 'UnitKilled'), ...e.filter(e => e.type === 'UnitKilled')] : e;
};
be = function (b, u) {
    if (b.engaged(u) || b.remaining(u) < 12) return null;
    const all = b.alive(), foes = b.alive(Ht(u.side)); if (!foes.length) return null;
    const role = window.LWBTactics.role(u, metaFor), budget = b.remaining(u);
    if (role === 'support' && supportFor(Oe(all).flat(), all).some(l => l.unit.uid === u.uid)) return null;
    const score = p => window.LWBTactics.positionScore(u, p, all, metaFor, b.mission === 'defense' ? Mt.objective : null, (a, v) => _t(a, v, b.terrain)), options = [], reach = role === 'archer' && !u.moved ? Math.min(budget, u.stats.move / 2) : budget;
    for (const amount of [reach, reach * .65, reach * .32])
        for (let i = 0; i < 16; i++) {
            const a = i * Math.PI / 8, p = { x: u.x + Math.cos(a) * amount, y: u.y + Math.sin(a) * amount };
            if (Et(u, p, all, b.terrain)) options.push({ p, score: score(p) });
        }
    if (role === 'support')
        for (const f of all.filter(v => v.side === u.side && v.uid !== u.uid && !v.traits.includes('mounted') && !v.traits.includes('monster'))) {
            const e = foes.slice().sort((a, c) => ht(f, a) - ht(f, c))[0], d = ht(f, e) || 1, p = { x: f.x + (f.x - e.x) / d * (u.radius + f.radius + 1), y: f.y + (f.y - e.y) / d * (u.radius + f.radius + 1) };
            if (Et(u, p, all, b.terrain)) options.push({ p, score: score(p) });
        }
    const current = score(u);
    for (const c of options.sort((a, b) => a.score - b.score).slice(0, 8)) {
        if (c.score >= current - 8) continue;
        const p = ve(u, c.p, all, b.terrain, budget, { snap: false });
        if (p && p.distance >= 12) return p.to;
    }
    return null;
};
He = function (b) {
    const order = { infantry: 0, monster: 1, hero: 2, cavalry: 3, support: 4, archer: 5 },
        u = b.eligible().sort((a, c) => order[window.LWBTactics.role(a, id => b.meta.get(id))] - order[window.LWBTactics.role(c, id => b.meta.get(id))])[0];
    if (!u) { b.advance(); return; }
    if (CX.skills[u.id] && !b.skillReason(u) && !b.engaged(u)) b.skill(u.uid);
    if (!b.canAct(u)) return;
    const role = window.LWBTactics.role(u, id => b.meta.get(id));
    if (b.phase === 'move') {
        const foes = b.alive(Ht(u.side));
        const near = foes.filter(v => ht(u, v) <= u.stats.move + u.radius + v.radius + 20);
        const canShoot = role === 'archer' && foes.some(v => ht(u, v) <= (u.stats.shootRange || 0) && _t(u, v, b.terrain) === 'clear');
        if (role !== 'support' && !b.engaged(u) && (role !== 'archer' || !canShoot || near.length)) {
            const value = v => ht(u, v) + (role === 'cavalry' ? (v.traits.includes('mounted') ? 130 : v.stats.shootRange ? -100 : 0) : 0) + (role === 'hero' ? b.alive(u.side).filter(f => Vt(f, v)).length * -90 : 0);
            for (const foe of foes.sort((a, c) => value(a) - value(c)).slice(0, 5))
                if (b.charge(u.uid, foe.uid)) return;
        }
        const dest = be(b, u);
        let done = !!dest && b.move(u.uid, dest);
        if (!done && role === 'archer' && foes.length) {
            const f = foes.slice().sort((a, c) => ht(u, a) - ht(u, c))[0], d = ht(u, f);
            if (d > (u.stats.shootRange || 0) * 0.7) {
                const step = Math.min(u.stats.move / 2, d - u.stats.shootRange * 0.7);
                done = b.move(u.uid, { x: u.x + (f.x - u.x) / d * step, y: u.y + (f.y - u.y) / d * step });
            }
        }
        if (!done) b.wait(u.uid);
    } else if (b.phase === 'shoot') {
        const target = b.validTargets(u).sort((a, c) => a.currentWounds - c.currentWounds || ht(u, a) - ht(u, c))[0];
        if (!target || !b.shoot(u.uid, target.uid)) b.wait(u.uid);
    }
};
const __lwbSI = P.stageInfo;
P.stageInfo = function (n) {
    const info = __lwbSI.call(this, n), counts = {};
    for (const id of info.ids || []) {
        const p = zt[id]; if (!p) continue;
        const r = window.LWBTactics.role({ id, traits: p.traits, stats: p }, metaFor);
        counts[r] = (counts[r] || 0) + 1;
    }
    info.scouting = Object.entries(counts).map(([r, n]) => __lwbRoleNames[r] + ' ' + n).join(' · ');
    return info;
};
const __lwbPS = P.prepareStage;
P.prepareStage = function () {
    __lwbPS.call(this);
    const points = [[[650, 840], [1680, 850]], [[790, 840], [1540, 960]], [[480, 950], [1780, 780]]][(this.wave + this.mapIndex) % 3];
    ['terr_rock_outcrop', 'terr_ruined_wall'].forEach((id, i) => {
        const t = this.terrain.find(t => t.id === id);
        if (t) { t.x = points[i][0]; t.y = points[i][1]; }
    });
    const tid = this.mapIndex % 2 ? 'terr_crates' : 'terr_fallen_log';
    this.terrain.push({ id: tid, x: 1165, y: 850, w: 150, h: 105, kind: 'cover', active: true });
};
const __lwbSV = P.save;
P.save = function () {
    __lwbSV.call(this);
    if (!['preparation', 'reward'].includes(this.phase)) return;
    try {
        const raw = localStorage.getItem('mesbg-endless-save'); if (!raw) return;
        const s = JSON.parse(raw);
        s.tactical = { version: 1, mapIndex: this.mapIndex, mission: this.mission, current: this.current, next: this.next, terrain: this.terrain };
        localStorage.setItem('mesbg-endless-save', JSON.stringify(s));
    } catch { this.emit('SaveFailed', '저장 공간을 확인하세요. 현재 원정을 저장하지 못했습니다.'); }
};
const __lwbRS = P.resume;
P.resume = function () {
    if (!__lwbRS.call(this)) return false;
    const t = JSON.parse(localStorage.getItem('mesbg-endless-save'))?.tactical;
    if (t?.version === 1) {
        for (const k of ['mapIndex', 'mission', 'current', 'next']) if (t[k] !== undefined) this[k] = t[k];
        if (this.phase === 'reward' && Array.isArray(t.terrain)) this.terrain = t.terrain;
    } else if (this.phase === 'reward') {
        this.current = this.stageInfo(Math.max(1, this.wave));
        this.mapIndex = this.current.map;
        this.mission = this.current.mission;
    }
    for (const u of this.units) {
        u.supportSpent = false;
        const m = this.meta.get(u.id);
        if (m && m.baseMm) u.radius = m.baseMm * UNIT_RULES.worldPerMm / 2;
    }
    return true;
};
const __lwbSE = P.spawnEnemies;
P.spawnEnemies = function (ids) {
    const before = new Set(this.units.map(u => u.uid));
    __lwbSE.call(this, ids);
    const added = this.alive('evil').filter(u => !before.has(u.uid)), original = new Map(added.map(u => [u.uid, { x: u.x, y: u.y }]));
    for (const u of added) { u.x = -1000; u.y = -1000; }
    const order = { infantry: 0, monster: 1, hero: 2, support: 3, archer: 4, cavalry: 5 }, count = {};
    for (const u of added.sort((a, b) => order[window.LWBTactics.role(a, metaFor)] - order[window.LWBTactics.role(b, metaFor)])) {
        const r = window.LWBTactics.role(u, metaFor), i = count[r] || 0;
        count[r] = i + 1;
        const cols = [1165, 1010, 1320, 855, 1475, 700, 1630, 545, 1785], y = r === 'archer' ? 1310 : r === 'support' ? 1190 : r === 'hero' ? 1160 : r === 'cavalry' ? 1040 : 1080,
            x = r === 'cavalry' ? (i % 2 ? 2060 : 270) : cols[i % cols.length],
            candidates = [{ x, y }, original.get(u.uid)];
        for (let row = 1320; row >= 880; row -= 85)
            for (const col of cols) candidates.push({ x: col, y: row });
        const p = candidates.find(p => Et(u, p, this.alive(), this.terrain));
        if (p) Object.assign(u, p); else { u.alive = false; this.delayed.push(u.id); }
    }
};
field.insertAdjacentHTML('beforeend', '<section id="fight-preview" class="hidden" aria-label="교전 참여자"><div class="fight-preview-title"></div><div class="fight-preview-units"></div></section><div id="tactical-legend" class="hidden">이동 범위 · 금색: 돌격 · 사선: 장애물</div>');
function previewGroup() {
    const all = q.alive(), groups = Oe(all);
    if (q.phase === 'fight') return (q.fightQueue[0] || []).map(id => q.unit(id)).filter(u => u?.alive);
    return groups.find(g => g.some(u => u.uid === q.selected) || supportFor(g, all).some(l => l.unit.uid === q.selected)) || [];
}
function renderTacticalHUD() {
    const group = previewGroup(), box = ut('fight-preview');
    box.classList.toggle('hidden', !group.length || !['move', 'shoot', 'fight'].includes(q.phase) || inputBlocked());
    if (group.length) {
        const links = supportFor(group),
            parts = group.map(u => ({ u, label: '전열' })).concat(links.map(l => ({ u: l.unit, label: l.rank === 2 ? '파이크 2열' : '창 지원' })));
        box.querySelector('.fight-preview-title').textContent = '교전 ' + group.filter(u => u.side === 'good').length + ' vs ' + group.filter(u => u.side === 'evil').length + ' · 지원 ' + links.filter(l => l.unit.side === 'good').length + ' / ' + links.filter(l => l.unit.side === 'evil').length;
        const key = parts.map(p => p.u.uid + p.label).join('|');
        if (box.dataset.group !== key) {
            box.dataset.group = key;
            box.querySelector('.fight-preview-units').innerHTML = parts.map(({ u, label }) => '<button type="button" class="fight-member ' + u.side + '" data-focus="' + u.uid + '" aria-label="' + esc(u.name + ' · ' + label) + '"><img src="' + Ut(q.meta.get(u.id).file) + '" alt=""><span>' + esc(u.name) + '</span><small>' + label + '</small></button>').join('');
            box.querySelectorAll('[data-focus]').forEach(el => el.onclick = () => { const u = q.unit(el.dataset.focus); if (u) setCamera(u.x, u.y, UX.zoom, 'manual'); });
        }
    }
    const u = actionableUnit();
    ut('tactical-legend').classList.toggle('hidden', q.phase !== 'move' || !u || inputBlocked());
    if (u && !UX.intent && q.phase === 'move')
        ut('dock-status').innerHTML = __lwbRoleNames[window.LWBTactics.role(u, metaFor)] + ' · 이동 <b>' + (q.remaining(u) / 45).toFixed(1) + ' / ' + (u.stats.move / 45).toFixed(1) + '″</b>' + (q.engaged(u) ? ' · 교전' : u.stats.shootRange && u.movementSpent * 2 > u.stats.move ? ' · 사격 불가' : '');
    if (u) ut('dock-portrait').alt = u.name;
    const next = document.querySelector('.next-stage');
    if (next && !next.querySelector('.scout-roles')) {
        const p = document.createElement('p'); p.className = 'scout-roles';
        p.textContent = q.stageInfo(q.wave + 1).scouting; next.append(p);
    }
}
const __lwbR = Yt;
Yt = function () { __lwbR(); renderTacticalHUD(); };
const __lwbRG = Ve.prototype.drawRings;
Ve.prototype.drawRings = function () {
    __lwbRG.call(this);
    if (!this.rings || !UX.ready) return;
    const group = previewGroup(), g = this.rings, z = UX.zoom;
    for (const u of group) {
        g.lineStyle(3 / z, u.side === 'good' ? 0xdbe3bd : 0xda9475, 1);
        g.strokeCircle(u.x, u.y, u.radius + 8 / z);
    }
};
window.MESBG.tactics = { supportFor, role: u => window.LWBTactics.role(u, metaFor), previewGroup, version: '2.0-merge' };
window.__LWB = { be: (...a) => be(...a), He: (...a) => He(...a), metaFor, supportFor };
