const plugin = require("tailwindcss/plugin");

const animationDelayPlugin = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			"animation-delay": (value) => ({
				"animation-delay": value,
			}),
		},
		{ values: theme("durations") }
	);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		durations: {
			100: "100ms",
			200: "200ms",
			300: "300ms",
			400: "400ms",
			500: "500ms",
			600: "600ms",
			700: "700ms",
			800: "800ms",
			900: "900ms",
			1000: "100ms",
		},
		extend: {
			colors: {
				"brand-white": "#F7F7F7",
				"brand-black": "#020202",
			},
			fontSize: {
				md: "1.5rem", //24px,
			},
			spacing: {
				13: "3.25rem", //13px
				76: "19rem", // 304px
			},

			keyframes: {
				"fade-in": {
					"0%": {
						transform: "translateY(100%)",
						opacity: 0,
					},
					"100%": {
						transform: "translateY(0)",
						opacity: 1,
					},
				},

				"fade-down": {
					"0%": {
						transform: "translateY(-5%)",
						opacity: 0,
					},
					"100%": {
						transform: "translateY(0%)",
						opacity: 1,
					},
				},
				"fade-out": {
					"0%": {
						transform: "translateY(0%)",
						opacity: 1,
						pointerEvents: "none",
					},
					"100%": {
						transform: "translateY(-5%)",
						opacity: 0,
						pointerEvents: "none",
					},
				},
			},
			animation: {
				fade: "fade-in 2s ease-in-out forwards",
				"fade-down": "fade-down 0.2s ease-in-out forwards",
				"fade-out": "fade-out 0.2s ease-in-out forwards",
			},
		},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/forms"),
		animationDelayPlugin,
	],
};
