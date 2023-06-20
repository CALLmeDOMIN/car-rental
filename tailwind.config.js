/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            text: "#240523",
            background: "#fefbfe",
            primaryButton: "#efa861",
            secondaryButton: "#c7e0f9",
            accent: "#3b1240",
            ...colors,
        },
    },
    plugins: [],
};
