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
				twentytwo: ["22px", "38px"],
				thirtytwo: ["32px", "48px"],
				thirtyfour: ["34px", "51px"],
				forty: ["40px", "69px"],
			},
			colors: {
				dpgreen: "#408712",
				dpdarkgreen: "#3a7415",
				dpdarkblue: "#0E0E2C",
				dpgray: "#888",
				darkmodebackground: "#262A31",
				darkmodetext: "#FFFFFF",
				darkmodedpgreen: '#2EBD59',
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
			typography: {
				DEFAULT: {
					css: {				
						code: {
							'border-radius': '.25rem',
							'padding': '.1rem 0.2rem',
						},			
						// remove backticks from code blocks
						"code::before": {
						  content: "none",
						},
						"code::after": {
						  content: "none",
						},					
					},
				},			
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
