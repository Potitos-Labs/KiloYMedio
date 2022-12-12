// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kym1: "#e1aa31",
        kym2: "#d28125",
        // kym3: "#b35213",
        // kym4: "#5f493a",
        // background: "#faf1f0",
        // button: "#d28125",
        // button_hover: "#b35213",
        // header: "#d28125",
      },
      fontFamily: {
        sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
        raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
        satoshiBold: ["SatoshiBold", ...defaultTheme.fontFamily.sans],
      },
    },
    fontSize: {
      xs: "16px", //small
      sm: "20px", //secondary
      base: "24px", //text and big buttons
      lg: "24px", //products
      xl: "55px",
      "2xl": "70px",
      "3xl": "90px", //title
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          "primary-focus": "#00FF00", //cambiar
          "primary-content": "#00FF00", //cambiar
          secondary: "#21cf84",
          "secondary-focus": "#00FF00", //cambiar
          "secondary-content": "#00FF00", //cambiar
          accent: "#ffa755",
          "accent-focus": "#00FF00", //cambiar
          "accent-content": "#f8f3ed",
          neutral: "#212529", //button
          "neutral-focus": "#212529", //button hover
          "neutral-content": "#212529", //button content
          "base-100": "#f8f3ed", //background
          primary: "#f1889f",
          "base-200": "#a6806d",
          "base-300": "#4b4949",
          "base-content": "#212529", //text
          info: "#00FF00", //cambiar
          success: "#00FF00", //cambiar
          warning: "#00FF00", //cambiar
          error: "#00FF00", //cambiar
          stroke: "#4b4949",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "autumn",
  },
};
