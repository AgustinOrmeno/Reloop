import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import chatService from '../services/chatService'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (!user) return
    const fetchUnread = async () => {
      try {
        const count = await chatService.getUnreadCount()
        setUnread(count)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUnread()
    const interval = setInterval(fetchUnread, 10000)
    return () => clearInterval(interval)
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[7%] h-16 bg-beige/90 backdrop-blur-md border-b border-terracota/10">

      <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-carbon">
        <span className="w-2 h-2 rounded-full bg-terracota inline-block" />
        Reloop
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        <li><Link to="/explorar" className="text-sm text-muted hover:text-carbon transition-colors duration-200">Explorar</Link></li>
        <li><Link to="/explorar" className="text-sm text-muted hover:text-carbon transition-colors duration-200">Mujer</Link></li>
        <li><Link to="/explorar" className="text-sm text-muted hover:text-carbon transition-colors duration-200">Hombre</Link></li>
        <li><Link to="/explorar" className="text-sm text-muted hover:text-carbon transition-colors duration-200">Niños</Link></li>
        <li><Link to="/explorar" className="text-sm text-muted hover:text-carbon transition-colors duration-200">Cómo funciona</Link></li>
      </ul>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Ícono de mensajes con badge */}
            <Link to="/chat" className="relative p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted hover:text-carbon transition-colors duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              {unread > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-terracota rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </Link>

            <Link to="/perfil" className="text-sm font-medium text-carbon px-4 py-2 rounded hover:bg-beige-dark transition-colors duration-200">
              {user.name.split(' ')[0]}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-carbon px-4 py-2 rounded hover:bg-beige-dark transition-colors duration-200"
            >
              Salir
            </button>
            <Link to="/publicar" className="text-sm font-medium text-white bg-carbon px-5 py-2 rounded hover:bg-carbon-mid transition-colors duration-200">
              Publicar prenda
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-carbon px-4 py-2 rounded hover:bg-beige-dark transition-colors duration-200">
              Ingresar
            </Link>
            <Link to="/publicar" className="text-sm font-medium text-white bg-carbon px-5 py-2 rounded hover:bg-carbon-mid transition-colors duration-200">
              Publicar prenda
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}