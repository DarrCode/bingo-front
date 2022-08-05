import Vue from 'vue'
import VueRouter from 'vue-router'
import middleware from './middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Login.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    beforeEnter: middleware.guest,
    component: () => import(/* webpackPrefetch: true */ '../views/Home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackPrefetch: true */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: middleware.guest,
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    beforeEnter: middleware.guest,
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/Register.vue')
  },
  { 
    path: '/forgot-password', 
    name: 'reset-password', 
    beforeEnter: middleware.guest,
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/ForgotPass.vue')
  },
  { 
    path: '/reset-password/:token', 
    name: 'reset-password-form', 
    beforeEnter: middleware.guest,
    component: () => import(/* webpackPrefetch: true */ '../views/Auth/ResetPass.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    beforeEnter: middleware.user,
    component: () => import(/* webpackPrefetch: true */ '../views/User/Profile/index.vue')
  },
  {
    path: '/jugada',
    name: 'Jugada',
    beforeEnter: middleware.user,
    component: () => import(/* webpackPrefetch: true */ '../views/User/Play/index.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    beforeEnter: middleware.user,
    component: () => import(/* webpackPrefetch: true */ '../views/User/Wallet/index.vue')
  },
  {
    path: '/cartones-jugadas',
    name: 'CartonesJugadas',
    beforeEnter: middleware.user,
    component: () => import(/* webpackPrefetch: true */ '../views/User/CardboardsPlays/index.vue')
  },
  {
    path: '/notificaciones',
    name: 'notificaciones',
    beforeEnter: middleware.user,
    component: () => import(/* webpackPrefetch: true */ '../views/User/Notifications/index.vue')
  },
  {
    path: '/crear-sala',
    name: 'crear-sala',
    beforeEnter: middleware.playAssistant,
    component: () => import(/* webpackPrefetch: true */ '../views/Playassistant/CreateRoom/Create.vue')
  },
  {
    path: '/jugadores',
    name: 'admin-gamers',
    beforeEnter: middleware.supervisor,
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Gamers/index.vue')
  },
  {
    path: '/cartones',
    name: 'admin-cardboards',
    beforeEnter: middleware.admin,
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Cardboards/index.vue')
  },
  {
    path: '/cuentas',
    name: 'admin-accounts',
    beforeEnter: middleware.admin,
    component: () => import(/* webpackPrefetch: true */ '../views/Admin/Accounts/index.vue')
  },
  { path: "*", component: () => import( /* webpackPrefetch: true */ '../views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
