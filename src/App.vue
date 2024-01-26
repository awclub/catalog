<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
	<Header />

	<RouterView />

	<Footer />
</template>

<style>
#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>
