/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Somes times you need to disable preflight
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "prompt":"'Prompt', serif",
      },
      colors: {
        "gray": {
          "1": "#F5F5F5",
          "2": "#DEDEDE",
          "3": "#A1A1A1",
          "4": "#484543",
        },
        "black": "#171717",
        "blue": {
          "primary": "#2A86FE",
          "soft": "#F2F8FE"
        },
        "purple": {
          "primary": "#C72AFE",
          "soft": "#FAF1FF"
        },
        "red": {
          "primary": "#FE2A50",
          "soft": "#FFF1F2"
        }
      }
    },
  },
  plugins: [],
}