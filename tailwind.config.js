/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00008b',
        secondary: '#333'
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite', // Chỉnh tốc độ quay chậm
        'spin-fast': 'spin 1s linear infinite', // Chỉnh tốc độ quay nhanh
      },
    },
  },
  plugins: [],
}

