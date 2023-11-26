/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green:'#3DA764',
        grey:'#F9F9F9',
        'grey-2':'#F2F3F2',
        primary: '#6C63FF',
      }
    },
  },
  plugins: [],
}