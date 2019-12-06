import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const requireSignIn = () => (from, to, next) => {
  if (sessionStorage.getItem('userInfo')) return next()
  alert('Login이 필요합니다.')
  next('/Sign')
}

const requireSignOut = () => (from, to, next) => {
  if (!sessionStorage.getItem('userInfo')) return next()
  next('/')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Sign',
    name: 'Sign',
    component: () => import('../views/Sign.vue'),
    beforeEnter: requireSignOut()
  },
  {
    path: '/MyPage/KeywordSetting',
    name: 'KeywordSetting',
    component: () => import('../views/KeywordSetting.vue'),
    beforeEnter: requireSignIn()
  },
  {
    path: '/MyPage/PasswordChange',
    name: 'PasswordChange',
    component: () => import('../views/PasswordChange.vue'),
    beforeEnter: requireSignIn()
  },
  {
    path: '/MyPage/History',
    name: 'History',
    component: () => import('../views/History.vue'),
    beforeEnter: requireSignIn()
  },
  {
    path: '/Mypag/Recommend',
    name: 'Recommend',
    component: () => import('../views/RecommendReview.vue'),
    beforeEnter: requireSignIn()
  },
  {
    path: '/ItemDetail/:id',
    name: 'ItemDetail',
    component: () => import('../views/ItemDetail.vue')
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
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
