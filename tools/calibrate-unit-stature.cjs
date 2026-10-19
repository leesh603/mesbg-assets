#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
// Adapted from the supplied gemini-code-1791945887714.js.
// Calibration runs offline; no Git commands or automatic deployment.

const STATURE_TARGETS = {
  body: {
    'hobbit': 54, 'goblin': 63, 'dwarf': 68, 'orc': 76, 'human': 86, 'elf': 86, 'uruk': 90,
    'large-human': 98, 'large_human': 98, 'hound': 102, 'spider': 106, 'wolf': 116, 'warg': 116,
    'half-troll': 118, 'giant-humanoid': 144, 'eagle': 148, 'great-wolf': 152, 'drake': 170,
    'great-eagle': 172, 'troll': 176, 'great-spider': 186, 'ent': 214, 'fellbeast': 220,
    'balrog': 234, 'dark-lord': 248, 'great-beast': 264, 'dragon': 282, 'giant': 316, 'mumak': 356,
  },
  rider: {
    'hobbit': 27, 'goblin': 32, 'dwarf': 37, 'orc': 39, 'human': 43, 'elf': 43,
    'uruk': 45, 'large-human': 50, 'large_human': 50,
  }
};

const ANATOMICAL_RATIOS = {
  'hobbit':      { hPerTrunkW: 3.10, hPerSqrtArea: 1.72, harmonizeWeight: 0.34 },
  'goblin':      { hPerTrunkW: 3.25, hPerSqrtArea: 1.76, harmonizeWeight: 0.32 },
  'dwarf':       { hPerTrunkW: 2.85, hPerSqrtArea: 1.62, harmonizeWeight: 0.36 },
  'orc':         { hPerTrunkW: 3.20, hPerSqrtArea: 1.74, harmonizeWeight: 0.34 },
  'human':       { hPerTrunkW: 3.55, hPerSqrtArea: 1.84, harmonizeWeight: 0.35 },
  'elf':         { hPerTrunkW: 3.70, hPerSqrtArea: 1.88, harmonizeWeight: 0.34 },
  'uruk':        { hPerTrunkW: 3.35, hPerSqrtArea: 1.78, harmonizeWeight: 0.34 },
  'large-human': { hPerTrunkW: 3.45, hPerSqrtArea: 1.80, harmonizeWeight: 0.34 },
  'large_human': { hPerTrunkW: 3.45, hPerSqrtArea: 1.80, harmonizeWeight: 0.34 },
};

// Species and reviewed anatomy own stature; names and hero status never multiply it.
const HERO_PHYSIQUE_BOOST = Object.freeze({});

function paethPredictor(a, b, c) {
  const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
}

