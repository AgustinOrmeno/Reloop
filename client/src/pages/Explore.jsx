import { useState, useEffect } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import ProductCard from '../components/ProductCard'
import productService from '../services/productService'

export default function Explore() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})

  const fetchProducts = async (activeFilters = {}) => {
    setLoading(true)
    try {
      const data = await productService.getProducts(activeFilters)
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
    fetchProducts(newFilters)
  }

  return (
    <main className="pt-16 min-h-screen bg-beige">

      <div className="px-[7%] py-10 border-b border-carbon/10">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-3">
          <span className="w-6 h-px bg-terracota" />
          Marketplace
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl font-bold text-carbon">Explorar prendas</h1>
          <p className="text-sm text-muted">{products.length} prendas encontradas</p>
        </div>
      </div>

      <div className="px-[7%] py-10 flex gap-10">
        <FilterSidebar onFilter={handleFilter} />
        <div className="flex-1">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-muted">Cargando prendas...</p>
            </div>
          )}
          {!loading && products.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-muted">No hay prendas publicadas todavía.</p>
            </div>
          )}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}