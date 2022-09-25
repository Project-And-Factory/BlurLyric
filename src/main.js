import { createApp } from 'vue'
import vueApp from './App.vue'
import router from './router'
import VueLazyload from 'vue3-lazyload'

const app = createApp(vueApp).use(VueLazyload,{
    preLoad: 3,
    attempt: 3
}).use(router).mount('#app')

export default app