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
        primary: {
          '400': '#EFBBB0',
          '800': '#E16449'
        },
      }
    },
  },
  plugins: [],
}