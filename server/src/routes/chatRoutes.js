const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const prisma = require('../prisma')

router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
        product: { select: { id: true, title: true, images: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    const conversationsMap = {}
    messages.forEach(msg => {
      const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId
      const key = `${Math.min(userId, otherId)}_${Math.max(userId, otherId)}_${msg.productId}`
      if (!conversationsMap[key]) {
        conversationsMap[key] = {
          id: key,
          product: msg.product,
          otherUser: msg.senderId === userId ? msg.receiver : msg.sender,
          lastMessage: msg.text,
          lastTime: msg.createdAt,
        }
      }
    })

    res.json(Object.values(conversationsMap))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener conversaciones' })
  }
})

router.get('/messages/:conversationId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const { conversationId } = req.params
    const [minId, maxId, productId] = conversationId.split('_').map(Number)

    const messages = await prisma.message.findMany({
      where: {
        productId,
        OR: [
          { senderId: minId, receiverId: maxId },
          { senderId: maxId, receiverId: minId }
        ]
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener mensajes' })
  }
})

router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    console.log('Buscando conversaciones para userId:', userId)

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
        product: { select: { id: true, title: true, images: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log('Mensajes encontrados:', messages.length)

    const conversationsMap = {}
    messages.forEach(msg => {
      const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId
      const key = `${Math.min(userId, otherId)}_${Math.max(userId, otherId)}_${msg.productId}`
      if (!conversationsMap[key]) {
        conversationsMap[key] = {
          id: key,
          product: msg.product,
          otherUser: msg.senderId === userId ? msg.receiver : msg.sender,
          lastMessage: msg.text,
          lastTime: msg.createdAt,
        }
      }
    })

    console.log('Conversaciones:', Object.keys(conversationsMap).length)
    res.json(Object.values(conversationsMap))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener conversaciones' })
  }
})

router.get('/unread', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const count = await prisma.message.count({
      where: {
        receiverId: userId,
        read: false
      }
    })
    res.json({ count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener mensajes no leídos' })
  }
})

router.put('/messages/:conversationId/read', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const { conversationId } = req.params
    const [minId, maxId, productId] = conversationId.split('_').map(Number)

    await prisma.message.updateMany({
      where: {
        productId,
        receiverId: userId,
        read: false,
        OR: [
          { senderId: minId, receiverId: maxId },
          { senderId: maxId, receiverId: minId }
        ]
      },
      data: { read: true }
    })

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al marcar mensajes como leídos' })
  }
})

module.exports = router