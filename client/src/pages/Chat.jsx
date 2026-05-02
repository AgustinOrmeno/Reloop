import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'
import { useSearchParams } from 'react-router-dom'
import chatService from '../services/chatService'
import userService from '../services/userService'
import productService from '../services/productService'

const socket = io('http://localhost:3000')

export default function Chat() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeConv, setActiveConv] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [unreadCounts, setUnreadCounts] = useState({})
  const messagesEndRef = useRef(null)
  const [searchParams] = useSearchParams()

  // Cargar conversaciones
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations()
        setConversations(data)
        const productId = searchParams.get('productId')
        if (!productId && data.length > 0) setActiveConv(data[0])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchConversations()
  }, [])

  // Abrir conversación desde producto
  useEffect(() => {
    const productId = searchParams.get('productId')
    const sellerId = searchParams.get('sellerId')
    if (productId && sellerId && user) {
      const fetchData = async () => {
        try {
          const [seller, product] = await Promise.all([
            userService.getSellerProfile(sellerId),
            productService.getProductById(productId)
          ])
          const convId = `${Math.min(user.id, parseInt(sellerId))}_${Math.max(user.id, parseInt(sellerId))}_${productId}`
          setActiveConv({
            id: convId,
            otherUser: { id: parseInt(sellerId), name: seller.name },
            product: { id: parseInt(productId), title: product.title },
            lastMessage: '',
            unread: 0,
          })
        } catch (err) {
          console.error(err)
        }
      }
      fetchData()
    }
  }, [searchParams, user])

  // Cargar mensajes y marcar como leídos al cambiar conversación
  useEffect(() => {
    if (!activeConv) return

    socket.emit('join_conversation', activeConv.id)

    const fetchMessages = async () => {
      try {
        const data = await chatService.getMessages(activeConv.id)
        setMessages(data)
        await chatService.markAsRead(activeConv.id)
        // Limpiar badge de esta conversación
        setUnreadCounts(prev => ({ ...prev, [activeConv.id]: 0 }))
        // Actualizar lista de conversaciones
        const convs = await chatService.getConversations()
        setConversations(convs)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMessages()

    socket.on('receive_message', async (msg) => {
      setMessages(prev => [...prev, msg])
      // Si el mensaje es para este usuario y no es el que envió
      if (msg.senderId !== user?.id) {
        setUnreadCounts(prev => ({
          ...prev,
          [activeConv.id]: (prev[activeConv.id] || 0) + 1
        }))
      }
      const convs = await chatService.getConversations()
      setConversations(convs)
    })

    return () => socket.off('receive_message')
  }, [activeConv])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim() || !activeConv || !user) return
    socket.emit('send_message', {
      conversationId: activeConv.id,
      message: newMessage,
      senderId: user.id,
      receiverId: activeConv.otherUser.id,
      productId: activeConv.product.id,
    })
    setNewMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  const handleSelectConv = async (conv) => {
    setActiveConv(conv)
    setUnreadCounts(prev => ({ ...prev, [conv.id]: 0 }))
  }

  return (
    <main className="pt-16 h-screen bg-beige flex flex-col">
      <div className="flex flex-1 overflow-hidden">

        {/* Lista de conversaciones */}
        <aside className="w-80 flex-shrink-0 border-r border-carbon/10 flex flex-col">
          <div className="px-6 py-5 border-b border-carbon/10">
            <h1 className="font-display text-2xl font-bold text-carbon">Mensajes</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm text-muted">Cargando...</p>
              </div>
            )}
            {!loading && conversations.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm text-muted">No tenés mensajes todavía.</p>
              </div>
            )}
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv)}
                className={`w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-beige-dark transition-colors duration-200 border-b border-carbon/5 ${
                  activeConv?.id === conv.id ? 'bg-beige-dark' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-carbon flex items-center justify-center text-white text-sm font-medium">
                    {conv.otherUser.name.charAt(0)}
                  </div>
                  {/* Punto rojo en conversación no leída */}
                  {unreadCounts[conv.id] > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-terracota rounded-full border-2 border-beige" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm truncate ${unreadCounts[conv.id] > 0 ? 'font-semibold text-carbon' : 'font-medium text-carbon'}`}>
                      {conv.otherUser.name}
                    </p>
                    {unreadCounts[conv.id] > 0 && (
                      <span className="w-5 h-5 bg-terracota rounded-full flex items-center justify-center text-[10px] text-white font-medium flex-shrink-0">
                        {unreadCounts[conv.id]}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-muted/60 truncate">{conv.product.title}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Panel del chat */}
        {activeConv ? (
          <div className="flex-1 flex flex-col">
            <div className="px-8 py-5 border-b border-carbon/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center text-white text-sm font-medium">
                  {activeConv.otherUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-carbon">{activeConv.otherUser.name}</p>
                  <p className="text-xs text-muted">{activeConv.product.title}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.senderId === user?.id
                      ? 'bg-carbon text-white rounded-br-sm'
                      : 'bg-white border border-carbon/10 text-carbon rounded-bl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.senderId === user?.id ? 'text-white/50' : 'text-muted'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-8 py-5 border-t border-carbon/10 flex items-center gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí un mensaje..."
                className="flex-1 bg-white border border-carbon/15 rounded-full px-5 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
              />
              <button onClick={handleSend} className="w-11 h-11 rounded-full bg-terracota hover:bg-terracota-dark flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted">Seleccioná una conversación para empezar.</p>
          </div>
        )}
      </div>
    </main>
  )
}