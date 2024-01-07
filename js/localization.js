export async function loadLocalization(currentLanguage) {
    const response = await fetch(`localization/${currentLanguage}.json`);
    return await response.json();
}

export function updateStaticLocalizations(localization) {
    document.getElementById('search-box').placeholder = localization.searchPlaceholder;
    document.getElementById('title').textContent = localization.title;
    document.getElementById('header').innerHTML = localization.header;
    document.getElementById('podcast-link').textContent = localization.podcastLinkText;
    document.getElementById('podcast-chat-link').textContent = localization.podcastChatLinkText;
    document.getElementById('github-code-link').textContent = localization.githubCodeLinkText;
    document.getElementById('reset-button').innerText = localization.resetButtonText;
    document.title = localization.headerTitle;
}