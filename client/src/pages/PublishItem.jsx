import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";

const categories = ["Mujer", "Hombre", "Niños", "Vintage", "Accesorios"];
const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
];
const conditions = ["Como nuevo", "Muy bueno", "Bueno", "Aceptable"];

export default function PublishItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    city: "",
  });
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validImages = images.filter(Boolean);
      let imageUrls = [];
      if (validImages.length > 0) {
        imageUrls = await productService.uploadImages(validImages);
        console.log("URLs subidas:", imageUrls);
      }
      console.log("Creando producto con images:", imageUrls);
      await productService.createProduct({
        ...form,
        size: selectedSize,
        condition: selectedCondition,
        price: Number(form.price),
        images: imageUrls,
      });
      navigate("/explorar");
    } catch (err) {
      console.error("Error al publicar:", err);
      alert("Error al publicar la prenda. Asegurate de estar logueado.");
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    "Buenos Aires",
    "Córdoba",
    "Rosario",
    "Mendoza",
    "La Plata",
    "Mar del Plata",
    "Otra",
  ];

  return (
    <main className="pt-16 min-h-screen bg-beige">
      <div className="px-[7%] py-12">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-terracota mb-4">
          <span className="w-6 h-px bg-terracota" />
          Nuevo listado
        </div>
        <h1 className="font-display text-5xl font-bold text-carbon mb-12">
          Publicar prenda
        </h1>

        <div className="grid grid-cols-3 gap-16">
          <form
            onSubmit={handleSubmit}
            className="col-span-2 flex flex-col gap-8"
          >
            {/* Fotos */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Fotos
              </label>
              <div className="grid grid-cols-4 gap-3">
                {/* Foto principal */}
                <label className="aspect-square bg-beige-dark border-2 border-dashed border-carbon/20 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-terracota transition-colors duration-200 col-span-2 row-span-2 overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 0)}
                    className="hidden"
                  />
                  {previews[0] ? (
                    <img
                      src={previews[0]}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-muted mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <p className="text-xs text-muted">Foto principal</p>
                    </>
                  )}
                </label>

                {/* Fotos secundarias */}
                {[1, 2, 3, 4].map((i) => (
                  <label
                    key={i}
                    className="aspect-square bg-beige-dark border-2 border-dashed border-carbon/20 rounded-md flex items-center justify-center cursor-pointer hover:border-terracota transition-colors duration-200 overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, i)}
                      className="hidden"
                    />
                    {previews[i] ? (
                      <img
                        src={previews[i]}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-muted"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">
                Agregá hasta 5 fotos. La primera será la principal.
              </p>
            </div>

            {/* Título */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej: Campera de cuero marrón Zara talle M"
                className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Descripción
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describí el estado, materiales, medidas, etc."
                rows={5}
                className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200 resize-none"
              />
            </div>

            {/* Categoría y Ciudad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                  Categoría
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon focus:outline-none focus:border-terracota transition-colors duration-200"
                >
                  <option value="">Seleccioná</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                  Ciudad
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full bg-white border border-carbon/15 rounded px-4 py-3 text-sm text-carbon focus:outline-none focus:border-terracota transition-colors duration-200"
                >
                  <option value="">Seleccioná</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Talle */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Talle
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs font-medium px-4 py-2 rounded border transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-carbon text-white border-carbon"
                        : "bg-white text-carbon border-carbon/20 hover:border-terracota hover:text-terracota"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Condición */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Condición
              </label>
              <div className="flex gap-3">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    className={`text-xs font-medium px-4 py-2.5 rounded border transition-colors duration-200 ${
                      selectedCondition === cond
                        ? "bg-carbon text-white border-carbon"
                        : "bg-white text-carbon border-carbon/20 hover:border-terracota hover:text-terracota"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div>
              <label className="text-xs font-medium tracking-widest uppercase text-muted block mb-3">
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-white border border-carbon/15 rounded pl-8 pr-4 py-3 text-sm text-carbon placeholder:text-muted/50 focus:outline-none focus:border-terracota transition-colors duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracota hover:bg-terracota-dark text-white text-sm font-medium py-4 rounded transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar prenda"}
            </button>
          </form>

          {/* Panel lateral */}
          <div className="flex flex-col gap-6">
            <div className="bg-carbon rounded-md p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-white/40 mb-4">
                Tips para vender más
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "📸", tip: "Usá buena luz natural para las fotos" },
                  { icon: "📝", tip: "Describí el estado con honestidad" },
                  {
                    icon: "💰",
                    tip: "Investigá precios similares antes de publicar",
                  },
                  { icon: "📍", tip: "Indicá si aceptás entrega en mano" },
                ].map((item) => (
                  <div key={item.tip} className="flex items-start gap-3">
                    <span className="text-base">{item.icon}</span>
                    <p className="text-xs font-light text-white/55 leading-relaxed">
                      {item.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-carbon/10 rounded-md p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-muted mb-3">
                Comisión
              </p>
              <p className="font-display text-4xl font-bold text-carbon mb-2">
                0%
              </p>
              <p className="text-xs text-muted leading-relaxed">
                En Reloop no cobramos comisión. Lo que ponés es lo que recibís.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
