import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './dist',
  publicDir: './public',
  vite: {
    server: {
      fs: {
        // Allow serving files from parent directory (for dist/)
        allow: ['..']
      }
    }
  }
});
