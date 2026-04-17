import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from "@/components/cart"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
}

export const metadata: Metadata = {
  title: 'FACTOR H | Eleva Tu Presencia',
  description:
    'Marca masculina premium especializada en perfumes, relojes y gorras seleccionadas para proyectar presencia, caracter y estatus.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">

        <CartProvider>
          {children}
        </CartProvider>

        <Analytics />
      </body>
    </html>
  )
}