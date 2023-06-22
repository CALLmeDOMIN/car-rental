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
            primaryButton: "#94c9d1",
            secondaryButton: "#060406",
            accent: "#63447e",
            transparent: colors.transparent,
            gray: colors.gray,
            white: colors.white,
            black: colors.black,
            indigo: colors.indigo,
            yellow: colors.yellow,
            rose: colors.rose,
            emerald: colors.emerald,
            amber: colors.amber,
            red: colors.red,
        },
    },
    plugins: [],
};
