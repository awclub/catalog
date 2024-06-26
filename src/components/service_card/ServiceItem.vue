<script setup>
import Loader from '../Loader.vue'
import Sharing from "./components/Sharing.vue";
import { computed } from 'vue'
import { localDateFilter } from "../../filters/localDateFilter.js";
import { onBeforeMount } from "vue"
import { useBrowserLocation } from "@vueuse/core";
import { useServicesStore } from '../../stores/servicesStore.js';
import ServiceRating from "../../components/ServiceRating.vue";

const servicesStore = useServicesStore();
const location = useBrowserLocation();

const service = computed(() => {
	return servicesStore.getService
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
	<Loader v-if="!service.name" />
	<div
		v-else
		class="service-item"
	>
		<div class="service-header">
			<Sharing 
				:url="`${location.href}`"
				class="sharing-positioning"
				:close-delay="3000"
			/>
			<a
				:href="service.url"
				target="_blank"
			>
				<h3>{{ service.name }}</h3>
			</a>
			<ServiceRating :rank="service.rank ?? 0" />
		</div>
		<p>{{ service.description[$i18n.locale] }}</p>
		<p>
			{{ $t('mentionedIn') }}:
			<a
				v-for="mention in service.mentions"
				:key="mention.episodeName"
				:href="mention.episodeUrl"
				target="_blank"
				class="mention-link"
			>
				{{ mention.episodeName }}
			</a>
		</p>
		<div class="tags">
			<span
				v-for="tag in service.tags"
				:key="tag"
				class="tag"
			>{{ tag }}</span>
		</div>
		<div class="date">
			{{ localDateFilter(service.date, $i18n.locale) }}
		</div>
	</div>
</template>

<style scoped>
.service-item {
	position: relative;
	border: 1px solid var(--service-item-border-color);
	border-radius: 10px;
	margin: 10px;
	padding: 12px 25px 25px 25px;
	background-color: var(--service-item-bg-color);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s;
}

.service-item h3 {
	margin: 10px 0 0 0;
	padding: 0;
	font-size: 1.2em;
	display: inline;
	font-weight: bold;
  word-break: break-word;
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

.sharing-positioning {
  float: right;
  border: none !important;
  position: relative;
  right: -12px;
  top: 12px;
}

.mention-link::after {
  content: ",";
	margin-right: 5px;
}

.mention-link:last-child::after {
  content: "";
	margin-right: 0px;
}
</style>