function decodePNG(buffer) {
  if (buffer.length < 33 || buffer[0] !== 0x89 || buffer[1] !== 0x50) throw new Error('Invalid PNG');
  let offset = 8, width = 0, height = 0, bitDepth = 8, colorType = 6, palette = null, trns = null;
  const idatChunks = [];
  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8, dataEnd = dataStart + length;
    if (dataEnd > buffer.length) break;
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(dataStart);
      height = buffer.readUInt32BE(dataStart + 4);
      bitDepth = buffer[dataStart + 8];
      colorType = buffer[dataStart + 9];
    } else if (type === 'PLTE') palette = buffer.subarray(dataStart, dataEnd);
    else if (type === 'tRNS') trns = buffer.subarray(dataStart, dataEnd);
    else if (type === 'IDAT') idatChunks.push(buffer.subarray(dataStart, dataEnd));
    else if (type === 'IEND') break;
    offset = dataEnd + 4;
  }
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : 1;
  const bytesPerChannel = bitDepth === 16 ? 2 : 1;
  const bpp = Math.max(1, Math.ceil((channels * bitDepth) / 8));
  const rowBytes = Math.ceil((width * channels * bitDepth) / 8);
  const unfiltered = new Uint8Array(height * rowBytes);
  let inPos = 0;
  for (let y = 0; y < height; y++) {
    const f = raw[inPos++], rowOut = y * rowBytes, prevOut = (y - 1) * rowBytes;
    for (let i = 0; i < rowBytes; i++) {
      const x = raw[inPos++] || 0;
      const a = i >= bpp ? unfiltered[rowOut + i - bpp] : 0;
      const b = y > 0 ? unfiltered[prevOut + i] : 0;
      const c = (y > 0 && i >= bpp) ? unfiltered[prevOut + i - bpp] : 0;
      unfiltered[rowOut + i] = (f === 1 ? x + a : f === 2 ? x + b : f === 3 ? x + ((a + b) >> 1) : f === 4 ? x + paethPredictor(a, b, c) : x) & 0xff;
    }
  }
  const rgba = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      if (colorType === 6) {
        const s = rowStart + x * 4 * bytesPerChannel;
        rgba[out] = unfiltered[s]; rgba[out + 1] = unfiltered[s + bytesPerChannel];
        rgba[out + 2] = unfiltered[s + 2 * bytesPerChannel]; rgba[out + 3] = unfiltered[s + 3 * bytesPerChannel];
      } else if (colorType === 2) {
        const s = rowStart + x * 3 * bytesPerChannel;
        rgba[out] = unfiltered[s]; rgba[out + 1] = unfiltered[s + bytesPerChannel];
        rgba[out + 2] = unfiltered[s + 2 * bytesPerChannel]; rgba[out + 3] = 255;
      } else if (colorType === 4) {
        const s = rowStart + x * 2 * bytesPerChannel, l = unfiltered[s];
        rgba[out] = l; rgba[out + 1] = l; rgba[out + 2] = l; rgba[out + 3] = unfiltered[s + bytesPerChannel];
      } else if (colorType === 3 && palette) {
        const idx = bitDepth === 8 ? unfiltered[rowStart + x] : (unfiltered[rowStart + (x >> 1)] >> ((x & 1) ? 0 : 4)) & 0x0f;
        rgba[out] = palette[idx * 3] || 0; rgba[out + 1] = palette[idx * 3 + 1] || 0;
        rgba[out + 2] = palette[idx * 3 + 2] || 0; rgba[out + 3] = (trns && idx < trns.length) ? trns[idx] : 255;
      } else {
        const l = unfiltered[rowStart + x * bytesPerChannel];
        rgba[out] = l; rgba[out + 1] = l; rgba[out + 2] = l; rgba[out + 3] = 255;
      }
    }
  }
  return { width, height, rgba };
}

