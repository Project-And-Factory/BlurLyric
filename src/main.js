import { createApp } from 'vue'
import vueApp from './App.vue'
import router from './router'
// import VueVirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import VueLazyload from 'vue3-lazyload'

const app = createApp(vueApp).use(router).mount('#app')
// .use(VueLazyload,{
//     preLoad: 3,
//     attempt: 3
// })
export default app


if(import.meta.env.VITE_BLURLYRIC_NETWORK_HTTPS == true){
    let httpsreq = document.createElement('meta')
    httpsreq.setAttribute( 'http-equiv',"Content-Security-Policy")
    httpsreq.setAttribute( 'content',"upgrade-insecure-requests")
    document.head.appendChild(httpsreq)
}