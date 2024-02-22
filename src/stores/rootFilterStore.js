import { defineStore } from "pinia";

const KEYWORDS = {
	LANG: 'currentLanguage'
};

const _initState = () => {
	return Object.values(KEYWORDS)
		.reduce((state, key) => ({
			...state,
			[key]: localStorage.getItem(key)
		}), {})
};


export const useRootFilterStore = defineStore('rootFilterStore', ({
	state: () => _initState(),
	getters: {
		lang: state => state[KEYWORDS.LANG],
	},
	actions: {
		setLang(lang) {
			localStorage.setItem(KEYWORDS.LANG, lang);
		}
	}
}));