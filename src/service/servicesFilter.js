import { defineStore } from "pinia";
import { useTagsStore } from "@/stores/tags.js";

export const useServicesFilter = defineStore('servicesFilter', () => {

  const tagsStore = useTagsStore();

  const applyFilter = (services = []) => {
    const selectedTags = tagsStore.getSelectedTags;
    return services
      .filter(service => _containsAllTags(service.tags, selectedTags));
  };

  const _containsAllTags = (serviceTags, selectedTags = []) => {
    serviceTags = serviceTags.map(tag => tag.toLowerCase());
    return selectedTags.every(tag => serviceTags.includes(tag));
  }

  return {
    applyFilter
  };
});