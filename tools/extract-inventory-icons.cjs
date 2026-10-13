// Export the inventory atlas frames without resampling or changing their pixels.
// npm install; node tools/extract-inventory-icons.cjs
const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');
const dir = path.join(__dirname, '../assets/mesbg/inventory');
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const sheets = new Map();
fs.mkdirSync(path.join(dir, 'icons'), { recursive: true });
for (const item of Object.values(manifest.icons)) {
    if (!sheets.has(item.sheet)) sheets.set(item.sheet, PNG.sync.read(fs.readFileSync(path.join(dir, 'atlases', item.sheet))));
    const sheet = sheets.get(item.sheet), f = item.frame;
    if (f.x < 0 || f.y < 0 || f.x + f.w > sheet.width || f.y + f.h > sheet.height) throw new Error('Invalid frame: ' + item.family + ':' + item.id);
    const icon = new PNG({ width: f.w, height: f.h });
    PNG.bitblt(sheet, icon, f.x, f.y, f.w, f.h, 0, 0);
    fs.writeFileSync(path.join(dir, 'icons', item.family + '_' + item.id + '.png'), PNG.sync.write(icon));
}
console.log('Inventory icons exported: ' + Object.keys(manifest.icons).length);
