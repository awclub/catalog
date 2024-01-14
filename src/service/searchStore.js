import { defineStore } from "pinia";

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchText: ''
  }),
  getters: {
    getSearchText(state) {
      return state.searchText
    }
  },
  actions: {
    setSearchText(text) {
      this.searchText = text;
    }
  }
});