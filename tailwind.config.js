/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans', sans-serif"],
      },
      colors: {
        white: 'whitesmoke',
        dark: 'rgb(35 35 35)',
        'accent-pink': '#ca718d',
        'accent-blue': '#6099c2',
        'accent-purple': '#8684cf',
        'accent-peach': '#d07f7c',
        'pale-mauve': 'rgb(157 124 190 / 45.5%)',
        'pale-pink': 'rgb(201 155 195 / 45.5%)',
        'pale-blue': 'rgb(148 149 202 / 45.5%)',
        'pale-peach': 'rgb(212 147 137 / 45.5%)',
      },
    },
    plugins: [],
  },
};
