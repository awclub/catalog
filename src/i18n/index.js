import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  // default locale
  locale: localStorage.getItem('currentLanguage'),
  globalInjection: true,
  // translations
  messages: {
    en: {
        title: "AI tools catalog by",
        searchPlaceholder: "Search by name & description...",
        mentionedIn: "Mentioned in",
        githubCodeLinkText: "Code on GitHub",
        podcastChatLinkText: "Podcast chat",
        podcastLinkText: "AIA Podcast",
        searchTagsPlaceholder: "Search by tags...",
        shareResult: "Copied to clipboard"
    },
    ru: {
        title: "Каталог ИИ-сервисов от",
        searchPlaceholder: "Поиск по названию и описанию...",
        mentionedIn: "Упомянут в",
        githubCodeLinkText: "Код на GitHub",
        podcastChatLinkText: "Чат подкаста",
        podcastLinkText: "AIA Podcast",
        searchTagsPlaceholder: "Поиск по тегам...",
        shareResult: "Ссылка скопирована"
    },
  },
});


export default i18n