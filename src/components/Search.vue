<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "../service/searchStore.js";

const searchText = ref('');
const searchStore = useSearchStore();
watch(searchText, newValue => searchStore.setSearchText(newValue));
</script>

<template>
  <div class="search-container">
    <input
        class="text-input search-box"
        type="text"
        v-model="searchText"
        :placeholder="$t('searchPlaceholder')"/>
    <span class="clear-button" v-if="!!searchText.length" v-on:click="searchText = ''">&times;</span>
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

</style>