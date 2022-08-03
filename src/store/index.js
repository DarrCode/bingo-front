import Vue from 'vue'
import Vuex from 'vuex'
import MainService from '../services/MainService'
import CardboardComponent from '../components/plays/cartones'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: sessionStorage.user ? JSON.parse(sessionStorage.getItem('user')) : null,
    url: process.env.VUE_APP_API_BASE,
    loader: true,
    numbersOfPlay: {
      numbers: [],
      loading: false,
    },
    cardboards: {
      data: [],
      loading: false,
    }
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },

    SET_ROL(state, roleId) {
      state.roleId = roleId
    },

    SET_NUMBERS_OF_PLAY(state, numbersOfPlay) {
      state.numbersOfPlay.numbers = numbersOfPlay
    },
    SET_CARDBOARDS(state, cardboards) {
      state.cardboards.data = cardboards
    }
  },
  getters: {
    user: state => state.user,
    role(state) {
      return state.user ? state.user.role_id : state.user.user.role_id
    },
    authenticated: state => state.user !== null,
  },
  actions: {
    "SOCKET_update_cardboard"(vuex, server) {
      const numbersOfPlay = typeof server.numbers === 'object' ? server.numbers : JSON.parse(server.numbers)
      vuex.dispatch('getCardboardInPlay')
      vuex.commit('SET_NUMBERS_OF_PLAY', numbersOfPlay);
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
    async getMeetingsInPlay({ commit }) {
      const data = {
				route: 'user/meeting',
			}

      this.state.numbersOfPlay.loading = true

			MainService.get(data)
			.then((response) => {
				const res = response.data
				if (res.statusCode == 0) {
					if(res.meeting[0]) {
            const numbersOfPlay = JSON.parse(res.meeting[0].numbers)
            commit('SET_NUMBERS_OF_PLAY', numbersOfPlay)
          }
				}
			})
			.catch((err) => {
				console.log('error', err)
			})
      .then(() => {
        this.state.numbersOfPlay.loading = false
      })
    },
    async getCardboardInPlay({ commit }) {
      const data = {
        route: '/user/game',
      }

      this.state.cardboards.loading = true

      MainService.get(data)
      .then((response) => {
        const res = response.data
        if (res.statusCode == 0) {
          commit('SET_CARDBOARDS', res.cardboard);
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
      .then(() => {
        this.state.cardboards.loading = false
      })
    },
  },
})
