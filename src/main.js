import { createApp } from 'vue'
import vueApp from './App.vue'
import router from './router'
// import VueLazyload from 'vue3-lazyload'

const app = createApp(vueApp).use(router).mount('#app')
// .use(VueLazyload,{
//     preLoad: 3,
//     attempt: 3
// })
export default app