import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { SIZE_GUIDE } from '../data/sizeGuide.js';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="size-modal-title">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
          onClick={() => setSizeGuideOpen(false)}
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-2xl bg-cream p-6 md:p-8 border border-ink/10 shadow-none z-10">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <div>
              <p className="label text-[10px] text-ink/50">Medidas oficiales</p>
              <h2 id="size-modal-title" className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                Guía de Tallas
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSizeGuideOpen(false)}
              className="p-1 text-ink/70 hover:text-ink transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-6 space-y-8 max-h-[70vh] overflow-y-auto pr-1">
            <p className="text-xs text-ink/70">
              Todas las medidas están expresadas en centímetros (cm) y corresponden a la prenda extendida sobre una superficie plana.
            </p>

            {SIZE_GUIDE.map((table) => (
              <div key={table.id} className="space-y-2">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-forest">
                  {table.label}
                </h3>
                <div className="overflow-x-auto border border-ink/10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sand/30 border-b border-ink/10">
                      <tr>
                        {table.columns.map((col, idx) => (
                          <th key={idx} className="py-2.5 px-3 font-semibold uppercase tracking-wider text-ink/70">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-sand/10 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`py-2 px-3 ${cIdx === 0 ? 'font-bold text-ink' : 'text-ink/80'}`}>
                              {typeof cell === 'number' ? `${cell} cm` : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ink/10 pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setSizeGuideOpen(false)}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider border border-ink bg-transparent text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
