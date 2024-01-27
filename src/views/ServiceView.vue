<script setup>
import ServiceItem from '../components/service_card/ServiceItem.vue'
</script>

<template>
	<main class="main-item">
		<ServiceItem :item-id="$route.params.id" />
	</main>
</template>

<style scoped>
.main-item {
  max-width: 1200px;
  margin: 0 auto;
  flex: 1 0 auto;
  width: 100%;
}
</style>