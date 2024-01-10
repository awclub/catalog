import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'en',
  globalInjection: true,
  // translations
  messages: {
    en: {
        title: "AI tools catalog by AIA Podcast",
        header: "AI tools catalog by <a id=\"podcast-name\" target=\"_blank\" href=\"https://itbeard.com/aia\">AIA Podcast</a> <a id=\"aw-club\"  target=\"_blank\" href=\"https://aw.club\">&  Anywhere Club</a>",
        searchPlaceholder: "Search by name & description...",
        mentionedIn: "Mentioned in",
        githubCodeLinkText: "Code on GitHub",
        podcastChatLinkText: "Podcast chat",
        podcastLinkText: "AIA Podcast",
        searchTagsPlaceholder: "Search by tags..."
    },
    ru: {
        title: "Каталог ИИ-сервисов от AIA Podcast",
        header: "Каталог ИИ-сервисов от <a id=\"podcast-name\" target=\"_blank\" href=\"https://itbeard.com/aia\">AIA Podcast</a> <a id=\"aw-club\"  target=\"_blank\" href=\"https://aw.club\">&  Anywhere Club</a>",
        searchPlaceholder: "Поиск по названию и описанию...",
        mentionedIn: "Упомянут в",
        githubCodeLinkText: "Код на GitHub",
        podcastChatLinkText: "Чат подкаста",
        podcastLinkText: "AIA Podcast",
        searchTagsPlaceholder: "Поиск по тегам..."
    },
  },
})


export default i18n