/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        press: ["PressStart", ...defaultTheme.fontFamily.mono],
        crux: ["CodersCrux", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "game-pattern": "url('/images/background.svg')",
      },
      colors: {
        devfest: {
          blue: "#3270eb",
          red: "#cb4538",
          orange: "#e59f38",
        },
      },
      screens: {
        'tall': { 'raw': '(min-height: 640px)' },
      }
    },
  },
  plugins: [],
};
