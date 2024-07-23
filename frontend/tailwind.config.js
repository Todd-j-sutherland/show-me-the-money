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
    animation: {
      spin: "spin 1s linear infinite",
    },
    keyframes: {
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
  },
  plugins: [],
};
