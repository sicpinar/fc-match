/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Projekt A: Sportliches Farbschema
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        sport: {
          green: '#10b981',
          grass: '#22c55e',
          field: '#16a34a',
        }
      },
      // EXT-HOOK: Erweiterte Theme-Optionen für Projekt B-D
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
