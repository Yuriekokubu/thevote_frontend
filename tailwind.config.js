const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

 
module.exports = {
	content: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Mali", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};
