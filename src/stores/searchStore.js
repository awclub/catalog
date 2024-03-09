import { defineStore } from "pinia";
import router from "../router/index.js";


export const useSearchStore = defineStore('searchStore', {
	state: () => ({
		searchText: ''
	}),
	getters: {
		getSearchText(state) {
			return state.searchText
		}
	},
	actions: {
		setSearchText(text) {
			this.searchText = text;

			const query = { ...router.currentRoute.value.query, search: text };

			if (!text) {
				delete query.search;
			}

			router.push({ query });
		}

	}
});
