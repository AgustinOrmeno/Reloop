import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="pt-16 min-h-screen bg-beige flex items-center justify-center">
      <div className="text-center px-8">

        <div className="font-display text-[180px] font-bold text-carbon/8 leading-none mb-4">
          404
        </div>

        <h1 className="font-display text-4xl font-bold text-carbon mb-4 -mt-8">
          Página no encontrada
        </h1>

        <p className="text-sm font-light text-muted max-w-sm mx-auto leading-relaxed mb-10">
          La página que buscás no existe o fue movida. Volvé al inicio o explorá las prendas disponibles.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-terracota hover:bg-terracota-dark text-white text-sm font-medium px-8 py-3 rounded transition-colors duration-200"
          >
            Volver al inicio
          </Link>
          <Link
            to="/explorar"
            className="border border-carbon text-carbon hover:bg-carbon hover:text-white text-sm font-medium px-8 py-3 rounded transition-all duration-200"
          >
            Explorar prendas
          </Link>
        </div>

      </div>
    </main>
  )
}