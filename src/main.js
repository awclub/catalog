import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { clickOutsideDirective } from "./directives/clickOutsideDirective.js";
import i18n from './i18n/index.js'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.directive('clickOutside', clickOutsideDirective);

app.mount('#app')
