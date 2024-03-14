import { defineStore } from "pinia";

export const KEYWORDS = {
	LANG: 'currentLanguage',
	ORDER: 'sortingOrder',
	TAGS: 'selectedTags',
	RANK: 'selectedRanks',
};

const _initState = () => {
	return {
		[ KEYWORDS.LANG ]: localStorage.getItem( KEYWORDS.LANG ),
		[ KEYWORDS.ORDER ]: localStorage.getItem( KEYWORDS.ORDER ),
		[ KEYWORDS.TAGS ]: JSON.parse(localStorage.getItem( KEYWORDS.TAGS )) || [],
		[ KEYWORDS.RANK ]: localStorage.getItem( KEYWORDS.RANK ) || '0',
	};
};

const _saveChanges = (key, value) => localStorage.setItem(key, value);

export const useRootFilterStore = defineStore('rootFilterStore', ({
	state: () => _initState(),
	getters: {
		lang: state => state[KEYWORDS.LANG],
		order: state => state[KEYWORDS.ORDER],
		tags: state => state[KEYWORDS.TAGS],
		rank: state => state[KEYWORDS.RANK],
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
		},
		setRank(rank) {
			_saveChanges(KEYWORDS.RANK, rank);
		}
	}
}));