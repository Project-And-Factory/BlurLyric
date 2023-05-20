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
  } ,
  //
  // {
  //   path: '/loginUser',
  //   name: 'loginUser',

  //   component: () => import('../views/loginUser.vue')
  // },
  ////本代码段已转到components中的login.vue
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
    path: '/album',
    name: 'album',

    component: () => import('../views/album.vue'),
    meta:{
      keepAlive: false
    }
  },
  {
    path:'/dailySongs',
    name: 'dailySongs',
    component: () => import('../views/dailySongs.vue'),
    meta:{
      keepAlive: true
    }

  },
  {
    path:'/setting',
    name: 'setting',
    component: () => import('../views/setting.vue'),
    // meta:{
    //   keepAlive: true
    // }

  },
  {
    path:'/artist',
    name: 'artist',
    component: () => import('../views/artist.vue'),
    meta:{
      keepAlive: false
    }

  },
  {
    path:'/playingList',
    name: 'playingList',
    component: () => import('../views/playingList.vue'),
    meta:{
      keepAlive: false
    }

  },
  {
    path:'/video',
    name: 'video',
    component: () => import('../views/video.vue'),
    meta:{
      keepAlive: false
    }

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
