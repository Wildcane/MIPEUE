import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { POLICIES, FAQS, ABOUT_US } from '../data/store.js';

export default function PoliciesSection() {
  const [openPolicyId, setOpenPolicyId] = useState(POLICIES[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const togglePolicy = (id) => {
    setOpenPolicyId((prev) => (prev === id ? null : id));
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="border-t border-ink/10">
      {/* 1. SECCIÓN NUESTRA HISTORIA / QUIÉNES SOMOS */}
      <section id="historia" className="py-20 md:py-28 bg-sand/15" aria-labelledby="historia-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <span className="label text-forest mb-3 block">{ABOUT_US.badge}</span>
              <h2 id="historia-title" className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-ink leading-[1.05]">
                {ABOUT_US.title}
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5 text-sm md:text-base text-ink/80 leading-relaxed max-w-2xl">
              {ABOUT_US.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. POLÍTICAS DE ENTREGA Y DEVOLUCIÓN */}
      <section id="politicas" className="border-t border-ink/10 py-16 md:py-24" aria-labelledby="politicas-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="label text-forest mb-2">Términos y condiciones</p>
              <h2 id="politicas-title" className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-ink">
                Políticas de Entrega y Devolución
              </h2>
              <p className="mt-4 text-xs md:text-sm text-ink/70 leading-relaxed max-w-sm">
                Despachos en Managua por motorizado, envíos a departamentos vía CargoTrans y lapso estricto de 24 horas para reclamos de cambio.
              </p>
            </div>

            <div className="md:col-span-7 divide-y divide-ink/10 border-y border-ink/10">
              {POLICIES.map((policy) => {
                const isOpen = openPolicyId === policy.id;
                return (
                  <div key={policy.id} className="py-4">
                    <button
                      type="button"
                      onClick={() => togglePolicy(policy.id)}
                      className="flex w-full items-center justify-between py-2 text-left transition-opacity hover:opacity-75 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base font-bold uppercase tracking-wide text-ink">
                        {policy.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-ink transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-2 pb-3 space-y-2.5 text-xs md:text-sm text-ink/80 leading-relaxed">
                        {policy.items.map((item, idx) => (
                          <p key={idx} className="flex items-start gap-2">
                            <span className="text-forest mt-1 shrink-0">▪</span>
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

      {/* 3. PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="border-t border-ink/10 py-16 md:py-24 bg-cream-soft" aria-labelledby="faq-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="label text-forest mb-2">Respuestas rápidas</p>
              <h2 id="faq-title" className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-ink">
                Preguntas Frecuentes (FAQ)
              </h2>
              <p className="mt-4 text-xs md:text-sm text-ink/70 leading-relaxed max-w-sm">
                Conocé nuestros métodos de pago, reservas de la última colección con 40% y opciones para coordinar entregas seguras.
              </p>
            </div>

            <div className="md:col-span-7 divide-y divide-ink/10 border-y border-ink/10">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between py-2 text-left transition-opacity hover:opacity-75 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-sm md:text-base font-bold text-ink">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-ink transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-2 pb-3 text-xs md:text-sm text-ink/80 leading-relaxed">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
