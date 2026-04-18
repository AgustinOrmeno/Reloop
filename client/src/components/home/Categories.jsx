const categories = [
  {
    name: 'Mujer',
    count: '+5.200 prendas',
    bg: 'bg-carbon',
    textColor: 'text-white',
    countColor: 'text-white/50',
    arrowColor: 'border-white/20 text-white/60',
    span: 'row-span-2',
    titleSize: 'text-4xl',
  },
  {
    name: 'Hombre',
    count: '+2.800 prendas',
    bg: 'bg-terracota',
    textColor: 'text-white',
    countColor: 'text-white/60',
    arrowColor: 'border-white/20 text-white/60',
    span: '',
    titleSize: 'text-2xl',
  },
  {
    name: 'Niños',
    count: '+1.600 prendas',
    bg: 'bg-carbon-light',
    textColor: 'text-white',
    countColor: 'text-white/50',
    arrowColor: 'border-white/20 text-white/60',
    span: '',
    titleSize: 'text-2xl',
  },
  {
    name: 'Accesorios',
    count: '+900 artículos',
    bg: 'bg-beige-dark',
    textColor: 'text-carbon',
    countColor: 'text-muted',
    arrowColor: 'border-carbon/20 text-muted',
    span: '',
    titleSize: 'text-2xl',
  },
  {
    name: 'Vintage',
    count: '+1.100 prendas',
    bg: 'bg-terracota-dark',
    textColor: 'text-white',
    countColor: 'text-white/50',
    arrowColor: 'border-white/20 text-white/60',
    span: '',
    titleSize: 'text-2xl',
  },
]

export default function Categories() {
  return (
    <section className="px-[7%] pb-24">

      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-5">
        <span className="w-6 h-px bg-terracota" />
        Explorá por categoría
      </div>
      <h2 className="font-display text-5xl font-bold text-carbon leading-tight mb-8 max-w-sm">
        Encontrá lo que buscás.
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[500px]">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`
              ${cat.bg} ${cat.span} relative rounded-md overflow-hidden
              flex flex-col justify-end p-7 cursor-pointer
              transition-transform duration-300 hover:scale-[0.99]
            `}
          >
            {/* Patrón decorativo */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  rgba(255,255,255,0.5) 0px,
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px,
                  transparent 20px
                )`,
              }}
            />

            {/* Flecha arriba a la derecha */}
            <div className={`absolute top-5 right-5 w-9 h-9 rounded-full border ${cat.arrowColor} flex items-center justify-center text-sm z-10`}>
              ↗
            </div>

            {/* Texto */}
            <div className="relative z-10">
              <h3 className={`font-display font-bold ${cat.titleSize} ${cat.textColor} mb-1`}>
                {cat.name}
              </h3>
              <p className={`text-sm ${cat.countColor}`}>{cat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}