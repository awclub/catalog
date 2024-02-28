<script setup>
import AutoCompleteInput from "./AutoComplete.vue";
import Search from "./Search.vue";
import TagList from "../TagList.vue";
import { useServicesStore } from "../../stores/servicesStore.js";
import { useTagsStore } from "../../stores/tagsStore.js";

import { computed, onBeforeMount } from "vue";
import { useRanksStore } from "../../stores/ranksStore.js";
import StarFilter from "../../components/StarFilter.vue";

const tagsStore = useTagsStore();
const servicesStore = useServicesStore();
const ranksStore = useRanksStore();

onBeforeMount(() => {
	servicesStore.fetchTags();
});

const tags = computed(() => {
	return servicesStore.getTags
});

const handleRankUpdate = (newRank) => {
	ranksStore.setRank(newRank);
};
const handleResetRank = () => {
	ranksStore.resetRank();
};

</script>

<template>
	<div class="filter-container">
		<Search />
		<div class="selected-tags-box">
			<auto-complete-input
				:placeholder="$t('searchTagsPlaceholder')"
				:available-items="tags"
				:already-selected-items="tagsStore.getSelectedTags"
				:on-select="tagsStore.selectTag"
			/>
			<div class="selected-tags">
				<TagList
					:items="tagsStore.getSelectedTags"
					:on-tag-click="tagsStore.unSelectTag"
				/>
			</div>
			<input
				v-show="tagsStore.getSelectedTags.length"
				class="reset-button"
				type="button"
				title="reset"
				value="&#8634;"
				@click="tagsStore.resetTags"
			>
		</div>
		<StarFilter @update:rank="handleRankUpdate" @reset-rank="handleResetRank" />
	</div>
</template>

<style scoped>
.filter-container {
  padding: 0 10px 10px;
}

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