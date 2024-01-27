import { defineStore } from "pinia";
import i18n from "../i18n/index.js";

export const LANG_KEY = 'currentLanguage';

const defaultLang = () => {
	// default language is English,
	let defaultLangTemp = localStorage.getItem(LANG_KEY)
    || (['ru', 'uk', 'be'].some(lang => navigator.language.startsWith(lang)) ? 'ru' : 'en');

	i18n.global.locale = defaultLangTemp;

	return defaultLangTemp;
};

export const useCurrentLangStore = defineStore('currentLangStore', {
	state: () => ({
		currentLang: defaultLang()
	}),
	getters: {
		getCurrentLang(state) {
			return state.currentLang
		}
	},
	actions: {
		setCurrentLang(lang) {
			this.currentLang = lang;
			i18n.global.locale = lang;
			localStorage.setItem(LANG_KEY, lang);
		}
	}
});