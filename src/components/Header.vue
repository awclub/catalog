<script setup>
import { RouterLink } from 'vue-router';
import Settings from "./settings/Settings.vue";
import { computed } from 'vue'
import { useServicesCounterStore } from '../stores/servicesCounterStore.js';

defineProps({
	msg: {
		type: String,
		required: false
	}
});

const servicesCounterStore = useServicesCounterStore();
const servicesCount = computed(() =>  servicesCounterStore.getCount);

</script>

<template>
	<header>
		<div class="container">
			<div class="title-container">
				<RouterLink to="/">
					<img
						alt="Vue logo"
						class="logo"
						src="../../public/logo.png"
						width="70"
						height="70"
					>
				</RouterLink>
				<h1 class="title">
					{{ $t('header') }}
					<a
						id="podcast-name"
						target="_blank"
						href="https://itbeard.com/aia"
					>AIA Podcast</a> 
					<a
						id="aw-club"
						target="_blank"
						href="https://aw.club"
					>&  Anywhere Club</a>
				</h1>
			</div>
			<Settings />
			<div
				v-if="servicesCount"
				class="services-count"
			>
				{{ servicesCount }}
			</div>
		</div>
	</header>
</template>

<style scoped>
header {
    padding: 10px;
    text-align: center;
    max-width: 1200px;
    margin: 10px auto 0px auto;
    transition: background-color 0.3s;
    width: 100%;
    position: relative;
}

.container {
    background-color: var(--header-bg-color);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}

.logo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
}

.title-container {
    display: flex;
    align-items: center;
    text-align: left;
}

.title-container img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
    display: block;
}

.title-container .title {
    margin: 0 0 0 5px;
    font-weight: bold;
}

#podcast-name {
    white-space: nowrap;
    color: var(--text-color);;
    border-bottom: 3px dotted var(--text-color);;
    transition: 0.3s;
    font-weight: bold;
}

#podcast-name:hover {
    text-decoration: none;
    color: var(--aw-club-color);
    border-bottom-color: var(--aw-club-color);
}

#aw-club {
    white-space: nowrap;
    color: var(--aw-club-color);
    text-decoration: none;
    transition: color 0.3s;
    margin-left: 7px;
    font-size: 0.5em;
    font-style: italic;
    font-weight: bold;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.services-count {
  position: absolute;
  right: 20px;
  bottom: 15px;
  font-size: 0.9em;
  color: #999;
}

@media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (max-width: 640px) {

  h1.title {
    font-size: 1.5em;
  }
}


</style>