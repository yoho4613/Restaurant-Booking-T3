import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: {
          50: "#489EEE",
          100: "#3493EC",
          200: "#1F88EA",
          300: "#157DDF",
          400: "#1372CA",
          500: "#1164B4",
          600: "#105FA9",
          700: "#0E589C",
          800: "#0D508F",
          900: "#157DDF",
          950: "#0C4982",
          1000: "#0B4275",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
