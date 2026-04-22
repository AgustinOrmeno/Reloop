const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Reloop API funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})