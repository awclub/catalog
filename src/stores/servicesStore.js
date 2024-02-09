import { GetServices } from "../api_client/servicesApi.js";
import { defineStore } from 'pinia';

export const useServicesStore = defineStore('servicesStore', {
	state: () => ({
		services: [],
		service: {},
		tags: [],
		selectedRank: 0,
	}),
	getters: {
		getServices(state) {
			return state.services
		},
		getService(state) {
			return state.service
		},
		getTags(state) {
			return state.tags
		},
		getSelectedRank(state) {
			return state.selectedRank
		}
	},
	actions: {
		async fetchServices() {
			const api = await new GetServices(`./db.json?${new Date().getTime()}`)
      
			const response = api
			const { data } = response

			this.services = data
		},
		async fetchService(id) {
			const api = await new GetServices(`./db.json?${new Date().getTime()}`)
        
			const currentId = id
			const response = api
			const { data } = response

			const service = data.find(i => i.id.includes(currentId))

			this.service = service
		},
		async fetchTags() {
			const { data } = await new GetServices(`./db.json?${new Date().getTime()}`);

			const uniqueAvailableTags = Object.keys(
				(data || [])
					.flatMap(service => service.tags)
					.reduce((prev, curr) => {
						prev[curr] = true;

						return prev;
					}, {})
			);

			uniqueAvailableTags.sort();
			this.tags = uniqueAvailableTags;
		}
	},
});