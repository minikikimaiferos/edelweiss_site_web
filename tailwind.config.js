/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#ffcdf0',
        'pink-dark': '#ff1493',
      },
      fontFamily: {
        'arcade': ['Press Start 2P', 'cursive'],
      },
    },
  },
  plugins: [],
} 