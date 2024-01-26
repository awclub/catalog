<script setup>
import { useTagsStore } from "@/stores/tags.js";

defineProps({
	items: Array,
	onTagClick: Function
})

const tagsStore = useTagsStore();
</script>

<template>
	<div class="tags">
		<span
			v-for="tag in items"
			:key="tag"
			class="tag"
			@click="() => onTagClick(tag)"
		>{{ tag }}</span>
	</div>
</template>

<style scoped>
.tags {
  display: inline-block;
}

.tag {
  display: inline-block;
  background-color: var(--tag-bg-color);
  color: var(--tag-text-color);
  font-size: 1em;
  border-radius: 3px;
  padding: 2px 7px;
  margin: 2px 6px 2px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
</style>