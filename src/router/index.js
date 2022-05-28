import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'muLib',
    component: () => import('../views/muLibList.vue'),
    meta:{
      keepAlive: true
    }

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

    component: () => import('../views/detailList.vue'),
    meta:{
      keepAlive: true
    }
    
  },
  {
    path: '/search',
    name: 'search',

    component: () => import('../views/searchList.vue'),
    meta:{
      keepAlive: true
    }
  },
  {
    path:'/dailySongs',
    name: 'dailySongs',
    component: () => import('../views/dailySongs.vue'),
    meta:{
      keepAlive: true
    }

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