function analyzeUnitAnatomy(img, bodyClass = 'human', mode = 'body') {
  const G = 128, { width: W, height: H, rgba } = img;
  const mask = new Uint8Array(G * G), hRun = new Uint8Array(G * G), vRun = new Uint8Array(G * G), bodyMask = new Uint8Array(G * G), dist = new Uint8Array(G * G);
  let rawMinY = G, rawMaxY = 0, rawMinX = G, rawMaxX = 0;

  for (let gy = 0; gy < G; gy++) {
    const sy0 = Math.floor((gy * H) / G), sy1 = Math.max(sy0 + 1, Math.floor(((gy + 1) * H) / G));
    const isBot = gy >= Math.floor(G * 0.82);
    for (let gx = 0; gx < G; gx++) {
      const sx0 = Math.floor((gx * W) / G), sx1 = Math.max(sx0 + 1, Math.floor(((gx + 1) * W) / G));
      let maxA = 0, sum = 0, cnt = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const i = (sy * W + sx) * 4, a = rgba[i + 3];
          if (a > maxA) maxA = a;
          if (a >= 48) { sum += rgba[i] + rgba[i + 1] + rgba[i + 2]; cnt++; }
        }
      }
      if (maxA >= 60 && cnt > 0 && !(isBot && maxA < 150 && (sum / (3 * cnt)) < 36)) {
        mask[gy * G + gx] = 1;
        if (gy < rawMinY) rawMinY = gy; if (gy > rawMaxY) rawMaxY = gy;
        if (gx < rawMinX) rawMinX = gx; if (gx > rawMaxX) rawMaxX = gx;
      }
    }
  }
  if (rawMinY >= rawMaxY) return { top: 0.12, bottom: 0.90, left: 0.38, right: 0.62, centerX: 0.5, centerY: 0.51, rawTop: 0.12, rawBottom: 0.90 };

  for (let y = 0; y < G; y++) {
    for (let x = 0; x < G;) {
      if (!mask[y * G + x]) { x++; continue; }
      let e = x; while (e < G && mask[y * G + e]) e++;
      for (let k = x; k < e; k++) hRun[y * G + k] = e - x;
      x = e;
    }
  }
  for (let x = 0; x < G; x++) {
    for (let y = 0; y < G;) {
      if (!mask[y * G + x]) { y++; continue; }
      let e = y; while (e < G && mask[e * G + x]) e++;
      for (let k = y; k < e; k++) vRun[k * G + x] = e - y;
      y = e;
    }
  }
  for (let i = 0; i < G * G; i++) if (mask[i] && hRun[i] > 3 && vRun[i] > 2) bodyMask[i] = 1;

  let bestScore = -1, coreX = Math.round((rawMinX + rawMaxX) / 2), coreY = Math.round((rawMinY + rawMaxY) / 2);
  for (let y = 1; y < G - 1; y++) {
    for (let x = 1; x < G - 1; x++) {
      if (!bodyMask[y * G + x]) continue;
      let r = 1;
      while (r < 32 && y - r >= 0 && y + r < G && x - r >= 0 && x + r < G) {
        let ok = true;
        for (let d = -r; d <= r && ok; d++) {
          if (!bodyMask[(y + d) * G + (x - r)] || !bodyMask[(y + d) * G + (x + r)] || !bodyMask[(y - r) * G + (x + d)] || !bodyMask[(y + r) * G + (x + d)]) ok = false;
        }
        if (!ok) break;
        r++;
      }
      dist[y * G + x] = r;
      if (y >= rawMinY && y <= Math.min(rawMaxY, Math.floor(G * 0.80))) {
        const s = (r * r) * (1 - 0.35 * Math.abs(y / G - 0.54)) * (1 - 0.25 * Math.abs(x / G - 0.5));
        if (s > bestScore) { bestScore = s; coreX = x; coreY = y; }
      }
    }
  }

  function getRowSeg(y, refX, slack) {
    if (y < 0 || y >= G) return null;
    let best = null, bestW = 0;
    for (let x = 0; x < G;) {
      if (!bodyMask[y * G + x]) { x++; continue; }
      let e = x; while (e < G && (bodyMask[y * G + e] || (e + 1 < G && bodyMask[y * G + e + 1]))) e++;
      const w = e - x, c = 0.5 * (x + e - 1), d = refX < x ? x - refX : (refX > e - 1 ? refX - (e - 1) : 0);
      if (d <= slack && (w / (1 + 0.15 * d)) > bestW) { bestW = w / (1 + 0.15 * d); best = { width: w, center: c }; }
      x = e;
    }
    return best;
  }

  function scanUpCrown(startY, startX, trunkW) {
    const minHeadW = Math.max(5, Math.min(10, Math.round(trunkW * 0.26))), maxBannerW = Math.max(trunkW * 1.15, 36);
    let topY = startY, trackX = startX;
    for (let y = startY; y >= rawMinY;) {
      const seg = getRowSeg(y, trackX, 7);
      if (seg && seg.width >= minHeadW && Math.abs(seg.center - trackX) <= 10) {
        topY = y; trackX = 0.72 * trackX + 0.28 * seg.center; y--; continue;
      }
      let bridged = false;
      for (let lk = 1; lk <= 4 && (y - lk) >= rawMinY; lk++) {
        const ab = getRowSeg(y - lk, trackX, 6);
        if (ab && ab.width >= minHeadW && ab.width <= maxBannerW && Math.abs(ab.center - trackX) <= 7) {
          topY = y - lk; trackX = 0.75 * trackX + 0.25 * ab.center; y = y - lk - 1; bridged = true; break;
        }
      }
      if (!bridged) break;
    }
    for (let cap = 1; cap <= 2 && (topY - 1) >= rawMinY; cap++) {
      const cy = topY - 1, cx = Math.round(trackX);
      if (mask[cy * G + cx] && hRun[cy * G + cx] >= 3 && hRun[cy * G + cx] <= minHeadW + 2) {
        if (!((cy - 3 >= 0) && mask[(cy - 3) * G + cx] && hRun[(cy - 3) * G + cx] <= 5)) topY = cy; else break;
      } else break;
    }
    return topY;
  }

  if (mode === 'rider') {
    const rawSpan = Math.max(16, rawMaxY - rawMinY);
    let rCoreX = coreX, rCoreY = Math.min(coreY, rawMinY + Math.floor(rawSpan * 0.32)), bScore = -1;
    for (let y = rawMinY + Math.floor(rawSpan * 0.08); y <= rawMinY + Math.floor(rawSpan * 0.48); y++) {
      for (let x = Math.max(0, coreX - 28); x <= Math.min(G - 1, coreX + 28); x++) {
        const d = dist[y * G + x];
        if (d >= 2 && (d * d) * (1 - 0.012 * Math.abs(x - coreX)) > bScore) {
          bScore = (d * d) * (1 - 0.012 * Math.abs(x - coreX)); rCoreX = x; rCoreY = y;
        }
      }
    }
    const rWidths = [];
    for (let y = Math.max(0, rCoreY - 6); y <= Math.min(G - 1, rCoreY + 8); y++) {
      const s = getRowSeg(y, rCoreX, 8); if (s && s.width >= 6) rWidths.push(s.width);
    }
    rWidths.sort((a, b) => a - b);
    const rTrunkW = rWidths.length ? rWidths[Math.floor(rWidths.length * 0.45)] : 18;
    const riderTopY = scanUpCrown(rCoreY, rCoreX, rTrunkW);
    let mountBotY = coreY;
    for (let y = coreY; y <= rawMaxY; y++) {
      let solid = 0;
      for (let x = Math.max(0, coreX - 42); x <= Math.min(G - 1, coreX + 42); x++) if (mask[y * G + x] && vRun[y * G + x] >= 4) solid++;
      if (solid >= 4) mountBotY = y;
    }
    const rTop = Math.max(0.02, (riderTopY - 0.5) / G), mBot = Math.min(0.98, (mountBotY + 0.5) / G);
    const fullSpan = Math.max(0.35, mBot - rTop), rTrunkNorm = rTrunkW / G;
    const sFull = 0.345 * fullSpan, sTorso = Math.max(0.82 * sFull, Math.min(1.18 * sFull, 1.75 * rTrunkNorm));
    const pBot = Math.min(mBot - 0.05, rTop + (0.72 * sFull + 0.28 * sTorso));
    const cX = Number((coreX / G).toFixed(4)), cY = Number((0.46 * rTop + 0.54 * mBot).toFixed(4));
    const hW = Math.max(0.06, 0.5 * rTrunkNorm);
    return { top: Number(rTop.toFixed(4)), bottom: Number(pBot.toFixed(4)), left: Number(Math.max(0.01, cX - hW).toFixed(4)), right: Number(Math.min(0.99, cX + hW).toFixed(4)), centerX: cX, centerY: cY, rawTop: Number((rawMinY / G).toFixed(4)), rawBottom: Number((rawMaxY / G).toFixed(4)) };
  }

  const tWidths = [];
  const band = Math.max(5, Math.floor((rawMaxY - rawMinY) * 0.14));
  for (let y = Math.max(rawMinY, coreY - band); y <= Math.min(rawMaxY, coreY + band); y++) {
    const s = getRowSeg(y, coreX, 10); if (s && s.width >= 6) tWidths.push(s.width);
  }
  tWidths.sort((a, b) => a - b);
  const trunkW = tWidths.length ? tWidths[Math.floor(tWidths.length * 0.40)] : 18;
  const bodyTopY = scanUpCrown(coreY, coreX, trunkW);
  const corrW = Math.max(16, Math.round(trunkW * 1.15));
  let bodyBotY = coreY;
  for (let y = coreY; y <= rawMaxY; y++) {
    let fp = 0;
    for (let x = Math.max(0, coreX - corrW); x <= Math.min(G - 1, coreX + corrW); x++) if (bodyMask[y * G + x] && vRun[y * G + x] >= 5) fp++;
    if (fp >= 4) bodyBotY = y;
  }
  let corePx = 0, wX = 0, wSum = 0;
  for (let y = bodyTopY; y <= bodyBotY; y++) {
    for (let x = Math.max(0, coreX - corrW); x <= Math.min(G - 1, coreX + corrW); x++) {
      if (bodyMask[y * G + x]) { const w = 1 + dist[y * G + x]; corePx++; wX += x * w; wSum += w; }
    }
  }
  let bTop = Math.max(0.02, (bodyTopY - 0.5) / G), bBot = Math.min(0.98, (bodyBotY + 0.5) / G);
  const mSpan = Math.max(0.25, bBot - bTop), tNorm = trunkW / G, aNorm = corePx / (G * G);
  const spec = ANATOMICAL_RATIOS[bodyClass];
  if (spec) {
    const bulk = 0.55 * (spec.hPerSqrtArea * Math.sqrt(aNorm)) + 0.45 * (spec.hPerTrunkW * tNorm);
    const eff = (1 - spec.harmonizeWeight) * mSpan + spec.harmonizeWeight * Math.max(0.80 * mSpan, Math.min(1.24 * mSpan, bulk));
    const mid = 0.5 * (bTop + bBot);
    bTop = Math.max(0.01, mid - 0.5 * eff); bBot = Math.min(0.99, bTop + eff);
  }
  const cX = Number((wSum > 0 ? (wX / wSum) / G : coreX / G).toFixed(4)), cY = Number((0.5 * (bTop + bBot)).toFixed(4));
  const hW = Math.max(0.06, 0.5 * tNorm);
  return { top: Number(bTop.toFixed(4)), bottom: Number(bBot.toFixed(4)), left: Number(Math.max(0.01, cX - hW).toFixed(4)), right: Number(Math.min(0.99, cX + hW).toFixed(4)), centerX: cX, centerY: cY, rawTop: Number((rawMinY / G).toFixed(4)), rawBottom: Number((rawMaxY / G).toFixed(4)) };
}

