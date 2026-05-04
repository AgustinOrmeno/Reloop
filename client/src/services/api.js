import axios from 'axios'

const api = axios.create({
  baseURL: 'https://reloop-w4zb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor — agrega el token en cada request automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api