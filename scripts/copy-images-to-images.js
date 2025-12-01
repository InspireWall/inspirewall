#!/usr/bin/env node
/* copy-images-to-images.js

Copies images from assets/Images into a top-level images/ folder.
Usage: node scripts/copy-images-to-images.js
*/
const fs = require('fs').promises;
const path = require('path');

const srcDir = path.join(__dirname, '..', 'assets', 'Images');
const destDir = path.join(__dirname, '..', 'images');

async function ensureDir(dir) {
  try { await fs.access(dir); } catch (e) { await fs.mkdir(dir, { recursive: true }); }
}

async function copyFiles() {
  await ensureDir(destDir);
  const files = await fs.readdir(srcDir);
  const imageFiles = files.filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f));
  const copies = [];
  for (const f of imageFiles) {
    const src = path.join(srcDir, f);
    const dest = path.join(destDir, f);
    try {
      await fs.copyFile(src, dest);
      copies.push(f);
    } catch (e) {
      console.error('Failed to copy', f, e.message);
    }
  }
  console.log(`Copied ${copies.length} files to ${destDir}`);
}

copyFiles().catch(err => { console.error(err); process.exit(1); });
