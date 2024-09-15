/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // color theme: https://designs.ai/colors/palette/19
      colors: {
        darkColor: "#022c43",
        sampleColor: "#053f5e",
        lightColor: "#115173",
        contrastColor: "#ffd700",
      },
    },
  },
  plugins: [],
};
