import { KEYWORDS } from "../stores/rootFilterStore.js";
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
	// default locale
	locale: localStorage.getItem(KEYWORDS.LANG),
	globalInjection: true,
	legacy: true,
	// translations
	messages: {
		en: {
			title: "AI tools catalog by AIA Podcast & Anywher Club",
			header: "AI tools catalog by",
			searchPlaceholder: "Search by name & description...",
			mentionedIn: "Mentioned in",
			githubCodeLinkText: "Code on GitHub",
			podcastChatLinkText: "Podcast chat",
			podcastLinkText: "AIA Podcast",
			searchTagsPlaceholder: "Search by tags...",
			shareResult: "Copied to clipboard",
			sortingLegend: "Sorting",
			sortingByName: "Name",
			sortingByDate: "Date",
			themeDark: "Dark Theme",
			themeLight: "Light Theme",
		},
		ru: {
			title: "Каталог ИИ-сервисов от AIA Podcast & Anywher Club",
			header: "Каталог ИИ-сервисов от",
			searchPlaceholder: "Поиск по названию и описанию...",
			mentionedIn: "Упомянут в",
			githubCodeLinkText: "Код на GitHub",
			podcastChatLinkText: "Чат подкаста",
			podcastLinkText: "AIA Podcast",
			searchTagsPlaceholder: "Поиск по тегам...",
			shareResult: "Ссылка скопирована",
			sortingLegend: "Сортировка",
			sortingByName: "Имя",
			sortingByDate: "Дата",
			themeDark: "Тёмная тема",
			themeLight: "Светлая тема",
		},
	},
});


export default i18n