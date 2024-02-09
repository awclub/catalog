import { defineStore } from "pinia";

const LOCAL_STORAGE_RANK_KEY  = 'selectedRanks';

export const useRanksStore = defineStore('ranksStore', {
	state: () => ({
		rank: JSON.parse(localStorage.getItem(LOCAL_STORAGE_RANK_KEY)) || 0,
	}),
	getters: {
		getSelectedRanks(state) {
			return state.rank;
		}
	},
	actions: {
		setRank(newRank) {
			this.rank = newRank;
			localStorage.setItem(LOCAL_STORAGE_RANK_KEY, JSON.stringify(newRank));
		},
		resetRank() {
			this.rank = 0;
			localStorage.setItem(LOCAL_STORAGE_RANK_KEY, '0');
		}
	}
});