const GIANT_CLASSES = new Set(['fellbeast', 'mumak', 'dragon', 'drake', 'balrog', 'ent', 'troll', 'half-troll', 'eagle', 'great-eagle', 'spider', 'great-spider', 'great-beast', 'giant', 'dark-lord', 'giant-humanoid']);

function resolveUnitClassAndTarget(unitId, auditEntry, rosterMeta) {
  let bodyClass = (auditEntry && auditEntry.bodyClass) || (rosterMeta && rosterMeta.race) || 'human';
  let mode = (auditEntry && auditEntry.reference) || 'body';
  const reviewedMode = auditEntry && ['body', 'rider'].includes(auditEntry.reference);
  if (reviewedMode) mode = auditEntry.reference;
  else if (GIANT_CLASSES.has(bodyClass)) mode = 'body';
  else if (rosterMeta && (rosterMeta.mount === true || rosterMeta.mounted === true || rosterMeta.role === 'cavalry')) mode = 'rider';
  else if (/(_mounted|_rider|_cavalry|_kataphrakt|_outrider|_knights?_of_|morgul_knight|rohan_royal_guard_mounted|warg_rider)/i.test(unitId) && !/(_foot|fellbeast|mumak|chariot)/i.test(unitId)) mode = 'rider';
  if (/^sauron/i.test(unitId) && (bodyClass === 'large-human' || bodyClass === 'large_human' || bodyClass === 'human')) { bodyClass = 'giant-humanoid'; mode = 'body'; }
  const modeTable = STATURE_TARGETS[mode] || STATURE_TARGETS.body;
  let refSize = modeTable[bodyClass] || (mode === 'rider' ? 43 : 86);
  return { bodyClass, mode, worldReferenceSize: refSize };
}

