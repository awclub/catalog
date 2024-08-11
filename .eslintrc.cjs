module.exports = {
	extends: [
		'plugin:vue/vue3-recommended',
		"stylelint",
	],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/require-default-prop': 'off',
		"indent": ["error", "tab"],
		"vue/html-indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab"],
		"sort-imports": "off",
	},
	env: {
		"browser": true,
		"node": true
	},
	parserOptions: {
		"ecmaVersion": 15
	},
	ignorePatterns: [
		'checkDb.js'
	]
}