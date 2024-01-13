import { RouterLink } from 'vue-router'

<script setup>
import { useTagsStore } from "@/stores/tags.js";
import TagList from "@/components/TagList.vue";

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
        <TagList :items="serviceItem.tags" :on-tag-click="tagsStore.selectTag"/>
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

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
</style>

