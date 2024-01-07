import { toLocalDateString } from './extensions.js';

export class ViewBuilder {
    constructor(servicesData, localizationData) {
        this.servicesData = servicesData;
        this.localizationData = localizationData;
        this.currentLanguage = 
            localStorage.getItem('currentLanguage') ||
            (['ru', 'uk', 'be'].some(lang => navigator.language.startsWith(lang)) ? 'ru' : 'en'); // default language is English
    }


    // Display services processing
    displayServices(searchTerm = '') {
        const servicesList = document.getElementById('services-list');
        const selectedTagsElement = document.getElementById('selected-tags');
        const selectedTagsBoxElement = document.getElementById('selected-tags-box');
        const resetButton = document.getElementById('reset-button');

        servicesList.innerHTML = '';
        this.servicesData.filter(service => 
            this.isSuitableServiceBySearchTerm(service, searchTerm, this.currentLanguage) && 
            this.containsAllTags(service.tags))
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .forEach(service => {
                    servicesList.appendChild(
                        this.buildServiceItemElement(service));
                });

        // Update the display of selected tags and show the reset button
        let selectedTags = JSON.parse(localStorage.getItem('selectedTags'));
        if(selectedTags && selectedTags.length > 0) {
            selectedTagsElement.replaceChildren(...this.buildSelectedTags(selectedTags));
            resetButton.style.display = 'inline';
            selectedTagsBoxElement.style.display ='block';
        } else {
            selectedTagsElement.replaceChildren();
            resetButton.style.display = 'none';
            selectedTagsBoxElement.style.display = 'none';
        }
    }

    buildServiceItemElement(service) {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-item';
        serviceElement.innerHTML = `
            <a href="${service.url}" target="_blank"><h3>${service.name}</h3></a>
            <p>${service.description[this.currentLanguage]}</p>
            <p>
                ${this.localizationData.mentionedIn}: <a href="${service.episodeUrl}" target="_blank">${service.episodeName}</a>
            </p>
            <div class="tagGroupPlaceholder"></div>
            <div class="date">${toLocalDateString(service.date, this.currentLanguage)}</div> <!-- Добавляем дату -->
        `;
        serviceElement.querySelector(".tagGroupPlaceholder")
            .replaceWith(this.buildTagGroupElement(service.tags, this.selectTag));
        return serviceElement;
    }

    buildTagGroupElement(tags, tagCallback = () => {}) {
        const tagGroupElement = document.createElement('div');
        tagGroupElement.className = 'tags';
        tagGroupElement.innerHTML = '<div class="tagsPlaceholder"></div>';
        tagGroupElement.querySelector('.tagsPlaceholder')
        .replaceWith(...tags.map(tag => this.buildTagItemElement(tag, tagCallback)));
        return tagGroupElement;
    }

    buildTagItemElement(tagName, tagCallback = () => {}) {
        const tagElement =  document.createElement('span');
        tagElement.className = 'tag';
        tagElement.innerText = tagName;
        tagElement.addEventListener('click', tagCallback(tagName));
        return tagElement;
    }

    buildSelectedTags(tags = []) {
        return tags.map(tag => this.buildTagItemElement(tag, this.unSelectTag));
    }

    selectTag(tagName) {
        return () => {
            let selectedTags = JSON.parse(localStorage.getItem('selectedTags'));
            if(!selectedTags){
                selectedTags = [tagName];
            }
            else if (!selectedTags.includes(tagName)) {
                selectedTags = [ ...selectedTags, tagName ];
            }
            localStorage.setItem('selectedTags', JSON.stringify(selectedTags));

            // Trigger "displayServices" through the search box "input" event
            let searchBox = document.getElementById('search-box');
            let event = new Event('input', { bubbles: true });
            searchBox.dispatchEvent(event);
        }
    }

    unSelectTag(tagName) {
        return () => {
            let selectedTags = JSON.parse(localStorage.getItem('selectedTags'));
            selectedTags = selectedTags.filter(tag => tag !== tagName);
            localStorage.setItem('selectedTags', JSON.stringify(selectedTags));

            // Trigger "displayServices" through the search box "input" event
            let searchBox = document.getElementById('search-box');
            let event = new Event('input', { bubbles: true });
            searchBox.dispatchEvent(event);
        };
    }

    containsAllTags(serviceTags) {
        let selectedTags = JSON.parse(localStorage.getItem('selectedTags'));
        if(!selectedTags) {
            selectedTags = [];
        }
        serviceTags = serviceTags.map(tag => tag.toLowerCase());
        return selectedTags.every(tag => serviceTags.includes(tag));
    }

    isSuitableServiceBySearchTerm(service, searchTerm, currentLanguage) {
        return service.name.toLowerCase().includes(searchTerm) ||
        service.description[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.episodeName.toLowerCase().includes(searchTerm) ||
        service.episodeUrl.toLowerCase().includes(searchTerm) ||
        service.url.toLowerCase().includes(searchTerm);
    }
}