import storage from 'good-storage'

const COLLECT_KEY = '__collect__'

function insertArray(arr, val, compare) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }

  if (index > -1) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
}

function deleteArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function loadCollectArticles() {
  return storage.get(COLLECT_KEY, [])
}

export function saveCollectArticle(article) {
  let articles = storage.get(COLLECT_KEY, [])
  insertArray(articles, article, (item) => {
    return item.id === article.id
  })
  storage.set(COLLECT_KEY, articles)
  return articles
}

export function deleteCollectArticle(article) {
  let articles = storage.get(COLLECT_KEY, [])
  deleteArray(articles, (item) => {
    return item.id === article.id
  })
  storage.set(COLLECT_KEY, articles)
  return articles
}

export function deleteCollect() {
  storage.set(COLLECT_KEY, [])
  return []
}
