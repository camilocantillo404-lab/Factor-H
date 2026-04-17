"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/components/cart"

const combos = [
  {
    name: "Golden Ratio",
    tag: "El oro no brilla solo",
    price: "$280.000",
    image: "/images/COMBO FIESTA.jpeg",
    items: "Rolex Daytona Gold + One Million + New Era 9FORTY A-Frame",
  },
  {
    name: "Prestige",
    tag: "Clase en cada detalle",
    price: "$300.000",
    image: "/images/Combo 2.jpeg",
    items: "Patek Philippe Nautilus Blanc + Yves Saint Laurent y Eau De Parfum + Polo Ralph Lauren - CREMA/BLANCO",
  },
  {
    name: "Midnight Legacy",
    tag: "Sofisticación sin límites",
    price: "$310.000",
    image: "/images/Combo 3.jpeg",
    items: "Audemars Piguet Royal Oak Noir + Valentino Born in Roma Intense + Amiri Arts District - Blanca",
  },
]

export function CombosSection() {

  const { addToCart } = useCart()
  const [expanded, setExpanded] = useState(false)

  const visibleCombos = expanded ? combos : combos.slice(0,3)

  return (
    <section id="combos" className="relative py-24 md:py-32 bg-stone-100">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-primary/40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            PRIORIDAD COMERCIAL
          </p>

          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.06em] text-black text-balance">
            Combos Exclusivos
          </h2>

          <p className="mt-4 font-sans text-sm text-muted-foreground tracking-wide max-w-lg mx-auto">
            Selecciones estrategicas para hombres que entienden el poder de los detalles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

          {visibleCombos.map((combo) => (
            <article
              key={combo.name}
              className="group relative bg-card border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-[10px] font-sans tracking-[0.2em] px-3 py-1">
                  {combo.tag}
                </span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={combo.image}
                  alt={`Combo ${combo.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-8">

                <h3 className="font-serif text-2xl tracking-[0.1em] text-foreground">
                  {combo.name}
                </h3>

                <p className="mt-2 text-xs font-sans tracking-wide text-muted-foreground">
                  {combo.items}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="font-serif text-xl text-primary">
                    {combo.price}
                  </span>

                  <button
                    onClick={() => addToCart(combo)}
                    className="bg-primary text-primary-foreground px-6 py-3 text-[10px] font-sans tracking-[0.2em] transition-all duration-300 hover:bg-gold-light"
                  >
                    ADQUIRIR AHORA
                  </button>

                </div>
              </div>
            </article>
          ))}

        </div>

        <div className="flex justify-center mt-12">

          <button
            onClick={() => setExpanded(!expanded)}
            className="border border-primary text-primary px-8 py-3 text-[10px] font-sans tracking-[0.3em] transition-all duration-500 hover:bg-primary hover:text-white"
          >
            {expanded ? "VER MENOS" : "VER MÁS"}
          </button>

        </div>

      </div>
    </section>
  )
}