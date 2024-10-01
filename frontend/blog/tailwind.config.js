/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                main: ["'Monaspace Neon', '苹方-简', 'LXGW WenKai Screen'"],
                code: ["'Monaspace Neon', 'Consolas', 'monospace'"],
            },
            backgroundColor: {
                main: "#1A1823",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
