/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        "light-sand": "#FCF7E6",
        "white-a": "rgba(255, 255, 255, 0.50)",
        "m-black": "#1E1E1E",
      },
      fontFamily: {
        main: ["Space Grotesk"],
        second: ["Space Mono"],
      },
      screens: {
        391: "391px",
        550: "550px",
        768: "768px",
      },
    },
  },
  plugins: [],
};
