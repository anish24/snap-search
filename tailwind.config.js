/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // add this if you're using Flowbite
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // for Flowbite React
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    // require("flowbite/plugin"), // uncomment if using Flowbite
  ],
};