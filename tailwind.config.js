/** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

module.exports = {
    darkMode: 'class',
    content: [
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                text: '#151519',
                background: '#f4f4f6',
                darktext: '#dde8ee',
                darkbg: '#0c1418',
                'primary-button': '#de964f',
                'secondary-button': '#fbf3fa',
                accent: '#93c3cd',
            },
            keyframes: {
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
            },
        },
    },
    plugins: [],
}
