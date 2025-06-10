// tailwind.config.js
module.exports = {
  content: ["./**/*.html"],
  safelist: ['font-mulish'], // <--- keep this!
  theme: {
    extend: {
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [],
};