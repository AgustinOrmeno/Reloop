const steps = [
  {
    num: '01',
    icon: '📸',
    title: 'Publicá tu prenda',
    desc: 'Sacale fotos, poné el precio y listo. En menos de 3 minutos tu prenda está visible para miles de compradores.',
  },
  {
    num: '02',
    icon: '💬',
    title: 'Conectá con compradores',
    desc: 'Respondé consultas, negociá el precio y acordá el envío o la entrega en mano dentro de tu ciudad.',
  },
  {
    num: '03',
    icon: '💸',
    title: 'Cobrá seguro',
    desc: 'El pago queda retenido hasta que el comprador confirme la recepción. Tu plata siempre está protegida.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-[7%] py-24">

      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-5">
        <span className="w-6 h-px bg-terracota" />
        El proceso
      </div>
      <h2 className="font-display text-5xl font-bold text-carbon leading-tight mb-14 max-w-sm">
        Simple, rápido y seguro.
      </h2>

      {/* Steps */}
      <div className="grid grid-cols-3 gap-[2px]">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`bg-carbon p-12 flex flex-col justify-between min-h-[320px] group hover:bg-carbon-mid transition-colors duration-300 ${
              i === 0 ? 'rounded-l-md' : ''
            } ${i === 2 ? 'rounded-r-md' : ''}`}
          >
            <div>
              {/* Número grande decorativo */}
              <div className="font-display text-7xl font-bold text-white/[0.06] leading-none mb-8">
                {step.num}
              </div>
              {/* Ícono */}
              <div className="text-3xl mb-5">{step.icon}</div>
              {/* Título */}
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>
            </div>
            {/* Descripción */}
            <p className="text-sm font-light text-white/50 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}