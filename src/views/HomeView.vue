<script setup>
import ItemsList from '../components/ItemsList.vue'
import FilterComponent from "@/components/FilterComponent.vue";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { useSearchStore } from "@/service/searchStore.js";

const route = useRoute();
const searchStore = useSearchStore();
const { search } = route.query;

onBeforeMount(() => {
  if (search?.length) {
    searchStore.setSearchText(search);
  }
});

</script>

<template>
  <main>
    <FilterComponent />
    <ItemsList />
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1 0 auto;
}
</style>