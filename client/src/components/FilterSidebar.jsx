import { useState } from 'react'

const categories = ['Mujer', 'Hombre', 'Niños', 'Vintage', 'Accesorios']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const conditions = ['Como nuevo', 'Muy bueno', 'Bueno', 'Aceptable']

export default function FilterSidebar({ onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')

  const handleCategoryChange = (cat) => {
    const newCat = selectedCategory === cat ? '' : cat
    setSelectedCategory(newCat)
    onFilter({ category: newCat, size: selectedSize, condition: selectedCondition })
  }

  const handleSizeClick = (size) => {
    const newSize = selectedSize === size ? '' : size
    setSelectedSize(newSize)
    onFilter({ category: selectedCategory, size: newSize, condition: selectedCondition })
  }

  const handleConditionChange = (cond) => {
    const newCond = selectedCondition === cond ? '' : cond
    setSelectedCondition(newCond)
    onFilter({ category: selectedCategory, size: selectedSize, condition: newCond })
  }

  return (
    <aside className="w-64 flex-shrink-0">

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">Categoría</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
                className="accent-terracota w-4 h-4"
              />
              <span className="text-sm text-carbon group-hover:text-terracota transition-colors duration-200">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">Talle</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors duration-200 ${
                selectedSize === size
                  ? 'bg-carbon text-white border-carbon'
                  : 'text-carbon border-carbon/20 hover:border-terracota hover:text-terracota'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted mb-4">Condición</h3>
        <div className="flex flex-col gap-2">
          {conditions.map((cond) => (
            <label key={cond} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCondition === cond}
                onChange={() => handleConditionChange(cond)}
                className="accent-terracota w-4 h-4"
              />
              <span className="text-sm text-carbon group-hover:text-terracota transition-colors duration-200">{cond}</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  )
}