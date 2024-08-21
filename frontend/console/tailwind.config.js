/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                login: "url('@/assets/images/login-bg.png')",
                logo: "url('@/assets/images/logo.png')",
                nav: "url('@/assets/images/nav-bg.jpg')",
                avatar: "url('@/assets/images/avatar.jpg')",
            },
            fontFamily: {
                main: ["'Monaspace Neon', 'LXGW WenKai Screen'"],
                code: ["'Monaspace Neon', 'Consolas', 'monospace'"],
            },
        },
    },
    plugins: [],
};
