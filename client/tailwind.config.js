module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        lineAnim: {
          "0%": {
            left: "-40%",
          },
          "50%": {
            left: "20%",
            width: "80%",
          },
          "100%": {
            left: "100%",
            width: "100%",
          },
        },
      },
      animation: {
        lineAnim: "lineAnim 1s ease-in-out infinite",
      },
      colors: {
        twitter: "#1D9BF0",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
};
