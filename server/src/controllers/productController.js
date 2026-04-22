const getProducts = async (req, res) => {
  try {
    // TODO: conectar con DB
    const products = [
      { id: 1, title: 'Campera de cuero', price: 8500, size: 'M', condition: 'Como nuevo', category: 'Mujer', city: 'Buenos Aires' },
      { id: 2, title: 'Vestido floral', price: 4200, size: 'S', condition: 'Muy bueno', category: 'Mujer', city: 'Córdoba' },
    ]
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    // TODO: conectar con DB
    const product = { id, title: 'Campera de cuero', price: 8500, size: 'M', condition: 'Como nuevo' }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' })
  }
}

const createProduct = async (req, res) => {
  try {
    const { title, description, price, size, condition, category, city } = req.body

    if (!title || !price || !size || !condition || !category || !city) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    // TODO: guardar en DB
    const product = { id: 1, title, description, price, size, condition, category, city }
    res.status(201).json(product)

  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    // TODO: eliminar de DB
    res.json({ message: `Producto ${id} eliminado` })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' })
  }
}

module.exports = { getProducts, getProductById, createProduct, deleteProduct }