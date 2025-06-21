// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan-custom': "#66D2CE", 
        'dark-cyan': "#2DAA9E",
        'custombg': "#262323",
        'customwhite': "#EAEAEA",
      },
    },
  },
  plugins: [],
}
