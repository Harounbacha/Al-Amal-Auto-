/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          800: '#064e3b',
          900: '#022c22',
          950: '#011c16',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(circle at top right, #064e3b 0%, #022c22 40%, #011c16 100%)',
      }
    },
  },
  plugins: [],
}