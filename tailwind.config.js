/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Sin esquinas redondeadas ni sombras de plantilla: identidad sobria MiPEUE.
    borderRadius: {
      none: '0',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
    },
    extend: {
      colors: {
        cream: '#EFE8DE',
        'cream-soft': '#F6F2EB',
        sand: '#DCCFBC',
        'sand-deep': '#B8A68A',
        forest: '#13423A',
        'forest-deep': '#0C2B26',
        ink: '#111111',
      },
      fontFamily: {
        sans: ['"Archivo"', 'Helvetica Neue', 'sans-serif'],
        display: ['"Archivo"', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.16em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
