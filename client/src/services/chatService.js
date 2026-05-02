import api from './api'

const getConversations = async () => {
  const response = await api.get('/chat/conversations')
  return response.data
}

const getMessages = async (conversationId) => {
  const response = await api.get(`/chat/messages/${conversationId}`)
  return response.data
}

const getUnreadCount = async () => {
  const response = await api.get('/chat/unread')
  return response.data.count
}

const markAsRead = async (conversationId) => {
  const response = await api.put(`/chat/messages/${conversationId}/read`)
  return response.data
}

export default { getConversations, getMessages, getUnreadCount, markAsRead }