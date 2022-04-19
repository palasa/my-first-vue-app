import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmsView from '../views/FilmsView'
import CinemaView from '@/views/CinemaView'
import CenterView from '../views/CenterView'
import NowPlayingView from '../views/Films/NowPlayingView'
import ComingSoonView from '../views/Films/ComingSoonView'
import DetailView from '../views/Films/DetailView'
import LoginView from '../views/LoginView'
import CityView from '../views/CityView'

import TestView from '@/views/TestView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    component: TestView
  },
  {
    path: '/city',
    component: CityView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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

// 登录
// const auth = {
//   isLogin: () => {
//     return false
//   }
// }

const router = createRouter({

  // history / hash 模式
  // hash模式，不发请求到后端，使用location.hash和onhashchange事件
  // 記錄在瀏覽器的session history之中，可以利用上一頁回到原本位置 ，对旧浏览器兼容性好
  history: createWebHashHistory(process.env.BASE_URL),
  // history 模式，需要后端支持 ，使用的是html5 的history.pushState API
  // history: createWebHistory(process.env.BASE_URL),
  routes
})
// 路由守卫
// 全局守卫
// router.beforeEach((to, from, next) => {
//   // 拦截所有 请求
//   // console.log(to)
//   if (to.path === '/center') {
//     console.log('盘查')
//     if (auth.isLogin()) {
//       next()
//     } else {
//       next('/login')
//     }
//     // 判断是否已登录
//   } else {
//     next() // 放行
//   }
// })

export default router
