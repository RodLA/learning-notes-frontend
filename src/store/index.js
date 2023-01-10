import Vue from 'vue'
import Vuex from 'vuex'

//modules
import user from './user/index';
import note from './note';
import application from './application/index';

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
    note,
    application
  }
})
