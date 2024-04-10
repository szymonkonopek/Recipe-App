import { createStore } from 'vuex'
import firebasedb from './modules/firebasedb'
import chatgpt from './modules/chatgpt'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { firebasedb, chatgpt }
})
