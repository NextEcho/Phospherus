/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                main: ["'Monaspace Neon', 'LXGW WenKai Screen'"],
                code: ["'Monaspace Neon', 'Consolas', 'monospace'"],
            },
            backgroundColor: {
                main: "#1A1823",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
