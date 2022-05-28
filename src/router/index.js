import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'muLib',
    component: () => import('../views/muLibList.vue')

  },
  {
    path: '/found',
    name: 'muFound',

    component: () => import('../views/muFound.vue')
  },
  {
    path: '/loginUser',
    name: 'loginUser',

    component: () => import('../views/loginUser.vue')
  },
  {
    path: '/playlist/detail',
    name: 'detail',

    component: () => import('../views/detailList.vue')
  },
  {
    path: '/search',
    name: 'search',

    component: () => import('../views/searchList.vue')
  },
  {
    path:'/dailySongs',
    name: 'dailySongs',
    component: () => import('../views/dailySongs.vue')

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
