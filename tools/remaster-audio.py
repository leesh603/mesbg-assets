"""Edit licensed recorded foley into warm normal/fast game cues.

Usage: python tools/remaster-audio.py ../ost-production/sfx-sources
Sources: Kenney RPG Audio, Impact Sounds, Casino Audio (CC0).
No oscillators, generated white-noise impacts or copied soundtrack samples.
"""
import hashlib
import json
import sys
from pathlib import Path
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly

ROOT = Path(__file__).resolve().parents[1]
SOURCES = Path(sys.argv[1]).resolve()
OUT = ROOT / "assets/mesbg/audio"
SR = 22050
catalogue = {p.name: p for p in SOURCES.rglob("*.ogg") if p.name != "Preview.ogg"}

# id: recording pattern, category, variants, normal seconds, fast seconds, peak
SPEC = {
 "sword_swing": ("knifeSlice*.ogg", "swing", 3, .26, .12, .22),
 "sword_armor": ("impactMetal_medium*.ogg", "impact", 3, .32, .14, .28),
 "sword_shield": ("impactPlate_medium*.ogg", "impact", 3, .30, .14, .28),
 "sword_flesh": ("impactPunch_medium*.ogg", "impact", 3, .25, .12, .28),
 "sword_parry": ("impactMetal_light*.ogg", "impact", 3, .30, .13, .24),
 "critical_hit": ("impactWood_heavy*.ogg", "impact", 3, .38, .18, .31),
 "spear_thrust": ("drawKnife*.ogg", "impact", 3, .26, .12, .24),
 "axe_hit": ("impactPlank_medium*.ogg", "impact", 3, .35, .17, .29),
 "arrow_release": ("knifeSlice*.ogg", "swing", 3, .21, .10, .23),
 "arrow_fly": ("cloth[123].ogg", "swing", 3, .24, .10, .18),
 "arrow_impact": ("impactWood_light*.ogg", "impact", 3, .23, .12, .25),
 "base_slide": ("footstep_grass*.ogg", "movement", 3, .23, .11, .18),
 "base_contact": ("impactSoft_heavy*.ogg", "impact", 3, .30, .14, .27),
 "push": ("cloth[12].ogg", "movement", 2, .32, .12, .19),
 "cavalry_charge": ("footstep_wood*.ogg", "impact", 2, .55, .22, .27),
 "dice_roll": ("dice-throw-*.ogg", "dice", 3, .42, .15, .19),
 "ui_select": ("metalClick.ogg", "ui", 3, .10, .10, .15),
 "ui_confirm": ("bookClose.ogg", "ui", 2, .19, .19, .18),
 "ui_cancel": ("handleSmallLeather*.ogg", "ui", 2, .15, .15, .15),
 "ui_error": ("impactWood_light*.ogg", "ui", 2, .17, .17, .18),
 "reward_select": ("handleCoins*.ogg", "notification", 2, .46, .46, .23),
 "event": ("bookFlip*.ogg", "magic", 2, .45, .21, .20),
 "death": ("dropLeather.ogg", "impact", 3, .42, .18, .22),
 "war_horn": ("metalPot*.ogg", "notification", 2, .80, .80, .22),
 "cast": ("cloth[123].ogg", "magic", 2, .48, .20, .20),
 "heal": ("handleCoins*.ogg", "magic", 2, .55, .24, .20),
 "terror": ("creak*.ogg", "magic", 2, .60, .25, .21),
 "monster_hit": ("impactPunch_heavy*.ogg", "impact", 2, .46, .20, .30),
 "victory": ("handleCoins*.ogg", "notification", 1, .75, .75, .22),
 "defeat": ("bookClose.ogg", "notification", 1, .65, .65, .20),
}

def load(path):
    x, rate = sf.read(path, dtype="float64", always_2d=True)
    x = x.mean(axis=1)
    if rate != SR:
        x = resample_poly(x, SR, rate)
    return x

