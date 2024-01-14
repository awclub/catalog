<script setup>
import { useTagsStore } from "@/stores/tags.js";
import TagList from "@/components/TagList.vue";
import AutoCompleteInput from "@/components/AutoComplete.vue";
import { useServicesStore } from "@/stores/services.js";
import { computed, onBeforeMount } from "vue";
import Search from "@/components/Search.vue";

const tagsStore = useTagsStore();
const servicesStore = useServicesStore();

onBeforeMount(() => {
  servicesStore.fetchAllTags();
});

const allTags = computed(() => {
  return servicesStore.getAllTags
});

</script>

<template>
  <Search />
  <div class="selected-tags-box">
    <auto-complete-input
        :placeholder="$t('searchTagsPlaceholder')"
        :available-items="allTags"
        :already-selected-items="tagsStore.tags"
        :on-select="tagsStore.selectTag"
    />
    <div class="selected-tags">
      <TagList
          :items="tagsStore.tags"
          :onTagClick="tagsStore.unSelectTag"
      />
    </div>
    <input class="reset-button"
           type="button"
           title="reset"
           v-show="tagsStore.tags.length"
           v-on:click="tagsStore.resetTags"
           value="&#8634;"/>
  </div>
</template>

<style scoped>

.selected-tags-box {
  position: relative;
  display: inline-block;
  padding: 0;
  margin-left: 10px;
  margin-bottom: 10px;
}

.selected-tags {
  display: inline-block;
  margin: 0 0 0 10px;
}

.reset-button {
  font-size: 1em;
  display: inline;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  font-weight: bold;
  background-color: var(--reset-btn-bg-color);
  color: var(--reset-btn-text-color);
  padding: 5px;
  width: 28px;
  height: 28px;
}

.reset-button:hover {
  background-color: var(--reset-btn-bg-color-hover);
  color: var(--reset-btn-text-color);
  transition: 0.3s;
}
</style>

<style>
.selected-tags .tag {
  margin: 0 6px 0 0;
}
</style>