// token-idle.js — subtle idle/feedback motions for MESBG web-game tokens.
// The base disc (발판) NEVER moves: mount() stacks a radially-masked copy of
// the token over the static base and animates only the figure layer.
// Zero deps. Works two ways:
//   A) <img>/DOM:  TokenIdle.mount(imgEl, 'warg_rider')  → figure-only CSS anim
//   B) canvas:     draw the sprite once (static base), then draw it again
//                  masked to a radial gradient (~m.mask fractions) under the
//                  transform from TokenIdle.sample(kind, tMs, seed)
// Optional metadata: pass a units.json entry to mount() as 3rd arg for exact role.
(function (global) {
  'use strict';

  // kind -> motion recipe (sizes are fractions of token size; rot radians;
  // oy = transform-origin height fraction — ground units pivot near the feet
  // so sway reads as weight shift, not sliding; mask = [opaqueFigureRadius,
  // fadeEndRadius] of the element half-size)
  const KINDS = {
    foot:    { scale: 0.018, rot: 0.005, dy: 0.003, dur: 3400, oy: 0.62, mask: [0.76, 0.95] },
    hero:    { scale: 0.016, rot: 0.007, dy: 0.004, dur: 3600, oy: 0.62, mask: [0.76, 0.95] },
    cavalry: { scale: 0.009, rot: 0.010, dy: 0.020, dur: 1500, dx: 0.005, oy: 0.60, mask: [0.76, 0.95] },
    beast:   { scale: 0.011, rot: 0.013, dy: 0.009, dur: 2600, dx: 0.010, oy: 0.58, mask: [0.78, 0.96] },
    monster: { scale: 0.030, rot: 0.007, dy: 0.007, dur: 4200, oy: 0.64, mask: [0.80, 0.97] },
    flyer:   { scale: 0.012, rot: 0.020, dy: 0.040, dur: 2700, dx: 0.008, oy: 0.50, mask: [0.82, 0.98] },
    wraith:  { scale: 0.020, rot: 0.016, dy: 0.030, dur: 3900, dx: 0.016, oy: 0.50, glow: 0.10, mask: [0.78, 0.97] },
    banner:  { scale: 0.006, rot: 0.026, dy: 0.003, dur: 2800, oy: 0.70, mask: [0.74, 0.95] },
    terrain: {},
  };

  // attack kinds -> keyframe spec. Each row [pct, {dx,dy,rot,sx,sy,glow,e}]:
  // dx/dy are % of element size, rot in degrees, glow = brightness lift,
  // e = easing (animation-timing-function) FROM this keyframe to the next.
  // Shape: anticipation -> strike (+impact flash) -> overshoot -> settle.
  // fxAt = fraction of dur when the blow lands -> effects/fx_<type>.png
  // overlay (.tkn-fx) pops in there; needs a mounted stack.
  const ATTACKS = {
    slash:  { dur: 620, fxAt: .48, keys: [[0,{}],[20,{rot:-14,dy:1.6,sy:1.02,e:'cubic-bezier(.7,0,.9,.5)'}],[42,{rot:10,dx:1,dy:-2,e:'cubic-bezier(.2,.8,.4,1)'}],[50,{rot:18,dx:2.2,dy:-3.2,glow:.12}],[62,{rot:6,dx:.5,dy:-.5}],[80,{rot:-2}],[100,{}]] },
    thrust: { dur: 640, fxAt: .50, keys: [[0,{}],[30,{dy:2.6,sx:.95,sy:1.06,e:'cubic-bezier(.8,0,.9,.6)'}],[52,{dy:-8,sx:1.06,sy:.88,glow:.1}],[64,{dy:-5.5,sx:1.02,sy:.95}],[82,{dy:1.2}],[100,{}]] },
    smash:  { dur: 880, fxAt: .44, keys: [[0,{}],[28,{dy:-7,sx:1.02,sy:1.09,rot:-4,e:'cubic-bezier(.8,0,1,.4)'}],[46,{dy:4,sx:1.14,sy:.72,glow:.22}],[58,{dy:2.2,sx:1.07,sy:.85}],[72,{dy:-1.4,sy:.94}],[86,{dy:.5}],[100,{}]] },
    shoot:  { dur: 680, fxAt: .42, keys: [[0,{}],[34,{dy:1.8,rot:-5,sy:1.03,e:'cubic-bezier(.85,0,1,.45)'}],[44,{dy:-1.4,rot:3.5,glow:.3}],[52,{rot:2}],[66,{rot:-1,dy:.5}],[100,{}]] },
    cast:   { dur: 1100, fxAt: .50, keys: [[0,{}],[18,{dy:-2.5,sy:1.04,glow:.1}],[40,{dy:-5,sx:1.03,sy:1.09,glow:.35}],[52,{dy:-5.5,sx:1.05,sy:1.12,glow:.7}],[60,{glow:.25}],[68,{glow:.55,dy:-4.5}],[82,{dy:-1.2,glow:.15}],[100,{}]] },
    rally:  { dur: 1000, fxAt: .10, keys: [[0,{}],[15,{rot:11}],[32,{rot:-9}],[50,{rot:8,glow:.15}],[68,{rot:-5}],[84,{rot:3}],[100,{}]] },
    pounce: { dur: 760, fxAt: .48, keys: [[0,{}],[22,{dy:2.2,sx:1.08,sy:.78,e:'cubic-bezier(.6,0,.9,.4)'}],[50,{dy:-7,rot:3,sx:.96,sy:1.08}],[62,{dy:-4}],[76,{dy:1.2,sx:1.04,sy:.88}],[88,{dy:.4,sy:.95}],[100,{}]] },
  };

  // id / metadata -> attack kind. Meta: units.json entry {role, weapon} (optional)
  function attackTypeFor(idOrKind, meta) {
    const id = String(idOrKind || '').toLowerCase();
    const w = meta && meta.weapon;
    // spellcasters by name first — the Witch-king swings a sword in the art
    // but should visibly cast, same for Nazgul/Istari/shamans
    if (/witchking|nazgul|dwimmerlaik|khamul|gandalf|saruman|shaman|wizard|sorcer|necromancer/.test(id)) return 'cast';
    if (w) {
      if (w === 'bow' || w === 'crossbow') return 'shoot';
      if (w === 'staff' || w === 'bomb') return 'cast';
      if (w === 'spear' || w === 'spear_shield' || w === 'pike' || w === 'lance' || w === 'pitchfork') return 'thrust';
      if (w === 'twohanded' || w === 'mace' || w === 'club') return 'smash';
      if (w === 'banner' || w === 'drum') return 'rally';
      if (w === 'sword' || w === 'sword_shield' || w === 'axe' || w === 'dagger' || w === 'whip') return 'slash';
    }
    if (/archer|bowman|ranger|marksman|crossbow|bow_/.test(id)) return 'shoot';
    if (/spear|pike|lance|kataphrakt|pitchfork/.test(id)) return 'thrust';
    if (/banner|drum/.test(id)) return 'rally';
    if (/troll|balrog|mumak|oliphaunt/.test(id)) return 'smash';
    if (/warg|shelob|beorning|ent|fellbeast|eagle/.test(id)) return 'pounce';
    const k = KINDS[idOrKind] ? idOrKind : classify(idOrKind, meta);
    if (k === 'monster') return 'smash';
    if (k === 'beast' || k === 'flyer') return 'pounce';
    if (k === 'wraith') return 'cast';
    if (k === 'banner') return 'rally';
    return 'slash';
  }

  // id / metadata -> kind. Meta: units.json entry {role, weapon, faction} (optional)
  function classify(id, meta) {
    id = String(id || '').toLowerCase();
    if (id.startsWith('terr_') || (meta && meta.role === 'terrain')) return 'terrain';
    if (/banner/.test(id) || (meta && meta.weapon === 'banner')) return 'banner';
    if (/eagle|fellbeast|crebain/.test(id)) return 'flyer';
    if (/nazgul|witchking|dwimmerlaik|khamul|wight|wraith/.test(id)) return 'wraith';
    if (/warg|shelob|ent|beorning/.test(id)) return 'beast';
    if (/troll|balrog/.test(id) || (meta && meta.role === 'monster')) return 'monster';
    if (meta && meta.role === 'cavalry') return 'cavalry';
    if (/mounted|rider|knight|kataphrakt|outrider|sharku/.test(id)) return 'cavalry';
    if (meta && meta.role === 'hero') return 'hero';
    return 'foot';
  }

  // deterministic 0..1 phase from a string so tokens don't animate in sync
  function hash(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) | 0;
    return ((h >>> 0) % 10000) / 10000;
  }

  // --- canvas path: sample transform params at time t(ms). seed: any string/num.
  // dx/dy are fractions of sprite size, rot radians, glow = brightness swing.
  // oy = pivot height fraction (rotate/scale around this point, not centre).
  // m.mask = [solid, fade] fractions of half-width for the figure-layer mask.
  // For one-shots use attackSample(type, k01) with k = elapsed/duration and
  // compose it over the idle sample (multiply scales, add the rest).
  function sample(kind, t, seed) {
    const p = KINDS[kind] || KINDS.foot;
    if (!p.dur) return { dx: 0, dy: 0, rot: 0, sx: 1, sy: 1, glow: 0, oy: p.oy || 0.5, mask: p.mask || [0, 0] };
    const ph = (hash(String(seed || 'x')) + t / p.dur) * Math.PI * 2;
    const w1 = Math.sin(ph), w2 = Math.sin(ph * 0.5 + 1.3); // layered = less mechanical
    return {
      dx: (p.dx || 0) * w2,
      dy: -(p.dy || 0) * (0.6 * w1 + 0.4 * w2),
      rot: (p.rot || 0) * (0.7 * w1 + 0.3 * w2),
      sx: 1 + (p.scale || 0) * w1 * 0.6,
      sy: 1 + (p.scale || 0) * w1,
      glow: (p.glow || 0) * (0.5 + 0.5 * w2),
      oy: p.oy || 0.5,
      mask: p.mask || [0.6, 0.8],
    };
  }

  // attack one-shot transform at progress k (0..1). Same fields as sample(),
  // dx/dy fractions of sprite size, rot radians.
  function attackSample(type, k) {
    const spec = ATTACKS[type] || ATTACKS.slash;
    k = Math.max(0, Math.min(1, k));
    const keys = spec.keys;
    let i = 0;
    while (i < keys.length - 2 && keys[i + 1][0] <= k * 100) i++;
    const [p0, a] = keys[i], [p1, b] = keys[i + 1];
    let f = p1 > p0 ? (k * 100 - p0) / (p1 - p0) : 0;
    f = f * f * (3 - 2 * f); // smoothstep
    const L = (x, y) => (x == null ? 0 : x) + ((y == null ? 0 : y) - (x == null ? 0 : x)) * f;
    const S = (x, y) => (x == null ? 1 : x) + ((y == null ? 1 : y) - (x == null ? 1 : x)) * f;
    return {
      dx: L(a.dx, b.dx) / 100, dy: L(a.dy, b.dy) / 100,
      rot: L(a.rot, b.rot) * Math.PI / 180,
      sx: S(a.sx, b.sx), sy: S(a.sy, b.sy),
      glow: L(a.glow, b.glow),
      oy: 0.5, mask: [0, 0],
    };
  }

  // --- DOM path: CSS keyframes, generated once
  let styleEl = null;
  function ensureCss() {
    if (styleEl || typeof document === 'undefined') return;
    let css =
      '.tkn-stack{position:relative;display:block}' +
      '.tkn-base{display:block}' +
      // the figure layer: same image, masked to the centre, animated; the
      // base disc below never moves
      '.tkn-fig{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;will-change:transform,filter;' +
        'transform-origin:50% var(--oY,62%);' +
        '-webkit-mask-image:radial-gradient(closest-side,#000 var(--mIn,60%),transparent var(--mOut,78%));' +
        'mask-image:radial-gradient(closest-side,#000 var(--mIn,60%),transparent var(--mOut,78%))}';
    for (const [k, p] of Object.entries(KINDS)) {
      if (!p.dur) continue;
      const s = p.scale || 0, r = (p.rot || 0) * 180 / Math.PI;
      const dx = (p.dx || 0) * 100, dy = (p.dy || 0) * 100;
      css += `@keyframes tkn-${k}{` +
        `0%,100%{transform:translate(0,0) rotate(${-r * 0.7}deg) scale(${1 - s * 0.6},${1 - s});` +
        (p.glow ? 'filter:brightness(1);' : '') + '}' +
        `30%{transform:translate(${(dx * 0.8).toFixed(2)}%,${(-dy * 0.6).toFixed(2)}%) rotate(${(r * 0.4).toFixed(2)}deg) scale(${1 + s * 0.4},${1 + s * 0.7});}` +
        `55%{transform:translate(${dx.toFixed(2)}%,${(-dy).toFixed(2)}%) rotate(${r.toFixed(2)}deg) scale(${1 + s * 0.6},${1 + s});` +
        (p.glow ? `filter:brightness(${1 + p.glow});` : '') + '}' +
        `80%{transform:translate(${(-dx * 0.7).toFixed(2)}%,${(-dy * 0.4).toFixed(2)}%) rotate(${(-r * 0.5).toFixed(2)}deg) scale(${1 + s * 0.2},${1 + s * 0.3});}` +
        '}';
    }
    // one-shot feedback: strike (attack punch) and die (sink+fade) — on the
    // fig layer for strike, whole token for die
    // one-shot attacks, generated from the ATTACKS spec; applied alongside the
    // idle animation on the fig layer (later animation wins while active)
    for (const [a, spec] of Object.entries(ATTACKS)) {
      css += `@keyframes tkn-atk-${a}{`;
      for (const [pct, k] of spec.keys) {
        const dx = (k.dx || 0).toFixed(2), dy = (k.dy || 0).toFixed(2);
        const r = (k.rot || 0).toFixed(2), sx = k.sx == null ? 1 : k.sx, sy = k.sy == null ? 1 : k.sy;
        css += `${pct}%{transform:translate(${dx}%,${dy}%) rotate(${r}deg) scale(${sx},${sy});` +
          `filter:brightness(${(1 + (k.glow || 0)).toFixed(2)})` +
          (k.e ? `;animation-timing-function:${k.e}` : '') + '}';
      }
      css += '}';
    }
    css += '@keyframes tkn-die{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.82) translateY(4%)}}' +
      '.tkn-die{animation:tkn-die .8s ease-in forwards}' +
      // attack effect overlay: pops in at the impact frame (delay set per
      // attack), expands and fades; not masked so it can reach past the
      // figure silhouette
      '.tkn-fx{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;opacity:0;will-change:transform,opacity}' +
      '@keyframes tkn-fx{0%{opacity:0;transform:scale(.5) rotate(-8deg)}16%{opacity:.95}100%{opacity:0;transform:scale(1.3) rotate(5deg)}}';
    styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // mount(el, idOrKind [, meta]) — wraps the <img> in a static stack and adds
  // a masked animated figure copy on top. Idempotent. Returns the kind.
  function mount(el, idOrKind, meta) {
    ensureCss();
    const kind = KINDS[idOrKind] ? idOrKind : classify(idOrKind, meta);
    if (el.dataset.tknMounted === kind) return kind;
    if (kind === 'terrain' || !el.parentNode) return kind;

    const stack = document.createElement('span');
    stack.className = 'tkn-stack';
    el.parentNode.insertBefore(stack, el);
    stack.appendChild(el);            // el becomes the static base layer
    el.classList.add('tkn-base');

    const fig = el.cloneNode(false);
    fig.removeAttribute('id');
    fig.alt = '';
    fig.setAttribute('aria-hidden', 'true');
    fig.className = 'tkn-fig';
    const [mIn, mOut] = KINDS[kind].mask || [60, 78];
    fig.style.setProperty('--mIn', (mIn * 100) + '%');
    fig.style.setProperty('--mOut', (mOut * 100) + '%');
    fig.style.setProperty('--oY', ((KINDS[kind].oy || 0.5) * 100) + '%');
    const ph = -hash(String(idOrKind)) * (KINDS[kind].dur / 1000);
    fig.style.animation = `tkn-${kind} ${KINDS[kind].dur}ms ease-in-out ${ph.toFixed(2)}s infinite`;
    fig._tknIdle = fig.style.animation;
    stack.appendChild(fig);

    el.dataset.tknMounted = kind;
    el._tknStack = stack; el._tknFig = fig;
    el._tknId = idOrKind; el._tknMeta = meta;
    return kind;
  }

  function unmount(el) {
    const stack = el._tknStack;
    if (!stack) return;
    stack.parentNode.insertBefore(el, stack);
    if (el._tknFig) el._tknFig.remove();
    stack.remove();
    el.classList.remove('tkn-base');
    delete el.dataset.tknMounted;
  }

  // one-shot attack on the figure layer. type: 'slash'|'thrust'|'smash'|'shoot'|
  // 'cast'|'rally'|'pounce'; omitted = auto from weapon/kind. Returns duration ms.
  function attack(el, type) {
    const fig = el._tknFig || el;
    if (!type || !ATTACKS[type]) type = attackTypeFor(el._tknId || fig.dataset.tknId || 'x', el._tknMeta);
    const spec = ATTACKS[type];
    const idle = fig._tknIdle || fig.style.animation || '';
    fig.style.animation = (idle ? idle + ', ' : '') + `tkn-atk-${type} ${spec.dur}ms ease-out 0s 1`;
    clearTimeout(fig._tknAtkT);
    fig._tknAtkT = setTimeout(() => { fig.style.animation = idle; }, spec.dur + 30);
    // effect sprite overlay at the impact frame
    const stack = el._tknStack;
    if (stack && spec.fxAt != null) {
      const fx = document.createElement('img');
      fx.className = 'tkn-fx';
      fx.src = (api.fxDir || 'effects/') + 'fx_' + type + '.png';
      fx.alt = ''; fx.setAttribute('aria-hidden', 'true');
      const delay = Math.max(0, spec.fxAt * spec.dur - 120);
      fx.style.animation = `tkn-fx 560ms ease-out ${Math.round(delay)}ms 1 backwards`;
      stack.appendChild(fx);
      setTimeout(() => fx.remove(), delay + 640);
    }
    return spec.dur;
  }
  // backward compat: strike = attack with explicit/auto type
  function strike(el, type) { return attack(el, type); }
  function die(el) {
    const host = el._tknStack || el;
    host.classList.remove('tkn-die'); void host.offsetWidth; host.classList.add('tkn-die');
  }

  const api = { KINDS, ATTACKS, classify, attackTypeFor, mount, unmount, sample, attackSample, attack, strike, die, fxDir: 'effects/' };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TokenIdle = api;
})(typeof window !== 'undefined' ? window : globalThis);
