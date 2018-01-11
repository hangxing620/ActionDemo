import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

/**
 * 控制在开发环境下
 */
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
    plugins: debug ? [createLogger()] : []
})
