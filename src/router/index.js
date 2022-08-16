import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    // 이미 로그인된 유저니까 로그인창 가는거 막아야.
    next('/mainpage')
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    // 아직 로그인 안 된 유저니까 메인창 가는거 막아야.
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: rejectAuthUser,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "mainpage" */ '../views/Mainpage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
