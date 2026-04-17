"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "INICIO", href: "#inicio" },
  { label: "COMBOS", href: "#combos" },
  { label: "RELOJES", href: "#relojes" },
  { label: "PERFUMES", href: "#perfumes" },
  { label: "GORRAS", href: "#gorras" },
  { label: "CREA TU COMBO", href: "#crea-tu-combo" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#000000] ${
        scrolled
          ? "border-b border-border"
          : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Left links (desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-xs font-sans tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Logo centered */}
        <a
          href="#inicio"
          className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center"
        >
          <Image
            src="/images/logo-factor-h-horizontal.png"
            alt="Factor H - Eleva Tu Presencia"
            width={400}
            height={100}
            priority
            quality={100}
            unoptimized
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Right links (desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-xs font-sans tracking-[0.2em] transition-colors ${
                link.href === "#crea-tu-combo"
                  ? "text-primary hover:text-gold-light"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Spacer for mobile */}
        <div className="lg:hidden w-6" />
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#000000] border-t border-border animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-sans tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
