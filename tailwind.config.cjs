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
				thirtytwo: ["32px", "48px"],
				twentytwo: ["22px", "38px"],
				thirtyfour: ["34px", "51px"],
				forty: ["40px", "69px"],
			},
			colors: {
				dpgreen: "#408712",
				dpdarkgreen: "#3a7415",
				dpdarkblue: "#0E0E2C",
				dpneutral: {
					100: "#E8E8E8",
					200: "#E5E5E5",
					300: "#A0A4AB",
					400: "#606060",
					500: "#767676",
					600: "#CCC",
					700: "#909090",
				},
			},
		},
	},
	plugins: [],
};
