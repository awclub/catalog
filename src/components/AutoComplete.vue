<script>
export default {
  name: 'AutoCompleteInput',
  props: {
    placeholder: String,
    availableItems: Array,
    alreadySelectedItems: Array,
    onSelect: Function
  },
  data() {
    return ({
      inputValue: '',
      filteredItems: [],
      currentFocus: -1,
      showList: false
    });
  },
  methods: {
    filterItems() {
      const value = this.inputValue.toLowerCase();
      this.filteredItems = this.availableItems.filter(
          item => item.toLowerCase().startsWith(value) && !this.alreadySelectedItems.includes(item)
      );
      this.showList = true;
    },
    highlightItem(item) {
      const match = this.inputValue;
      return `<strong>${item.substring(0, match.length)}</strong>${item.substring(match.length)}`;
    },
    navigateItems(event) {
      if (event.key === 'ArrowDown') {
        this.currentFocus = (this.currentFocus + 1) % this.filteredItems.length;
      } else if (event.key === 'ArrowUp') {
        this.currentFocus = (this.currentFocus + this.filteredItems.length - 1) % this.filteredItems.length;
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.currentFocus > -1) {
          this.selectItem(this.filteredItems[this.currentFocus]);
        }
      }
    },
    selectItem(item) {
      this.$emit('item-selected', item);
      this.inputValue = '';
      this.filteredItems = [];
      this.onSelect(item);
      this.showList = false;
    },
    showItems() {
      this.filterItems();
    },
    resetResult() {
      this.filteredItems = [];
      this.showList = false;
    }
  },
  watch: {
    inputValue(newValue) {
      if (!newValue) {
        this.filteredItems = [];
        this.showList = false;
      }
    }
  }
};
</script>

<template>
  <div class="autocomplete" v-click-outside="this.resetResult">
    <input
        class="text-input autocomplete-input"
        type="text"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="filterItems"
        @keydown="navigateItems"
        @click="showItems"
    />
    <div class="autocomplete-items" v-if="showList">
      <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="autocomplete-item"
          :class="{'autocomplete-active': currentFocus === index}"
          v-html="highlightItem(item)"
          @click="selectItem(item)"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Style the input and autocomplete container */
.autocomplete {
  position: relative;
  display: inline-block;
}

/* Style the items (options) */
.autocomplete-items {
  position: absolute;
  box-sizing: border-box;
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px none #d4d4d455;
  border-left-style: solid;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-item {
  padding: 8px;
  cursor: pointer;
  color: var(--autocomplete-item-text-color);
  background-color: var(--autocomplete-item-bg-color);
  border-bottom: 1px dashed #d4d4d435;
}

.autocomplete-item:hover {
  background-color: var(--autocomplete-item-bg-color-hover);
  color: var(--autocomplete-item-text-color-hover);
}

/* When navigating through the items using the arrow keys */
.autocomplete-active {
  background-color: var(--autocomplete-item-bg-color-active) !important;
  color: var(--autocomplete-item-text-color-active);
}
</style>