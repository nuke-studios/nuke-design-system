import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './dist',
  publicDir: './public',
  vite: {
    resolve: {
      alias: {
        '@nuke': new URL('../dist/nuke-theme', import.meta.url).pathname
      }
    },
    server: {
      watch: {
        // Use polling for Docker compatibility with symlinks
        usePolling: true
      },
      fs: {
        // Allow serving files from parent directory (for dist/)
        allow: ['..']
      }
    }
  }
});
