import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    LOGIN (state, session) {
      state.userInfo = session
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    LOGOUT (state) {
      state.userInfo = null
      sessionStorage.clear()
    }
  },
  actions: {
    getUserInfo ({ state }) {
      state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  modules: {
  }
})
