const categories = ['Mujer', 'Hombre', 'Niños', 'Vintage', 'Accesorios']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const conditions = ['Como nuevo', 'Muy bueno', 'Bueno', 'Aceptable']

export default function FilterSidebar() {
  return (
    <aside className="w-64 flex-shrink-0">

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
          Categoría
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-terracota w-4 h-4" />
              <span className="text-sm text-carbon group-hover:text-terracota transition-colors duration-200">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
          Talle
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="text-xs font-medium text-carbon border border-carbon/20 px-3 py-1.5 rounded hover:border-terracota hover:text-terracota transition-colors duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
          Condición
        </h3>
        <div className="flex flex-col gap-2">
          {conditions.map((cond) => (
            <label key={cond} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-terracota w-4 h-4" />
              <span className="text-sm text-carbon group-hover:text-terracota transition-colors duration-200">
                {cond}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
          Precio máximo
        </h3>
        <input
          type="range"
          min="0"
          max="20000"
          defaultValue="20000"
          className="w-full accent-terracota"
        />
        <div className="flex justify-between text-xs text-muted mt-2">
          <span>$0</span>
          <span>$20.000</span>
        </div>
      </div>

    </aside>
  )
}