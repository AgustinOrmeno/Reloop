import ProductCard from '../components/ProductCard'

const seller = {
  name: 'Valentina García',
  city: 'Buenos Aires',
  joined: 'Marzo 2023',
  rating: 4.8,
  sales: 23,
  bio: 'Amante de la moda sustentable. Vendo ropa en buen estado que ya no uso. Entrego en mano en Palermo y Belgrano.',
}

const sellerProducts = [
  { id: 1, name: 'Campera de cuero marrón', brand: 'Zara', city: 'Buenos Aires', price: '$8.500', size: 'M', condition: 'Como nuevo', bg: 'bg-terracota' },
  { id: 2, name: 'Vestido floral midi', brand: 'H&M', city: 'Buenos Aires', price: '$4.200', size: 'S', condition: 'Muy bueno', bg: 'bg-carbon-light' },
  { id: 3, name: 'Blazer oversize gris', brand: 'Mango', city: 'Buenos Aires', price: '$6.800', size: 'L', condition: 'Bueno', bg: 'bg-beige-dark' },
]

const reviews = [
  { id: 1, author: 'Lucía M.', rating: 5, comment: 'Excelente vendedora, la prenda llegó tal cual la descripción.', date: 'Marzo 2024' },
  { id: 2, author: 'Martina R.', rating: 5, comment: 'Muy buena atención, respondió rápido y entregó en mano sin problema.', date: 'Febrero 2024' },
  { id: 3, author: 'Carolina P.', rating: 4, comment: 'Todo bien, la prenda estaba en buen estado.', date: 'Enero 2024' },
]

export default function SellerProfile() {
  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-12 pb-12 border-b border-carbon/10">
          <div className="flex items-center gap-8">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-carbon flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
              {seller.name.charAt(0)}
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-4xl font-bold text-carbon mb-1">
                {seller.name}
              </h1>
              <p className="text-sm text-muted mb-4">
                {seller.city} · Desde {seller.joined}
              </p>
              <p className="text-sm font-light text-muted max-w-md leading-relaxed">
                {seller.bio}
              </p>
            </div>
          </div>

          {/* Acciones */}
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
            <div className="font-display text-4xl font-bold text-terracota mb-1">{seller.rating}</div>
            <div className="text-xs text-white/50">Reputación promedio</div>
          </div>
          <div className="bg-beige-dark rounded-md p-6 text-center">
            <div className="font-display text-4xl font-bold text-carbon mb-1">{seller.sales}</div>
            <div className="text-xs text-muted">Ventas realizadas</div>
          </div>
          <div className="bg-beige-dark rounded-md p-6 text-center">
            <div className="font-display text-4xl font-bold text-carbon mb-1">{sellerProducts.length}</div>
            <div className="text-xs text-muted">Prendas activas</div>
          </div>
        </div>

        {/* Publicaciones */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
            <span className="w-6 h-px bg-terracota" />
            Publicaciones
          </div>
          <h2 className="font-display text-3xl font-bold text-carbon mb-8">
            Prendas en venta
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Reseñas */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
            <span className="w-6 h-px bg-terracota" />
            Reseñas
          </div>
          <h2 className="font-display text-3xl font-bold text-carbon mb-8">
            Lo que dicen los compradores
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-carbon/10 rounded-md p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-carbon">{review.author}</p>
                  <p className="text-xs text-muted">{review.date}</p>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-terracota text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm font-light text-muted leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}