<script setup>
import { computed } from 'vue'
import ServiceItem from './ServiceItem.vue'
import { useServicesStore } from '../stores/services';
import { onBeforeMount } from "vue"
import { useServicesFilter } from "@/service/servicesFilter.js";

const servicesStore = useServicesStore();
const servicesFilter = useServicesFilter();

onBeforeMount(() => {
  servicesStore.fetchData()
 })

const services = computed(() => {
  return servicesFilter.applyFilter(servicesStore.getServices);
})
</script>

<template>
  <div v-if="services.length" class="services-list">
    <ServiceItem
      v-for='service in services'
      :key='service.id'
      :serviceItem='service'
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