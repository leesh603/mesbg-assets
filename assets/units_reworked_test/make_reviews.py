"""Build exact before/after contact sheets for visual review."""
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
REPO = BASE.parents[1]
catalog = json.loads((BASE / 'catalog.json').read_text())
decisions_path = BASE / 'review_decisions.json'
decisions = json.loads(decisions_path.read_text()) if decisions_path.exists() else {}
rows = [u for u in catalog['records'] if u.get('output') and (BASE / u['output']).exists()
        and u['id'] not in decisions]
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 17)
index = []
for page in range(math.ceil(len(rows) / 12)):
    chunk = rows[page * 12:(page + 1) * 12]
    image = Image.new('RGB', (1600, 1300), (30, 36, 43))
    draw = ImageDraw.Draw(image)
    draw.text((15, 15), 'Each pair: Original (left) / Reworked (right)', font=font, fill='white')
    for i, unit in enumerate(chunk):
        x, y = (i % 4) * 400, 55 + (i // 4) * 410
        draw.text((x + 8, y), unit['id'], font=font, fill=(225, 219, 173))
        sprites = [Image.open(path).convert('RGBA')
                   for path in [REPO / unit['file'], BASE / unit['output']]]
        boxes = [sprite.getbbox() for sprite in sprites]
        common_box = (min(box[0] for box in boxes), min(box[1] for box in boxes),
                      max(box[2] for box in boxes), max(box[3] for box in boxes))
        for k, sprite in enumerate(sprites):
            sprite = sprite.crop(common_box)
            sprite.thumbnail((185, 335), Image.Resampling.NEAREST)
            image.paste(sprite, (x + 200 * k + (200 - sprite.width) // 2,
                                y + 30 + 335 - sprite.height), sprite)
    path = BASE / 'review' / ('pending_%02d.jpg' % page)
    image.save(path, quality=94)
    index.append({'file': str(path), 'ids': [u['id'] for u in chunk]})
(BASE / 'review' / 'pending_index.json').write_text(json.dumps(index, indent=2))
print(json.dumps({'pending_visual_review': len(rows), 'pages': len(index)}))
