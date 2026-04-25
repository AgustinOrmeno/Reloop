const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

const register = async (req, res) => {
  try {
    const { name, email, password, city } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, city }
    })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, city: user.city },
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      user: { id: user.id, name: user.name, email: user.email, city: user.city },
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

module.exports = { register, login }