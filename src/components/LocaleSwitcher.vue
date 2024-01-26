<script setup>
import { useCurrentLangService } from "../stores/currentLangService.js";

const currentLangService = useCurrentLangService();

</script>

<template>
	<button
		v-if="$i18n.locale === 'ru'"
		class="lang-switch"
		@click="() => currentLangService.setCurrentLang('en')"
	>
		🌐 English
	</button>
	<button
		v-else-if="$i18n.locale === 'en'"
		class="lang-switch"
		@click="() => currentLangService.setCurrentLang('ru')"
	>
		🌐 Русский
	</button>
</template>

<style scoped>

</style>