import { defineStore } from "pinia";

export const KEYWORDS = {
	LANG: 'currentLanguage',
	ORDER: 'sortingOrder',
	TAGS: 'selectedTags',
	RANK: 'selectedRanks',
	TEXT: 'search'
};

const EXPORTED_KEYWORDS = [
	KEYWORDS.RANK,
	KEYWORDS.TAGS,
	KEYWORDS.TEXT
];

const _initState = () => {
	return {
		[ KEYWORDS.LANG ]: localStorage.getItem( KEYWORDS.LANG ) || 'en',
		[ KEYWORDS.ORDER ]: localStorage.getItem( KEYWORDS.ORDER ) || 'date-DESC',
		[ KEYWORDS.TAGS ]: JSON.parse(localStorage.getItem( KEYWORDS.TAGS )) || [],
		[ KEYWORDS.RANK ]: parseInt(localStorage.getItem( KEYWORDS.RANK ) || '0', 10),
		[ KEYWORDS.TEXT ]: localStorage.getItem( KEYWORDS.TEXT ) || '',
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
		text: state => state[KEYWORDS.TEXT],
		searchState: state => {
			return EXPORTED_KEYWORDS.reduce((prev, key) => ({ ...prev, [key]: state[key] }), {});
		},
	},
	actions: {
		importFilterState(query) {
			this[KEYWORDS.RANK] = parseInt(query[KEYWORDS.RANK] || localStorage.getItem(KEYWORDS.RANK) || '0', 10);
			this[KEYWORDS.TEXT] = query[KEYWORDS.TEXT] || localStorage.getItem(KEYWORDS.TEXT) || '';
			this[KEYWORDS.TAGS] = query[KEYWORDS.TAGS]
				? query[KEYWORDS.TAGS].split(',').filter(Boolean)
				: JSON.parse(localStorage.getItem(KEYWORDS.TAGS) || '[]');
			this[KEYWORDS.LANG] = query[KEYWORDS.LANG] || localStorage.getItem(KEYWORDS.LANG) || 'en';
			this[KEYWORDS.ORDER] = query[KEYWORDS.ORDER] || localStorage.getItem(KEYWORDS.ORDER) || 'date-DESC';
		},
		setLang(lang) {
			this[ KEYWORDS.LANG ] = lang;
			_saveChanges(KEYWORDS.LANG, lang);
		},
		setOrder(order) {
			this[ KEYWORDS.ORDER ] = order;
			_saveChanges(KEYWORDS.ORDER, order);
		},
		setTags(tags) {
			this[ KEYWORDS.TAGS ] = tags === null ? [] : (Array.isArray(tags) ? tags : []);
			_saveChanges(KEYWORDS.TAGS, JSON.stringify(this[KEYWORDS.TAGS]));
		},
		setRank(rank) {
			this[ KEYWORDS.RANK ] = rank;
			_saveChanges(KEYWORDS.RANK, rank);
		},
		setSearchText(text) {
			this[ KEYWORDS.TEXT ] = text;
			_saveChanges(KEYWORDS.TEXT, text);
		}
	}
}));