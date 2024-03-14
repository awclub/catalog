<script setup>
import FilterComponent from "../components/search/FilterComponent.vue";
import ServicesList from '../components/ServicesList.vue'
import i18n from '../i18n/index.js'
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useSearchStore } from "../stores/searchStore.js";
import { watchEffect } from 'vue';
import {useTagsStore} from "../stores/tagsStore.js";

const route = useRoute();
const { t } = i18n.global;
const tagsStore = useTagsStore();
const searchStore = useSearchStore();
const { search } = route.query;

onBeforeMount(() => {
	if (search?.length) {
		searchStore.setSearchText(search);
	}

	if (route.query.tags?.length) {
		const tags = route.query.tags.split(',');

		tags.forEach(tag => tagsStore.selectTag(tag));
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
