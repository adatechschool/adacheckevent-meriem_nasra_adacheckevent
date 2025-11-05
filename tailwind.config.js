/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Tous tes fichiers JS/TS/JSX/TSX dans src
  ],
  darkMode: 'class', // <--- active le mode dark via classe
  theme: {
    extend: {
      colors: {
        // Tu peux ajouter des couleurs personnalisées si besoin
        primary: "#4f46e5",
        secondary: "#ec4899",
      },
    },
  },
  plugins: [],
};
