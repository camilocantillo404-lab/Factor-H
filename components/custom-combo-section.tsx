"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const categories = [
  {
    id: "reloj",
    label: "RELOJ",
    options: [
      { name: "CURREN 8399 ROYAL BLUE", price: 109900 },
      { name: "ROLEX DATEJUST CHAMPAGNE GOLD", price: 119900 },
      { name: "INVICTA BOLT ZEUS RESERVE", price: 129900 },
    ],
  },
  {
    id: "perfume",
    label: "PERFUME",
    options: [
      { name: "GIORGIO ARMANI ACQUA DI GIÒ PROFUMO", price: 130000 },
      { name: "STRONGER WITH YOU INTENSELY", price: 150000 },
      { name: "JEAN PAUL GAULTIER LE MALE ELIXIR", price: 169900 },
    ],
  },
  {
    id: "gorra",
    label: "GORRA",
    options: [
      { name: "AMIRI - FIRMA PEDRERÍA", price: 55000 },
      { name: "CLEMONT - C ROJA", price: 59900 },
      { name: "AMIRI ARTS DISTRICT - BLANCA", price: 65000 },
    ],
  },
]

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-CO")}`
}

export function CustomComboSection() {
  const [selections, setSelections] = useState<Record<string, number | null>>({
    reloj: null,
    perfume: null,
    gorra: null,
  })

  const handleSelect = (categoryId: string, index: number) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }))
  }

  const selectedItems = categories
    .map((cat) => {
      const idx = selections[cat.id]
      if (idx === null) return null
      return { category: cat.label, ...cat.options[idx] }
    })
    .filter(Boolean) as { category: string; name: string; price: number }[]

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const discount = selectedItems.length === 3 ? Math.round(total * 0.1) : 0
  const finalTotal = total - discount

  const isComplete = selectedItems.length === 3

  const whatsappMessage = isComplete
    ? `Hola! Quiero armar mi combo personalizado Factor H:%0A${selectedItems
      .map((i) => `- ${i.category}: ${i.name}`)
      .join("%0A")}%0ATotal: ${formatPrice(finalTotal)}`
    : ""

  return (
    <section id="crea-tu-combo" className="relative py-24 md:py-32 bg-secondary">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-primary/40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            PERSONALIZA TU ESTILO
          </p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.06em] text-foreground text-balance">
            Crea Tu Combo
          </h2>
          <p className="mt-4 font-sans text-sm text-muted-foreground tracking-wide max-w-lg mx-auto">
            Selecciona un articulo de cada categoria y obtiene un 10% de descuento al armar tu combo completo.
          </p>
        </div>

        {/* Category selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-serif text-lg tracking-[0.15em] text-primary mb-6 text-center">
                {cat.label}
              </h3>
              <div className="flex flex-col gap-3">
                {cat.options.map((option, idx) => {
                  const isSelected = selections[cat.id] === idx
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleSelect(cat.id, idx)}
                      className={`relative flex items-center justify-between px-5 py-4 border transition-all duration-300 text-left ${isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-300 ${isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                            }`}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </span>
                        <span className="font-sans text-sm tracking-wide text-foreground">
                          {option.name}
                        </span>
                      </div>
                      <span className="font-sans text-sm text-muted-foreground">
                        {formatPrice(option.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 max-w-md mx-auto">
          <div className="border border-border bg-card p-8">
            <h4 className="font-serif text-lg tracking-[0.1em] text-foreground mb-6 text-center">
              TU SELECCION
            </h4>

            {selectedItems.length === 0 ? (
              <p className="text-sm font-sans text-muted-foreground text-center tracking-wide">
                Selecciona un articulo de cada categoria.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs font-sans tracking-[0.15em] text-muted-foreground">
                      {item.category}: <span className="text-foreground">{item.name}</span>
                    </span>
                    <span className="text-sm font-sans text-muted-foreground">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}

                {discount > 0 && (
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs font-sans tracking-[0.15em] text-primary">
                      DESCUENTO 10%
                    </span>
                    <span className="text-sm font-sans text-primary">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs font-sans tracking-[0.15em] text-foreground">
                    TOTAL
                  </span>
                  <span className="font-serif text-xl text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            )}

            <a
              href={
                isComplete
                  ? `https://wa.me/573022726955?text=${whatsappMessage}`
                  : undefined
              }
              target={isComplete ? "_blank" : undefined}
              rel={isComplete ? "noopener noreferrer" : undefined}
              className={`mt-8 block w-full text-center py-4 text-[10px] font-sans tracking-[0.2em] transition-all duration-300 ${isComplete
                  ? "bg-primary text-primary-foreground hover:bg-gold-light cursor-pointer"
                  : "bg-border text-muted-foreground cursor-not-allowed"
                }`}
            >
              {isComplete ? "SOLICITAR POR WHATSAPP" : "COMPLETA TU COMBO"}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
