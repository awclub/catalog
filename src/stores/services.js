import { GetServices } from "../api/services.js";
import { defineStore } from 'pinia';

export const useServicesStore = defineStore('servicesStore', {
	state: () => ({
		services: [],
		currentService: {},
		allTags: []
	}),
	getters: {
		getServices(state) {
			return state.services
		},
		getCurrentService(state) {
			return state.currentService
		},
		getAllTags(state) {
			return state.allTags
		}
	},
	actions: {
		async fetchData() {
			const api = await new GetServices("./public/db.json")
      
			const response = api
			const { data } = response

			this.services = data
		},
		async fetchService(id) {
			const api = await new GetServices("./public/db.json")
        
			const currentId = id
			const response = api
			const { data } = response

			const currentService = data.find(i => i.id.includes(currentId))

			this.currentService = currentService
		},
		async fetchAllTags() {
			const { data } = await new GetServices("./public/db.json");

			const uniqueAvailableTags = Object.keys(
				(data || [])
					.flatMap(service => service.tags)
					.reduce((prev, curr) => {
						prev[curr] = true;

						return prev;
					}, {})
			);

			uniqueAvailableTags.sort();
			this.allTags = uniqueAvailableTags;
		}
	},
});