import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue3-lazyload'

createApp(App).use(VueLazyload,{
    preLoad: 3,
    error: './icon/bug-fill.svg',
    loading: './icon/image-alt.svg',
    attempt: 3
}).use(router).mount('#app')