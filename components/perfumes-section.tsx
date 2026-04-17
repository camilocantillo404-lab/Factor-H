"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart"
import { SearchBar } from "@/components/SearchBar"

const perfumes = [
  {
    name: "BLEU CHANEL",
    price: "$125.000",
    image: "/images/BLUE CHANEL.jpg",
    description: "Magnetismo oscuro. Una fragancia que deja huella antes de que llegues.",
    notes: {
      salida: "Toronja, Limon, Menta, Pimienta rosa",
      corazon: "Jengibre, Nuez moscada, Jazmin, Melon",
      fondo: "Incienso, Ambar, Cedro, Sandalo, Pachuli",
    },
  },
  {
    name: "Stronger With You Intensely",
    price: "$150.000",
    image: "/images/STRONGER INTESLY.jpg",
    description: "Sofisticacion silenciosa. Para quien no necesita anunciarse.",
    notes: {
      salida: "Pimienta rosa, Enebro",
      corazon: "Canela, Lavanda, Salvia",
      fondo: "Toffee, Vainilla, Ámbar",
    },
  },
  {
    name: "Valentino Born in Roma Intense",
    price: "$139.900",
    image: "/images/VALENTINO.jpg",
    description: "Herencia olfativa. Una firma que trasciende el momento.",
    notes: {
      salida: "Jengibre",
      corazon: "Salvia, Lavanda",
      fondo: "Vainilla de Madagascar, Cuero",
    },
  },
  {
    name: "One Million Lucky",
    price: "$139.000",
    image: "/images/ONE MILLION.jpg",
    description: "La esencia del éxito sin esfuerzo.",
    notes: {
      salida: "Ciruela, Toronja, Bergamota",
      corazon: "Avellana, Miel, Cedro",
      fondo: "Amberwood, Pachulí, Vetiver",
    },
  },
  {
    name: "Dior Sauvage",
    price: "$125.000",
    image: "/images/DIOR.jpg",
    description: "Fuerza indomable.",
    notes: {
      salida: "Bergamota de Calabria, Pimienta",
      corazon: "Lavanda, Vetiver, Geranio",
      fondo: "Ambroxan, Cedro",
    },
  },
  {
    name: "Le Male Le Parfum",
    tag: "Seleccion Ejecutiva",
    price: "$159.000",
    image: "/images/JEAN PAUL.jpg",
    description: "Autoridad seductora.",
    notes: {
      salida: "Cardamomo",
      corazon: "Lavanda, Iris",
      fondo: "Vainilla, Notas amaderadas",
    },
  },

  {
    name: "Creed Aventus",
    tag: "Mas solicitado",
    price: "$139.000",
    image: "/images/Creed Advatin.jpg",
    description: "Poder, visión y éxito. Una fragancia icónica inspirada en la fuerza de un emperador.",
    notes: {
      salida: "Piña, Bergamota, Grosellas negras, Manzana",
      corazon: "Abedul, Pachulí, Jazmín de Marruecos, Rosa",
      fondo: "Almizcle, Musgo de roble, Ámbar gris, Vainilla",
    },

  },
  {

    name: "CREED SILVER MOUNTAIN WATER",
    price: "$139.000",
    image: "/images/Creed silver.jpg",
    description: "Pureza alpina. Un soplo de aire gélido y cristalino que captura la esencia de las montañas suizas.",
    notes: {
      salida: "Bergamota, Mandarina",
      corazon: "Té verde, Grosellas negras",
      fondo: "Almizcle, Sándalo, Petitgrain, Gálbano",
    },

  },
  {
    name: "CREED MILLESIME IMPERIAL",
    price: "$139.000",
    image: "/images/Creed Imperial.jpg",
    description: "El estándar de oro. Una fragancia cítrica y marina que evoca los jardines de los palacios mediterráneos.",
    notes: {
      salida: "Notas frutales, Sal marina",
      corazon: "Limón siciliano, Bergamota, Iris, Mandarina",
      fondo: "Notas marinas, Almizcle, Notas amaderadas",
    },
  },
  {
    name: "JEAN PAUL GAULTIER LE MALE ELIXIR",
    price: "$169.900",
    image: "/images/Jean paul elixir.jpg",
    description: "Llamarada de seducción. Un elixir ardiente que combina lavanda tropical con la calidez del benjuí.",
    notes: {
      salida: "Lavanda, Menta",
      corazon: "Vainilla, Benjuí",
      fondo: "Miel, Habatonka, Tabaco",
    },
  },
  {
    name: "CAROLINA HERRERA 212 VIP BLACK",
    price: "$130.000",
    image: "/images/212 black.jpg",
    description: "El alma de la fiesta. Una fragancia explosiva y picante diseñada para ser el centro de atención.",
    notes: {
      salida: "Absenta, Anís, Hinojo",
      corazon: "Lavanda",
      fondo: "Almizcle negro, Cáscara de vainilla negra",
    },
  },
  {
    name: "GIORGIO ARMANI ACQUA DI GIÒ PROFONDO",
    price: "$130.000",
    image: "/images/profondo.jpg",
    description: "Inmersión en lo profundo. Una interpretación marina intensa que fusiona notas acuáticas con esencias aromáticas.",
    notes: {
      salida: "Notas marinas, Aquozone, Bergamota, Mandarina verde",
      corazon: "Romero, Lavanda, Ciprés, Lentisco",
      fondo: "Almizcle, Pachulí, Ámbar mineral, Resina de pino",
    },
  },
  {
    name: "GIORGIO ARMANI ACQUA DI GIÒ PROFUMO",
    price: "$130.000",
    image: "/images/profumo.jpg",
    description: "La fuerza de la roca y el mar. Una fragancia sofisticada que combina frescura marina con el misterio del incienso.",
    notes: {
      salida: "Notas marinas, Bergamota",
      corazon: "Romero, Salvia, Geranio",
      fondo: "Incienso, Pachulí",
    },
  },
  {
    name: "GIORGIO ARMANI ACQUA DI GIÒ EAU DE TOILETTE",
    price: "$130.000",
    image: "/images/aqua tradicional.jpg",
    description: "Un icono de libertad. Una fragancia acuática y floral que captura la esencia pura del mar y el sol del Mediterráneo.",
    notes: {
      salida: "Lima, Limón, Bergamota, Jazmín, Naranja, Mandarina, Neroli",
      corazon: "Notas marinas, Jazmín, Calone, Durazno, Freesia, Romero, Ciclamen",
      fondo: "Almizcle blanco, Cedro, Musgo de roble, Pachulí, Ámbar",
    },
  },
  {
    name: "LOUIS VUITTON OMBRE NOMADE",
    price: "$150.000",
    image: "/images/ombre nomada.jpg",
    description: "Un viaje por el desierto. Una fragancia ardiente y majestuosa que rinde homenaje a la profundidad del oud.",
    notes: {
      salida: "Frambuesa, Azafrán",
      corazon: "Rosa de Damasco, Geranio",
      fondo: "Madera de Oud, Incienso, Ámbar, Benjuí, Abedul",
    },
  },
  {
    name: "PARFUMS DE MARLY LAYTON",
    price: "$165.000",
    image: "/images/Marly.jpg",
    description: "Elegancia aristocrática. Una fragancia seductora que combina la frescura del huerto con la calidez de las especias orientales.",
    notes: {
      salida: "Manzana, Lavanda, Bergamota, Mandarina",
      corazon: "Geranio, Violeta, Jazmín",
      fondo: "Vainilla, Cardamomo, Sándalo, Pimienta, Guayacán, Pachulí",
    },
  },
  {
    name: "VERSACE EROS PARFUM",
    price: "$132.000",
    image: "/images/versace eros.jpg",
    description: "Amor, pasión y belleza. Una fragancia que emana masculinidad y fuerza, inspirada en la mitología griega.",
    notes: {
      salida: "Menta, Limón, Manzana verde, Pimienta negra",
      corazon: "Geranio, Lavanda, Salvia esclarea",
      fondo: "Vainilla, Habatonka, Sándalo, Pachulí",
    },
  },
  {
    name: "VERSACE EROS FLAME",
    price: "$132.000",
    image: "/images/eros flame.jpeg",
    description: "Pasión encendida. Una fragancia de contrastes donde el frío y el calor se encuentran para rendir homenaje a la pasión.",
    notes: {
      salida: "Mandarina, Pimienta negra, Limón, Chinotto, Romero",
      corazon: "Rosa, Geranio, Pimienta",
      fondo: "Vainilla, Habatonka, Sándalo, Cedro de Texas, Pachulí",
    },
  },
  {
    name: "PACO RABANNE INVICTUS EAU DE TOILETTE",
    price: "$125.100",
    image: "/images/invictus toilet.jpg",
    description: "La esencia de la victoria. Una fragancia heroica y amaderada que combina la frescura extrema con el magnetismo animal.",
    notes: {
      salida: "Notas marinas, Toronja, Mandarina",
      corazon: "Hoja de laurel, Jazmín",
      fondo: "Ámbar gris, Madera de guayacán, Musgo de roble, Pachulí",
    },
  },
  {
    name: "YVES SAINT LAURENT Y EAU DE PARFUM",
    price: "$139.900",
    image: "/images/saint laurent.jpg",
    description: "L'essence de l'accomplissement. Un parfum intense et profond qui capture la fougue de l'homme qui ose accomplir ses rêves.",
    notes: {
      salida: "Manzana, Jengibre, Bergamota",
      corazon: "Salvia, Bayas de enebro, Geranio",
      fondo: "Amberwood, Habatonka, Cedro, Vetiver, Incienso",
    },
  },
  {
    name: "DOLCE & GABBANA LIGHT BLUE POUR HOMME",
    price: "$115.000",
    image: "/images/Dolce.jpg",
    description: "La frescura del Mediterráneo en un frasco. Una fragancia icónica que mezcla cítricos refrescantes con notas especiadas y maderas suaves.",
    notes: {
      salida: "Toronja (pomelo), Bergamota, Mandarina siciliana, Enebro de Virginia",
      corazon: "Pimienta, Romero, Palo de rosa de Brasil",
      fondo: "Almizcle, Incienso, Musgo de roble",
    },
  },
  {
    name: "HUGO BOSS BOSS BOTTLED EAU DE TOILETTE",
    price: "$118.900",
    image: "/images/hugo boss.jpg",
    description: "El aroma del éxito. Una fragancia equilibrada y versátil que combina notas frutales y florales con un fondo amaderado cálido.",
    notes: {
      salida: "Manzana, Ciruela, Bergamota, Limón, Musgo de roble, Geranio",
      corazon: "Canela, Caoba, Clavel",
      fondo: "Vainilla, Sándalo, Cedro, Vetiver, Olivo",
    },
  },
  {
    name: "GIORGIO ARMANI ARMANI CODE PARFUM",
    price: "$139.900",
    image: "/images/Armani code.jpg",
    description: "Reescribiendo el código. Una fragancia fuerte pero sensible que reinventa la firma olfativa del Armani Code original con un toque moderno.",
    notes: {
      salida: "Bergamota, Hojas de bergamota",
      corazon: "Iris, Raíz de lirio, Salvia esclarea, Aldehídos",
      fondo: "Habatonka, Cedro",
    },
  },
  {
    name: "AFNAN 9PM",
    tag: "Party night",
    price: "$150.000",
    image: "/images/9pm.jpeg",
    description: "La noche te pertenece. Una fragancia vibrante, dulce y seductora, diseñada para destacar en ambientes nocturnos y de fiesta.",
    notes: {
      salida: "Manzana, Canela, Lavanda, Bergamota",
      corazon: "Flor de azahar del naranjo, Lirio de los valles",
      fondo: "Vainilla, Habatonka, Ámbar, Pachulí",
    },
  }
]


