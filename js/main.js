import { loadLocalization, updateLocalization } from './localization.js';
import { ViewBuilder } from './view-builder.js';
import { loadServices } from './db.js';

let currentLanguage = 'ru';
let servicesData = [];
let localization = {};

// On document loaded
document.addEventListener('DOMContentLoaded', async function() {
    localization = await loadLocalization(currentLanguage);
    servicesData = await loadServices();
    let viewBuilder = new ViewBuilder(servicesData, currentLanguage, localization);
    document.getElementById('lang-switch').addEventListener('click', toggleLanguage);

    // set theme
    let themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', toggleTheme);
    let savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

    // "search" param processing
    let urlParams = new URLSearchParams(window.location.search);
    let searchValue = '';
    if (urlParams.has('search')) {
        searchValue = decodeURIComponent(urlParams.get('search'));
        let searchBox = document.querySelector('#search-box');
        searchBox.value = searchValue;
    }

    viewBuilder.displayServices(searchValue);
});

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', function() {
    let searchBox = document.querySelector('#search-box');
    localStorage.setItem('selectedTags', JSON.stringify(null));
    let viewBuilder = new ViewBuilder(servicesData, currentLanguage, localization);
    viewBuilder.displayServices(searchBox.value);
});

// Add event listener for the search box
document.getElementById('search-box').addEventListener('input', function(event) {
    let searchValue = event.target.value.toLowerCase();
    let viewBuilder = new ViewBuilder(servicesData, currentLanguage, localization);
    viewBuilder.displayServices(searchValue);
});

async function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    await loadLocalization(localization, currentLanguage);
    updateLocalization(localization);
    let viewBuilder = new ViewBuilder(servicesData, currentLanguage, localization);
    viewBuilder.displayServices(searchValue);
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

