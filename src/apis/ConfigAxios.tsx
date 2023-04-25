import axios from 'axios'
const API_URL = process.env.API_URL
const baseAxios = axios.create({
  baseURL: `${API_URL}`
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
