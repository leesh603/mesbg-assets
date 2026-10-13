"""Serialize generated artwork at the original token dimensions; never repaint."""
import hashlib
import json
import os
from pathlib import Path
import sys
from PIL import Image

BASE = Path(__file__).resolve().parent
REPO = BASE.parents[1]

def atomic_json(path, data):
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    os.replace(temp, path)

entry = json.load(sys.stdin)
catalog = json.loads((BASE / 'catalog.json').read_text())
unit = next(u for u in catalog['records'] if u['id'] == entry['id'])
original_path = REPO / unit['file']
assert hashlib.sha256(original_path.read_bytes()).hexdigest() == unit['source_sha256']
original = Image.open(original_path).convert('RGBA')
generated = Image.open(entry['path']).convert('RGBA')
generated.putalpha(generated.getchannel('A').point(lambda v: 0 if v <= 1 else v))
generated = generated.crop(generated.getbbox())
box = original.getbbox()
target_width = min(original.width - 10, int((box[2] - box[0]) * 1.04))
target_height = box[3] - box[1]
scale = min(target_width / generated.width, target_height / generated.height)
generated = generated.resize((max(1, round(generated.width * scale)),
                              max(1, round(generated.height * scale))),
                             Image.Resampling.LANCZOS)
final = Image.new('RGBA', original.size)
final.alpha_composite(generated, ((original.width - generated.width) // 2,
                                 box[3] - generated.height))
destination = BASE / unit['output']
temporary = destination.with_suffix('.tmp.png')
final.save(temporary, optimize=True)
os.replace(temporary, destination)
check = Image.open(destination)
check.load()
assert check.mode == 'RGBA' and check.size == original.size
assert check.getchannel('A').getextrema() == (0, 255)
unit['status'] = 'generated_pending_review'
unit['generated_path'] = entry['path']
unit['native_validation'] = {'size': list(final.size), 'mode': final.mode,
                            'bbox': list(final.getbbox()), 'source_bbox': list(box)}
sources_path = BASE / 'generation_sources.json'
sources = json.loads(sources_path.read_text()) if sources_path.exists() else []
sources = [s for s in sources if s['id'] != entry['id']] + [entry]
atomic_json(sources_path, sources)
atomic_json(BASE / 'catalog.json', catalog)
print(json.dumps({'id': entry['id'], 'saved': str(destination),
                  'generated': sum(u['status'] in ('generated_pending_review',
                                                   'review_passed', 'approved_reworked')
                                   for u in catalog['records'])}))
