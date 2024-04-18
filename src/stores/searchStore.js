import { useRootFilterStore } from "./rootFilterStore.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSearchStore = defineStore('searchStore', () => {
	const rootFilterStore = useRootFilterStore();

	// state
	const searchText = ref(rootFilterStore.text);

	// getters
	const getSearchText = computed(() => searchText.value);

	//actions
	function setSearchText(text) {
		searchText.value = text;
		rootFilterStore.setSearchText(text);
	}

	return {
		getSearchText,
		setSearchText
	};
});