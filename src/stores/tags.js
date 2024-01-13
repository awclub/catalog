import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTagsStore = defineStore('tagsStore', () => {
  const tags = ref(JSON.parse(localStorage.getItem('selectedTags')) || []);

  const availableTags = computed(() => tags);

  const selectTag = (tagName) => {
    let selectedTags = tags.value;
    if (!selectedTags?.length) {
      selectedTags = [tagName];
    } else if (!selectedTags.includes(tagName)) {
      selectedTags = [...selectedTags, tagName];
    }
    tags.value = selectedTags;
    localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
  };

  const unSelectTag = (tagName) => {
    const filteredItems = tags.value
      .filter(tag => tag !== tagName);
    tags.value = filteredItems;
    localStorage.setItem('selectedTags', JSON.stringify(filteredItems));
  };

  return {
    tags,
    availableTags,
    selectTag,
    unSelectTag
  }
})