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
	console.log('_initState');

	return {
		[ KEYWORDS.LANG ]: localStorage.getItem( KEYWORDS.LANG ),
		[ KEYWORDS.ORDER ]: localStorage.getItem( KEYWORDS.ORDER ),
		[ KEYWORDS.TAGS ]: localStorage.getItem( KEYWORDS.TAGS ) || '[]',
		[ KEYWORDS.RANK ]: localStorage.getItem( KEYWORDS.RANK ) || '0',
		[ KEYWORDS.TEXT ]: '',
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
		text: state => state[KEYWORDS.TEXT]
	},
	actions: {
		importFilterState(query) {
			console.log(query);
			this[KEYWORDS.RANK] = query[KEYWORDS.RANK] || '0';
			this[KEYWORDS.TEXT] = query[KEYWORDS.TEXT] || '';
			this[KEYWORDS.TAGS] = query[KEYWORDS.TAGS] || '[]';
		},
		exportFilterState() {
			const that = this;

			return EXPORTED_KEYWORDS.reduce((prev, key) => ({ ...prev, [key]: that[key] }), {});
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
			this[ KEYWORDS.TAGS ] = tags;
			_saveChanges(KEYWORDS.TAGS, JSON.stringify(tags || []));
		},
		setRank(rank) {
			this[ KEYWORDS.RANK ] = rank;
			_saveChanges(KEYWORDS.RANK, rank);
		},
		setSearchText(text) {
			this[ KEYWORDS.TEXT ] = text;
			// we don't store the search text in localStorage, on the other side we need to have searchText in this cumulative store.
		}
	}
}));