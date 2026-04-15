import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[7%] h-16 bg-beige/90 backdrop-blur-md border-b border-terracota/10">

      <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-carbon">
        <span className="w-2 h-2 rounded-full bg-terracota inline-block" />
        Reloop
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {['Explorar', 'Mujer', 'Hombre', 'Niños', 'Cómo funciona'].map((item) => (
          <li key={item}>
            <Link to="/" className="text-sm text-muted hover:text-carbon transition-colors duration-200">
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button className="text-sm font-medium text-carbon px-4 py-2 rounded hover:bg-beige-dark transition-colors duration-200">
          Ingresar
        </button>
        <button className="text-sm font-medium text-white bg-carbon px-5 py-2 rounded hover:bg-carbon-mid transition-colors duration-200">
          Publicar prenda
        </button>
      </div>
    </nav>
  )
}