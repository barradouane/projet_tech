/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      colors : {
        primary : '#128FD1', 
        secondary : '#015791',
        light : '#DEF3FF'
      },
      screens: {
        'max-850': {'max': '850px'}, 
      },
      fontFamily : {
        trial : [ 'Barlow Condensed', 'sans-serif']
      }
    },
  },
  plugins: [],
}

