import Vue from 'vue'
import VueRouter from 'vue-router'

import VueSession from "vue-session";

Vue.use(VueRouter)
Vue.use(VueSession);
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackPrefetch: true */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackPrefetch: true */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Login.vue'),
    /*beforeEnter (from, to, next) {
      if (!existToken()) {
        next()
      } else {
        next(to.path)
      }
    }*/
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Register.vue')  
  },
  {
    path: '/forgot-password',
    name: 'ForgotPass',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/ForgotPass.vue')  
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackPrefetch: true */ '../views/Profile/Profile.vue')  
  },
  { path: "*", component: () => import( /* webpackPrefetch: true */ '../views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
