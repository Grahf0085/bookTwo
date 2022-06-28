/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '811px',
      lg: '1024px',
      xl: '1536px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      rubik: ['Rubik', 'mono'],
    },
    extend: {
      colors: {
        hooplaBackground: '#1d1d1d',
        hooplaLighter: '#4a4a4a',
        linkHover: '#8FCDFF',
      },
    },
  },
  plugins: [],
}
