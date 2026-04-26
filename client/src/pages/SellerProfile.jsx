import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import userService from '../services/userService'

export default function SellerProfile() {
  const { id } = useParams()
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await userService.getSellerProfile(id)
        setSeller(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSeller()
  }, [id])

  if (loading) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-muted">Cargando perfil...</p>
    </main>
  )

  if (!seller) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-muted">Vendedor no encontrado.</p>
    </main>
  )

  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-12 pb-12 border-b border-carbon/10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-carbon flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
              {seller.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-carbon mb-1">{seller.name}</h1>
              <p className="text-sm text-muted mb-4">
                {seller.city} · Desde {new Date(seller.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
              </p>
              {seller.bio && (
                <p className="text-sm font-light text-muted max-w-md leading-relaxed">{seller.bio}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="bg-terracota hover:bg-terracota-dark text-white text-sm font-medium px-8 py-3 rounded transition-colors duration-200">
              Contactar
            </button>
            <button className="border border-carbon/20 text-carbon text-sm font-medium px-8 py-3 rounded hover:border-carbon transition-colors duration-200">
              Seguir
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-carbon rounded-md p-6 text-center">
            <div className="font-display text-4xl font-bold text-terracota mb-1">{seller.rating || 0}</div>
            <div className="text-xs text-white/50">Reputación promedio</div>
          </div>
          <div className="bg-beige-dark rounded-md p-6 text-center">
            <div className="font-display text-4xl font-bold text-carbon mb-1">{seller.products?.length || 0}</div>
            <div className="text-xs text-muted">Prendas activas</div>
          </div>
          <div className="bg-beige-dark rounded-md p-6 text-center">
            <div className="font-display text-4xl font-bold text-carbon mb-1">0</div>
            <div className="text-xs text-muted">Ventas realizadas</div>
          </div>
        </div>

        {/* Publicaciones */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
            <span className="w-6 h-px bg-terracota" />
            Publicaciones
          </div>
          <h2 className="font-display text-3xl font-bold text-carbon mb-8">Prendas en venta</h2>

          {seller.products?.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-sm text-muted">Este vendedor no tiene prendas activas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-5">
              {seller.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}