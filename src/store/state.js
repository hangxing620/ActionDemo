import {
  loadCollectArticles
}
from 'common/js/cache'

const state = {
  articles: loadCollectArticles(),
  article: {}
}

export default state
