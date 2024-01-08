import { loadLocalization, updateStaticLocalizations } from './localization.js';
import { AutoCompleteInput, ViewBuilder } from './view-builder.js';
import { loadServices } from './db.js';
import { Constants } from './constants.js';

let servicesData = [];
let localizationData = {};

/** Listeners */

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
    servicesData = sortServices(servicesData);
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
    uniqueAvailableTags.sort();
    new AutoCompleteInput(
      'tags-autocomplete',
      uniqueAvailableTags,
      viewBuilder.getSelectedTags,
      viewBuilder.selectTag
    );

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
        renderServices('');
        cleanSearchButton.style.display = 'none';
    });

    updateStaticLocalizations(localizationData);
    renderServices(searchValue);
});

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', function() {
    localStorage.setItem('selectedTags', JSON.stringify(null));
    renderServices();
});

// Add event listener for the search box
document.getElementById('search-box').addEventListener('input', function(event) {
    renderServices(event.target.value);
});

// Add event listeners for the sorting services
document.getElementById('sort-by-name-asc').addEventListener('click', function() {
    const constants = new Constants();
    localStorage.setItem('sortingOrder', constants.sortindByNameAsc);
    renderServices();
});

document.getElementById('sort-by-name-desc').addEventListener('click', function() {
    const constants = new Constants();
    localStorage.setItem('sortingOrder', constants.sortindByNameDesc);
    renderServices();
});

document.getElementById('sort-by-date-asc').addEventListener('click', function() {
    const constants = new Constants();
    localStorage.setItem('sortingOrder', constants.sortindByDateAsc);
    renderServices();
});

document.getElementById('sort-by-date-desc').addEventListener('click', function() {
    const constants = new Constants();
    localStorage.setItem('sortingOrder', constants.sortindByDateDesc);
    renderServices();
});

/** Functions */

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
    renderServices();
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

function renderServices(searchValue) {
    let searchBox = document.querySelector('#search-box');
    if (searchValue || searchValue === '') {
        searchBox.value = searchValue.toLowerCase();
    }

    servicesData = sortServices(servicesData);
    let viewBuilder = new ViewBuilder(servicesData, localizationData);
    viewBuilder.displayServices(searchBox.value);
}

function sortServices(services) {
    document.getElementById('sort-by-name-asc').className = '';
    document.getElementById('sort-by-name-desc').className = '';
    document.getElementById('sort-by-date-asc').className = '';
    document.getElementById('sort-by-date-desc').className = '';
    const constants = new Constants();
    const sortingOrder = 
        localStorage.getItem('sortingOrder') || 
        constants.sortindByDateDesc; // default sorting order

    if(sortingOrder === constants.sortindByNameAsc) {
        services = services.sort((a, b) => a.name.localeCompare(b.name));
        document.getElementById('sort-by-name-asc').className = 'hovered';
    } else if(sortingOrder === constants.sortindByNameDesc) {
        services = services.sort((a, b) => b.name.localeCompare(a.name));
        document.getElementById('sort-by-name-desc').className = 'hovered';
    } else if(sortingOrder === constants.sortindByDateAsc) {
        services = services.sort((a, b) => a.date.localeCompare(b.date));
        document.getElementById('sort-by-date-asc').className = 'hovered';
    } else if(sortingOrder === constants.sortindByDateDesc) {
        services = services.sort((a, b) => b.date.localeCompare(a.date));
        document.getElementById('sort-by-date-desc').className = 'hovered';
    } else {
        document.getElementById('sort-by-date-desc').className = 'hovered';
    }

    return services;
}

