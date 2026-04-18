const features = [
  {
    icon: '📍',
    title: 'Filtro por ciudad',
    desc: 'Encontrá prendas cerca tuyo para retirar en mano.',
  },
  {
    icon: '🤝',
    title: 'Modo oferta',
    desc: 'Proponé un precio y negociá directamente con el vendedor.',
  },
  {
    icon: '✨',
    title: 'Looks completos',
    desc: 'Outfits armados con prendas del marketplace para inspirarte.',
  },
]

const perks = [
  'Pagos protegidos',
  'Envíos a todo el país',
  'Perfil verificado',
  'Sistema de reputación',
]

export default function WhyReloop() {
  return (
    <section className="px-[7%] pb-24 grid grid-cols-2 gap-20 items-center">

      {/* Lado izquierdo — panel oscuro */}
      <div className="bg-carbon rounded-md p-14 min-h-[480px] flex flex-col justify-between">
        <div>
          <div className="font-display text-9xl font-bold text-terracota leading-none">
            0%
          </div>
          <p className="text-base font-light text-white/60 mt-3 max-w-[260px] leading-relaxed">
            de comisión al vendedor. Vos te quedás con todo.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-3 text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-terracota-light flex-shrink-0" />
              {perk}
            </div>
          ))}
        </div>
      </div>

      {/* Lado derecho — texto y features */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-5">
          <span className="w-6 h-px bg-terracota" />
          Por qué Reloop
        </div>
        <h2 className="font-display text-5xl font-bold text-carbon leading-tight mb-6">
          Diferente<br />desde adentro.
        </h2>
        <p className="text-base font-light text-muted leading-relaxed mb-10">
          El primer marketplace argentino pensado exclusivamente para ropa usada.
          Sin categorías de más, sin distracciones. Solo moda circular, hecha para vos.
        </p>

        <div className="flex flex-col">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 py-5 border-b border-carbon/10">
              <div className="w-10 h-10 rounded bg-beige-dark flex items-center justify-center text-lg flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-carbon mb-1">{f.title}</p>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}