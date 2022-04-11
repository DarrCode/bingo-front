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
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth/Auth.vue')
  },
  { path: "*", component: () => import('../views/Auth/Auth.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
