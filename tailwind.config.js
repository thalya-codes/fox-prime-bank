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
      boxShadow: tokens.boxShadow
    },
  },
  plugins: [],
}

