import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { POLICIES } from '../data/store.js';

export default function PoliciesSection() {
  const [openId, setOpenId] = useState(POLICIES[0].id);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="politicas" className="border-t border-ink/10 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="label text-forest mb-2">Información de servicio</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-ink">
              Políticas y Envíos
            </h2>
            <p className="mt-4 text-sm text-ink/70 leading-relaxed max-w-sm">
              Conocé las condiciones de despacho en Managua y departamentos, puntos de retiro oficial y políticas de cambios dentro del plazo establecido.
            </p>
          </div>

          <div className="md:col-span-7 divide-y divide-ink/10 border-y border-ink/10">
            {POLICIES.map((policy) => {
              const isOpen = openId === policy.id;
              return (
                <div key={policy.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggle(policy.id)}
                    className="flex w-full items-center justify-between py-2 text-left transition-opacity hover:opacity-75"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base md:text-lg font-bold uppercase tracking-wide text-ink">
                      {policy.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-ink transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-3 space-y-2 text-xs md:text-sm text-ink/80 leading-relaxed">
                      {policy.items.map((item, idx) => (
                        <p key={idx} className="flex items-start gap-2">
                          <span className="text-forest mt-1">▪</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
