import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Auth/Auth.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
