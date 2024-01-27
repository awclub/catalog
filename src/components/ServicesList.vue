<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import Loader from './Loader.vue'
import ServiceListItem from './service_card/ServiceListItem.vue'
import { useOrderStore } from "../stores/orderStore.js";
import { useServicesFilter } from "../filters/servicesFilter.js";
import { useServicesStore } from '../stores/servicesStore.js';

const servicesStore = useServicesStore();
const servicesFilter = useServicesFilter();
const orderStore = useOrderStore();
const isServicesLoading = ref(true);

const comparator = computed(() => orderStore.getSelectedComparator);

onBeforeMount(async () => {
	await servicesStore.fetchServices();
	isServicesLoading.value = false;
})

const services = computed(() => {
	const filtered = servicesFilter.applyFilter(servicesStore.getServices);
	
	filtered.sort((a, b) => a.name.localeCompare(b.name)); // default sort by Name ASC

	return filtered.sort(comparator.value);
})
</script>

<template>
	<Loader v-if="isServicesLoading" />
	<div
		v-else
		class="services-list"
	>
		<ServiceListItem
			v-for="service in services"
			:key="service.id"
			:service-item="service"
		/>
	</div>
</template>

<style scoped>
  .services-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin: 0 10px;
  }

  @media screen and (max-width: 1100px) {
    .services-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 640px) {
    .services-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>