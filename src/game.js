
/* MESBG Endless campaign extension. Original battle engine remains underneath.
 * Asset source: leesh603/mesbg-assets @ 2c33279. Game rules are adapted house rules.
 */
const CX = {
    version: 1, inches: 45,
    maps: ['minas_tirith', 'osgiliath', 'amon_sul', 'helms_deep', 'fangorn', 'edoras', 'moria', 'isengard', 'black_gate', 'gorgoroth'],
    mapNames: ['미나스 티리스', '오스길리아스', '아몬 술', '헬름 협곡', '팡고른', '에도라스', '모리아', '아이센가드', '검은 문', '고르고로스'],
    missionNames: { annihilation: '적 전멸', defense: '방어선 수호', hold: '거점 확보', survive: '포위망 생존', breakthrough: '전선 돌파', commander: '지휘관 처치', rescue: '포로 구출' },
    roleNames: { infantry: '보병', hero: '영웅', cavalry: '기병', monster: '괴수', support: '지원', beast: '야수' },
    rarityNames: ['NORMAL', 'MAGIC', 'RARE', 'UNIQUE'],
    relics: [
        ['lembas', '렘바스', 0, '전투 후 생존자의 Wounds를 1 회복. 중첩마다 회복량 +1.'],
        ['cloak', '이실리엔 수호망토', 1, '레인저가 8인치 밖에서 받는 사격의 명중 난도 +1. 중첩마다 보호 거리 감소.'],
        ['horn', '곤도르의 뿔', 2, '영웅이 2명 이상과 접촉하면 결투 수치 +1. 중첩마다 +1.'],
        ['horseshoe', '로한의 말굽', 0, '기병 이동력 +1인치. 중첩마다 +1인치.'],
        ['phial', '갈라드리엘의 빛', 2, '영웅의 6인치 내 아군은 Terror 면역. 중첩마다 범위 +1인치.'],
        ['mithril', '미스릴 셔츠', 3, 'Run 중 처음 치명상을 입은 아군 영웅이 1 Wound로 살아남음.'],
        ['cart', '라다가스트의 동물마차', 2, '3스테이지마다 큰 독수리 1기 지원. 전투 종료 후 떠남. 중첩마다 Attack +1.'],
        ['palantir', '팔란티르 파편', 1, '다음 적 편성을 전부 공개. 스테이지 보상 금화 +10, 중첩마다 +10.'],
        ['banner', '백색나무 군기', 1, '곤도르 보병이 아군 보병과 2인치 내 진형을 이루면 Defense +1. 중첩마다 +1.'],
        ['arrow', '검은 화살', 2, '궁수의 스테이지 첫 사격은 괴수에게 상처 주사위 +2. 중첩마다 +1.'],
        ['silmaril', '실마릴', 3, '모든 아군 Courage +2. 스테이지 시작 시 모든 영웅의 Might·Will·Fate +1 회복.'],
        ['narya', '나랴', 3, '라운드마다 가장 상처가 깊은 아군의 Wound 1 회복.'],
        ['nenya', '네냐', 3, '라운드마다 각 아군의 첫 상처를 5+로 막음.'],
        ['vilya', '빌랴', 3, '라운드마다 아군 마법사의 Will 1 회복.'],
        ['narsil', '나르실의 파편', 1, '영웅의 스테이지 첫 근접 타격은 상처 주사위 +1. 중첩마다 +1.'],
        ['quiver', '레인저의 화살통', 0, '궁수 사거리 +1인치. 중첩마다 +1인치. 반 이동 이내 사격은 이동 페널티 없음.'],
        ['darkpact', '위력의 반지', 3, '인간에게 주어진 아홉 반지의 파편. 악의 진영 영웅도 그 권능에 복종해 영입 목록에 등장합니다.'],
        ['warbanner', '로한의 전쟁깃발', 2, '영웅의 8인치 내 아군 결투 +1.'],
        ['durin_axe', '두린의 도끼', 2, '모든 아군 힘 +1. 중첩마다 +1.'],
        ['eagle_feather', '대독수리의 깃털', 1, '모든 아군 이동력 +1인치. 중첩마다 +1인치.'],
        ['second_breakfast', '두 번째 아침상', 0, '스테이지 시작 시 아군 전원 Wound 1 회복. 중첩마다 +1.'],
        ['crown_west', '웨스터네스의 왕관', 1, '모든 아군 용기 +1. 중첩마다 +1.'],
        ['eohere_horn', '에오르의 경적', 2, '기병 결투 +1. 중첩마다 +1.'],
        ['elven_feather', '갈라드림의 깃털', 2, '궁수 사격 명중 필요값 −1 (최소 2+). 중첩마다 −1.'],
        ['numenor_map', '누메노르의 지도', 1, '스테이지 보상 금화 +10. 중첩마다 +10.']
    ].map(([id, name, rarity, text], icon) => ({ id, name, rarity, text, icon })),
    skills: {
        aragorn: ['왕의 결의', 'might', 1, '이번 라운드 Attack +1, 상처 필요값 최대 4+.'],
        boromir: ['곤도르의 뿔', 'might', 1, '6인치 내 아군 결투 +1, 인접 적은 Courage 검사 실패 시 Attack −1.'],
        legolas: ['숲의 명사수', 'might', 1, '이번 사격 단계 최대 3발. 이동 페널티 없이 명중 2+.'],
        gimli: ['도끼의 주인', 'might', 1, '이번 라운드 Attack +2.'],
        gandalf: ['백색의 수호', 'will', 2, '6인치 내 아군 Defense +2, Terror 면역. 가장 가까운 적을 밀어내고 둔화.'],
        theoden: ['세오덴의 진군', 'might', 1, '8인치 내 기병의 남은 이동력 +2인치, 이번 라운드 결투 +1.'],
        elrond: ['리븐델의 치유', 'will', 2, '6인치 내 가장 상처가 깊은 아군 2기 Wound +1. 자신 결투 +1.'],
        glorfindel_mounted: ['서녘의 빛', 'might', 1, '이번 라운드 힘 +1, 주변 6인치 아군 Terror 면역.'],
        glorfindel_foot: ['서녘의 빛', 'might', 1, '이번 라운드 힘 +1, 주변 6인치 아군 Terror 면역.'],
        witchking_fellbeast: ['검은 숨결', 'will', 2, '8인치 내 아군 적대 부대의 이동력과 결투를 약화.'],
        saruman: ['사루만의 목소리', 'will', 2, '10인치 내 가장 강한 적의 Attack −1, 이동력 절반.'],
        sauron: ['어둠의 군주', 'will', 2, '6인치 내 적에게 힘 6 타격, Courage 실패 시 추가 밀림.'],
        gothmog: ['모르도르의 지휘', 'might', 1, '6인치 내 오크 결투 +1.']
    },
    recruits: ['warrior_minas_tirith', 'gondor_archer', 'mt_spear', 'ithilien_ranger', 'rohan_rider', 'citadel_guard', 'elf_swordsman', 'dwarf_guardian', 'boromir', 'legolas', 'gimli', 'gandalf', 'theoden', 'elrond', 'glorfindel_mounted']
};
const newProfiles = {
    mt_spear: { fight: 3, defence: 5, traits: ['spear', 'gondor'] },
    ithilien_ranger: { fight: 4, defence: 4, shootValue: 3, shootRange: 810, traits: ['ranger'] },
    rohan_rider: { move: 450, fight: 3, defence: 5, traits: ['mounted'] },
    citadel_guard: { fight: 4, defence: 6, courage: 5, traits: ['spear', 'gondor'] },
    elf_swordsman: { fight: 5, defence: 5, courage: 5, traits: ['elf'] },
    dwarf_guardian: { move: 225, fight: 4, strength: 4, defence: 7, courage: 4, traits: ['dwarf'] },
    legolas: { fight: 6, defence: 4, attacks: 2, wounds: 3, courage: 6, shootValue: 3, shootRange: 900, traits: ['hero', 'ranger'] },
    gimli: { move: 225, fight: 6, strength: 4, defence: 8, attacks: 3, wounds: 3, courage: 6, traits: ['hero', 'dwarf'] },
    gandalf: { fight: 5, strength: 4, defence: 5, attacks: 2, wounds: 3, courage: 7, traits: ['hero', 'wizard'] },
    theoden: { move: 450, fight: 5, strength: 4, defence: 6, attacks: 2, wounds: 3, courage: 6, traits: ['hero', 'mounted'] },
    elrond: { fight: 6, strength: 4, defence: 7, attacks: 3, wounds: 3, courage: 6, traits: ['hero', 'wizard'] },
    moria_goblin: { move: 235, fight: 2, defence: 4, courage: 2 },
    uruk_berserker: { move: 270, fight: 4, strength: 4, defence: 5, attacks: 2, courage: 4 },
    warg_rider: { move: 435, fight: 3, strength: 4, defence: 4, traits: ['mounted'] },
    cave_troll: { move: 270, fight: 6, strength: 6, defence: 6, attacks: 3, wounds: 4, courage: 4, traits: ['monster', 'terror'] },
    balrog: { move: 300, fight: 8, strength: 8, defence: 8, attacks: 4, wounds: 9, courage: 8, traits: ['monster', 'terror', 'boss'] },
    sauron: { move: 230, fight: 9, strength: 8, defence: 9, attacks: 4, wounds: 10, courage: 9, traits: ['hero', 'monster', 'terror', 'boss'] },
    saruman: { move: 260, fight: 5, strength: 4, defence: 5, attacks: 2, wounds: 4, courage: 7, traits: ['hero', 'wizard', 'boss'] },
    great_eagle: { move: 510, fight: 6, strength: 5, defence: 5, attacks: 2, wounds: 3, courage: 5, traits: ['flying'] },
    morgoth: { move: 225, fight: 10, strength: 9, defence: 9, attacks: 5, wounds: 18, courage: 10, traits: ['hero', 'monster', 'terror', 'boss'] }
};
for (const [id, p] of Object.entries(newProfiles))
    zt[id] = { ...structuredClone(Ft), ...p, traits: p.traits || [] };
zt.warrior_minas_tirith.traits = ['gondor'];
zt.aragorn.courage = 6;
zt.boromir.courage = 6;
zt.glorfindel_foot.courage = 6;
zt.glorfindel_mounted.courage = 6;
for (const id of Object.keys(CX.skills))
    if (zt[id]) {
        zt[id].might = id === 'boromir' ? 6 : 3;
        zt[id].will = zt[id].traits.includes('wizard') ? 6 : 3;
        zt[id].fate = 2;
    }
zt.witchking_fellbeast.traits.push('terror', 'wizard', 'boss');
q.meta = new Map(window.CAMPAIGN_META.filter(u => zt[u.id] || u.side === 'terrain').map(u => [u.id, u]));
q.meta.set('morgoth', { id: 'morgoth', name_ko: '모르고스', name_en: 'Morgoth', side: 'evil', faction: 'mordor', role: 'monster', weapon: 'mace', base: 'XXL', file: 'tokens/morgoth.png' });
// Check the exact metadata and asset availability before preload.
for (const [id, u] of q.meta)
    if (!window.__MESBG_ASSETS__[u.file])
        q.meta.delete(id);
// Faction circular bases drawn under every token (asset pack bases/ directory).
const BASE_FACTION = { gondor: 'gondor', mordor: 'mordor', moria: 'moria', angmar: 'angmar', isengard: 'isengard', rohan: 'rohan', dwarf: 'dwarf', rivendell: 'rivendell', harad: 'harad', dol_guldur: 'dol_guldur', dead: 'dead', lothlorien: 'lorien', elf: 'lorien', lorien: 'lorien', erebor: 'dwarf', arnor: 'gondor', shire: 'gondor', men: 'gondor', doriath: 'lorien', valinor: 'rivendell', eagle: 'gondor', ent: 'lorien', beorning: 'rohan', gundabad: 'moria', angband: 'mordor', easterling: 'harad', rhun: 'harad', dunland: 'isengard', maiar: 'rivendell' };
const baseFile = u => { const f = BASE_FACTION[u.faction] || (u.side === 'evil' ? 'mordor' : 'gondor'); const s = ['S', 'M', 'L', 'XL', 'XXL'].includes(u.base) ? u.base : 'M'; return `bases/base_${f}_${s}.png`; };
// High-quality painted maps for the stages that have them; other stages keep the asset-pack backdrops.
const MAP_HQ = { minas_tirith: 'gate-art', osgiliath: 'map-hq-osgiliath', gorgoroth: 'map-hq-gorgoroth', edoras: 'map-hq-edoras', amon_sul: 'map-hq-amon_sul', helms_deep: 'map-hq-helms_deep', fangorn: 'map-hq-fangorn', moria: 'map-hq-moria', isengard: 'map-hq-isengard', black_gate: 'map-hq-black_gate' };
const MAP_TINT = { gorgoroth: 0xd6ccbe, edoras: 0xf3eedd, amon_sul: 0xf3eedd };
// Spear-support predicate, shared by the fight solver and the HUD link lines.
function supportAlly(u) { const all = q.alive(); if (!u.alive || !u.traits.includes('spear') || all.some(v => Vt(u, v)))
    return null; return all.filter(v => v !== u && v.side === u.side && all.some(f => f.side !== u.side && Vt(v, f)) && ht(u, v) <= u.radius + v.radius + 48).sort((a, b2) => ht(u, a) - ht(u, b2))[0] || null; }
