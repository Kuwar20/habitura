/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"], // Specify the paths to your source files
  theme: {
    extend: {
      colors: {
        primary: "#e9dfdf",
        secondary: "#556e6e",
        coolsecondary: "#829c9c",
        darkgreen: "#183939",
        paragraph: "#4b5563",
        lightgreen: "#d4e7af",
        darkestgreen: "#0b2728",
        habit: "#1e4d5b",
      },
      spacing: {
        container: "10rem",
        pagePadding: "1.25rem",
        homepagePadding:"4rem"
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        logo: ["Alex Brush", "cursive"],
        handwritten: ["Playpen Sans", "cursive"],
      },
      opacity: {
        opacityPrimary: "0.5",
      },
    },
    screens: {
      xs: "320px",

      sm: "640px",
      md: "768px",
      lg: "1024px",
      'max-lg':'1170px',
      xl: "1280px",
      '2xl':	'1536px'
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
