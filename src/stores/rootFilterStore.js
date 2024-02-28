import { defineStore } from "pinia";

export const KEYWORDS = {
	LANG: 'currentLanguage',
	ORDER: 'sortingOrder',
	TAGS: 'selectedTags',
};

const _initState = () => {
	return {
		[ KEYWORDS.LANG ]: localStorage.getItem( KEYWORDS.LANG ),
		[ KEYWORDS.ORDER ]: localStorage.getItem( KEYWORDS.ORDER ),
		[ KEYWORDS.TAGS ]: JSON.parse(localStorage.getItem( KEYWORDS.TAGS )) || [],
	};
};

const _saveChanges = (key, value) => localStorage.setItem(key, value);

export const useRootFilterStore = defineStore('rootFilterStore', ({
	state: () => _initState(),
	getters: {
		lang: state => state[KEYWORDS.LANG],
		order: state => state[KEYWORDS.ORDER],
		tags: state => state[KEYWORDS.TAGS],
	},
	actions: {
		setLang(lang) {
			_saveChanges(KEYWORDS.LANG, lang);
		},
		setOrder(order) {
			_saveChanges(KEYWORDS.ORDER, order);
		},
		setTags(tags) {
			_saveChanges(KEYWORDS.TAGS, JSON.stringify(tags || []));
		}
	}
}));