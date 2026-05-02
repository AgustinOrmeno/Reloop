const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: corsOptions
})

const PORT = process.env.PORT || 3000

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/chat', chatRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Reloop API funcionando!' })
})

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id)

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId)
  })

  socket.on('send_message', async (data) => {
    const { conversationId, message, senderId, productId, receiverId } = data
    try {
      const prisma = require('./prisma')
      const saved = await prisma.message.create({
        data: { text: message, senderId, productId, receiverId }
      })
      io.to(conversationId).emit('receive_message', {
        ...saved,
        text: message,
        senderId,
      })
    } catch (err) {
      console.error('Error guardando mensaje:', err)
    }
  })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})