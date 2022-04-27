import Vue from 'vue'
import Vuex from 'vuex'
import MainService from '../services/MainService'


Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    auth: false,
    user: null
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, user) {
      state.user = user
      state.auth = Boolean(user)
    }
  },
  getters: {
    getAuthenticated(state) {
      return state.authenticated;
    },
    getUser(state) {
      return state.user;
    },
  },
  actions: {

    getUser({ commit }) {
      const data = {
        route: '/user',
      }

      MainService.get(data)
        .then((response) => {
          const res = response.data

          commit('SET_USER', res)
          commit("SET_AUTHENTICATED", true);
        })
        .catch((err) => {
          console.log('error', err);
          commit("SET_USER", {});
          commit("SET_AUTHENTICATED", false);
        })
    },
    logout({ commit }) {

      const data = {
        route: '/logout',
      }

      MainService.get(data)
        .then((response) => {
          
          commit("SET_USER", {});
          commit("SET_AUTHENTICATED", false);
          location.href = '/login'
        })
    },
  },
  modules: {
  }
})
