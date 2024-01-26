<script setup>
import { computed } from 'vue'
import { useServicesStore } from '../stores/services';
import { onBeforeMount } from "vue"
import { localDateFilter } from "../filter/local-date-filter.js";

const servicesStore = useServicesStore();

const getCurrentService = computed(() => {
	return servicesStore.getCurrentService
})

const props = defineProps({
	itemId: String,
	langCode: String
})

onBeforeMount(() => {
	servicesStore.fetchService(props.itemId)
})
</script>

<template>
	<div
		v-if="getCurrentService.name"
		class="service-item"
	>
		{{ currentLang }}
		<a
			:href="getCurrentService.url"
			target="_blank"
		>
			<h3>{{ getCurrentService.name }}</h3>
		</a>
		<p>{{ getCurrentService.description[$i18n.locale] }}</p>
		<p>
			{{ $t('mentionedIn') }}:
			<a
				v-for="mention in getCurrentService.mentions"
				:key="mention.episodeName"
				:href="mention.episodeUrl"
				target="_blank"
			>
				{{ mention.episodeName }}
			</a>
		</p>
		<div class="tags">
			<span
				v-for="tag in getCurrentService.tags"
				:key="tag"
				class="tag"
			>{{ tag }}</span>
		</div>
		<div class="date">
			{{ localDateFilter(getCurrentService.date, $i18n.locale) }}
		</div>
	</div>
</template>

<style scoped>
.service-item {
	position: relative;
	border: 1px solid var(--service-item-border-color);
	border-radius: 10px;
	margin: 10px;
	padding: 10px 25px 25px 25px;
	background-color: var(--service-item-bg-color);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s;

	@media screen and (max-width: 640px) {
		margin: 10px 0;
	}
}

.service-item h3 {
	margin: 10px 0 0 0;
	padding: 0;
	font-size: 1.2em;
	display: inline-block;
	font-weight: bold;
}

.date {
	position: absolute;
	right: 5px;
	bottom: 5px;
	color: rgb(128, 128, 128)
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

p {
	display: block;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
}
</style>

