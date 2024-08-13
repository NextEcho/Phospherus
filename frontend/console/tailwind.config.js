/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                logo: "url('@/assets/images/logo.png')",
                login: "url('@/assets/images/login-bg.png')",
                nav: "url('@/assets/images/nav-bg.jpg')",
                avatar: "url('@/assets/images/avatar.jpg')",
            },
            fontFamily: {
                main: ["'NotoSansM Nerd Font', 'LXGW WenKai Screen'"],
                code: ["'NotoSansM Nerd Font', 'Consolas'"],
            },
        },
    },
    plugins: [],
};
