/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghibli: {
          emerald: '#059669',
          green: '#10b981',
          gold: '#f59e0b',
          amber: '#d97706',
          sky: '#0284c7',
          dark: '#0f172a',
          card: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
