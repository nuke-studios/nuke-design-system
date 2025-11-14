import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './dist',
  publicDir: './public',
  server: {
    host: true,
    port: 4321
  },
  vite: {
    server: {
      watch: {
        // Watch public folder for changes (normally ignored)
        ignored: ['!**/public/**']
      }
    }
  }
});
