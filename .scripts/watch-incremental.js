#!/usr/bin/env node

/**
 * Smart incremental build watcher for development
 * Builds to dist/nuke-theme/ then copies to docs/public/nuke-theme/
 */

import { watch } from 'fs';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CORE_DIR = path.join(ROOT, 'core');
const DIST_THEME = path.join(ROOT, 'dist', 'nuke-theme');
const DOCS_THEME = path.join(ROOT, 'docs', 'src', 'nuke-theme');

let building = false;
let queuedChanges = [];

// Ensure directories exist
function ensureStructure() {
  if (!fs.existsSync(DIST_THEME)) {
    fs.mkdirSync(DIST_THEME, { recursive: true });
  }
  const componentsDir = path.join(DIST_THEME, 'components');
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }
  if (!fs.existsSync(DOCS_THEME)) {
    fs.mkdirSync(DOCS_THEME, { recursive: true });
  }
  const docsComponentsDir = path.join(DOCS_THEME, 'components');
  if (!fs.existsSync(docsComponentsDir)) {
    fs.mkdirSync(docsComponentsDir, { recursive: true });
  }
}

// Copy file from dist to docs/src
function copyToDocs(relPath) {
  const src = path.join(DIST_THEME, relPath);
  const dest = path.join(DOCS_THEME, relPath);

  if (fs.existsSync(src)) {
    // Ensure dest directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const content = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, content);
  }
}

// Copy a single theme file to dist/nuke-theme/components/
function copyThemeFile(filename) {
  const sourcePath = path.join(CORE_DIR, filename);
  const themeFilename = path.basename(filename);
  const destPath = path.join(DIST_THEME, 'components', themeFilename);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    copyToDocs(`components/${themeFilename}`);
  }
}

// Rebuild core.css bundle to dist/nuke-theme/core.css
function rebuildCoreCSS() {
  return new Promise((resolve) => {
    const build = spawn('node', ['.scripts/bundle-core-css.js'], { stdio: 'pipe' });
    build.on('close', (code) => {
      if (code === 0) {
        copyToDocs('core.css');
      }
      resolve();
    });
  });
}

// Rebuild core.js to dist/nuke-theme/core.js
function rebuildCoreJS() {
  return new Promise((resolve) => {
    const build = spawn('bun', ['build', 'core/core.ts', '--outdir', 'dist/nuke-theme', '--format', 'esm'], { stdio: 'pipe' });
    build.on('close', (code) => {
      if (code === 0) {
        copyToDocs('core.js');
      }
      resolve();
    });
  });
}

// Copy style.css (foundation tokens)
function copyStyleCSS() {
  const sourcePath = path.join(CORE_DIR, 'style.css');
  const destPath = path.join(DIST_THEME, 'style.css');

  if (fs.existsSync(sourcePath)) {
    // Read and fix import path for dist
    let content = fs.readFileSync(sourcePath, 'utf-8');
    content = content.replace(/@import\s+['"]nuke-theme\/core\.css['"]/g, "@import './core.css'");

    fs.writeFileSync(destPath, content);
    copyToDocs('style.css');
  }
}

// Process a single file change
async function processChange(filename) {
  console.log(`Changed: ${filename}`);

  // .theme.css files → copy to dist/nuke-theme/components/
  if (filename.endsWith('.theme.css')) {
    copyThemeFile(filename);
  }
  // style.css (foundation) → copy to dist/nuke-theme/
  else if (filename === 'style.css') {
    copyStyleCSS();
  }
  // .core.css files → rebuild core.css bundle
  else if (filename.endsWith('.core.css')) {
    await rebuildCoreCSS();
  }
  // .ts files → rebuild core.js
  else if (filename.endsWith('.ts')) {
    await rebuildCoreJS();
  }
  // Other CSS files (reset.css, animations.css, helpers.css)
  else if (filename.endsWith('.css')) {
    await rebuildCoreCSS();
  }
}

// Handle queued changes
async function processQueue() {
  if (building || queuedChanges.length === 0) {
    return;
  }

  building = true;
  const changes = [...queuedChanges];
  queuedChanges = [];

  for (const change of changes) {
    await processChange(change);
  }

  building = false;

  // Process any new changes that came in while building
  if (queuedChanges.length > 0) {
    processQueue();
  }
}

// Initial build
console.log('🚀 Running initial build...\n');
ensureStructure();

// Run full build first time
const initialBuild = spawn('bun', ['run', 'build:dev'], { stdio: 'inherit' });

initialBuild.on('close', () => {
  console.log('\n👀 Watching core/ for changes...');
  console.log('Press Ctrl+C to stop watching\n');

  // Watch core directory
  watch(CORE_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.css') || filename.endsWith('.ts'))) {
      // Add to queue and process
      queuedChanges.push(filename);
      processQueue();
    }
  });
});
