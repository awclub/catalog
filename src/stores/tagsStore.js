import { defineStore } from "pinia";
import router from "../router/index.js";

const LOCAL_STORAGE_TAGS_KEY = 'selectedTags';

export const useTagsStore = defineStore('tagsStore', {
	state: () => ({
		tags: JSON.parse(localStorage.getItem(LOCAL_STORAGE_TAGS_KEY)) || []
	}),
	getters: {
		getSelectedTags(state) {
			return state.tags;
		}
	},
	actions: {
		selectTag(tagName) {
			if (!this.tags.includes(tagName)) {
				this.tags = [ ...this.tags, tagName ];
				localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, JSON.stringify(this.tags));
				this.updateUrl();
			}
		},
		unSelectTag(tagName) {
			this.tags = this.tags.filter(tag => tag !== tagName);
			localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, JSON.stringify(this.tags));
			this.updateUrl();
		},
		resetTags() {
			this.tags = [];
			localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, '[]');
			this.updateUrl();
		},
		updateUrl() {
			const tags = this.tags.join(',');
			const query = { ...router.currentRoute.value.query, tags };

			if (!tags) {
				delete query.tags;
			}

			router.push({ query });
		}
	}
});
