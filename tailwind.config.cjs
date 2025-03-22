/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'twentytwo': ['22px', '38px'],
                'thirtytwo': ['32px', '48px'],
                'thirtyfour': ['34px', '51px'],
                'forty': ['40px', '69px'],
            },
            colors: {
                dpgreen: "#408712",
                dpdarkgreen: "#3a7415",
                dpdarkblue: "#0E0E2C",
                dpgray: "#888",
                darkmodebackground: "#0F172A", // Darker background for better contrast
                darkmodetext: "#FFFFFF",
                darkmodeprimary: '#3B71FE',
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
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        a: {
                            color: '#3B71FE',
                            '&:hover': {
                                color: '#2954cc',
                            },
                        },
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
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-in-out',
                'slide-in-right': 'slideInRight 0.5s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
};