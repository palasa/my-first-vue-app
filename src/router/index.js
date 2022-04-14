import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmsView from '../views/FilmsView'
import CinemaView from '@/views/CinemaView'
import CenterView from '../views/CenterView'
import NowPlayingView from '../views/Films/NowPlayingView'
import ComingSoonView from '../views/Films/ComingSoonView'
import DetailView from '../views/Films/DetailView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/films',
    name: 'film',
    component: FilmsView,
    // 二级路由
    children: [
      {
        path: '/films/nowplaying',
        component: NowPlayingView
      },
      {
        path: 'comingsoon',
        component: ComingSoonView
      },
      { // 空路径重定向
        path: '',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: CinemaView
  },
  {
    // 动态路由
    path: '/detail/:filmId',
    name: 'filmDetail',
    component: DetailView
  },
  {
    path: '/center',
    name: 'center',
    component: CenterView
  }
]

const router = createRouter({

  // history / hash 模式
  // hash模式，不发请求到后端，使用location.hash和onhashchange事件
  // 記錄在瀏覽器的session history之中，可以利用上一頁回到原本位置 ，对旧浏览器兼容性好
  history: createWebHashHistory(process.env.BASE_URL),
  // history 模式，需要后端支持 ，使用的是html5 的history.pushState API
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
