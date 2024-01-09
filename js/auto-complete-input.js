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