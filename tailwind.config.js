/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',       // App directory (for App Router)
    './src/pages/**/*.{js,ts,jsx,tsx}',     // Pages directory (if used)
    './src/components/**/*.{js,ts,jsx,tsx}',// Custom components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#60a5fa', // Adjust as per your brand
        accent: '#facc15',
        ring: '#60a5fa'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
