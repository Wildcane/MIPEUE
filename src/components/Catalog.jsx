import { useMemo, useState } from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/catalog.js';
import { useStore } from '../context/StoreContext.jsx';
import ProductCard from './ProductCard.jsx';

const ALL = 'todo';

export default function Catalog() {
  const [active, setActive] = useState(ALL);
  const { setSizeGuideOpen } = useStore();

  const products = useMemo(
    () => (active === ALL ? PRODUCTS : PRODUCTS.filter((p) => p.collection === active)),
    [active],
  );
  const collection = COLLECTIONS.find((c) => c.id === active);

  const filters = [{ id: ALL, name: 'Todo' }, ...COLLECTIONS];

  return (
    <section id="catalogo" className="border-t border-ink/10" aria-labelledby="catalogo-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 md:px-10 md:pt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-3 text-ink/50">Colecciones</p>
            <h2 id="catalogo-title" className="font-display text-4xl font-extrabold uppercase tracking-[-0.02em] md:text-6xl">
              Catálogo
            </h2>
          </div>
          <button type="button" onClick={() => setSizeGuideOpen(true)} className="label text-link self-start md:self-auto">
            Guía de tallas
          </button>
        </div>

        {/* Filtros en texto plano */}
        <nav
          aria-label="Filtrar por colección"
          className="-mx-5 mt-10 overflow-x-auto border-y border-ink/10 px-5 md:mx-0 md:px-0"
        >
          <ul className="flex min-w-max items-center gap-7 py-4 md:gap-10">
            {filters.map((f) => {
              const isActive = active === f.id;
              const total = f.id === ALL ? PRODUCTS.length : PRODUCTS.filter((p) => p.collection === f.id).length;
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setActive(f.id)}
                    aria-pressed={isActive}
                    className={`label whitespace-nowrap transition-opacity ${
                      isActive ? 'underline decoration-1 underline-offset-[6px]' : 'opacity-45 hover:opacity-100'
                    }`}
                  >
                    {f.name} <sup className="ml-0.5 text-[9px] tabular-nums">{total}</sup>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="mt-6 min-h-[1.5rem] max-w-xl text-sm text-ink/60" aria-live="polite">
          {collection ? collection.description : 'Catálogo estructurado por regiones, ciudades y leyendas de Nicaragua.'}
        </p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-14 pb-24 pt-10 md:grid-cols-3 md:gap-x-6 md:gap-y-20 md:pb-32 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
