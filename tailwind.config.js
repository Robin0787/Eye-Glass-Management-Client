/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryBg": "#ff52c5",
        "primaryText": "#000000",
        "secondary": "#4a5568"
      }
    },
  },
  plugins: [],
}

