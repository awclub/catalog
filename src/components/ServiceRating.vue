<script setup>
defineProps({
	rank: {
		type: Number,
		required: true
	}
});
</script>

<template>
	<div v-if="rank && rank > 0" class="service-rating">
		<span v-for="n in rank" :key="n" class="rank-icon filled">★</span>
		<span v-for="n in (5 - rank)" :key="5-n" class="rank-icon">★</span>
	</div>
</template>

<style scoped>
.service-rating {
  display: flex;
  align-items: center;
  font-size: 1em;
}

.rank-icon {
  color: #ffc107;
  margin-right: 2px;
}

.rank-icon.filled {
  color: #ffc107;
  -webkit-text-stroke: 1px #ffc107;
}

.rank-icon:not(.filled) {
  color: transparent;
  -webkit-text-stroke: 1px #ffc107;
}
</style>