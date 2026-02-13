
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'safaricom-green': '#47B04B',
        'safaricom-red': '#E21F26',
      }
    },
  },
  plugins: [],
}
