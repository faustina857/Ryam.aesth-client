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
        gold: {
          light: '#D4AF5A',
          DEFAULT: '#B8962E',
          dark: '#8B6F1E',
        },
        cream: {
          light: '#FAF9F7',
          DEFAULT: '#F2EDE6',
          dark: '#E8E0D5',
        },
        spa: {
          text: '#1A1A1A',
          muted: '#6B6560',
          border: '#E8E0D5',
          dark: '#0F0E0D',
          surface: '#1C1A18',
        },
      },
      fontFamily: {
        display: ['Bodoni Moda', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}