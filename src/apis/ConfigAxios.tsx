import axios from 'axios'

const baseAxios = axios.create({
  baseURL: 'http://localhost:8080/api'
})

baseAxios.interceptors.request.use(
  (config) => {
    const tokenLocal: string | null = localStorage.getItem('token')
    const token: string | undefined = tokenLocal ? JSON.parse(tokenLocal) : undefined
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
