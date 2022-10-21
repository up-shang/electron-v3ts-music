import Home from '../view/Home.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../view/singer.vue')
  },
  {
    path: '/song',
    name: 'song',
    component: () => import('../view/Song.vue')
  }
]
