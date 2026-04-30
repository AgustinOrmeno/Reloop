const prisma = require('../prisma')

const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.params
    const userId = req.userId

    const existing = await prisma.favorite.findFirst({
      where: { userId, productId: parseInt(productId) }
    })

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } })
      res.json({ favorited: false })
    } else {
      await prisma.favorite.create({
        data: { userId, productId: parseInt(productId) }
      })
      res.json({ favorited: true })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar favorito' })
  }
}

const getFavorites = async (req, res) => {
  try {
    const userId = req.userId

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            user: { select: { id: true, name: true, city: true } }
          }
        }
      }
    })

    res.json(favorites.map(f => f.product))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener favoritos' })
  }
}

module.exports = { toggleFavorite, getFavorites }