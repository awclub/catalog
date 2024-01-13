<script setup>
import { useTagsStore } from "@/stores/tags.js";
import TagList from "@/components/TagList.vue";

const tagsStore = useTagsStore();
</script>

<template>
  <TagList :items="tagsStore.tags" :onTagClick="tagsStore.unSelectTag"/>
</template>

<style scoped>

</style>