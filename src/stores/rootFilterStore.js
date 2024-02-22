import { defineStore } from "pinia";

const KEYWORDS = {
	LANG: 'currentLanguage',
	ORDER: 'sortingOrder',
};

const _initState = () => {
	return Object.values(KEYWORDS)
		.reduce((state, key) => ({
			...state,
			[key]: localStorage.getItem(key)
		}), {})
};

const _saveChanged = (key, value) => localStorage.setItem(key, value);

export const useRootFilterStore = defineStore('rootFilterStore', ({
	state: () => _initState(),
	getters: {
		lang: state => state[KEYWORDS.LANG],
		order: state => state[KEYWORDS.ORDER],
	},
	actions: {
		setLang(lang) {
			_saveChanged(KEYWORDS.LANG, lang);
		},
		setOrder(order) {
			_saveChanged(KEYWORDS.ORDER, order);
		}
	}
}));