#!/usr/bin/env node

/**
 * Bundle all core CSS into one file (resolve all @imports)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CORE_DIR = path.join(ROOT, 'core');
const DIST_DIR = path.join(ROOT, 'dist');

function resolveImports(filePath, baseDir = path.dirname(filePath), processed = new Set()) {
  // Prevent circular imports
  const absolutePath = path.resolve(baseDir, filePath);
  if (processed.has(absolutePath)) {
    return '';
  }
  processed.add(absolutePath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`Warning: File not found: ${absolutePath}`);
    return '';
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n');
  let result = [];
  let inMultiLineComment = false;

  for (const line of lines) {
    // Track multi-line comment state
    if (line.includes('/*')) inMultiLineComment = true;
    if (line.includes('*/')) {
      inMultiLineComment = false;
      result.push(line);
      continue;
    }

    const importMatch = line.match(/@import\s+['"](.+?)['"]/);

    if (importMatch && !inMultiLineComment) {
      const importPath = importMatch[1];
      const resolvedPath = path.resolve(path.dirname(absolutePath), importPath);

      // Skip .style.css files (they go to nuke-theme/)
      if (!importPath.includes('.style.css')) {
        result.push(`\n/* Imported from: ${path.relative(CORE_DIR, resolvedPath)} */`);
        result.push(resolveImports(resolvedPath, path.dirname(resolvedPath), processed));
      }
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

console.log('Bundling core.css...');

const coreEntryPoint = path.join(CORE_DIR, 'core.css');
const bundledContent = resolveImports(coreEntryPoint);

// Write bundled file to nuke-theme/
const outputPath = path.join(DIST_DIR, 'nuke-theme', 'core.css');
fs.writeFileSync(outputPath, bundledContent);

console.log(`✅ core.css bundled successfully!`);
console.log(`   Output: dist/nuke-theme/core.css`);
