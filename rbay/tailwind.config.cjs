module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '4rem'
			}
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/typography')]
};
