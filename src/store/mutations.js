import * as types from './mutation-type'

const mutations = {
  [types.SET_ARTICLES](state, articles) {
    state.articles = articles
  }, [types.SET_ARTICLE](state, article) {
    state.article = article
  }
}

export default mutations
