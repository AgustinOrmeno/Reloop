const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { name, email, password, city } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // TODO: guardar en DB cuando esté lista
    const user = { id: 1, name, email, city }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ user, token })

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    // TODO: buscar en DB cuando esté lista
    const user = { id: 1, name: 'Usuario', email }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ user, token })

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

module.exports = { register, login }