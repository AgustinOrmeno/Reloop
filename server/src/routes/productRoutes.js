const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, deleteProduct } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', authMiddleware, createProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router