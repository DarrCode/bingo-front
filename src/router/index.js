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
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Register.vue')
  },
  { 
    path: '/forgot-password', 
    name: 'reset-password', 
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/ForgotPass.vue'),
    meta: { 
      requiresAuth: false 
    } 
  },
  { 
    path: '/reset-password/:token', 
    name: 'reset-password-form', 
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/ResetPass.vue')  , 
    meta: { 
      requiresAuth: false 
    } 
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackPrefetch: true */ '../views/User/Profile/Profile.vue')
  },
  {
    path: '/jugada',
    name: 'Jugada',
    component: () => import(/* webpackPrefetch: true */ '../views/Jugada/index.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import(/* webpackPrefetch: true */ '../views/User/Wallet/wallet.vue')
  },
  {
    path: '/cartones-jugadas',
    name: 'CartonesJugadas',
    component: () => import(/* webpackPrefetch: true */ '../views/CartonesJugadas/CartonesJugadas.vue')
  },
  {
    path: '/assitente-jugada',
    name: 'AssitenteJugada',
    component: () => import(/* webpackPrefetch: true */ '../views/Jugada//PlayAssistent.vue')
  },
  // ADMIN
  {
    path: '/admin-cartones',
    name: 'admin-cardboards',
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Cardboards/index.vue')
  },
  {
    path: '/admin-jugadores',
    name: 'admin-gamers',
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Gamers/index.vue')
  },
  {
    path: '/admin-cuentas',
    name: 'admin-accounts',
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Accounts/index.vue')
  },
   // PLAYASSISTANT
   {
    path: '/asistente-crear-sala',
    name: 'asistente-crear-sala',
    component: () => import(/* webpackPrefetch: true */ '../views/Playassistant/CreateRoom/Create.vue')
  },
  { path: "*", component: () => import( /* webpackPrefetch: true */ '../views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
