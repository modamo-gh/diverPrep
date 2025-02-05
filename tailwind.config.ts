import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			animation: {
				fade: "fadeIn 0.5s ease-in-out"
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			},
			fontFamily: {
				insignia: ["Insignia Regular", "sans-serif"]
			},
			keyframes: {
				fade: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" }
				}
			}
		}
	},
	plugins: []
} satisfies Config;
