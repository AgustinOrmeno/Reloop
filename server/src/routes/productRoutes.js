const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, deleteProduct } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

router.get('/', getProducts)
router.post('/upload', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const urls = req.files.map(file => file.path)
    res.json({ urls })
  } catch (error) {
    res.status(500).json({ error: 'Error al subir imágenes' })
  }
})
router.post('/', authMiddleware, createProduct)
router.get('/:id', getProductById)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router