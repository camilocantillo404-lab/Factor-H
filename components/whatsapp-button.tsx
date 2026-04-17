"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573022726955?text=Hola%2C%20me%20interesa%20conocer%20mas%20sobre%20sus%20productos."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-primary/40"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </a>
  )
}
