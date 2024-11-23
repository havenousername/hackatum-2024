/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '999': '999'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'charcoal-gray': '#2E2E2E',
        'burnt-coral': '#E16449',
        'grayish-brown' : '#4B4545',
        'dark-charcoal' : '#3B3B3B',
        primary: {
          '400': '#EFBBB0',
          '800': '#E16449'
        },
      }
    },
  },
  plugins: [],
}