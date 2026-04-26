import api from './api'

const getProfile = async () => {
  const response = await api.get('/users/profile')
  return response.data
}

const updateProfile = async (data) => {
  const response = await api.put('/users/profile', data)
  return response.data
}

const getSellerProfile = async (id) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export default { getProfile, updateProfile, getSellerProfile }