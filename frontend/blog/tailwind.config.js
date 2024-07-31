/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["'NotoSansM Nerd Font', 'LXGW WenKai Screen'"],
        code: ["'NotoSansM Nerd Font', 'Consolas'"]
      },
    },
  },
  plugins: [],
};
