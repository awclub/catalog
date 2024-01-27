<script setup>
import { RouterLink } from 'vue-router';
import Sharing from "../components/Sharing.vue";
import TagList from "../components/TagList.vue";
import { localDateFilter } from "../filters/localDateFilter.js";
import { useBrowserLocation } from "@vueuse/core";
import { useTagsStore } from "../stores/tagsStore.js";

defineProps({
	serviceItem: Object,
})

const tagsStore = useTagsStore();
const location = useBrowserLocation();

const formattedUrl = function (url) {
	return url.substring(0, 5);
}
</script>

<template>
	<div class="service-item">
		<Sharing
			:url="`${location.origin}/catalog/${formattedUrl(serviceItem.id)}`"
			class="sharing-positioning"
			:close-delay="3000"
		/>
		<RouterLink :to="`${formattedUrl(serviceItem.id)}`">
			<h3>{{ serviceItem.name }}</h3>
		</RouterLink>

		<a
			:href="serviceItem.url"
			type="button"
			class="open-in-new-tab"
			title="Open in new tab"
			target="_blank"
		>
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 122.88 115.71" 
				width="16"
				height="16"
			>
				<path 
					d="M116.56,3.69l-3.84,53.76l-17.69-15c-19.5,8.72-29.96,23.99-30.51,43.77c-17.95-26.98-7.46-50.4,12.46-65.97 L64.96,3L116.56,3.69L116.56,3.69z M28.3,0h14.56v19.67H32.67c-4.17,0-7.96,1.71-10.72,4.47c-2.75,2.75-4.46,6.55-4.46,10.72 l-0.03,46c0.03,4.16,1.75,7.95,4.5,10.71c2.76,2.76,6.56,4.48,10.71,4.48h58.02c4.15,0,7.95-1.72,10.71-4.48 c2.76-2.76,4.48-6.55,4.48-10.71v-6.96h17.01v11.33c0,7.77-3.2,17.04-8.32,22.16c-5.12,5.12-12.21,8.32-19.98,8.32H28.3 c-7.77,0-14.86-3.2-19.98-8.32C3.19,102.26,0,95.18,0,87.41l0.03-59.1C0,20.52,3.19,13.43,8.31,8.31C13.43,3.19,20.51,0,28.3,0 L28.3,0z"
				/>
			</svg>
		</a>

		<p>{{ serviceItem.description[$i18n.locale] }}</p>
		<p>
			{{ $t('mentionedIn') }}:
			<a
				v-for="mention in serviceItem.mentions"
				:key="mention.episodeName"
				:href="mention.episodeUrl"
				target="_blank"
			>
				{{ mention.episodeName }}
			</a>
		</p>
		<TagList
			:items="serviceItem.tags"
			:on-tag-click="tagsStore.selectTag"
		/>
		<div class="date">
			{{ localDateFilter(serviceItem.date, $i18n.locale) }}
		</div> <!-- Добавляем дату -->
	</div>
</template>

<style scoped>
.service-item {
    position: relative;
    border: 1px solid var(--service-item-border-color);
    border-radius: 10px;
    padding: 5px 25px 25px 25px;
    background-color: var(--service-item-bg-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    @media screen and (max-width: 640px) {
        width: 100%;
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

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.sharing-positioning {
    position: absolute;
    right: 10px;
    top: 10px;
}

.open-in-new-tab {
    margin: 0 0 0 5px;
    cursor: pointer;
	position: relative;
}

.open-in-new-tab svg {
	position: absolute;
	bottom: 3px;
    right: -22px;
    transition: 0.3s;
    color: var(--copy-to-clipboard-btn-color);
	filter: invert(42%) sepia(39%) saturate(0%) hue-rotate(318deg) brightness(93%) contrast(95%);
}

.open-in-new-tab:hover svg {
    filter: invert(81%) sepia(2%) saturate(10%) hue-rotate(42deg) brightness(102%) contrast(95%);
}
</style>../filters/localDateFilter.js../stores/tagsStore.js