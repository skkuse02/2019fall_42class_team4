import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    inCart: []
  },
  mutations: {
    LOGIN (state, session) {
      state.userInfo = session
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    LOGOUT (state) {
      state.userInfo = null
      state.inCart = []
      sessionStorage.clear()
    },
    MODIFY (state, user) {
      state.userInfo = user
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    ADDCART (state, item) {
      const tmp = []
      const cart = state.inCart
      if (cart) {
        cart.forEach(element => {
          tmp.push(element)
        })
      }
      tmp.push(item)

      state.inCart = tmp
      sessionStorage.setItem('inCart', JSON.stringify(tmp))
    },
    REMOVECART (state, item) {
      const tmp = []
      const cart = state.inCart
      if (cart) {
        for (let i in cart) {
          const id = cart[i].id
          if (id === item.id) continue
          tmp.push(cart[i])
        }
      }

      state.inCart = tmp
      sessionStorage.setItem('inCart', JSON.stringify(tmp))
    }
  },
  actions: {
    getUserInfo ({ state }) {
      state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getCartInfo ({ state }) {
      state.inCart = JSON.parse(sessionStorage.getItem('inCart'))
    }
  },
  modules: {
  }
})
