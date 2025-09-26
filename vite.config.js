// FILE: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Saubere Vite-Config für Netlify-Deploys
export default defineConfig({
  plugins: [react()],

  // WICHTIG: absolute Pfade, damit index.html auf /assets/... zeigt
  base: '/',

  // Dein lokaler Dev-Proxy (nur für "npm run dev")
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },

  // Build-Ausgabe: alles sicher in /dist/assets/
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
