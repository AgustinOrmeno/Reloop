const products = [
  { id: 1, name: 'Campera de cuero marrón', brand: 'Zara', city: 'Buenos Aires', price: '$8.500', size: 'M', condition: 'Como nuevo', bg: 'bg-terracota' },
  { id: 2, name: 'Vestido floral midi', brand: 'H&M', city: 'Córdoba', price: '$4.200', size: 'S', condition: 'Muy bueno', bg: 'bg-carbon-light' },
  { id: 3, name: 'Blazer oversize gris', brand: 'Mango', city: 'Rosario', price: '$6.800', size: 'L', condition: 'Bueno', bg: 'bg-beige-dark' },
  { id: 4, name: 'Jean tiro alto azul', brand: 'Levis', city: 'Mendoza', price: '$5.500', size: '28', condition: 'Como nuevo', bg: 'bg-terracota-light' },
]

export default function FeaturedProducts() {
  return (
    <section className="px-[7%] pb-24">

      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
            <span className="w-6 h-px bg-terracota" />
            Lo más nuevo
          </div>
          <h2 className="font-display text-4xl font-bold text-carbon leading-tight">
            Recién publicado
          </h2>
        </div>
        <a href="#" className="text-sm font-medium text-terracota hover:text-terracota-dark transition-colors duration-200">
          Ver todo
        </a>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="cursor-pointer transition-transform duration-200 hover:-translate-y-1">

            <div className={`${product.bg} w-full aspect-[3/4] rounded-md mb-3 relative overflow-hidden`}>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-beige/90 flex items-center justify-center hover:bg-beige transition-colors duration-200 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-carbon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-3 text-[10px] font-medium tracking-wide uppercase bg-carbon/75 text-white px-2 py-1 rounded z-10">
                {product.condition}
              </div>
            </div>

            <p className="text-sm font-medium text-carbon mb-1 truncate">{product.name}</p>
            <p className="text-xs text-muted mb-2">{product.brand} · {product.city}</p>
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-carbon">{product.price}</span>
              <span className="text-xs text-muted bg-beige-dark px-2 py-1 rounded">{product.size}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}