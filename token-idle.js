// token-idle.js — subtle idle/feedback motions for MESBG web-game tokens.
// Zero deps. Works two ways:
//   A) <img>/DOM:  TokenIdle.mount(imgEl, 'warg_rider')  → CSS keyframes applied
//   B) canvas:     const m = TokenIdle.sample('cavalry', tMs, seed)
//                  ctx.translate(m.dx*w, m.dy*h); ctx.rotate(m.rot); ctx.scale(m.sx,m.sy)
// Optional metadata: pass a units.json entry to mount() as 3rd arg for exact role.
(function (global) {
  'use strict';

  // kind -> motion recipe (all values in fractions of token size / radians)
  const KINDS = {
    foot:    { scale: 0.016, rot: 0.004, dy: 0.006, dur: 3400 },              // breath
    hero:    { scale: 0.014, rot: 0.006, dy: 0.008, dur: 3600 },              // slower breath
    cavalry: { scale: 0.008, rot: 0.012, dy: 0.028, dur: 1500, dx: 0.006 },   // gait bob
    beast:   { scale: 0.010, rot: 0.014, dy: 0.014, dur: 2600, dx: 0.012 },   // prowling sway
    monster: { scale: 0.026, rot: 0.008, dy: 0.010, dur: 4200 },              // heavy breath
    flyer:   { scale: 0.012, rot: 0.020, dy: 0.040, dur: 2700, dx: 0.008 },   // hover
    wraith:  { scale: 0.020, rot: 0.016, dy: 0.030, dur: 3900, dx: 0.016,
               glow: 0.10 },                                                // drift + flicker
    banner:  { scale: 0.006, rot: 0.026, dy: 0.004, dur: 2800 },              // pole sway
    terrain: {},
  };

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
  function sample(kind, t, seed) {
    const p = KINDS[kind] || KINDS.foot;
    if (!p.dur) return { dx: 0, dy: 0, rot: 0, sx: 1, sy: 1, glow: 0 };
    const ph = (hash(String(seed || 'x')) + t / p.dur) * Math.PI * 2;
    const w1 = Math.sin(ph), w2 = Math.sin(ph * 0.5 + 1.3); // layered = less mechanical
    return {
      dx: (p.dx || 0) * w2,
      dy: -(p.dy || 0) * (0.6 * w1 + 0.4 * w2),
      rot: (p.rot || 0) * (0.7 * w1 + 0.3 * w2),
      sx: 1 + (p.scale || 0) * w1 * 0.6,
      sy: 1 + (p.scale || 0) * w1,
      glow: (p.glow || 0) * (0.5 + 0.5 * w2), // 0..glow brightness swing for wraiths
    };
  }

  // --- DOM path: CSS keyframes, generated once
  let styleEl = null;
  function ensureCss() {
    if (styleEl || typeof document === 'undefined') return;
    let css = '.tkn-anim{display:block;will-change:transform,filter}';
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
    // one-shot feedback: strike (attack punch) and die (sink+fade)
    css += '@keyframes tkn-strike{0%{transform:scale(1)}35%{transform:scale(1.13) rotate(-2deg)}100%{transform:scale(1)}}' +
      '.tkn-strike{animation:tkn-strike .34s ease-out}' +
      '@keyframes tkn-die{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.82) translateY(4%)}}' +
      '.tkn-die{animation:tkn-die .8s ease-in forwards}';
    styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // mount(el, idOrKind [, meta]) — adds looping idle animation. Returns kind.
  function mount(el, idOrKind, meta) {
    ensureCss();
    const kind = KINDS[idOrKind] ? idOrKind : classify(idOrKind, meta);
    if (kind === 'terrain') return kind;
    el.classList.add('tkn-anim', 'tkn-' + kind);
    // desync via negative delay; transform-origin center
    const ph = -hash(String(idOrKind)) * (KINDS[kind].dur / 1000);
    el.style.animation = `tkn-${kind} ${KINDS[kind].dur}ms ease-in-out ${ph.toFixed(2)}s infinite`;
    el.style.transformOrigin = '50% 50%';
    return kind;
  }

  function unmount(el) {
    el.style.animation = '';
    el.className = el.className.replace(/\btkn-\S+/g, '').trim();
  }

  // one-shots (no-op on terrain)
  function strike(el) { el.classList.remove('tkn-strike'); void el.offsetWidth; el.classList.add('tkn-strike'); }
  function die(el) { el.classList.remove('tkn-die'); void el.offsetWidth; el.classList.add('tkn-die'); }

  const api = { KINDS, classify, mount, unmount, sample, strike, die };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TokenIdle = api;
})(typeof window !== 'undefined' ? window : globalThis);
