import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: () => import('../views/MyPage.vue')
  },
  {
    path: '/ItemDetail/:id',
    name: 'itemDetail',
    component: () => import('../views/ItemDetail.vue')
  },
  {
    path: '/*',
    name: 'notFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
