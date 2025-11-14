import { watch } from 'fs';
import { spawn } from 'child_process';

let building = false;
let queuedBuild = false;

function rebuild() {
  if (building) {
    queuedBuild = true;
    return;
  }

  building = true;
  console.log('\n🔨 Rebuilding...');

  const build = spawn('bun', ['run', 'build:ts'], { stdio: 'inherit' });

  build.on('close', (code) => {
    if (code === 0) {
      const buildCss = spawn('node', ['.scripts/bundle-core-css.js'], { stdio: 'inherit' });

      buildCss.on('close', (cssCode) => {
        if (cssCode === 0) {
          const buildTheme = spawn('node', ['.scripts/build-theme.js'], { stdio: 'inherit' });

          buildTheme.on('close', (themeCode) => {
            if (themeCode === 0) {
              const cleanup = spawn('find', [
                'dist',
                '-mindepth', '1',
                '-maxdepth', '1',
                '-type', 'd',
                '!', '-name', 'nuke-theme',
                '!', '-name', 'types',
                '-exec', 'rm', '-rf', '{}', '+'
              ], { stdio: 'inherit' });

              cleanup.on('close', () => {
                // Copy to docs/public/
                const copyToDocs = spawn('node', ['.scripts/copy-to-docs.js'], { stdio: 'inherit' });

                copyToDocs.on('close', () => {
                  console.log('✅ Build complete!\n');
                  building = false;

                  if (queuedBuild) {
                    queuedBuild = false;
                    rebuild();
                  }
                });
              });
            }
          });
        }
      });
    }
  });
}

console.log('👀 Watching core/ for changes...');
console.log('Press Ctrl+C to stop watching\n');

// Watch core directory
watch('./core', { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.css') || filename.endsWith('.ts'))) {
    console.log(`📝 Changed: ${filename}`);
    rebuild();
  }
});
