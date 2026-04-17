import Image from "next/image"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[64px] md:pt-[72px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Hombre elegante con reloj y perfume de lujo"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Decorative line */}
        <div className="w-px h-16 bg-primary mb-8 opacity-0 animate-fade-in" />

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] text-foreground opacity-0 animate-fade-in-up text-balance leading-tight">
          Presencia. Caracter.
          <br />
          <span className="text-primary">Distincion.</span>
        </h1>

        <p className="mt-6 max-w-xl font-sans text-sm md:text-base tracking-wide text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200 text-pretty">
          Cada detalle comunica quien eres antes de que hables.
        </p>

        <a
          href="#combos"
          className="mt-10 inline-block bg-primary text-primary-foreground px-10 py-4 text-xs font-sans tracking-[0.25em] transition-all duration-300 hover:bg-gold-light opacity-0 animate-fade-in-up animate-delay-400"
        >
          EXPLORAR COLECCION
        </a>

        {/* Decorative bottom line */}
        <div className="w-px h-24 bg-primary/30 mt-16 opacity-0 animate-fade-in animate-delay-600" />
      </div>
    </section>
  )
}
