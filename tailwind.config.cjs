/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#009900",
        secondary: "#0077cc",
      },
      maxWidth: {
        '1/2': '50%',
        '1/4': '25%',
        '2/3': '66.666%',
        '3/4': '75%',
      },
      fontSize: {
        'sm': '13px',
        'base': '16px',
        'xl': '24px',
        '2xl': '44px',
      },
    },
    screens: {
      'sm': '300px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
