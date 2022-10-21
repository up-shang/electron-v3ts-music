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
    component: () => import('../view/Singer.vue')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../view/Playlist.vue')
  },
  {
    path: '/playlistDetail',
    name: 'playlistDetail',
    component: () => import('../view/PlaylistDetail.vue')
  }
]
