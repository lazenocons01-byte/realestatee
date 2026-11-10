/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        luxury: {
          bg: '#0a0f1d',
          card: '#121a2f',
          gold: '#d4af37',
          goldLight: '#f5e7a1',
          goldDark: '#aa820a',
          accent: '#c59b27'
        },
        urban: {
          blue: '#0284c7',
          orange: '#ea580c',
          bg: '#f8fafc',
          darkBg: '#0f172a'
        },
        nature: {
          green: '#15803d',
          emerald: '#059669',
          leaf: '#16a34a',
          bg: '#f7fee7',
          earth: '#78350f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'luxury': '0 8px 30px rgba(212, 175, 55, 0.15)',
        'float': '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}

