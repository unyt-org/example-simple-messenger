import { UIX } from "uix";

UIX.Theme.setDarkTheme(UIX.Theme.extend(UIX.Theme.DARK, 'unyt-dark', {
	unyt_razzmatazz: '#ff0059',
	unyt_sky_blue: '#2AAAD7',
	accent: '#2AAAD7',
	text_accent_1: "#ffffff",
	bg_color: "#1a1e2a",
	bg_darker: "rgba(255, 255, 255, 0.6)",
	bg_lighter: "#1d2231",
	text: "#ababab",
	outline: "rgb(61, 65, 77)",

	accent_1: '#2aaad7',
	accent_2: '#9c74e4',
	accent_3: '#e474bf',
	accent_4: '#e47474',
	accent_5: '#e4ad74'
}))


UIX.Theme.setLightTheme(UIX.Theme.extend(UIX.Theme.LIGHT, 'unyt-light', {
	unyt_razzmatazz: '#ff0059',
	unyt_sky_blue: '#2AAAD7',
	text_highlight: "#000000",
	accent: '#2AAAD7',
	text_accent_1: "#000000",
	bg_color: "white",
	bg_darker: "rgba(255, 255, 255, 0.6)",
	bg_lighter: "#f9f9f9",
	bg_content_dark: "#dddddd",
	outline: "#e8e8e8",

	accent_1: '#2aaad7',
	accent_2: '#9c74e4',
	accent_3: '#e474bf',
	accent_4: '#e47474',
	accent_5: '#e4ad74'
}))


// default mode is dark mode
once(() => UIX.Theme.setMode("dark"));