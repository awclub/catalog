import { RouterLink } from 'vue-router'

<script setup>
import { useTagsStore } from "@/stores/tags.js";

defineProps({
  serviceItem: Object
})

const tagsStore = useTagsStore();
</script>

<template>
    <div class="service-item">
        <RouterLink :to="`catalog/${serviceItem.id}`"><h3>{{ serviceItem.name }}</h3></RouterLink>
        <p>{{ serviceItem.description[$i18n.locale] }}</p>
        <p>
            {{ $t('mentionedIn') }}:
            <a
                v-for='mention in serviceItem.mentions' 
                :key='mention.episodeName' 
                :href='mention.episodeUrl' 
                target="_blank"
            >
            {{ mention.episodeName }}
            </a>
        </p>
        <div class="tags">
            <span v-for='tag in serviceItem.tags' :key='tag' class="tag" v-on:click="() => tagsStore.selectTag(tag)">{{ tag }}</span>
        </div>
        <div class="date">{{ serviceItem.date }}</div> <!-- Добавляем дату -->
    </div>
</template>

<style scoped>
.service-item {
    position: relative;
    border: 1px solid var(--service-item-border-color);
    border-radius: 10px;
    padding: 10px 25px 25px 25px;
    background-color: var(--service-item-bg-color);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

