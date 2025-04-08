/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // App directory (for App Router)
    './pages/**/*.{js,ts,jsx,tsx}',     // Pages directory (if used)
    './components/**/*.{js,ts,jsx,tsx}',// Custom components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
