import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {createRouter,createWebHashHistory} from 'vue-router'

let vueApp = createApp(App)

import routes from './router/index.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

vueApp.use(router)

vueApp.mount('#app')

export default vueApp
