#!/usr/bin/env node
/**
 * Build a minimal, static release from the private development repository.
 * The old public repository/history must NOT be used as the release repository.
 * This script does not change source files or deploy anything.
 *
 * node tools/build-public.js             => .public-site/
 * node tools/build-public.js --audit     => whitelist / size check only
 * node tools/build-public.js --strict    => also fail on missing gallery images
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DEST = path.join(ROOT, '.public-site');
const AUDIT = process.argv.includes('--audit');
const STRICT = process.argv.includes('--strict');

// Deliberate allowlists. Never publish art-src, tokens_painted, archives,
// source code, workers, build scripts, git history, or unreviewed root files.
const PUBLIC_FILES = [
  '.nojekyll', 'index.html', 'gallery.html', 'gallery-preview.html',
  'gallery-preview-runtime.js', 'codex.html', 'token-idle.js',
  'mesbg-stats.js', 'manifest.webmanifest', 'units.json', 'dice.json',
  'favicon-32.png', 'favicon-192.png', 'favicon-512.png',
  'apple-touch-icon.png'
];
const PUBLIC_DIRS = [
  'assets/mesbg', 'tokens', 'backgrounds', 'icons',
  'effects', 'bases', 'relics', 'dice-faces', 'events'
];
const ALLOWED_ASSET_EXT = new Set([
  '.png','.jpg','.jpeg','.webp','.gif','.svg','.avif','.apng',
  '.mp3','.ogg','.wav','.m4a','.aac','.flac','.mp4','.webm',
  '.woff','.woff2','.ttf','.otf','.json'
]);
const MAX_FILE = 100 * 1024 * 1024;
const MAX_SITE = 950 * 1024 * 1024;
const planned = new Map();
let totalBytes = 0;

function safeRel(rel) {
  const normalized = rel.replace(/\\/g, '/');
  if (normalized.startsWith('/') || normalized.includes('../') ||
      normalized === '..' || normalized.includes('\0')) {
    throw Error('Unsafe path: ' + rel);
  }
  return normalized;
}
function addFile(rel, asset) {
  rel = safeRel(rel);
  const abs = path.join(ROOT, rel);
  const stat = fs.lstatSync(abs);
  if (!stat.isFile() || stat.isSymbolicLink()) throw Error('Not a regular file: ' + rel);
  if (asset && !ALLOWED_ASSET_EXT.has(path.extname(rel).toLowerCase())) {
    throw Error('Unexpected asset type (review required): ' + rel);
  }
  if (stat.size > MAX_FILE) throw Error('Exceeds Pages 100MB/file limit: ' + rel);
  planned.set(rel, stat.size);
  totalBytes += stat.size;
}
function walk(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const name = entry.name;
    if (name.startsWith('.')) throw Error('Hidden file in publish tree: ' + rel + '/' + name);
    const child = safeRel(rel + '/' + name);
    if (entry.isSymbolicLink()) throw Error('Symlink in publish tree: ' + child);
    if (entry.isDirectory()) walk(child);
    else if (entry.isFile()) addFile(child, true);
    else throw Error('Unsupported entry: ' + child);
  }
}
for (const rel of PUBLIC_FILES) {
  if (fs.existsSync(path.join(ROOT, rel))) addFile(rel, false);
  else if (rel === 'index.html') throw Error('Missing index.html');
}
for (const rel of PUBLIC_DIRS) walk(rel);
if (!planned.has('index.html')) throw Error('No game entry point');
if (!planned.has('assets/mesbg/fonts/PretendardVariable.woff2')) {
  console.warn('Warning: expected UI font not found; inspect asset checkout.');
}

// Source files and original painted art must never appear in the release.
const blocked = /^(?:src|tools|data|art-src|archive|tokens_painted|dice-faces-painted|lwb-server|lwb-worker|scripts|tests|review|\.github|\.git)(?:\/|$)/;
for (const file of planned.keys()) {
  if (blocked.test(file)) throw Error('Private-only path in release: ' + file);
}

console.log('Public release: ' + planned.size + ' files, ' +
  (totalBytes / 1024 / 1024).toFixed(1) + ' MiB');
if (totalBytes > MAX_SITE) {
  throw Error('Release exceeds 950 MiB guardrail. Optimize/prune assets before deployment.');
}
if (AUDIT) {
  console.log('Audit only: no output or repository changes made.');
  process.exit(0);
}

fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });
for (const rel of planned.keys()) {
  const dst = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(path.join(ROOT, rel), dst);
}

// Keep the publicly used gallery but remove the painted-master toggle.
// This is a release-only transformation; the private gallery remains intact.
const gallery = path.join(DEST, 'gallery.html');
if (fs.existsSync(gallery)) {
  let html = fs.readFileSync(gallery, 'utf8');
  html = html.replace(/<button\b[^>]*\bid="vsw"[^>]*>[\s\S]*?<\/button>/g, '');
  html = html.replace(/tokens_painted\//g, 'tokens/');
  html = html.replace(/dice-faces-painted\//g, 'dice-faces/');
  if (/tokens_painted\/|dice-faces-painted\//.test(html)) {
    throw Error('Gallery still references protected painted masters');
  }
  fs.writeFileSync(gallery, html);
}

// Verify all static gallery artwork resolves within the deployment output.
let missing = [];
if (fs.existsSync(gallery)) {
  const html = fs.readFileSync(gallery, 'utf8');
  for (const hit of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/g)) {
    const url = hit[1].split('?')[0].split('#')[0];
    if (!url || /^(?:https?:|data:|mailto:|javascript:|\/)/i.test(url)) continue;
    const rel = safeRel(decodeURIComponent(url));
    if (!fs.existsSync(path.join(DEST, rel))) missing.push(rel);
  }
}
missing = [...new Set(missing)];
if (missing.length) {
  console.warn('Gallery references missing files (' + missing.length + '): ' +
    missing.slice(0, 12).join(', '));
  if (STRICT) throw Error('Gallery references missing artwork');
}

// Defensive final audit: never smuggle original sources via copied folders.
for (const forbidden of ['art-src', 'tokens_painted', 'dice-faces-painted',
  'src', 'tools', '.git', '.github', 'lwb-worker', 'lwb-server', 'archive']) {
  if (fs.existsSync(path.join(DEST, forbidden))) {
    throw Error('Private directory leaked: ' + forbidden);
  }
}
console.log('Release staged in .public-site/ (NOT published).');
