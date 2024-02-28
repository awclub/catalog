import { defineStore } from "pinia";
import i18n from "../i18n/index.js";
import { ref } from "vue";
import { useRootFilterStore } from "./rootFilterStore.js";

const defaultLang = (savedLang) => {
	// default language is English,
	const defaultLangTemp = savedLang
    || (['ru', 'uk', 'be'].some(lang => navigator.language.startsWith(lang)) ? 'ru' : 'en');

	i18n.global.locale = defaultLangTemp;

	return defaultLangTemp;
};

export const useCurrentLangStore = defineStore('currentLangStore', () => {
	const rootFilterStore = useRootFilterStore();

	// state
	const currentLang = ref(defaultLang(rootFilterStore.lang));

	// actions
	function setCurrentLang(lang) {
		currentLang.value = lang;
		i18n.global.locale = lang;
		rootFilterStore.setLang(lang);
	}

	return {
		setCurrentLang,
	}
});