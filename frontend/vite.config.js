import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// Force full reload when lib CSS changes
function libReloadPlugin() {
  return {
    name: 'lib-reload',
    handleHotUpdate({ file, server }) {
      if (file.includes('lib/dist/core.css')) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    }
  }
}

export default defineConfig({
  plugins: [svelte(), libReloadPlugin()],
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
  optimizeDeps: {
    // Don't pre-bundle the lib - always use fresh
    exclude: ['@nuke.dev/design-system']
  },
  server: {
    fs: {
      // Allow serving files from lib folder
      allow: ['..']
    },
    watch: {
      // Watch everything including node_modules symlink
      ignored: ['!**/node_modules/@nuke.dev/**', '!**/lib/dist/**']
    }
  }
})
