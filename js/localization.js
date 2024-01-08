export async function loadLocalization(currentLanguage) {
    const response = await fetch(`localization/${currentLanguage}.json`);
    return await response.json();
}

export function updateStaticLocalizations(localization) {
    document.getElementById('search-box').placeholder = localization.searchPlaceholder;
    document.getElementById('header').innerHTML = localization.header;
    document.getElementById('podcast-link').textContent = localization.podcastLinkText;
    document.getElementById('podcast-chat-link').textContent = localization.podcastChatLinkText;
    document.getElementById('github-code-link').textContent = localization.githubCodeLinkText;
    document.getElementById('tags-autocomplete-input').placeholder = localization.searchTagsPlaceholder;
    document.getElementById('sorting-legend').textContent = localization.sortingLegend;
    document.getElementById('sort-by-name-namespan').textContent = localization.sortingByNameId;
    document.getElementById('sort-by-date-namespan').textContent = localization.sortingByDateId;
    document.title = localization.title;
}