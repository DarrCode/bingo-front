import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('../views/Auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue')  
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Auth/Register.vue')  
  },
  {
    path: '/forgot-password',
    name: 'ForgotPass',
    component: () => import('../views/Auth/ForgotPass.vue')  
  },
  { path: "*", component: () => import('../views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