function calibrateUnit(u, targets, riderTargets, buffer) {
  const sourceSHA256 = crypto.createHash('sha256').update(buffer).digest('hex');
  if (sourceSHA256 !== u.sourceSHA256) throw Error('Changed source requires anatomical review: ' + u.id);
  // Keep a stable reviewed reference so repeated runs never accumulate changes.
  const prior = u.statureCalibration?.reviewedReference || {
    bodyClass: u.bodyClass, reference: u.reference, top: u.top, bottom: u.bottom,
    worldReferenceSize: u.worldReferenceSize, sourceSHA256
  };
  if (prior.sourceSHA256 !== sourceSHA256) throw Error('Stale reviewed reference: ' + u.id);
  const img = decodePNG(buffer);
  if (img.width !== u.sourceWidth || img.height !== u.sourceHeight) throw Error('Incorrect source dimensions: ' + u.id);
  const resolved = resolveUnitClassAndTarget(u.id, prior, null);
  const candidate = analyzeUnitAnatomy(img, resolved.bodyClass, resolved.mode);
  const spanRatio = (candidate.bottom - candidate.top) / (prior.bottom - prior.top);
  const humanoid = !!ANATOMICAL_RATIOS[prior.bodyClass];
  // Existing creature/rider measurements and unique species remain explicit.
  // Automatic silhouettes cannot distinguish wings, flags, cloaks or riders.
  // A unit pinned by a visual review keeps its reviewed landmarks (art changes, hand-measured silhouettes).
  const pinned = u.statureCalibration?.pinned === true;
  const useCandidate = humanoid && !pinned && resolved.mode === prior.reference &&
    spanRatio >= .8 && spanRatio <= 1.25 &&
    !(prior.top >= .5 && candidate.top < prior.top) &&
    Math.abs(candidate.top - prior.top) <= .10 && Math.abs(candidate.bottom - prior.bottom) <= .10;
  const table = STATURE_TARGETS[prior.reference];
  const oldTarget = prior.reference === 'rider' ? riderTargets[prior.riderBodyClass || prior.bodyClass] : targets[prior.bodyClass];
  // A visually pinned profile owns its explicit size as well as its landmarks.
  // Name-based physique boosts must not enlarge a reviewed five-head figure again.
  const useTarget = !pinned && table && Object.hasOwn(table, prior.bodyClass) &&
    resolved.mode === prior.reference && prior.worldReferenceSize === oldTarget;
  return {
    ...u, bodyClass: prior.bodyClass, reference: prior.reference, referenceAxis: 'height',
    top: useCandidate ? candidate.top : prior.top,
    bottom: useCandidate ? candidate.bottom : prior.bottom,
    worldReferenceSize: useTarget ? resolved.worldReferenceSize : prior.worldReferenceSize,
    // Deliberately preserve the separately reviewed torso/rider/mount centres.
    centerX: u.centerX, centerY: u.centerY,
    statureCalibration: {
      method: 'argon-anatomical-20261014', reviewedReference: prior,
      candidate: { top: candidate.top, bottom: candidate.bottom },
      ...(pinned ? { pinned: true } : {}),
      applied: useCandidate ? 'anatomical-candidate' : 'reviewed-landmarks',
      reason: pinned ? 'pinned-by-visual-review' : useCandidate ? 'candidate-agrees-with-reviewed-anatomy' :
        !humanoid ? 'explicit-creature-or-vehicle-anatomy' :
        resolved.mode !== prior.reference ? 'preserve-reviewed-rider-reference' : 'automatic-landmark-outlier'
    }
  };
}

