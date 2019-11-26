import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Sign',
    name: 'Sign',
    component: () => import('../views/Sign.vue')
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue')
  },
  {
    path: '/ItemDetail/:id',
    name: 'ItemDetail',
    component: () => import('../views/ItemDetail.vue')
  },
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
