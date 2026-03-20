/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mp-blue-dark': '#1a365d',
        'mp-blue': '#0d6efd',
        'mp-green': '#198754',
        'mp-green-light': '#d1e7dd',
        'mp-bg': '#f8f9fa',
        'cenabast-blue': '#002f5d', // Typical Cenabast deep blue
        'cenabast-red': '#ee3124',  // Typical Cenabast red
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'mp': '0 1px 3px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
