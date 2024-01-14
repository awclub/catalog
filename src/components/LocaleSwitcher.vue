<script setup>
import i18n from "@/i18n/index.js";

const switchLang = (lang) => {
    i18n.global.locale = lang
}

</script>

<template>
  <button
      v-if="$i18n.locale === 'ru'"
      class="lang-switch"
      v-on:click="() => switchLang('en')"
  >🌐 English</button>
  <button
      v-else-if="$i18n.locale === 'en'"
      class="lang-switch"
      v-on:click="() => switchLang('ru')"
  >🌐 Русский</button>
</template>

<style scoped>

</style>