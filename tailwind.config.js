/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens : {
      'sm' : '600px',
      'md' : '820px',
      'lg' : '1000px'
    }
  },
  variants: {
    extend: {},
  },

  plugins: [],
}
