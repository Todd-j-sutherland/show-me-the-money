/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10006c",
        secondary: "#746c94",
        accent: "#78f5de",
        background: "#f9fafb",
        text: "#1c1c1c",
        heading: "#17009a",
        border: "#d1cedb",
      },
    },
    fontFamily: {
      heading: ["Montserrat", "Verdana", "sans-serif"],
      body: ['"Open Sans"', "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
