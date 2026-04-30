const express = require('express')
const router = express.Router()
const { getProfile, updateProfile, getSellerProfile } = require('../controllers/userController')
const { toggleFavorite, getFavorites } = require('../controllers/favoriteController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)
router.get('/favorites', authMiddleware, getFavorites)
router.post('/favorites/:productId', authMiddleware, toggleFavorite)
router.get('/:id', getSellerProfile)

module.exports = router