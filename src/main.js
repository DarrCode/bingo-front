import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from '../http-common'
import MainService from './services/MainService'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueSession from "vue-session";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSession);

const moment = require('moment')
Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data () {
    return {
      http,
      MainService
    }
  },
  beforeCreate () {
    if (this.$session.exists()) {
      http.defaults.headers.common.Authorization = `${this.$session.get('token_type')} ${this.$session.get('access_token')}`
    }
  },
  render: h => h(App)
}).$mount('#app')