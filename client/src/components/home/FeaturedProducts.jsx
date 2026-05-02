import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'
import productService from '../../services/productService'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await productService.getProducts()
        setProducts(data.slice(0, 4))
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])

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
        <Link to="/explorar" className="text-sm font-medium text-terracota hover:text-terracota-dark transition-colors duration-200">
          Ver todo
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  )
}