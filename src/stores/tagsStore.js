import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRootFilterStore } from "./rootFilterStore.js";

export const useTagsStore = defineStore('tagsStore', () => {
	const rootFilterStore = useRootFilterStore();

	// state
	const selectedTags = ref(rootFilterStore.tags);

	// getters
	const getSelectedTags = computed(() => selectedTags.value);

	// actions
	function selectTag(tagName) {
		if (!selectedTags.value.includes(tagName)) {
			selectedTags.value = [...selectedTags.value, tagName];
			rootFilterStore.setTags(selectedTags.value);
		}
	}

	function unSelectTag(tagName) {
		selectedTags.value = selectedTags.value.filter(tag => tag !== tagName);
		rootFilterStore.setTags(selectedTags.value);
	}

	function resetTags() {
		selectedTags.value = [];
		rootFilterStore.setTags(selectedTags.value);
	}

	return {
		getSelectedTags,
		selectTag,
		unSelectTag,
		resetTags
	};

});
