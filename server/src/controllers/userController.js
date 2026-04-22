const getProfile = async (req, res) => {
  try {
    const { userId } = req
    // TODO: buscar en DB
    const user = { id: userId, name: 'Valentina G.', email: 'vale@email.com', city: 'Buenos Aires' }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { userId } = req
    const { name, city, bio } = req.body
    // TODO: actualizar en DB
    const user = { id: userId, name, city, bio }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil' })
  }
}

module.exports = { getProfile, updateProfile }