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
    }

    buildServiceItemElement(service) {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-item';
        serviceElement.innerHTML = `
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
        service.url.toLowerCase().includes(searchTerm);
    }
}

export class AutoCompleteInput {

    constructor(
      elementId,
      availableItems = [],
      selectedItemsCallback = () => [],
      onItemSelect = () => {}
    ) {
        this.elementId = elementId;
        this.availableItems = availableItems;
        this.selectedItemsCallback = selectedItemsCallback;
        this.container = document.getElementById(elementId);
        this.input = this.container.querySelector('.autocomplete-input');
        this.listContainer = this.container.querySelector('.autocomplete-items');
        this.onItemSelect = onItemSelect;
        this.currentFocus = -1;
        this._init();
    }

    _init() {
        // listener for text input
        this.input.addEventListener('input', (event) => {
            this.hideSearchResult();
            const value = event.target.value;
            if (!value) return false;
            this.currentFocus = -1;
            const matchedItems = this.getAvailableToSelectItems()
              .filter(item => item.substring(0, value.length).toLowerCase() === value.toLowerCase())
              .map(item => this.buildAvailableItem(item, value.length));
            this.listContainer.replaceChildren(...matchedItems);
        });

        // control by selected item
        this.input.addEventListener('keydown', (event) => {
            const items = this.listContainer.getElementsByTagName('div');
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.currentFocus++;
                this.addActive(items);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.currentFocus--;
                this.addActive(items);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                items[this.currentFocus]?.click();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                this.hideSearchResult();
                this.clearInputField();
            }
        });

        this.input.addEventListener('click', (event) => {
            event.stopPropagation();
            this.applyInputFilter(event.target.value);
        });

        // click outside "available items" block
        document.addEventListener("click", (event) => {
            const container = document.getElementById(this.elementId)
              .querySelector('.autocomplete-items');
            if (!container.contains(event.target)) {
                this.hideSearchResult();
            }
        });
    }

    applyInputFilter(inputValue) {
        const items = this.getAvailableToSelectItems()
          .filter(item => item.substring(0, inputValue.length).toLowerCase() === inputValue.toLowerCase());
        if (items.length) {
            const listItems = items
              .map(item => this.buildAvailableItem(item, inputValue.length));
            this.listContainer.replaceChildren(...listItems);
            this.listContainer.style.display = 'block';
        } else {
            this.hideSearchResult();
        }
    }

    getAvailableToSelectItems() {
        const alreadySelected = this.selectedItemsCallback();
        return this.availableItems
          .filter(item => !alreadySelected.includes(item));
    }

    addActive(items = []) {
        if (!items.length) return;
        this.removeActive(items);
        this.currentFocus = (this.currentFocus + items.length) % items.length;
        items[this.currentFocus].classList.add('autocomplete-active');
    }

    removeActive(items = []) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('autocomplete-active');
        }
    }

    hideSearchResult() {
        this.currentFocus = -1;
        this.listContainer.innerHTML = '';
        this.listContainer.style.display = 'hidden';
    }

    clearInputField() {
        this.input.value = '';
    }

    buildAvailableItem(item, length) {
        const element = document.createElement('div');
        element.className = 'autocomplete-item';
        element.innerHTML = `<strong>${ item.substring(0, length) }</strong>${ item.substring(length) }`;
        element.addEventListener("click", (e) => {
            this.onItemSelect(item)();
            this.hideSearchResult();
            this.clearInputField();
        });
        return element;
    }

}