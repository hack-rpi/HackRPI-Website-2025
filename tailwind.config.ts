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
			retro: ["Silkscreen", "serif"],
			modern: ["Audiowide", "serif"],
			neutral: ["Turret Road", "serif"],
			pix: ["Pixelify Sans", "sans-serif"],
		},
		extend: {
			colors: {
				"hackrpi-primary-blue": "#74b7ef", //DaisyUI Primary - Now dark purple
				"hackrpi-primary-dark-green": "#264e33",
				"hackrpi-primary-light-green": "#88b63a",
				"hackrpi-secondary-grey": "#efefef", //Daisy UI Neutral - Now light purple?
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

				//new theme - additional colors
				"test-white": "#FFFFFF",
				"retro-orange": "#fbbb3f",
				"retro-purple-medium": "#7e34c6",
				"retro-purple-dark": "#2b2234",

				//NEW COLORS - 2025
				"hackrpi-light-purple": "#9e40ee", //Primary
				"hackrpi-dark-purple": "#733dbe", //Primary
				"hackrpi-orange": "#e39036", //Secondary
				"hackrpi-yellow": "#e9bc59", //Secondary
				"hackrpi-pink": "#d5345d", //Secondary
				"hackrpi-dark-blue": "#292333", //Background color

				gold: "#ffd700",
				silver: "#C0C0C0",
				bronze: "#cd7f32",
			},
			screens: {
				desktop: "860px",
				xs: "475px",
				"2xs": "375px",
			},
			// new background colors updating to the new retro v theme
			backgroundImage: {
				"radial-yellow-200": "radial-gradient(circle, #e9bc59, #e9bc59)",
				"radial-yellow-300": "radial-gradient(circle, #e9bc59, #e9bc59)",
				"radial-orange-400": "radial-gradient(circle, #e39036, #e39036)",
				"radial-orange-500": "radial-gradient(circle, #e39036, #e39036)",
				"radial-red-600": "radial-gradient(circle, #d5345d, #d5345d)",
				"radial-red-700": "radial-gradient(circle, #d5345d, #d5345d)",
				"radial-purple-800": "radial-gradient(circle, #9e40ee, #9e40ee)",
				"radial-dark-blue-200": "radial-gradient(circle, #9e40ee, #9e40ee)",
				"radial-dark-blue-300": "radial-gradient(circle, #292333, #292333)",
				"radial-dark-blue-400": "radial-gradient(circle, #292333, #292333)",
				"radial-dark-blue-500": "radial-gradient(circle, #292333, #292333)",
				"radial-dark-blue-600": "radial-gradient(circle, #292333, #292333)",
				"radial-dark-purple-700": "radial-gradient(circle, #733dbe, #733dbe)",
				"radial-dark-purple-800": "radial-gradient(circle, #733dbe, #733dbe)",
			},
		},
	},
	daisyui: {
		themes: [
			{
				hackrpi: {
					primary: "#733dbe", //Shows up in footer for example
					secondary: "#9e40ee", //Also background color
					accent: "#e39036", //Registor now button, for instance
					neutral: "#d5345d",
					"base-100": "#292333", //Background color
					"retro-purple-medium": "#7e34c6",
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
