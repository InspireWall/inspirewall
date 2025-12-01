#!/usr/bin/env node
/**
 * generate-wallpapers-json.js
 *
 * Scans assets/Images and regenerates assets/wallpapers.json. Preserves existing
 * descriptions and alt text when possible. Use this script during development
 * after adding/removing images to keep the manifest in sync for the showcase.
 */
const fs = require('fs').promises;
const path = require('path');

// Prefer a top-level `images/` directory if present; otherwise fall back to `assets/Images/`
let IMAGES_DIR = path.join(__dirname, '..', 'images');
const FALLBACK_IMAGES_DIR = path.join(__dirname, '..', 'assets', 'Images');
const MANIFEST_FILE_ROOT = path.join(__dirname, '..', 'wallpapers.json');
const MANIFEST_FILE_ASSETS = path.join(__dirname, '..', 'assets', 'wallpapers.json');

const DEFAULT_DESCRIPTIONS = [
  'Find focus in quiet moments — daily motivation to keep you going.',
  'Small wins add up — celebrate progress, not perfection.',
  'Create the life you want, one step at a time.',
  'Start strong, stay steady — consistency multiplies results.',
  'Dream, plan, execute — repeat.',
  'Keep going — your future self will thank you.',
  'Consistency beats intensity — build the habit.',
  'Focus on progress, not perfection.'
];

function titleize(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function loadExistingManifest() {
  try {
    // try root first
    const data = await fs.readFile(MANIFEST_FILE_ROOT, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    try {
      const data2 = await fs.readFile(MANIFEST_FILE_ASSETS, 'utf8');
      return JSON.parse(data2);
    } catch (e2) {
      return [];
    }
  }
}

async function writeManifest(entries) {
  const json = JSON.stringify(entries, null, 2) + '\n';
  await fs.writeFile(MANIFEST_FILE_ROOT, json, 'utf8');
  try { await fs.writeFile(MANIFEST_FILE_ASSETS, json, 'utf8'); } catch (e) { /* ignore */ }
}

async function scanImages() {
  try {
    // prefer root images folder if it exists
    try {
      await fs.access(IMAGES_DIR);
    } catch (fallbackErr) {
      // fallback to assets/Images
      IMAGES_DIR = FALLBACK_IMAGES_DIR;
    }
    const files = await fs.readdir(IMAGES_DIR);
    // Keep only image extensions
    return files.filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f)).map(f => f);
  } catch (e) {
    console.error('Failed to scan images directory:', e.message);
    return [];
  }
}

async function main() {
  const existing = await loadExistingManifest();
  const existingMap = new Map();
  existing.forEach(e => {
    const key = path.basename(e.src || '');
    if (key) existingMap.set(key, e);
  });

  const files = await scanImages();
  if (!files.length) {
    console.log('No images found in', IMAGES_DIR);
    return;
  }

  // Shuffle descriptions so we don't assign same desc each run
  const descs = DEFAULT_DESCRIPTIONS.slice();
  for (let i = descs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [descs[i], descs[j]] = [descs[j], descs[i]];
  }

  const entries = files.map((file, idx) => {
    const key = file;
    const existingEntry = existingMap.get(key);
    const src = IMAGES_DIR.includes('assets') ? `assets/Images/${file}` : `images/${file}`;
    const alt = existingEntry?.alt || `InspireWall ${titleize(file)}`;
    const desc = existingEntry?.desc || descs[idx % descs.length] || '';
    return { src, alt, desc };
  });

  await writeManifest(entries);
  console.log(`Generated ${entries.length} entries in ${MANIFEST_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
