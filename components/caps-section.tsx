"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/components/cart"
import { SearchBar } from "@/components/SearchBar"

const caps = [
  {
    name: "RALPH LAUREN BIG PONY - CREMA/CAQUI",
    price: "$59.900",
    image: "/images/gorras (1).jpeg",
    detail: "Crema estructurada con visera caqui, ajuste premium",
  },
  {
    name: "CLEMONT - C ROJA",
    price: "$59.900",
    image: "/images/gorras (2).jpeg",
    detail: "Negro estructurado, bordado rojo, ajuste premium",
  },
  {
    name: "CLEMONT - TRUTH",
    price: "$59.900",
    image: "/images/gorras (3).jpeg",
    detail: "Negro estructurado, texto circular bordado, ajuste premium",
  },
  {
    name: "AMIRI HOLLYWOOD - ROJA",
    price: "$59.900",
    image: "/images/gorras (4).jpeg",
    detail: "Rojo estructurado, escudo bordado, ajuste premium",
  },
  {
    name: "AMIRI ARTS DISTRICT - NEGRA",
    price: "$65.000",
    image: "/images/gorras (5).jpeg",
    detail: "Negro estructurado, texto completo bordado, ajuste premium",
  },
  {
    name: "CLEMONT - ROSA ROJA",
    price: "$59.900",
    image: "/images/gorras (6).jpeg",
    detail: "Negro estructurado, rosa roja bordada, ajuste premium",
  },
  {
    name: "CLEMONT - FAME CELEZAR",
    price: "$59.900",
    image: "/images/gorras (7).jpeg",
    detail: "Negro estructurado, abeja bordada, ajuste premium",
  },
  {
    name: "AMIRI - BLANCA/NEGRA",
    price: "$65.000",
    image: "/images/gorras (8).jpeg",
    detail: "Blanco con visera negra, logo MA bordado, ajuste premium",
  },
  {
    name: "AMIRI - FIRMA PEDRERÍA",
    price: "$59.900",
    image: "/images/gorras (9).jpeg",
    detail: "Negro estructurado, firma con pedrería, ajuste premium",
  },
  {
    name: "AMIRI ARTS DISTRICT - HUESOS",
    price: "$65.000",
    image: "/images/gorras (10).jpeg",
    detail: "Negro estructurado, huesos cruzados bordados, ajuste premium",
  },
  {
    name: "CLEMONT - ROJA ROSA NEGRA",
    price: "$59.900",
    image: "/images/gorras (11).jpeg",
    detail: "Rojo estructurado, rosa negra bordada, ajuste premium",
  },
  {
    name: "WE ARE WARRIORS - W NEGRA",
    price: "$59.900",
    image: "/images/gorras (12).jpeg",
    detail: "Negro estructurado, letra W bordada, ajuste premium",
  },
  {
    name: "AMIRI - ESTRELLAS AMARILLAS",
    price: "$59.900",
    image: "/images/gorras (13).jpeg",
    detail: "Negro estructurado, estrellas amarillas bordadas, ajuste premium",
  },
  {
    name: "AMIRI ARTS DISTRICT - BLANCA",
    price: "$65.000",
    image: "/images/gorras (14).jpeg",
    detail: "Blanco estructurado, texto negro bordado, ajuste premium",
  },
  {
    name: "NEW ERA 9FORTY - LA DODGERS DORADA",
    price: "$59.900",
    image: "/images/gorras (16).jpeg",
    detail: "Crema estructurada, logo LA dorado, ajuste premium",
  },
  {
    name: "NEW ERA 9FORTY - ATLANTA BRAVES",
    price: "$59.900",
    image: "/images/gorras (18).jpeg",
    detail: "Azul marino con visera roja, logo Braves bordado, ajuste premium",
  },
  {
    name: "CORTEIZ - AZUL MARINO/NEGRA",
    price: "$59.900",
    image: "/images/gorras (42).jpeg",
    detail: "Gorra azul marino con visera negra, logo CT bordado en rojo con figura colgante, logo lateral, ajuste snapback",
  },
  {
    name: "NEW ERA 9FORTY - LA DODGERS GRIS/NEGRA",
    price: "$59.900",
    image: "/images/gorras (37).jpeg",
    detail: "Gorra gris con visera negra, logo LA bordado en amarillo y gris, parche aniversario lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - NEW YORK YANKEES LLAMAS",
    price: "$59.900",
    image: "/images/gorras (23).jpeg",
    detail: "Gorra azul marino, logo NY bordado en blanco con llamas rojas y doradas, parche World Series lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - NEW YORK METS NEGRA",
    price: "$55.000",
    image: "/images/gorras (24).jpeg",
    detail: "Gorra negra con texto Mets bordado en azul y dorado, parche mascota lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - NEW YORK YANKEES AZUL",
    price: "$55.000",
    image: "/images/gorras (25).jpeg",
    detail: "Gorra azul marino con logo NY bordado en blanco y azul celeste, parche World Series lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - TAMPA BAY RAYS VERDE",
    price: "$55.000",
    image: "/images/gorras (26).jpeg",
    detail: "Gorra verde oliva con visera verde brillante, logo T con ave bordado, parche temporada lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - BOSTON RED SOX VERDE",
    price: "$55.000",
    image: "/images/gorras (31).jpeg",
    detail: "Gorra verde oscuro con logo B de Red Sox bordado en rojo y blanco, parche World Series lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - LA DODGERS VERDE/ROJA",
    price: "$59.900",
    image: "/images/gorras (32).jpeg",
    detail: "Gorra verde con visera roja, logo LA bordado en blanco, parche lateral conmemorativo, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - SAN FRANCISCO GIANTS CREMA/NEGRA",
    price: "$59.900",
    image: "/images/gorras (34).jpeg",
    detail: "Gorra crema con visera negra, logo SF bordado en negro y naranja, parche aniversario lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - SAN FRANCISCO GIANTS NEGRA/CELESTE",
    price: "$59.900",
    image: "/images/gorras (35).jpeg",
    detail: "Gorra negra con logo SF bordado en azul celeste y blanco, parche conmemorativo morado lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - BOSTON RED SOX CREMA",
    price: "$55.000",
    image: "/images/gorras (36).jpeg",
    detail: "Gorra crema con logo medias bordado en verde y rojo, parche All Star lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - RED SOX NEGRA ALL STAR",
    price: "$59.900",
    image: "/images/gorras (38).jpeg",
    detail: "Gorra negra con texto Red Sox bordado en rojo y dorado, parche All Star Game '99 lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - BOSTON RED SOX BLANCA/AZUL",
    price: "$59.900",
    image: "/images/gorras (39).jpeg",
    detail: "Gorra blanca con visera azul marino, texto Boston bordado en rojo y negro, parche All Star '99 lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - PITTSBURGH PIRATES NEGRA",
    price: "$59.900",
    image: "/images/gorras (40).jpeg",
    detail: "Gorra negra con logo P de Pirates bordado en amarillo dorado, parche 70th World Series lateral, ajuste 9Forty",
  },
  {
    name: "NEW ERA 9FORTY - LOS WHITE SOX MÉXICO",
    price: "$59.900",
    image: "/images/gorras (44).jpeg",
    detail: "Gorra crema con visera verde, texto Los White Sox bordado en rojo, bandera de México lateral, ajuste 9Forty",
  },
  {
    name: "BALMAIN PARIS - VERDE OLIVA",
    price: "$59.900",
    image: "/images/gorras (63).jpeg",
    detail: "Gorra verde oliva con texto Balmain Paris bordado en tono, líneas doradas en visera, ajuste snapback premium",
  },
  {
    name: "BALMAIN PARIS - NEGRA TONAL",
    price: "$59.900",
    image: "/images/gorras (64).jpeg",
    detail: "Gorra negra con texto Balmain Paris bordado en negro tonal, líneas doradas en visera, ajuste snapback premium",
  },
  {
    name: "JORDAN PRO - VINOTINTO/NEGRA",
    price: "$59.900",
    image: "/images/gorras (65).jpeg",
    detail: "Gorra vinotinto con visera negra, texto Jordan bordado en blanco con logo Jumpman, ajuste Jordan Pro",
  },
  {
    name: "JORDAN PRO - CAQUI/CREMA",
    price: "$59.900",
    image: "/images/gorras (66).jpeg",
    detail: "Gorra caqui con visera crema, texto Jordan bordado en blanco con logo Jumpman, ajuste Jordan Pro",
  },
  {
    name: "DIESEL DSL - AZUL MARINO/ROJA",
    price: "$59.900",
    image: "/images/gorras (67).jpeg",
    detail: "Gorra azul marino con franjas rojas y blancas, logo DSL Slow Burner Industry bordado, texto Diesel en visera, ajuste snapback",
  },
  {
    name: "VALENTINO VLOGO - CREMA",
    price: "$59.900",
    image: "/images/gorras (72).jpeg",
    detail: "Gorra crema satinada con logo VLogo Signature en relieve dorado con acabado metalizado, ajuste snapback premium",
  },
  {
    name: "TOMMY HILFIGER - CREMA BOX LOGO",
    price: "$55.000",
    image: "/images/gorras (71).jpeg",
    detail: "Gorra crema con parche Tommy Hilfiger bordado en azul, blanco y rojo, logo bandera lateral, ajuste snapback",
  },
  {
    name: "TOMMY HILFIGER - AZUL MARINO BOX LOGO",
    price: "$55.000",
    image: "/images/gorras (75).jpeg",
    detail: "Gorra azul marino con parche Tommy Hilfiger bordado en azul y rojo, logo bandera lateral, ajuste snapback",
  },
  {
    name: "TOMMY HILFIGER - NEGRA BOX LOGO",
    price: "$55.000",
    image: "/images/gorras (76).jpeg",
    detail: "Gorra negra con parche Tommy Hilfiger bordado en negro y rojo, logo bandera lateral, ajuste snapback",
  },
  {
    name: "BALMAIN PARIS - BLANCA",
    price: "$59.900",
    image: "/images/gorras (73).jpeg",
    detail: "Gorra blanca con texto Balmain Paris bordado en blanco tonal, líneas doradas en visera, ajuste snapback premium",
  },
  {
    name: "DIESEL DSL - BLANCA/AZUL",
    price: "$59.900",
    image: "/images/gorras (74).jpeg",
    detail: "Gorra blanca con franjas azules y doradas, logo DSL Slow Burner Industry bordado, texto Diesel Since 1978 en visera, ajuste snapback",
  },
  {
    name: "DIESEL DSL - NEGRA/DORADA",
    price: "$59.900",
    image: "/images/gorras (68).jpeg",
    detail: "Gorra negra con franjas doradas, logo DSL Slow Burner Industry bordado en dorado, texto Diesel Since 1978 en visera, ajuste snapback",
  },
  {
    name: "RALPH LAUREN BIG PONY - CREMA/BLANCO",
    price: "$59.900",
    image: "/images/gorras (79).jpeg",
    detail: "Gorra crema con visera Crema, logo Big Pony bordado en blanco, ajuste premium",
  },
  {
    name: "DSQUARED2 ICON - ROJO/BLANCO",
    price: "$55.000",
    image: "/images/newcaps (1).jpeg",
    detail: "Estructurada roja con bordado ICON en relieve blanco y detalles de desgaste en visera",
  },
  {
    name: "DSQUARED2 CLASSIC - NAVY",
    price: "$55.000",
    image: "/images/newcaps (2).jpeg",
    detail: "Azul oscuro con bordado frontal blanco y efecto destruido sutil en el borde",
  },
  {
    name: "NIKE HERITAGE 86 - BLANCO",
    price: "$55.000",
    image: "/images/newcaps (3).jpeg",
    detail: "Blanco minimalista con logo Swoosh bordado en negro, ajuste regulable",
  },
  {
    name: "MONASTERY TSM - CELESTE/BLANCO",
    price: "$59.900",
    image: "/images/newcaps (4).jpeg",
    detail: "Cuerpo celeste con visera blanca y logo TSM bordado a tono",
  },
  {
    name: "MONASTERY TSM - HUESO/CELESTE",
    price: "$59.900",
    image: "/images/newcaps (5).jpeg",
    detail: "Cuerpo color hueso con visera celeste y bordado central de alta densidad",
  },
  {
    name: "MONASTERY MST - BLANCO/NEGRO",
    price: "$59.900",
    image: "/images/newcaps (6).jpeg",
    detail: "Diseño bicolor blanco con visera negra y siglas MST bordadas en negro",
  },
  {
    name: "MONASTERY MST - VERDE MILITAR/NEGRO",
    price: "$59.900",
    image: "/images/newcaps (7).jpeg",
    detail: "Cuerpo verde oliva con visera negra y bordado frontal MST",
  },
  {
    name: "MONASTERY TSM - TABACO",
    price: "$59.900",
    image: "/images/newcaps (8).jpeg",
    detail: "Color tabaco con borde de visera en cuero sintético y bordado TSM negro/dorado",
  },
  {
    name: "MONASTERY 2019 - CELESTE",
    price: "$59.900",
    image: "/images/newcaps (9).jpeg",
    detail: "Edición Monastery 2019 en tono celeste pastel con parche rectangular bordado",
  },
  {
    name: "PUMA CAT - BLACK ON BLACK",
    price: "$55.000",
    image: "/images/newcaps (10).jpeg",
    detail: "Total black con logo Puma bordado en relieve y detalle Vetements en el borde",
  },
  // Imagen 1 - Puma Beige
 {
    name: "PUMA ESSENTIAL CAP BEIGE",
    price: "$55.000",
    image: "/images/newcaps (11).jpeg",
    detail: ["Logo Puma bordado en negro con tela estructurada color beige y ajuste trasero snapback"],
  },
  {
    name: "PUMA ESSENTIAL CAP WHITE",
    price: "$55.000",
    image: "/images/newcaps (12).jpeg",
    detail: ["Logo Puma bordado en negro con tela estructurada color blanco y ajuste trasero snapback"],
  },
  {
    name: "MONASTERY CAP OLIVE",
    price: "$55.000",
    image: "/images/newcaps (13).jpeg",
    detail: ["Logo Monastery bordado tonal con tela estructurada color verde oliva y ajuste trasero snapback"],
  },
  {
    name: "AMIRI GRAFFITI CAP (cada una)",
    price: "$65.000",
    image: "/images/newcaps (14).jpeg",
    detail: ["Logo Amiri graffiti bordado disponible en negro/verde, negro/blanco, negro/negro y crema/verde con ajuste trasero snapback"],
  },
  {
    name: "AMIRI SCRIPT BICOLOR CAP",
    price: "$59.900",
    image: "/images/newcaps (15).jpeg",
    detail: ["Logo Amiri en letra cursiva con cristales, cuerpo negro con visera crema y ajuste trasero snapback"],
  },
  {
    name: "AMIRI STENCIL CAP (cada una)",
    price: "$65.900",
    image: "/images/newcaps (16).jpeg",
    detail: ["Logo Amiri stencil bordado disponible en negro, blanco y negro outline con ajuste trasero snapback"],
  },
  {
    name: "AMIRI HOLLYWOOD CAP BLACK",
    price: "$59.900",
    image: "/images/newcaps (17).jpeg",
    detail: ["Diseño Amiri Hollywood bordado en blanco con monograma MA central, cuerpo y visera negro"],
  },
  {
    name: "AMIRI MONOGRAM MA CAP BLACK",
    price: "$59.900",
    image: "/images/newcaps (18).jpeg",
    detail: ["Monograma MA bordado en blanco con patrón monogram all-over y visera de cuero negro"],
  },
  {
    name: "AMIRI MA CAP WHITE BLUE",
    price: "$59.900",
    image: "/images/newcaps (19).jpeg",
    detail: ["Monograma MA bordado en azul con cuerpo blanco, visera azul royal y ajuste trasero snapback"],
  },
  {
    name: "AMIRI HOLLYWOOD CAP RED",
    price: "$59.900",
    image: "/images/newcaps (20).jpeg",
    detail: ["Diseño Amiri Hollywood bordado en blanco con monograma MA central y detalles rojos, cuerpo y visera rojo"],
  },
  {
    name: "AMIRI BLOCK LETTER CAP BEIGE BLACK",
    price: "$59.900",
    image: "/images/newcaps (21).jpeg",
    detail: ["Logo Amiri block letter bordado en negro con cuerpo beige, visera negra y ajuste trasero snapback"],
  },
]

