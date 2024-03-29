/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url(/images/hero/hero_background.png)',
        mainHomePage: 'url(/images/others/main_bg_homepage.png)',
        collectionCard: 'url(/images/collections/collection_card_bg.jpg)',
        collectionCardActive: 'url(/images/collections/active_bg.jpg)',
        market: 'url(/images/others/background.png)',
        connectHero: 'url(/images/others/connect_hero.png)',
        footer: "url('/images/footer/bottom_footer.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        dark_mild: '#141619',
        dark_heavy: '#0F1112',
        custom_grey: '#464748',
        custom_yellow: '#F9D017',
        custom_yellow_dark: '#3F3A11',
        custom_purple: '#100811',
        custom_gray_light: '#1E1E1E',
        custom_gray_dark: '#41454B',
        custom_gray_outline: '#727272',
        'custom-yellow': '#FFDB1B',
        'custom-yellow-hover': '#e6c518',
        'custom-yellow-active': '#ccaf16',
        'custom-orange': '#DDA003',
        'custom-orange-hover': '#c79003',
        'custom-orange-active': '#b18002',
      },
    },
    fontFamily: {
      btn: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      inter: ['Inter', 'sans-serif'],
      lora: ['Lora', 'serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      play: ['Play', 'sans-serif'],
      josefin: ['Josefin Sans', 'sans-serif'],
      oxygen: ['Oxygen', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
