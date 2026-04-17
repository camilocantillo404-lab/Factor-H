import Image from "next/image"

export function SiteFooter() {
  return (
    <footer id="contacto" className="relative bg-background border-t border-border">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#inicio" className="inline-block">
              <Image
                src="/images/logo-factor-h-horizontal.png"
                alt="Factor H - Eleva Tu Presencia"
                width={400}
                height={100}
                quality={100}
                unoptimized
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-4 font-sans text-xs text-muted-foreground leading-relaxed max-w-xs">
              Marca masculina premium. Cada producto seleccionado estrategicamente para proyectar presencia, caracter y estatus.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-sans tracking-[0.3em] text-primary mb-4">
              NAVEGACION
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Combos", href: "#combos" },
                { label: "Relojes", href: "#relojes" },
                { label: "Perfumes", href: "#perfumes" },
                { label: "Gorras", href: "#gorras" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-sans text-muted-foreground tracking-wide transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-sans tracking-[0.3em] text-primary mb-4">
              CONTACTO
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/573022726955"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans text-muted-foreground tracking-wide transition-colors hover:text-foreground"
              >
                WhatsApp: +57 302 272 6955
              </a>
              <a
                href="mailto:cto.factorh@gmail.com"
                className="text-xs font-sans text-muted-foreground tracking-wide transition-colors hover:text-foreground"
              >
                cto.factorh@gmail.com
              </a>
              <p className="text-xs font-sans text-muted-foreground tracking-wide">
                Colombia - Barranquilla
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 flex flex-col items-center gap-4">
          {/* Closing phrase */}
          <p className="font-serif text-sm md:text-base tracking-[0.1em] text-primary text-center italic">
            {'"La elegancia no se anuncia. Se percibe."'}
          </p>
          <p className="text-[10px] font-sans tracking-wide text-muted-foreground">
            {'FACTOR H \u00A9 2026. Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
