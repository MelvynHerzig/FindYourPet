import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'
import i18n from './i18n'

createApp(App).use(i18n).use(router).use(VueCookies).mount('#app')
