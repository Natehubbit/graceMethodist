module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "login-img":
          "url('https://gracemethodistchurch.com/wp-content/uploads/2020/12/zmain-slider-3.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
// https://gracemethodistchurch.com/wp-content/uploads/2020/12/zmain-slider-3.jpg
