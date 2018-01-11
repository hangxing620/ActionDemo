import * as types from './mutation-type'
import {
  saveCollectArticle, deleteCollectArticle, deleteCollect
}
from 'common/js/cache'

export function saveArticle({
  commit
}, article) {
  commit(types.SET_ARTICLES, saveCollectArticle(article))
}

export function deleteArticle({
  commit
}, article) {
  commit(types.SET_ARTICLES, deleteCollectArticle(article))
}

export function deleteArticles({
  commit
}) {
  commit(types.SET_ARTICLES, deleteCollect())
}
