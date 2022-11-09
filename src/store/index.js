import Vue from 'vue'
import Vuex from 'vuex'

//modules
import user from './user';
import note from './note';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    note
  }
})
