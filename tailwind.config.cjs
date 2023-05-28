/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				logo: ["32px", "48px"],
				app: ["22px", "33px"],
				bigapp: ["34px", "51px"],
			},
			colors: {
				dpgreen: "#408712",
				dpdarkgreen: "#3a7415",
				dpdarkblue: "#0E0E2C",
				dpneutral: {
					100: "#E8E8E8",
					200: "#E5E5E5",
					300: "#A0A4AB",
				},
			},
		},
	},
	plugins: [],
};
