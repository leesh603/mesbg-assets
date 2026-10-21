const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');

const src = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');
const begin = src.indexOf('{const _hp=Ve.prototype.play;');
const end = src.indexOf('\nif(window.MESBG)MESBG.heroCutin=', begin);
assert.ok(begin >= 0 && end > begin, 'hero cut-in event bridge exists');

function harness(cutin) {
    const events = [], calls = [], errors = [];
    const unit = { uid: 'hero-1', id: 'guthlaf', name: '구슬라프' };
    class Scene {
        constructor() { this.b = { unit: uid => uid === unit.uid ? unit : undefined }; }
        play(event) { events.push(event); return 'battle-play-result'; }
    }
    const context = {
        Ve: Scene,
        heroCutin: (...args) => { calls.push(args); return cutin?.(...args); },
        console: { error: (...args) => errors.push(args) }
    };
    vm.runInNewContext(src.slice(begin, end), context);
    return { scene: new Scene(), unit, events, calls, errors };
}

test('unique hero skill emits its named cut-in without a false Might cost', () => {
    const h = harness();
    const event = { type: 'HeroSkill', uid: h.unit.uid, message: '구슬라프 · 쓰러지지 않는 왕기' };
    assert.equal(h.scene.play(event), 'battle-play-result');
    assert.equal(h.calls.length, 1);
    assert.equal(h.calls[0][1], h.unit);
    assert.equal(h.calls[0][2], '쓰러지지 않는 왕기');
    assert.equal(h.calls[0][3], '');
    assert.equal(h.events[0], event);
});

test('Might action keeps its name and actual resource cost', () => {
    const h = harness();
    h.scene.play({ type: 'Heroic', uid: h.unit.uid, message: '구슬라프 — 영웅 행동 · 영웅적 수비 (AI)' });
    assert.equal(h.calls.length, 1);
    assert.equal(h.calls[0][2], '영웅적 수비');
    assert.equal(h.calls[0][3], 'Might −1');
});

test('ordinary movement and damage do not create extra cut-ins', () => {
    const h = harness();
    for (const type of ['UnitMoved', 'UnitWounded', 'UnitKilled']) h.scene.play({ type, uid: h.unit.uid });
    h.scene.play({ type: 'HeroSkill' });
    assert.equal(h.calls.length, 0);
    assert.equal(h.events.length, 4);
});

test('failed asynchronous cut-in cannot reject battle event playback', async () => {
    const failure = new Error('art unavailable');
    const h = harness(() => Promise.reject(failure));
    assert.equal(h.scene.play({ type: 'HeroSkill', uid: h.unit.uid }), 'battle-play-result');
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(h.events.length, 1);
    assert.equal(h.errors.length, 1);
    assert.equal(h.errors[0][1], failure);
});
