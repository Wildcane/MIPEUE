/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#5c1d24',
        slate: '#1f2a33',
        pine: '#153d35',
        forest: '#0e3831',
        cream: '#e6e1d5',
      },
      fontFamily: {
        display: ['"Syne"', '"Oswald"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
