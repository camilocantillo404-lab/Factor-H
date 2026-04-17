"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductCarouselProps {
  images: string[]
  alt: string
  aspect?: string
}

export function ProductCarousel({ images, alt, aspect = "aspect-square" }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const goTo = useCallback((index: number) => {
    setCurrent((index + images.length) % images.length)
  }, [images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1)
    }
    setTouchStart(null)
  }

  return (
    <div
      className={`relative ${aspect} overflow-hidden group/carousel`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      {images.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={img}
            alt={`${alt} - ${i + 1}`}
            fill
            className="object-cover"
            quality={85}
          />
        </div>
      ))}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-[#000000]/60 text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-[#000000]/60 text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-foreground/40"
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
