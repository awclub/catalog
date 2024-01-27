<script setup>
import { useCurrentLangStore } from "../../../stores/currentLangStore.js";

const currentLangStore = useCurrentLangStore();

</script>

<template>
	<button
		v-if="$i18n.locale === 'ru'"
		class="lang-switch"
		@click="() => currentLangStore.setCurrentLang('en')"
	>
		🌐 English
	</button>
	<button
		v-else-if="$i18n.locale === 'en'"
		class="lang-switch"
		@click="() => currentLangStore.setCurrentLang('ru')"
	>
		🌐 Русский
	</button>
</template>

<style scoped>

</style>