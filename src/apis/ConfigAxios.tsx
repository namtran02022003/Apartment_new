import axios from 'axios'

const baseAxios = axios.create({
  baseURL: 'http://localhost:8080/api'
})

baseAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default baseAxios
