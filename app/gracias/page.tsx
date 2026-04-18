"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function GraciasContent() {
    const searchParams = useSearchParams()
    const orden = searchParams.get("orden")

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md px-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="font-serif text-3xl mb-4">Pago exitoso</h1>
                <p className="text-muted-foreground mb-2">
                    Tu pedido ha sido confirmado. Lo recibirás en 24 a 72 horas hábiles.
                </p>
                {orden && (
                    <p className="text-sm text-muted-foreground mt-4">
                        Código de orden: <code className="bg-secondary px-2 py-1 rounded font-mono">{orden}</code>
                    </p>
                )}
                <a
                    href="/"
                    className="inline-block mt-8 px-6 py-3 border border-primary text-primary text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition"
                >
                    VOLVER A LA TIENDA
                </a>
            </div>
        </div>
    )
}

export default function GraciasPage() {
    return (
        <Suspense>
            <GraciasContent />
        </Suspense>
    )
}