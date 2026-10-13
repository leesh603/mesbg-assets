"""Validate the native PNG deliverables and unchanged source assets."""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image

BASE = Path(__file__).resolve().parent
REPO = BASE.parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--require-complete', action='store_true')
args = parser.parse_args()
catalog = json.loads((BASE / 'catalog.json').read_text())
reviews = json.loads((BASE / 'review_decisions.json').read_text())
errors, missing, unreviewed, validated, framing_flags = [], [], [], [], []
preserved_count = 0
for unit in catalog['records']:
    source = REPO / unit['file']
    source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
    if source_hash != unit['source_sha256']:
        errors.append(unit['id'] + ': source changed')
    if unit['status'] == 'preserve':
        saved = BASE / 'preserved' / source.name
        if not saved.exists() or hashlib.sha256(saved.read_bytes()).hexdigest() != source_hash:
            errors.append(unit['id'] + ': preserved copy differs')
        preserved_count += 1
    if not unit.get('output'):
        continue
    output = BASE / unit['output']
    if not output.exists():
        missing.append(unit['id'])
        continue
    try:
        with Image.open(output) as im:
            im.load()
            if im.format != 'PNG' or im.mode != 'RGBA' or list(im.size) != unit['size']:
                errors.append(unit['id'] + ': PNG format, mode or canvas mismatch')
            if im.getchannel('A').getextrema() != (0, 255):
                errors.append(unit['id'] + ': transparent/opaque alpha missing')
            if not im.getbbox():
                errors.append(unit['id'] + ': empty artwork')
            with Image.open(source) as original:
                source_visible = original.convert('RGBA').getchannel('A').point(
                    lambda a: 255 if a >= 32 else 0).getbbox()
            visible = im.getchannel('A').point(lambda a: 255 if a >= 32 else 0).getbbox()
            visible_height_ratio = ((visible[3] - visible[1]) /
                                    (source_visible[3] - source_visible[1]))
            foot_delta = visible[3] - source_visible[3]
            if visible_height_ratio < .9 or abs(foot_delta) > 10:
                framing_flags.append({'id': unit['id'],
                                      'visible_height_ratio': visible_height_ratio,
                                      'foot_delta_px': foot_delta})
            validated.append({'id': unit['id'], 'size': list(im.size),
                              'mode': im.mode, 'bbox': im.getbbox(),
                              'visible_bbox': visible, 'source_visible_bbox': source_visible,
                              'visible_height_ratio': visible_height_ratio,
                              'visible_foot_delta_px': foot_delta,
                              'output_sha256': hashlib.sha256(output.read_bytes()).hexdigest()})
    except Exception as exc:
        errors.append(unit['id'] + ': ' + str(exc))
    decision = reviews.get(unit['id'], {})
    if decision.get('decision') != 'pass':
        unreviewed.append(unit['id'])
report = {'source_main': catalog['source_main'],
          'source_assets_checked': len(catalog['records']),
          'unit_count': catalog['unit_count'], 'terrain_excluded': catalog['terrain_excluded'],
          'preserved_copies_verified': preserved_count,
          'redraw_target_count': sum(bool(u.get('output')) for u in catalog['records']),
          'native_pngs_validated': len(validated),
          'visual_review_pass_count': len(validated) - len(unreviewed),
          'missing': missing, 'unreviewed': unreviewed, 'errors': errors,
          'visible_framing_flags': framing_flags,
          'validated_outputs': validated}
(BASE / 'qa_bulk.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps({k: v for k, v in report.items() if k != 'validated_outputs'}, ensure_ascii=False))
raise SystemExit(bool(errors or (args.require_complete and (missing or unreviewed or framing_flags))))
