import { isOrDefault, not, numberOrNull, oneOf, parseJson } from "../utils/utils.js";
import { ALL_LANGS } from "../stores/currentLangStore.js";
import { ALL_ORDERS } from "../stores/orderStore.js";
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
		[ KEYWORDS.LANG ]: isOrDefault(
			localStorage.getItem( KEYWORDS.LANG ),
			oneOf(ALL_LANGS),
			'en',
			() => localStorage.setItem(KEYWORDS.LANG, 'en')
		),
		[ KEYWORDS.ORDER ]: isOrDefault(
			localStorage.getItem( KEYWORDS.ORDER ),
			oneOf(ALL_ORDERS),
			'date-DESC',
			() => localStorage.setItem(KEYWORDS.ORDER, 'date-DESC')
		),
		[ KEYWORDS.TAGS ]: isOrDefault(
			parseJson(localStorage.getItem( KEYWORDS.TAGS )),
			Array.isArray,
			[],
			() => localStorage.setItem(KEYWORDS.TAGS, '[]')
		),
		[ KEYWORDS.RANK ]: isOrDefault(
			parseInt(numberOrNull(localStorage.getItem( KEYWORDS.RANK ))),
			not(isNaN),
			0,
			() => localStorage.setItem(KEYWORDS.RANK, '0')
		),
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
			this[KEYWORDS.RANK] = isOrDefault(
				numberOrNull(parseInt(query[KEYWORDS.RANK] || localStorage.getItem(KEYWORDS.RANK) || '0', 10)),
				not(isNaN),
				0,
				() => localStorage.setItem(KEYWORDS.RANK, '0')
			);
			this[KEYWORDS.TEXT] = query[KEYWORDS.TEXT] || localStorage.getItem(KEYWORDS.TEXT) || '';
			this[KEYWORDS.TAGS] = isOrDefault(
				query[KEYWORDS.TAGS]
					? query[KEYWORDS.TAGS].split(',').filter(Boolean)
					: parseJson(localStorage.getItem(KEYWORDS.TAGS)),
				Array.isArray,
				[],
				() => localStorage.setItem(KEYWORDS.TAGS, '[]')
			);
			this[KEYWORDS.LANG] = isOrDefault(
				query[KEYWORDS.LANG] || localStorage.getItem(KEYWORDS.LANG),
				oneOf(ALL_LANGS),
				'en',
				() => localStorage.setItem(KEYWORDS.LANG, 'en')
			);
			this[KEYWORDS.ORDER] = isOrDefault(
				query[KEYWORDS.ORDER] || localStorage.getItem(KEYWORDS.ORDER),
				oneOf(ALL_ORDERS),
				'date-DESC',
				() => localStorage.setItem(KEYWORDS.ORDER, 'date-DESC')
			);
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