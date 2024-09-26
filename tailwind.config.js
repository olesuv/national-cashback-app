/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./constants/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // color theme: https://designs.ai/colors/palette/19
      colors: {
        // dark theme
        darkColor: "#022c43",
        sampleColor: "#053f5e",
        lightColor: "#115173",
        contrastColor: "#ffd700",
        //light heme
        base3: "#fdf6e3",
        base2: "#eee8d5",
        base1: "#93a1a1",
        base00: "#657b83",
        base01: "#586e75",
        // banner color
        officialBg: "#123ecc",
      },
    },
  },
  plugins: [],
};
