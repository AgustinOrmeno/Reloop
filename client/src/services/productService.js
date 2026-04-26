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

const uploadImages = async (files) => {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  const response = await api.post('/products/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.urls
}

const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export default { getProducts, getProductById, createProduct, deleteProduct, uploadImages }