<script setup>
import DarkModeSwitcher from "../components/DarkModeSwitcher.vue";
import LocaleChanger from "../components/LocaleSwitcher.vue";
import ServicesOrderSelector from "../components/ServicesOrderSelector.vue";
</script>

<template>
	<div class="settings-menu">
		<button id="settings-button">
			<span class="material-symbols-outlined">settings</span>
		</button>
		<div class="settings-content">
			<LocaleChanger />
			<DarkModeSwitcher />
			<ServicesOrderSelector />
		</div>
	</div>
</template>

<style>

.settings-menu {
  position: relative;
  display: inline-block;
}

.settings-menu:hover .settings-content {
  display: block;
  animation: fadeIn 0.3s;
}

#settings-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  width: 150px;
  text-align: right;
}

.settings-content {
  display: none;
  position: absolute;
  background-color: var(--button-bg-color);
  min-width: 170px;
  font-weight: bold;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  border-radius: 5px;
  padding: 10px;
  top: 100%;
  transition: all 0.3s ease-in-out;
}

.settings-content button {
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border: none;
  text-align: left;
  width: 100%;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-size: 1em;
  cursor: pointer;
}

.settings-content button:hover {
  border-left: 4px solid var(--link-color);
}

@media screen and (max-width: 814px) {

  .settings-menu {
    position: absolute;
    display: inline-block;
    top: 3px;
    right: 3px;
  }

  #settings-button {
    width: 80px;
  }

  .selected-tags-box {
    margin-left: 0px !important;
  }
}

</style>