export function CapsSection() {

  const { addToCart } = useCart()
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = caps.filter((cap) =>
    cap.name.toLowerCase().includes(search))
  const visibleCaps = expanded ? filtered : filtered.slice(0, 3)

  return (
    <section id="gorras" className="relative py-24 md:py-32 bg-stone-100">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            URBANO & SOFISTICADO
          </p>

          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.06em] text-black text-balance">
            Gorras
          </h2>

          <p className="mt-4 font-sans text-sm text-muted-foreground tracking-wide max-w-md mx-auto">
            Estetica urbana sofisticada. Cada pieza pensada para complementar tu identidad.
          </p>
        </div>
        <SearchBar
          onSearch={setSearch}
          className="placeholder:text-black text-black"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

          {visibleCaps.map((cap) => (
            <article
              key={cap.name}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >

              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={cap.image}
                  alt={cap.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={85}
                />
              </div>

              <div className="p-6 md:p-8">

                <h3 className="font-serif text-lg tracking-[0.1em] text-foreground">
                  {cap.name}
                </h3>

                <p className="mt-2 text-xs font-sans text-muted-foreground tracking-wide">
                  {cap.detail}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="font-serif text-lg text-primary">
                    {cap.price}
                  </span>

                  <button
                    onClick={() => addToCart(cap)}
                    className="border border-primary text-primary px-5 py-2.5 text-[10px] font-sans tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    ORDENAR
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

        {filtered.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-sm text-black mb-4">
              ¿No encontraste lo que buscabas?
            </p>

            <a
              href="https://wa.me/573022726955?text=Hola, no encontré el producto que buscaba"
              target="_blank"
              className="border border-primary text-primary px-6 py-3 text-xs hover:bg-primary hover:text-white transition"
            >
              HABLAR POR WHATSAPP
            </a>
          </div>
        )}

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