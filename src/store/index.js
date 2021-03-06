import Vue from 'vue'
import Vuex from 'vuex'
import MainService from '../services/MainService'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    auth: false,
    user: null,
    url: process.env.VUE_APP_API_BASE
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

    async getUser({ commit }) {
      const data = {
        route: '/user',
      }

      await MainService.get(data)
        .then((response) => {
          const res = response.data
          console.log(res);
          commit('SET_USER', res.user)
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
