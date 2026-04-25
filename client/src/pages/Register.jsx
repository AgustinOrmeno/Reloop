import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', city: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  const cities = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Otra']

  return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center py-12">
      <div className="w-full max-w-md px-8">

        <div className="flex items-center gap-2 font-display text-2xl font-bold text-carbon mb-10 justify-center">
          <span className="w-2 h-2 rounded-full bg-terracota inline-block" />
          Reloop
        </div>

        <h1 className="font-display text-4xl font-bold text-carbon mb-2 text-center">
          Crear cuenta
        </h1>
        <p className="text-sm text-muted text-center mb-10">
          Unite a la comunidad de moda circular
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">Nombre completo</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre"
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200" />
          </div>

          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com"
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200" />
          </div>

          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres"
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200" />
          </div>

          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">Ciudad</label>
            <select name="city" value={form.city} onChange={handleChange}
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon focus:outline-none focus:border-terracota transition-colors duration-200">
              <option value="">Seleccioná tu ciudad</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-terracota hover:bg-terracota-dark text-white text-sm font-medium py-4 rounded transition-colors duration-200 mt-2 disabled:opacity-50">
            {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-carbon/10" />
          <span className="text-xs text-muted">o</span>
          <div className="flex-1 h-px bg-carbon/10" />
        </div>

        <p className="text-sm text-muted text-center">
          Ya tenés cuenta?{' '}
          <Link to="/login" className="text-terracota font-medium hover:text-terracota-dark transition-colors duration-200">
            Ingresar
          </Link>
        </p>

      </div>
    </main>
  )
}