"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/components/cart"
import { SearchBar } from "@/components/SearchBar"

const watches = [
  {
    name: "INVICTA BOLT 28015",
    price: "$129.900",
    image: "/images/invicta.jpeg",
    specs: ["Caja negra 51mm con cables dorados", "Correa de silicona negra", "Cronógrafo con subdiales dorados"],
  },
  {
    name: "CURREN 8399 ROYAL BLUE",
    price: "$109.900",
    image: "/images/RELOJ YA.jpg",
    specs: ["Cronógrafo de acero inoxidable azul", "Resistente al agua 3ATM", "Movimiento de cuarzo japonés"],
  },
 {
    name: "PATEK PHILIPPE NAUTILUS BLACK",
    price: "$119.900",
    image: "/images/patek.jpeg",
    specs: ["Diseño Nautilus icónico", "Esfera negra con textura horizontal", "Correa integrada de acero plateado"],
  },
 {
    name: "ROLEX DAYTONA SKELETON GOLD",
    price: "$119.900",
    image: "/images/Rolex 1.jpeg",
    specs: ["Mecanismo skeleton dorado visible", "Bisel tacómetro dorado", "Correa bicolor acero plateado y dorado"],
  },
  {
    name: "ROLEX DAYTONA SKELETON FULL GOLD",
    price: "$119.900",
    image: "/images/rolex 2.jpeg",
    specs: ["Mecanismo skeleton dorado completo", "Bisel tacómetro dorado", "Correa bicolor acero plateado y dorado"],
  },
  {
    name: "INVICTA BOLT ZEUS RESERVE",
    price: "$129.900",
    image: "/images/rolex 3.jpeg",
    specs: ["Caja plateada 52mm estilo octagonal", "Cronógrafo Swiss Made W/R 200MT", "Correa de silicona negra"],
  },
  {
    name: "ROLEX DATEJUST CHAMPAGNE GOLD",
    price: "$119.900",
    image: "/images/rolex 4.jpeg",
    specs: ["Esfera champagne dorada sunray", "Bisel estriado dorado fluted", "Correa Oyster bicolor acero y oro"],
  },
 {
    name: "ROLEX SUBMARINER ICED OUT GOLD",
    price: "$109.900",
    image: "/images/rolex 5.jpeg",
    specs: ["Esfera negra con índices dorados", "Bisel rotatorio negro 300M", "Correa y caja dorada full iced out"],
  },
  {
    name: "ROLEX SKELETON AUTOMATIC BLACK",
    price: "$119.900",
    image: "/images/rolex 6.jpeg",
    specs: ["Mecanismo skeleton visible", "Esfera negra con detalles plateados", "Correa de acero inoxidable plateada"],
  },
  {
    name: "ROLEX SKELETON AUTOMATIC WHITE GOLD",
    price: "$119.900",
    image: "/images/rolex 7.jpeg",
    specs: ["Mecanismo skeleton dorado visible", "Esfera blanca con índices dorados", "Correa bicolor acero plateado y dorado"],
  },
  {
    name: "CARTIER SANTOS 100 CARBON BLACK",
    price: "$115.000",
    image: "/images/cartier.jpeg",
    specs: ["Caja cuadrada negra con tornillos icónicos", "Esfera negra con números romanos", "Correa de caucho negra premium"],
  },
  {
    name: "ROLEX DAYTONA PANDA WHITE CERAMIC",
    price: "$119.900",
    image: "/images/rolex 8.jpeg",
    specs: ["Esfera blanca con subdiales negros estilo Panda", "Bisel cerámico negro tacómetro", "Correa Oyster de acero inoxidable"],
  },
  {
    name: "ROLEX DAYTONA BLACK CERAMIC",
    price: "$119.900",
    image: "/images/rolex 9.jpeg",
    specs: ["Esfera negra con subdiales plateados", "Bisel cerámico negro tacómetro", "Correa Oyster de acero inoxidable"],
  },
  {
    name: "ROLEX DAYTONA GOLD BLACK RACING",
    price: "$119.900",
    image: "/images/rolex 12.jpg",
    specs: ["Esfera champagne dorada con subdiales negros", "Bisel tacómetro dorado", "Correa Oyster full gold 18k"],
  },
  {
    name: "ROLEX DAYTONA BICOLOR WHITE GOLD",
    price: "$119.900",
    image: "/images/rolex 11.jpg",
    specs: ["Esfera blanca con subdiales dorados", "Bisel tacómetro dorado", "Correa Oyster bicolor acero y oro 18k"],
  },
  {
    name: "ROLEX YACHT-MASTER PLATINUM SILVER",
    price: "$115.000",
    image: "/images/rolex 13.jpeg",
    specs: ["Esfera plateada con índices circulares", "Bisel rotatorio platino con números en relieve", "Correa Oyster de acero inoxidable"],
  },
  // Imagen 1 - Patek Philippe Nautilus Tiffany Blue
  {
    name: "PATEK PHILIPPE NAUTILUS TIFFANY BLUE",
    price: "$119.900",
    image: "/images/patek 2.jpeg",
    specs: ["Esfera azul Tiffany con textura horizontal", "Caja y correa integrada de acero plateado", "Diseño Nautilus icónico con ventana de fecha"],
  },
  // Imagen 2 - Rolex Yacht-Master Blue
  {
    name: "ROLEX YACHT-MASTER BLUE PLATINUM",
    price: "$115.000",
    image: "/images/rolex 14.jpeg",
    specs: ["Esfera azul royal con índices circulares", "Bisel rotatorio platino con números en relieve", "Correa Oyster de acero inoxidable"],
  },
  // Imagen 3 - Patek Philippe Nautilus White
  {
    name: "PATEK PHILIPPE NAUTILUS BLANC",
    price: "$119.900",
    image: "/images/patek 3.jpeg",
    specs: ["Esfera blanca con textura horizontal minimalista", "Caja cuadrada integrada de acero plateado", "Indices plateados con ventana de fecha"],
  },
  // Imagen 4 - Cartier Santos 100 Silver
  {
    name: "CARTIER SANTOS 100 SILVER RUBBER",
    price: "$115.000",
    image: "/images/cartier 2.jpeg",
    specs: ["Esfera blanca con números romanos clásicos", "Caja cuadrada de acero con tornillos icónicos", "Correa de caucho negra premium"],
  },
  // Imagen 5 - Audemars Piguet Royal Oak Blue
  {
    name: "AUDEMARS PIGUET ROYAL OAK BLUE",
    price: "$119.900",
    image: "/images/audemas 2.jpeg",
    specs: ["Esfera azul con textura tapisserie icónica", "Caja octagonal de acero con tornillos hexagonales", "Correa integrada de acero inoxidable"],
  },
  // Imagen 6 - Audemars Piguet Royal Oak Black
  {
    name: "AUDEMARS PIGUET ROYAL OAK NOIR",
    price: "$119.900",
    image: "/images/audemas.jpeg",
    specs: ["Esfera negra con textura tapisserie", "Caja octagonal full black con tornillos", "Correa integrada de acero negro"],
  },
  // Imagen 7 - Audemars Piguet Royal Oak Chronograph Panda
  {
    name: "AUDEMARS PIGUET ROYAL OAK CHRONO PANDA",
    price: "$119.900",
    image: "/images/audemas 3.jpeg",
    specs: ["Esfera blanca con subdiales negros estilo Panda", "Cronógrafo automático con bisel octagonal", "Correa integrada de acero inoxidable"],
  },
  // Imagen 8 - Cartier Santos Bicolor
  {
    name: "CARTIER SANTOS GALBÉE BICOLOR",
    price: "$115.900",
    image: "/images/cartier 3.jpeg",
    specs: ["Esfera blanca con números romanos y manecillas azules", "Caja cuadrada bicolor acero y oro con tornillos dorados", "Correa integrada bicolor acero y oro"],
  },
  // Imagen 9 - Patek Philippe Nautilus Gold Blue
  {
    name: "PATEK PHILIPPE NAUTILUS FULL GOLD BLUE",
    price: "$119.900",
    image: "/images/patek 4.jpeg",
    specs: ["Esfera azul navy con degradado y textura horizontal", "Caja y correa integrada full gold", "Índices y manecillas doradas con ventana de fecha"],
  },
  // Imagen 1 - Richard Mille RM50-03/01 McLaren White
  {
    name: "RICHARD MILLE RM50-03 McLAREN WHITE",
    price: "$115.000",
    image: "/images/richard.jpeg",
    specs: ["Caja de fibra de carbono blanca edición McLaren", "Tourbillon skeleton con bisel rojo racing", "Correa de caucho blanca con corona negra"],
  },
  // Imagen 2 - Richard Mille RM50-03/01 McLaren Black
  {
    name: "RICHARD MILLE RM50-03 McLAREN BLACK",
    price: "$115.000",
    image: "/images/richard 2.jpeg",
    specs: ["Caja de fibra de carbono negro edición McLaren", "Tourbillon skeleton con bisel rojo racing", "Correa de caucho negra con corona roja"],
  },
]

