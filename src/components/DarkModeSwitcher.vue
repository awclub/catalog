<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
      v-if="isDark"
      v-on:click="toggleDark()"
  >Light Mode</button>
  <button
      v-else-if="!isDark"
      v-on:click="toggleDark()"
  >Dark Mode</button>
</template>

<style scoped>

</style>