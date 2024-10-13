/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                login: "url('@/assets/images/login.jpg')",
                logo: "url('@/assets/images/logo.png')",
                banner: "url('@/assets/images/banner.jpg')",
            },
            fontFamily: {
                main: ["'Monaspace Neon', 'LXGW WenKai'"],
                code: ["'ComicShannsMono Nerd Font', 'monospace'"],
            },
        },
    },
    plugins: [],
};
