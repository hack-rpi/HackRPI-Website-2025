import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Helvetica", "Arial", "sans-serif"],
		},
		extend: {
			colors: {
				"hackrpi-primary-blue": "#74b7ef",
				"hackrpi-primary-dark-green": "#264e33",
				"hackrpi-primary-light-green": "#88b63a",
				"hackrpi-secondary-grey": "#efefef",
				"hackrpi-secondary-light-blue": "#4a6277",
				"hackrpi-secondary-dark-blue": "#27303b",
				"hackrpi-secondary-dark-green": "#27303b",
				"hackrpi-secondary-light-green": "#6d8740",
				"hackrpi-secondary-yellow": "#edd559",
				"subway-red": "#ef3a42",
				"subway-blue": "#0058a9",
				"subway-green": "#00a65c",
				"subway-yellow": "#f8a13a",
				"subway-purple": "#b43c96",
				"retro-light-purple": "#9e40ee", //for retro theme
				"retro-dark-purple": "#733dbe", //for retro theme
				"retro-orange": "#e39036", //for retro theme
				"retro-yellow": "#e9bc59", //for retro theme
				"retro-pink": "#d5345d", //for retro theme
				"retro-dark-blue": "#292333",//for retro theme
				gold: "#ffd700",
				silver: "#C0C0C0",
				bronze: "#cd7f32",
			},
			screens: {
				desktop: "860px",
				xs: "475px",
				"2xs": "375px",
			},
			backgroundImage: {
				"radial-yellow-200": "radial-gradient(circle, #fef08a, #fde047)",
				"radial-yellow-300": "radial-gradient(circle, #fde047, #facc15)",
				"radial-yellow-400": "radial-gradient(circle, #facc15, #eab308)",
				"radial-yellow-500": "radial-gradient(circle, #eab308, #ca8a04)",
				"radial-yellow-600": "radial-gradient(circle, #ca8a04, #a16207)",
				"radial-yellow-700": "radial-gradient(circle, #a16207, #854d0e)",
				"radial-yellow-800": "radial-gradient(circle, #854d0e, #713f12)",
				"radial-green-200": "radial-gradient(circle, #a7f3d0, #6ee7b7)",
				"radial-green-300": "radial-gradient(circle, #6ee7b7, #34d399)",
				"radial-green-400": "radial-gradient(circle, #34d399, #10b981)",
				"radial-green-500": "radial-gradient(circle, #10b981, #059669)",
				"radial-green-600": "radial-gradient(circle, #059669, #047857)",
				"radial-green-700": "radial-gradient(circle, #047857, #065f46)",
				"radial-green-800": "radial-gradient(circle, #065f46, #064e3b)",
			},
		},
	},
	daisyui: {
		themes: [
			{
				hackrpi: {
					primary: "#74b7ef",
					secondary: "#88b63a",
					accent: "#edd559",
					neutral: "#efefef",
					"base-100": "#27303b",
				},
			},
		],
	},
	plugins: [
		require("daisyui"),
		plugin(function ({ addUtilities }) {
			const newUtilities = {
				".description-box": {
					overflow: "hidden",
					display: "-webkit-box",
					"-webkit-box-orient": "vertical",
					"-webkit-line-clamp": "2",
					"text-overflow": "ellipsis",
				},
			};
			addUtilities(newUtilities);
		}),
	],
};

export default config;
