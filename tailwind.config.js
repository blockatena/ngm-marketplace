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
        custom_purple: '#100811',
        custom_gray_light: '#1E1E1E',
        custom_gray_dark: '#41454B',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      lora: ['Lora', 'serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
