<script setup>
import FilterComponent from "../components/search/FilterComponent.vue";
import ServicesList from '../components/ServicesList.vue'
import i18n from '../i18n/index.js'
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useSearchStore } from "../stores/searchStore.js";
import { watchEffect } from 'vue';

const route = useRoute();
const { t } = i18n.global;
const searchStore = useSearchStore();
const { search } = route.query;

onBeforeMount(() => {
	if (search?.length) {
		searchStore.setSearchText(search);
	}
});

watchEffect(() => {
	document.title = t("title");
});

</script>

<template>
	<main>
		<FilterComponent />
		<ServicesList />
	</main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1 0 auto;
}
</style>../stores/searchStore.js