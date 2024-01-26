<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
	<button
		v-if="isDark"
		@click="toggleDark()"
	>
		Light Mode
	</button>
	<button
		v-else-if="!isDark"
		@click="toggleDark()"
	>
		Dark Mode
	</button>
</template>

<style scoped>

</style>