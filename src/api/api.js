import axios from 'axios'

const Api = {
  get : (url) => axios.get(url).then((response) => response.data),

  post: (url, data) => axios.post(url, data).then((response) => response.data),

  delete: (url, data) => axios.delete(url).then((response) => response.data)
}

export default Api