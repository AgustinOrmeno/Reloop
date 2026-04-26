const prisma = require('../prisma')

const getProducts = async (req, res) => {
  try {
    const { category, size, condition, city } = req.query

    const filters = { active: true }
    if (category) filters.category = category
    if (size) filters.size = size
    if (condition) filters.condition = condition
    if (city) filters.city = city

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        user: {
          select: { id: true, name: true, city: true, rating: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, city: true, rating: true }
        }
      }
    })

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener producto' })
  }
}

const createProduct = async (req, res) => {
  try {
    const { title, description, price, size, condition, category, city } = req.body
    const userId = req.userId

    if (!title || !price || !size || !condition || !category || !city) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        size,
        condition,
        category,
        city,
        images: [],
        userId
      }
    })

    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear producto' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    })

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    if (product.userId !== userId) {
      return res.status(403).json({ error: 'No tenés permiso para eliminar esta prenda' })
    }

    await prisma.product.update({
      where: { id: parseInt(id) },
      data: { active: false }
    })

    res.json({ message: 'Prenda eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar producto' })
  }
}

module.exports = { getProducts, getProductById, createProduct, deleteProduct }