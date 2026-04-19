import FilterSidebar from '../components/FilterSidebar'
import ProductCard from '../components/ProductCard'

const products = [
  { id: 1, name: 'Campera de cuero marrón', brand: 'Zara', city: 'Buenos Aires', price: '$8.500', size: 'M', condition: 'Como nuevo', bg: 'bg-terracota' },
  { id: 2, name: 'Vestido floral midi', brand: 'H&M', city: 'Córdoba', price: '$4.200', size: 'S', condition: 'Muy bueno', bg: 'bg-carbon-light' },
  { id: 3, name: 'Blazer oversize gris', brand: 'Mango', city: 'Rosario', price: '$6.800', size: 'L', condition: 'Bueno', bg: 'bg-beige-dark' },
  { id: 4, name: 'Jean tiro alto azul', brand: 'Levis', city: 'Mendoza', price: '$5.500', size: '28', condition: 'Como nuevo', bg: 'bg-terracota-light' },
  { id: 5, name: 'Remera vintage negra', brand: 'Sin marca', city: 'Buenos Aires', price: '$2.100', size: 'M', condition: 'Bueno', bg: 'bg-carbon' },
  { id: 6, name: 'Tapado largo camel', brand: 'Zara', city: 'Córdoba', price: '$12.000', size: 'L', condition: 'Como nuevo', bg: 'bg-terracota-dark' },
  { id: 7, name: 'Pollera midi estampada', brand: 'H&M', city: 'Rosario', price: '$3.800', size: 'S', condition: 'Muy bueno', bg: 'bg-carbon-mid' },
  { id: 8, name: 'Zapatillas blancas', brand: 'Adidas', city: 'Buenos Aires', price: '$7.200', size: '39', condition: 'Bueno', bg: 'bg-beige-dark' },
]

export default function Explore() {
  return (
    <main className="pt-16 min-h-screen bg-beige">

      <div className="px-[7%] py-10 border-b border-carbon/10">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-3">
          <span className="w-6 h-px bg-terracota" />
          Marketplace
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl font-bold text-carbon">
            Explorar prendas
          </h1>
          <p className="text-sm text-muted">{products.length} prendas encontradas</p>
        </div>
      </div>

      <div className="px-[7%] py-10 flex gap-10">
        <FilterSidebar />
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

    </main>
  )
}