import { defineStore } from 'pinia';
import { GetServices } from "@/api/services"

export const useServicesStore = defineStore('servicesStore', {
    state: () => ({
        services: [],
        currentService: {}
    }),
    getters: {
        getServices(state) {
            return state.services
        },
        getCurrentService(state) {
            return state.currentService
        }
    },
  actions: {
    async fetchData() {
      const api = await new GetServices("./src/assets/db.json")
      
      const response = api
      const { data } = response
      this.services = data
    },
    async fetchService(id) {
        const api = await new GetServices("/src/assets/db.json")
        
        const currentId = id
        const response = api
        const { data } = response

        const currentService = data.find(i => currentId === i.id)
        console.log(currentService)
        this.currentService = currentService
      },
  },
});