export function WatchesSection() {

  const { addToCart } = useCart()
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = watches.filter((watch) =>
    watch.name.toLowerCase().includes(search)
  )

  const visibleWatches = expanded ? filtered : filtered.slice(0, 3)

  return (
    <section id="relojes" className="relative py-24 md:py-32 bg-secondary">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        

        {/* HEADER ORIGINAL RESTAURADO */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            PRECISION & ESTATUS
          </p>

          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.06em] text-foreground text-balance">
            Relojes
          </h2>

          <p className="mt-4 font-sans text-sm text-muted-foreground tracking-wide max-w-md mx-auto">
            Precision que comunica excelencia. Cada pieza seleccionada para proyectar autoridad.
          </p>
        </div>
        <SearchBar onSearch={setSearch} />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

          {visibleWatches.map((watch) => (
            <article
              key={watch.name}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >

              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 md:p-8">

                <h3 className="font-serif text-lg tracking-[0.1em] text-foreground">
                  {watch.name}
                </h3>

                {/* 🔥 RESTAURAMOS LAS SPECS */}
                <ul className="mt-4 flex flex-col gap-2">
                  {watch.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-xs font-sans text-muted-foreground tracking-wide"
                    >
                      <span className="h-px w-3 bg-primary/50" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-serif text-lg text-primary">
                    {watch.price}
                  </span>

                  <button
                    onClick={() => addToCart(watch)}
                    className="border border-primary text-primary px-5 py-2.5 text-[10px] font-sans tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    ORDENAR
                  </button>
                </div>

              </div>
            </article>
          ))}

        </div>

        {/* MENSAJE */}
        {filtered.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-4">
              ¿No encontraste lo que buscabas?
            </p>

            <a
              href="https://wa.me/573022726955?text=Hola, no encontré el producto que buscaba"
              target="_blank"
              className="border border-primary text-primary px-6 py-3 text-xs tracking-widest hover:bg-primary hover:text-white transition"
            >
              HABLAR POR WHATSAPP
            </a>
          </div>
        )}

        {/* VER MÁS */}
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