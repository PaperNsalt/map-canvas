export default {
  darkMode: "class", // important!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        quicksand: ['"Quicksand"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
