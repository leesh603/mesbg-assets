const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { PNG } = require('pngjs');
const source = fs.readFileSync('src/game.js', 'utf8');
const manifest = JSON.parse(fs.readFileSync('assets/mesbg/inventory/manifest.json', 'utf8'));
function runtime(assets = {}) {
    const start = source.indexOf('// Inventory art:');
    const end = source.indexOf('// 장비 슬롯:', start);
    assert.ok(start >= 0 && end > start);
    const ctx = { window: { __MESBG_ASSETS__: assets } };
    vm.createContext(ctx);
    vm.runInContext(source.slice(start, end) + '\nthis.equipment=LWB_EQUIP;this.iconPath=inventoryIconPath;this.relicIds=[...LWB_INVENTORY_ICONS.relic];', ctx);
    return ctx;
}
test('all registered relics and equipment resolve to distinct, existing pixel icons', () => {
    const r = runtime(), campaign = require('./campaign-harness.cjs')();
    assert.equal(campaign.CX.relics.length, 69);
    assert.equal(r.equipment.length, 65);
    const paths = new Set();
    for (const item of campaign.CX.relics) {
        assert.ok(r.relicIds.includes(item.id), 'unmapped relic: ' + item.id);
        const url = r.iconPath('relic', item.id);
        assert.ok(fs.existsSync(url.split('?')[0]), url);
        assert.ok(!paths.has(url), 'reused image: ' + item.id); paths.add(url);
    }
    for (const item of r.equipment) {
        assert.match(item.iconImg, /inventory\/icons\/equipment_/);
        assert.ok(fs.existsSync(item.iconImg.split('?')[0]), item.iconImg);
        assert.ok(!paths.has(item.iconImg), 'reused image: ' + item.id); paths.add(item.iconImg);
    }
    assert.equal(paths.size, 134);
});
test('offline assets are used and future items keep the legacy fallback', () => {
    const embedded = 'data:image/png;base64,cGl4ZWw=';
    const r = runtime({ 'inventory/icons/equipment_anduril.png': embedded });
    assert.equal(r.equipment.find(x => x.id === 'anduril').iconImg, embedded);
    assert.equal(r.iconPath('relic', 'future_relic'), '');
    assert.equal(r.iconPath('equipment', 'future_equipment'), '');
    assert.equal(r.iconPath('unknown', 'lembas'), '');
});
test('exported atlas frames remain transparent with safe padding', () => {
    assert.equal(Object.keys(manifest.icons).length, 144);
    for (const item of Object.values(manifest.icons)) {
        const image = PNG.sync.read(fs.readFileSync('assets/mesbg/' + item.file));
        assert.equal(image.width, 256); assert.equal(image.height, 256);
        let visible = 0;
        for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
            const alpha = image.data[(y * 256 + x) * 4 + 3];
            assert.ok(alpha === 0 || alpha === 255);
            if (alpha) { visible++; assert.ok(x >= 20 && x < 236 && y >= 20 && y < 236, item.id); }
        }
        assert.ok(visible > 200, 'empty icon: ' + item.id);
    }
});
test('the served HTML contains the exact current game source', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const begin = '/*__LWB_SRC_BEGIN__*/', end = '/*__LWB_SRC_END__*/';
    assert.equal(html.slice(html.indexOf(begin) + begin.length, html.indexOf(end)).trim(), source.trim());
});
