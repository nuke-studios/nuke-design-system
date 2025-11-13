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

// Create components directory
const componentsDir = path.join(THEME_DIR, 'components');
fs.mkdirSync(componentsDir, { recursive: true });

// Copy theme files (preserve components folder structure)
const themeFiles = findThemeFiles(CORE_DIR);
const componentImports = [];

console.log('Building dist/nuke-theme/...');

for (const { fullPath, name } of themeFiles) {
  // Check if file is in components folder
  const relativePath = path.relative(CORE_DIR, fullPath);
  const isInComponents = relativePath.startsWith('components/');

  let destPath;
  let importPath;

  if (isInComponents) {
    // Keep in components/ folder
    destPath = path.join(componentsDir, name);
    importPath = `./components/${name}`;
  } else {
    // Root level
    destPath = path.join(THEME_DIR, name);
    importPath = `./${name}`;
  }

  fs.copyFileSync(fullPath, destPath);

  // Track for imports (skip if it's the main theme.css)
  if (name !== 'theme.css') {
    componentImports.push(importPath);
  }

  console.log(`  ✓ ${isInComponents ? 'components/' : ''}${name}`);
}

// Copy and process core/theme.css
const coreThemePath = path.join(CORE_DIR, 'theme.css');
if (fs.existsSync(coreThemePath)) {
  const coreThemeContent = fs.readFileSync(coreThemePath, 'utf-8');

  // Remove @import lines - we'll add our own
  const lines = coreThemeContent.split('\n');
  const withoutImports = lines.filter(line => !line.trim().startsWith('@import')).join('\n');

  // Build final theme.css
  const themeContent = `/* ============================================
   NUKE DESIGN SYSTEM - Theme
   Extracted theme files - EDIT FREELY
   ============================================ */

/* Import core styling logic */
@import '../core.css';

/* Component theme imports */
${componentImports.sort().map(imp => `@import '${imp}';`).join('\n')}

${withoutImports}
`;

  fs.writeFileSync(path.join(THEME_DIR, 'theme.css'), themeContent);
  console.log(`  ✓ theme.css (entry point with design tokens)`);
} else {
  console.error('Error: core/theme.css not found!');
}

console.log(`\n✅ dist/nuke-theme/ built successfully!`);
console.log(`   ${themeFiles.length} theme files extracted`);
