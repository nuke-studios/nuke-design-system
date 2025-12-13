import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../lib/dist')
    }
  },
  server: {
    fs: {
      // Allow serving files from lib folder
      allow: ['..']
    },
    watch: {
      // Watch lib/dist for HMR
      ignored: ['!**/lib/dist/**']
    }
  }
})
