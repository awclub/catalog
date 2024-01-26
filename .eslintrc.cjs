module.exports = {
	extends: [
		'plugin:vue/vue3-recommended',
	],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/require-default-prop': 'off',
		"indent": ["error", "tab"],
		"vue/html-indent": ["error", "tab"],
	},
	env: {
		"browser": true,
		"node": true
	},
	parserOptions: {
		"ecmaVersion": 15
	}
}