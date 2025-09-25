import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Projekt A: Basis Vite-Konfiguration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // EXT-HOOK: Build-Optimierungen für Projekt B-D
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
