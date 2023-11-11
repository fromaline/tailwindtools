/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			'sans': 'Montserrat, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
		},
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: 'calc(var(--vh) * 100)',
		}),
		minHeight: theme => ({
			0: '0',
			...theme('spacing'),
			full: '100%',
			screen: 'calc(var(--vh) * 100)',
		}),
		extend: {
		},
		container: {
			center: true,
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
