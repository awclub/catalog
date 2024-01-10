<script setup>
import { computed } from 'vue'
import ServiseItem from './ServiceItem.vue'
import { useServicesStore } from '../stores/services';
import { onBeforeMount } from "vue"

const servicesStore = useServicesStore();

onBeforeMount(() => {
  servicesStore.fetchData()
 })

const getServices = computed(() => {
  return servicesStore.getServices
})
</script>

<template>
  <div v-if="getServices.length" class="services-list">
    <ServiseItem 
      v-for='gettersService in getServices' 
      :key='gettersService.id'
      :serviceItem='gettersService'
    />
  </div>
</template>

<style scoped>
  .services-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>