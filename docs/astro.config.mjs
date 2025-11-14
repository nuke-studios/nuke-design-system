import { defineConfig } from 'astro/config';

export default defineConfig({
  outDir: './dist',
  publicDir: './public',
  server: {
    host: true,
    port: 4321
  }
});
