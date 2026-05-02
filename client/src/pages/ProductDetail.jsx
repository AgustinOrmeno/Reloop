import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productService from '../services/productService'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('No se encontró la prenda')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleContact = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/chat?productId=${product.id}&sellerId=${product.user.id}`)
  }

  if (loading) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-muted">Cargando prenda...</p>
    </main>
  )

  if (error) return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <p className="text-sm text-red-500">{error}</p>
    </main>
  )

  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link to="/" className="hover:text-carbon transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/explorar" className="hover:text-carbon transition-colors">Explorar</Link>
          <span>/</span>
          <span className="text-carbon">{product.title}</span>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-2 gap-16">

          {/* Imágenes */}
          <div className="flex flex-col gap-3">

            {/* Foto principal con flechas */}
            <div className="bg-beige-dark rounded-md aspect-square relative overflow-hidden group">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full bg-terracota flex items-center justify-center">
                  <p className="text-white/50 text-sm">Sin foto</p>
                </div>
              )}

              <div className="absolute top-4 left-4 text-[10px] font-medium tracking-wide uppercase bg-carbon/75 text-white px-2 py-1 rounded">
                {product.condition}
              </div>

              {/* Flechas */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => i === 0 ? product.images.length - 1 : i - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-carbon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage(i => i === product.images.length - 1 ? 0 : i + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-carbon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          activeImage === i ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 rounded overflow-hidden flex-shrink-0 border-2 transition-colors duration-200 ${
                      activeImage === i ? 'border-carbon' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted mb-2">
                {product.category} · {product.city}
              </p>
              <h1 className="font-display text-4xl font-bold text-carbon mb-4">
                {product.title}
              </h1>
              <div className="font-display text-5xl font-bold text-carbon mb-6">
                ${product.price}
              </div>
              <div className="flex gap-3 mb-8">
                <div className="border border-carbon/20 rounded px-4 py-2 text-sm text-carbon">
                  Talle: <span className="font-medium">{product.size}</span>
                </div>
                <div className="border border-carbon/20 rounded px-4 py-2 text-sm text-carbon">
                  {product.condition}
                </div>
              </div>
              {product.description && (
                <p className="text-sm font-light text-muted leading-relaxed mb-8">
                  {product.description}
                </p>
              )}
              <div className="flex gap-3 mb-10">
                <button className="flex-1 bg-terracota hover:bg-terracota-dark text-white text-sm font-medium py-4 rounded transition-colors duration-200">
                  Comprar ahora
                </button>
                <button className="flex-1 border border-carbon text-carbon hover:bg-carbon hover:text-white text-sm font-medium py-4 rounded transition-all duration-200">
                  Hacer una oferta
                </button>
              </div>
            </div>

            {/* Card del vendedor */}
            {product.user && (
              <div className="border border-carbon/10 rounded-md p-5">
                <p className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
                  Vendedor
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center text-white text-sm font-medium">
                      {product.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-carbon">{product.user.name}</p>
                      <p className="text-xs text-muted">{product.user.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-carbon">{product.user.rating} / 5</p>
                    <p className="text-xs text-muted">Reputación</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={handleContact}
                    className="w-full bg-terracota hover:bg-terracota-dark text-white text-sm font-medium py-2.5 rounded transition-colors duration-200"
                  >
                    Contactar vendedor
                  </button>
                  <Link
                    to={`/vendedor/${product.user.id}`}
                    className="block w-full border border-carbon/20 text-carbon text-sm font-medium py-2.5 rounded hover:border-carbon transition-colors duration-200 text-center"
                  >
                    Ver perfil del vendedor
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}