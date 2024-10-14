/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["'Monaspace Neon', 'LXGW WenKai Screen'"],
				code: ["'ComicShannsMono Nerd Font', 'Maple Mono NF CN'"],
			},
			backgroundColor: {
				main: "#1A1823",
			},
		},
	},
};
