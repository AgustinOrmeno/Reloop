import ProductCard from '../components/ProductCard'

const user = {
  name: 'Valentina García',
  city: 'Buenos Aires',
  joined: 'Marzo 2023',
  rating: 4.8,
  sales: 23,
  purchases: 12,
  bio: 'Amante de la moda sustentable. Vendo ropa en buen estado que ya no uso. Entrego en mano en Palermo y Belgrano.',
}

const myProducts = [
  { id: 1, name: 'Campera de cuero marrón', brand: 'Zara', city: 'Buenos Aires', price: '$8.500', size: 'M', condition: 'Como nuevo', bg: 'bg-terracota' },
  { id: 2, name: 'Vestido floral midi', brand: 'H&M', city: 'Buenos Aires', price: '$4.200', size: 'S', condition: 'Muy bueno', bg: 'bg-carbon-light' },
  { id: 3, name: 'Blazer oversize gris', brand: 'Mango', city: 'Buenos Aires', price: '$6.800', size: 'L', condition: 'Bueno', bg: 'bg-beige-dark' },
]

const tabs = ['Mis publicaciones', 'Favoritos', 'Compras', 'Ventas']

export default function UserProfile() {
  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Header del perfil */}
        <div className="flex items-start justify-between mb-12 pb-12 border-b border-carbon/10">
          <div className="flex items-center gap-8">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-carbon flex items-center justify-center text-white font-display text-3xl font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>

            {/* Info */}
            <div>
              <h1 className="font-display text-4xl font-bold text-carbon mb-1">
                {user.name}
              </h1>
              <p className="text-sm text-muted mb-4">
                {user.city} · Desde {user.joined}
              </p>
              <p className="text-sm font-light text-muted max-w-md leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-carbon">{user.rating}</div>
              <div className="text-xs text-muted mt-1">Reputación</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-carbon">{user.sales}</div>
              <div className="text-xs text-muted mt-1">Ventas</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-carbon">{user.purchases}</div>
              <div className="text-xs text-muted mt-1">Compras</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-10 border-b border-carbon/10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`text-sm pb-4 transition-colors duration-200 ${
                i === 0
                  ? 'text-carbon font-medium border-b-2 border-carbon'
                  : 'text-muted hover:text-carbon'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contenido — publicaciones */}
       <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">{myProducts.length} prendas publicadas</p>
            <button className="bg-terracota hover:bg-terracota-dark text-white text-sm font-medium px-6 py-2.5 rounded transition-colors duration-200">
                Publicar prenda
            </button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {myProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </main>
  )
}