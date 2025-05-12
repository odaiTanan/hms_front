/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        primary2: "rgb(var(--primary2))",
        background: "rgb(var(--background))",
        tcolor: "var(--tcolor)",
        g: "rgb(var(--g))",
        skin: "rgb(var(--skin))",
      },
      animation: {
        flash: "flash .3s linear",
      },
      keyframes: {
        flash: {
          "0%": { width: "0", height: "0", opacity: "0.7" },
          "100%": { width: "250px", height: "250px", opacity: "0" },
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },

  plugins: [],
};
