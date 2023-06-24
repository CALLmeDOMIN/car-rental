/** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                text: "#dde8ee",
                background: "#0c1418",
                "primary-button": "#de964f",
                "secondary-button": "#fbf3fa",
                accent: "#93c3cd",
            },
        },
    },
    plugins: [],
};
