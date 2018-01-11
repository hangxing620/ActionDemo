import axios from 'axios'

export function getPosts() {
  const url = 'http://localhost:3000/posts'
  const data = Object.assign({}, {})

  return axios.get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
