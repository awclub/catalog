<script setup>
import ItemFull from '../components/ItemFull.vue'
</script>

<template>
  <main class="main-item">
    <ItemFull :itemId="$route.params.id" />
  </main>
</template>

<style scoped>
.main-item {
  max-width: 1200px;
  margin: 0 auto;
}
</style>