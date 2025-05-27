/** @type {import('tailwindcss').Config} */
import { tokens } from 'fox-neo-design-system';

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.fontFamily,
      boxShadoxw: tokens.boxShadow['ring-lg'],
      width: {
        'credit-card': '330px',
      },
      height: {
        50: '200px',
        70: '280px',
        84: '336px',
        85: '340px',

      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.rotate-basic-credit-card': {
          transform: 'rotateX(-55deg) rotateY(-5deg) rotateZ(15deg)',
        },
        '.rotate-black-credit-card': {
          transform: 'rotateX(-45deg) rotateY(05deg) rotateZ(25deg)',
        },
      })
    },
  ] ,
}

