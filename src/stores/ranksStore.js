import { useRootFilterStore } from "./rootFilterStore.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRanksStore = defineStore('ranksStore', () => {
	const rootFilterStore = useRootFilterStore();

	// state
	const selectedRank = ref(rootFilterStore.rank);

	// getters
	const getSelectedRanks = computed(() => selectedRank.value);

	// actions
	function setRank(newRank) {
		selectedRank.value = newRank;
		rootFilterStore.setRank(newRank);
	}

	function resetRank() {
		selectedRank.value = 0;
		rootFilterStore.setRank(0);
	}

	return {
		getSelectedRanks,
		setRank,
		resetRank
	};
});