import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <div className="w-full max-w-md px-8">

        {/* Logo */}
        <div className="flex items-center gap-2 font-display text-2xl font-bold text-carbon mb-10 justify-center">
          <span className="w-2 h-2 rounded-full bg-terracota inline-block" />
          Reloop
        </div>

        {/* Título */}
        <h1 className="font-display text-4xl font-bold text-carbon mb-2 text-center">
          Bienvenido de vuelta
        </h1>
        <p className="text-sm text-muted text-center mb-10">
          Ingresá tu cuenta para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-muted hover:text-terracota transition-colors duration-200">
              Olvidé mi contraseña
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-terracota hover:bg-terracota-dark text-white text-sm font-medium py-4 rounded transition-colors duration-200 mt-2"
          >
            Ingresar
          </button>

        </form>

        {/* Separador */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-carbon/10" />
          <span className="text-xs text-muted">o</span>
          <div className="flex-1 h-px bg-carbon/10" />
        </div>

        {/* Link a registro */}
        <p className="text-sm text-muted text-center">
          No tenés cuenta?{' '}
          <Link to="/register" className="text-terracota font-medium hover:text-terracota-dark transition-colors duration-200">
            Registrate gratis
          </Link>
        </p>

      </div>
    </main>
  )
}