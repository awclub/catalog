<template>
<div class="locale-changer">
    <select v-model="$i18n.locale">
    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
    </option>
    </select>
</div>
</template>

<script>
export default {
name: 'locale-changer',
data () {
    return { langs: ['ru', 'en'] }
}
}
</script>