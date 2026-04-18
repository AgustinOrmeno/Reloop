import { Link } from 'react-router-dom'

const trending = ['Vintage 90s', 'Oversize', 'Denim', 'Boho', 'Básicos']

const gridItems = [
  { label: 'Campera', price: '$8.500', bg: 'bg-terracota' },
  { label: 'Vestido', price: '$6.200', bg: 'bg-carbon-light' },
  { label: 'Zapatillas', price: '$9.500', bg: 'bg-carbon-mid' },
  { label: 'Saco', price: '$3.100', bg: 'bg-terracota-dark' },
]

const stats = [
  { num: '+12K', label: 'Prendas activas' },
  { num: '+3.4K', label: 'Vendedores' },
  { num: '24h', label: 'Tiempo promedio de venta' },
]

export default function HeroSection() {
  return (
    <section className="min-h-screen grid grid-cols-2 pt-16">

      {/* ── Lado izquierdo ── */}
      <div className="flex flex-col justify-center px-[7%] py-20">

        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-7">
          <span className="w-6 h-px bg-terracota" />
          Moda circular en Argentina
        </div>

        <h1 className="font-display text-6xl font-bold leading-[1.05] text-carbon mb-6">
          Tu ropa<br />merece una<br />
          <em className="text-terracota not-italic italic">segunda vida.</em>
        </h1>

        <p className="text-lg font-light text-muted leading-relaxed max-w-md mb-11">
          Comprá y vendé ropa usada de calidad. Dale un nuevo hogar a lo que
          ya no usás, y encontrá prendas únicas a precios increíbles.
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/explorar"
            className="bg-terracota hover:bg-terracota-dark text-white text-sm font-medium px-8 py-4 rounded transition-colors duration-200"
          >
            Explorar prendas
          </Link>
          <Link
            to="/publicar"
            className="border border-carbon text-carbon hover:bg-carbon hover:text-white text-sm font-medium px-7 py-4 rounded transition-all duration-200"
          >
            Vender ahora
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-14 pt-10 border-t border-carbon/10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-carbon">{s.num}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lado derecho ── */}
      <div className="bg-carbon relative overflow-hidden flex flex-col justify-end p-12">

        {/* Grid de productos */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px]">
          {gridItems.map((item) => (
            <div key={item.label} className={`${item.bg} relative`}>
              <span className="absolute bottom-4 left-4 text-[11px] font-medium tracking-widest uppercase text-white/50">
                {item.label}
              </span>
              <span className="absolute top-4 right-4 font-display text-lg font-bold text-white/90">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Card de tendencias */}
        <div className="relative z-10 bg-white/8 border border-white/10 rounded-md p-5 backdrop-blur-sm">
          <p className="text-[11px] font-medium tracking-widest uppercase text-white/40 mb-3">
            Tendencias hoy
          </p>
          <div className="flex flex-wrap gap-2">
            {trending.map((tag) => (
              <span
                key={tag}
                className="text-sm text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}