def edit(x, seconds, peak, fast, category, variant):
    # Keep the recording's strongest acoustic gesture, rather than an arbitrary silence.
    if not np.isfinite(x).all():
        raise ValueError("Invalid recording")
    onset = np.flatnonzero(np.abs(x) > max(.002, np.max(np.abs(x)) * .035))
    x = x[max(0, int(onset[0]) - 44):] if len(onset) else x
    if category == "dice":
        # Choose a natural cluster of clacks; do not accelerate or repeat the waveform.
        width = min(len(x), int(seconds * SR))
        energy = np.convolve(x*x, np.ones(min(220,len(x))), mode="same")
        start = max(0, int(np.argmax(energy)) - width // 3)
        x = x[start:start+width]
    if variant:
        x = resample_poly(x, 1000, 1000 + (15 if category == "ui" else 8)*variant)
    cutoff = 2400 if fast else 4200
    if category in ("dice", "ui"):
        cutoff = 2100 if fast else 3400
    x = sosfilt(butter(3, [80,cutoff], fs=SR, btype="bandpass", output="sos"), x)
    length = min(len(x), int(seconds * SR))
    x = x[:length].copy()
    if length < 80:
        raise ValueError("Recording too short")
    # Gentle compression of original transients and click-free edits.
    x = np.tanh(x / max(.001, np.max(np.abs(x))) * 1.15)
    fade = min(int(.035*SR), length//3)
    attack = min(int(.004*SR), length//4)
    x[:attack] *= np.linspace(0,1,attack)
    x[-fade:] *= np.linspace(1,0,fade)**1.5
    x *= peak / max(.001, np.max(np.abs(x)))
    if fast and category not in ("ui", "notification"):
        x *= .75
    return x

previous = json.loads((ROOT/"docs/audio-foley-manifest.json").read_text()) if (ROOT/"docs/audio-foley-manifest.json").exists() else {}
accents = previous.get("orchestralAccents", [])
protected = {cue["effect"] for cue in accents}
metrics = []
manifest = {}
for name,(pattern,group,count,normal,fast,peak) in SPEC.items():
    matches = sorted(SOURCES.rglob(pattern))
    if not matches:
        raise ValueError(f"Missing licensed recording: {pattern}")
    files, fast_files = [], []
    for i in range(count):
        source = matches[i % len(matches)]
        x = load(source)
        suffix = "" if i == 0 else f"_{i+1:02d}"
        for accelerated, seconds in ((False,normal),(True,fast)):
            destination = OUT / ("fast" if accelerated else "") / f"{name}{suffix}.wav"
            destination.parent.mkdir(exist_ok=True)
            audio = edit(x, seconds, peak, accelerated, group, i)
            if name not in protected:
                sf.write(destination, audio, SR, subtype="PCM_16")
            relative = destination.relative_to(ROOT / "assets/mesbg").as_posix()
            (fast_files if accelerated else files).append(relative)
            metrics.append({"file":relative,"source":source.relative_to(SOURCES).as_posix(),
                "sourceSha256":hashlib.sha256(source.read_bytes()).hexdigest(),"license":"CC0-1.0",
                "seconds":len(audio)/SR,"peak":float(np.max(np.abs(audio))),
                "rms":float(np.sqrt(np.mean(audio**2))),"bytes":destination.stat().st_size})
    manifest[name] = {"file":files[0],"files":files,"fastFiles":fast_files,
        "group":group,"priority":90 if group=="notification" else 75 if group=="ui" else 55 if group=="impact" else 35 if group=="magic" else 20,
        "volume":.62 if group=="impact" else .50 if group=="dice" else .60}

# Cinematic atmospheric gestures now use recorded leather/metal/wood, softened for headphones.
cinematic = [("boss_nazgul_shriek","creak*.ogg",4.2,.27),
    ("boss_fell_wing","cloth*.ogg",1.5,.25),("boss_ring_seal","impactMetal_medium*.ogg",2.5,.26),
    ("boss_dark_omen","creak*.ogg",6.5,.24)]
cinematic_metrics = []
for name,pattern,seconds,peak in cinematic:
    path = sorted(SOURCES.rglob(pattern))[0]
    x = load(path)
    # Stretch only our licensed recordings; no shrill synthesized scream.
    x = resample_poly(x, int(seconds*SR), len(x))
    x = edit(x, seconds, peak, False, "magic",0)
    x = np.pad(x,(0,max(0,round(seconds*SR)-len(x))))[:round(seconds*SR)]
    destination = OUT / f"{name}.wav"
    sf.write(destination,np.column_stack([x,x]),SR,subtype="PCM_16")
    cinematic_metrics.append({"file":"audio/"+destination.name,"seconds":seconds,
        "sampleRate":SR,"channels":2,"peak":float(np.max(np.abs(x))),"rms":float(np.sqrt(np.mean(x*x))),
        "source":path.relative_to(SOURCES).as_posix(),"license":"CC0-1.0"})
(OUT/"boss-cinematic-audio.json").write_text(json.dumps({"recordedFoley":True,"cues":cinematic_metrics},indent=2)+"\n")
if protected:
    metrics = [next((old for old in previous["files"] if old["file"]==item["file"]),item) if Path(item["file"]).stem.removesuffix("_02") in protected else item for item in metrics]
(ROOT/"docs/audio-foley-manifest.json").write_text(json.dumps({"effects":manifest,"files":metrics,"cinematic":cinematic_metrics,"orchestralAccents":accents},indent=2)+"\n")
print(f"Edited {len(metrics)} normal/fast recorded variants and {len(cinematic_metrics)} cinematic cues")
