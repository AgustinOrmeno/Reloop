import api from './api'

const register = async (data) => {
  const response = await api.post('/auth/register', data)
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
}

const login = async (data) => {
  const response = await api.post('/auth/login', data)
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export default { register, login, logout, getUser, isLoggedIn }