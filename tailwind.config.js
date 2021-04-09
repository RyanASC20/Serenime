const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [
        // './pages/*.tsx',
        // './components/**/*.tsx'
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            transitionProperty: {
                'width': 'width'
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                number: ["Rubik", "sans-serif"],
                heading: ["Roboto", "sans-serif"],
            },
            transitionDuration: {
                '4000': '4000ms',
                '7000': '7000ms',
                '8000': '8000ms',
            },
            colors: {
                base: {
                    // DEFAULT: "#FAF9FA",
                    DEFAULT: "#F5F6FA",
                    dark: '#2b323d'
                },
                secondary: {
                    DEFAULT: "#FFFFFF",
                    dark: '#475263'
                },
                card: {
                    DEFAULT: "#def1ff",
                },
                highlight: {
                    DEFAULT: "#55D681",
                    secondary: "#278DD5"
                },
                navbar: {
                    DEFAULT: "#535467"
                },
                emote: {
                    0: "#3692e3",
                    1: "#F15B5B",
                    2: "#ff8105",
                    3: "#F1AC5B",
                    4: "#c3ba0c",
                    5: "#87bd10",
                    6: "#4D844B"
                }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
