<script setup>
import { computed } from "vue";
import { useSearchStore } from "../../stores/searchStore.js";

const searchStore = useSearchStore();
const searchText = computed(() => searchStore.getSearchText);

const setInput = (e) => {
	searchStore.setSearchText(e.target.value);
};
</script>

<template>
	<div class="search-container">
		<input
			class="text-input search-box"
			type="text"
			:value="searchText"
			:placeholder="$t('searchPlaceholder')"
			@input="setInput"
		>
		<span
			v-if="!!searchText.length"
			class="clear-button"
			@click="searchStore.setSearchText('')"
		>&times;</span>
	</div>
</template>

<style scoped>
.search-container {
  position: relative;
  display: inline-block;
  padding: 0;
  width: 320px;
}

.search-box {
  width: 100%;
  margin: 10px auto;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 24px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  font-size: 2em;
  font-weight: bold;
}

@media screen and (max-width: 814px) {
  .search-container {
    width: 100%;
    display: block;
  }
}

</style>../stores/searchStore.js