let AUTO = false; // auto-play: drives whichever side needs input; camp stays manual
Mt.initial = [{ id: 'aragorn', count: 1 }, { id: 'warrior_minas_tirith', count: 2 }, { id: 'mt_spear', count: 1 }, { id: 'gondor_archer', count: 2 }];
const P = ze.prototype, oldSpawn = P.spawn, oldStart = P.start, oldRound = P.beginRound, oldMove = P.move, oldShoot = P.shoot, oldApply = P.applyCombat;
P.rank = function (id) { return this.relics?.[id] || 0; };
P.capacity = function () { return Math.min(30, 8 + Math.floor((this.wave || 0) / 3) * 2 + (this.capacityBought || 0) * 2); };
P.permanent = function () { return this.alive('good').filter(u => !u.temporary); };
P.spawn = function (id, side, pos) {
    const u = oldSpawn.call(this, id, side, pos);
    u.name = this.meta.get(id).name_ko;
    u.visualRadius = this.meta.get(id).visualRadius || u.radius;
    u.baseStats = structuredClone(u.stats);
    u.resources = { might: u.stats.might, will: u.stats.will, fate: u.stats.fate };
    u.usedSkills = [];
    u.roundBuff = {};
    u.stageShots = 0;
    u.stageStrikes = 0;
    u.heroicUsed = false;
    u.shotsLeft = 1;
    u.bossPhase = 1;
    if (id === 'morgoth')
        u.radius = 132;
    this.refreshUnit(u);
    return u;
};
P.refreshUnit = function (u) {
    if (!u.baseStats)
        return;
    u.stats = structuredClone(u.baseStats);
    if (u.side === 'good') {
        if (u.traits.includes('mounted'))
            u.stats.move += 45 * this.rank('horseshoe');
        if (u.stats.shootRange)
            u.stats.shootRange += 45 * this.rank('quiver');
        u.stats.courage += 2 * this.rank('silmaril');
        u.stats.strength += this.rank('durin_axe');
        u.stats.move += 45 * this.rank('eagle_feather');
        u.stats.courage += this.rank('crown_west');
        if (u.traits.includes('mounted'))
            u.stats.fight += this.rank('eohere_horn');
        if (u.stats.shootRange)
            u.stats.shootValue = Math.max(2, u.stats.shootValue - this.rank('elven_feather'));
    }
    for (const [key, v] of Object.entries(u.roundBuff || {}))
        u.stats[key] = (u.stats[key] || 0) + v;
    u.stats.attacks = Math.max(1, u.stats.attacks);
    u.stats.fight = Math.max(1, u.stats.fight);
};
P.start = function (mode) {
    this.gold = mode === 'ai' ? 600 : 35;
    this.relics = {};
    this.capacityBought = 0;
    this.totalKills = 0;
    this.mithrilSpent = false;
    this.recruited = [];
    this.best = this.readBest();
    this.mission = 'defense';
    this.capture = 0;
    this.warnings = [];
    this.cleared = 0;
    const _mtInit = Mt.initial;
    if (mode === 'ai')
        Mt.initial = [];
    oldStart.call(this, mode);
    Mt.initial = _mtInit;
    this.prepareStage();
    if (mode === 'ai') {
        this.initialDraft = true;
        this.phase = 'reward';
        this.campStep = 'recruit';
        this.recruitDraft = [];
        this.rerolls = 0;
        this.chosenRelic = '';
        this.rollInitialRecruits();
        this.emit('Preparation', '출정할 원정대를 고르세요. 영웅 1기와 병사들을 금화 안에서 선택합니다.');
    }
    else
        this.emit('Preparation', '아라곤과 다섯 병사. 병사를 선택해 전열을 정하세요.');
};
P.rollInitialRecruits = function () {
    this.rng || (this.rng = Ne(Date.now()));
    const isH = d => (d.profile.traits || []).includes('hero') || d.meta.role === 'hero';
    const base = Object.values(UnitCatalog).filter(d => d.enabled && d.meta.side === 'good' && this.meta.has(d.id) && (0 >= (d.unlockWave || 0) || isH(d)));
    const heroes = base.filter(isH).map(d => ({ id: d.id, r: this.rng() })).sort((a, b) => a.r - b.r).slice(0, 3);
    const troops = base.filter(d => d.recruitable && !isH(d)).map(d => ({ id: d.id, r: this.rng() })).sort((a, b) => a.r - b.r).slice(0, 9);
    this.recruitOffers = [...heroes, ...troops].map(d => ({ id: d.id, bought: false }));
};
P.readBest = function () { try {
    return Number(localStorage.getItem('mesbg-endless-best')) || 0;
}
catch {
    return 0;
} };
P.stageInfo = function (n) {
    let boss = n % 25 === 0 ? 'morgoth' : n % 20 === 0 ? 'sauron' : n % 15 === 0 ? 'balrog' : n % 10 === 0 ? 'witchking_fellbeast' : n % 5 === 0 ? 'cave_troll' : null;
    const missions = ['defense', 'annihilation', 'hold', 'survive', 'commander', 'breakthrough', 'rescue'];
    const mission = boss ? 'commander' : missions[(n - 1) % missions.length];
    const ids = [];
    const count = Math.min(24, 4 + Math.floor(n * 1.15));
    for (let i = 0; i < count; i++)
        ids.push(n > 9 && i % 7 === 0 ? 'cave_troll' : n > 4 && i % 5 === 0 ? 'warg_rider' : n > 2 && i % 4 === 0 ? 'uruk_berserker' : i % 4 === 3 ? 'orc_archer' : i % 3 === 1 ? 'moria_goblin' : 'orc_sword');
    if (boss)
        ids.push(boss);
    else if (mission === 'commander')
        ids.push(n > 8 ? 'saruman' : 'orc_captain');
    else if (n > 3)
        ids.push('orc_captain');
    const modifier = n < 4 ? 'clear' : ['clear', 'rain', 'dark', 'reinforce', 'warg', 'ambush', 'cavalry', 'swarm'][n % 8];
    if (modifier === 'warg')
        ids.push('warg_rider', 'warg_rider');
    if (modifier === 'cavalry')
        for (let i = 0; i < ids.length; i += 2)
            ids[i] = 'warg_rider';
    if (modifier === 'swarm') { ids.length = 0; for (let i = 0; i < count + 7; i++) ids.push(i % 6 === 5 ? 'uruk_berserker' : 'moria_goblin'); }
    if (modifier === 'ambush')
        for (let i = 0; i < ids.length; i++) if (ids[i] === 'warg_rider' || ids[i] === 'cave_troll') ids[i] = 'moria_goblin';
    return { n, boss, mission, ids, map: Math.floor((n - 1) / 5) % CX.maps.length, modifier };
};
P.prepareStage = function () {
    const info = this.stageInfo(this.wave + 1);
    this.next = info;
    this.mapIndex = info.map;
    this.mission = info.mission;
    this.capture = 0;
    this.rescued = false;
    this.escaped = [];
    this.warnings = [];
    this.terrain = structuredClone(ee).filter(t => !t.id.startsWith('wall') || this.mapIndex === 0);
    for (const t of this.terrain)
        if (t.id.startsWith('barricade'))
            t.active = this.mission === 'defense';
    if (this.mapIndex !== 0) {
        this.terrain.find(t => t.id === 'terr_rock_outcrop').x = 420 + (this.mapIndex % 3) * 120;
        this.terrain.find(t => t.id === 'terr_ruined_wall').x = 1780 - (this.mapIndex % 2) * 130;
    }
    Mt.objective.x = 1165;
    Mt.objective.y = this.mission === 'defense' ? 240 : 960;
    Mt.objective.radius = this.mission === 'defense' ? 180 : 175;
    this.phase = 'preparation';
    this.side = 'good';
    this.activeMoverUid = '';
    for (const u of this.alive('good')) {
        u.x = -1000;
        u.y = -1000;
    }
    for (const u of this.alive('good')) {
        u.roundBuff = {};
        this.refreshUnit(u);
        u.acted = false;
        u.moved = false;
        u.movementSpent = 0;
        u.stageShots = 0;
        u.stageStrikes = 0;
        u.usedSkills = [];
        u.protected = false;
        u.escaped = false;
        this.placeInDeployment(u);
    }
    this.selected = this.alive('good')[0]?.uid || '';
};
P.placeInDeployment = function (u) {
    for (let y = 345; y <= 645; y += 130)
        for (const x of [1090, 1240, 940, 1390, 790, 1540, 640, 1690, 490, 1840, 340, 1990, 190, 2140])
            if (Et(u, { x, y }, this.alive(), this.terrain)) {
                Object.assign(u, { x, y });
                return true;
            }
    return false;
};
P.startWave = function () {
    if (this.phase !== 'preparation')
        return;
    this.wave++;
    this.round = 0;
    this.capture = 0;
    this.current = this.stageInfo(this.wave);
    this.units = this.units.filter(u => u.side === 'good' && u.alive && !u.temporary);
    this.delayed = [];
    this.spawnEnemies(this.current.ids);
    if (this.current.modifier === 'ambush')
        this.alive('evil').forEach((u, i) => { u.x = i % 2 ? 260 + (i % 4) * 140 : 1960 - (i % 4) * 140; u.y = 560 + Math.floor(i / 8) * 160; });
    this.commander = this.alive('evil').find(u => u.id === this.current.boss)?.uid || this.alive('evil').filter(u => u.traits.includes('hero')).at(-1)?.uid;
    for (const u of this.alive('good')) {
        const s = this.rank('silmaril');
        for (const k of ['might', 'will', 'fate'])
            u.resources[k] = Math.min(u.baseStats[k] + s, u.resources[k] + 1 + s);
        u.stageShots = 0;
        u.stageStrikes = 0;
        if (this.rank('second_breakfast'))
            u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + this.rank('second_breakfast'));
    }
    if (this.rank('cart') && this.wave % 3 === 0 && this.meta.has('great_eagle')) {
        const u = this.spawn('great_eagle', 'good', { x: 200, y: 500 });
        u.temporary = true;
        u.baseStats.attacks += this.rank('cart') - 1;
        this.placeInDeployment(u);
    }
    this.emit('WaveStarted', `STAGE ${this.wave} · ${CX.missionNames[this.mission]}${this.current.boss ? ' · ' + this.meta.get(this.current.boss).name_ko : ''}`);
    this.beginRound();
};
P.spawnEnemies = function (ids) {
    for (const id of ids) {
        if (!this.meta.has(id))
            continue;
        const u = this.spawn(id, 'evil', { x: -1000, y: -1000 });
        let placed = false;
        for (let y = 1300; y >= 840 && !placed; y -= 125)
            for (let x = 180; x < 2180; x += 145)
                if (Et(u, { x, y }, this.alive(), this.terrain)) {
                    Object.assign(u, { x, y });
                    placed = true;
                    break;
                }
        if (!placed) {
            u.alive = false;
            this.delayed.push(id);
            continue;
        }
        const tier = Math.floor((this.wave - 1) / 10);
        u.baseStats.fight = Math.min(10, u.baseStats.fight + Math.floor(tier / 2));
        u.baseStats.strength = Math.min(9, u.baseStats.strength + Math.floor(tier / 3));
        u.baseStats.wounds += tier;
        u.currentWounds = u.baseStats.wounds;
        if (tier > 2)
            u.baseStats.attacks += Math.floor(tier / 3);
        this.refreshUnit(u);
    }
};
P.beginRound = function () {
    if (this.checkRun())
        return;
    for (const u of this.alive()) {
        u.roundBuff = {};
        u.protected = false;
        u.heroicUsed = false;
        u.heroics = {};
        u.skillRound = false;
        u.nenyaUsed = false;
        u.shotsLeft = 1;
        u.terrorTested = false;
        u.anduril = false;
        u.precise = false;
        this.refreshUnit(u);
    }
    oldRound.call(this);
    if (this.phase === 'reward' || this.phase === 'result')
        return;
    for (const u of this.alive('good')) {
        if (u.id === 'aragorn')
            u.resources.might = Math.min(u.baseStats.might, u.resources.might + 1);
        if (this.rank('vilya') && u.traits.includes('wizard'))
            u.resources.will = Math.min(u.baseStats.will + 1, u.resources.will + 1);
    }
    if (this.rank('narya')) {
        const u = this.alive('good').filter(u => u.currentWounds < u.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds))[0];
        if (u) {
            u.currentWounds++;
            this.emit('Relic', '나랴 · ' + u.name + ' 회복');
        }
    }
    if (this.current?.modifier === 'rain' || this.current?.modifier === 'dark')
        for (const u of this.alive())
            if (u.stats.shootRange)
                u.stats.shootRange *= this.current.modifier === 'rain' ? .8 : .65;
    if (this.current?.modifier === 'reinforce' && this.round % 3 === 0 && this.alive('evil').length < 26)
        this.spawnEnemies(['orc_sword', 'orc_archer']);
    if (this.delayed.length) {
        const pending = this.delayed.splice(0, 3);
        this.spawnEnemies(pending);
    }
    for (const boss of this.alive('evil').filter(u => u.traits.includes('boss')))
        this.bossTurn(boss);
    this.autoSelect();
};
P.bossTurn = function (u) {
    const ratio = u.currentWounds / u.stats.wounds;
    const phase = u.currentWounds <= Math.ceil(u.stats.wounds * .33) ? 3 : u.currentWounds <= Math.ceil(u.stats.wounds * .66) ? 2 : 1;
    if (phase > u.bossPhase) {
        u.bossPhase = phase;
        this.emit('BossPhase', `${u.name} · ${phase}단계`);
        if (phase === 2 && this.alive('evil').length < 24)
            this.spawnEnemies(['orc_sword', 'uruk_berserker']);
    }
    if (u.id === 'morgoth') {
        if (this.warnings.length) {
            for (const area of this.warnings) {
                for (const v of this.alive('good').filter(v => ht(v, area) < area.radius + v.radius)) {
                    this.inflict(u, v, 1 + Number(phase === 3));
                    this.emit('BossImpact', '그론드의 충격', { uid: v.uid, at: area });
                }
            }
            this.warnings = [];
        }
        const targets = this.alive('good').sort((a, b) => b.stats.attacks - a.stats.attacks).slice(0, phase);
        this.warnings = targets.map(v => ({ x: v.x, y: v.y, radius: 130, round: this.round + 1 }));
        this.emit('BossWarning', '그론드가 내리칩니다. 다음 라운드 전에 붉은 균열에서 벗어나세요.');
    }
    else if (u.id === 'balrog' && this.round % 2 === 0) {
        const target = this.alive('good').filter(v => ht(v, u) < 500).sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (target) {
            this.inflict(u, target, 1);
            this.emit('BossImpact', '발록의 화염 채찍', { uid: target.uid, at: target });
        }
    }
    this.checkRun();
};
P.inflict = function (attacker, target, n) {
    const result = ce('skill', [attacker, target], attacker.side);
    let wounds = target.currentWounds;
    for (let i = 0; i < n; i++) {
        wounds--;
        result.strikeResults.push({ attacker: attacker.uid, target: target.uid, roll: 6, needed: 4, wound: true, killed: wounds <= 0 });
    }
    this.applyCombat(result);
    this.emit('SkillResolved', undefined, { result });
};
P.endRound = function () {
    if (this.checkRun())
        return;
    const allies = this.alive('good').filter(u => ht(u, Mt.objective) <= Mt.objective.radius);
    const foes = this.alive('evil').filter(u => ht(u, Mt.objective) <= Mt.objective.radius);
    if (this.mission === 'defense' && foes.length >= this.breachCount) {
        this.endRun(false, '적이 방어선을 돌파했습니다.');
        return;
    }
    if (this.mission === 'hold') {
        this.capture = allies.length > foes.length ? this.capture + 1 : Math.max(0, this.capture - 1);
        if (this.capture >= 3) {
            this.finishWave();
            return;
        }
    }
    if (this.mission === 'rescue') {
        if (allies.length && !foes.length)
            this.rescued = true;
        if (this.rescued)
            this.capture++;
        if (this.capture >= 3) {
            this.finishWave();
            return;
        }
    }
    if (this.mission === 'survive' && this.round >= 5) {
        this.finishWave();
        return;
    }
    if (this.mission === 'breakthrough' && this.alive('good').filter(u => u.y > 1200).length >= Math.min(2, this.permanent().length)) {
        this.finishWave();
        return;
    }
    this.emit('RoundEnded', `라운드 ${this.round} 종료`);
    this.beginRound();
};
P.checkRun = function () {
    if (['menu', 'reward', 'result', 'preparation'].includes(this.phase))
        return false;
    if (!this.alive('good').length) {
        this.endRun(false, '원정대가 전멸했습니다.');
        return true;
    }
    if (this.mission === 'commander' && this.commander && !this.unit(this.commander)?.alive) {
        this.finishWave();
        return true;
    }
    if (!this.alive('evil').length && !this.delayed.length && this.wave > 0) {
        this.finishWave();
        return true;
    }
    return false;
};
P.finishWave = function () {
    if (this.phase === 'reward' || this.phase === 'result')
        return;
    this.cleared = this.wave;
    const bounty = 60 + this.wave * 8 + this.rank('palantir') * 10 + this.rank('numenor_map') * 10;
    this.gold += bounty;
    this.lastGold = bounty;
    this.phase = 'reward';
    this.campStep = 'event';
    this.rollCampEvent();
    this.chosenRelic = '';
    this.rerolls = 0;
    this.warnings = [];
    for (const u of this.alive('good')) {
        u.veteranXP++;
        u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + this.rank('lembas'));
        u.roundBuff = {};
        u.protected = false;
        this.refreshUnit(u);
    }
    this.rollRecruits();
    this.rollRelics();
    this.emit('WaveEnded', `STAGE ${this.wave} 완료 · 금화 +${bounty}`);
    this.best = Math.max(this.best || 0, this.wave);
    try {
        localStorage.setItem('mesbg-endless-best', String(this.best));
    }
    catch { }
    this.save();
};
P.price = function (id) { return zt[id].traits.includes('hero') ? 115 : zt[id].traits.includes('mounted') ? 55 : zt[id].shootRange ? 38 : zt[id].defence >= 7 ? 48 : 30; };
P.rollRecruits = function () {
    let pool = CX.recruits.filter(id => this.meta.has(id) && (!zt[id].traits.includes('hero') || this.wave >= 2 && !this.permanent().some(u => u.id === id)));
    this.recruitOffers = pool.map(id => ({ id, r: this.rng() + (zt[id].traits.includes('hero') ? .28 : 0) })).sort((a, b) => a.r - b.r).slice(0, 4).map(x => ({ id: x.id, bought: false }));
};
const LWB_EVENTS = [
    { id: 'refugees', title: '피난민 행렬', text: '곤도르 피난민 행렬이 성문을 지나치려 몰려듭니다.', options: [
        { label: '식량을 나눈다', sub: '금화 −15 · 아군 전원 용기 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 15); q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }); } },
        { label: '대열을 재촉한다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'arsenal', title: '훼손된 무기고', text: '성벽 아래 무기고가 침수되었습니다.', options: [
        { label: '수리에 비용을 쓴다', sub: '금화 −25', fx: q => q.gold = Math.max(0, q.gold - 25) },
        { label: '버리고 간다', sub: '무작위 아군 1기 Attack −1 (영구)', fx: q => { const u = q.alive('good').filter(u2 => u2.stats.attacks > 1); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.attacks = Math.max(1, t.baseStats.attacks - 1); q.refreshUnit(t); } } }] },
    { id: 'omen', title: '전조의 별', text: '밤하늘에 서쪽의 별이 유난히 밝습니다.', options: [
        { label: '기도를 올린다', sub: '다음 전투 첫 라운드 우선권 확보', fx: q => q.priorityForce = 'good' },
        { label: '무시하고 행군한다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'mithril', title: '미스릴 파편', text: '쓰러진 기사의 갑옷 속에서 빛나는 금속 조각이 발견됩니다.', options: [
        { label: '유물로 벼려낸다', sub: '무작위 유물 1개 획득', fx: q => { const r = CX.relics[Math.floor(q.rng() * CX.relics.length)]; if (r) q.relics[r.id] = (q.relics[r.id] || 0) + 1; } },
        { label: '상인에게 판다', sub: '금화 +45', fx: q => q.gold += 45 }] },
    { id: 'rider', title: '부상당한 기수', text: '로한 기수가 쓰러진 채 발견됩니다. 다음 전투에 대한 소식을 알고 있습니다.', options: [
        { label: '치료해준다', sub: '금화 −20 · 다음 라운드 CP +2', fx: q => { q.gold = Math.max(0, q.gold - 20); q.bonusCP += 2; } },
        { label: '지나친다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'nightraid', title: '야영지 습격', text: '밤중에 워그 무리가 야영지를 기습합니다.', options: [
        { label: '흩어져 싸운다', sub: '무작위 아군 1기 상처 +1 · 금화 +50', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); q.gold += 50; } },
        { label: '전열을 지킨다', sub: '피해 없음', fx: q => { } }] },
    { id: 'priest', title: '성속의 사제', text: '백탑의 사제가 부상병들을 돌보겠다고 합니다.', cond: q => q.alive('good').some(u => u.currentWounds < u.stats.wounds), options: [
        { label: '전원 치료를 부탁한다', sub: '금화 −30 · 상처 입은 아군 전원 완치', fx: q => { q.gold = Math.max(0, q.gold - 30); q.alive('good').forEach(u => u.currentWounds = u.stats.wounds); } },
        { label: '가장 위독한 이만 부탁한다', sub: '상처 가장 큰 아군 1기 완치', fx: q => { const u = q.alive('good').filter(u2 => u2.currentWounds < u2.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds))[0]; if (u) u.currentWounds = u.stats.wounds; } }] },
    { id: 'council', title: '전쟁 회의', text: '파라미르의 척후병이 적의 배치도를 가져왔습니다.', options: [
        { label: '정찰을 강화한다', sub: '팔란티르 · 다음 전장의 적 편성 공개 (영구)', fx: q => q.relics.palantir = (q.relics.palantir || 0) + 1 },
        { label: '여비만 받는다', sub: '금화 +20', fx: q => q.gold += 20 }] },
    { id: 'monolith', title: '고대의 경계석', text: '누르의 왕들이 세운 경계석이 길가에 서 있습니다.', options: [
        { label: '묵상한다', sub: '무작위 아군 1기 결투 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; q.refreshUnit(t); } } },
        { label: '유물을 수거한다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'ring', title: '절대반지의 유혹', text: '주머니 깊은 곳의 반지가 마음을 무겁게 짓누릅니다. 한 번만, 아주 잠깐 쓴다면 전세를 뒤집을 수도 있습니다.', options: [
        { label: '유혹에 몸을 맡긴다', sub: '무작위 영웅 결투 +2 · 용기 −2 (영구)', fx: q => { const hs = q.alive('good').filter(u => Object.values(u.resources || {}).some(r => r > 0)); const pool = hs.length ? hs : q.alive('good'); const t = pool[Math.floor(q.rng() * pool.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 2; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 2); q.refreshUnit(t); } } },
        { label: '반지를 거부한다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) }] },
    { id: 'nazgul', title: '나즈굴의 추격', text: '검은 날개 짐승의 비명이 하늘을 가릅니다. 모두가 납작 엎드려 숨을 죽입니다.', options: [
        { label: '숨어서 지나가기를 기다린다', sub: '다음 전투 첫 라운드 아군 전원 이동 −2″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -60 }) },
        { label: '빠르게 빠져나간다', sub: '금화 −20', fx: q => q.gold = Math.max(0, q.gold - 20) }] },
    { id: 'lorien', title: '로스로리엔의 선물', text: '은빛 나뭇잎 사이로 엘프 정령이 나타나 작은 선물을 건넵니다.', options: [
        { label: '렘바스 빵을 나눈다', sub: '상처 입은 아군 전원 상처 1 회복', fx: q => q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)) },
        { label: '엘프 망토를 받는다', sub: '무작위 아군 방어 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.defence = (t.baseStats.defence || 0) + 1; q.refreshUnit(t); } } }] },
    { id: 'marshes', title: '죽음의 늪지', text: '검은 물속에서 창백한 얼굴들이 눈을 뜨고 올려다봅니다. 촛불 같은 빛이 손짓합니다.', options: [
        { label: '빛을 외면하고 걷는다', sub: '다음 전투 첫 라운드 아군 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1 }) },
        { label: '늪지를 아는 자에게 길을 묻는다', sub: '금화 −15', fx: q => q.gold = Math.max(0, q.gold - 15) }] },
    { id: 'osgiliath', title: '오스길리아스의 폐허', text: '무너진 달의 돔 아래 잔해 속에 아직 쓸만한 것이 남아있을지 모릅니다 — 또는 매복이.', options: [
        { label: '폐허를 수색한다', sub: '행운 시험 · 금화 +50 또는 무작위 아군 상처 +1', fx: q => { if (q.rng() < 0.6) q.gold += 50; else { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); } } },
        { label: '조심스레 우회한다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'eagle', title: '대독수리의 소식', text: '과이히르의 후손이 먼 산 위를 선회하며 적의 움직임을 알려줍니다.', options: [
        { label: '정찰 정보를 받는다', sub: '팔란티르 획득 — 적 편성 공개 (영구)', fx: q => q.relics.palantir = (q.relics.palantir || 0) + 1 },
        { label: '희소식에 기세가 오른다', sub: '다음 전투 첫 라운드 아군 전원 이동 +1″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: 30 }) }] },
    { id: 'mazarbul', title: '마자르불의 책', text: '낡은 책에 드워프의 마지막 기록이 남았습니다: “그들이 온다. 그들이 온다…”', options: [
        { label: '기록을 읽어 교훈을 얻는다', sub: '무작위 아군 결투 +1 · 용기 −1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } } },
        { label: '책을 덮고 떠난다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'breakfast', title: '두 번째 아침식사', text: '호빗의 격언 — 아침을 두 번 먹는 자에게 하루는 든든합니다.', cond: q => q.alive('good').some(u => u.currentWounds < u.stats.wounds), options: [
        { label: '푸짐하게 차려낸다', sub: '금화 −8 · 상처 입은 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 8); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '건빵으로 때운다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'ents', title: '엔트의 경계', text: '느릅나무들이 오랜 침묵 끝에 부대를 물끄러미 내려다봅니다. 숲은 기억합니다.', options: [
        { label: '엔트의 축복을 받는다', sub: '무작위 아군 완치 · 방어 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.currentWounds = t.stats.wounds; t.baseStats.defence = (t.baseStats.defence || 0) + 1; q.refreshUnit(t); } } },
        { label: '조용히 지나간다', sub: '아무 일도 없다', fx: q => { } }] }
    ,{ id: 'dunedain', title: '두네다인의 합류', text: '북부 순찰대가 캠프를 찾아왔습니다. 길 안내와 약속된 강철을 제안합니다.', options: [
        { label: '합류를 환영한다', sub: '금화 −20 · 무작위 아군 결투·힘 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 20); const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.baseStats.strength = (t.baseStats.strength || 0) + 1; q.refreshUnit(t); } } },
        { label: '보급품만 나눈다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'redarrow', title: '붉은 화살', text: '로한의 붉은 화살이 도착했습니다 — 곤도르가 지원을 요청합니다.', options: [
        { label: '즉시 응한다', sub: '다음 전투 CP +2 · 금화 −10', fx: q => { q.gold = Math.max(0, q.gold - 10); q.bonusCP = (q.bonusCP || 0) + 2; } },
        { label: '지금은 무리다', sub: '다음 전투 첫 라운드 아군 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1 }) }] },
    { id: 'whispers', title: '나무들의 속삭임', text: '판고른의 나무들이 동요합니다. 나뭇잎의 소란이 적들의 야영지로 번져갑니다.', options: [
        { label: '소란을 번지게 한다', sub: '다음 전투 첫 라운드 적 전원 결투 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: -1, side: 'evil' }) },
        { label: '지나친다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'hornburg', title: '헬름 협곡의 메아리', text: '협곡에서 돌아온 선포자가 전합니다 — 성벽 아래 적의 보급 마차를 노획할 수 있습니다.', options: [
        { label: '노획한다', sub: '금화 +35 · 다음 전투 첫 라운드 적 전원 이동 −1인치', fx: q => { q.gold += 35; (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'evil' }); } },
        { label: '노리지 않는다', sub: '아무 일도 없다', fx: q => { } }] }
    ,{ id: 'bombadil', title: '톰 봄바딜의 오두막', text: '노란 부츠와 노랫소리 — "딩동딜릴로!" 옛숲의 주인이 이방인들을 환영합니다.', options: [
        { label: '함께 쉬어간다', sub: '금화 −10 · 상처 입은 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 10); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '노래 선물을 받는다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) }] },
    { id: 'balin', title: '발린의 무덤', text: '모리아의 기록실, 흩어진 뼈와 낡은 책. "그들이 온다" — 마지막 구절 아래 드워프의 유품이 남았습니다.', options: [
        { label: '유품을 수습한다', sub: '금화 +30', fx: q => q.gold += 30 },
        { label: '드워프의 맹세를 잇는다', sub: '무작위 아군 결투 +1 · 완치 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.currentWounds = t.stats.wounds; q.refreshUnit(t); } } }] },
    { id: 'mirror', title: '갈라드리엘의 거울', text: '은빛 대야 속에 있었던 일, 있는 일, 그리고 올 수 있는 일이 어립니다.', options: [
        { label: '들여다본다', sub: '다음 전투 첫 라운드 적 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'evil' }) },
        { label: '뒤돌아선다', sub: '금화 +20', fx: q => q.gold += 20 }] },
    { id: 'evenstar', title: '이븐스타의 부적', text: '새벽별의 빛이 담긴 은 부적 — 죽음의 시간조차 거슬러 돌려주는 자들의 표식입니다.', options: [
        { label: '영웅에게 건넨다', sub: '무작위 영웅 Fate +1 (영구)', fx: q => { const hs = q.alive('good').filter(u => u.traits.includes('hero')); const t = hs[Math.floor(q.rng() * hs.length)]; if (t) { t.baseStats.fate = (t.baseStats.fate || 0) + 1; t.resources.fate = (t.resources.fate || 0) + 1; } } },
        { label: '판매한다', sub: '금화 +40', fx: q => q.gold += 40 }] },
    { id: 'numenor', title: '누메노르의 유물', text: '바다 아래 가라앉은 왕국의 고대 강철이 흙 속에서 드러났습니다. 아직도 서쪽의 빛이 서려 있습니다.', options: [
        { label: '벼려 전사에게 준다', sub: '무작위 아군 Attack +1 (영구)', fx: q => { const u = q.alive('good').filter(x => (x.stats.attacks || 1) < 4); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.attacks = (t.baseStats.attacks || 1) + 1; q.refreshUnit(t); } } },
        { label: '골동품 상인에게 판다', sub: '금화 +35', fx: q => q.gold += 35 }] },
    { id: 'gollum', title: '스메아골의 발자국', text: '진흙 위의 웃기는 발자국 — "우리 것!" 목소리가 멀어집니다. 끝까지 쫓을 수도, 무시할 수도 있습니다.', options: [
        { label: '끝까지 쫓는다', sub: '다음 전투 첫 라운드 적 전원 결투 −1 · 금화 +10', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: -1, side: 'evil' }); q.gold += 10; } },
        { label: '그냥 지나간다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'minstrel', title: '방랑 음유시인', text: '오래된 노래가 캠프파이어 위로 떠오릅니다 — 나라 잃은 왕과, 다시 돌아올 왕의 노래.', options: [
        { label: '전부 경청한다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) },
        { label: '주머니를 털어준다', sub: '금화 −5 · 무작위 아군 결투 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 5); const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; q.refreshUnit(t); } } }] },
    { id: 'grima', title: '회색 속삭임', text: '캠프 경계에서 의심의 속삭임이 들립니다 — "우리는 이미 졌다." 사기가 흔들립니다.', options: [
        { label: '속삭임을 끊는다', sub: '금화 −10', fx: q => q.gold = Math.max(0, q.gold - 10) },
        { label: '무시한다', sub: '무작위 영웅 용기 −1 (영구)', fx: q => { const hs = q.alive('good').filter(u => u.traits.includes('hero')); const t = hs[Math.floor(q.rng() * hs.length)]; if (t) { t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } } }] }
];
P.rollCampEvent = function () {
    this.rng || (this.rng = Ne(Date.now()));
    const pool = LWB_EVENTS.filter(e => !e.cond || e.cond(this));
    this.campEvent = pool[Math.floor(this.rng() * pool.length)] || null;
};
P.chooseEvent = function (i) {
    if (this.phase !== 'reward' || this.campStep !== 'event' || !this.campEvent)
        return false;
    const op = this.campEvent.options[i];
    if (!op)
        return false;
    if (op.fx)
        op.fx(this);
    this.emit('CampEvent', `${this.campEvent.title} — ${op.label}`);
    this.campEvent = null;
    this.campStep = 'recruit';
    this.save();
    return true;
};
const __lwbResume = P.resume;
P.resume = function () {
    const r = __lwbResume.apply(this, arguments);
    if (this.campStep === 'event' && !this.campEvent)
        this.rollCampEvent();
    return r;
};
P.recruit = function (i) {
    const offer = this.recruitOffers[i];
    if (this.phase !== 'reward' || this.campStep !== 'recruit' || !offer || offer.bought || this.permanent().length >= this.capacity() || this.gold < this.price(offer.id))
        return false;
    const u = this.spawn(offer.id, 'good', { x: -1000, y: -1000 });
    if (!this.placeInDeployment(u)) {
        this.units.pop();
        return false;
    }
    this.gold -= this.price(offer.id);
    offer.bought = true;
    this.save();
    return true;
};
P.reroll = function () { const cost = 10 + this.rerolls * 5; if (this.phase !== 'reward' || this.campStep !== 'recruit' || this.gold < cost)
    return false; this.gold -= cost; this.rerolls++; this.initialDraft ? this.rollInitialRecruits() : this.rollRecruits(); this.save(); return true; };
P.expand = function () { const cost = 45 + this.capacityBought * 25; if (this.phase !== 'reward' || this.gold < cost || this.capacity() >= 30)
    return false; this.gold -= cost; this.capacityBought++; this.save(); return true; };
P.rollRelics = function () {
    const pool = CX.relics.filter(r => r.rarity !== 3 || !this.rank(r.id));
    const weighted = pool.map(r => ({ id: r.id, k: -Math.log(Math.max(.00001, this.rng())) / [1, .75, .42, Math.min(.32, .035 + this.wave * .015)][r.rarity] }));
    this.relicChoices = weighted.sort((a, b) => a.k - b.k).slice(0, 3).map(x => x.id);
};
P.chooseRelic = function (id) {
    if (this.phase !== 'reward' || this.campStep !== 'relic' || !this.relicChoices.includes(id) || this.chosenRelic)
        return false;
    this.relics[id] = (this.relics[id] || 0) + 1;
    this.chosenRelic = id;
    this.campStep = 'ready';
    for (const u of this.alive())
        this.refreshUnit(u);
    this.save();
    return true;
};
P.leaveCamp = function () { if (this.phase !== 'reward' || this.campStep !== 'ready')
    return false; this.units = this.units.filter(u => u.side === 'good' && u.alive && !u.temporary); this.prepareStage(); this.save(); return true; };
P.save = function () {
    if (!['reward', 'preparation'].includes(this.phase))
        return;
    const keys = ['gold', 'relics', 'capacityBought', 'totalKills', 'mithrilSpent', 'wave', 'cleared', 'units', 'counter', 'mode', 'best', 'campStep', 'campEvent', 'nextRoundBuffs', 'recruitOffers', 'relicChoices', 'chosenRelic', 'rerolls', 'lastGold', 'recruitDraft', 'initialDraft', 'horses'];
    const state = { version: CX.version };
    for (const k of keys)
        state[k] = this[k];
    state.phase = this.phase;
    try {
        localStorage.setItem('mesbg-endless-save', JSON.stringify(state));
    }
    catch { }
};
P.resume = function () { try {
    const s = JSON.parse(localStorage.getItem('mesbg-endless-save'));
    if (s?.version !== CX.version || !Array.isArray(s.units) || !s.units.some(u => u.alive && u.side === 'good'))
        return false;
    Object.assign(this, s);
    this.events = [];
    this.log = [];
    this.terrain = structuredClone(ee);
    this.activeMoverUid = '';
    this.selected = this.alive('good')[0].uid;
    this.rng = Ne(Date.now());
    if (s.phase === 'preparation')
        this.prepareStage();
    return true;
}
catch {
    return false;
} };
const baseResume=P.resume;
P.resume=function(){
    if(!baseResume.call(this))return false;
    for(const u of this.units){const m=this.meta.get(u.id);if(!m)continue;
        u.radius=$t[m.base]||$t.M;
        u.visualRadius=m.visualRadius||u.radius;
    }
    return true;
};
const oldEndRun = P.endRun;
P.endRun = function (won, msg) { oldEndRun.call(this, won, msg); try {
    localStorage.removeItem('mesbg-endless-save');
}
catch { } };
P.faceOpponents = function () { }; // facing is controlled by movement, charge and an explicit rotate action
P.rotate = function (uid, degrees) { const u = this.unit(uid); if (!u || this.phase !== 'move' || !this.canAct(u) || this.engaged(u))
    return false; u.angle = (u.angle + degrees) % 360; return true; };
P.move = function (uid, to, target) {
    const u = this.unit(uid), v = this.unit(target);
    if (v?.traits.includes('terror') && u && !u.terrorTested && !u.protected && !(this.rank('phial') && this.alive(u.side).some(a => a.traits.includes('hero') && ht(a, u) < 270 + 45 * (this.rank('phial') - 1)))) {
        u.terrorTested = true;
        const score = Lt(this.rng) + Lt(this.rng) + u.stats.courage;
        if (score < 10) {
            u.feared=!0;this.emit('Terror', `${u.name} · 공포 검사 실패, 돌격 불가`);
            this.finishActivation(u);
            return false;
        }
    }
    return oldMove.call(this, uid, to, target);
};
P.skillReason = function (u) { const s = u && CX.skills[u.id]; if (!s)
    return '고유 능력 없음'; if (this.phase !== 'move' && this.phase !== 'shoot' && this.phase !== 'fight')
    return '전투 중 사용'; if (this.side !== u.side && this.phase !== 'fight')
    return '아군 차례에 사용'; if (u.skillRound)
    return '이번 라운드 사용 완료'; if (u.resources[s[1]] < s[2])
    return `${s[1] === 'will' ? 'Will' : 'Might'} 부족`; return ''; };
Object.assign(CX.skills, {
    eowyn: ['옥좌의 딸의 반격', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    eomer: ['로한 기수 돌격', 'might', 1, '6인치 내 기병 결투 +1, 이동력 +2인치.', { ally: { r: 360, trait: 'mounted', stats: { fight: 1, move: 90 } } }],
    faramir: ['이실리엔 명사수', 'might', 1, '이번 사격 단계 최대 3발.', { shots: 3 }],
    imrahil: ['돌 암로스의 기도', 'might', 1, '6인치 내 기병 결투 +1, 이동력 +2인치.', { ally: { r: 360, trait: 'mounted', stats: { fight: 1, move: 90 } } }],
    haldir: ['엘프 궁술', 'might', 1, '이번 사격 단계 최대 3발.', { shots: 3 }],
    galadriel: ['로스로리엔의 빛', 'will', 2, '6인치 내 아군 Defense +1, 공포 면역.', { ally: { r: 360, stats: { defence: 1 }, protect: true } }],
    elendil: ['높은 왕의 검', 'might', 1, '이번 라운드 힘 +2, Attack +1.', { self: { strength: 2, attacks: 1 } }],
    fingolfin: ['높은 왕의 도전', 'might', 1, '이번 라운드 결투 +2, Attack +1.', { self: { fight: 2, attacks: 1 } }],
    feanor: ['불의 영혼', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    beren: ['인간의 용기', 'might', 1, '이번 라운드 결투 +1, 용기 +3.', { self: { fight: 1, courage: 3 } }],
    luthien: ['운명의 노래', 'will', 2, '8인치 내 적 이동력 −90.', { foe: { r: 480, stats: { move: -90 } } }],
    thranduil: ['어둠숲의 왕', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    celeborn: ['로리엔의 군주', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    beorn: ['곰의 변신', 'might', 1, '이번 라운드 힘 +2, Attack +1.', { self: { strength: 2, attacks: 1 } }],
    beorning: ['변신', 'might', 1, '이번 라운드 힘 +2, Attack +1.', { self: { strength: 2, attacks: 1 } }],
    frodo: ['반지 운반자의 결의', 'will', 1, '이번 라운드 용기 +3, 공포 무시.', { self: { courage: 3 }, selfFlags: ['protected'] }],
    samwise: ['가지의 충성', 'might', 1, '이번 라운드 용기 +3, Attack +1.', { self: { courage: 3, attacks: 1 } }],
    merry: ['호빗의 용기', 'might', 1, '이번 라운드 용기 +2, Attack +1.', { self: { courage: 2, attacks: 1 } }],
    pippin: ['호빗의 용기', 'might', 1, '이번 라운드 용기 +2, Attack +1.', { self: { courage: 2, attacks: 1 } }],
    bilbo: ['운명의 행운', 'might', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    mt_captain: ['미나스 티리스의 지휘', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    nazgul_sword: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_sword_2: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_mace: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_mounted: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    dwimmerlaik: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    khamul: ['동쪽의 그림자', 'will', 1, '8인치 내 적 결투 −1.', { foe: { r: 480, stats: { fight: -1 } } }],
    mouth_of_sauron: ['어둠의 협상가', 'will', 1, '8인치 내 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    lurtz: ['우르크 출사표', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    sharku: ['워그 전주', 'might', 1, '6인치 내 기병 이동력 +60.', { ally: { r: 360, trait: 'mounted', stats: { move: 60 } } }],
    uruk_captain: ['우르크의 전진', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    orc_captain: ['오크의 위협', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    orc_taskmaster: ['채찍질', 'might', 1, '6인치 내 아군 이동력 +45.', { ally: { r: 360, stats: { move: 45 } } }],
    goblin_king: ['고블린 왕의 명령', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    bolg: ['볼그의 분노', 'might', 1, '이번 라운드 힘 +1, Attack +1.', { self: { strength: 1, attacks: 1 } }],
    easterling_warlord: ['동부인의 규율', 'might', 1, '6인치 내 아군 결투 +1, Defense +1.', { ally: { r: 360, stats: { fight: 1, defence: 1 } } }],
    harad_chieftain: ['하라드의 전장 함성', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    king_of_the_dead: ['저주받은 왕의 서약', 'will', 1, '8인치 내 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    grima: ['독설', 'will', 1, '10인치 내 가장 강한 적 Attack −1.', { foeStrongest: { attacks: -1 } }],
    radagast: ['갈색의 요술사', 'will', 2, '6인치 내 상처 입은 아군 2기 회복.', { heal: { r: 360, n: 2 } }],
    barrow_wight: ['고대 무덤의 냉기', 'will', 1, '8인치 내 적 이동력 −45.', { foe: { r: 480, stats: { move: -45 } } }],
    melkor: ['발라의 주인', 'will', 2, '6인치 내 적 3기에 타격.', { strike: { r: 360, n: 3 } }],
    witchking_foot: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    witchking_foot_mace: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    witchking_mounted: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    muzgur: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    aragorn_mounted: ['왕의 결의', 'might', 1, '이번 라운드 Attack +1.', { self: { attacks: 1 }, selfFlags: ['anduril'] }],
    gandalf_mounted: ['백색의 수호', 'will', 2, '6인치 내 아군 Defense +2.', { ally: { r: 360, stats: { defence: 2 }, protect: true } }],
    theoden_mounted: ['세오덴의 진군', 'might', 1, '6인치 내 기병 이동력 +90, 결투 +1.', { ally: { r: 360, trait: 'mounted', stats: { move: 90, fight: 1 } } }],
    thranduil_mounted: ['어둠숲의 왕', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    bard: ['용의 화살', 'might', 1, '이번 사격 단계 최대 3발.', { shots: 3 }],
    tauriel: ['실바난 명궁', 'might', 1, '이번 사격 단계 최대 2발.', { shots: 2 }],
    beleg: ['쿠말리온', 'might', 1, '이번 사격 단계 최대 3발.', { shots: 3 }],
    turin: ['구르탕', 'might', 1, '이번 라운드 Attack +1, 힘 +1.', { self: { attacks: 1, strength: 1 } }],
    azog: ['창백한 오크의 명령', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    necromancer: ['어둠의 환영', 'will', 2, '8인치 내 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    gil_galad: ['높은 왕의 창', 'might', 1, '이번 라운드 결투 +2, Attack +1.', { self: { fight: 2, attacks: 1 } }],
    arwen: ['엘프의 축복', 'will', 1, '6인치 내 상처 입은 아군 1기 회복.', { heal: { r: 360, n: 1 } }],
    cirdan: ['항구의 장로', 'will', 1, '6인치 내 상처 입은 아군 1기 회복.', { heal: { r: 360, n: 1 } }],
    gamling: ['왕가의 기수', 'might', 1, '6인치 내 기병 결투 +1.', { ally: { r: 360, trait: 'mounted', stats: { fight: 1 } } }],
    halbarad: ['왕의 군기', 'might', 1, '6인치 내 아군 결투 +1, 용기 +1.', { ally: { r: 360, stats: { fight: 1, courage: 1 } } }],
    beregond: ['성문 근위', 'might', 1, '이번 라운드 Defense +2.', { self: { defence: 2 } }],
    elladan: ['엘론드의 쌍둥이', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    elrohir: ['엘론드의 쌍둥이', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    grimbeorn: ['곰 가문의 분노', 'might', 1, '이번 라운드 힘 +1, Attack +1.', { self: { strength: 1, attacks: 1 } }],
    suladan: ['뱀의 전군', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    shagrat: ['시릿 웅골의 책임자', 'might', 1, '이번 라운드 Attack +1, 용기 +2.', { self: { attacks: 1, courage: 2 } }],
    gorbag: ['시릿 웅골의 책임자', 'might', 1, '이번 라운드 Attack +1, 용기 +2.', { self: { attacks: 1, courage: 2 } }],
    boldog: ['오크 전장군', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    thorin: ['오큰실드', 'might', 1, '이번 라운드 Defense +1, 결투 +1.', { self: { defence: 1, fight: 1 } }],
    mahud_chieftain: ['마후드 전쟁 경적', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    forlong: ['늙은 도끼', 'might', 1, '이번 라운드 Attack +1.', { self: { attacks: 1 } }],
    mablung: ['도리아스의 척후대장', 'might', 1, '6인치 내 아군 궁수 명중 필요값 −1.', { ally: { r: 360, stats: { shootValue: -1 } } }],
    rumil: ['로리엔의 명궁', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    orophin: ['로리엔의 명궁', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    turgon: ['곤돌린의 왕', 'might', 1, '이번 라운드 결투 +1, Defense +2.', { self: { fight: 1, defence: 2 } }],
    ecthelion: ['샘물의 군주', 'might', 1, '이번 라운드 결투 +2, 힘 +1.', { self: { fight: 2, strength: 1 } }],
    fingon: ['핑곤의 기상', 'might', 1, '이번 라운드 결투 +1, 용기 +2.', { self: { fight: 1, courage: 2 } }],
    maedhros: ['마이드로스의 분노', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    celegorm: ['위대한 사냥꾼', 'might', 1, '이번 라운드 Attack +1, 힘 +1.', { self: { attacks: 1, strength: 1 } }],
    finrod_felagund: ['노래 대결', 'will', 1, '6인치 내 적 용기 −1, 결투 −1.', { foe: { r: 360, stats: { courage: -1, fight: -1 } } }],
    tuor: ['울모의 축복', 'will', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    hurin_thalion: ['죽지 않는 분노', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    thingol: ['은빛 왕의 위엄', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    tom_bombadil: ['봄바딜의 노래', 'will', 1, '6인치 내 적 이동 −90, 결투 −1.', { foe: { r: 360, stats: { move: -90, fight: -1 } } }],
    goldberry: ['강의 딸의 노래', 'will', 1, '6인치 내 아군 상처 1 회복.', { heal: { r: 360, n: 1 } }],
    isildur: ['나르실의 일격', 'might', 1, '이번 라운드 결투 +2, Attack +1.', { self: { fight: 2, attacks: 1 } }],
    denethor: ['집정관의 명령', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    dain: ['아이언 힐의 도끼', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    fili: ['두린의 혈통', 'might', 1, '이번 라운드 결투 +1, 용기 +2.', { self: { fight: 1, courage: 2 } }],
    kili: ['젊은 사냥꾼', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    balin: ['모리아의 군주', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    dwalin: ['드왈린의 망치', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    gloin: ['불꽃의 혈통', 'might', 1, '이번 라운드 힘 +1, 결투 +1.', { self: { strength: 1, fight: 1 } }],
    erestor: ['리븐델의 책임자', 'might', 1, '6인치 내 아군 용기 +1.', { ally: { r: 360, stats: { courage: 1 } } }],
    lindir: ['리븐델의 노래', 'will', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    damrod: ['이실리엔의 추격', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    duinhir: ['검은 뿌리 골짜기 매복', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    elfhelm: ['로한 기마대장', 'might', 1, '6인치 내 기병 이동 +60, 결투 +1.', { ally: { r: 360, trait: 'mounted', stats: { move: 60, fight: 1 } } }],
    erkenbrand: ['서쪽 골짜기의 주인', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    ugluk: ['우르크 전장군', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    mauhur: ['추격자', 'might', 1, '이번 라운드 이동 +120, 결투 +1.', { self: { move: 120, fight: 1 } }],
    vrasku: ['우르크 명사수', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    dark_marshal: ['어둠의 장막', 'will', 1, '6인치 내 적 결투 −1.', { foe: { r: 360, stats: { fight: -1 } } }],
    shadow_lord: ['그림자 포위', 'will', 1, '6인치 내 적 용기 −1, 결투 −1.', { foe: { r: 360, stats: { courage: -1, fight: -1 } } }],
    betrayer: ['배신의 칼날', 'might', 1, '이번 라운드 결투 +2.', { self: { fight: 2 } }],
    tainted: ['타락한 힘', 'will', 1, '이번 라운드 힘 +2.', { self: { strength: 2 } }],
    undying: ['불사의 저주', 'will', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    knight_of_umbar: ['움바르의 돌격', 'might', 1, '이번 라운드 결투 +1, 힘 +1.', { self: { fight: 1, strength: 1 } }],
    warg_chieftain: ['워그 우두머리', 'might', 1, '6인치 내 기병 이동 +90.', { ally: { r: 360, trait: 'mounted', stats: { move: 90 } } }]
});
CX.skills.fingolfin_mounted = CX.skills.fingolfin;
CX.skills.boromir_mounted = CX.skills.boromir;
CX.skills.eowyn_mounted = CX.skills.eowyn;
CX.skills.faramir_mounted = CX.skills.faramir;
CX.skills.imrahil_mounted = CX.skills.imrahil;
CX.skills.elrond_mounted = CX.skills.elrond;
CX.skills.gandalf_white = CX.skills.gandalf;
CX.skills.gandalf_white_mounted = CX.skills.gandalf;
CX.skills.aragorn_blackgate = CX.skills.aragorn;
CX.skills.aragorn_blackgate_mounted = CX.skills.aragorn;
CX.skills.theoden_foot = CX.skills.theoden;
CX.skills.dain_boar = CX.skills.dain;
CX.skills.azog_warg_rider = CX.skills.azog;
CX.skills.witchking_mounted_sheet = CX.skills.witchking_mounted;
CX.skills.eomer_foot = CX.skills.eomer;
const __lwbSkillStart = P.start;
P.start = function (m) {
    __lwbSkillStart.call(this, m);
    const WIZ = ['마법 화살', 'will', 1, '8인치 내 적 1기에 타격.', { strike: { r: 480, n: 1 } }];
    const BOW = ['명사수', 'might', 1, '이번 사격 단계 최대 2발.', { shots: 2 }];
    const LEAD = ['전장 지휘', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }];
    const DUEL = ['영웅적 돌격', 'might', 1, '이번 라운드 결투 +1.', { self: { fight: 1 } }];
    for (const id of Object.keys(zt)) {
        const p = zt[id];
        if (!p || !p.traits.includes('hero') || CX.skills[id])
            continue;
        const nm = (this.meta.get(id) && this.meta.get(id).name_ko) || '';
        CX.skills[id] = p.traits.includes('wizard') || /요술|마법|주술/.test(nm) ? WIZ : /궁수|명사수|사수|활/.test(nm) ? BOW : /왕|대장|지도관|장군|군주|전주|주|영주|captain/i.test(nm) ? LEAD : DUEL;
    }
};
P.heroic = function (uid, key) {
    const u = this.unit(uid);
    if (!u || !u.alive || u.side !== 'good' || !u.traits.includes('hero') || (u.resources.might || 0) < 1 || (u.heroics || {})[key])
        return false;
    const T = {
        strike: () => { u.roundBuff.fight = (u.roundBuff.fight || 0) + 1; },
        defence: () => { u.roundBuff.defence = (u.roundBuff.defence || 0) + 2; },
        shoot: () => { u.shotsLeft = (u.shotsLeft || 0) + 1; u.precise = true; },
        move: () => { u.roundBuff.move = (u.roundBuff.move || 0) + 90; u.movementSpent = Math.max(0, (u.movementSpent || 0) - 90); },
    };
    if (!T[key])
        return false;
    u.resources.might--;
    (u.heroics || (u.heroics = {}))[key] = true;
    T[key]();
    this.refreshUnit(u);
    const N = { strike: '선공돌격', defence: '강철수비', shoot: '연속사격', move: '영웅의 질주' };
    this.emit('Heroic', u.name + ' — 영웅 행동 · ' + N[key]);
    this.save();
    return true;
};
P.skill = function (uid) {
    const u = this.unit(uid);
    if (this.skillReason(u))
        return false;
    const [name, resource, cost] = CX.skills[u.id];
    u.resources[resource] -= cost;
    u.skillRound = true;
    const near = this.alive(u.side).filter(v => ht(v, u) <= 360), foes = this.alive(Ht(u.side)).filter(v => ht(v, u) <= 450);
    const buff = (v, k, n) => { v.roundBuff[k] = (v.roundBuff[k] || 0) + n; this.refreshUnit(v); };
    if (u.id === 'aragorn') {
        buff(u, 'attacks', 1);
        u.anduril = true;
    }
    if (u.id === 'gimli')
        buff(u, 'attacks', 2);
    if (u.id === 'boromir') {
        near.forEach(v => buff(v, 'fight', 1));
        foes.filter(v => ht(v, u) < v.radius + u.radius + 5).forEach(v => { if (Lt(this.rng) + Lt(this.rng) + v.stats.courage < 10)
            buff(v, 'attacks', -1); });
    }
    if (u.id === 'legolas') {
        u.shotsLeft = 3;
        u.precise = true;
    }
    if (u.id === 'gandalf') {
        near.forEach(v => { buff(v, 'defence', 2); v.protected = true; });
        const v = foes.sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (v) {
            const push = De(v, [u], this.alive(), this.terrain, 90);
            Object.assign(v, push.to);
            buff(v, 'move', -90);
        }
    }
    if (u.id === 'theoden')
        near.filter(v => v.traits.includes('mounted')).forEach(v => { buff(v, 'move', 90); buff(v, 'fight', 1); });
    if (u.id === 'elrond') {
        near.filter(v => v.currentWounds < v.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds)).slice(0, 2).forEach(v => v.currentWounds++);
        buff(u, 'fight', 1);
    }
    if (u.id.startsWith('glorfindel')) {
        buff(u, 'strength', 1);
        near.forEach(v => v.protected = true);
    }
    if (u.id === 'witchking_fellbeast')
        foes.forEach(v => { buff(v, 'fight', -1); buff(v, 'move', -90); });
    if (u.id === 'saruman') {
        const v = foes.sort((a, b) => b.stats.attacks - a.stats.attacks)[0];
        if (v) {
            buff(v, 'attacks', -1);
            buff(v, 'move', -v.stats.move / 2);
        }
    }
    if (u.id === 'sauron')
        foes.filter(v => ht(v, u) < 270).forEach(v => { if (Lt(this.rng) >= oe(6, v.stats.defence))
            this.inflict(u, v, 1); });
    if (u.id === 'gothmog')
        near.forEach(v => buff(v, 'fight', 1));
    const fxd = CX.skills[u.id] && CX.skills[u.id][4];
    if (fxd) {
        const sb = (t2, o) => { for (const k in o) buff(t2, k, o[k]); };
        const inR = (list, r) => list.filter(t2 => ht(t2, u) <= r);
        if (fxd.self) sb(u, fxd.self);
        if (fxd.selfFlags) fxd.selfFlags.forEach(k => u[k] = !0);
        if (fxd.ally) inR(near, fxd.ally.r || 360).filter(t2 => !fxd.ally.trait || t2.traits.includes(fxd.ally.trait)).forEach(t2 => { sb(t2, fxd.ally.stats || {}); if (fxd.ally.protect) t2.protected = !0; });
        if (fxd.foe) inR(foes, fxd.foe.r || 450).forEach(t2 => sb(t2, fxd.foe.stats || {}));
        if (fxd.foeStrongest) { const t2 = foes.sort((a, b) => b.stats.attacks - a.stats.attacks)[0]; if (t2) sb(t2, fxd.foeStrongest); }
        if (fxd.heal) inR(near, fxd.heal.r || 360).filter(t2 => t2.currentWounds < t2.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds)).slice(0, fxd.heal.n || 1).forEach(t2 => t2.currentWounds++);
        if (fxd.strike) inR(foes, fxd.strike.r || 450).slice(0, fxd.strike.n || 1).forEach(t2 => this.inflict(u, t2, fxd.strike.dmg || 1));
        if (fxd.shots) { u.shotsLeft = fxd.shots; u.precise = !0; }
        if (fxd.push) { const t2 = foes.sort((a, b) => ht(a, u) - ht(b, u))[0]; if (t2) { const ps = De(t2, [u], this.alive(), this.terrain, fxd.push); Object.assign(t2, ps.to); } }
    }
    this.emit('HeroSkill', `${u.name} · ${name}`, { uid: u.uid });
    this.checkRun();
    return true;
};
// Apply prevention before deaths and XP, so saved heroes never count as casualties.
P.applyCombat = function (result) {
    result.wounds = [];
    result.kills = [];
    for (const s of result.strikeResults) {
        const u = this.unit(s.target), a = this.unit(s.attacker);
        if (!u?.alive)
            continue;
        if (s.wound && u.side === 'good' && this.rank('nenya') && !u.nenyaUsed) {
            u.nenyaUsed = true;
            if (Lt(this.rng) >= 5) {
                s.wound = false;
                s.prevented = '네냐';
            }
        }
        if (s.wound && u.resources?.fate > 0) {
            u.resources.fate--;
            if (Lt(this.rng) >= 4) {
                s.wound = false;
                s.prevented = 'Fate';
            }
        }
        if (s.wound && u.currentWounds <= 1 && u.side === 'good' && u.traits.includes('hero') && this.rank('mithril') && !this.mithrilSpent) {
            this.mithrilSpent = true;
            s.wound = false;
            s.prevented = '미스릴 셔츠';
        }
        if (s.wound && u.id === 'morgoth') {
            const gate = u.bossPhase === 1 ? Math.ceil(u.stats.wounds * .66) : u.bossPhase === 2 ? Math.ceil(u.stats.wounds * .33) : 0;
            if (u.currentWounds <= gate)
                s.wound = false;
        }
        s.killed = !!s.wound && u.currentWounds === 1;
        const single = { ...result, strikeResults: [s], pushVectors: [] };
        oldApply.call(this, single);
        if (s.wound)
            result.wounds.push(u.uid);
        if (s.killed) {
            result.kills.push(u.uid);
            if (a?.side === 'good')
                this.totalKills = (this.totalKills || 0) + 1;
        }
        if (s.prevented)
            this.emit('Saved', `${u.name} · ${s.prevented}로 상처 Defense`);
    }
    for (const p of result.pushVectors) {
        const u = this.unit(p.uid);
        if (u?.alive)
            Object.assign(u, p.to);
    }
};
// Add spear support and relic synergies around the retained multi-fight solver.
const baseFight = Ue;
Ue = function (group, all, terrain, priority, rng) {
    const saved = all.map(u => [u, u.stats, structuredClone(u.roundBuff || {})]);
    for (const u of all) {
        u.stats = { ...u.stats };
        if (u.side === 'good' && u.traits.includes('gondor') && q.rank('banner') && all.some(v => v !== u && v.side === u.side && v.traits.includes('gondor') && ht(u, v) < u.radius + v.radius + 90))
            u.stats.defence += q.rank('banner');
        if (u.side === 'good' && u.traits.includes('hero') && group.filter(v => Vt(u, v)).length >= 2)
            u.stats.fight += q.rank('horn');
        if (u.side === 'good' && q.rank('warbanner') && all.some(h => h !== u && h.side === 'good' && h.alive && h.traits.includes('hero') && ht(h, u) <= 360))
            u.stats.fight += 1;
    }
    const links = supportFor(group, all);
    const supports = links.map(l => l.unit);
    // Spear/pike support links: one supporter per front; pikes may hold a second rank.
    const participating = group.map(u => ({ ...u, stats: { ...u.stats } }));
    for (const l of links) {
        const front = participating.find(v => v.uid === l.front.uid);
        if (front) {
            front.stats.attacks++;
            front.stats.fight = Math.max(front.stats.fight, l.unit.stats.fight);
        }
    }
    const result = baseFight(participating, all, terrain, priority, rng);
    result.supports = supports.map(u => u.uid);
    result.supportLinks = links.map(l => ({ unit: l.unit.uid, front: l.front.uid, via: l.via.uid, rank: l.rank }));
    // A winning side's supporters each roll one strike against a loser still in contact with their front.
    for (const l of links) {
        const support = l.unit;
        if (support.side !== result.winnerSide) continue;
        const foes = participating.filter(v => v.side === Ht(support.side) && Vt(l.front, v));
        if (!foes.length) continue;
        const foe = foes.slice().sort((a, b) => a.stats.defence - b.stats.defence)[0];
        let pool = foe.currentWounds - result.wounds.filter(w => w === foe.uid).length;
        if (pool <= 0) continue;
        const roll = Lt(rng), needed = oe(support.stats.strength, foe.stats.defence),
            trapped = (result.trappedUnits || []).includes(foe.uid) || (result.knockedDownUnits || []).includes(foe.uid);
        if (roll >= needed) {
            const hits = trapped ? 2 : 1;
            for (let n = 0; n < hits && pool > 0; n++) { result.wounds.push(foe.uid); pool--; }
            result.strikeResults.push({ attacker: support.uid, target: foe.uid, roll, needed, wound: true, killed: pool <= 0, support: true });
            if (pool <= 0) result.kills.push(foe.uid);
        } else result.strikeResults.push({ attacker: support.uid, target: foe.uid, roll, needed, wound: false, killed: false, support: true });
    }
    result.fightValues = { good: Math.max(...participating.filter(u => u.side === 'good').map(u => u.stats.fight)), evil: Math.max(...participating.filter(u => u.side === 'evil').map(u => u.stats.fight)) };
    // Might is a deliberate pre-fight stance, selected through the hero UI.
    for (const strike of result.strikeResults) {
        const a = all.find(u => u.uid === strike.attacker);
        if (a?.side === 'good' && a.traits.includes('hero')) {
            const bonus = a.stageStrikes === 0 ? q.rank('narsil') : 0;
            if (a.anduril)
                strike.needed = Math.min(4, strike.needed);
            strike.wound = strike.roll + bonus >= strike.needed;
            a.stageStrikes++;
        }
    }
    for (const [u, stats] of saved)
        u.stats = stats;
    return result;
};
const baseShot = Xe;
Xe = function (a, target, terrain, rng, all) {
    const stats = a.stats, moved = a.moved;
    a.stats = { ...stats };
    if (a.side === 'good' && q.rank('quiver') && a.movementSpent <= a.stats.move / 2)
        a.moved = false;
    if (a.precise) {
        a.stats.shootValue = 2;
        a.moved = false;
    }
    if (target.side === 'good' && target.traits.includes('ranger') && q.rank('cloak') && ht(a, target) > Math.max(90, 360 - 45 * (q.rank('cloak') - 1)))
        a.stats.shootValue++;
    const result = baseShot(a, target, terrain, rng, all);
    a.stats = stats;
    a.moved = moved;
    const s = result.strikeResults[0];
    if (a.side === 'good' && a.stageShots === 0 && q.rank('arrow') && target.traits.includes('monster') && s.hit >= s.hitNeeded)
        s.wound = s.roll + 1 + q.rank('arrow') >= s.needed;
    s.killed = s.wound && target.currentWounds === 1;
    a.stageShots++;
    return result;
};
P.shoot = function (uid, target) { const u = this.unit(uid); const multi = u?.precise && u.shotsLeft > 1; if (!multi)
    return oldShoot.call(this, uid, target); const v = this.unit(target); if (this.phase !== 'shoot' || !this.canAct(u) || !this.validTargets(u).includes(v))
    return false; const r = Xe(u, v, this.terrain, this.rng, this.alive()); this.applyCombat(r); u.shotsLeft--; this.emit('ShotFired', `${u.name} · 남은 화살 ${u.shotsLeft}`, { result: r }); this.checkRun(); return true; };
// Enemy movement evaluates role, engagement, objectives and ranged spacing.
be = function (b, u) {
    if (b.engaged(u) || b.remaining(u) < 12)
        return null;
    const enemies = b.alive(Ht(u.side)), friends = b.alive(u.side);
    if (!enemies.length)
        return null;
    const ranged = u.stats.shootRange > 0 || u.traits.includes('wizard');
    let target = enemies.slice().sort((a, c) => ht(u, a) - ht(u, c))[0];
    if (u.traits.includes('mounted'))
        target = enemies.slice().sort((a, c) => (a.stats.shootRange ? -250 : 0) + ht(u, a) - (c.stats.shootRange ? -250 : 0) - ht(u, c))[0];
    const charges = enemies.map(v => ({ v, p: ue(u, v) })).filter(v => ie(u, v.p, b.alive(), b.terrain, b.remaining(u)));
    if (charges.length && !ranged)
        return charges.sort((a, c) => ht(u, a.v) - ht(u, c.v))[0].p;
    if (ranged && ht(u, target) > 300 && b.validTargets(u).length)
        return null;
    let goal = target;
    if (['hold', 'defense', 'rescue'].includes(b.mission) && u.side === 'evil' && !u.traits.includes('monster') && !u.traits.includes('hero'))
        goal = Mt.objective;
    if (['defense', 'hold', 'rescue'].includes(b.mission) && u.side === 'good' && ht(u, target) > 330)
        goal = Mt.objective; // defenders hold the line until the enemy closes
    if (u.traits.includes('spear'))
        goal = friends.filter(v => v !== u && !v.stats.shootRange).sort((a, c) => ht(a, target) - ht(c, target))[0] || target;
    let best = null, score = Infinity;
    for (const d of [b.remaining(u), b.remaining(u) * .7, b.remaining(u) * .4])
        for (let i = 0; i < 24; i++) {
            const angle = i * Math.PI / 12, p = { x: u.x + Math.cos(angle) * d, y: u.y + Math.sin(angle) * d };
            if (!ie(u, p, b.alive(), b.terrain, b.remaining(u)))
                continue;
            let value = ranged ? Math.abs(ht(p, target) - Math.min(u.stats.shootRange || 500, 570)) + (_t(p, target, b.terrain) === 'blocked' ? 300 : 0) : ht(p, goal);
            if (u.traits.includes('mounted'))
                value -= Math.abs(p.x - 1165) * .08;
            if (value < score) {
                score = value;
                best = p;
            }
        }
    return best;
};
const baseAI = He;
He = function (b) { const u = b.eligible()[0]; if (u && CX.skills[u.id] && !b.skillReason(u))
    b.skill(u.uid); baseAI(b); };
const campaignOldDismount = P.dismount;
P.dismount = function (u) { campaignOldDismount.call(this, u); u.baseStats = structuredClone(u.stats); this.refreshUnit(u); };
// Mobile clarity 1.2: jumpable low barriers, stronger combat AI, and working relics.
const lowBarrier=t=>t.active&&t.kind==='cover'&&t.h<=70&&t.w<=230;
function firstJumpOnPath(path,terrain){
    for(let i=1;i<path.length;i++){
        const a=path[i-1],b=path[i],steps=Math.ceil(ht(a,b)/3);
        for(let j=1;j<=steps;j++){
            const p={x:a.x+(b.x-a.x)*j/steps,y:a.y+(b.y-a.y)*j/steps};
            const barrier=terrain.find(t=>lowBarrier(t)&&le(p,t));
            if(barrier)return{barrier,edge:{x:a.x+(b.x-a.x)*(j-1)/steps,y:a.y+(b.y-a.y)*(j-1)/steps}};
        }
    }
    return null;
}
const moveBeforeJump=P.move;
P.move=function(uid,to,charge){
    const u=this.unit(uid);
    if(!u||!this.canAct(u)||this.phase!=='move'||this.engaged(u))return false;
    const plan=ve(u,to,this.alive(),this.terrain,this.remaining(u),{snap:!charge,chargeTarget:charge&&this.unit(charge)});
    if(!plan)return false;
    const jump=firstJumpOnPath(plan.path,this.terrain);
    if(!jump)return moveBeforeJump.call(this,uid,to,charge);
    const roll=Math.min(6,Lt(this.rng)+(u.side==='good'?this.rank('elven_rope'):0));
    if(roll===1){
        const edge=Be(u,jump.edge,this.alive(),this.terrain,38);
        if(edge&&ht(u,edge)>1)moveBeforeJump.call(this,uid,edge);
        if(this.phase==='move'&&this.canAct(u))this.finishActivation(u);
        this.emit('JumpTest',`${u.name} · 장애물 넘기 ${roll} · 실패`,{uid,roll});
        return true;
    }
    const moved=moveBeforeJump.call(this,uid,to,charge);
    if(moved){
        u.movementSpent=Math.min(u.stats.move,u.movementSpent+45);
        this.emit('JumpTest',`${u.name} · 장애물 넘기 ${roll} · ${roll===6?'계속 이동':'이동 종료'}`,{uid,roll});
        if(this.phase==='move'&&this.canAct(u)&&(roll<6||this.remaining(u)<12))this.finishActivation(u);
    }
    return moved;
};
CX.relics.push(...[
    ['pipeweed','샤이어의 담뱃잎',1,'매 라운드 지휘력 +1. 중첩마다 +1.',1],
    ['athelas','아셀라스 잎',2,'전투 시작 시 가장 상처 입은 아군의 상처를 1 회복. 중첩마다 +1.',0],
    ['dwarf_axe','두린의 도끼날',1,'드워프의 힘 +1. 중첩마다 +1.',14],
    ['elf_bow','갈라드림 활시위',1,'궁수 사거리 +1인치. 중첩마다 +1인치.',15],
    ['ithilien_blade','이실리엔 단검',2,'레인저의 힘 +1. 중첩마다 +1.',4],
    ['westfold_shield','서부 변경 방패',2,'방패를 든 아군의 Defense +1. 중첩마다 +1.',8],
    ['rohan_standard','로한 기병기',2,'기병의 결투 수치 +1. 중첩마다 +1.',3],
    ['elven_rope','엘프제 밧줄',1,'낮은 장애물 넘기 주사위 +1. 중첩마다 +1.',1],
    ['anduril_hilt','안두릴의 칼자루',3,'아라곤의 Attack 횟수 +1. 원정 중 한 번만 획득.',10]
].map(([id,name,rarity,text,icon])=>({id,name,rarity,text,icon})));
const relicRefresh=P.refreshUnit;
P.refreshUnit=function(u){
    relicRefresh.call(this,u);
    if(u.side!=='good'||!u.baseStats)return;
    if(u.traits.includes('dwarf'))u.stats.strength+=this.rank('dwarf_axe');
    if(u.stats.shootRange)u.stats.shootRange+=45*this.rank('elf_bow');
    if(u.traits.includes('ranger'))u.stats.strength+=this.rank('ithilien_blade');
    if(/shield/.test(this.meta.get(u.id)?.weapon||''))u.stats.defence+=this.rank('westfold_shield');
    if(u.traits.includes('mounted'))u.stats.fight+=this.rank('rohan_standard');
    if(u.id==='aragorn')u.stats.attacks+=this.rank('anduril_hilt');
};
const relicRound=P.beginRound;
P.beginRound=function(){relicRound.call(this);if(['move','shoot'].includes(this.phase))this.cp+=this.rank('pipeweed');};
const relicWave=P.startWave;
P.startWave=function(){
    relicWave.call(this);
    if(this.phase==='reward'||this.phase==='result')return;
    const patient=this.alive('good').filter(u=>u.currentWounds<u.stats.wounds)
        .sort((a,b)=>(b.stats.wounds-b.currentWounds)-(a.stats.wounds-a.currentWounds))[0];
    if(patient&&this.rank('athelas')){
        patient.currentWounds=Math.min(patient.stats.wounds,patient.currentWounds+this.rank('athelas'));
        this.emit('Relic','아셀라스 · '+patient.name+' 회복');
    }
};
// The player AI looks for an attack first and only moves if that improves an attack.
be=function(b,u){
    if(b.engaged(u)||b.remaining(u)<12)return null;
    const foes=b.alive(Ht(u.side));if(!foes.length)return null;
    const ranged=!!u.stats.shootRange;
    const ranked=foes.slice().sort((a,c)=>(a.currentWounds===1?-60:0)+ht(u,a)-(c.currentWounds===1?-60:0)-ht(u,c));
    if(ranged&&b.validTargets(u).length)return null;
    if(!ranged){
        for(const foe of ranked){
            const point=ue(u,foe),plan=ve(u,point,b.alive(),b.terrain,b.remaining(u),{snap:false,chargeTarget:foe});
            if(plan&&plan.distance>=1)return plan.to;
        }
    }
    let best=null,bestScore=Infinity;
    const reach=b.remaining(u),closest=ranked[0],before=ht(u,closest);
    const options=[];
    for(const d of [reach,reach*.65,reach*.35]){
        for(let i=0;i<16;i++){
            const angle=i*Math.PI/8,p={x:u.x+Math.cos(angle)*d,y:u.y+Math.sin(angle)*d};
            if(!Et(u,p,b.alive(),b.terrain))continue;
            const enemy=ranked.slice().sort((a,c)=>ht(p,a)-ht(p,c))[0];
            const distance=ht(p,enemy),los=_t(p,enemy,b.terrain);
            const score=ranged
                ?(distance<=u.stats.shootRange&&los!=='blocked'?0:600)+Math.abs(distance-Math.min(u.stats.shootRange*.75,360))+.12*d
                :distance+.12*d;
            options.push({p,score});
        }
    }
    options.sort((a,c)=>a.score-c.score);
    for(const candidate of options.slice(0,7)){
        const plan=ve(u,candidate.p,b.alive(),b.terrain,reach,{snap:false});
        if(plan&&plan.distance>=12&&candidate.score<bestScore){bestScore=candidate.score;best=plan.to;}
    }
    if(!best)return null;
    if(ranged)return bestScore<600+Math.abs(before-Math.min(u.stats.shootRange*.75,360))-15?best:null;
    return ht(best,closest)<before-12?best:null;
};
He=function(b){
    const u=b.eligible()[0];if(!u){b.advance();return;}
    if(CX.skills[u.id]&&!b.skillReason(u)&&!b.engaged(u))b.skill(u.uid);
    if(b.phase==='move'){
        if(!u.stats.shootRange&&!b.engaged(u)){
            const foes=b.alive(Ht(u.side)).sort((a,c)=>ht(u,a)-ht(u,c));
            for(const foe of foes.slice(0,4)){if(b.charge(u.uid,foe.uid))return;}
        }
        const dest=be(b,u);
        if(!dest||!b.move(u.uid,dest))b.wait(u.uid);
    }else if(b.phase==='shoot'){
        const target=b.validTargets(u).sort((a,c)=>
            (c.currentWounds===1?2:0)-(a.currentWounds===1?2:0)||
            (c.traits.includes('hero')?1:0)-(a.traits.includes('hero')?1:0)||ht(u,a)-ht(u,c))[0];
        if(!target||!b.shoot(u.uid,target.uid))b.wait(u.uid);
    }
};
const MESBG_TIERS=[[100,'legendary','전설의 영웅'],[50,'epic','용맹의 영웅'],[26,'rare','강인의 영웅'],[0,'elite','하급 영웅']];
const isHeroUnit=(id,role)=>(zt[id]?.traits||[]).includes('hero')||role==='hero'||UnitCatalog[id]?.meta?.role==='hero';
const heroGrade=(id,pts,role)=>{if(isHeroUnit(id,role)){const p=pts??UnitCatalog[id]?.points??0;for(const[m,g]of MESBG_TIERS)if(p>=m)return g;}return(zt[id]?.traits||[]).includes('mounted')?'elite':'normal'};
const tierLabel=id=>{if(isHeroUnit(id)){const p=UnitCatalog[id]?.points??0;for(const[m,,n]of MESBG_TIERS)if(p>=m)return n}return gradeName[heroGrade(id)]};
const gradeName={normal:'일반',elite:'정예',rare:'희귀 영웅',epic:'영웅',legendary:'전설'};

const physicalHit=Ve.prototype.hit;
Ve.prototype.hit=function(p){
    const hero=this.b.alive().filter(u=>u.traits.includes('hero')&&ht(p,u)<=Math.max(u.radius+10,(u.visualRadius||u.radius)*1.12))
        .sort((a,b)=>ht(p,a)-ht(p,b))[0];
    return hero||physicalHit.call(this,p);
};
// Shared visual vocabulary: worn parchment, slate, moss, ember. No character substitutes.
const oldPreload = Ve.prototype.preload, oldCreate = Ve.prototype.create, oldSync = Ve.prototype.sync;
Ve.prototype.preload = function () {
    oldPreload.call(this);
    for (const name of CX.maps)
        this.load.image('map-' + name, this.asset('backgrounds/bg_' + name + '.png'));
    for (const name of ['slash', 'thrust', 'smash', 'shoot', 'cast', 'pounce', 'rally', 'clash', 'prone', 'terror', 'charge', 'halfmove'])
        this.load.image('fx-' + name, this.asset('effects/fx_' + name + '.png'));
    for (const [id, u] of q.meta)
        if (u.side !== 'terrain')
            this.load.image('base-' + id, this.asset(baseFile(u)));
    this.load.image('map-hq-osgiliath', this.asset('maps/ruins.jpg'));
    this.load.image('map-hq-gorgoroth', this.asset('maps/mordor.jpg'));
    this.load.image('map-hq-edoras', this.asset('maps/plains.jpg'));
    this.load.image('map-hq-amon_sul', this.asset('maps/plains.jpg'));
    for (const n of ['helms_deep', 'fangorn', 'moria', 'isengard', 'black_gate']) this.load.image('map-hq-' + n, this.asset('maps/' + n + '.jpg'));
};
Ve.prototype.drawMap = function () { this.backdrop = this.add.image(pt.width / 2, pt.height / 2, 'map-minas_tirith').setDisplaySize(pt.width, pt.height).setTint(0xb6b5a4); this.boundary = this.add.graphics().setDepth(2); this.objectiveLabel = this.add.text(0, 0, '', { fontFamily: 'Pretendard', fontSize: '22px', color: '#e7ddbd', backgroundColor: '#20231de6', padding: { x: 10, y: 6 } }).setOrigin(.5).setDepth(4); };
// Selection prefers the active unit, then the moving side, then the nearest base within reach.
Ve.prototype.hit = function (b) { const near = this.b.alive().filter(u => ht(b, u) <= u.radius + 10); near.sort((u, v) => ht(b, u) - (u.uid === this.b.selected ? 16 : u.side === this.b.side ? 8 : 0) - (ht(b, v) - (v.uid === this.b.selected ? 16 : v.side === this.b.side ? 8 : 0))); return near[0]; };
Ve.prototype.create = function () {
    oldCreate.call(this);
    const small = this.scale.width < 820;
    this.cameras.main.setZoom(small ? Math.max(.4, Math.min(.62, this.scale.width / 1350)) : Math.max(.48, Math.min(.76, this.scale.width / 1650)));
    this.cameras.main.centerOn(1165, 770);
    this.hoverBox = document.createElement('div');
    this.hoverBox.className = 'unit-tooltip hidden';
    document.querySelector('.field').append(this.hoverBox);
    this.input.addPointer(1);
    this.input.on('pointermove', p => {
        const u = this.hit({ x: p.worldX, y: p.worldY });
        this.chargeTarget = null;
        if (u && this.b.phase === 'move' && !p.isDown) {
            const sel = this.b.unit(this.b.activeMoverUid || this.b.selected);
            if (sel && sel.alive && sel.side === this.b.side && u.side !== sel.side && this.b.canAct(sel) && !this.b.engaged(sel)) {
                const plan = ve(sel, ue(sel, u), this.b.alive(), this.b.terrain, this.b.remaining(sel), { chargeTarget: u });
                this.chargeTarget = { u, plan };
                this.drawRings();
            }
        }
        if (!u || p.isDown) {
            this.hoverBox.classList.add('hidden');
            return;
        }
        const m = q.meta.get(u.id);
        this.hoverBox.innerHTML = `<b>${u.name}</b><span>${u.side === 'good' ? '아군' : '적군'} · ${isHeroUnit(u.id) ? tierLabel(u.id) + ' · ' : ''}${CX.roleNames[m.role] || m.role} 베이스</span><span>결투 ${u.stats.fight} / 힘 ${u.stats.strength} / Defense ${u.stats.defence}</span><span>${q.engaged(u) ? '교전 중' : u.acted ? '행동 완료' : '행동 가능'}${CX.skills[u.id] ? ' · ' + CX.skills[u.id][0] : ''}</span>`;
        this.hoverBox.style.left = Math.min(p.x + 18, this.scale.width - 230) + 'px';
        this.hoverBox.style.top = Math.max(5, Math.min(p.y + 18, this.scale.height - 115)) + 'px';
        this.hoverBox.classList.remove('hidden');
    });
    const oldUpdate = this.update.bind(this);
    this.update = function (t) {
        oldUpdate(t);
        const p1 = this.input.pointer1, p2 = this.input.pointer2;
        if (p1 && p2 && p1.isDown && p2.isDown) {
            const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            if (this._pinchD)
                this.cameras.main.setZoom(Ot.Math.Clamp(this.cameras.main.zoom * d / this._pinchD, .32, 1.9));
            this._pinchD = d;
            this.dragStart = void 0;
            this.preview = void 0;
            this.previewPlan = null;
        }
        else
            this._pinchD = 0;
    };
};
Ve.prototype.sync = function () {
    oldSync.call(this);
    if (!this.backdrop)
        return;
    const name = CX.maps[this.b.mapIndex || 0];
    this.backdrop.setTexture(MAP_HQ[name] || 'map-' + name).setTint(MAP_TINT[name] || (MAP_HQ[name] ? 0xffffff : 0xb6b5a4)).setDisplaySize(pt.width, pt.height);
    this.boundary.clear();
    // Soft stepped fog margins remain outside the legal base-center boundary.
    for (let i = 0; i < 5; i++) {
        const w = 5 + i * 5;
        this.boundary.lineStyle(w, 0x141b17, .10);
        this.boundary.strokeRect(8, 8, pt.width - 16, pt.height - 16);
    }
    this.boundary.fillStyle(0x111813, .55);
    this.boundary.fillRect(0, 0, 12, pt.height);
    this.boundary.fillRect(pt.width - 12, 0, 12, pt.height);
    this.boundary.fillRect(0, 0, pt.width, 25);
    this.boundary.fillRect(0, pt.height - 12, pt.width, 12);
    this.objectiveLabel.setBackgroundColor('rgba(0,0,0,0)').setStroke('#162027',3).setText(this.b.mission === 'defense' ? '방어선' : this.b.mission === 'hold' ? '거점 · 3라운드 확보' : this.b.mission === 'rescue' ? '포로 구출 지점' : this.b.mission === 'breakthrough' ? '남쪽 돌파선' : '').setPosition(Mt.objective.x, Mt.objective.y - 190).setVisible(this.b.phase !== 'menu');
    for (const u of this.b.alive()) {
        const c = this.tokens.get(u.uid);
        if (!c)
            continue;
        const sprite = c.getByName('token');
        if (!sprite.getData('baseSX')) {
            sprite.setData('baseSX', sprite.scaleX);
            sprite.setData('baseSY', sprite.scaleY);
            sprite.setData('cxy', __figCenterPx(this.textures.get(u.id).getSourceImage(), sprite.displayWidth, sprite.displayHeight));
        }
        if (!c.getByName('base')) {
            const key = 'base-' + u.id, base = this.textures.exists(key) ? this.add.image(0, 0, key).setDisplaySize(u.radius * 2.45, u.radius * 2.45).setName('base') : this.add.ellipse(0, 1, u.radius * 2.3, u.radius * 1.75, u.side === 'good' ? 0x87897a : 0x3a332c, .97).setStrokeStyle(2, u.side === 'good' ? 0xc9c4a8 : 0x6b4a3c).setName('base');
            c.addAt(base, 1);
        }
        sprite.setAlpha(1); // Spent units use the cached grayscale texture in the clarity adapter.
        c.getByName('label').setVisible(u.uid === this.b.selected || u.traits.includes('hero'));
        c.getByName('rim').setStrokeStyle(2, u.side === 'good' ? 0xded9bf : 0x8a5a45, .9);
    }
};
function __figCenterPx(img, dw, dh) {
    const w = 96, h = Math.max(1, Math.round(96 * img.height / img.width)), cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const x = cv.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data;
    const col = new Float64Array(w), row = new Float64Array(h);
    let x0 = w, x1 = -1, y0 = h, y1 = -1;
    for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) { const a = d[(y * w + i) * 4 + 3]; if (a > 16) { col[i] += a; row[y] += a; if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    if (x1 < 0) return { x: 0, y: 0, fx: 1, fy: 1 };
    const core = (arr, lo, hi) => {
        let s = 0, cx = 0; for (let i = lo; i <= hi; i++) { s += arr[i]; cx += i * arr[i]; }
        cx = s ? cx / s : (lo + hi) / 2;
        let L = Math.max(lo, Math.floor(cx)), R = Math.min(hi, L), acc = arr[L] || 0; const goal = s * .8;
        while (acc < goal && (L > lo || R < hi)) { const a = L > lo ? arr[L - 1] : -1, b = R < hi ? arr[R + 1] : -1; if (a >= b) { L--; acc += Math.max(0, a); } else { R++; acc += Math.max(0, b); } }
        return (R - L + 1) / (hi - lo + 1);
    };
    return { x: (0.5 - (x0 + x1 + 1) / 2 / w) * dw, y: (0.5 - (y0 + y1 + 1) / 2 / h) * dh, fx: core(col, x0, x1), fy: core(row, y0, y1) };
}
Ve.prototype.update = function (time) { if (!this.tokens || this.busy)
    return; for (const u of this.b.alive()) {
    const c = this.tokens.get(u.uid), s = c?.getByName('token');
    if (!s || !s.getData('baseSX'))
        continue;
    const meta = this.b.meta.get(u.id), kind = window.TokenIdle.classify(u.id, meta), m = window.TokenIdle.sample(kind, time, u.uid);
    s.setScale(s.getData('baseSX') * m.sx, s.getData('baseSY') * m.sy);
    { const _c = s.getData('cxy') || { x: 0, y: 0 }; s.setPosition(m.dx * u.radius * 2 + _c.x, m.dy * u.radius * 2 + _c.y); }
} };
Ve.prototype.drawRings = function () {
    if (!this.rings)
        return;
    const g = this.rings, b = this.b;
    g.clear();
    this.labels.removeAll(true);
    const font = { fontFamily: 'Pretendard', fontSize: '20px', color: '#eee5c9', backgroundColor: '#1b211cea', padding: { x: 8, y: 5 } };
    const label = (x, y, text, style = {}) => this.labels.add(this.add.text(x, y, text, { ...font, ...style }).setOrigin(.5));
    if (b.phase === 'menu')
        return;
    if (b.phase === 'preparation') {
        g.fillStyle(0x929c70, .23);
        g.fillRect(24, 285, pt.width - 48, pt.deployY - 285);
        g.lineStyle(3, 0xc6caa5, .8);
        g.lineBetween(24, pt.deployY, pt.width - 24, pt.deployY);
        label(1165, pt.deployY - 28, '배치 구역 · 병사를 선택하고 빈 땅을 클릭');
    }
    if (['hold', 'defense', 'rescue'].includes(b.mission)) {
        g.fillStyle(0xc7b779, .16);
        g.fillCircle(Mt.objective.x, Mt.objective.y, Mt.objective.radius);
        g.lineStyle(4, 0xd4c48a, .85);
        g.strokeCircle(Mt.objective.x, Mt.objective.y, Mt.objective.radius);
    }
    if (b.mission === 'breakthrough') {
        g.fillStyle(0xb4c891, .25);
        g.fillRect(12, 1200, pt.width - 24, 244);
        label(1165, 1225, '돌파 지점 · 아군 2기 도달 후 라운드 종료');
    }
    const selected = b.unit(b.activeMoverUid || this.dragUnit || b.selected);
    if (selected?.alive) {
        const u = selected, r = b.remaining(u);
        if (actionableUnit()?.uid !== u.uid) {
            g.lineStyle(2 / (UX.zoom || 1), 0xd6bd84, .95);
            g.strokeCircle(u.x, u.y, u.radius + 10);
        }
        // Current-unit label is a fixed-size DOM overlay, not downscaled canvas text.
        if (b.phase === 'move' && b.canAct(u) && !b.engaged(u)) {
            const stamp=[u.uid,u.x,u.y,r,...b.alive().map(v=>`${v.uid}:${v.x},${v.y}`),...b.terrain.map(t=>`${t.id}:${t.active}`)].join('|');
            if(this._rangeStamp!==stamp){
                const obstacles=b.terrain.filter(t=>t.active&&!(t.kind==='cover'&&t.h<=70&&t.w<=230)),enemies=b.alive().filter(v=>v.side!==u.side||v.uid===u.uid);
                this._rangePoints=[];
                for(let i=0;i<96;i++){
                    const a=i*Math.PI/48;let last={x:u.x,y:u.y};
                    for(let distance=12;distance<=r+12;distance+=12){const d=Math.min(distance,r),p={x:u.x+Math.cos(a)*d,y:u.y+Math.sin(a)*d};
                        if(!Et(u,p,enemies,obstacles))break;
                        if(Et(u,p,enemies,b.terrain))last=p;
                        if(d===r)break;
                    }
                    this._rangePoints.push(last);
                }
                this._rangeStamp=stamp;
            }
            const points=this._rangePoints,z=UX.zoom||1;
            // Soft feathered contour with a quiet fill.
            g.fillStyle(0x9aa977,.29);g.fillPoints(points,true);
            g.lineStyle(7/z,0x8fbfb2,.10);g.strokePoints(points,true);
            g.lineStyle(2.6/z,0x8fbfb2,.18);g.strokePoints(points,true);
            g.lineStyle(2/z,0xe4ddb2,.95);g.strokePoints(points,true);
            for(let i=0;i<points.length;i+=8){const p=points[i],a=i*Math.PI/48;g.lineStyle(1/z,0xe3d4a3,.45);g.lineBetween(p.x,p.y,p.x-Math.cos(a)*7/z,p.y-Math.sin(a)*7/z);}
            for(const t of b.terrain.filter(t=>t.active&&ht(t,u)<r+Math.max(t.w,t.h))){
                const jump=t.kind==='cover'&&t.h<=70&&t.w<=230;
                g.lineStyle(1.2/z,jump?0xd6ba77:0xb77c68,.5);
                g.strokeRoundedRect(t.x-t.w/2,t.y-t.h/2,t.w,t.h,6);
            }
            for(const foe of b.alive(Ht(u.side)).filter(v=>ht(v,u)<=r+u.radius+v.radius+UNIT_RULES.chargeTolerance)){
                const plan=chargePlan(u,foe,b.alive(),b.terrain,r);if(!plan)continue;
                const fr=foe.radius+8/z;g.lineStyle(2/z,0xe0ac7d,.95);
                for(let k=0;k<4;k++){g.beginPath();g.arc(foe.x,foe.y,fr,k*Math.PI/2+.16,k*Math.PI/2+.8);g.strokePath();}
            }
            const plan=this.chargeTarget?.plan||this.previewPlan,dest=plan?.to||this.preview;
            if(dest){
                const color=this.chargeTarget?0xe4b381:plan?0xe8d7a6:0xdb8b77;
                g.lineStyle(2/z,color,.95);g.strokeCircle(dest.x,dest.y,u.radius);
                g.lineStyle(1/z,color,.7);g.strokeCircle(dest.x,dest.y,u.radius+5/z);
                if(plan){
                    const line=width=>{g.lineStyle(width/z,width>3?0x12242a:color,width>3?.7:1);g.beginPath();g.moveTo(plan.path[0].x,plan.path[0].y);for(const p of plan.path.slice(1))g.lineTo(p.x,p.y);g.strokePath();};line(6);line(2);
                    const prev=plan.path.at(-2)||u,a=Math.atan2(dest.y-prev.y,dest.x-prev.x),tip=12/z;
                    g.fillStyle(color,1);g.fillTriangle(dest.x,dest.y,dest.x-Math.cos(a-.5)*tip,dest.y-Math.sin(a-.5)*tip,dest.x-Math.cos(a+.5)*tip,dest.y-Math.sin(a+.5)*tip);
                    label(dest.x,dest.y+u.radius+23/z,`${this.chargeTarget?'돌격 · ':''}${(plan.distance/45).toFixed(1)}″ · 잔여 ${Math.max(0,(r-plan.distance)/45).toFixed(1)}″`,{color:'#f0e0b7'});
                }else label(dest.x,dest.y+u.radius+23/z,'이동 불가',{color:'#efaf9b'});
            }
        }
        if (b.phase === 'shoot' && u.stats.shootRange) {
            g.lineStyle(2, 0xcfc28f, .6);
            g.strokeCircle(u.x, u.y, u.stats.shootRange);
            for (const v of b.validTargets(u)) {
                g.lineStyle(4, 0xe49f64, 1);
                g.strokeCircle(v.x, v.y, v.radius + 10);
            }
        }
    }
    // Spear/pike support: gold link from each ranked supporter to the model it fights through.
    for (const group of Oe(b.alive()))
        for (const l of supportFor(group)) {
            g.lineStyle(2, 0xdbc482, .9);
            g.lineBetween(l.unit.x, l.unit.y, l.via.x, l.via.y);
            g.strokeCircle(l.unit.x, l.unit.y, l.unit.radius + 5);
        }
    for (const u of b.alive()) {
        const color = u.side === 'good' ? 0xc2c9a4 : 0xd78b70;
        const fa = (u.angle || 0) * Math.PI / 180;
        g.lineStyle(3, u.side === 'good' ? 0xf0ecc9 : 0xe8b394, .85);
        g.lineBetween(u.x + Math.cos(fa) * (u.radius - 2), u.y + Math.sin(fa) * (u.radius - 2), u.x + Math.cos(fa) * (u.radius + 8), u.y + Math.sin(fa) * (u.radius + 8));
        if (u.stats.wounds > 1)
            for (let i = 0; i < u.stats.wounds; i++) {
                const a = -Math.PI / 2 + i * Math.PI * 2 / u.stats.wounds + .06, z = -Math.PI / 2 + (i + 1) * Math.PI * 2 / u.stats.wounds - .06;
                g.lineStyle(5, i < u.currentWounds ? color : 0x493b30, .95);
                g.beginPath();
                g.arc(u.x, u.y, u.radius + 4, a, z);
                g.strokePath();
            }
        const status = b.engaged(u) ? 0xcd9a65 : u.acted ? 0x635f52 : u.movementSpent ? 0xd2b96f : color;
        g.fillStyle(0x152018, 1);
        g.fillCircle(u.x + u.radius * .8, u.y - u.radius * .8, 8);
        g.fillStyle(status, 1);
        g.fillCircle(u.x + u.radius * .8, u.y - u.radius * .8, 5);
        if (b.engaged(u))
            for (const v of b.alive(Ht(u.side)).filter(v => Vt(u, v))) {
                g.lineStyle(2, 0xd19c75, .8);
                g.lineBetween(u.x, u.y, v.x, v.y);
            }
    }
    for (const area of b.warnings || []) {
        g.fillStyle(0xae482c, .32);
        g.fillCircle(area.x, area.y, area.radius);
        g.lineStyle(5, 0xe39266, .95);
        g.strokeCircle(area.x, area.y, area.radius);
        label(area.x, area.y, '다음 라운드 · 그론드', { color: '#ffd2ab' });
    }
};
const oldTween = Ve.prototype.tween;
Ve.prototype.tween = function (target, props, ms) { if (window._lwbFx) { Object.assign(target, props); return Promise.resolve(); } return oldTween.call(this, target, props, Math.max(12, (ms || 250) / Math.min(qt, 5))); };
Ve.prototype.combat = async function (result) {
    const frames = result.strikeResults.slice(0, qt >= 20 ? 2 : 12); // instant mode condenses presentation, not simulation
    for (const hit of frames) {
        const u = this.b.unit(hit.attacker), v = this.b.unit(hit.target), sprite = this.tokens.get(u?.uid)?.getByName('token');
        if (!u || !v || !sprite)
            continue;
        const type = window.TokenIdle.attackTypeFor(u.id, this.b.meta.get(u.id));
        const c = this.tokens.get(u.uid), sx = sprite.getData('baseSX') || sprite.scaleX, sy = sprite.getData('baseSY') || sprite.scaleY;
        const fx = this.add.image(v.x, v.y, 'fx-' + type).setDisplaySize(v.radius * 2.5, v.radius * 2.5).setDepth(12);
        this.soundFX.play(result.kind === 'shot' ? 'arrow_release' : u.traits.includes('monster') ? 'base_contact' : hit.wound ? 'sword_flesh' : 'sword_shield');
        const duration = qt >= 20 ? 12 : 250 / qt;
        const start = performance.now();
        await new Promise(resolve => { const frame = () => { const t = Math.min(1, (performance.now() - start) / duration), m = window.TokenIdle.attackSample(type, t); sprite.setScale(sx * m.sx, sy * m.sy); { const _c = sprite.getData('cxy') || { x: 0, y: 0 }; sprite.setPosition(m.dx * u.radius * 2 + _c.x, m.dy * u.radius * 2 + _c.y); } fx.setAlpha(1 - t); if (t < 1)
            requestAnimationFrame(frame);
        else
            resolve(); }; frame(); });
        fx.destroy();
        sprite.setScale(sx, sy).setPosition(0, 0);
        const text = this.add.text(v.x, v.y - v.radius - 15, hit.prevented || (hit.killed ? '처치' : hit.wound ? '−1' : 'Defense'), { fontFamily: 'Pretendard', fontSize: hit.killed ? '30px' : '23px', color: hit.killed ? '#ff9166' : hit.wound ? '#f3b69b' : '#e6dfbd', stroke: '#141a17', strokeThickness: 4 }).setOrigin(.5).setDepth(15);
        this.tween(text, { y: text.y - 30, alpha: 0 }, 550).then(() => text.destroy());
        if (hit.killed) { const dead = this.tokens.get(v.uid); if (dead) dead.setVisible(false); }
        if (hit.wound) {
            const victim = this.tokens.get(v.uid)?.getByName('token');
            victim?.setTint(0xffceab);
            this.time.delayedCall(110, () => { if (victim?.scene) victim.clearTint(); });
        }
    }
    await Promise.all(result.pushVectors.map(p => { const c = this.tokens.get(p.uid); return c ? this.tween(c, { x: p.to.x, y: p.to.y }, 180) : Promise.resolve(); }));
};
const oldPlay = Ve.prototype.play;
Ve.prototype.play = async function (e) { if (e.type === 'HeroSkill') {
    const u = this.b.unit(e.uid);
    if (u) {
        const fx = this.add.image(u.x, u.y, u.traits.includes('wizard')?'fx-cast':'fx-rally').setDepth(12).setDisplaySize(220, 220);
        await this.tween(fx, { alpha: 0 }, 400);
        fx.destroy();
    }
} return oldPlay.call(this, e); };
// UI helpers use the same images as the battlefield and inventory.
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const uniqueRelicIds=['pipeweed','athelas','dwarf_axe','elf_bow','ithilien_blade','westfold_shield','rohan_standard','elven_rope','anduril_hilt'];
function relicIcon(r,size=72){const index=uniqueRelicIds.indexOf(r.id),fresh=index>=0,
    over=!fresh&&r.icon>15,cell=fresh?index:(over?r.icon-16:r.icon),div=(fresh||over)?2:3,step=100/div;
    return `<span class="relic-icon" style="width:${size}px;height:${size}px;background-image:url('${Ut(fresh?'relics/new-atlas.png':(over?'relics/atlas2.png':'relics/atlas.png'))}');background-size:${(fresh||over)?'300% 300%':'400% 400%'};background-position:${cell%(div+1)*step}% ${Math.floor(cell/(div+1))*step}%" aria-hidden="true"></span>`;
}
function unitImage(id) { return `<img src="${Ut(q.meta.get(id).file)}" alt="${esc(q.meta.get(id).name_ko)}">`; }
function objectiveText() {
    if (q.phase === 'menu')
        return '작은 원정대에서 시작하는 끝없는 전쟁.';
    const counts = `아군 ${q.alive('good').length} · 적 ${q.alive('evil').length}`;
    const rules = { defense: `라운드 종료 시 Defense 구역에 적 ${q.breachCount}명이 모이면 패배. 적을 전멸시키세요.`, annihilation: '적 부대를 전멸시키세요.', hold: `거점에서 아군이 수적 우세인 라운드 3회. 진행 ${q.capture || 0}/3.`, survive: `5라운드까지 살아남으세요. 현재 ${q.round}/5.`, breakthrough: '아군 2기를 남쪽 돌파선에 보낸 뒤 라운드를 종료하세요.', rescue: `포로 지점을 아군만 점유한 뒤 3라운드 생존. ${q.rescued ? '구출 완료 · ' + q.capture + '/3' : '아직 구출되지 않음'}`, commander: `${q.meta.get(q.current?.boss)?.name_ko || '적 지휘관'}을 처치하세요. 호위병은 남아도 됩니다.` };
    return `${rules[q.mission] || rules.defense}<br><b>${counts}</b>`;
}
const baseRender = Yt;
Yt = function () {
    baseRender();
    ut('wave').textContent = String(q.phase === 'preparation' ? q.wave + 1 : q.wave || 1).padStart(2, '0') + ' / ∞';
    ut('gold-count').textContent = q.gold ?? 35;
    ut('roster-count').textContent = `${q.permanent().length}/${q.capacity()}`;
    ut('objective').innerHTML = objectiveText();
    document.querySelector('.objective h3').textContent = CX.missionNames[q.mission] || '원정대';
    const info = q.phase === 'preparation' ? q.next : q.current;
    const mod = { clear: '맑음', rain: '폭우 · 사거리 감소', dark: '어둠 · 사거리 감소', reinforce: '적 증원 · 3라운드마다', warg: '와르그 사냥대', ambush: '기습 · 측면 포위', cavalry: '기병 돌격', swarm: '고블린 떼' };
    document.querySelector('.map-label').innerHTML = `<b>${CX.mapNames[q.mapIndex || 0]}</b>${mod[info?.modifier || 'clear']}`;
    ut('action').textContent = q.phase === 'preparation' ? `스테이지 ${q.wave + 1} 출전 →` : q.phase === 'fight' ? q.fightQueue.length ? `교전 해결 · ${q.fightQueue.length}곳` : '라운드 종료 →' : '전투 진행 중';
    ut('hint').textContent = At ? '행동 처리 중…' : q.phase === 'preparation' ? '병사 선택 → 배치할 곳 클릭 · 빈 땅 드래그: 카메라 · 휠: 확대' : q.phase === 'move' ? '밝은 영역: 이동 범위 · 경로 표시로 실제 거리 확인 · 적 클릭: 돌격 · Q/E: 방향 전환' : q.phase === 'shoot' ? '테두리 표시된 적을 클릭해 사격 · 선택 병사 대기로 다음 병사' : q.phase === 'fight' ? '연결된 교전을 함께 해결합니다. 창병은 뒤에서 지원합니다.' : '다음 전투를 준비하세요.';
    const u = q.unit(q.selected);
    if (u) {
        const meta = q.meta.get(u.id);
        ut('unit').innerHTML = `<div class="unit-head">${unitImage(u.id)}<div><strong>${esc(u.name)}</strong><small>${u.side === 'good' ? '아군' : '적군'} · ${isHeroUnit(u.id)?`<span class="unit-tier tier-${heroGrade(u.id)}" style="display:inline;margin:0">${tierLabel(u.id)}</span>`:(CX.roleNames[meta.role]||meta.role)}</small><small>${q.engaged(u) ? '교전 중' : u.acted ? '행동 완료' : '행동 가능'}</small></div></div><div class="movement-readout"><b>${(q.remaining(u) / 45).toFixed(1)}″</b> / ${(u.stats.move / 45).toFixed(1)}″ 이동 <span>사용 ${(u.movementSpent / 45).toFixed(1)}″</span></div><div class="stats"><span>결투<b>${u.stats.fight}</b></span><span>힘<b>${u.stats.strength}</b></span><span>Defense<b>${u.stats.defence}</b></span><span>Attack<b>${u.stats.attacks}</b></span><span>용기<b>${u.stats.courage}</b></span></div>${u.stats.wounds > 1 ? `<div class="wound-readout">WOUNDS <b>${u.currentWounds} / ${u.stats.wounds}</b><progress max="${u.stats.wounds}" value="${u.currentWounds}"></progress></div>` : ''}${u.traits.includes('hero') ? `<div class="resources"><span>Might <b>${u.resources.might}</b></span><span>Will <b>${u.resources.will}</b></span><span>Fate <b>${u.resources.fate}</b></span></div>` : ''}<div class="traits">${u.traits.includes('mounted') ? '기병 · 돌격 +1 결투, 보병 넘어뜨리기' : u.traits.includes('spear') ? '창 지원 · 접촉하지 않아도 앞 병사의 결투에 참여' : u.stats.shootRange ? `사거리 ${(u.stats.shootRange / 45).toFixed(1)}″ · 명중 ${u.stats.shootValue}+` : u.traits.includes('terror') ? '공포 · 돌격하는 적에게 Courage 검사' : '검과 방패 · 전열 유지'}</div>`;
        if (CX.skills[u.id]) {
            const skill = CX.skills[u.id], reason = q.mode === 'ai' && u.side === 'evil' ? 'AI가 조작하는 영웅입니다' : q.skillReason(u);
            ut('commands').insertAdjacentHTML('afterbegin', `<button class="hero-skill" id="hero-skill" ${At || reason ? 'disabled' : ''} title="${esc(reason || skill[3])}">${unitImage(u.id)}<span><b>${skill[0]}</b><small>${skill[3]}</small><em>${reason || `${skill[2]} ${skill[1] === 'will' ? 'Will' : 'Might'}`}</em></span></button>`);
            ut('hero-skill').onclick = () => Rt(() => q.skill(u.uid));
        }
    }
    if (u && u.side === 'good' && u.traits.includes('hero') && (u.resources.might || 0) > 0 && !At && (q.phase === 'move' || q.phase === 'fight' || q.phase === 'shoot')) {
        const _ha = [['strike', '선공돌격', '결투 +1'], ['defence', '강철수비', '방어 +2'], ['shoot', '연속사격', '사격 +1회'], ['move', '영웅의 질주', '이동 +2인치']].filter(([k]) => !(u.heroics || {})[k] && (k !== 'shoot' || u.stats.shootRange));
        if (_ha.length) {
            ut('commands').insertAdjacentHTML('beforeend', '<div class="heroic-row" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px">' + _ha.map(([k, l, d]) => '<button class="heroic-btn" data-heroic="' + k + '" title="' + d + ' · Might 1 소모" style="flex:1;min-width:70px;background:#2d2417;border:1px solid #8f7540;border-radius:7px;padding:5px 3px;color:#e8d5a8;font:600 12px Pretendard,ui-sans-serif;cursor:pointer">' + l + '<small style="display:block;font-weight:400;color:#b9a077">' + d + '</small></button>').join('') + '</div>');
            document.querySelectorAll('.heroic-btn').forEach(b => b.onclick = () => { q.heroic(u.uid, b.dataset.heroic); Yt(); });
        }
    }
    const inv = ut('relic-inventory');
    inv.innerHTML = Object.entries(q.relics || {}).map(([id, rank]) => { const r = CX.relics.find(r => r.id === id); return `<button class="owned-relic rarity-${r.rarity}" type="button" data-owned-relic="${id}" aria-label="${esc(r.name)} · ${rank}중첩 · ${esc(r.text)}">${relicIcon(r, 32)}<small>${rank}</small></button>`; }).join('') || '<span class="mini">첫 승리 후 유물을 얻습니다.</span>';
    if (q.phase === 'preparation')
        ut('turn-indicator').innerHTML = '<span>배치 단계</span><strong>다음 임무에 맞춰 전열을 정하세요</strong>';
    const turn = q.unit(q.activeMoverUid || q.selected);
    if (turn && ['move', 'shoot'].includes(q.phase))
        ut('turn-indicator').innerHTML = `<span>${q.mode === 'ai' && q.side === 'evil' ? '상대가 행동 중' : '현재 선택'}</span><strong>${esc(turn.name)}</strong><small>${q.phase === 'move' ? (q.remaining(turn) / 45).toFixed(1) + '″ 남음' : '사격 단계'}</small>`;
    if (!At && q.phase === 'preparation')
        q.save();
};
const originalOverlay = Qe;
Qe = function () {
    const box = ut('overlay');
    if (!['menu', 'reward', 'result'].includes(q.phase)) {
        box.classList.add('hidden');
        return;
    }
    box.classList.remove('hidden');
    if (q.phase === 'menu') {
        let canResume = false;
        try {
            canResume = !!localStorage.getItem('mesbg-endless-save');
        }
        catch { }
        box.innerHTML = `<div class="modal campaign-menu"><div class="eyebrow">MIDDLE-EARTH · ENDLESS TACTICAL DEFENSE</div><div class="intro-layout"><div><h1>서녘의<br>마지막 전열</h1><div class="subtitle">THE LAST WAR BAND</div><p>영웅과 병사를 골라 원정대를 꾸리세요.<br>살아남은 이들을 이끌고, 동료를 영입하고,<br>중간계의 유물로 다음 전투를 준비하세요.</p></div><div class="hero-tokens">${unitImage('aragorn')}${unitImage('rohan_rider')}</div></div><div class="menu-buttons"><button id="start-ai" class="primary">새 원정 · VS AI →</button>${canResume ? '<button id="resume" class="secondary">정비 지점부터 계속</button>' : ''}<button id="start-hotseat" class="secondary">2인 번갈아 플레이</button><button id="rank-btn" class="secondary">명예의 전당</button></div><div class="menu-notes"><span>끝없는 스테이지</span><span>영입 · 유물 · 전술</span><span>최고 기록 ${q.readBest()} STAGE</span></div><p class="mini">MESBG에서 영감을 받은 간소화 전술 규칙 · 원정은 정비 지점에서 자동 저장됩니다.</p></div>`;
        ut('start-ai').onclick = () => Rt(() => q.start('ai'));
        ut('start-hotseat').onclick = () => Rt(() => q.start('hotseat'));
        if (canResume)
            ut('resume').onclick = () => Rt(() => { if (!q.resume())
                Xt('저장된 원정을 불러올 수 없습니다.'); });
        return;
    }
    if (q.phase === 'reward') {
        const steps = ['event', 'recruit', 'relic', 'ready'];
        const step = q.campStep;
        let body = '';
        if (step === 'recruit')
            body = `<p>금화 <b>${q.gold}</b> · 부대 ${q.permanent().length}/${q.capacity()}. 원하는 동료를 영입하거나 금화를 아끼세요.</p><div class="recruit-cards">${q.recruitOffers.map((o, i) => { const m = q.meta.get(o.id), p = zt[o.id], cost = q.price(o.id), full = q.permanent().length >= q.capacity(); return `<button class="recruit-card tier-${heroGrade(o.id)} ${o.bought ? 'purchased' : ''}" data-recruit="${i}" ${o.bought || q.gold < cost || full ? 'disabled' : ''}>${unitImage(o.id)}<span class="recruit-grade">${tierLabel(o.id)}</span><b>${esc(m.name_ko)}</b><small>${CX.roleNames[m.role] || m.role}</small><p>${p.traits.includes('spear') ? '후열 창 지원' : p.traits.includes('mounted') ? '빠른 돌격과 우회' : p.shootRange ? '원거리 사격' : p.defence >= 7 ? '단단한 전열' : '근접 전투'}${CX.skills[o.id] ? '<br>' + CX.skills[o.id][0] : ''}</p><em>${o.bought ? '합류 완료' : full ? '부대 정원 초과' : cost + ' 금화'}</em></button>`; }).join('')}</div><div class="camp-actions"><button id="reroll" class="secondary" ${q.gold < 10 + q.rerolls * 5 ? 'disabled' : ''}>후보 교체 · ${10 + q.rerolls * 5} 금화</button><button id="expand" class="secondary" ${q.gold < 45 + q.capacityBought * 25 || q.capacity() >= 30 ? 'disabled' : ''}>정원 +2 · ${45 + q.capacityBought * 25} 금화</button><button id="to-relic" class="primary">영입 완료 · 유물 선택 →</button></div>`;
        if (step === 'event') { const ev = q.campEvent; body = ev ? `<p>${esc(ev.text)}</p><div class="reward-cards">${ev.options.map((o, i) => `<button class="reward rarity-common" data-evopt="${i}"><b>${esc(o.label)}</b><p>${esc(o.sub)}</p></button>`).join('')}</div>` : ''; }
        if (step === 'relic')
            body = `<p>세 가지 유물 중 하나를 선택하세요. 효과는 원정 내내 유지됩니다.</p><div class="reward-cards">${q.relicChoices.map(id => { const r = CX.relics.find(r => r.id === id); return `<button class="reward rarity-${r.rarity}" data-relic="${id}">${relicIcon(r, 88)}<small>${CX.rarityNames[r.rarity]}${q.rank(id) ? ' · ' + (q.rank(id) + 1) + '중첩' : ''}</small><b>${r.name}</b><p>${r.text}</p></button>`; }).join('')}</div>`;
        if (step === 'ready') {
            const next = q.stageInfo(q.wave + 1);
            body = `<p>동료 ${q.permanent().length}명 · 유물 ${Object.keys(q.relics).length}종 · 남은 금화 ${q.gold}</p><div class="next-stage"><span>다음 전장</span><h3>${CX.mapNames[next.map]} · ${CX.missionNames[next.mission]}</h3><p>${q.rank('palantir') ? Object.entries(next.ids.reduce((a, id) => (a[id] = (a[id] || 0) + 1, a), {})).map(([id, n]) => q.meta.get(id).name_ko + ' ×' + n).join(' · ') : next.boss ? '정찰 보고 · ' + q.meta.get(next.boss).name_ko + ' 출현' : '정찰 보고 · 적 ' + next.ids.length + '기 접근'}</p></div><div class="camp-roster">${q.permanent().map(u => `<span title="${u.name}">${unitImage(u.id)}<small>${u.currentWounds}/${u.stats.wounds}</small></span>`).join('')}</div><button id="leave-camp" class="primary">부대 정비 · 배치 화면으로 →</button>`;
        }
        box.innerHTML = `<div class="modal camp"><div class="eyebrow">STAGE ${q.wave} CLEARED · +${q.lastGold} GOLD</div><h2>살아남은 이들과 함께.</h2><div class="camp-steps">${steps.map((s, i) => `<span class="${step === s ? 'current' : ''}">${i + 1}. ${['전장 이벤트', '동료 영입', '유물 선택', '다음 전투'][i]}</span>`).join('')}</div>${body}</div>`;
        box.querySelectorAll('[data-recruit]').forEach(el => el.onclick = () => { q.recruit(Number(el.dataset.recruit)); wt.play('reward_select'); Yt(); });
        if (ut('reroll'))
            ut('reroll').onclick = () => { q.reroll(); Yt(); };
        if (ut('expand'))
            ut('expand').onclick = () => { q.expand(); Yt(); };
        if (ut('to-relic'))
            ut('to-relic').onclick = () => { q.campStep = 'relic'; q.save(); Yt(); };
        box.querySelectorAll('[data-evopt]').forEach(el => el.onclick = () => { q.chooseEvent(Number(el.dataset.evopt)); wt.play('reward_select'); Yt(); });
        box.querySelectorAll('[data-relic]').forEach(el => el.onclick = () => { q.chooseRelic(el.dataset.relic); wt.play('reward_select'); Yt(); });
        if (ut('leave-camp'))
            ut('leave-camp').onclick = () => Rt(() => q.leaveCamp());
        return;
    }
    box.innerHTML = `<div class="modal"><div class="eyebrow">THE LAST WAR BAND · 원정 종료</div><h1>전열은<br>무너졌지만.</h1><p>${esc(q.log[0] || '원정대가 쓰러졌습니다.')}<br>클리어 ${q.cleared || 0} 스테이지 · 처치 ${q.totalKills || 0} · 최고 기록 ${q.readBest()}</p><div class="result-relics">${Object.keys(q.relics).map(id => relicIcon(CX.relics.find(r => r.id === id), 56)).join('')}</div><div class="rank-row"><input id="rank-nick" maxlength="16" placeholder="닉네임 (최대 16자)"><button id="rank-submit" class="secondary">랭킹 등록</button></div><div id="rank-status" class="mini"></div><div id="rank-board-result"></div><div class="menu-buttons"><button id="restart" class="primary">새로운 원정 →</button><button id="to-menu" class="secondary">메인 메뉴</button></div></div>`;
    ut('restart').onclick = () => Rt(() => q.start(q.mode));
    ut('to-menu').onclick = () => { q.phase = 'menu'; Yt(); };
};
Qe = (() => { const f = Qe; return function () { f.apply(this, arguments); lwbWireRank(); }; })();
const oldDice = $e;
$e = async function (e) { if (qt >= 20)
    return; await oldDice(e); if (e.result?.kind === 'fight') {
    const r = e.result;
    ut('dice').insertAdjacentHTML('beforeend', `<div class="dice-detail">참여 ${r.participants.map(id => q.unit(id)?.name).filter(Boolean).join(' · ')}<br>창 지원 ${(r.supports || []).map(id => q.unit(id)?.name).join(' · ') || '없음'} · 결투 ${r.fightValues?.good || '—'} / ${r.fightValues?.evil || '—'}</div>`);
    await ne(200 / qt);
} };
document.querySelector('.brand').innerHTML = '<small>MIDDLE-EARTH · TACTICAL DEFENSE</small><strong>서녘의 마지막 전열</strong>';
document.querySelector('.sigil').innerHTML = `<img src="${Ut('dice-faces/minastirith-emblem.png')}" alt="곤도르">`;
document.querySelector('.runmeta').insertAdjacentHTML('beforeend', '<div class="metric"><small>GOLD</small><strong id="gold-count">35</strong></div><div class="metric"><small>WARBAND</small><strong id="roster-count">6/8</strong></div>');
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<select id="speed" aria-label="진행 속도"><option value="1">보통</option><option value="3">빠르게</option><option value="30">즉시</option></select>');
ut('speed').onchange = () => { qt = Number(ut('speed').value); me(); };
document.querySelector('.aside').insertAdjacentHTML('beforeend', '<section class="inventory"><div class="section-label">원정대의 유물</div><div id="relic-inventory"></div></section>');
document.querySelector('.footer').innerHTML = '<span>THE LAST WAR BAND · ENDLESS 1.0</span><span>Q/E 방향 · Tab 다음 병사 · F 선택 중심 · Space 행동 종료</span>';
document.title = '서녘의 마지막 전열 · MESBG Endless';
let waitConfirm = '';
ut('wait').onclick = () => { const u = q.unit(q.activeMoverUid || q.selected); if (!u || At)
    return; const key = q.round + '-' + q.phase + '-' + u.uid; if ((q.phase === 'move' && q.remaining(u) > 45 || q.phase === 'shoot' && q.validTargets(u).length) && waitConfirm !== key) {
    waitConfirm = key;
    Xt('아직 행동할 수 있습니다. 종료하려면 한 번 더 누르세요.');
    return;
} waitConfirm = ''; Rt(() => q.wait(u.uid)); };
document.addEventListener('keydown', e => { if (e.target.matches('input,select') || At || Qt)
    return; if (e.key === 'Tab') {
    e.preventDefault();
    const list = q.eligible('good');
    if (list.length) {
        const i = list.findIndex(u => u.uid === q.selected);
        Zt(list[(i + 1) % list.length].uid);
    }
} if (e.key.toLowerCase() === 'f')
    Tt.focus(); if (e.key.toLowerCase() === 'q' || e.key.toLowerCase() === 'e')
    Rt(() => q.rotate(q.selected, e.key.toLowerCase() === 'q' ? -45 : 45)); if (e.code === 'Space') {
    e.preventDefault();
    if (q.phase === 'fight' || q.phase === 'preparation')
        ut('action').click();
    else
        ut('wait').click();
} });
// One persistent info panel for hover, keyboard focus and touch taps.
const relicInfo=document.createElement('div');relicInfo.id='relic-info';relicInfo.className='hidden';relicInfo.setAttribute('role','tooltip');Ke.append(relicInfo);
const relicList=ut('relic-inventory');
function openRelicInfo(button){
    const r=CX.relics.find(v=>v.id===button?.dataset.ownedRelic),rank=r&&q.rank(r.id);
    if(!r||!rank)return;
    relicInfo.innerHTML=`<b>${esc(r.name)}</b><small>${CX.rarityNames[r.rarity]} · 현재 ${rank}중첩</small><p>${esc(r.text)}</p>`;
    relicInfo.classList.remove('hidden');button.setAttribute('aria-describedby','relic-info');
    const a=button.getBoundingClientRect(),w=Math.min(290,innerWidth-20);
    relicInfo.style.width=w+'px';const h=relicInfo.offsetHeight;
    relicInfo.style.left=Math.max(10,Math.min(innerWidth-w-10,a.left+a.width/2-w/2))+'px';
    relicInfo.style.top=Math.max(8,a.top-h-9)+'px';
    if(a.top<h+20)relicInfo.style.top=Math.min(innerHeight-h-8,a.bottom+9)+'px';
}
function closeRelicInfo(){relicInfo.classList.add('hidden');relicList.querySelectorAll('[aria-describedby="relic-info"]').forEach(v=>v.removeAttribute('aria-describedby'));}
relicList.addEventListener('pointerover',e=>{if(e.pointerType==='mouse'){const b=e.target.closest('[data-owned-relic]');if(b)openRelicInfo(b);}});
relicList.addEventListener('pointerout',e=>{if(e.pointerType==='mouse'&&!e.relatedTarget?.closest?.('[data-owned-relic]'))closeRelicInfo();});
relicList.addEventListener('focusin',e=>{const b=e.target.closest('[data-owned-relic]');if(b)openRelicInfo(b);});
relicList.addEventListener('focusout',closeRelicInfo);
relicList.addEventListener('click',e=>{const b=e.target.closest('[data-owned-relic]');if(!b)return;e.stopPropagation();openRelicInfo(b);});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('#relic-inventory,#relic-info'))closeRelicInfo();});
// Expose a small read-only-friendly QA surface for repeatable regression checks.
window.MESBG = { battle: q, scene: Tt, render: () => Yt(), act: fn => Rt(fn), ai: () => He(q), constants: CX, profiles: zt, legal: Et, plan: ve, contact: Vt };
// Selecting another friendly model while one is mid-move ends the active mover's turn (spec: unit switch = movement end).
const baseSelect = Zt;
Zt = function (uid) {
    if (q.phase === 'move' && q.activeMoverUid && uid !== q.activeMoverUid) {
        const next = q.unit(uid);
        if (next && next.side === q.side && next.alive) {
            // End the mover's activation, then keep the clicked unit selected even if
            // finishActivation's autoSelect briefly picks the first eligible model.
            Rt(() => { q.wait(q.activeMoverUid); q.selected = uid; });
            let n = 0;
            const reassert = () => { if (q.selected === uid)
                return; if (At && n++ < 40)
                return setTimeout(reassert, 40); q.selected = uid; Tt.preview = void 0; Tt.previewPlan = null; Yt(); };
            setTimeout(reassert, 40);
            return;
        }
    }
    baseSelect(uid);
};
// Dice panel marks the winning side's row after each roll.
const baseDicePanel = $e;
$e = async function (e) { await baseDicePanel(e); if (qt >= 20)
    return; const rows = ut('dice').querySelectorAll('.dice-row'); if (rows.length < 2)
    return; let w = null; if (e.type === 'PriorityRolled')
    w = q.priority;
else if (e.result?.kind === 'fight')
    w = e.result.winnerSide;
else if (e.result?.kind === 'shot')
    w = q.unit(e.result.strikeResults?.[0]?.attacker)?.side; if (w)
    rows[w === 'good' ? 0 : 1].classList.add('winner'); };
// AUTO mode: the same AI that runs Mordor also drives Gondor; camps stay manual.
const safeAct = fn => () => Rt(() => { try {
    fn();
}
catch (e) {
    console.warn('[auto]', e);
} });
me = function () {
    clearTimeout(Jt);
    if (At || Qt)
        return;
    if (q.mode === 'ai' && q.side === 'evil' && ['move', 'shoot'].includes(q.phase)) {
        Jt = setTimeout(safeAct(() => He(q)), 650 / qt);
        return;
    }
    if (!AUTO || !['ai', 'hotseat'].includes(q.mode))
        return;
    if (['move', 'shoot'].includes(q.phase))
        Jt = setTimeout(safeAct(() => He(q)), 650 / qt);
    else if (q.phase === 'fight')
        Jt = setTimeout(safeAct(() => q.fightNext()), 750 / Math.max(1, Math.min(qt, 10)));
    else if (q.phase === 'preparation' && q.side === 'good')
        Jt = setTimeout(safeAct(() => q.startWave()), 900);
    else if (q.phase === 'reward' && !q._autoCampNote) {
        q._autoCampNote = 1;
        Xt('자동 진행 중 · 영입과 유물은 직접 선택하세요');
    }
};
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="auto" title="AI가 아군 턴도 진행합니다. 전투·배치·교전을 자동으로 넘깁니다">자동</button>');
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="view-mode" title="PC에서도 모바일 화면(세로 레이아웃 · 하단 전투 패널)으로 봅니다">모바일 보기</button>');
  if(localStorage.getItem('lwb-view')==='mobile')document.body.classList.add('force-mobile');
  const syncViewBtn=()=>{const on=document.body.classList.contains('force-mobile');ut('view-mode').textContent=on?'PC 보기':'모바일 보기';ut('view-mode').classList.toggle('on',on)};
  syncViewBtn();
  ut('view-mode').onclick=()=>{const on=document.body.classList.toggle('force-mobile');localStorage.setItem('lwb-view',on?'mobile':'pc');syncViewBtn();setSheet(false);resizeBattle(true);Xt(on?'모바일 화면으로 표시합니다':'PC 화면으로 표시합니다')};
  document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="speed-toggle" title="배속">1×</button>');
  document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="fx-toggle" title="전투 연출">연출</button>');
  window._lwbFx = localStorage.getItem('lwb_fx') === '0'; const _fxb = ut('fx-toggle');
  const _fxr = () => { _fxb.textContent = window._lwbFx ? '연출 OFF' : '연출'; _fxb.style.opacity = window._lwbFx ? .55 : 1; };
  _fxr(); _fxb.onclick = () => { window._lwbFx = !window._lwbFx; localStorage.setItem('lwb_fx', window._lwbFx ? '0' : '1'); _fxr(); };
  let _spd = 1; ut('speed-toggle').onclick = () => { _spd = _spd >= 4 ? 1 : _spd * 2; ut('speed-toggle').textContent = _spd + '×'; if (window.MESBG && MESBG.scene) { MESBG.scene.tweens.timeScale = _spd; MESBG.scene.time.timeScale = _spd; } };
  ut('auto').onclick = () => { AUTO = !AUTO; q._autoCampNote = 0; ut('auto').classList.toggle('on', AUTO); ut('auto').textContent = AUTO ? '자동 중' : '자동'; Xt(AUTO ? '자동 진행 시작 — 아군 턴도 AI가 맡습니다. 보상 화면에서는 멈춥니다.' : '자동 진행 해제'); me(); };
window.MESBG.auto = v => { if (v !== undefined && v !== AUTO)
    ut('auto').click(); return AUTO; };
// Collapsible battle panel on small screens.
document.querySelector('.aside').insertAdjacentHTML('afterbegin', '<button id="sheet-toggle" type="button">전투 패널</button>');
ut('sheet-toggle').onclick = () => { const a = document.querySelector('.aside'); a.classList.toggle('open'); if (a.classList.contains('open'))
    a.scrollTop = 0; };
ut('help').onclick = () => { if (At)
    return; clearTimeout(Jt); Qt = true; ut('overlay').classList.remove('hidden'); ut('overlay').innerHTML = `<div class="modal"><div class="eyebrow">FIELD MANUAL / ENDLESS</div><h2>원정대 야전 지침</h2><div class="help-list"><p><b>배치와 이동</b><br>배치 때 병사를 선택하고 빈 땅을 누르세요. 전투 중 이동력을 나눠 쓸 수 있습니다. 남은 이동력을 쓰거나 이동 종료로 차례를 넘기세요. Q/E로 방향을 정합니다.</p><p><b>돌격과 사격</b><br>선택한 병사로 적을 누르면 돌격 또는 사격합니다. 기병 돌격은 추가 결투 주사위와 보병 넘어짐을 줍니다. 창병은 접촉한 아군을 지원합니다. 아군과 장애물이 사선을 막습니다. 낮은 바리케이드는 탭하여 넘을 수 있습니다. 넘기 주사위 1은 실패, 2–5는 건넌 뒤 이동 종료, 6은 계속 이동합니다.</p><p><b>영웅</b><br>선택 패널에서 Might·Will·Fate와 고유 능력을 확인하세요. 능력은 자원을 소비하며, Fate는 상처를 입을 때 자동 판정합니다.</p><p><b>임무와 보상</b><br>매 전투의 목표를 상단에서 확인하세요. 승리하면 금화로 모집·정원 확장·재추첨을 하고 유물 세 장 중 하나를 고릅니다. 이후 재배치하여 다음 전투로 갑니다.</p><p><b>끝없는 원정</b><br>같은 전장에서 다섯 스테이지를 치른 뒤 다음 지도로 이동합니다. 다섯 단계마다 보스가 등장합니다. 25단계 모르고스는 체력에 따라 단계가 변하고 다음 라운드의 강타 위치를 예고합니다. 처치 뒤에도 원정은 계속됩니다.</p><p><b>조작과 저장</b><br>Tab 다음 병사 · F 선택 중심 · Space 행동 종료. 휠로 확대, 빈 땅 드래그로 카메라 이동. 보상·준비 단계에서 자동 저장됩니다. 2P 모드는 한 기기를 번갈아 사용합니다.</p></div><p>원작 전투 엔진에 맞춘 간소화 규칙입니다.</p><button id="close-help" class="primary">전장으로 돌아가기</button></div>`; ut('close-help').onclick = () => { Qt = false; Yt(); me(); }; };
/* ----------------------------------------------------------------------
 * LAST WAR BAND — Mobile clarity 1.1
 * World coordinates/rules are unchanged. CSS pixels, render pixels, and
 * world pixels are intentionally separate; only this adapter moves camera.
 * No network dependencies. Native Pointer Events own all field gestures.
 * -------------------------------------------------------------------- */
const UX = {version:'1.4.0-mobile', dpr:1, zoom:.7, width:1, height:1, ready:false,
    cameraMode:'tactical', pointers:new Map(), gesture:null, stage:null, rosterKey:'', reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
const mobileLayout = () => matchMedia('(max-width:900px)').matches || document.body.classList.contains('force-mobile');
const touchLayout = () => matchMedia('(pointer:coarse)').matches || mobileLayout();
const icon = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const crossIcon = icon('<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/><circle cx="12" cy="12" r="4"/>');
const tree = '<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M24 49V14M24 37L12 29l-6-1m18 2L35 21l6-2M24 23l-8-6-2-7M24 31l-12-9-6-1M24 40l11-7 7-1M24 21l7-8 1-5M24 47l-10 7h20l-10-7M12 29l-3-7M35 21l1-7M35 33l3-7M16 17l-7-3M31 13l7-3"/><path d="m24 2 1.3 3.1 3.4.3-2.5 2.2.7 3.3L24 9.1 21.1 11l.7-3.4-2.5-2.2 3.4-.3z" fill="currentColor" stroke="none"/><path d="M7 57h34M13 60h22" opacity=".7"/><circle cx="6" cy="11" r="1"/><circle cx="42" cy="11" r="1"/><circle cx="3" cy="18" r="1"/><circle cx="45" cy="18" r="1"/></svg>';
document.title = '서녘의 마지막 전열 · 모바일 조작 개선 1.4';
document.querySelector('meta[name="theme-color"]').content='#14212b';
document.querySelector('.sigil').innerHTML = tree;
document.querySelector('.brand').innerHTML='<small>THE LAST WAR BAND</small><strong>서녘의 마지막 전열</strong>';
[...document.querySelectorAll('.metric small')].forEach((e,i)=>e.textContent=['공세','라운드','지휘력','금화','원정대'][i]);
document.querySelector('.top').insertAdjacentHTML('beforeend',`<button id="settings-toggle" class="iconbtn" aria-label="진행 속도·자동·음향 설정" aria-expanded="false">${icon('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="#18232c"/><circle cx="16" cy="12" r="2" fill="#18232c"/><circle cx="8" cy="18" r="2" fill="#18232c"/>')}</button>`);
ut('help').setAttribute('aria-label','게임 조작법');
ut('speed').options[0].text='속도 ×1';ut('speed').options[1].text='속도 ×3';ut('speed').options[2].text='즉시 진행';
const field = document.querySelector('.field');
field.insertAdjacentHTML('beforeend',`<div class="battle-info"><div id="ux-place" class="place"></div><div id="ux-mission" class="mission"></div></div><div id="world-ui"><div id="active-tag" class="active-tag hidden"></div></div><button id="offscreen-unit" class="hidden" aria-label="화면 밖 현재 행동 병사로 이동">현재 병사 ↗</button><button id="map-toggle" class="iconbtn" aria-expanded="false" aria-controls="minimap">${icon('<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2zM9 3v15M15 6v15"/>')}<span>전술 지도</span></button><div class="field-actions"></div>`);
const fieldActions=field.querySelector('.field-actions');
for(const id of ['focus','zoomout','zoomin'])fieldActions.append(ut(id));
ut('focus').innerHTML=crossIcon+'<span>현재 병사</span>';ut('focus').classList.add('focus-control');ut('focus').setAttribute('aria-label','현재 행동 병사에 카메라 맞추기');
ut('zoomout').setAttribute('aria-label','전장 축소');ut('zoomin').setAttribute('aria-label','전장 확대');
field.append(ut('overview'));ut('overview').classList.add('hidden');ut('overview').style.cssText='position:absolute;bottom:64px;left:164px;z-index:9;background:#14202cee';
ut('minimap').setAttribute('aria-label','전술 지도. 위치를 누르면 해당 지역으로 이동');
const dock=document.createElement('div');dock.id='command-dock';dock.innerHTML=`<div class="dock-main"><img class="dock-portrait" id="dock-portrait" alt=""><div class="dock-text"><span class="dock-eyebrow" id="dock-eyebrow">원정대 지휘</span><strong id="dock-name">병사를 선택하세요</strong><div class="dock-status" id="dock-status"></div></div><button id="dock-primary" class="dock-primary" disabled>전투 시작</button></div><div class="dock-sub"><div class="roster-strip" id="roster-strip" aria-label="원정대 병사 선택"></div><div class="roster-tools"><button id="next-unit" class="secondary" title="다음 행동 가능 병사" aria-label="다음 행동 가능 병사">다음</button><button id="dock-detail" class="secondary" aria-controls="battle-sheet" aria-expanded="false">명령 ⌃</button></div></div>`;
document.querySelector('.battle-column').insertBefore(dock,document.querySelector('.hint'));
document.querySelector('.hint b').textContent='야전 지침';
const aside=document.querySelector('.aside');aside.id='battle-sheet';aside.setAttribute('aria-label','병사 상세 및 지휘 명령');
Ke.insertAdjacentHTML('beforeend','<button id="sheet-backdrop" tabindex="-1" aria-label="명령 패널 닫기"></button>');
const sec=aside.querySelectorAll('.section-label');if(sec[0])sec[0].textContent='전장 임무';if(sec[1])sec[1].textContent='선택한 병사';if(sec[2])sec[2].textContent='지휘 명령';
ut('sheet-toggle').textContent='원정대 · 지휘 명령';
function setSheet(open){aside.classList.toggle('open',open);ut('sheet-backdrop').classList.toggle('open',open);ut('dock-detail').setAttribute('aria-expanded',String(open));if(mobileLayout()){aside.inert=!open;aside.setAttribute('aria-hidden',String(!open))}if(open)aside.scrollTop=0;}
setSheet(false);
ut('sheet-toggle').onclick=()=>setSheet(false);ut('sheet-backdrop').onclick=()=>setSheet(false);ut('dock-detail').onclick=()=>setSheet(!aside.classList.contains('open'));
ut('settings-toggle').onclick=()=>{const a=document.querySelector('.top-actions'),on=!a.classList.contains('open');a.classList.toggle('open',on);ut('settings-toggle').setAttribute('aria-expanded',String(on));};
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.top-actions,#settings-toggle')){document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false')}});
ut('map-toggle').onclick=()=>{const on=!ut('minimap').classList.contains('shown');ut('minimap').classList.toggle('shown',on);ut('overview').classList.toggle('hidden',!on);ut('map-toggle').setAttribute('aria-expanded',String(on));xe();};
function actionableUnit(){
    if(q.phase==='preparation')return q.unit(q.selected)?.alive&&q.unit(q.selected).side==='good'?q.unit(q.selected):q.alive('good')[0];
    if(!['move','shoot'].includes(q.phase)||AUTO||(q.mode==='ai'&&q.side==='evil'))return null;
    const active=q.unit(q.activeMoverUid);if(q.canAct(active))return active;
    const selected=q.unit(q.selected);return q.canAct(selected)?selected:q.eligible()[0]||null;
}
function shortName(u){return u.name.replace('미나스 티리스 전사','곤도르 전사').replace('미나스 티리스 창병','곤도르 창병').replace('모르도르 오크(검)','오크 전사')}
function cameraCenter(){const c=Tt.cameras?.main;return c?{x:c.scrollX+c.width/2,y:c.scrollY+c.height/2}:{x:1165,y:670}}
function fitZoom(){return Math.max(UX.width/pt.width,UX.height/pt.height)}
function setCamera(x,y,z=UX.zoom,mode=UX.cameraMode){
    if(!UX.ready)return;
    const c=Tt.cameras.main;UX.zoom=Ot.Math.Clamp(z,Math.max(.12,fitZoom()),1.65);UX.cameraMode=mode;
    const halfW=UX.width/(2*UX.zoom),halfH=UX.height/(2*UX.zoom);
    x=halfW>=pt.width/2?pt.width/2:Ot.Math.Clamp(x,halfW,pt.width-halfW);
    y=halfH>=pt.height/2?pt.height/2:Ot.Math.Clamp(y,halfH,pt.height-halfH);
    c.panEffect.reset();c.shakeEffect.reset();c.setZoom(UX.zoom*UX.dpr).centerOn(x,y);c.preRender();
    Tt.drawRings();updateWorldUI();
}
function worldAt(x,y){const c=cameraCenter();return{x:c.x+(x-UX.width/2)/UX.zoom,y:c.y+(y-UX.height/2)/UX.zoom}}
function screenAt(x,y){const c=cameraCenter();return{x:(x-c.x)*UX.zoom+UX.width/2,y:(y-c.y)*UX.zoom+UX.height/2}}
function zoomAt(z,x=UX.width/2,y=UX.height/2){const p=worldAt(x,y);z=Ot.Math.Clamp(z,Math.max(.12,fitZoom()),1.65);setCamera(p.x-(x-UX.width/2)/z,p.y-(y-UX.height/2)/z,z,'manual');}
Ve.prototype.zoom=function(delta){zoomAt(UX.zoom*(delta>0?1.2:1/1.2));};
Ve.prototype.overview=function(){setCamera(pt.width/2,pt.height/2,fitZoom(),'overview')};
Ve.prototype.focus=function(){const u=actionableUnit()||this.b.unit(this.b.selected);if(u?.alive){setCamera(u.x,u.y,UX.cameraMode==='overview'?(mobileLayout()?.78:.82):UX.zoom,'manual')}};
Ve.prototype.center=function(x,y){setCamera(x,y,UX.zoom,'manual')};
ut('offscreen-unit').onclick=()=>Tt.focus();
function resetGestures(){for(const id of UX.pointers.keys()){try{Tt.game.canvas.releasePointerCapture(id)}catch{}}UX.pointers.clear();UX.gesture=null;Tt.dragStart=undefined;Tt.dragUnit='';Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;}
function inputBlocked(){return Qt||aside.classList.contains('open')||!ut('overlay').classList.contains('hidden')}
function installFieldInput(scene){
    const canvas=scene.game.canvas;
    const point=e=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*UX.width/r.width,y:(e.clientY-r.top)*UX.height/r.height}};
    canvas.addEventListener('contextmenu',e=>e.preventDefault());
    canvas.addEventListener('pointerdown',e=>{
        if(inputBlocked()||e.pointerType==='mouse'&&e.button!==0)return;
        e.preventDefault();const p=point(e);UX.pointers.set(e.pointerId,p);try{canvas.setPointerCapture(e.pointerId)}catch{}
        scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;
        if(UX.pointers.size===1){const at=worldAt(p.x,p.y),hit=scene.hit(at);UX.gesture={mode:'tap',start:p,world:at,center:cameraCenter(),hit:hit?.uid||'',touch:e.pointerType!=='mouse'};}
        else if(UX.pointers.size===2){const [a,b]=[...UX.pointers.values()],mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};UX.gesture={mode:'pinch',distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),zoom:UX.zoom,anchor:worldAt(mid.x,mid.y)};}
        else UX.gesture={mode:'blocked'};
        scene.drawRings();
    },{passive:false});
    canvas.addEventListener('pointermove',e=>{
        if(!UX.pointers.has(e.pointerId)){
            if(e.pointerType!=='mouse'||At||inputBlocked())return;
            const p=point(e),wp=worldAt(p.x,p.y),u=actionableUnit();
            if(u&&q.phase==='move'&&performance.now()-(UX.previewAt||0)>100){UX.previewAt=performance.now();scene.preview=wp;scene.previewPlan=ve(u,wp,q.alive(),q.terrain,q.remaining(u));const foe=scene.hit(wp);scene.chargeTarget=foe&&foe.side!==u.side?{u:foe,plan:ve(u,ue(u,foe),q.alive(),q.terrain,q.remaining(u),{chargeTarget:foe})}:null;scene.drawRings();}
            return;
        }
        e.preventDefault();const p=point(e);UX.pointers.set(e.pointerId,p);const g=UX.gesture;if(!g)return;
        if(g.mode==='pinch'&&UX.pointers.size===2){const [a,b]=[...UX.pointers.values()],mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},d=Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),z=Ot.Math.Clamp(g.zoom*d/g.distance,Math.max(.12,fitZoom()),1.65);setCamera(g.anchor.x-(mid.x-UX.width/2)/z,g.anchor.y-(mid.y-UX.height/2)/z,z,'manual');return;}
        if(g.mode==='blocked'||UX.pointers.size!==1)return;
        const dx=p.x-g.start.x,dy=p.y-g.start.y;
        if(g.mode==='tap'&&Math.hypot(dx,dy)>(g.touch?9:5))g.mode=!g.touch&&g.hit&&!At?'unit-drag':'pan';
        if(g.mode==='pan')setCamera(g.center.x-dx/UX.zoom,g.center.y-dy/UX.zoom,UX.zoom,'manual');
        if(g.mode==='unit-drag'&&!At&&performance.now()-(UX.previewAt||0)>100){UX.previewAt=performance.now();const u=q.unit(g.hit);if(u?.alive&&u.side===q.side){scene.dragUnit=u.uid;scene.preview=worldAt(p.x,p.y);scene.previewPlan=q.phase==='move'?ve(u,scene.preview,q.alive(),q.terrain,q.remaining(u)):null;scene.drawRings();}}
    },{passive:false});
    const finish=(e,cancel)=>{
        if(!UX.pointers.has(e.pointerId))return;e.preventDefault();const p=point(e),g=UX.gesture;UX.pointers.delete(e.pointerId);try{canvas.releasePointerCapture(e.pointerId)}catch{}
        if(UX.pointers.size){UX.gesture={mode:'blocked'};return;}UX.gesture=null;
        scene.dragUnit='';scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;
        if(!cancel&&!At&&!inputBlocked()&&g){const pos=worldAt(p.x,p.y);
            if(g.mode==='tap'){const hit=scene.hit(pos);if(hit)scene.onUnit(hit.uid);else scene.onPoint(pos);}
            else if(g.mode==='unit-drag')scene.onDrop(g.hit,pos);
        }
        scene.drawRings();
    };
    canvas.addEventListener('pointerup',e=>finish(e,false),{passive:false});canvas.addEventListener('pointercancel',e=>finish(e,true),{passive:false});
    canvas.addEventListener('lostpointercapture',e=>{if(UX.pointers.has(e.pointerId))resetGestures()});
    canvas.addEventListener('pointerleave',()=>{if(!UX.pointers.size){scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;scene.drawRings()}});
    canvas.addEventListener('wheel',e=>{if(inputBlocked())return;e.preventDefault();const p=point(e);zoomAt(UX.zoom*Math.exp(-Ot.Math.Clamp(e.deltaY,-120,120)*.002),p.x,p.y)},{passive:false});
    for(const ev of ['gesturestart','gesturechange','gestureend'])canvas.addEventListener(ev,e=>e.preventDefault(),{passive:false});
    window.addEventListener('blur',resetGestures);document.addEventListener('visibilitychange',()=>{resetGestures();if(document.hidden)clearTimeout(Jt);else me()});
}
// Grayscale copies are cached once per original token. Alpha is unchanged.
function grayTexture(id){const key='__spent_'+id;if(Tt.textures.exists(key))return key;
    const source=Tt.textures.get(id).getSourceImage(),c=document.createElement('canvas');c.width=source.width;c.height=source.height;
    const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0);
    try{const im=ctx.getImageData(0,0,c.width,c.height),p=im.data;for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const g=.2126*p[i]+.7152*p[i+1]+.0722*p[i+2];p[i]=p[i]*.13+g*.75;p[i+1]=p[i+1]*.13+g*.77;p[i+2]=p[i+2]*.13+g*.80;}ctx.putImageData(im,0,0);Tt.textures.addCanvas(key,c);return key;}catch{return id;}
}
function removeCasualty(uid){const c=Tt.tokens.get(uid);if(c){Tt.tweens.killTweensOf(c);for(const child of c.list)Tt.tweens.killTweensOf(child);c.destroy();Tt.tokens.delete(uid)}}
const claritySync=Ve.prototype.sync;
Ve.prototype.sync=function(){
    claritySync.call(this);if(!UX.ready)return;
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid),sprite=c.getByName('token');if(!u?.alive||!sprite)continue;
        const visual=u.visualRadius||u.radius;
        if(sprite.getData('visualRadius')!==visual){
            const source=this.textures.get(u.id).getSourceImage(),ratio=source.width/source.height,E=u.radius*2,st=__figCenterPx(source,1,1);
            let dw,dh;
            if(ratio>=1){dw=Math.min(E/Math.max(.35,st.fx||1),E*1.95);dh=dw/ratio;}else{dh=Math.min(E/Math.max(.35,st.fy||1),E*1.95);dw=dh*ratio;}
            const sm=Math.min(dw,dh);if(sm>visual*2.6){const k=visual*2.6/sm;dw*=k;dh*=k;}
            sprite.setDisplaySize(dw,dh);
            sprite.setData('baseSX',sprite.scaleX);sprite.setData('baseSY',sprite.scaleY);
            sprite.setData('cxy',{x:st.x*dw,y:st.y*dh});
            sprite.setData('visualRadius',visual);
        }
    }
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid);if(!u?.alive||u.escaped){removeCasualty(uid);continue;}
        c.setAlpha(1).setVisible(this.b.phase!=='menu');const s=c.getByName('token'),spent=u.acted&&['move','shoot'].includes(this.b.phase);
        s.setAlpha(1).setTexture(spent?grayTexture(u.id):u.id).clearTint();c.setData('spent',spent);
        c.getByName('label')?.setVisible(false);const base=c.getByName('base');if(base){base.setAlpha(1);if(base.setTint)spent?base.setTint(0xb1b8bb):base.clearTint();}
        c.getByName('rim')?.setStrokeStyle((u.traits.includes('hero')?2.5:1.4)/UX.zoom,spent?0x899396:u.traits.includes('hero')?0xe4c37b:u.side==='good'?0xcbd9df:0x9c775b,.95);
    }
    if(this.b.phase==='menu'){UX.stage=null;return;}
    const stage=(this.b.phase==='preparation'?this.b.wave+1:this.b.wave)+'/'+(this.b.mapIndex||0);
    if(stage!==UX.stage&&['preparation','move','shoot','fight'].includes(this.b.phase)){UX.stage=stage;const team=this.b.alive('good');const x=team.length?team.reduce((n,u)=>n+u.x,0)/team.length:1165;const z=mobileLayout()?.78:.82;const y=this.b.mission==='defense'?(mobileLayout()&&innerHeight>innerWidth?600-Math.min(78,UX.height*.16)/z:590):690;setCamera(x,y,z,'tactical')}
    updateWorldUI();
};
const clarityRings=Ve.prototype.drawRings;
Ve.prototype.drawRings=function(){
    clarityRings.call(this);if(!UX.ready||!this.rings)return;
    // Labels retain their positions in world space, but their type stays 12–13 CSS px.
    for(const l of this.labels.list){if(l.type!=='Text')continue;
        if(l.text.includes('배치 구역')||l.text.includes('″ 남음')&&l.text.includes(' · ')&&!l.text.includes('사용')){l.setVisible(false);continue;}
        l.setFontFamily('Pretendard, sans-serif').setFontSize(12).setResolution(UX.dpr).setScale(1/UX.zoom).setPadding(6,4);
        if(UX.zoom<.4&&!l.text.includes('그론드')&&!l.text.includes('돌파'))l.setVisible(false);
    }
    if(this.objectiveLabel){this.objectiveLabel.setFontSize(12).setResolution(UX.dpr).setScale(1/UX.zoom).setVisible(this.b.phase!=='menu'&&UX.zoom>=.4&&!!this.objectiveLabel.text)}
    updateWorldUI();
};
function updateWorldUI(){
    if(!UX.ready||!Tt.actionRing)return;
    const u=actionableUnit(),g=Tt.actionRing;g.clear();const tag=ut('active-tag'),out=ut('offscreen-unit');
    if(!u||inputBlocked()||At||!['preparation','move','shoot'].includes(q.phase)){tag.classList.add('hidden');out.classList.add('hidden');return;}
    const token=Tt.tokens.get(u.uid),p=screenAt(token?.x??u.x,token?.y??u.y),r=u.radius*1.23+5/UX.zoom;
    const x=token?.x??u.x,y=token?.y??u.y;
    g.lineStyle(5/UX.zoom,0x351923,.84);g.strokeCircle(x,y,r);g.lineStyle(2.5/UX.zoom,0xf0746c,1);g.strokeCircle(x,y,r);
    // Direction chevron provides a shape cue in addition to red.
    g.fillStyle(0xf4e4b9,1);g.fillTriangle(x-4/UX.zoom,y-r-7/UX.zoom,x+4/UX.zoom,y-r-7/UX.zoom,x,y-r-2/UX.zoom);
    const on=p.x>16&&p.x<UX.width-16&&p.y>45&&p.y<UX.height-48;
    tag.classList.toggle('hidden',!on);out.classList.toggle('hidden',on);
    if(on){tag.textContent=shortName(u)+' · '+(q.phase==='preparation'?'배치':q.phase==='move'?'이동 차례':'사격 차례');tag.style.left=Math.max(82,Math.min(UX.width-82,p.x))+'px';tag.style.top=Math.max(48,p.y-r*UX.zoom-11)+'px';}
}
const clarityUpdate=Ve.prototype.update;
Ve.prototype.update=function(t){if(!UX.reduced)clarityUpdate.call(this,t);updateWorldUI();};
Ve.prototype.create=function(){
    this.drawMap();this.terrainLayer=this.add.container(0,0);this.rings=this.add.graphics().setDepth(3);this.labels=this.add.container(0,0).setDepth(8);this.actionRing=this.add.graphics().setDepth(10);
    this.cameras.main.removeBounds();this.input.enabled=false;UX.ready=true;
    resizeBattle(true);installFieldInput(this);this.sync();Yt();
};
function resizeBattle(force=false){
    const rect=ut('game').getBoundingClientRect(),w=Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
    // Respect device density, with a hard 3M-pixel surface budget on large screens.
    const dpr=Math.max(1,Math.min(window.devicePixelRatio||1,2,Math.sqrt(3000000/(w*h))));
    if(!force&&w===UX.width&&h===UX.height&&Math.abs(dpr-UX.dpr)<.01)return;
    const center=UX.ready?cameraCenter():{x:1165,y:650},z=UX.zoom;
    resetGestures();UX.width=w;UX.height=h;UX.dpr=dpr;
    if(UX.ready){const scale=Tt.scale;scale.zoom=1/dpr;scale._resetZoom=true;scale.resize(Math.round(w*dpr),Math.round(h*dpr));Tt.game.canvas.style.width=w+'px';Tt.game.canvas.style.height=h+'px';scale.refresh();Tt.cameras.main.setSize(Math.round(w*dpr),Math.round(h*dpr));setCamera(center.x,center.y,UX.cameraMode==='overview'?fitZoom():z);}
    if(!mobileLayout()){aside.inert=false;aside.removeAttribute('aria-hidden');setSheet(false)}else{aside.inert=!aside.classList.contains('open');aside.setAttribute('aria-hidden',String(!aside.classList.contains('open')))}
}
let resizeFrame=0;
function queueResize(){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>resizeBattle())}
new ResizeObserver(queueResize).observe(ut('game'));
function viewportHeight(){const vp=window.visualViewport;if(vp&&Math.abs(vp.scale-1)>.02)return;const h=Math.round(vp?.height||window.innerHeight);if(h>120)document.documentElement.style.setProperty('--app-h',h+'px');queueResize();}
window.addEventListener('resize',viewportHeight,{passive:true});window.visualViewport?.addEventListener('resize',viewportHeight,{passive:true});viewportHeight();
const pendingFonts=document.fonts.load('16px Pretendard');pendingFonts.then(()=>{if(UX.ready){for(const text of Tt.labels.list)text.updateText?.();Tt.objectiveLabel?.updateText();Tt.drawRings()}}).catch(()=>{});
function nextUnit(){if(At||Qt)return;const list=q.phase==='preparation'?q.alive('good'):q.eligible(q.side);if(!list.length||q.mode==='ai'&&q.side==='evil')return;const i=list.findIndex(u=>u.uid===q.selected);Zt(list[(i+1)%list.length].uid);Tt.focus()}
ut('next-unit').onclick=nextUnit;
function renderDock(){
    const active=actionableUnit(),selected=q.unit(q.selected),u=active||(selected?.alive?selected:null),busy=At||q.mode==='ai'&&q.side==='evil'&&['move','shoot'].includes(q.phase);
    const phase=q.phase;
    const steps=[['preparation','배치'],['move','이동 · 돌격'],['shoot','사격'],['fight','근접전']];
    ut('phases').innerHTML=steps.map(([id,label],i)=>`<span class="phase ${phase===id?'active':''}" ${phase===id?'aria-current="step"':''}><i>${String(i+1).padStart(2,'0')}</i>${label}</span>`).join('')+`<span class="turn">${phase==='preparation'?'출전 준비':At?'행동 처리 중':phase==='fight'?'교전 판정':q.side==='good'?'아군 차례':'적군 차례'}</span>`;
    ut('cp').textContent=q.cp+' CP';ut('round').textContent=(q.round||'—')+' · '+({preparation:'배치',move:'이동',shoot:'사격',fight:'근접'}[phase]||'정비');
    const place=CX.mapNames[q.mapIndex||0];
    const _info = q.phase === 'preparation' ? q.next : q.current;
    const _mod = (_info && _info.modifier) || 'clear';
    const _MN = { rain: '폭우 · 사거리↓', dark: '어둠 · 사거리↓', reinforce: '적 증원', warg: '와르그 사냥대', ambush: '기습 포위', cavalry: '기병 돌격', swarm: '고블린 떼' };
    const _MC = { rain: '#8fb8e8', dark: '#a89ae0', reinforce: '#e09a6a', warg: '#d4b45a', ambush: '#e06a6a', cavalry: '#8fc48f', swarm: '#c4b05a' };
    let _chips = _MN[_mod] ? '<span class="hud-mod" style="border-color:' + _MC[_mod] + 'aa;color:' + _MC[_mod] + '">' + _MN[_mod] + '</span>' : '';
    if (_info && _info.boss)
        _chips += '<span class="hud-mod" style="border-color:#e08a5aaa;color:#ffb08a">보스 · ' + esc(q.meta.get(_info.boss).name_ko) + '</span>';
    ut('ux-place').innerHTML = esc(place) + _chips;
    ut('wave').textContent=(q.wave||1)+' / '+(Math.floor((Math.max(1,q.wave)-1)/5)*5+5);
    const rules={defense:`라운드 끝 · 구역에 적 ${q.breachCount}기면 패배`,annihilation:'남은 적을 모두 격파',hold:`거점 우세 ${q.capture||0}/3 라운드`,survive:`생존 ${q.round||0}/5 라운드`,breakthrough:'아군 2기를 남쪽 돌파선으로',rescue:q.rescued?`구출 후 생존 ${q.capture||0}/3`:'포로 구역 확보 후 3라운드 생존',commander:'보스를 처치하면 승리'};
    ut('ux-mission').innerHTML=`<em>${CX.missionNames[q.mission]||'원정 준비'}</em>${esc(rules[q.mission]||'병사를 선택해 전열을 정하세요')}`;
    const image=ut('dock-portrait');if(u){const src=Ut(q.meta.get(u.id).file);if(image.getAttribute('src')!==src)image.src=src;image.classList.remove('hidden')}else image.classList.add('hidden');
    ut('dock-eyebrow').textContent=phase==='preparation'?'전열 배치':At?'행동 처리 중':active?'지금 조작할 병사':busy?'상대의 차례':phase==='fight'?'근접전 판정':'원정대 지휘';
    ut('dock-name').textContent=u?shortName(u):phase==='fight'?(q.fightQueue.length?'교전 중인 전열':'다음 라운드 준비'):'병사를 선택하세요';
    ut('dock-status').innerHTML=phase==='preparation'?'선택 후 빈 땅을 눌러 배치':u&&phase==='move'?`이동 <b>${(q.remaining(u)/45).toFixed(1)}″</b> · ${q.engaged(u)?'교전 중':u.acted?'이동 완료':'밝은 범위 안으로'}`:u&&phase==='shoot'?`사거리 <b>${(u.stats.shootRange/45).toFixed(0)}″</b> · 주황 고리 적을 선택`:phase==='fight'?`남은 교전 <b>${q.fightQueue.length}</b>곳`:'원정대를 정비하세요';
    const primary=ut('dock-primary');primary.classList.remove('confirm');
    if(phase==='preparation')primary.textContent='전투 시작 →';else if(phase==='fight')primary.textContent=q.fightQueue.length?'교전 해결 →':'라운드 종료';else primary.textContent=busy?'상대 행동 중':phase==='move'?'이동 종료':'사격 대기';
    primary.disabled=At||AUTO||busy||!['preparation','move','shoot','fight'].includes(phase)||(['move','shoot'].includes(phase)&&!active);
    if(At)primary.textContent='처리 중…';
    const key=q.round+'-'+phase+'-'+(active?.uid||'');if(waitConfirm===key&&!primary.disabled){primary.textContent='종료 확인 ✓';primary.classList.add('confirm')}
    const team=q.phase==='preparation'||q.mode==='ai'?q.alive('good'):q.alive(q.side);
    const signature=team.map(v=>[v.uid,v.id].join(':')).join('|');
    if(signature!==UX.rosterKey){UX.rosterKey=signature;ut('roster-strip').innerHTML=team.map(v=>`<button class="roster-unit tier-${heroGrade(v.id)}" type="button" data-unit="${v.uid}" aria-label="${esc(v.name)} 선택"><img src="${Ut(q.meta.get(v.id).file)}" alt=""></button>`).join('');
        ut('roster-strip').querySelectorAll('[data-unit]').forEach(btn=>btn.onclick=()=>{if(At||Qt)return;Zt(btn.dataset.unit);const v=q.unit(btn.dataset.unit);if(v?.alive){const p=screenAt(v.x,v.y);if(p.x<40||p.x>UX.width-40||p.y<48||p.y>UX.height-48)setCamera(v.x,v.y,UX.cameraMode==='overview'?.78:UX.zoom,'manual')}});
    }
    for(const btn of ut('roster-strip').children){const v=q.unit(btn.dataset.unit);const spent=v.acted&&['move','shoot'].includes(phase);btn.classList.toggle('is-active',v.uid===active?.uid);btn.classList.toggle('is-selected',v.uid===q.selected);btn.classList.toggle('is-spent',spent);btn.setAttribute('aria-pressed',String(v.uid===q.selected));btn.title=v.name+' · '+(v.uid===active?.uid?'현재 행동':spent?'행동 완료':'선택');btn.disabled=At;}
    ut('next-unit').disabled=At||AUTO||q.mode==='ai'&&q.side==='evil'||!['preparation','move','shoot'].includes(phase);
    ut('hint').textContent=touchLayout()?'병사 탭 → 목적지 탭 · 한 손가락: 시점 이동 · 두 손가락: 확대 / 축소':'병사 클릭 → 목적지 클릭 · 빈 땅 드래그: 시점 이동 · 휠: 확대 · Q/E: 방향 전환';
    updateWorldUI();
}
const clarityRender=Yt;
Yt=function(){const u=q.unit(q.selected);if(u&&!u.alive){q.selected='';q.autoSelect();}clarityRender();renderDock();};
// Keep the existing wait confirmation, but surface it on the persistent button.
ut('dock-primary').onclick=()=>{if(At||Qt||ut('dock-primary').disabled)return;if(['preparation','fight'].includes(q.phase)){setSheet(false);ut('action').click();return;}const u=actionableUnit();if(u){q.selected=u.uid;ut('wait').click();renderDock();}};
// Ensure the fixed controls cannot issue a second action while animation is running.
Rt=async function(fn){if(At)return;wt.unlock();clearTimeout(Jt);At=true;Tt.busy=true;resetGestures();renderDock();try{fn();renderDock();const events=q.drain();ut('action').disabled=true;ut('wait').disabled=true;for(const event of events){await $e(event);await Tt.play(event);if(['WaveStarted','Event','CommandUsed'].includes(event.type)&&event.message)Xt(event.message)}}catch(error){console.error('[battle action]',error);Xt('행동을 처리하지 못했습니다. 다시 선택해 주세요.')}finally{ut('dice').classList.add('hidden');At=false;Tt.busy=false;Tt.preview=undefined;Tt.previewPlan=null;Yt();me();}};
const clarityPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){await clarityPlay.call(this,event);if(event.type==='UnitKilled')removeCasualty(event.uid);};
const claritySchedule=me;me=function(){if(document.hidden){clearTimeout(Jt);return;}claritySchedule();};
// Switching units no longer schedules a late re-selection behind a later turn.
Zt=function(uid){const u=q.unit(uid);if(!u?.alive||At||Qt)return;if(q.phase==='move'&&q.activeMoverUid&&uid!==q.activeMoverUid){if(u.side===q.side)Rt(()=>{q.wait(q.activeMoverUid);q.selected=uid});else Xt('이동 중인 병사의 이동을 먼저 종료하세요.');return;}Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;q.selected=uid;wt.play('ui_select');Yt();};
const helpHandler=ut('help').onclick;ut('help').onclick=()=>{setSheet(false);helpHandler();const entries=ut('overlay').querySelectorAll('.help-list p');if(entries[5])entries[5].innerHTML='<b>모바일 조작 · 상태 표시</b><br>병사 탭 → 목적지 탭. 한 손가락 드래그는 카메라 이동, 두 손가락은 확대·축소입니다. 드래그 후 놓아도 이동 명령은 나가지 않습니다. 빨간 고리와 화살표는 현재 행동 병사, 회색 병사는 현재 단계의 행동 완료입니다. 전사자는 전장에서 사라집니다. 하단 명령에서 능력과 상세 수치를 확인하세요.';};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setSheet(false);document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false');if(Qt)ut('close-help')?.click();}});
window.MESBG.ui={version:UX.version,state:UX,resize:()=>resizeBattle(true),worldToScreen:screenAt,screenToWorld:worldAt,focus:()=>Tt.focus(),setCamera,active:()=>actionableUnit()?.uid||'',openSheet:setSheet,update:()=>Yt()};

/* v1.4: portrait commands, reversible recruitment and a data-driven unit registry. */
const UNIT_RULES = { version: 1, worldPerMm: 76/25, chargeTolerance: 10,
    pointsNote: '원정 밸런스용 자체 포인트. 공식 MESBG 포인트가 아님.' };
function estimatePoints(p) {
    const traits=p.traits||[];
    const value=8+Math.max(0,p.fight-3)*4+Math.max(0,p.strength-3)*5+Math.max(0,p.defence-4)*3
        +Math.max(0,p.attacks-1)*18+Math.max(0,p.wounds-1)*22+Math.max(0,p.courage-3)*2
        +(p.might||0)*6+(p.will||0)*3+(p.fate||0)*5+(p.shootRange?8+Math.max(0,4-p.shootValue)*4:0)
        +(traits.includes('mounted')?18:0)+(traits.includes('flying')?25:0)+(traits.includes('terror')?15:0)
        +(traits.includes('spear')?3:0)+Math.max(0,p.move-270)/45*2;
    return Math.max(5,Math.round(value/5)*5);
}
const UnitCatalog={};
for(const [id,meta] of q.meta){if(!zt[id]||meta.side==='terrain')continue;
    const profile=structuredClone(zt[id]),points=estimatePoints(profile);
    meta.baseMm=meta.baseMm||(id==='morgoth'?132*2/UNIT_RULES.worldPerMm:($t[meta.base]||38)*2/UNIT_RULES.worldPerMm);if(profile.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm,50);
    UnitCatalog[id]={id,enabled:true,meta:structuredClone(meta),profile,points,
        recruitCost:Math.max(30,Math.round(points*.8/5)*5),rarity:heroGrade(id,points,meta.role),
        unlockWave:profile.traits.includes('hero')?2:0,uniqueKey:profile.traits.includes('hero')?id.replace(/_(mounted|foot)$/,''):null,
        recruitable:CX.recruits.includes(id),skill:CX.skills[id]||null};
}
P.price=function(id){return UnitCatalog[id]?.recruitCost??30;};
P.rollRecruits=function(){
    this.recruitDraft=[];
    const isH=d=>(d.profile.traits||[]).includes('hero')||d.meta.role==='hero';
    const owned=new Set(this.permanent().map(u=>UnitCatalog[u.id]?.uniqueKey).filter(Boolean));
    const base=Object.values(UnitCatalog).filter(d=>d.enabled&&this.meta.has(d.id)&&(d.meta.side==='good'||this.relics.darkpact&&d.meta.side==='evil'));
    const heroes=base.filter(d=>isH(d)&&this.wave>=(d.unlockWave||0)&&!owned.has(d.uniqueKey||d.id)).map(d=>({id:d.id,r:this.rng()})).sort((a,b)=>a.r-b.r).slice(0,3);
    const troops=base.filter(d=>d.recruitable&&!isH(d)).map(d=>({id:d.id,r:this.rng()})).sort((a,b)=>a.r-b.r).slice(0,7);
    this.recruitOffers=[...heroes,...troops].map(d=>({id:d.id,bought:false}));
};
// Explicit registration happens before Phaser preload, so missing art can never silently enter recruitment.
const customSkills=new Map();
function registerUnit(def){
    if(UX.ready)throw Error('registerUnit must run before game preload; edit data/unit-catalog.json and rebuild.');
    if(!def?.id||!def.meta||!def.profile||!['good','evil'].includes(def.meta.side))throw Error('Unit needs id, metadata, side and profile');
    if(!window.__MESBG_ASSETS__[def.meta.file])throw Error('Missing embedded unit art: '+def.meta.file);
    const p={...structuredClone(Ft),...structuredClone(def.profile)};
    if(!Array.isArray(p.traits)||!['move','fight','strength','defence','attacks','wounds','courage','shootValue','shootRange','might','will','fate'].every(k=>Number.isFinite(p[k])&&p[k]>=0)||p.wounds<1||p.attacks<1)throw Error('Invalid unit profile: '+def.id);
    if(!Number.isFinite(def.meta.baseMm)||def.meta.baseMm<=0)throw Error('Explicit physical baseMm required: '+def.id);
    if(def.skill&&!customSkills.has(def.id))throw Error('A new skill requires a registered handler: '+def.id);
    const points=def.points??estimatePoints(p),cost=def.recruitCost??Math.max(30,Math.round(points*.8/5)*5);
    if(!Number.isInteger(points)||points<=0||!Number.isInteger(cost)||cost<0)throw Error('Invalid points/cost');
    const meta={...def.meta,id:def.id};if(p.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm||0,50);
    zt[def.id]=p;q.meta.set(def.id,meta);
    UnitCatalog[def.id]={...def,meta,profile:p,points,recruitCost:cost,enabled:def.enabled!==false,rarity:isHeroUnit(def.id,def.meta.role)?heroGrade(def.id,points,'hero'):(def.rarity||'normal'),unlockWave:def.unlockWave??2};
    if(def.skill){const k=def.skill;CX.skills[def.id]=[k.name,k.resource,k.cost,k.description];}
    if(def.recruitable&&!CX.recruits.includes(def.id))CX.recruits.push(def.id);
    return UnitCatalog[def.id];
}
const catalogSpawn=P.spawn;
P.spawn=function(id,side,pos){const u=catalogSpawn.call(this,id,side,pos),d=UnitCatalog[id];if(d){u.points=d.points;u.radius=(d.meta.baseMm||25)*UNIT_RULES.worldPerMm/2;u.visualRadius=d.meta.visualRadius||u.visualRadius;}return u;};
const catalogSkill=P.skill;
P.skill=function(uid){const u=this.unit(uid),handler=u&&customSkills.get(u.id);if(!handler)return catalogSkill.call(this,uid);if(!u.alive||this.skillReason(u))return false;
    const [name,resource,cost]=CX.skills[u.id];u.resources[resource]-=cost;u.skillRound=true;handler({battle:this,unit:u});this.emit('HeroSkill',u.name+' · '+name,{uid});return true;};
const catalogResume=P.resume;
P.resume=function(){if(!catalogResume.call(this))return false;for(const u of this.units){const d=UnitCatalog[u.id];if(d){u.points=d.points;u.radius=(d.meta.baseMm||25)*UNIT_RULES.worldPerMm/2;}}this.recruitDraft=(this.recruitDraft||[]).filter(i=>this.recruitOffers?.[i]&&!this.recruitOffers[i].bought);return true;};
P.toggleRecruit=function(index){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const o=this.recruitOffers[index];if(!o||o.bought)return false;
    this.recruitDraft=this.recruitDraft||[];const at=this.recruitDraft.indexOf(index);
    if(at>=0){this.recruitDraft.splice(at,1);this.save();return true;}
    const cost=this.recruitDraft.reduce((n,i)=>n+this.price(this.recruitOffers[i].id),0)+this.price(o.id);
    if(cost>this.gold||this.permanent().length+this.recruitDraft.length>=this.capacity())return false;
    const unique=UnitCatalog[o.id]?.uniqueKey;
    if(unique&&this.recruitDraft.some(i=>UnitCatalog[this.recruitOffers[i].id]?.uniqueKey===unique))return false;
    if(this.initialDraft&&zt[o.id]&&(zt[o.id].traits.includes('hero')||UnitCatalog[o.id]&&UnitCatalog[o.id].meta.role==='hero')&&this.recruitDraft.some(i=>zt[this.recruitOffers[i].id]&&(zt[this.recruitOffers[i].id].traits.includes('hero')||UnitCatalog[this.recruitOffers[i].id]&&UnitCatalog[this.recruitOffers[i].id].meta.role==='hero')))return false;
    this.recruitDraft.push(index);this.save();return true;
};
P.commitRecruits=function(){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const chosen=[...new Set(this.recruitDraft||[])];if(this.initialDraft&&!chosen.length)return false;
    if(chosen.some(i=>!this.recruitOffers[i]||this.recruitOffers[i].bought))return false;
    const total=chosen.reduce((n,i)=>n+this.price(this.recruitOffers[i].id),0);
    if(total>this.gold||this.permanent().length+chosen.length>this.capacity())return false;
    const snapshot={units:structuredClone(this.units),counter:this.counter,gold:this.gold,offers:structuredClone(this.recruitOffers)};
    for(const i of chosen){const offer=this.recruitOffers[i],u=this.spawn(offer.id,'good',{x:-1000,y:-1000});
        if(!this.placeInDeployment(u)){this.units=snapshot.units;this.counter=snapshot.counter;this.gold=snapshot.gold;this.recruitOffers=snapshot.offers;return false;}
        offer.bought=true;
    }
    this.gold-=total;this.recruitDraft=[];
    if(this.initialDraft){this.initialDraft=false;this.phase='preparation';this.campStep='';this.selected=this.alive('good')[0]?.uid||'';this.emit('Preparation','원정대가 결성됐습니다. 병사를 선택해 전열을 정하세요.');}
    else this.campStep='relic';
    this.save();return true;
};
P.mountVariant=function(u){
    if(!u||!u.alive||u.side!=='good'||u.traits.includes('mounted'))return null;
    const d=UnitCatalog[u.id];if(!d||!d.uniqueKey||!isHeroUnit(u.id))return null;
    return Object.values(UnitCatalog).find(m=>m.id!==u.id&&m.uniqueKey===d.uniqueKey&&m.profile.traits.includes('mounted'))||null;
};
P.mountCost=function(u){const v=this.mountVariant(u);if(!v)return 0;const d=UnitCatalog[u.id];return Math.max(30,Math.round(((v.points||60)-(d.points||50))*.6/5)*5);};
P.buyHorse=function(){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const cost=40;if(this.gold<cost)return false;
    this.gold-=cost;this.horses=(this.horses||0)+1;
    this.emit('Camp','군마를 구입했습니다 — 기마를 줄 도보 영웅을 지정하세요.');
    this.save();return true;
};
P.assignMount=function(uid){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    if(!(this.horses>0))return false;
    const u=this.unit(uid),v=u&&this.mountVariant(u);if(!v)return false;
    this.horses--;
    u.id=v.id;u.name=v.meta.name_ko;u.baseStats=structuredClone(zt[v.id]);u.stats=structuredClone(zt[v.id]);
    u.traits=[...new Set([...u.traits.filter(t=>t!=='dismounted'&&t!=='mounted'),...v.profile.traits])];
    if(!u.traits.includes('mounted'))u.traits.push('mounted');
    u.radius=(v.meta.baseMm||50)*UNIT_RULES.worldPerMm/2;
    u.currentWounds=Math.min(u.currentWounds,u.stats.wounds);
    this.refreshUnit(u);
    this.emit('Camp',`${v.meta.name_ko} — 군마에 올랐습니다. 이동력과 돌격이 강해집니다.`);
    this.save();return true;
};
if(!document.getElementById('tier-css')){const _st=document.createElement('style');_st.id='tier-css';_st.textContent='.recruit-card.tier-legendary{background:linear-gradient(145deg,#342d22,#172b34 66%,#302719)!important;border:2px solid #e1bb6c!important;box-shadow:inset 0 0 0 1px #ffdc864d,0 0 17px #e9b7544d!important}.recruit-card.tier-legendary:before{content:"✦";position:absolute;right:9px;top:5px;color:#ffdd8e;font-size:21px;text-shadow:0 0 12px #f3b249}.recruit-card.tier-legendary .recruit-grade{color:#ffda88}.recruit-card.tier-epic{background:linear-gradient(145deg,#29233c,#1b2e35)!important;border:2px solid #bd9cdb!important;box-shadow:inset 0 0 0 1px #d9bdf44d!important}.recruit-card.tier-epic .recruit-grade{color:#e0c5ff}.recruit-card.tier-rare{background:#243140!important;border:1px solid #81a8d0!important}.recruit-card.tier-rare .recruit-grade{color:#b6d6f4}.recruit-card.tier-elite{background:#263330!important;border:1px solid #9aad88!important}.recruit-card.tier-elite .recruit-grade{color:#bdd8a9}.recruit-card.tier-normal{border:1px solid #747c74!important}.recruit-card.tier-normal .recruit-grade{color:#d0d4c8}';document.head.appendChild(_st);}
function renderRecruitDraft(){
    const selected=q.recruitDraft||[],sum=selected.reduce((n,i)=>n+q.price(q.recruitOffers[i].id),0),capacity=q.capacity()-q.permanent().length-selected.length;
    const box=ut('overlay');
    box.innerHTML=`<div class="modal camp"><div class="eyebrow">${q.initialDraft ? '출정 · 원정대 편성' : 'STAGE ' + q.wave + ' · 원정대 정비'}</div><h2>${q.initialDraft ? '600 금화로 원정대를 꾸리세요 · 영웅은 1기까지' : '동료를 선택하세요'}</h2><p class="recruit-summary">보유 <b>${q.gold}</b> · 선택 비용 <b>${sum}</b> · 남은 금화 <b>${q.gold-sum}</b><br>선택 ${selected.length}명 · 남은 정원 ${capacity}명</p><p class="draft-help">카드를 다시 누르면 선택 취소. 아래에서 확정하면 합류합니다.</p><div class="recruit-cards">${q.recruitOffers.map((o,i)=>{const d=UnitCatalog[o.id],m=q.meta.get(o.id),p=zt[o.id],on=selected.includes(i),cost=q.price(o.id),disabled=o.bought||!on&&(cost>q.gold-sum||capacity<=0);return `<button type="button" class="recruit-card tier-${d.rarity} ${on?'is-picked':''}" data-draft="${i}" aria-pressed="${on}" ${disabled?'disabled':''}><span class="pick-mark">${on?'✓ 선택됨 · 탭하여 취소':'＋'}</span>${unitImage(o.id)}<span class="recruit-grade">${tierLabel(o.id)}</span><b>${esc(m.name_ko)}</b><small>${d.points} pt · ${CX.roleNames[m.role]||m.role}</small><p>Attack ${p.attacks} · Defense ${p.defence}<br>${esc(CX.skills[o.id]?.[0]||'전열을 지킬 동료')}</p><em>${o.bought?'합류 완료':cost+' 금화'}</em></button>`}).join('')}</div>${(()=>{const ms=q.alive('good').map(u=>q.mountVariant(u)&&{u,v:q.mountVariant(u)}).filter(Boolean);return ms.length||q.horses>0?'<div class="mount-head">군마 — 구입 후 기마를 줄 도보 영웅을 지정하세요</div><div class="mount-row" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:9px;margin-bottom:10px">'+`<button class="recruit-card mount-card" id="mount-buy" ${q.gold<40?'disabled':''}><b>군마 구입</b><small>보유 ${q.horses||0}필</small><p>도보 영웅이 말에 올라 이동력·돌격·베이스 강화</p><em>40 금화</em></button>`+ms.map(({u,v})=>`<button class="recruit-card mount-card" data-mount="${u.uid}" ${q.horses>0?'':'disabled'}>${unitImage(v.id)}<b>기마 지정 · ${esc(v.meta.name_ko)}</b><small>${esc(u.name)}</small><p>이동 ${u.stats.move}→${v.profile.move} · 기병 특성</p><em>군마 1필 소비</em></button>`).join('')+'</div>':''})()}<div class="camp-secondary"><button id="draft-clear" ${selected.length?'':'disabled'}>선택 취소</button><button id="draft-reroll" ${q.gold<10+q.rerolls*5?'disabled':''}>후보 교체 · ${10+q.rerolls*5}</button><button id="draft-expand" ${q.gold<45+q.capacityBought*25||q.capacity()>=30?'disabled':''}>정원 +2 · ${45+q.capacityBought*25}</button></div><div class="camp-confirm"><span>${selected.length?selected.length+'명 · '+sum+' 금화':'영입 없이 금화 보관'}</span><button id="draft-confirm" class="primary">${selected.length?'영입 확정':'영입 건너뛰기'} →</button></div></div>`;
    box.querySelectorAll('[data-draft]').forEach(el=>el.onclick=()=>{if(q.toggleRecruit(Number(el.dataset.draft)))wt.play('ui_select');Yt();});
    ut('draft-clear').onclick=()=>{q.recruitDraft=[];q.save();Yt();};
    ut('draft-reroll').onclick=()=>{q.reroll();Yt();};ut('draft-expand').onclick=()=>{q.expand();Yt();};
    ut('draft-confirm').onclick=()=>{if(q.commitRecruits())wt.play('reward_select');else Xt('영입할 공간이 부족합니다. 선택을 조정하세요.');Yt();};
    box.querySelectorAll('[data-mount]').forEach(el=>el.onclick=()=>{if(q.assignMount(el.dataset.mount))wt.play('reward_select');Yt();});
    const mb=ut('mount-buy');if(mb)mb.onclick=()=>{if(q.buyHorse())wt.play('reward_select');Yt();};
}

// One shared, collision-safe contact solver for AI, preview and committed charge.
const exactPlan=ve;
let chargeCache=new Map();
function chargePlan(u,target,units,terrain,budget){
    if(!u?.alive||!target?.alive||u.side===target.side||ht(u,target)>budget+u.radius+target.radius+UNIT_RULES.chargeTolerance)return null;
    const key=[u.uid,target.uid,budget,...units.filter(v=>v.alive).map(v=>`${v.uid}:${v.x},${v.y},${v.radius}`),...terrain.map(t=>`${t.id}:${t.active}:${t.x},${t.y}`)].join('|');
    if(chargeCache.has(key))return chargeCache.get(key);
    const limit=budget+UNIT_RULES.chargeTolerance,angle=Math.atan2(u.y-target.y,u.x-target.x),radius=u.radius+target.radius+.6;
    const candidates=Array.from({length:48},(_,i)=>{const a=angle+(i%2?1:-1)*Math.ceil(i/2)*Math.PI/24;return{x:target.x+Math.cos(a)*radius,y:target.y+Math.sin(a)*radius};})
        .filter(p=>ht(u,p)<=limit&&Et(u,p,units,terrain)).sort((a,b)=>ht(u,a)-ht(u,b));
    let found=null;
    for(const p of candidates){if(bt(u,p,units,terrain)){found={to:p,path:[{x:u.x,y:u.y},p],distance:ht(u,p),snapped:true,yields:[]};break;}}
    if(!found)for(const p of candidates.slice(0,8)){const plan=exactPlan(u,p,units,terrain,limit,{snap:false,chargeTarget:target});if(plan&&(!found||plan.distance<found.distance))found=plan;}
    if(chargeCache.size>100)chargeCache.clear();chargeCache.set(key,found);return found;
}
ve=function(u,to,units,terrain,budget=u.stats.move,options={}){return options.chargeTarget?chargePlan(u,options.chargeTarget,units,terrain,budget):exactPlan(u,to,units,terrain,budget,options);};
P.charge=function(uid,targetId){const u=this.unit(uid),v=this.unit(targetId);if(this.phase!=='move'||!u||!this.canAct(u)||this.engaged(u))return false;const p=chargePlan(u,v,this.alive(),this.terrain,this.remaining(u));return p?this.move(uid,p.to,targetId):false;};

// A tap chooses a destination; the persistent action button commits it.
UX.intent=null;
function clearIntent(){UX.intent=null;Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;ut('intent-cancel')?.classList.add('hidden');}
function setIntent(intent){UX.intent=intent;renderDock();Tt.drawRings();}
function planIntent(point,foe){const u=actionableUnit();if(!u||At||AUTO)return;
    if(q.phase==='preparation'){const p=Be(u,point,q.alive(),q.terrain,95,v=>v.y>=285&&v.y<=pt.deployY);if(!p){Xt('배치 구역의 빈 곳을 선택하세요.');return;}setIntent({kind:'deploy',uid:u.uid,to:p});return;}
    if(q.phase==='move'){const plan=foe?chargePlan(u,foe,q.alive(),q.terrain,q.remaining(u)):ve(u,point,q.alive(),q.terrain,q.remaining(u));
        if(!plan){clearIntent();renderDock();Xt(foe?'돌격 경로가 막혀 있거나 이동력이 부족합니다.':'이동 가능한 착지점을 선택하세요.');Tt.drawRings();return;}
        setIntent({kind:foe?'charge':'move',uid:u.uid,target:foe?.uid,to:plan.to,plan});return;}
    if(q.phase==='shoot'&&foe){if(!q.validTargets(u).includes(foe)){Xt('사거리 또는 사선을 확인하세요.');return;}setIntent({kind:'shoot',uid:u.uid,target:foe.uid,to:{x:foe.x,y:foe.y}});}
}
const directPoint=Tt.onPoint,directUnit=Tt.onUnit;
Tt.onPoint=p=>touchLayout()?planIntent(p):directPoint(p);
Tt.onUnit=uid=>{const v=q.unit(uid),u=actionableUnit();if(touchLayout()&&u&&v&&v.side!==u.side&&['move','shoot'].includes(q.phase))planIntent(v,v);else{clearIntent();directUnit(uid);}};
Zt=function(uid){const u=q.unit(uid);if(!u?.alive||At||Qt||AUTO)return;
    if(q.phase==='move'&&q.activeMoverUid&&uid!==q.activeMoverUid){if(u.side===q.side)setIntent({kind:'switch',uid:q.activeMoverUid,target:uid});else Xt('현재 병사의 이동을 먼저 종료하세요.');return;}
    clearIntent();q.selected=uid;wt.play('ui_select');Yt();};
ut('dock-primary').insertAdjacentHTML('beforebegin','<button type="button" id="intent-cancel" class="hidden" aria-label="명령 취소">취소</button>');
ut('intent-cancel').onclick=()=>{clearIntent();renderDock();Tt.drawRings();};
const baseDock=renderDock;
renderDock=function(){baseDock();const p=UX.intent,b=ut('dock-primary');ut('intent-cancel').classList.toggle('hidden',!p);
    if(p&&!At){b.disabled=false;b.classList.add('confirm');b.textContent=({move:'이동 확정',charge:'돌격 확정',shoot:'사격 확정',deploy:'배치 확정',switch:'종료 후 선택'})[p.kind];ut('dock-status').textContent=p.kind==='switch'?'현재 병사의 이동 종료 후 선택':p.plan?`${(p.plan.distance/45).toFixed(1)}″ · 확정 전 취소 가능`:'확정 전 취소 가능';}
    ut('hint').textContent=touchLayout()?'병사 → 목적지 → 확정 · 드래그: 화면 이동 · 두 손가락: 확대':'클릭 이동 · 드래그 시점 이동 · 휠 확대';
};
const defaultPrimary=ut('dock-primary').onclick;
ut('dock-primary').onclick=()=>{const p=UX.intent;if(!p){defaultPrimary();return;}if(At||Qt)return;clearIntent();setSheet(false);Rt(()=>{
    let ok=false;if(p.kind==='move')ok=q.move(p.uid,p.to);if(p.kind==='charge')ok=q.charge(p.uid,p.target);if(p.kind==='shoot')ok=q.shoot(p.uid,p.target);if(p.kind==='deploy')ok=q.deploy(p.uid,p.to);
    if(p.kind==='switch'){ok=q.wait(p.uid);if(ok)q.selected=p.target;}
    if(!ok)Xt('명령을 실행하지 못했습니다. 위치와 차례를 다시 확인하세요.');
});};
const actionBeforeV14=Rt;
Rt=async function(fn){if(At)return;clearIntent();if(mobileLayout())setSheet(false);return actionBeforeV14(fn);};
// The closest visible figure wins hit selection. No hero-priority stealing of taps.
Ve.prototype.hit=function(p){const min=touchLayout()?23/(UX.zoom||1):0;return this.b.alive().filter(u=>ht(p,u)<=Math.max(min,u.radius+7,(u.visualRadius||u.radius)*.85)).sort((a,b)=>ht(p,a)-ht(p,b))[0];};
const ringV14=Ve.prototype.drawRings;
Ve.prototype.drawRings=function(){const intent=UX.intent;if(intent){this.preview=intent.to;this.previewPlan=intent.plan||null;this.chargeTarget=intent.kind==='charge'?{u:q.unit(intent.target),plan:intent.plan}:null;}ringV14.call(this);
    if(intent?.kind==='deploy'&&this.rings){this.rings.lineStyle(2/UX.zoom,0xc7e2cf,1);this.rings.strokeCircle(intent.to.x,intent.to.y,q.unit(intent.uid).radius);}
    if(intent?.kind==='shoot'){const u=q.unit(intent.uid),v=q.unit(intent.target);this.rings.lineStyle(2/UX.zoom,0xe8c485,.95);this.rings.lineBetween(u.x,u.y,v.x,v.y);}
};
let uiPhase='',uiActive='';
const renderBeforeV14=Yt;
Yt=function(){const key=q.phase+'/'+q.campStep,modal=ut('overlay').querySelector('.modal'),scroll=key===uiPhase?(modal?.scrollTop||0):0,strip=ut('roster-strip').scrollLeft;
    if(key!==uiPhase){clearIntent();setSheet(false);closeRelicInfo();document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false');}
    renderBeforeV14();if(!Qt&&q.phase==='reward'&&q.campStep==='recruit')renderRecruitDraft();
    const nextModal=ut('overlay').querySelector('.modal');if(nextModal)nextModal.scrollTop=scroll;ut('roster-strip').scrollLeft=strip;
    const active=actionableUnit();if(UX.ready&&active&&active.uid!==uiActive&&!At&&!UX.gesture&&q.side==='good'){
        const pos=screenAt(active.x,active.y);if(pos.x<50||pos.x>UX.width-50||pos.y<80||pos.y>UX.height-72)setCamera(active.x,active.y,UX.zoom,'tactical');
        const btn=ut('roster-strip').querySelector(`[data-unit="${active.uid}"]`);if(btn){const left=btn.offsetLeft,stripEl=ut('roster-strip');if(left<stripEl.scrollLeft||left+btn.offsetWidth>stripEl.scrollLeft+stripEl.clientWidth)stripEl.scrollLeft=Math.max(0,left-stripEl.clientWidth/2+btn.offsetWidth/2);}}
    uiPhase=key;uiActive=active?.uid||'';renderDock();
};
const phaseHelp=ut('help').onclick;
ut('help').onclick=()=>{clearIntent();phaseHelp();const ps=ut('overlay').querySelectorAll('.help-list p');if(ps[0])ps[0].innerHTML='<b>모바일 이동</b><br>병사 선택 → 목적지 선택 → 하단 확정. 확정 전에는 취소하거나 다른 목적지를 선택할 수 있습니다. 한 손가락 드래그는 화면 이동, 두 손가락은 확대·축소입니다.';if(ps[3])ps[3].innerHTML='<b>동료 영입</b><br>카드를 탭해 선택하고 다시 탭해 취소합니다. 영입 확정을 눌러야 금화가 차감되고 합류합니다. 포인트는 이 게임의 원정 밸런스 수치입니다.';};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&UX.intent){clearIntent();renderDock();Tt.drawRings();}});

// Existing seven effect assets are routed by action and weapon, never by sprite silhouette.
function effectType(u,kind){if(kind==='shot')return'shoot';const w=q.meta.get(u.id)?.weapon||'';if(u.traits.includes('wizard')||w==='staff')return'cast';if(/spear|pike|lance/.test(w))return'thrust';if(/claw|bite|fang|talon|whip/.test(w)||u.traits.includes('beast'))return'pounce';if(/mace|hammer|club|axe|twohanded|drum|bomb/.test(w)||u.traits.includes('monster'))return'smash';return'slash';}
Ve.prototype.combat=async function(result){
    if(window._lwbFx)return;
    const cam=this.cameras&&this.cameras.main;
    if(this.textures&&!this.textures.exists('fx-spark')){const g0=this.add.graphics();g0.fillStyle(0xffffff,1);g0.fillCircle(4,4,3.4);g0.generateTexture('fx-spark',8,8);g0.destroy();}
    if(this.textures&&!this.textures.exists('fx-flash')){const f0=this.add.graphics();for(let r=30;r>0;r-=6)f0.fillStyle(0xffffff,.14+r/30*.5).fillCircle(32,32,r);f0.generateTexture('fx-flash',64,64);f0.destroy();}
    if(this.textures&&!this.textures.exists('fx-ring')){const r0=this.add.graphics();r0.lineStyle(7,0xffffff,.9);r0.strokeCircle(48,48,42);r0.generateTexture('fx-ring',96,96);r0.destroy();}
    for(const K of result.trappedUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-25,'포위 · 추가 타격',{fontFamily:'Pretendard',fontSize:'16px',color:'#ffdb9c',backgroundColor:'#5d241cee',padding:{x:8,y:5}}).setOrigin(.5).setDepth(20);this.time.delayedCall(1500,()=>p.destroy());}
    for(const K of result.knockedDownUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-45,'기병 충격 · 넘어짐',{fontFamily:'Pretendard',fontSize:'17px',color:'#f9edba',backgroundColor:'#31504cf0',padding:{x:8,y:5}}).setOrigin(.5).setDepth(21);this.time.delayedCall(1400,()=>p.destroy());}
    const burst=(x,y,color,n,spd)=>{for(let i=0;i<n;i++){const a=Math.random()*6.2832,d=(16+Math.random()*34)*spd,p=this.add.image(x,y,'fx-spark').setDepth(15).setTint(color).setScale(.5+Math.random()*.9).setAlpha(.95);this.tween(p,{x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,alpha:0,scale:.08},200+Math.random()*160).then(()=>p.destroy());}};
    for(const hit of result.strikeResults.slice(0,qt>=20?2:12)){
        const u=this.b.unit(hit.attacker),v=this.b.unit(hit.target),ac=this.tokens.get(u?.uid),vc=this.tokens.get(v?.uid),sprite=ac?.getByName('token'),vsprite=vc?.getByName('token');
        if(!u||!v||!sprite)continue;
        const type=effectType(u,result.kind),angle=Math.atan2(v.y-u.y,v.x-u.x),size=Math.max(v.radius*3.1,90/UX.zoom);
        const heavy=type==='smash'||type==='cast'||!!u.traits.includes('monster')||!!u.traits.includes('boss');
        const fx=this.add.image(type==='shoot'?u.x:v.x,type==='shoot'?u.y:v.y,'fx-'+type).setDepth(14).setDisplaySize(size,size).setRotation(type==='smash'||type==='cast'?0:angle);
        if(type==='cast')fx.setTint(0xbfd9ff);else if(type==='smash')fx.setTint(0xe8c9a0);
        const flash=this.add.image(v.x,v.y,'fx-flash').setDepth(15).setBlendMode(Phaser.BlendModes.ADD).setScale(hit.wound||hit.killed?v.radius*4/64:v.radius*2.4/64).setAlpha(hit.wound||hit.killed?.95:.55);
        this.tween(flash,{alpha:0,scale:flash.scaleX*.25},150).then(()=>flash.destroy());
        const ring=this.add.image(v.x,v.y,'fx-ring').setDepth(14).setTint(heavy?0xffd9a0:0xfff4dc).setScale(v.radius*1.4/96).setAlpha(.8);
        this.tween(ring,{scale:ring.scaleX*(hit.killed?3.4:2.4),alpha:0},hit.killed?340:230).then(()=>ring.destroy());
        this.soundFX.play(type==='shoot'?'arrow_release':hit.wound?'sword_flesh':'sword_shield');
        const sx=sprite.getData('baseSX')||sprite.scaleX,sy=sprite.getData('baseSY')||sprite.scaleY,duration=qt>=20?18:Math.max(160,300/qt),start=performance.now();
        const lunge=type==='shoot'?5:type==='thrust'?18:type==='pounce'?15:type==='cast'?-6:13;
        await new Promise(resolve=>{const frame=()=>{if(!fx.scene){resolve();return;}
            const t=Math.min(1,(performance.now()-start)/duration),sw=Math.sin(t*Math.PI);
            if(type==='shoot')fx.setPosition(u.x+(v.x-u.x)*t,u.y+(v.y-u.y)*t).setAlpha(1-t*.3);
            else if(type==='slash'){const bump=1+sw*.24;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setRotation(angle-.65+t*1.05);}
            else if(type==='thrust'){const bump=1+sw*.18;fx.setDisplaySize(size*(bump+sw*.3),size*bump).setAlpha(sw);}
            else if(type==='pounce'){const bump=1+sw*.3;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setRotation(angle-.4+t*.9).setPosition(v.x-Math.cos(angle+1.57)*10*t,v.y-Math.sin(angle+1.57)*10*t);}
            else if(type==='cast'){const bump=.7+t*.8;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setPosition(v.x,v.y-14*t);}
            else{const bump=1.5-t*.5;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw);}
            if(!UX.reduced&&type!=='cast')sprite.setPosition(Math.cos(angle)*sw*lunge,Math.sin(angle)*sw*lunge);
            if(t<1)requestAnimationFrame(frame);else resolve();};frame();});
        fx.destroy();sprite.setScale(sx,sy).setPosition(0,0);
        if(hit.wound||hit.killed){
            burst(v.x,v.y,hit.killed?0xd8452c:0xe8b090,hit.killed?16:9,hit.killed?1.6:1);
            if(vsprite){vsprite.setTintFill(0xd8452c);this.time.delayedCall(130,()=>vsprite.scene&&vsprite.clearTint());}
        }else burst(v.x,v.y,0xffdca0,7,.8);
        if(heavy||hit.killed)cam&&cam.shake(80,heavy?.0045:.003);
        if(hit.killed&&vsprite)await this.tween(vsprite,{angle:vsprite.angle+78,alpha:.25,y:vsprite.y+7},230);
        const label=this.add.text(v.x,v.y-v.radius-15,hit.prevented||(hit.wound?'−1':'Defense'),{fontFamily:'Pretendard',fontSize:'15px',color:hit.wound?'#ffc4ab':'#e8dfc5',stroke:'#141a17',strokeThickness:3}).setOrigin(.5).setResolution(UX.dpr).setScale(1/UX.zoom).setDepth(15);
        this.tween(label,{y:label.y-24,alpha:0},480).then(()=>label.destroy());if(hit.killed)vc&&vc.setVisible(false);
    }
    await Promise.all(result.pushVectors.map(p=>{const c=this.tokens.get(p.uid);return c?this.tween(c,{x:p.to.x,y:p.to.y},180):Promise.resolve();}));
};

// The older play wrapper handles HeroSkill; its asset is changed to cast/rally below.
const effectPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.type==='CommandUsed'){const u=this.b.unit(event.uid||this.b.selected);if(u){const fx=this.add.image(u.x,u.y,'fx-rally').setDepth(13).setDisplaySize(140,140);await this.tween(fx,{displayWidth:230,displayHeight:230,alpha:0},350);fx.destroy();}}return effectPlay.call(this,event);};
window.MESBG.ui.confirm=()=>ut('dock-primary').click();window.MESBG.ui.cancel=()=>ut('intent-cancel').click();
window.MESBG.catalog={rules:UNIT_RULES,units:UnitCatalog,estimatePoints,register:registerUnit,registerSkill:(id,fn)=>customSkills.set(id,fn)};
window.MESBG.chargePlan=chargePlan;window.MESBG.effectType=effectType;window.MESBG.plan=ve;window.MESBG.act=fn=>Rt(fn);
// Optional extensions: data definitions plus skill handlers, evaluated before preload.
for(const [id,handler] of Object.entries(window.MESBG_SKILL_HANDLERS||{}))customSkills.set(id,handler);
// ---- v1.6 full roster: extra units from the asset catalog (MESBG army-book profiles) ----
window.MESBG_EXTRA_UNITS=[{"id":"gundabad_warg_rider","meta":{"id":"gundabad_warg_rider","name_ko":"군다바드 와르그기병","name_en":"Gundabad Warg Rider","side":"evil","faction":"gundabad","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/gundabad_warg_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},
{"id":"haradrim_raider","meta":{"id":"haradrim_raider","name_ko":"하라드림 기마약탈자","name_en":"Haradrim Raider","side":"evil","faction":"harad","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_raider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},
{"id":"dragon_knight","meta":{"id":"dragon_knight","name_ko":"드래곤 나이트","name_en":"Dragon Knight","side":"evil","faction":"rhun","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/dragon_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},
{"id":"khandish_horseman","meta":{"id":"khandish_horseman","name_ko":"칸드 기수","name_en":"Khandish Horseman","side":"evil","faction":"rhun","role":"cavalry","weapon":"axe","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_horseman.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},
{"id":"khandish_chieftain","meta":{"id":"khandish_chieftain","name_ko":"칸드 족장","name_en":"Khandish Chieftain","side":"evil","faction":"rhun","role":"hero","weapon":"axe","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_chieftain.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},
{"id":"khandish_chariot","meta":{"id":"khandish_chariot","name_ko":"칸드 전차","name_en":"Khandish Chariot","side":"evil","faction":"rhun","role":"monster","weapon":"lance","base":"XXL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_chariot.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":400,"fight":4,"strength":5,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},
{"id":"sons_of_eorl","meta":{"id":"sons_of_eorl","name_ko":"에오를의 아들들","name_en":"Sons of Éorl","side":"good","faction":"rohan","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/sons_of_eorl.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":true,"unlockWave":4,"rarity":"rare"},
{"id":"dead_rider","meta":{"id":"dead_rider","name_ko":"망자 기병","name_en":"Rider of the Dead","side":"good","faction":"dead","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-legends-good-v2.png","file":"tokens/dead_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["terror","mounted","spear"]},"recruitable":true,"unlockWave":6,"rarity":"epic"},{"id":"fingolfin_mounted","meta":{"id":"fingolfin_mounted","name_ko":"핑골핀 (로칼로르)","name_en":"Fingolfin on Rochallor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"XL","sheet":"roster-silmarillion-good-v1.png","file":"tokens/fingolfin_mounted.png","visualBase":"XL","visualRadius":60,"baseMm":50},"profile":{"move":400,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":4,"courage":9,"shootValue":0,"shootRange":0,"might":4,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":6,"uniqueKey":"fingolfin"},{"id":"turgon","meta":{"id":"turgon","name_ko":"투르곤","name_en":"Turgon","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/turgon.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"turgon"},{"id":"fingon","meta":{"id":"fingon","name_ko":"핑곤","name_en":"Fingon","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/fingon.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"fingon"},{"id":"ecthelion","meta":{"id":"ecthelion","name_ko":"엑텔리온","name_en":"Ecthelion","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/ecthelion.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"ecthelion"},{"id":"maedhros","meta":{"id":"maedhros","name_ko":"마이드로스","name_en":"Maedhros","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/maedhros.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"maedhros"},{"id":"finrod_felagund","meta":{"id":"finrod_felagund","name_ko":"핀로드 펠라군드","name_en":"Finrod Felagund","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/finrod_felagund.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":4,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"finrod_felagund"},{"id":"celegorm","meta":{"id":"celegorm","name_ko":"켈레고름","name_en":"Celegorm","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/celegorm.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":290,"fight":7,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":3,"shootRange":700,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"celegorm"},{"id":"tuor","meta":{"id":"tuor","name_ko":"투오르","name_en":"Tuor","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/tuor.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"tuor"},{"id":"hurin_thalion","meta":{"id":"hurin_thalion","name_ko":"후린 탈리온","name_en":"Hurin Thalion","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/hurin_thalion.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":5,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"hurin_thalion"},{"id":"thingol","meta":{"id":"thingol","name_ko":"싱골","name_en":"Thingol","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/thingol.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"thingol"},{"id":"tom_bombadil","meta":{"id":"tom_bombadil","name_ko":"톰 봄바딜","name_en":"Tom Bombadil","side":"good","faction":"other","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/tom_bombadil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":260,"fight":6,"strength":4,"defence":7,"attacks":2,"wounds":5,"courage":10,"shootValue":0,"shootRange":0,"might":2,"will":6,"fate":3,"traits":["hero","terror"]},"recruitable":true,"unlockWave":7,"uniqueKey":"tom_bombadil"},{"id":"goldberry","meta":{"id":"goldberry","name_ko":"골드베리","name_en":"Goldberry","side":"good","faction":"other","role":"hero","weapon":"sword","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/goldberry.png","visualBase":"M","visualRadius":40,"baseMm":25},"profile":{"move":270,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":3,"courage":9,"shootValue":0,"shootRange":0,"might":1,"will":5,"fate":3,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":7,"uniqueKey":"goldberry"},{"id":"witchking_foot","meta":{"id":"witchking_foot","name_ko":"마술왕(도보)","name_en":"Witch-king on foot","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"lotr-tokens-v1.png","file":"tokens/witchking_foot.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_mounted","meta":{"id":"witchking_mounted","name_ko":"마술왕(기마)","name_en":"Witch-king mounted","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"witchking-mounted-topdown-v1.png","file":"tokens/witchking_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","mounted","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_mounted_sheet","meta":{"id":"witchking_mounted_sheet","name_ko":"마술왕(기마·예비)","name_en":"Witch-king mounted (alt)","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-enemy-heroes-v1.png","file":"tokens/witchking_mounted_sheet.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","mounted","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_foot_mace","meta":{"id":"witchking_foot_mace","name_ko":"마술왕(철퇴)","name_en":"Witch-king with mace","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-enemy-heroes-v1.png","file":"tokens/witchking_foot_mace.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"nazgul_sword","meta":{"id":"nazgul_sword","name_ko":"나즈굴(검)","name_en":"Nazgul, sword","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-enemy-heroes-v1.png","file":"tokens/nazgul_sword.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"orc_shaman","meta":{"id":"orc_shaman","name_ko":"오크 주술사","name_en":"Orc Shaman","side":"evil","faction":"moria","role":"support","weapon":"staff","base":"S","sheet":"roster-enemy-heroes-v1.png","file":"tokens/orc_shaman.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_spearman","meta":{"id":"orc_spearman","name_ko":"오크 창병","name_en":"Orc Spearman","side":"evil","faction":"mordor","role":"infantry","weapon":"spear","base":"S","sheet":"roster-enemy-troops-v1.png","file":"tokens/orc_spearman.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_swordshield","meta":{"id":"uruk_swordshield","name_ko":"우르크하이 검방","name_en":"Uruk-hai, sword & shield","side":"evil","faction":"isengard","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/uruk_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morannon_orc","meta":{"id":"morannon_orc","name_ko":"모라논 오크","name_en":"Morannon Orc","side":"evil","faction":"mordor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/morannon_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"haradrim_spearman","meta":{"id":"haradrim_spearman","name_ko":"하라드림 창병","name_en":"Haradrim Spearman","side":"evil","faction":"harad","role":"infantry","weapon":"spear","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/haradrim_spearman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"eowyn","meta":{"id":"eowyn","name_ko":"에오윈","name_en":"Eowyn","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"M","sheet":"roster-free-heroes-v1.png","file":"tokens/eowyn.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eowyn"},{"id":"frodo","meta":{"id":"frodo","name_ko":"프로도","name_en":"Frodo","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-free-heroes-v1.png","file":"tokens/frodo.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":230,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"frodo"},{"id":"rohan_royal_guard","meta":{"id":"rohan_royal_guard","name_ko":"로한 근위병","name_en":"Rohan Royal Guard","side":"good","faction":"rohan","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-free-troops-v1.png","file":"tokens/rohan_royal_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"mountain_troll","meta":{"id":"mountain_troll","name_ko":"산악 트롤","name_en":"Mountain Troll","side":"evil","faction":"mordor","role":"monster","weapon":"club","base":"XXL","sheet":"roster-monsters-v1.png","file":"tokens/mountain_troll.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"shelob","meta":{"id":"shelob","name_ko":"셀로브","name_en":"Shelob","side":"evil","faction":"mordor","role":"monster","weapon":"various","base":"XXL","sheet":"roster-monsters-v1.png","file":"tokens/shelob.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":6,"strength":5,"defence":8,"attacks":4,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"barrow_wight","meta":{"id":"barrow_wight","name_ko":"고분 망령","name_en":"Barrow-wight","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"M","sheet":"roster-monsters-v1.png","file":"tokens/barrow_wight.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"barrow_wight"},{"id":"nazgul_sword_2","meta":{"id":"nazgul_sword_2","name_ko":"나즈굴(검·B)","name_en":"Nazgul, sword (v2)","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_sword_2.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"nazgul_mace","meta":{"id":"nazgul_mace","name_ko":"나즈굴(철퇴)","name_en":"Nazgul, mace","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_mace.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"nazgul_mounted","meta":{"id":"nazgul_mounted","name_ko":"나즈굴(기마)","name_en":"Nazgul mounted","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","mounted","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"morgul_knight","meta":{"id":"morgul_knight","name_ko":"모르굴 기사","name_en":"Morgul Knight","side":"evil","faction":"mordor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/morgul_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"dwimmerlaik","meta":{"id":"dwimmerlaik","name_ko":"드위머레이크(갑옷 나즈굴)","name_en":"Dwimmerlaik","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/dwimmerlaik.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"dwimmerlaik"},{"id":"mt_swordshield","meta":{"id":"mt_swordshield","name_ko":"미나스 티리스 검방","name_en":"MT sword & shield","side":"good","faction":"gondor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_spearshield","meta":{"id":"mt_spearshield","name_ko":"미나스 티리스 창방","name_en":"MT spear & shield","side":"good","faction":"gondor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_spearshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_bowman","meta":{"id":"mt_bowman","name_ko":"미나스 티리스 궁수","name_en":"MT bowman","side":"good","faction":"gondor","role":"infantry","weapon":"bow","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_bowman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_captain","meta":{"id":"mt_captain","name_ko":"미나스 티리스 장교","name_en":"MT shield captain","side":"good","faction":"gondor","role":"infantry","weapon":"","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_captain.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"mt_captain"},{"id":"mt_fountain_guard","meta":{"id":"mt_fountain_guard","name_ko":"샘물수위병","name_en":"Fountain Court Guard","side":"good","faction":"gondor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_fountain_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":7,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"orc_sword2","meta":{"id":"orc_sword2","name_ko":"오크(검)","name_en":"Orc, sword","side":"evil","faction":"mordor","role":"infantry","weapon":"sword","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_sword2.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_swordshield","meta":{"id":"orc_swordshield","name_ko":"오크(검방)","name_en":"Orc, sword & shield","side":"evil","faction":"mordor","role":"infantry","weapon":"sword_shield","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_swordshield.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_spear2","meta":{"id":"orc_spear2","name_ko":"오크(창)","name_en":"Orc, spear","side":"evil","faction":"mordor","role":"infantry","weapon":"spear","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_spear2.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_twohanded","meta":{"id":"orc_twohanded","name_ko":"오크(양손도끼)","name_en":"Orc, two-handed axe","side":"evil","faction":"mordor","role":"infantry","weapon":"twohanded","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_twohanded.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_bow","meta":{"id":"orc_bow","name_ko":"오크(활)","name_en":"Orc, bow","side":"evil","faction":"mordor","role":"infantry","weapon":"bow","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_bow.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_drummer","meta":{"id":"orc_drummer","name_ko":"오크 전쟁북","name_en":"Orc war drummer","side":"evil","faction":"mordor","role":"support","weapon":"drum","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_drummer.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_axeshield","meta":{"id":"dwarf_axeshield","name_ko":"드워프 도끼방","name_en":"Dwarf, axe & shield","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_axeshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_2haxe","meta":{"id":"dwarf_2haxe","name_ko":"드워프 양손도끼","name_en":"Dwarf, two-handed axe","side":"good","faction":"dwarf","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_2haxe.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":5,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_ranger","meta":{"id":"dwarf_ranger","name_ko":"드워프 레인저","name_en":"Dwarf Ranger","side":"good","faction":"dwarf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_ranger.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"khazad_guard","meta":{"id":"khazad_guard","name_ko":"카자드 근위병","name_en":"Khazad Guard","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/khazad_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":8,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"iron_guard","meta":{"id":"iron_guard","name_ko":"아이언 가드","name_en":"Iron Guard","side":"good","faction":"dwarf","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/iron_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":8,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"dwarf_banner","meta":{"id":"dwarf_banner","name_ko":"드워프 기수","name_en":"Dwarf banner bearer","side":"good","faction":"dwarf","role":"support","weapon":"banner","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_banner.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf","banner"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_swordshield","meta":{"id":"elf_swordshield","name_ko":"엘프 검방","name_en":"Elf, sword & shield","side":"good","faction":"elf","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_spear","meta":{"id":"elf_spear","name_ko":"엘프 창병","name_en":"Elf, spear","side":"good","faction":"elf","role":"infantry","weapon":"spear","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_bow","meta":{"id":"elf_bow","name_ko":"엘프 궁수","name_en":"Elf, bow","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_bow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_glaive","meta":{"id":"elf_glaive","name_ko":"엘프 글레이브","name_en":"Elf, glaive","side":"good","faction":"elf","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_glaive.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"galadhrim_warrior","meta":{"id":"galadhrim_warrior","name_ko":"갈라드림 전사","name_en":"Galadhrim Warrior","side":"good","faction":"lothlorien","role":"infantry","weapon":"sword","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/galadhrim_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"elf_knight","meta":{"id":"elf_knight","name_ko":"엘프 기마기사","name_en":"Elf Knight","side":"good","faction":"rivendell","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"uruk_swordshield2","meta":{"id":"uruk_swordshield2","name_ko":"우르크하이 검방","name_en":"Uruk-hai, sword & shield","side":"evil","faction":"isengard","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_swordshield2.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_pike","meta":{"id":"uruk_pike","name_ko":"우르크하이 파이크","name_en":"Uruk-hai, pike","side":"evil","faction":"isengard","role":"infantry","weapon":"pike","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_pike.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_crossbow","meta":{"id":"uruk_crossbow","name_ko":"우르크하이 석궁","name_en":"Uruk-hai, crossbow","side":"evil","faction":"isengard","role":"infantry","weapon":"crossbow","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_crossbow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":700,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_scout","meta":{"id":"uruk_scout","name_ko":"우르크하이 스카웃","name_en":"Uruk-hai Scout","side":"evil","faction":"isengard","role":"infantry","weapon":"sword","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_scout.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_berserker2","meta":{"id":"uruk_berserker2","name_ko":"우르크하이 광전사","name_en":"Uruk-hai Berserker","side":"evil","faction":"isengard","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_berserker2.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":5,"defence":5,"attacks":2,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_banner","meta":{"id":"uruk_banner","name_ko":"우르크하이 기수","name_en":"Uruk-hai banner bearer","side":"evil","faction":"isengard","role":"support","weapon":"banner","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_banner.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["banner"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_spear","meta":{"id":"haradrim_spear","name_ko":"하라드림 창병","name_en":"Haradrim spearman","side":"evil","faction":"harad","role":"infantry","weapon":"spear","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_bow","meta":{"id":"haradrim_bow","name_ko":"하라드림 궁수","name_en":"Haradrim archer","side":"evil","faction":"harad","role":"infantry","weapon":"bow","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_bow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_priest","meta":{"id":"haradrim_priest","name_ko":"하라드림 전사제","name_en":"Haradrim warrior priest","side":"evil","faction":"harad","role":"support","weapon":"staff","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_priest.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_phalanx","meta":{"id":"easterling_phalanx","name_ko":"이스터링 방진병","name_en":"Easterling phalangite","side":"evil","faction":"easterling","role":"infantry","weapon":"pike","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_phalanx.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_swordshield","meta":{"id":"easterling_swordshield","name_ko":"이스터링 검방","name_en":"Easterling, sword & shield","side":"evil","faction":"easterling","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_kataphrakt","meta":{"id":"easterling_kataphrakt","name_ko":"이스터링 중기병","name_en":"Easterling Kataphrakt","side":"evil","faction":"easterling","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_kataphrakt.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"dol_amroth_knight","meta":{"id":"dol_amroth_knight","name_ko":"돌 암로스 백조기사","name_en":"Knight of Dol Amroth","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-gondor-exp-v1.png","file":"tokens/dol_amroth_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"gondor_knight","meta":{"id":"gondor_knight","name_ko":"곤도르 기병","name_en":"Knight of Minas Tirith","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-gondor-exp-v1.png","file":"tokens/gondor_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"osgiliath_veteran","meta":{"id":"osgiliath_veteran","name_ko":"오스길리아스 베테랑","name_en":"Osgiliath Veteran","side":"good","faction":"gondor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/osgiliath_veteran.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["veteran"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"lossarnach_axeman","meta":{"id":"lossarnach_axeman","name_ko":"로사르나흐 도끼병","name_en":"Lossarnach Axeman","side":"good","faction":"gondor","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/lossarnach_axeman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"pelennor_militia","meta":{"id":"pelennor_militia","name_ko":"펠렌노르 민병","name_en":"Pelennor Militia","side":"good","faction":"gondor","role":"infantry","weapon":"spear","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/pelennor_militia.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_swordshield","meta":{"id":"rohan_swordshield","name_ko":"로한 검방","name_en":"Rohan, sword & shield","side":"good","faction":"rohan","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_spear","meta":{"id":"rohan_spear","name_ko":"로한 창병","name_en":"Rohan, spear","side":"good","faction":"rohan","role":"infantry","weapon":"spear","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_archer","meta":{"id":"rohan_archer","name_ko":"로한 궁수","name_en":"Rohan archer","side":"good","faction":"rohan","role":"infantry","weapon":"bow","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"eomer","meta":{"id":"eomer","name_ko":"에오메르(기마)","name_en":"Eomer mounted","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/eomer.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eomer"},{"id":"rohan_outrider","meta":{"id":"rohan_outrider","name_ko":"로한 기마궁수","name_en":"Rohan outrider","side":"good","faction":"rohan","role":"cavalry","weapon":"bow","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_outrider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"rohan_banner","meta":{"id":"rohan_banner","name_ko":"로한 기수","name_en":"Rohan banner bearer","side":"good","faction":"rohan","role":"support","weapon":"banner","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_banner.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["banner"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"black_numenorean","meta":{"id":"black_numenorean","name_ko":"검은 누메노르인(도보)","name_en":"Black Numenorean on foot","side":"evil","faction":"mordor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_numenorean.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"black_numenorean_mounted","meta":{"id":"black_numenorean_mounted","name_ko":"검은 누메노르인(기마)","name_en":"Black Numenorean mounted","side":"evil","faction":"mordor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_numenorean_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"orc_tracker","meta":{"id":"orc_tracker","name_ko":"오크 추적자","name_en":"Orc Tracker","side":"evil","faction":"mordor","role":"infantry","weapon":"twohanded","base":"S","sheet":"roster-mordor-elite-v1.png","file":"tokens/orc_tracker.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":3,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"war_troll","meta":{"id":"war_troll","name_ko":"전쟁 트롤","name_en":"Mordor War Troll","side":"evil","faction":"mordor","role":"monster","weapon":"club","base":"XXL","sheet":"roster-mordor-elite-v1.png","file":"tokens/war_troll.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"black_guard","meta":{"id":"black_guard","name_ko":"바라드두르 흑근위","name_en":"Black Guard of Barad-dur","side":"evil","faction":"mordor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"orc_taskmaster","meta":{"id":"orc_taskmaster","name_ko":"오크 두목","name_en":"Orc Taskmaster","side":"evil","faction":"mordor","role":"support","weapon":"whip","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/orc_taskmaster.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":255,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"orc_taskmaster"},{"id":"goblin_spear","meta":{"id":"goblin_spear","name_ko":"고블린 창병","name_en":"Goblin, spear","side":"evil","faction":"moria","role":"infantry","weapon":"spear","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_spear.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_shield","meta":{"id":"goblin_shield","name_ko":"고블린 방패병","name_en":"Goblin, shield","side":"evil","faction":"moria","role":"infantry","weapon":"sword_shield","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_shield.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_bow","meta":{"id":"goblin_bow","name_ko":"고블린 궁수","name_en":"Goblin, bow","side":"evil","faction":"moria","role":"infantry","weapon":"bow","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_bow.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_prowler","meta":{"id":"goblin_prowler","name_ko":"고블린 프라울러","name_en":"Goblin Prowler","side":"evil","faction":"moria","role":"infantry","weapon":"dagger","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_prowler.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_king","meta":{"id":"goblin_king","name_ko":"고블린 왕","name_en":"Goblin King","side":"evil","faction":"moria","role":"hero","weapon":"club","base":"L","sheet":"roster-goblin-v1.png","file":"tokens/goblin_king.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":250,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"goblin_king"},{"id":"goblin_shaman","meta":{"id":"goblin_shaman","name_ko":"고블린 샤먼","name_en":"Goblin Shaman","side":"evil","faction":"moria","role":"support","weapon":"staff","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_shaman.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_warrior","meta":{"id":"dunlending_warrior","name_ko":"던랜딩 전사","name_en":"Dunlending Warrior","side":"evil","faction":"dunland","role":"infantry","weapon":"sword","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/dunlending_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_huscarl","meta":{"id":"dunlending_huscarl","name_ko":"던랜딩 허스칼","name_en":"Dunlending Huscarl","side":"evil","faction":"dunland","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/dunlending_huscarl.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg","meta":{"id":"warg","name_ko":"야생 와르그","name_en":"Wild Warg","side":"evil","faction":"isengard","role":"monster","weapon":"none","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/warg.png","visualBase":"M","visualRadius":38,"baseMm":40},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"uruk_sapper","meta":{"id":"uruk_sapper","name_ko":"우르크 폭파반","name_en":"Uruk-hai Demolition Team","side":"evil","faction":"isengard","role":"infantry","weapon":"bomb","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/uruk_sapper.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_scout_archer","meta":{"id":"uruk_scout_archer","name_ko":"우르크 스카웃 궁수","name_en":"Uruk-hai Scout Archer","side":"evil","faction":"isengard","role":"infantry","weapon":"bow","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/uruk_scout_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"crebain_swarm","meta":{"id":"crebain_swarm","name_ko":"크레반 까마귀 떼","name_en":"Crebain swarm","side":"evil","faction":"isengard","role":"support","weapon":"none","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/crebain_swarm.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":420,"fight":2,"strength":2,"defence":5,"attacks":1,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support","flying"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"hobbit_shirriff","meta":{"id":"hobbit_shirriff","name_ko":"호빗 민병","name_en":"Hobbit Shirriff","side":"good","faction":"shire","role":"infantry","weapon":"pitchfork","base":"S","sheet":"roster-free-special-v1.png","file":"tokens/hobbit_shirriff.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":200,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"hobbit_bounder","meta":{"id":"hobbit_bounder","name_ko":"호빗 궁수","name_en":"Hobbit Bounder","side":"good","faction":"shire","role":"infantry","weapon":"bow","base":"S","sheet":"roster-free-special-v1.png","file":"tokens/hobbit_bounder.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":200,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":3,"shootValue":4,"shootRange":650,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"ent","meta":{"id":"ent","name_ko":"엔트","name_en":"Ent","side":"good","faction":"ent","role":"monster","weapon":"none","base":"XXL","sheet":"roster-free-special-v1.png","file":"tokens/ent.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":290,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"legendary"},{"id":"beorning","meta":{"id":"beorning","name_ko":"베오르닝 전사","name_en":"Beorning","side":"good","faction":"beorning","role":"hero","weapon":"axe","base":"L","sheet":"roster-free-special-v1.png","file":"tokens/beorning.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"beorning"},{"id":"ranger_north","meta":{"id":"ranger_north","name_ko":"북부 레인저","name_en":"Ranger of the North","side":"good","faction":"arnor","role":"infantry","weapon":"sword","base":"M","sheet":"roster-free-special-v1.png","file":"tokens/ranger_north.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["ranger"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"faramir","meta":{"id":"faramir","name_ko":"파라미르","name_en":"Faramir","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/faramir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":820,"might":3,"will":3,"fate":3,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"faramir"},{"id":"haldir","meta":{"id":"haldir","name_ko":"할디르","name_en":"Haldir","side":"good","faction":"lothlorien","role":"hero","weapon":"twohanded","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/haldir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":830,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"haldir"},{"id":"galadriel","meta":{"id":"galadriel","name_ko":"갈라드리엘","name_en":"Galadriel","side":"good","faction":"lothlorien","role":"hero","weapon":"none","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/galadriel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":2,"courage":8,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"galadriel"},{"id":"gamling","meta":{"id":"gamling","name_ko":"감링(기수)","name_en":"Gamling with banner","side":"good","faction":"rohan","role":"hero","weapon":"banner","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/gamling.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gamling"},{"id":"samwise","meta":{"id":"samwise","name_ko":"샘와이즈","name_en":"Samwise Gamgee","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/samwise.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"samwise"},{"id":"mouth_of_sauron","meta":{"id":"mouth_of_sauron","name_ko":"사우론의 입(기마)","name_en":"Mouth of Sauron","side":"evil","faction":"mordor","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/mouth_of_sauron.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero","mounted","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"mouth_of_sauron"},{"id":"lurtz","meta":{"id":"lurtz","name_ko":"루르츠","name_en":"Lurtz","side":"evil","faction":"isengard","role":"hero","weapon":"bow","base":"M","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/lurtz.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":4,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"lurtz"},{"id":"sharku","meta":{"id":"sharku","name_ko":"샤르쿠(와르그)","name_en":"Sharku on warg","side":"evil","faction":"isengard","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/sharku.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":420,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","mounted","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"sharku"},{"id":"grima","meta":{"id":"grima","name_ko":"그리마 웜텅","name_en":"Grima Wormtongue","side":"evil","faction":"isengard","role":"hero","weapon":"dagger","base":"M","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/grima.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":4,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"grima"},{"id":"khamul","meta":{"id":"khamul","name_ko":"카물","name_en":"Khamul the Easterling","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/khamul.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"khamul"},{"id":"fingolfin","meta":{"id":"fingolfin","name_ko":"핑골핀","name_en":"Fingolfin","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/fingolfin.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":4,"defence":6,"attacks":4,"wounds":4,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"fingolfin"},{"id":"imrahil","meta":{"id":"imrahil","name_ko":"임라힐","name_en":"Imrahil","side":"good","faction":"gondor","role":"hero","weapon":"lance","base":"M","sheet":"roster-legends-good-v1.png","file":"tokens/imrahil.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"imrahil"},{"id":"merry","meta":{"id":"merry","name_ko":"메리아독","name_en":"Meriadoc Brandybuck","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v1.png","file":"tokens/merry.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"merry"},{"id":"pippin","meta":{"id":"pippin","name_ko":"피핀","name_en":"Peregrin Took","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v1.png","file":"tokens/pippin.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"pippin"},{"id":"beorn","meta":{"id":"beorn","name_ko":"베오른","name_en":"Beorn","side":"good","faction":"beorning","role":"hero","weapon":"twohanded","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/beorn.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":6,"defence":6,"attacks":3,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","monster"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"beorn"},{"id":"elendil","meta":{"id":"elendil","name_ko":"엘렌딜","name_en":"Elendil","side":"good","faction":"arnor","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/elendil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"elendil"},{"id":"melkor","meta":{"id":"melkor","name_ko":"멜코르","name_en":"Melkor (Morgoth)","side":"evil","faction":"angband","role":"monster","weapon":"mace","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/melkor.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":230,"fight":10,"strength":9,"defence":9,"attacks":5,"wounds":16,"courage":10,"shootValue":0,"shootRange":0,"might":6,"will":12,"fate":6,"traits":["hero","monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary","uniqueKey":"melkor"},{"id":"mumakil","meta":{"id":"mumakil","name_ko":"무마킬","name_en":"War Mumak","side":"evil","faction":"harad","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/mumakil.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":340,"fight":7,"strength":8,"defence":8,"attacks":5,"wounds":8,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"smaug","meta":{"id":"smaug","name_ko":"스마우그","name_en":"Smaug","side":"evil","faction":"erebor","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/smaug.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":460,"fight":8,"strength":7,"defence":8,"attacks":5,"wounds":9,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"ungoliant","meta":{"id":"ungoliant","name_ko":"웅골리안트","name_en":"Ungoliant","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/ungoliant.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":8,"strength":7,"defence":8,"attacks":6,"wounds":10,"courage":9,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"bolg","meta":{"id":"bolg","name_ko":"볼그","name_en":"Bolg","side":"evil","faction":"gundabad","role":"hero","weapon":"mace","base":"L","sheet":"roster-legends-evil-v1.png","file":"tokens/bolg.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"bolg"},{"id":"easterling_warlord","meta":{"id":"easterling_warlord","name_ko":"이스터링 장군","name_en":"Easterling Warlord","side":"evil","faction":"easterling","role":"hero","weapon":"pike","base":"M","sheet":"roster-legends-evil-v1.png","file":"tokens/easterling_warlord.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"easterling_warlord"},{"id":"radagast","meta":{"id":"radagast","name_ko":"라다가스트","name_en":"Radagast the Brown","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/radagast.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":8,"fate":4,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"radagast"},{"id":"thranduil","meta":{"id":"thranduil","name_ko":"트란두일","name_en":"Thranduil","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v2.png","file":"tokens/thranduil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thranduil"},{"id":"celeborn","meta":{"id":"celeborn","name_ko":"켈레보른","name_en":"Celeborn","side":"good","faction":"lothlorien","role":"hero","weapon":"spear","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/celeborn.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"celeborn"},{"id":"bilbo","meta":{"id":"bilbo","name_ko":"빌보","name_en":"Bilbo Baggins","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v2.png","file":"tokens/bilbo.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":230,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bilbo"},{"id":"king_of_the_dead","meta":{"id":"king_of_the_dead","name_ko":"망자의 왕","name_en":"King of the Dead","side":"good","faction":"dead","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v2.png","file":"tokens/king_of_the_dead.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","terror"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"king_of_the_dead"},{"id":"dead_soldier","meta":{"id":"dead_soldier","name_ko":"망자 병사","name_en":"Soldier of the Dead","side":"good","faction":"dead","role":"infantry","weapon":"spear","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/dead_soldier.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["terror","spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"olog_hai","meta":{"id":"olog_hai","name_ko":"올로그하이","name_en":"Olog-hai","side":"evil","faction":"mordor","role":"monster","weapon":"mace","base":"XXL","sheet":"roster-legends-evil-v2.png","file":"tokens/olog_hai.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"watcher_in_the_water","meta":{"id":"watcher_in_the_water","name_ko":"물 속의 감시자","name_en":"Watcher in the Water","side":"evil","faction":"moria","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v2.png","file":"tokens/watcher_in_the_water.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":280,"fight":6,"strength":7,"defence":7,"attacks":4,"wounds":5,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"mirkwood_spider","meta":{"id":"mirkwood_spider","name_ko":"미르크우드 거미","name_en":"Mirkwood Spider","side":"evil","faction":"dol_guldur","role":"monster","weapon":"none","base":"L","sheet":"roster-legends-evil-v2.png","file":"tokens/mirkwood_spider.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":300,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"harad_chieftain","meta":{"id":"harad_chieftain","name_ko":"하라드 족장","name_en":"Haradrim Chieftain","side":"evil","faction":"harad","role":"hero","weapon":"sword","base":"M","sheet":"roster-legends-evil-v2.png","file":"tokens/harad_chieftain.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"harad_chieftain"},{"id":"uruk_captain","meta":{"id":"uruk_captain","name_ko":"우룩하이 대장","name_en":"Uruk-hai Captain","side":"evil","faction":"isengard","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-legends-evil-v2.png","file":"tokens/uruk_captain.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"uruk_captain"},{"id":"hill_troll","meta":{"id":"hill_troll","name_ko":"언덕 트롤","name_en":"Hill Troll","side":"evil","faction":"angmar","role":"monster","weapon":"club","base":"XL","sheet":"roster-legends-evil-v2.png","file":"tokens/hill_troll.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"feanor","meta":{"id":"feanor","name_ko":"페아노르","name_en":"Feanor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/feanor.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"feanor"},{"id":"luthien","meta":{"id":"luthien","name_ko":"루시엔","name_en":"Luthien","side":"good","faction":"doriath","role":"hero","weapon":"staff","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/luthien.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"luthien"},{"id":"beren","meta":{"id":"beren","name_ko":"베렌","name_en":"Beren","side":"good","faction":"men","role":"hero","weapon":"sword","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/beren.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":4,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"beren"},{"id":"turin","meta":{"id":"turin","name_ko":"투린","name_en":"Turin Turambar","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/turin.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"turin"},{"id":"beleg","meta":{"id":"beleg","name_ko":"벨레그","name_en":"Beleg Strongbow","side":"good","faction":"doriath","role":"hero","weapon":"bow","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/beleg.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":850,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"beleg"},{"id":"huan","meta":{"id":"huan","name_ko":"훈","name_en":"Huan the Hound","side":"good","faction":"valinor","role":"beast","weapon":"none","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/huan.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":330,"fight":6,"strength":5,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":0,"traits":["beast"]},"recruitable":true,"unlockWave":4,"rarity":"legendary"},{"id":"glaurung","meta":{"id":"glaurung","name_ko":"글라우룽","name_en":"Glaurung","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"XXL","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/glaurung.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":320,"fight":8,"strength":7,"defence":8,"attacks":5,"wounds":8,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"carcharoth","meta":{"id":"carcharoth","name_ko":"카르하로스","name_en":"Carcharoth","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/carcharoth.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":340,"fight":6,"strength":6,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"gothmog_balrog","meta":{"id":"gothmog_balrog","name_ko":"고스모그(발록 군주)","name_en":"Gothmog, Lord of Balrogs","side":"evil","faction":"angband","role":"monster","weapon":"whip","base":"XXL","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/gothmog_balrog.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":300,"fight":8,"strength":7,"defence":7,"attacks":4,"wounds":8,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"draugluin","meta":{"id":"draugluin","name_ko":"드라우글루인","name_en":"Draugluin","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/draugluin.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":340,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"thuringwethil","meta":{"id":"thuringwethil","name_ko":"수링웨실","name_en":"Thuringwethil","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/thuringwethil.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"boldog","meta":{"id":"boldog","name_ko":"볼독","name_en":"Boldog","side":"evil","faction":"angband","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/boldog.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"boldog"},{"id":"thorin","meta":{"id":"thorin","name_ko":"토린 오큰실드","name_en":"Thorin Oakenshield","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"L","sheet":"roster-hobbit-good-v1.png","file":"tokens/thorin.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":240,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thorin"},{"id":"tauriel","meta":{"id":"tauriel","name_ko":"타우리엘","name_en":"Tauriel","side":"good","faction":"elf","role":"hero","weapon":"dagger","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/tauriel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":820,"might":2,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"tauriel"},{"id":"bard","meta":{"id":"bard","name_ko":"바드","name_en":"Bard the Bowman","side":"good","faction":"men","role":"hero","weapon":"bow","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/bard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":830,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"bard"},{"id":"dain","meta":{"id":"dain","name_ko":"데인","name_en":"Dain Ironfoot","side":"good","faction":"dwarf","role":"hero","weapon":"mace","base":"L","sheet":"roster-hobbit-good-v1.png","file":"tokens/dain.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":240,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dain"},{"id":"fili","meta":{"id":"fili","name_ko":"필리","name_en":"Fili","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/fili.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":5,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"fili"},{"id":"kili","meta":{"id":"kili","name_ko":"킬리","name_en":"Kili","side":"good","faction":"dwarf","role":"hero","weapon":"bow","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/kili.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":5,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"kili"},{"id":"azog","meta":{"id":"azog","name_ko":"아조그","name_en":"Azog the Defiler","side":"evil","faction":"gundabad","role":"hero","weapon":"mace","base":"L","sheet":"roster-hobbit-evil-v1.png","file":"tokens/azog.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"azog"},{"id":"azog_warg_rider","meta":{"id":"azog_warg_rider","name_ko":"아조그(흰 와르그)","name_en":"Azog on white warg","side":"evil","faction":"gundabad","role":"cavalry","weapon":"mace","base":"XL","sheet":"roster-hobbit-evil-v1.png","file":"tokens/azog_warg_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"azog"},{"id":"necromancer","meta":{"id":"necromancer","name_ko":"네크로맨서","name_en":"The Necromancer","side":"evil","faction":"dol_guldur","role":"hero","weapon":"staff","base":"L","sheet":"roster-hobbit-evil-v1.png","file":"tokens/necromancer.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":8,"fate":3,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"necromancer"},{"id":"hunter_orc","meta":{"id":"hunter_orc","name_ko":"헌터 오크","name_en":"Hunter Orc","side":"evil","faction":"gundabad","role":"infantry","weapon":"bow","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/hunter_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":3,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"gundabad_orc","meta":{"id":"gundabad_orc","name_ko":"군다바드 오크","name_en":"Gundabad Orc","side":"evil","faction":"gundabad","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/gundabad_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_mercenary","meta":{"id":"goblin_mercenary","name_ko":"고블린 용병","name_en":"Goblin Mercenary","side":"evil","faction":"moria","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/goblin_mercenary.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"halbarad","meta":{"id":"halbarad","name_ko":"할바라드","name_en":"Halbarad","side":"good","faction":"arnor","role":"hero","weapon":"banner","base":"L","sheet":"roster-exp-good-v1.png","file":"tokens/halbarad.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"halbarad"},{"id":"beregond","meta":{"id":"beregond","name_ko":"베레곤드","name_en":"Beregond","side":"good","faction":"gondor","role":"hero","weapon":"sword_shield","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/beregond.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"beregond"},{"id":"elladan","meta":{"id":"elladan","name_ko":"엘라단","name_en":"Elladan","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/elladan.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"elladan"},{"id":"elrohir","meta":{"id":"elrohir","name_ko":"엘로히르","name_en":"Elrohir","side":"good","faction":"rivendell","role":"hero","weapon":"spear","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/elrohir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":2,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"elrohir"},{"id":"grimbeorn","meta":{"id":"grimbeorn","name_ko":"그림베오른","name_en":"Grimbeorn","side":"good","faction":"beorning","role":"hero","weapon":"axe","base":"L","sheet":"roster-exp-good-v1.png","file":"tokens/grimbeorn.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"grimbeorn"},{"id":"ghan_buri_ghan","meta":{"id":"ghan_buri_ghan","name_ko":"간부리간","name_en":"Ghan-buri-Ghan","side":"good","faction":"men","role":"infantry","weapon":"bow","base":"S","sheet":"roster-exp-good-v1.png","file":"tokens/ghan_buri_ghan.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"suladan","meta":{"id":"suladan","name_ko":"술라단","name_en":"Suladan the Serpent Lord","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-exp-evil-v1.png","file":"tokens/suladan.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"suladan"},{"id":"corsair_umbra","meta":{"id":"corsair_umbra","name_ko":"움바르 해적","name_en":"Corsair of Umbar","side":"evil","faction":"harad","role":"infantry","weapon":"sword","base":"M","sheet":"roster-exp-evil-v1.png","file":"tokens/corsair_umbra.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"variag_horseman","meta":{"id":"variag_horseman","name_ko":"바리악 기수","name_en":"Variag Horseman","side":"evil","faction":"rhun","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/variag_horseman.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"shagrat","meta":{"id":"shagrat","name_ko":"샤그랏","name_en":"Shagrat","side":"evil","faction":"mordor","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-exp-evil-v1.png","file":"tokens/shagrat.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":260,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"shagrat"},{"id":"gorbag","meta":{"id":"gorbag","name_ko":"고르바그","name_en":"Gorbag","side":"evil","faction":"mordor","role":"hero","weapon":"sword","base":"M","sheet":"roster-exp-evil-v1.png","file":"tokens/gorbag.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":255,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"gorbag"},{"id":"warg_alpha","meta":{"id":"warg_alpha","name_ko":"와르그 우두머리","name_en":"Warg Alpha","side":"evil","faction":"isengard","role":"beast","weapon":"none","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/warg_alpha.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"balin","meta":{"id":"balin","name_ko":"발린","name_en":"Balin","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/balin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":5,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"balin"},{"id":"dwalin","meta":{"id":"dwalin","name_ko":"드왈린","name_en":"Dwalin","side":"good","faction":"dwarf","role":"hero","weapon":"axe","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/dwalin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":5,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dwalin"},{"id":"gloin","meta":{"id":"gloin","name_ko":"글로인","name_en":"Gloin","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/gloin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gloin"},{"id":"oin","meta":{"id":"oin","name_ko":"오인","name_en":"Oin","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/oin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"oin"},{"id":"nori","meta":{"id":"nori","name_ko":"노리","name_en":"Nori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/nori.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"nori"},{"id":"ori","meta":{"id":"ori","name_ko":"오리","name_en":"Ori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/ori.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"ori"},{"id":"dori","meta":{"id":"dori","name_ko":"도리","name_en":"Dori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/dori.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"dori"},{"id":"bifur","meta":{"id":"bifur","name_ko":"비푸르","name_en":"Bifur","side":"good","faction":"dwarf","role":"infantry","weapon":"spear","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bifur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bifur"},{"id":"bofur","meta":{"id":"bofur","name_ko":"보푸르","name_en":"Bofur","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bofur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bofur"},{"id":"bombur","meta":{"id":"bombur","name_ko":"봄부르","name_en":"Bombur","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bombur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":230,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bombur"},{"id":"goat_rider","meta":{"id":"goat_rider","name_ko":"산양 기수","name_en":"Iron Hills Goat Rider","side":"good","faction":"dwarf","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-hobbit-exp-v1.png","file":"tokens/goat_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"gollum","meta":{"id":"gollum","name_ko":"골룸","name_en":"Gollum","side":"evil","faction":"moria","role":"beast","weapon":"none","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/gollum.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":300,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"gil_galad","meta":{"id":"gil_galad","name_ko":"길갈라드","name_en":"Gil-galad","side":"good","faction":"elf","role":"hero","weapon":"spear","base":"L","sheet":"roster-elf-exp-v1.png","file":"tokens/gil_galad.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"gil_galad"},{"id":"cirdan","meta":{"id":"cirdan","name_ko":"키르단","name_en":"Cirdan the Shipwright","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-elf-exp-v1.png","file":"tokens/cirdan.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":6,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"cirdan"},{"id":"arwen","meta":{"id":"arwen","name_ko":"아르웬","name_en":"Arwen","side":"good","faction":"rivendell","role":"hero","weapon":"dagger","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/arwen.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":5,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"arwen"},{"id":"lindir","meta":{"id":"lindir","name_ko":"린디르","name_en":"Lindir","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/lindir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":3,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"lindir"},{"id":"erestor","meta":{"id":"erestor","name_ko":"에레스토르","name_en":"Erestor","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/erestor.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"erestor"},{"id":"elf_seer","meta":{"id":"elf_seer","name_ko":"엘프 선견자","name_en":"Elf Seer","side":"good","faction":"lothlorien","role":"support","weapon":"staff","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/elf_seer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":4,"fate":2,"traits":["support","wizard"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rumil","meta":{"id":"rumil","name_ko":"루밀","name_en":"Rumil","side":"good","faction":"lothlorien","role":"hero","weapon":"bow","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/rumil.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":830,"might":2,"will":3,"fate":2,"traits":["elf","hero"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"orophin","meta":{"id":"orophin","name_ko":"오로핀","name_en":"Orophin","side":"good","faction":"lothlorien","role":"hero","weapon":"spear","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/orophin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["elf","spear","hero"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mirkwood_sentinel","meta":{"id":"mirkwood_sentinel","name_ko":"미르크우드 보초","name_en":"Mirkwood Sentinel","side":"good","faction":"elf","role":"infantry","weapon":"pike","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/mirkwood_sentinel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"noldor_warrior","meta":{"id":"noldor_warrior","name_ko":"놀도르 정예병","name_en":"Noldor Warrior","side":"good","faction":"elf","role":"infantry","weapon":"sword_shield","base":"L","sheet":"roster-elf-exp-v2.png","file":"tokens/noldor_warrior.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"silvan_archer","meta":{"id":"silvan_archer","name_ko":"실반 궁수","name_en":"Silvan Archer","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/silvan_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elven_lancer","meta":{"id":"elven_lancer","name_ko":"엘프 기창기병","name_en":"Elven Lancer","side":"good","faction":"rivendell","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-elf-exp-v2.png","file":"tokens/elven_lancer.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"imrahil_mounted","meta":{"id":"imrahil_mounted","name_ko":"임라힐(기마)","name_en":"Prince Imrahil, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/imrahil_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":440,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"imrahil"},{"id":"gandalf_mounted","meta":{"id":"gandalf_mounted","name_ko":"간달프(섀도우팩스)","name_en":"Gandalf on Shadowfax","side":"good","faction":"maiar","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/gandalf_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":6,"fate":6,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"gandalf"},{"id":"thranduil_mounted","meta":{"id":"thranduil_mounted","name_ko":"스란두일(기마)","name_en":"Thranduil, mounted","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/thranduil_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thranduil"},{"id":"aragorn_mounted","meta":{"id":"aragorn_mounted","name_ko":"아라곤(기마)","name_en":"Aragorn, mounted","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/aragorn_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"},{"id":"theoden_mounted","meta":{"id":"theoden_mounted","name_ko":"테오덴(기마)","name_en":"Theoden, mounted","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/theoden_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"theoden"},{"id":"blackroot_archer","meta":{"id":"blackroot_archer","name_ko":"검은뿌리골 궁수","name_en":"Blackroot Vale Archer","side":"good","faction":"gondor","role":"infantry","weapon":"bow","base":"M","sheet":"roster-mounted-heroes-v1.png","file":"tokens/blackroot_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"half_troll","meta":{"id":"half_troll","name_ko":"하프 트롤","name_en":"Half-Troll of Far Harad","side":"evil","faction":"harad","role":"monster","weapon":"club","base":"L","sheet":"roster-mordor-monsters-v1.png","file":"tokens/half_troll.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":280,"fight":5,"strength":5,"defence":6,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"cave_drake","meta":{"id":"cave_drake","name_ko":"동굴 드레이크","name_en":"Cave Drake","side":"evil","faction":"moria","role":"monster","weapon":"none","base":"XL","sheet":"roster-mordor-monsters-v1.png","file":"tokens/cave_drake.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":340,"fight":6,"strength":5,"defence":7,"attacks":3,"wounds":4,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"bat_swarm","meta":{"id":"bat_swarm","name_ko":"박쥐 떼","name_en":"Bat Swarm","side":"evil","faction":"dol_guldur","role":"monster","weapon":"none","base":"M","sheet":"roster-mordor-monsters-v1.png","file":"tokens/bat_swarm.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":420,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":4,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"muzgur","meta":{"id":"muzgur","name_ko":"무즈구르","name_en":"Muzgur, Morgul Shaman","side":"evil","faction":"angmar","role":"hero","weapon":"staff","base":"M","sheet":"roster-mordor-monsters-v1.png","file":"tokens/muzgur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":1,"will":8,"fate":2,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"muzgur"},{"id":"buhrdur","meta":{"id":"buhrdur","name_ko":"부르두르","name_en":"Buhrdur, Troll Chieftain","side":"evil","faction":"angmar","role":"monster","weapon":"mace","base":"XL","sheet":"roster-mordor-monsters-v1.png","file":"tokens/buhrdur.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"mahud_chieftain","meta":{"id":"mahud_chieftain","name_ko":"마후드 족장","name_en":"Mahud War-Chieftain","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-mordor-monsters-v1.png","file":"tokens/mahud_chieftain.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"mahud_chieftain"},{"id":"eowyn_mounted","meta":{"id":"eowyn_mounted","name_ko":"에오윈(기마)","name_en":"Eowyn, mounted","side":"good","faction":"rohan","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-west-heroes-v1.png","file":"tokens/eowyn_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eowyn"},{"id":"forlong","meta":{"id":"forlong","name_ko":"포를롱","name_en":"Forlong the Fat","side":"good","faction":"gondor","role":"hero","weapon":"axe","base":"L","sheet":"roster-west-heroes-v1.png","file":"tokens/forlong.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"forlong"},{"id":"erkenbrand","meta":{"id":"erkenbrand","name_ko":"에르켄브란트","name_en":"Erkenbrand","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-west-heroes-v1.png","file":"tokens/erkenbrand.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"erkenbrand"},{"id":"damrod","meta":{"id":"damrod","name_ko":"담로드","name_en":"Damrod","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/damrod.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":3,"shootRange":800,"might":2,"will":2,"fate":2,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"damrod"},{"id":"mablung","meta":{"id":"mablung","name_ko":"마블룽","name_en":"Mablung","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/mablung.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":3,"shootRange":800,"might":2,"will":2,"fate":2,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"mablung"},{"id":"duinhir","meta":{"id":"duinhir","name_ko":"두인히르","name_en":"Duinhir of Blackroot","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/duinhir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":4,"shootRange":780,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"duinhir"},{"id":"ugluk","meta":{"id":"ugluk","name_ko":"우글룩","name_en":"Ugluk","side":"evil","faction":"isengard","role":"hero","weapon":"sword","base":"L","sheet":"roster-east-monsters-v1.png","file":"tokens/ugluk.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"ugluk"},{"id":"mauhur","meta":{"id":"mauhur","name_ko":"마우후르","name_en":"Mauhur","side":"evil","faction":"isengard","role":"hero","weapon":"sword","base":"M","sheet":"roster-east-monsters-v1.png","file":"tokens/mauhur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"mauhur"},{"id":"vrasku","meta":{"id":"vrasku","name_ko":"브라스쿠","name_en":"Vrasku","side":"evil","faction":"isengard","role":"hero","weapon":"bow","base":"M","sheet":"roster-east-monsters-v1.png","file":"tokens/vrasku.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":4,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"vrasku"},{"id":"stone_troll","meta":{"id":"stone_troll","name_ko":"돌 트롤","name_en":"Stone Troll","side":"evil","faction":"angmar","role":"monster","weapon":"club","base":"XL","sheet":"roster-east-monsters-v1.png","file":"tokens/stone_troll.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"werewolf","meta":{"id":"werewolf","name_ko":"웨어울프","name_en":"Werewolf","side":"evil","faction":"mordor","role":"beast","weapon":"none","base":"L","sheet":"roster-east-monsters-v1.png","file":"tokens/werewolf.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":340,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"gulavhar","meta":{"id":"gulavhar","name_ko":"굴라브하르","name_en":"Gulavhar, the Vampire","side":"evil","faction":"angmar","role":"monster","weapon":"none","base":"XXL","sheet":"roster-east-monsters-v1.png","file":"tokens/gulavhar.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":320,"fight":7,"strength":6,"defence":7,"attacks":4,"wounds":4,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"dark_marshal","meta":{"id":"dark_marshal","name_ko":"어둠의 장군","name_en":"The Dark Marshal","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/dark_marshal.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"dark_marshal"},{"id":"shadow_lord","meta":{"id":"shadow_lord","name_ko":"그림자 군주","name_en":"The Shadow Lord","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/shadow_lord.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"shadow_lord"},{"id":"betrayer","meta":{"id":"betrayer","name_ko":"배신자","name_en":"The Betrayer","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/betrayer.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"betrayer"},{"id":"tainted","meta":{"id":"tainted","name_ko":"타락한 자","name_en":"The Tainted","side":"evil","faction":"angmar","role":"hero","weapon":"dagger","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/tainted.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"tainted"},{"id":"undying","meta":{"id":"undying","name_ko":"죽지 않는 자","name_en":"The Undying","side":"evil","faction":"angmar","role":"hero","weapon":"staff","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/undying.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"undying"},{"id":"knight_of_umbar","meta":{"id":"knight_of_umbar","name_ko":"움바르의 기사","name_en":"Knight of Umbar","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/knight_of_umbar.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"knight_of_umbar"},{"id":"isildur","meta":{"id":"isildur","name_ko":"이실두르","name_en":"Isildur","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"roster-good-fill-v1.png","file":"tokens/isildur.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"isildur"},{"id":"gandalf_white","meta":{"id":"gandalf_white","name_ko":"간달프(백색)","name_en":"Gandalf the White","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"L","sheet":"roster-good-fill-v1.png","file":"tokens/gandalf_white.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":4,"will":7,"fate":6,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gandalf_white"},{"id":"denethor","meta":{"id":"denethor","name_ko":"데네소르","name_en":"Denethor, Steward of Gondor","side":"good","faction":"gondor","role":"hero","weapon":"none","base":"M","sheet":"roster-good-fill-v1.png","file":"tokens/denethor.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"denethor"},{"id":"huorn","meta":{"id":"huorn","name_ko":"휘오른","name_en":"Huorn","side":"good","faction":"fangorn","role":"monster","weapon":"","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/huorn.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":280,"fight":6,"strength":6,"defence":7,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"elite"},{"id":"boromir_mounted","meta":{"id":"boromir_mounted","name_ko":"보로미르(기마)","name_en":"Boromir, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"sword_shield","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/boromir_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"boromir"},{"id":"elrond_mounted","meta":{"id":"elrond_mounted","name_ko":"엘론드(기마)","name_en":"Elrond, mounted","side":"good","faction":"rivendell","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/elrond_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":6,"fate":3,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"elrond"},{"id":"gandalf_white_mounted","meta":{"id":"gandalf_white_mounted","name_ko":"간달프 백색(기마)","name_en":"Gandalf the White on Shadowfax","side":"good","faction":"maiar","role":"cavalry","weapon":"staff","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/gandalf_white_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":440,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":4,"will":7,"fate":6,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gandalf_white"},{"id":"theoden_foot","meta":{"id":"theoden_foot","name_ko":"세오덴(도보)","name_en":"Theoden on foot","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/theoden_foot.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"theoden"},{"id":"dain_boar","meta":{"id":"dain_boar","name_ko":"다인(맷돼지)","name_en":"Dain Ironfoot on war boar","side":"good","faction":"dwarf","role":"cavalry","weapon":"mace","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/dain_boar.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":420,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dain"},{"id":"faramir_mounted","meta":{"id":"faramir_mounted","name_ko":"파라미르(기마)","name_en":"Faramir, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/faramir_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"faramir"},{"id":"eomer_foot","meta":{"id":"eomer_foot","name_ko":"에오메르(도보)","name_en":"Eomer on foot","side":"good","faction":"rohan","role":"hero","weapon":"spear","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/eomer_foot.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eomer"},{"id":"elfhelm","meta":{"id":"elfhelm","name_ko":"엘프헬름","name_en":"Elfhelm of Rohan","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/elfhelm.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"elfhelm"},{"id":"warg_rider_spear","meta":{"id":"warg_rider_spear","name_ko":"와르그 기병(창)","name_en":"Warg Rider, spear","side":"evil","faction":"isengard","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_rider_spear.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg_rider_bow","meta":{"id":"warg_rider_bow","name_ko":"와르그 기병(활)","name_en":"Warg Rider, bow","side":"evil","faction":"isengard","role":"cavalry","weapon":"bow","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_rider_bow.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg_chieftain","meta":{"id":"warg_chieftain","name_ko":"와르그 우두머리 기병","name_en":"Warg Chieftain","side":"evil","faction":"isengard","role":"hero","weapon":"axe","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_chieftain.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":420,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"warg_chieftain"},{"id":"wild_warg","meta":{"id":"wild_warg","name_ko":"야생 와르그","name_en":"Wild Warg","side":"evil","faction":"isengard","role":"monster","weapon":"claws","base":"L","sheet":"roster-warg-riders-v1.png","file":"tokens/wild_warg.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"wild_warg_alpha","meta":{"id":"wild_warg_alpha","name_ko":"와르그 우두머리","name_en":"Warg Alpha","side":"evil","faction":"isengard","role":"monster","weapon":"claws","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/wild_warg_alpha.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"ancalagon","meta":{"id":"ancalagon","name_ko":"앙칼라곤","name_en":"Ancalagon the Black","side":"evil","faction":"angband","role":"monster","weapon":"claws","base":"XXL","sheet":"single-ancalagon.png","file":"tokens/ancalagon.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":480,"fight":9,"strength":8,"defence":8,"attacks":6,"wounds":10,"courage":9,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"nazgul_fellbeast","meta":{"id":"nazgul_fellbeast","name_ko":"나즈굴(펠비스트)","name_en":"Ringwraith on Fell Beast","side":"evil","faction":"angmar","role":"monster","weapon":"claws","base":"XXL","sheet":"single-nazgul-fellbeast.png","file":"tokens/nazgul_fellbeast.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":470,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"fellbeast","meta":{"id":"fellbeast","name_ko":"펠비스트","name_en":"Fell Beast (riderless)","side":"evil","faction":"angmar","role":"monster","weapon":"claws","base":"XXL","sheet":"suladan-fellbeast.png","file":"tokens/fellbeast.png","visualBase":"XXL","visualRadius":105,"baseMm":60},"profile":{"move":460,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"quickbeam","meta":{"id":"quickbeam","name_ko":"퀵빔","name_en":"Quickbeam","side":"good","faction":"ent","role":"monster","weapon":"none","base":"XL","sheet":"ents.png","file":"tokens/quickbeam.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"epic"},{"id":"aragorn_blackgate","meta":{"id":"aragorn_blackgate","name_ko":"아라곤(검은문)","name_en":"Aragorn at the Black Gate","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"single-aragorn-blackgate.png","file":"tokens/aragorn_blackgate.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":290,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"},{"id":"aragorn_blackgate_mounted","meta":{"id":"aragorn_blackgate_mounted","name_ko":"아라곤(검은문·기마)","name_en":"Aragorn at the Black Gate, mounted","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"XL","sheet":"single-aragorn-blackgate-mounted.png","file":"tokens/aragorn_blackgate_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"}];
window.MESBG_STAGE_THEME={"0":{"foot":["orc_sword","orc_sword2","orc_swordshield","moria_goblin"],"spec":["orc_spearman","orc_spear2","orc_archer","orc_bow"],"cav":["warg_rider"],"elite":["morannon_orc","orc_twohanded","orc_tracker"],"monster":["mountain_troll"],"hero":["orc_captain","gothmog","shagrat","gorbag","orc_taskmaster"]},"1":{"foot":["orc_sword","orc_sword2","moria_goblin","haradrim_spearman"],"spec":["orc_archer","orc_bow","haradrim_bow"],"cav":["warg_rider","variag_horseman"],"elite":["morannon_orc","haradrim_spear"],"monster":["mountain_troll"],"hero":["orc_captain","harad_chieftain","suladan","gothmog"]},"2":{"foot":["moria_goblin","goblin_spear","orc_sword","goblin_shield"],"spec":["goblin_bow","orc_archer"],"cav":[],"elite":["barrow_wight","goblin_prowler"],"monster":["hill_troll","stone_troll"],"hero":["nazgul_sword","khamul","dark_marshal","nazgul_mounted"]},"3":{"foot":["uruk_swordshield","uruk_swordshield2","uruk_scout"],"spec":["uruk_crossbow","uruk_scout_archer","uruk_pike"],"cav":["warg_rider_spear","warg_rider_bow"],"elite":["uruk_berserker","uruk_berserker2","uruk_sapper"],"monster":["warg","wild_warg"],"hero":["uruk_captain","lurtz","ugluk","vrasku"]},"4":{"foot":["uruk_scout","orc_tracker","moria_goblin"],"spec":["uruk_scout_archer","goblin_bow"],"cav":["warg_rider_spear","sharku"],"elite":["uruk_berserker","crebain_swarm"],"monster":["wild_warg","wild_warg_alpha"],"hero":["sharku","warg_chieftain","mauhur"]},"5":{"foot":["dunlending_warrior","orc_sword","corsair_umbra"],"spec":["haradrim_bow","orc_archer"],"cav":["warg_rider","sharku"],"elite":["dunlending_huscarl","uruk_swordshield"],"monster":["wild_warg"],"hero":["sharku","harad_chieftain","uruk_captain"]},"6":{"foot":["moria_goblin","goblin_spear","goblin_shield","goblin_mercenary"],"spec":["goblin_bow"],"cav":[],"elite":["goblin_prowler","goblin_shaman"],"monster":["cave_troll","cave_drake"],"hero":["goblin_king","orc_shaman"]},"7":{"foot":["uruk_swordshield","uruk_swordshield2","uruk_pike"],"spec":["uruk_crossbow","uruk_scout_archer"],"cav":["warg_rider_spear"],"elite":["uruk_berserker","uruk_berserker2","uruk_banner"],"monster":["warg","warg_alpha"],"hero":["uruk_captain","saruman","lurtz","ugluk"]},"8":{"foot":["morannon_orc","black_numenorean","easterling_phalanx","easterling_swordshield"],"spec":["orc_archer","orc_bow"],"cav":["morgul_knight","black_numenorean_mounted","easterling_kataphrakt"],"elite":["black_guard","orc_twohanded"],"monster":["war_troll","olog_hai"],"hero":["mouth_of_sauron","gothmog","easterling_warlord","knight_of_umbar"]},"9":{"foot":["morannon_orc","black_numenorean"],"spec":["orc_archer"],"cav":["morgul_knight"],"elite":["black_guard","orc_tracker","goblin_prowler"],"monster":["war_troll","olog_hai","shelob","werewolf","fellbeast"],"hero":["mouth_of_sauron","nazgul_mounted","gulavhar"]}};
window.MESBG_LEGEND_POOL=["gulavhar","buhrdur","undying","shadow_lord","nazgul_fellbeast","cave_drake","mumakil","half_troll","mirkwood_spider","bat_swarm","bolg","azog","azog_warg_rider","gothmog_balrog","glaurung","carcharoth","draugluin","thuringwethil","boldog","necromancer","smaug","ancalagon","melkor","ungoliant"];
for(const def of window.MESBG_EXTRA_UNITS||[])registerUnit(def);
const LORE_FIX={fingolfin:{fight:9,strength:5,defence:7,courage:9,might:4},feanor:{fight:9,strength:5,courage:8},fingolfin_mounted:{fight:9,strength:5,defence:6,courage:9,might:4},gil_galad:{fight:9,strength:6,courage:8},turin:{fight:8,strength:5,courage:7},beren:{fight:6,defence:5,courage:7,fate:3},beleg:{fight:6,strength:4,shootValue:2,shootRange:880},luthien:{fight:4,will:12,might:3,fate:3},thranduil:{fight:7,courage:7},thranduil_mounted:{fight:7,courage:7},cirdan:{fight:7,will:9},mablung:{fight:6,strength:4,courage:6},isildur:{fight:7,courage:8},elendil:{fight:8,strength:5},arwen:{fight:4,will:6},elladan:{fight:6,attacks:3},elrohir:{fight:6,attacks:3},glorfindel_foot:{fight:9,courage:8},glorfindel_mounted:{fight:9,courage:8},gothmog_balrog:{fight:9,strength:8,wounds:9},glaurung:{fight:9,strength:8,defence:9,wounds:10},ungoliant:{fight:9,strength:8,wounds:12},ancalagon:{fight:10,strength:9,wounds:12},smaug:{strength:8,wounds:10},carcharoth:{fight:8,strength:7,wounds:6},draugluin:{fight:7,strength:6,wounds:5},thuringwethil:{fight:6,wounds:5},boldog:{fight:7},necromancer:{fight:6,will:12}};
for(const[li,lx]of Object.entries(LORE_FIX)){const lp=zt[li];if(!lp)continue;Object.assign(lp,lx);const lc=UnitCatalog[li];if(lc){lc.points=estimatePoints(lp);lc.recruitCost=Math.max(30,Math.round(lc.points*.8/5)*5);if(typeof heroGrade==='function'&&typeof isHeroUnit==='function'&&isHeroUnit(li,lc.meta.role))lc.rarity=heroGrade(li,lc.points,'hero');}}
const LORE_FIX2={nazgul_sword:{fight:7,defence:6,wounds:3,will:10},nazgul_sword_2:{fight:7,defence:6,wounds:3,will:10},nazgul_mace:{fight:7,defence:6,wounds:3,will:10},nazgul_mounted:{fight:7,defence:6,wounds:3,will:10},khamul:{fight:7,defence:6,wounds:3,will:10},dark_marshal:{fight:7,defence:6,wounds:3,will:12},shadow_lord:{fight:6,defence:6,wounds:3,will:10},betrayer:{fight:7,defence:6,wounds:3,will:10},tainted:{fight:6,defence:6,wounds:3,will:8},undying:{fight:7,defence:6,wounds:3,will:14},knight_of_umbar:{fight:7,defence:6,wounds:3,will:8},dwimmerlaik:{fight:7,defence:6,wounds:3,will:10},witchking_foot:{fight:8,defence:8,courage:8},witchking_foot_mace:{fight:8,defence:8,courage:8},witchking_mounted:{fight:8,defence:8,courage:8},witchking_mounted_sheet:{fight:8,defence:8,courage:8},witchking_fellbeast:{fight:8,strength:5,defence:8,attacks:3,wounds:4,courage:8},nazgul_fellbeast:{fight:7,strength:5,defence:7,attacks:3,wounds:4}};
for(const[li,lx]of Object.entries(LORE_FIX2)){const lp=zt[li];if(lp)Object.assign(lp,lx);}
const LORE_PTS={nazgul_sword:70,nazgul_sword_2:70,nazgul_mace:70,nazgul_mounted:85,khamul:80,dark_marshal:95,shadow_lord:80,betrayer:85,tainted:75,undying:95,knight_of_umbar:65,dwimmerlaik:80,khandish_chieftain:90,nazgul_fellbeast:130,witchking_foot:230,witchking_foot_mace:230,witchking_mounted:255,witchking_mounted_sheet:255,witchking_fellbeast:270};
for(const[li,np]of Object.entries(LORE_PTS)){const lc=UnitCatalog[li];if(!lc)continue;lc.points=np;lc.recruitCost=Math.max(30,Math.round(np*.8/5)*5);if(typeof heroGrade==='function')lc.rarity=heroGrade(li,np,'hero');}
if(UnitCatalog.witchking_fellbeast)UnitCatalog.witchking_fellbeast.uniqueKey='witchking';
// ---- themed enemy composition per campaign map ----
const __origStageInfo=P.stageInfo;
P.stageInfo=function(n){
    const info=__origStageInfo.call(this,n);
    const theme=(window.MESBG_STAGE_THEME||{})[info.map];
    if(!theme)return info;
    const count=Math.min(24,4+Math.floor(n*1.15));
    const pick=(pool,i)=>pool&&pool.length?pool[(n*7+i*5+(i>>2))%pool.length]:null;
    const ids=[];
    for(let i=0;i<count;i++){
        const r=(n*13+i*17)%20;
        let id=r<10?pick(theme.foot,i):r<15?pick(theme.spec,i):r<17?(pick(theme.cav,i)||pick(theme.elite,i)):r<19?pick(theme.elite,i):pick(theme.monster,i);
        ids.push(id||pick(theme.foot,i));
    }
    if(n>3)ids.push(pick(theme.hero,n)||'orc_captain');
    if(n>9&&n%4===2)ids.push(pick(theme.monster,n)||'mountain_troll');
    if(n>40){const L=window.MESBG_LEGEND_POOL||[];for(let i=0;i<Math.min(3,1+Math.floor((n-40)/10));i++)ids.push(L[(n+i*3)%L.length]);}
    if(info.boss)ids.push(info.boss);
    else if(info.mission==='commander')ids.push(n>8?(pick(theme.hero,n*2)||'orc_captain'):'orc_captain');
    if(info.modifier==='warg')ids.push('warg_rider','warg_rider');
    info.ids=ids;
    return info;
};

/* ---- LWB tactical upgrade (merged) ---- */
(function(root){
'use strict';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),has=(u,t)=>u.traits.includes(t);
const contact=(a,b)=>distance(a,b)<=a.radius+b.radius+3;
const engaged=(u,all)=>all.some(v=>v.alive&&v.side!==u.side&&contact(u,v));
function supportKind(u,meta){const w=meta(u.id)?.weapon||'';return /pike/.test(w)||has(u,'pike')?'pike':has(u,'spear')||/spear/.test(w)?'spear':null;}
function supportLinks(group,all,meta,clear=()=>true){
 const used=new Set(group.map(u=>u.uid)),links=[],occupied=new Set();
 const free=all.filter(u=>u.alive&&!used.has(u.uid)&&!u.supportSpent&&!u.prone&&!has(u,'mounted')&&!engaged(u,all)&&supportKind(u,meta));
 const candidates=[];
 for(const front of group.filter(u=>u.alive&&!has(u,'mounted')&&!has(u,'monster')&&!has(u,'flying')))for(const u of free){
  if(u.side!==front.side||!contact(u,front)||!clear(u,front))continue;
  const enemy=group.filter(v=>v.side!==front.side&&contact(front,v)).sort((a,b)=>distance(front,a)-distance(front,b))[0];
  if(!enemy||(u.x-front.x)*(enemy.x-front.x)+(u.y-front.y)*(enemy.y-front.y)>0)continue;
  candidates.push({unit:u,front,via:front,rank:1,d:distance(u,front)});
 }
 for(const l of candidates.sort((a,b)=>a.d-b.d||a.unit.uid.localeCompare(b.unit.uid))){if(used.has(l.unit.uid)||occupied.has(l.front.uid))continue;links.push(l);used.add(l.unit.uid);occupied.add(l.front.uid);}
 for(const first of [...links]){if(supportKind(first.unit,meta)!=='pike')continue;
  const second=free.filter(u=>!used.has(u.uid)&&u.side===first.unit.side&&supportKind(u,meta)==='pike'&&contact(u,first.unit)&&clear(u,first.unit)&&(u.x-first.unit.x)*(first.front.x-first.unit.x)+(u.y-first.unit.y)*(first.front.y-first.unit.y)<=0).sort((a,b)=>distance(a,first.unit)-distance(b,first.unit))[0];
  if(second){links.push({unit:second,front:first.front,via:first.unit,rank:2});used.add(second.uid);}
 }
 return links;
}
function resolveFight(group,all,terrain,priority,rng,links,api){
 const roll=()=>1+Math.floor(rng()*6),r={kind:'fight',participants:group.map(u=>u.uid),winnerSide:priority,diceResults:{good:[],evil:[]},strikeResults:[],wounds:[],kills:[],pushVectors:[],trappedUnits:[],knockedDownUnits:[],supports:links.map(l=>l.unit.uid),supportLinks:links.map(l=>({uid:l.unit.uid,front:l.front.uid,via:l.via.uid,rank:l.rank})),fightValues:{good:0,evil:0}};
 const fighters=[...group.map(unit=>({unit,front:unit,support:false})),...links.map(l=>({...l,support:true}))];
 const cavalry=u=>has(u,'mounted')&&u.charged&&!group.some(v=>v.side!==u.side&&contact(u,v)&&has(v,'mounted'));
 for(const f of fighters){const u=f.unit,dice=Array.from({length:f.support?1:u.stats.attacks+(cavalry(u)?1:0)},roll);if(has(u,'veteran')){const i=dice.indexOf(Math.min(...dice));dice[i]=Math.max(dice[i],roll());}r.diceResults[u.side].push(...dice);r.fightValues[u.side]=Math.max(r.fightValues[u.side],u.stats.fight);}
 const g=Math.max(...r.diceResults.good),e=Math.max(...r.diceResults.evil),f=r.fightValues;r.winnerSide=g!==e?(g>e?'good':'evil'):f.good!==f.evil?(f.good>f.evil?'good':'evil'):priority;
 const winners=group.filter(u=>u.side===r.winnerSide),losers=group.filter(u=>u.side!==r.winnerSide),positions=all.map(u=>({...u}));
 for(const u of losers){const p=api.push(u,winners,positions,terrain,52*(u.hold?.25:1)*(has(u,'steadfast')?.65:1));r.pushVectors.push({uid:u.uid,from:{x:u.x,y:u.y},to:p.to});if(p.trapped)r.trappedUnits.push(u.uid);Object.assign(positions.find(v=>v.uid===u.uid),p.to);if(winners.some(w=>cavalry(w)&&contact(w,u)&&!has(u,'mounted')&&!has(u,'monster')&&!has(u,'flying')))r.knockedDownUnits.push(u.uid);}
 const wounds=new Map(losers.map(u=>[u.uid,u.currentWounds]));
 for(const f of fighters.filter(f=>f.unit.side===r.winnerSide)){const u=f.unit,targets=losers.filter(v=>contact(f.front,v)).sort((a,b)=>distance(f.front,a)-distance(f.front,b));
  for(let a=0;a<(f.support?1:u.stats.attacks);a++){let v=targets.find(v=>wounds.get(v.uid)>0);if(!v)break;const doubled=r.trappedUnits.includes(v.uid)||r.knockedDownUnits.includes(v.uid);
   for(let j=0;j<(doubled?2:1);j++){v=targets.find(v=>wounds.get(v.uid)>0);if(!v)break;const die=roll(),needed=api.wound(u.stats.strength,v.stats.defence),wound=die>=needed;if(wound){wounds.set(v.uid,wounds.get(v.uid)-1);r.wounds.push(v.uid);}const killed=wound&&wounds.get(v.uid)===0;if(killed)r.kills.push(v.uid);r.strikeResults.push({attacker:u.uid,target:v.uid,roll:die,needed,wound,killed,support:f.support});}
  }
 }
 return r;
}
function role(u,meta){return has(u,'monster')?'monster':has(u,'mounted')?'cavalry':u.stats.shootRange?'archer':supportKind(u,meta)?'support':has(u,'hero')?'hero':'infantry';}
function positionScore(u,p,all,meta,objective,los){
 const foes=all.filter(v=>v.side!==u.side),friends=all.filter(v=>v.side===u.side&&v.uid!==u.uid);if(!foes.length)return 0;
 const nearest=foes.slice().sort((a,b)=>distance(p,a)-distance(p,b))[0],gap=distance(p,nearest)-u.radius-nearest.radius,r=role(u,meta),travel=distance(u,p)*.09,pressure=foes.filter(v=>distance(p,v)<u.radius+v.radius+120).length;
 if(r==='archer')return Math.abs(distance(p,nearest)-Math.min(u.stats.shootRange*.72,410))+travel+(los(p,nearest)==='blocked'?650:0)+Math.max(0,135-gap)*5+pressure*35;
 if(r==='support'){const fronts=friends.filter(v=>!['archer','support'].includes(role(v,meta))&&!has(v,'mounted')&&!has(v,'monster'));if(fronts.length){let best=Infinity;for(const f of fronts){const e=foes.slice().sort((a,b)=>distance(f,a)-distance(f,b))[0],d=distance(f,e)||1,target={x:f.x+(f.x-e.x)/d*(u.radius+f.radius+1),y:f.y+(f.y-e.y)/d*(u.radius+f.radius+1)};best=Math.min(best,distance(p,target)+(engaged(f,all)?0:35));}return best+travel+Math.max(0,15-gap)*8;}}
 const cohesion=friends.length?Math.min(...friends.map(v=>distance(p,v))):0;
 return gap+travel+(r==='cavalry'?pressure*45+Math.max(0,cohesion-300)*.25:r==='monster'?-pressure*20:r==='hero'?Math.max(0,cohesion-180)*.8:Math.max(0,cohesion-180)*.35+(objective?distance(p,objective)*.08:0));
}
const api={distance,supportKind,supportLinks,resolveFight,role,positionScore};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LWBTactics=api;
})(typeof window!=='undefined'?window:this);

window.LWB_TERRAIN_DEFS=[{"id":"terr_fallen_log","name":"쓰러진 통나무","file":"tokens/terr_fallen_log.png","visualBase":"M","visualRadius":0.72}];
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

const clarityGame = new Ot.Game({ type: Ot.AUTO, parent: "game", width: Math.max(1,Math.round(document.querySelector('#game').clientWidth)), height: Math.max(1,Math.round(document.querySelector('#game').clientHeight)), backgroundColor: "#293038", scale: { mode: Ot.Scale.NONE, autoCenter: Ot.Scale.NO_CENTER, autoRound: false }, scene: [Tt], render: { antialias: true, antialiasGL: true, pixelArt: false, roundPixels: false, powerPreference: "low-power" }, fps: {target:60}, audio: {noAudio:true} });
Yt();
ut("overview").onclick = () => Tt.overview();
ut("focus").onclick = () => Tt.focus();
const re = ut("minimap");
re.onpointerdown = Z => { const Y = re.getBoundingClientRect(); Tt.center((Z.clientX - Y.left) / Y.width * pt.width, (Z.clientY - Y.top) / Y.height * pt.height); };
function xe() { var $; const Z = ut("minimap"), Y = Z.getContext("2d"), b = Z.width / pt.width, H = Z.height / pt.height; Y.clearRect(0, 0, Z.width, Z.height), Y.fillStyle = "#263a37", Y.fillRect(0, 0, Z.width, Z.height); for (const p of q.terrain.filter(S => S.active))
    Y.fillStyle = p.kind === "block" ? "#8c9480" : "#b6a27b", Y.fillRect((p.x - p.w / 2) * b, (p.y - p.h / 2) * H, p.w * b, p.h * H); for (const p of q.alive())
    Y.fillStyle = p.side === "good" ? "#b9e8f6" : "#ee9879", Y.beginPath(), Y.arc(p.x * b, p.y * H, p.traits.includes("hero") ? 3.3 : 2.3, 0, 7), Y.fill(), p.uid === (q.activeMoverUid || q.selected) && (Y.strokeStyle = "#f17b70", Y.lineWidth = 2, Y.beginPath(), Y.arc(p.x * b, p.y * H, 6, 0, 7), Y.stroke()); const K = ($ = Tt.cameras) == null ? void 0 : $.main; K && (Y.strokeStyle = "#f0d89b", Y.lineWidth = 1, Y.strokeRect(K.worldView.x * b, K.worldView.y * H, K.worldView.width * b, K.worldView.height * H)); }
setInterval(xe, 200);
