/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
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
	plugins: [],
}