function runCalibration(repoRoot, write = false) {
  repoRoot = path.resolve(repoRoot);
  const auditPath = path.join(repoRoot, 'docs', 'unit-art-audit.json');
  const gamePath = path.join(repoRoot, 'src', 'game.js');
  const data = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
  const targets = data.statureCalibration?.reviewedTargets || data.targets;
  const riderTargets = data.measurementPolicy.riderTargets;
  const ids = new Set();
  const units = data.units.map(u => {
    if (ids.has(u.id)) throw Error('Duplicate unit: ' + u.id);
    ids.add(u.id);
    const filename = path.resolve(repoRoot, 'assets', 'mesbg', u.file);
    if (!filename.startsWith(path.join(repoRoot, 'assets', 'mesbg') + path.sep)) throw Error('Invalid token path: ' + u.id);
    return calibrateUnit(u, targets, riderTargets, fs.readFileSync(filename));
  });
  const profiles = Object.fromEntries(units.map(u => [u.id, [u.bodyClass, u.top, u.bottom, u.centerX, u.centerY, u.worldReferenceSize, u.reference]]));
  const troopPath = path.join(repoRoot, 'data', 'troop-new-units.json');
  if (fs.existsSync(troopPath)) for (const troop of JSON.parse(fs.readFileSync(troopPath, 'utf8'))) profiles[troop.id] = troop.artProfile;
  const source = fs.readFileSync(gamePath, 'utf8'), anchor = 'const UNIT_ART_PROFILES = ';
  const start = source.indexOf(anchor), end = source.indexOf(';', start);
  if (start < 0 || end < start || source.indexOf(anchor, start + anchor.length) >= 0) throw Error('Missing or duplicate profile marker');
  const next = source.slice(0, start) + anchor + JSON.stringify(profiles) + source.slice(end);
  new (require('node:vm').Script)(next);
  const applied = units.filter(u => u.statureCalibration.applied === 'anatomical-candidate').length;
  if (write) {
    data.units = units;
    data.targets = { ...targets, ...STATURE_TARGETS.body };
    data.statureCalibration = { source: 'gemini-code-1791945887714.js', reviewedTargets: targets, applied, retained: units.length - applied,
      policy: 'Bounded anatomical candidates; explicit creature/rider/species references and separately reviewed centres preserved.' };
    data.reviewVersion = 'argon-anatomical-20261014-v1';
    fs.writeFileSync(auditPath, JSON.stringify(data, null, 2) + '\n');
    fs.writeFileSync(gamePath, next);
  }
  console.log((write ? 'Applied' : 'Preview') + ': ' + units.length + ' profiles; ' + applied + ' anatomical candidates; ' +
    (units.length - applied) + ' reviewed landmark fallbacks. Centres preserved.');
  return units;
}

module.exports = { STATURE_TARGETS, decodePNG, analyzeUnitAnatomy, resolveUnitClassAndTarget, calibrateUnit, runCalibration };
if (require.main === module) runCalibration(path.join(__dirname, '..'), process.argv.includes('--write'));

