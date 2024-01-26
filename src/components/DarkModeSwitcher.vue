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
		{{ $t('themeLight') }}
	</button>
	<button
		v-else-if="!isDark"
		@click="toggleDark()"
	>
		{{ $t('themeDark') }}
	</button>
</template>

<style scoped>

</style>