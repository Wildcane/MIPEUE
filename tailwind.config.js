/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#124038',
        'forest-deep': '#0b2924',
        'forest-light': '#1c594f',
        cream: '#EFE8DE',
        'cream-warm': '#E5DDD0',
        'cream-card': '#F7F3EC',
        'navy-myth': '#28334A',
        charcoal: '#1C1C1C',
        sand: '#D8C8B8',
        terracotta: '#9E3B24',
        gold: '#C89D54',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
