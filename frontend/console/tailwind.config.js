/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login": "url('@/assets/images/login-bg.png')"
      }
    },
  },
  plugins: [],
}

