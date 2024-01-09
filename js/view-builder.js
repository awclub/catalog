import { toLocalDateString } from './extensions.js';
import { Constants } from './constants.js';

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
        const resetButton = document.getElementById('reset-button');

        servicesList.innerHTML = '';
        this.servicesData
          .filter(service => this.isSuitableServiceBySearchTerm(service, searchTerm, this.currentLanguage) &&
            this.containsAllTags(service.tags))
          .forEach(service => {
              servicesList.appendChild(
                this.buildServiceItemElement(service));
          });

        // Update the display of selected tags and show the reset button
        let selectedTags = JSON.parse(localStorage.getItem('selectedTags'));
        if (selectedTags && selectedTags.length > 0) {
            selectedTagsElement.replaceChildren(...this.buildSelectedTags(selectedTags));
            resetButton.style.display = 'inline';
        } else {
            selectedTagsElement.replaceChildren();
            resetButton.style.display = 'none';
        }

        // Update the display of services count 
        document.getElementById('services-count').textContent = servicesList.children.length;
    }

    /** Buiders */

    buildServiceItemElement(service) {
        let constants = new Constants();
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-item';
        serviceElement.innerHTML = `
            <button type="button" class="copy-to-clipboard">
                ${constants.shareIconSvg}
            </button>
            <span class="info-text"><span></span></span>
            <a href="${service.url}" target="_blank"><h3>${service.name}</h3></a>
            <p>${service.description[this.currentLanguage]}</p>
            <p>
                ${this.localizationData.mentionedIn}: 
                ${service.mentions.map(mention => `<a href="${mention.episodeUrl}" target="_blank">${mention.episodeName}</a>`).join(', ')}
            </p>
            <div class="tagGroupPlaceholder"></div>
            <div class="date">${toLocalDateString(service.date, this.currentLanguage)}</div> <!-- Добавляем дату -->
        `;
        serviceElement.querySelector(".tagGroupPlaceholder")
            .replaceWith(this.buildTagGroupElement(service.tags, this.selectTag));
        serviceElement.querySelector('.copy-to-clipboard')
          .addEventListener('click', () => this.putSearchStringToClipboard(service.id, this.showInfoMessage(serviceElement)));
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

    /** Functions */

    putSearchStringToClipboard(value, callback) {
        const position = window.location.href.indexOf('?');
        const domain = position === -1 ? window.location.href : window.location.href.substring(0, position);
        const serviceId = encodeURIComponent(value).substring(0, 5);
        const url = `${domain}?id=${serviceId}`;
        navigator.clipboard.writeText(url)
          .then(() => callback('Copied!'))
          .catch((e) => {
              callback('Unknown error');
              console.error('error occurred while service url is copied', e);
          });
    }

    showInfoMessage(serviceElement) {
        const tooltip = serviceElement.querySelector('.info-text');
        const infoSpan = tooltip.querySelector('span');
        return (message) => {
            infoSpan.innerText = message;
            tooltip.style.display = 'block';
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.opacity = '0';
            }, 2000);
            setTimeout(() => {
                tooltip.style.display = 'inline-none';
                tooltip.style.opacity = '0';
            }, 3000)
        }
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

    getSelectedTags() {
        return JSON.parse(localStorage.getItem('selectedTags')) || [];
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
        searchTerm = searchTerm.toLowerCase();
        return service.name.toLowerCase().includes(searchTerm) ||
        service.description[currentLanguage].toLowerCase().includes(searchTerm) ||
        service.mentions.some(mention => mention.episodeUrl.toLowerCase().startsWith(searchTerm)) ||
        service.mentions.some(mention => mention.episodeName.toLowerCase().includes(searchTerm)) ||
        service.url.toLowerCase().includes(searchTerm) ||
        service.id.toLowerCase().includes(searchTerm);
    }
}