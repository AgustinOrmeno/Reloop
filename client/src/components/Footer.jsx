const footerLinks = {
  Explorar: ['Mujer', 'Hombre', 'Niños', 'Vintage', 'Accesorios'],
  Comunidad: ['Cómo funciona', 'Vender en Reloop', 'Looks del día', 'Blog'],
  Soporte: ['Ayuda', 'Envíos', 'Pagos seguros', 'Términos', 'Privacidad'],
}

export default function Footer() {
  return (
    <footer className="bg-carbon px-[7%] pt-16 pb-10">

      <div className="grid grid-cols-4 gap-10 pb-12 border-b border-white/10 mb-8">

        <div>
          <div className="flex items-center gap-2 font-display text-2xl font-bold text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-terracota inline-block" />
            Reloop
          </div>
          <p className="text-sm font-light text-white/40 leading-relaxed max-w-[220px]">
            El marketplace argentino de ropa usada. Moda circular para todos.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <p className="text-xs font-medium tracking-widest uppercase text-white/30 mb-5">
              {title}
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-white/25">© 2025 Reloop. Hecho en Argentina 🇦🇷</p>
        <div className="flex gap-3">
          {['in', 'ig', 'tw'].map((s) => (
            <button key={s} className="w-9 h-9 rounded-full border border-white/10 text-xs text-white/40 hover:border-terracota hover:text-terracota transition-all duration-200">
              {s}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}