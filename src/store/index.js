import { createStore } from 'vuex';
// eslint-disable-next-line import/no-cycle
import firebasedb from './modules/firebasedb';
import chatgpt from './modules/chatgpt';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { firebasedb, chatgpt },
});
