import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tab: 'all',
    user: {}
  },
  getters: {
    getTab: function (state) {
      return state.tab
    },
    getUser: function (state) {
      if (!state.user.loginname && window.sessionStorage.user) {
        state.user = JSON.parse(window.sessionStorage.user)
      }
      return state.user
    }
  },
  mutations: {
    setTab (state, tab) {
      state.tab = tab
    },
    setUser (state, user) {
      state.user = user
      window.sessionStorage.user = JSON.stringify(state.user)
    }
  }
})
export default store
