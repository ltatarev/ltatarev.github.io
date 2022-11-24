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
      },
    },
    plugins: [],
  },
};
