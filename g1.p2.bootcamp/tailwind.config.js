/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        128: "28rem",
        132: "38rem",
      },
      width: {
        82: "21rem",
        120: "44em",
        132: "58rem",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
