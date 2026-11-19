import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose, isInverted }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Dialog Box */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative z-10 max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-3xl p-4 sm:p-6 shadow-2xl border ${
              isInverted
                ? 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20'
                : 'bg-[#0b241f] text-[#e6e1d5] border-[#e6e1d5]/20'
            }`}
          >
            {/* Header sticky con botón de cierre X accesible */}
            <div
              className={`sticky top-0 z-10 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 py-3 sm:px-6 sm:py-4 border-b border-current/15 flex items-center justify-between backdrop-blur-md ${
                isInverted ? 'bg-[#e6e1d5]/95' : 'bg-[#0b241f]/95'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Ruler className="w-5 h-5 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider truncate">
                  Guía de Medidas Oficial (cm)
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar guía de medidas"
                className="p-1.5 rounded-full opacity-70 hover:opacity-100 hover:bg-black/10 transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido responsivo con tablas scrolleables */}
            <div className="pt-4 space-y-4 text-xs sm:text-sm">
              <p className="opacity-80 leading-relaxed text-xs">
                Medidas oficiales tomadas sobre prenda plana en centímetros (100% algodón peinado nicaragüense):
              </p>

              {/* Camisetas Unisex */}
              <div className="space-y-1.5">
                <span className="font-bold text-xs uppercase tracking-wider opacity-90 block">
                  Camisetas Unisex (Corte Regular / Clásico)
                </span>
                <div className="w-full overflow-x-auto my-2 -mx-2 px-2 scrollbar-thin">
                  <table className="min-w-[320px] w-full text-xs sm:text-sm text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-current/20 opacity-70">
                        <th className="py-2 px-3 font-semibold">Talla</th>
                        <th className="py-2 px-3 font-semibold">Ancho (pecho)</th>
                        <th className="py-2 px-3 font-semibold">Largo total</th>
                        <th className="py-2 px-3 font-semibold">Hombro</th>
                        <th className="py-2 px-3 font-semibold">Manga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-current/10">
                      <tr>
                        <td className="py-2 px-3 font-bold">S</td>
                        <td className="py-2 px-3">48 cm</td>
                        <td className="py-2 px-3">69 cm</td>
                        <td className="py-2 px-3">43 cm</td>
                        <td className="py-2 px-3">20 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold">M</td>
                        <td className="py-2 px-3">51 cm</td>
                        <td className="py-2 px-3">71 cm</td>
                        <td className="py-2 px-3">46 cm</td>
                        <td className="py-2 px-3">21 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold">L</td>
                        <td className="py-2 px-3">55 cm</td>
                        <td className="py-2 px-3">74 cm</td>
                        <td className="py-2 px-3">48 cm</td>
                        <td className="py-2 px-3">22 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold">XL</td>
                        <td className="py-2 px-3">58 cm</td>
                        <td className="py-2 px-3">77 cm</td>
                        <td className="py-2 px-3">50 cm</td>
                        <td className="py-2 px-3">23 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tops Bicolor */}
              <div className="space-y-1.5 pt-2 border-t border-current/10">
                <span className="font-bold text-xs uppercase tracking-wider opacity-90 block">
                  Tops Raglán / Baby Tees
                </span>
                <div className="w-full overflow-x-auto my-2 -mx-2 px-2 scrollbar-thin">
                  <table className="min-w-[320px] w-full text-xs sm:text-sm text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-current/20 opacity-70">
                        <th className="py-2 px-3 font-semibold">Talla</th>
                        <th className="py-2 px-3 font-semibold">Ancho (pecho)</th>
                        <th className="py-2 px-3 font-semibold">Largo</th>
                        <th className="py-2 px-3 font-semibold">Manga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-current/10">
                      <tr>
                        <td className="py-2 px-3 font-bold">Unitalla</td>
                        <td className="py-2 px-3">46 cm</td>
                        <td className="py-2 px-3">50.5 cm</td>
                        <td className="py-2 px-3">26 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tote Bags */}
              <div className="space-y-1.5 pt-2 border-t border-current/10">
                <span className="font-bold text-xs uppercase tracking-wider opacity-90 block">
                  Tote Bags (Lona Cruda 12oz)
                </span>
                <p className="text-xs opacity-75">
                  Medida única estándar: <strong>32 × 35 cm</strong> con asas reforzadas de 60 cm para colgar cómodamente al hombro.
                </p>
              </div>

              <div className="pt-3 border-t border-current/10">
                <p className="text-[11px] opacity-65 leading-relaxed">
                  * Si necesitas confección en una talla especial (XS o XXL), consúltanos al confirmar tu pedido por WhatsApp para coordinar tu pieza personalizada.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
