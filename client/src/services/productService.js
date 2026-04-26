import api from './api'

const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const response = await api.get(`/products?${params}`)
  return response.data
}

const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

const createProduct = async (data) => {
  const response = await api.post('/products', data)
  return response.data
}

const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export default { getProducts, getProductById, createProduct, deleteProduct }