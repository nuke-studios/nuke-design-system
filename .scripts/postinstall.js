#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
};

// Check if running in CI environment
const isCI = process.env.CI === 'true' ||
             process.env.CONTINUOUS_INTEGRATION === 'true' ||
             process.env.NUKE_SKIP_SETUP === 'true';

if (isCI) {
  console.log(`${colors.gray}Skipping interactive setup (CI environment detected)${colors.reset}`);
  process.exit(0);
}

// Get the project root (where the user's package.json is)
const projectRoot = process.cwd();
const packageRoot = path.resolve(__dirname, '..');
const themeSource = path.join(packageRoot, 'dist/nuke-theme');

// Banner
console.log('');
console.log(`${colors.bright}███╗   ██╗██╗   ██╗██╗  ██╗███████╗${colors.reset}`);
console.log(`${colors.bright}████╗  ██║██║   ██║██║ ██╔╝██╔════╝${colors.reset}`);
console.log(`${colors.bright}██╔██╗ ██║██║   ██║█████╔╝ █████╗  ${colors.reset}`);
console.log(`${colors.bright}██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ${colors.reset}`);
console.log(`${colors.bright}██║ ╚████║╚██████╔╝██║  ██╗███████╗${colors.reset}`);
console.log(`${colors.bright}╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝${colors.reset}`);
console.log(`${colors.gray}         DESIGN SYSTEM${colors.reset}`);
console.log(`${colors.gray}────────────────────────────────────${colors.reset}`);
console.log('');
console.log('Where should we copy the theme folder?');
console.log(`${colors.gray}This folder contains all CSS variables you can customize.${colors.reset}`);
console.log('');

// Check if .nukerc already exists
const nukeRcPath = path.join(projectRoot, '.nukerc');
if (fs.existsSync(nukeRcPath)) {
  const config = JSON.parse(fs.readFileSync(nukeRcPath, 'utf-8'));
  const existingPath = path.join(projectRoot, config.themePath);

  if (fs.existsSync(existingPath)) {
    console.log(`${colors.green}✓ Theme folder already exists at: ${config.themePath}${colors.reset}`);
    console.log('');
    showNextSteps(config.themePath);
    process.exit(0);
  }
}

// Prompt options
console.log(`${colors.bright}[1]${colors.reset} Root directory (./nuke-theme/)         ${colors.gray}← Recommended${colors.reset}`);
console.log(`${colors.bright}[2]${colors.reset} src/styles/nuke-theme/`);
console.log(`${colors.bright}[3]${colors.reset} Custom path (type your own)`);
console.log(`${colors.bright}[4]${colors.reset} Skip (I'll copy it manually later)`);
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`${colors.bright}Your choice [1-4]:${colors.reset} `, (answer) => {
  const choice = answer.trim();

  switch (choice) {
    case '1':
    case '':
      copyTheme('./nuke-theme');
      break;
    case '2':
      copyTheme('./src/styles/nuke-theme');
      break;
    case '3':
      rl.question(`${colors.bright}Enter custom path:${colors.reset} `, (customPath) => {
        copyTheme(customPath.trim());
        rl.close();
      });
      return; // Don't close yet
    case '4':
      skipSetup();
      break;
    default:
      console.log(`${colors.yellow}Invalid choice. Skipping setup.${colors.reset}`);
      skipSetup();
  }

  rl.close();
});

function copyTheme(targetPath) {
  try {
    const fullTargetPath = path.join(projectRoot, targetPath);

    // Show loading animation
    console.log('');
    let dots = 0;
    const loadingInterval = setInterval(() => {
      process.stdout.write(`\r${colors.gray}Copying${'.'.repeat(dots)}${colors.reset}   `);
      dots = (dots + 1) % 4;
    }, 200);

    // Create target directory
    fs.mkdirSync(fullTargetPath, { recursive: true });

    // Copy theme folder recursively
    copyRecursive(themeSource, fullTargetPath);

    // Save config to .nukerc
    const config = { themePath: targetPath };
    fs.writeFileSync(nukeRcPath, JSON.stringify(config, null, 2));

    // Stop loading animation
    clearInterval(loadingInterval);
    process.stdout.write('\r');

    console.log(`${colors.green}${colors.bright}✓ Success!${colors.reset}`);
    console.log(`${colors.green}Theme copied to: ${targetPath}${colors.reset}`);
    console.log('');

    showNextSteps(targetPath);
  } catch (error) {
    console.error(`${colors.yellow}Error copying theme:${colors.reset}`, error.message);
    console.log('');
    console.log(`You can manually copy the theme folder from:`);
    console.log(`  node_modules/@nuke.dev/design-system/dist/nuke-theme/`);
  }
}

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);

    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function skipSetup() {
  console.log('');
  console.log(`${colors.gray}Setup skipped.${colors.reset}`);
  console.log('');
  console.log('To run setup later:');
  console.log(`  ${colors.cyan}npx @nuke.dev/design-system setup${colors.reset}`);
  console.log('');
  console.log('Or manually copy the theme:');
  console.log(`  ${colors.gray}cp -r node_modules/@nuke.dev/design-system/dist/nuke-theme ./nuke-theme${colors.reset}`);
  console.log('');
}

function showNextSteps(themePath) {
  console.log(`${colors.bright}Next steps:${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}1.${colors.reset} Import in your HTML:`);
  console.log('');
  console.log(`   ${colors.cyan}<link rel="stylesheet" href="${themePath}/style.css">${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}2.${colors.reset} Optional: Import web components in your JS/HTML:`);
  console.log('');
  console.log(`   ${colors.cyan}<script type="module" src="node_modules/@nuke.dev/design-system/dist/core.js"></script>${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}3.${colors.reset} Customize your theme:`);
  console.log(`   ${colors.gray}Edit ${themePath}/style.css for design tokens${colors.reset}`);
  console.log(`   ${colors.gray}Edit ${themePath}/components/*.theme.css for individual components${colors.reset}`);
  console.log('');
  console.log(`${colors.gray}Documentation: https://github.com/c-heer/nuke-design-system${colors.reset}`);
  console.log('');
}
