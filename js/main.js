import { loadLocalization, updateStaticLocalizations } from './localization.js';
import { AutoCompleteInput, ViewBuilder } from './view-builder.js';
import { loadServices } from './db.js';

let servicesData = [];
let localizationData = {};

// On document loaded
document.addEventListener('DOMContentLoaded', async function() {
    // set currentLanguage
    let currentLanguage = 
        localStorage.getItem('currentLanguage') || 
        (['ru', 'uk', 'be'].some(lang => navigator.language.startsWith(lang)) ? 'ru' : 'en'); // default language is English
    let langToggleButton = document.getElementById('lang-switch');
    langToggleButton.textContent = currentLanguage === 'ru' ? '🌐 English' : '🌐 Русский';
    langToggleButton.addEventListener('click', toggleLanguage);

    // get data
    localizationData = await loadLocalization(currentLanguage);
    servicesData = await loadServices();
    let viewBuilder = new ViewBuilder(servicesData, localizationData);

    // tags management
    const uniqueAvailableTags = Object.keys(
      servicesData
        .flatMap(service => service.tags)
        .reduce((prev, curr) => {
            prev[curr] = true;
            return prev
        }, {})
    );
    new AutoCompleteInput(
      'tags-autocomplete',
      uniqueAvailableTags,
      viewBuilder.getSelectedTags,
      viewBuilder.selectTag
    );

    // lang switch
    document.getElementById('lang-switch').addEventListener('click', toggleLanguage);

    // set theme
    let siteColorTheme = 
        localStorage.getItem('theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); // default theme is dark
    let themeToggleButton = document.getElementById('theme-toggle');
    document.body.setAttribute('data-theme', siteColorTheme);
    themeToggleButton.addEventListener('click', toggleTheme);
    themeToggleButton.textContent = siteColorTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

    // "search" param processing
    let urlParams = new URLSearchParams(window.location.search);
    let searchValue = '';
    if (urlParams.has('search')) {
        searchValue = decodeURIComponent(urlParams.get('search'));
        let searchBox = document.querySelector('#search-box');
        searchBox.value = searchValue;
    }

    // set search box
    const searchBox = document.getElementById('search-box');
    const cleanSearchButton = document.getElementById('clean-search');

    searchBox.addEventListener('input', () => {
        cleanSearchButton.style.display = searchBox.value ? 'block' : 'none';
    });

    cleanSearchButton.addEventListener('click', () => {
        searchBox.value = '';
        viewBuilder.displayServices(searchBox.value);
        cleanSearchButton.style.display = 'none';
    });

    updateStaticLocalizations(localizationData);
    viewBuilder.displayServices(searchValue);
});

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', function() {
    localStorage.setItem('selectedTags', JSON.stringify(null));

    let searchBox = document.querySelector('#search-box');
    let viewBuilder = new ViewBuilder(servicesData, localizationData);
    viewBuilder.displayServices(searchBox.value);
});

// Add event listener for the search box
document.getElementById('search-box').addEventListener('input', function(event) {
    let searchValue = event.target.value.toLowerCase();
    let viewBuilder = new ViewBuilder(servicesData, localizationData);
    viewBuilder.displayServices(searchValue);
});

async function toggleLanguage() {
    let currentLanguage = localStorage.getItem('currentLanguage')

    // toggle language
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    localizationData = await loadLocalization(currentLanguage);
    updateStaticLocalizations(localizationData);

    // Update button text
    document.getElementById('lang-switch').textContent = currentLanguage === 'ru' ? '🌐 English' : '🌐 Русский';
    // Save currentLanguage preference
    localStorage.setItem('currentLanguage', currentLanguage);

    // Rerender services
    let searchBox = document.querySelector('#search-box');
    let viewBuilder = new ViewBuilder(servicesData, localizationData);
    viewBuilder.displayServices(searchBox.value);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);

    // Update button text
    document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

