/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'], // Update with the paths to your components
    options: {
      safelist: [
        'bg-green-100',
        'bg-red-100', // Add any other colors used dynamically here
        // other classes you want to protect from being purged
      ],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: "#e9dfdf",
        secondary: "#556e6e",
        coolsecondary: "#829c9c",
        darkgreen: '#183939',
        paragraph: '#4b5563',
        lightgreen: '#d4e7af',
        darkestgreen: '#0b2728',
        habit:'#1e4d5b'
      },
      spacing: {
        container: "10rem",
        pagePadding: "1.25rem"
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        logo: ["Alex Brush", 'cursive'],
        handwritten:["Playpen Sans", 'cursive']
      },
      opacity:{
        opacityPrimary:"0.5"
      }
      // backgroundImage:{
      //   signupBg: 'url("/assets/jason-strull-kqBzDbiVV40-unsplash.jpg")'
      // }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
