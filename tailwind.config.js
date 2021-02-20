const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", "sans-serif"],
                heading: ["Raleway", "sans-serif"],
            },
            boxShadow: {
                "double-xs":
                    "-4px -4px 7px 0 rgba(255, 255, 255, 1), 4px 4px 7px 0 rgba(0, 0, 0, 0.2);",
                "double-sm":
                    "-8px -8px 8px 0 rgba(255, 255, 255, 1), 8px 8px 8px 0 rgba(0, 0, 0, 0.2);",
                "double-md":
                    "-12px -12px 12px 0 rgba(255, 255, 255, 1), 12px 12px 12px 0 rgba(0, 0, 0, 0.2);",
                "double-lg":
                    "-18px -18px 18px 0 rgba(255, 255, 255, 1), 18px 18px 18px 0 rgba(0, 0, 0, 0.2);",
            },
            colors: {
                base: {
                    DEFAULT: "#EEEEEE",
                },
                'emote-0': {
                    DEFAULT: "#3692e3"
                },
                'emote-1': {
                    DEFAULT: "#F15B5B"
                },
                'emote-2': {
                    DEFAULT: "#ff8105"
                },
                'emote-3': {
                    DEFAULT: "#F1AC5B"
                },
                'emote-4': {
                    DEFAULT: "#c3ba0c"
                },
                'emote-5': {
                    DEFAULT: "#87bd10"
                },
                'emote-6': {
                    DEFAULT: "#4D844B"
                }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
