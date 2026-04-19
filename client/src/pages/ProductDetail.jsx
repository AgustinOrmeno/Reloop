const product = {
  id: 1,
  name: 'Campera de cuero marrón',
  brand: 'Zara',
  city: 'Buenos Aires',
  price: '$8.500',
  size: 'M',
  condition: 'Como nuevo',
  description: 'Campera de cuero marrón en excelente estado. Usada muy pocas veces, sin manchas ni roturas. Ideal para otoño/invierno. Talle M pero tiene corte amplio, puede quedar bien en un L.',
  seller: {
    name: 'Valentina G.',
    rating: 4.8,
    sales: 23,
    joined: 'Marzo 2023',
  },
  bg: 'bg-terracota',
}

const related = [
  { id: 2, name: 'Campera de jean', brand: 'Levi\'s', price: '$5.200', size: 'L', condition: 'Muy bueno', bg: 'bg-carbon-light' },
  { id: 3, name: 'Blazer negro', brand: 'Zara', price: '$6.100', size: 'M', condition: 'Como nuevo', bg: 'bg-carbon' },
  { id: 4, name: 'Tapado camel', brand: 'Mango', price: '$9.800', size: 'S', condition: 'Bueno', bg: 'bg-terracota-dark' },
]

export default function ProductDetail() {
  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <a href="/" className="hover:text-carbon transition-colors">Inicio</a>
          <span>/</span>
          <a href="/explorar" className="hover:text-carbon transition-colors">Explorar</a>
          <span>/</span>
          <span className="text-carbon">{product.name}</span>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-2 gap-16">

          {/* Imagen */}
          <div className={`${product.bg} rounded-md aspect-[3/4] relative`}>
            <div className="absolute top-4 left-4 text-[10px] font-medium tracking-wide uppercase bg-carbon/75 text-white px-2 py-1 rounded">
              {product.condition}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>

              {/* Marca y ciudad */}
              <p className="text-sm text-muted mb-2">{product.brand} · {product.city}</p>

              {/* Nombre */}
              <h1 className="font-display text-4xl font-bold text-carbon mb-4">
                {product.name}
              </h1>

              {/* Precio */}
              <div className="font-display text-5xl font-bold text-carbon mb-6">
                {product.price}
              </div>

              {/* Talle y condición */}
              <div className="flex gap-3 mb-8">
                <div className="border border-carbon/20 rounded px-4 py-2 text-sm text-carbon">
                  Talle: <span className="font-medium">{product.size}</span>
                </div>
                <div className="border border-carbon/20 rounded px-4 py-2 text-sm text-carbon">
                  {product.condition}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-sm font-light text-muted leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Botones */}
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
            <div className="border border-carbon/10 rounded-md p-5">
              <p className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
                Vendedor
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center text-white text-sm font-medium">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-carbon">{product.seller.name}</p>
                    <p className="text-xs text-muted">Desde {product.seller.joined}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-carbon">{product.seller.rating} / 5</p>
                  <p className="text-xs text-muted">{product.seller.sales} ventas</p>
                </div>
              </div>
              <button className="w-full mt-4 border border-carbon/20 text-carbon text-sm font-medium py-2.5 rounded hover:border-carbon transition-colors duration-200">
                Contactar vendedor
              </button>
            </div>

          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-20">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
            <span className="w-6 h-px bg-terracota" />
            También te puede gustar
          </div>
          <h2 className="font-display text-3xl font-bold text-carbon mb-8">
            Prendas similares
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {related.map((item) => (
              <div key={item.id} className="cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                <div className={`${item.bg} w-full aspect-[3/4] rounded-md mb-3 relative overflow-hidden`}>
                  <div className="absolute bottom-3 left-3 text-[10px] font-medium tracking-wide uppercase bg-carbon/75 text-white px-2 py-1 rounded">
                    {item.condition}
                  </div>
                </div>
                <p className="text-sm font-medium text-carbon mb-1">{item.name}</p>
                <p className="text-xs text-muted mb-2">{item.brand}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-carbon">{item.price}</span>
                  <span className="text-xs text-muted bg-beige-dark px-2 py-1 rounded">{item.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}