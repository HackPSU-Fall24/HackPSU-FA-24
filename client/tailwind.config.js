/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polynesian-blue': '#004b91ff',
        'alice-blue': '#f6fbffff',
        'bright-pink-crayola': '#ea526fff',
        'smoky-black': '#070600ff',
        'celestial-blue': '#279af1ff',
      },
      
    },
  },
  plugins: [],
}
