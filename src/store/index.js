import Vue from 'vue'
import Vuex from 'vuex'
import MainService from '../services/MainService'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: sessionStorage.user ? JSON.parse(sessionStorage.getItem('user')) : null,
    url: process.env.VUE_APP_API_BASE,
    loader: true
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },

    SET_ROL(state, roleId) {
      state.roleId = roleId
    }
  },
  getters: {
    user: state => state.user,
    role: state => state.user.role_id ? state.user.role_id : state.user.user.role_id,
    authenticated: state => state.user !== null,
  },
  actions: {
    "SOCKET_update_cardboard"(state, server) {
      console.log('server', server.numbers)
    },
    logout({ commit }) {

      const data = {
        route: '/logout',
      }

      MainService.get(data) 
        .then((response) => {
          commit('SET_USER', null);
          sessionStorage.removeItem('user');
          location.href = '/login'
        })
    },
  },
})
