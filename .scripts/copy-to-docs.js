#!/usr/bin/env node

/**
 * Copy built files from dist/ to docs/public/ for development
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const DOCS_SRC = path.join(ROOT, 'docs', 'src');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Warning: Source not found: ${src}`);
    return;
  }

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const items = fs.readdirSync(src);
    for (const item of items) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📋 Copying to docs/src/...');

// Copy entire nuke-theme/ folder (contains core.css, core.js, style.css, components/)
copyRecursive(
  path.join(DIST_DIR, 'nuke-theme'),
  path.join(DOCS_SRC, 'nuke-theme')
);
console.log('  ✓ nuke-theme/ (core.css, core.js, style.css, components/)');

console.log('✅ Files copied to docs/src/\n');
