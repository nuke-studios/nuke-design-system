#!/usr/bin/env node

/**
 * Build dist/nuke-theme/ from core/
 * Flattens all .theme.css files and creates theme.css entry point
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CORE_DIR = path.join(ROOT, 'core');
const THEME_DIR = path.join(ROOT, 'dist', 'nuke-theme');

// Clean and create theme directory
if (fs.existsSync(THEME_DIR)) {
  fs.rmSync(THEME_DIR, { recursive: true });
}
fs.mkdirSync(THEME_DIR, { recursive: true });

// Find all .theme.css files in core/
function findThemeFiles(dir, baseDir = dir) {
  let themeFiles = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      themeFiles = themeFiles.concat(findThemeFiles(fullPath, baseDir));
    } else if (item.endsWith('.theme.css')) {
      themeFiles.push({ fullPath, name: item });
    }
  }

  return themeFiles;
}

// Copy theme files (flattened - no subfolders)
const themeFiles = findThemeFiles(CORE_DIR);
const componentImports = [];

console.log('Building dist/nuke-theme/...');

for (const { fullPath, name } of themeFiles) {
  // Copy to flat structure (no subfolders)
  const destPath = path.join(THEME_DIR, name);
  fs.copyFileSync(fullPath, destPath);

  // Track for imports (skip if it's the main theme.css)
  if (name !== 'theme.css') {
    componentImports.push(`./${name}`);
  }

  console.log(`  ✓ ${name}`);
}

// Copy foundation theme.css from core/
const foundationThemePath = path.join(CORE_DIR, 'theme.css');
if (fs.existsSync(foundationThemePath)) {
  const foundationContent = fs.readFileSync(foundationThemePath, 'utf-8');

  // Remove the @import line (first 2 lines) - we don't want node_modules reference
  const lines = foundationContent.split('\n');
  const withoutImport = lines.slice(2).join('\n');

  fs.writeFileSync(path.join(THEME_DIR, 'foundation.theme.css'), withoutImport);
  console.log(`  ✓ foundation.theme.css (from core/theme.css)`);
}

// Generate main theme.css entry point
const themeContent = `/* ============================================
   NUKE DESIGN SYSTEM - Theme
   Extracted theme files - EDIT FREELY
   ============================================

   This file imports core.css and all theme files.
   Users can edit any .theme.css file to customize the design.

   ============================================ */

/* Import core styling logic */
@import '../core.css';

/* Foundation tokens (colors, spacing, typography) */
@import './foundation.theme.css';

/* Component theme imports */
${componentImports.sort().map(imp => `@import '${imp}';`).join('\n')}
`;

fs.writeFileSync(path.join(THEME_DIR, 'theme.css'), themeContent);
console.log(`  ✓ theme.css (entry point)`);

console.log(`\n✅ dist/nuke-theme/ built successfully!`);
console.log(`   ${themeFiles.length} theme files extracted`);
