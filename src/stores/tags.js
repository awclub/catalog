import { defineStore } from "pinia";

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
			}
		},
		unSelectTag(tagName) {
			this.tags = this.tags.filter(tag => tag !== tagName);
			localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, JSON.stringify(this.tags));
		},
		resetTags() {
			this.tags = [];
			localStorage.setItem(LOCAL_STORAGE_TAGS_KEY, '[]');
		}
	}
});
