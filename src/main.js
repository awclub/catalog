import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { clickOutsideDirective } from "./directives/clickOutsideDirective.js";

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.directive('clickOutside', clickOutsideDirective);

app.mount('#app')
