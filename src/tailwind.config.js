module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00A884', // or any color you prefer
      },
      backdropBlur: {
        lg: '16px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};