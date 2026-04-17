import { Shield, Truck } from "lucide-react"

const testimonials = [
  {
    text: "No es solo un reloj. Es la forma en que la gente te mira cuando entras a una sala.",
    author: "Andres M.",
    location: "Bogota",
  },
  {
    text: "El combo Heritage cambio mi presencia profesional. Los detalles importan mas de lo que crees.",
    author: "Carlos R.",
    location: "Medellin",
  },
  {
    text: "Cada vez que uso el perfume Noir Absolu recibo al menos tres cumplidos. No exagero.",
    author: "Santiago V.",
    location: "Cali",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-primary/40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans tracking-[0.3em] text-primary mb-4">
            TESTIMONIOS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-[0.06em] text-foreground text-balance">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="bg-card border border-border p-8 flex flex-col"
            >
              {/* Decorative quote mark */}
              <span className="font-serif text-4xl text-primary/30 leading-none mb-4">
                {'\u201C'}
              </span>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 italic">
                {t.text}
              </p>
              <footer className="mt-6 pt-4 border-t border-border">
                <p className="font-sans text-xs tracking-[0.1em] text-foreground">
                  {t.author}
                </p>
                <p className="font-sans text-[10px] tracking-wide text-muted-foreground mt-1">
                  {t.location}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 bg-card border border-border p-6">
            <Shield className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-xs font-sans tracking-[0.15em] text-foreground">
                CALIDAD GARANTIZADA
              </p>
              <p className="mt-1 text-[11px] font-sans text-muted-foreground">
                Todos nuestros productos son de excelente calidad.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card border border-border p-6">
            <Truck className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-xs font-sans tracking-[0.15em] text-foreground">
                ENVIO NACIONAL
              </p>
              <p className="mt-1 text-[11px] font-sans text-muted-foreground">
                Entregas rapidas a todo el pais con seguimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
