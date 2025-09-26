// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Projekt A: Korrigierte Vite-Konfiguration für Netlify
export default defineConfig({
  plugins: [react()],
  base: '/', // Wichtig für korrekten Asset-Pfad
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
