import { defineStore } from 'pinia'

export const useServicesCounter = defineStore('servicesCounter', {
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
