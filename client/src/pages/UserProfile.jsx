import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import userService from '../services/userService'

const tabs = ['Mis publicaciones', 'Favoritos', 'Compras', 'Ventas']

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile()
        setUser(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-muted">Cargando perfil...</p>
    </main>
  )

  if (!user) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-muted">No se encontró el perfil.</p>
    </main>
  )

  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-12 pb-12 border-b border-carbon/10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-carbon flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-carbon mb-1">{user.name}</h1>
              <p className="text-sm text-muted mb-4">
                {user.city} · Desde {new Date(user.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
              </p>
              {user.bio && (
                <p className="text-sm font-light text-muted max-w-md leading-relaxed">{user.bio}</p>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-carbon">{user.rating || 0}</div>
              <div className="text-xs text-muted mt-1">Reputación</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-carbon">{user.products?.length || 0}</div>
              <div className="text-xs text-muted mt-1">Publicaciones</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-10 border-b border-carbon/10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm pb-4 transition-colors duration-200 ${
                activeTab === i
                  ? 'text-carbon font-medium border-b-2 border-carbon'
                  : 'text-muted hover:text-carbon'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {activeTab === 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted">{user.products?.length || 0} prendas publicadas</p>
              <Link
                to="/publicar"
                className="bg-terracota hover:bg-terracota-dark text-white text-sm font-medium px-6 py-2.5 rounded transition-colors duration-200"
              >
                Publicar prenda
              </Link>
            </div>

            {user.products?.length === 0 ? (
              <div className="flex items-center justify-center h-48">
                <p className="text-sm text-muted">No tenés prendas publicadas todavía.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5">
                {user.products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab !== 0 && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-muted">Próximamente...</p>
          </div>
        )}

      </div>
    </main>
  )
}