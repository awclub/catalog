import { defineStore } from "pinia";
import { useTagsStore } from "@/stores/tags.js";
import { useSearchStore } from "@/service/searchStore.js";
import i18n from "@/i18n/index.js";
import { useServicesCounter } from "@/stores/servicesCounter.js";


export const useServicesFilter = defineStore('servicesFilter', () => {

  const tagsStore = useTagsStore();
  const searchStore = useSearchStore();
  const servicesCounter = useServicesCounter();

  const applyFilter = (services = []) => {
    const selectedTags = tagsStore.getSelectedTags;
    const filtered = services
      .filter(service => _containsAllTags(service.tags, selectedTags))
      .filter(service => _isSuitableServiceBySearchTerm(service, searchStore.getSearchText, i18n.global.locale));
    servicesCounter.setCount(filtered.length);
    return filtered;
  };

  const _containsAllTags = (serviceTags, selectedTags = []) => {
    serviceTags = serviceTags.map(tag => tag.toLowerCase());
    return selectedTags.every(tag => serviceTags.includes(tag));
  }

  const _isSuitableServiceBySearchTerm = (service, searchTerm, currentLanguage) => {
    searchTerm = searchTerm.toLowerCase();
    return service.name.toLowerCase().includes(searchTerm) ||
      service.description[currentLanguage].toLowerCase().includes(searchTerm) ||
      service.mentions.some(mention => mention.episodeUrl.toLowerCase().startsWith(searchTerm)) ||
      service.mentions.some(mention => mention.episodeName.toLowerCase().includes(searchTerm)) ||
      service.url.toLowerCase().includes(searchTerm) ||
      service.id.toLowerCase().includes(searchTerm);
  }

  return {
    applyFilter
  };
});