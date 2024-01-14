<script setup>
import ItemsList from '../components/ItemsList.vue'
import FilterComponent from "@/components/FilterComponent.vue";
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
}
</style>