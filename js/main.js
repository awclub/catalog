let currentLanguage = 'ru';
let appUrl = 'https://awclub.github.io/catalog/';
let servicesData = [];
let localization = {};
let selectedTags = [];

document.addEventListener('DOMContentLoaded', async function() {
    await loadLocalization();
    await loadServices();
    document.getElementById('lang-switch').addEventListener('click', toggleLanguage);

    // Получаем параметры URL
    const urlParams = new URLSearchParams(window.location.search);

    // Проверяем, есть ли параметр search
    if (urlParams.has('search')) {
        let searchValue = decodeURIComponent(urlParams.get('search'));// Заменяем все вхождения %2F на /

        // Находим поле поиска и устанавливаем значение
        let searchBox = document.querySelector('#search-box');
        searchBox.value = searchValue;
        displayServices(searchValue);
    }
});

async function loadServices() {
    try {
        
        const response = await fetch(`data/services.json?${new Date().getTime()}`);
        servicesData = await response.json();
        displayServices();
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

async function loadLocalization() {
    const response = await fetch(`lang/${currentLanguage}.json`);
    localization = await response.json();
}

function updateLocalization() {
    document.getElementById('search-box').placeholder = localization.searchPlaceholder;
    document.getElementById('lang-switch').textContent = localization.langSwitch;
    document.getElementById('title').textContent = localization.headerTitle;
    document.getElementById('header').textContent = localization.headerTitle;
    document.title = localization.headerTitle;
}

document.getElementById('search-box').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    displayServices(searchTerm);
});

function containsAllTags(service, tags = []) {
    const serviceTags = service.tags
      .map(tag => tag.toLowerCase());

    return tags.every(tag => serviceTags.includes(tag));
}

function isSuitableServiceBySearchTerm(service, searchTerm) {
    return service.name.toLowerCase().includes(searchTerm) ||
      service.description[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.episodeName.toLowerCase().includes(searchTerm) ||
      service.episodeUrl.toLowerCase().includes(searchTerm) ||
      service.url.toLowerCase().includes(searchTerm);
}

function displayServices(searchTerm = '') {
    const servicesList = document.getElementById('services-list');
    const selectedTagsElement = document.getElementById('selectedTags');
    const resetButton = document.getElementById('reset-button');

    servicesList.innerHTML = ''; // Очистка списка
    servicesData.filter(service => isSuitableServiceBySearchTerm(service, searchTerm) && containsAllTags(service, selectedTags))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Сортировка сервисов по дате в обратном порядке
    .forEach(service => {
        servicesList.appendChild(buildServiceItemElement(service));
    });

    // Обновляем отображение выбранного тега и показываем кнопку сброса
    selectedTagsElement.replaceChildren(...buildSelectedTags(selectedTags));
    resetButton.style.display = selectedTags?.length ? 'inline' : 'none';
}

toLocalDateString = function(inputDate) {
    let date = new Date(inputDate);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(currentLanguage, options);
}

// Добавляем обработчик события на кнопку сброса
document.getElementById('reset-button').addEventListener('click', function() {
    selectedTags = [];
    displayServices();
});

// Обновляем обработчик события для строки поиска
document.getElementById('search-box').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    displayServices(searchTerm);
});

async function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    await loadLocalization();
    updateLocalization();
    displayServices(); // Перерисовка списка сервисов с учетом нового языка
}

/**
 * @param tagName {string}
 * @returns function
 */
function selectTag(tagName) {
    return function () {
        if (!selectedTags.includes(tagName)) {
            selectedTags = [ ...selectedTags, tagName ];
        }
        displayServices();
    }
}

/**
 * @param tagName {string}
 * @returns function
 */
function unSelectTag(tagName) {
    return function () {
        selectedTags = selectedTags.filter(tag => tag !== tagName);
        displayServices();
    };
}

/////////////// HTML element builders ///////////////
/**
 * @param service {{
 *    url: string,
 *    name: string,
 *    description: string,
 *    mentionedIn: string,
 *    episodeUrl: string,
 *    episodeName: string,
 *    date: string,
 *    tags: string[]
 *  }}
 * @returns {HTMLDivElement}
 */
function buildServiceItemElement(service) {
    const serviceElement = document.createElement('div');
    serviceElement.className = 'service-item';
    serviceElement.innerHTML = `
        <a href="${service.url}" target="_blank"><h3>${service.name}</h3></a>
        <p>${service.description[currentLanguage]}</p>
        <p>
            ${localization.mentionedIn}: <a href="${service.episodeUrl}" target="_blank">${service.episodeName}</a>
        </p>
        <div id="tagGroupPlaceholder"></div>
        <div class="date">${toLocalDateString(service.date)}</div> <!-- Добавляем дату -->
    `;
    serviceElement.querySelector("#tagGroupPlaceholder")
      .replaceWith(buildTagGroupElement(service.tags, selectTag));
    return serviceElement;
}

/**
 * @param tags {string[]}
 * @param tagCallback {(string) => function }
 * @returns {HTMLDivElement}
 */
function buildTagGroupElement(tags, tagCallback = () => {}) {
    const tagGroupElement = document.createElement('div');
    tagGroupElement.className = 'tags';
    tagGroupElement.innerHTML = '<div id="tagsPlaceholder"></div>';
    tagGroupElement.querySelector('#tagsPlaceholder')
      .replaceWith(...tags.map(tag => buildTagItemElement(tag, tagCallback)));
    return tagGroupElement;
}

/**
 * @param tags {string[]}
 * @returns {HTMLSpanElement[]}
 */
function buildSelectedTags(tags = []) {
    return tags.map(tag => buildTagItemElement(tag, unSelectTag));

}

/**
 * @param tagName {string}
 * @param tagCallback {(string) => function }
 * @returns {HTMLSpanElement}
 */
function buildTagItemElement(tagName, tagCallback = () => {}) {
    const tagElement =  document.createElement('span');
    tagElement.className = 'tag';
    tagElement.innerText = tagName;
    tagElement.addEventListener('click', tagCallback(tagName));
    return tagElement;
}
