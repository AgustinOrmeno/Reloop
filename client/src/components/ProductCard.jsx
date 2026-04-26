import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`} className="block cursor-pointer transition-transform duration-200 hover:-translate-y-1">

      <div className="w-full aspect-[3/4] rounded-md mb-3 relative overflow-hidden bg-beige-dark">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-terracota" />
        )}

        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-beige/90 flex items-center justify-center hover:bg-beige transition-colors duration-200 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-carbon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-3 text-[10px] font-medium tracking-wide uppercase bg-carbon/75 text-white px-2 py-1 rounded z-10">
          {product.condition}
        </div>
      </div>

      <p className="text-sm font-medium text-carbon mb-1 truncate">{product.title || product.name}</p>
      <p className="text-xs text-muted mb-2">{product.user?.name} · {product.city}</p>
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-bold text-carbon">${product.price}</span>
        <span className="text-xs text-muted bg-beige-dark px-2 py-1 rounded">{product.size}</span>
      </div>

    </Link>
  )
}