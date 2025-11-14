#!/usr/bin/env node

/**
 * Build dist/nuke-theme/ from core/
 * Extracts .theme.css files and creates style.css entry point
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

  // Track for imports
  componentImports.push(importPath);

  console.log(`  ✓ ${isInComponents ? 'components/' : ''}${name}`);
}

// Copy and process core/style.css to create main entry point
const coreStylePath = path.join(CORE_DIR, 'style.css');
if (fs.existsSync(coreStylePath)) {
  const coreStyleContent = fs.readFileSync(coreStylePath, 'utf-8');

  // Remove the @import 'nuke-theme/core.css' line - we'll use relative path
  const lines = coreStyleContent.split('\n');
  const withoutImport = lines.filter(line => !line.trim().startsWith('@import')).join('\n');

  // Build final style.css (main entry point)
  const styleContent = `/* ============================================
   NUKE DESIGN SYSTEM - Main Entry Point
   Import this file in your HTML
   ============================================ */

/* Import core styling logic */
@import './core.css';

/* Component theme imports */
${componentImports.sort().map(imp => `@import '${imp}';`).join('\n')}

/* Design tokens and variables */
${withoutImport}
`;

  fs.writeFileSync(path.join(THEME_DIR, 'style.css'), styleContent);
  console.log(`  ✓ style.css (main entry point)`);
} else {
  console.error('Error: core/style.css not found!');
}

console.log(`\n✅ dist/nuke-theme/ built successfully!`);
console.log(`   ${themeFiles.length} theme files extracted`);
