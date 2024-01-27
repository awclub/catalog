import { defineStore } from 'pinia'

export const useServicesCounterStore = defineStore('servicesCounterStore', {
	state: () => ({
		count: 0
	}),
	getters: {
		getCount(state) {
			return state.count;
		}
	},
	actions: {
		setCount(value) {
			this.count = value
		}
	}
});
