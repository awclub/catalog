export async function loadLocalization(currentLanguage) {
    const response = await fetch(`localization/${currentLanguage}.json`);
    return await response.json();
}

export function updateLocalization(localization) {
    document.getElementById('search-box').placeholder = localization.searchPlaceholder;
    document.getElementById('lang-switch').textContent = localization.langSwitch;
    document.getElementById('title').textContent = localization.headerTitle;
    document.getElementById('header').textContent = localization.headerTitle;
    document.title = localization.headerTitle;
}