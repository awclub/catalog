export async function loadLocalization(currentLanguage) {
    const response = await fetch(`localization/${currentLanguage}.json`);
    return await response.json();
}

export function updateStaticLocalizations(localization) {
    document.getElementById('search-box').placeholder = localization.searchPlaceholder;
    document.getElementById('title').textContent = localization.headerTitle;
    document.getElementById('header').textContent = localization.headerTitle;
    document.getElementById('podcast-link').textContent = localization.podcastLinkText;
    document.getElementById('podcast-chat-link').textContent = localization.podcastChatLinkText;
    document.getElementById('github-code-link').textContent = localization.githubCodeLinkText;
    document.title = localization.headerTitle;
}