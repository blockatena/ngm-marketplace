/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark_mild: '#141619',
        dark_heavy: '#0F1112',
        custom_grey: '#464748',
        custom_yellow: '#F9D017',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      lora: ['Lora', 'serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
    },
  },
  plugins: [],
}
