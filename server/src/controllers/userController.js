const prisma = require('../prisma')

const getProfile = async (req, res) => {
  try {
    const { userId } = req

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        bio: true,
        rating: true,
        createdAt: true,
        products: {
          where: { active: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { userId } = req
    const { name, city, bio } = req.body

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, city, bio },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        bio: true,
        rating: true,
      }
    })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar perfil' })
  }
}

const getSellerProfile = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        city: true,
        bio: true,
        rating: true,
        createdAt: true,
        products: {
          where: { active: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) return res.status(404).json({ error: 'Vendedor no encontrado' })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener perfil del vendedor' })
  }
}

module.exports = { getProfile, updateProfile, getSellerProfile }