export function PerfumesSection() {

  const [expanded, setExpanded] = useState(false)
  const { addToCart } = useCart()
  const [search, setSearch] = useState("")

  const filtered = perfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(search))
  const visiblePerfumes = expanded ? filtered : filtered.slice(0, 3)



  return (
    <section id="perfumes" className="relative py-24 md:py-32 bg-background">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-primary/40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            PRESENCIA & MAGNETISMO
          </p>

          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.06em] text-foreground">
            Perfumes
          </h2>

          <p className="mt-4 font-sans text-sm text-muted-foreground tracking-wide max-w-md mx-auto">
            Fragancias seleccionadas para dejar una impresion que no se olvida.
          </p>
        </div>
        <SearchBar onSearch={setSearch} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 ease-in-out">

          {visiblePerfumes.map((perfume) => (
            <article
              key={perfume.name}
              className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden">


              <div className="relative aspect-square overflow-hidden">
                {perfume.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-[10px] font-sans tracking-[0.2em] px-3 py-1">
                      {perfume.tag}
                    </span>
                  </div>
                )}
                <Image
                  src={perfume.image}
                  alt={perfume.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 md:p-8">

                <h3 className="font-serif text-lg tracking-[0.1em] text-foreground">
                  {perfume.name}
                </h3>

                <p className="mt-2 text-xs font-sans text-muted-foreground italic">
                  {perfume.description}
                </p>

                {/* NOTAS DEL PERFUME */}

                <div className="mt-4 text-[11px] font-sans text-muted-foreground space-y-1">
                  <p><span className="text-primary">Salida:</span> {perfume.notes.salida}</p>
                  <p><span className="text-primary">Corazón:</span> {perfume.notes.corazon}</p>
                  <p><span className="text-primary">Fondo:</span> {perfume.notes.fondo}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="font-serif text-lg text-primary">
                    {perfume.price}
                  </span>

                  <button
                    onClick={() => addToCart(perfume)}
                    className="border border-primary text-primary px-5 py-2.5 text-[10px] font-sans tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:text-white"
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