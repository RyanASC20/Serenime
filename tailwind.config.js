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
                    "-4px -4px 16px 0 #ffffff73, 4px 4px 16px 0 rgba(94, 104, 121, 0.288);",
                "double-sm":
                    "-8px -8px 16px 0 #ffffff73, 8px 8px 16px 0 rgba(94, 104, 121, 0.288);",
                "double-md":
                    "-12px -12px 16px 0 #ffffff73, 12px 12px 16px 0 rgba(94, 104, 121, 0.288);",
                "double-lg":
                    "-22px -22px 16px 0 #ffffff73, 22px 22px 16px 0 rgba(94, 104, 121, 0.288);",
            },
            colors: {
                base: {
                    DEFAULT: "#dde1e7",
                    dark: "#dde1e7"
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
