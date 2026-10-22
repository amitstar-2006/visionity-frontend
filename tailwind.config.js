/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./website.html', './sahoo.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'sans-serif'],
        brand: ['"Syncopate"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        oceanbrand: {
          300: '#22f3c8',
          400: '#00e5ff',
          500: '#00b4d8',
          600: '#0077ff',
          700: '#0050b3',
          800: '#00357a',
        },
        iceblue: {
          50: '#020917',
          100: '#061531',
          200: '#102a56',
          300: '#1e4582',
          400: '#6fa3d9',
          800: '#c4ddf7',
          900: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

