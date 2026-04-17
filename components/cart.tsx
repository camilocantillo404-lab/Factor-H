"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<any[]>([])

    const addToCart = (product: any) => {
        setItems((prev) => [...prev, product])
    }

    const removeItem = (index: number) => {
        const updated = [...items]
        updated.splice(index, 1)
        setItems(updated)
    }

    const total = items.reduce((acc, item) => {
        const price = Number(item.price.replace(/[^0-9]/g, ""))
        return acc + price
    }, 0)

    const sendToWhatsApp = () => {
        if (items.length === 0) return

        const message = items
            .map((item, i) => `${i + 1}. ${item.name} - ${item.price}`)
            .join("\n")

        const text = `Hola, quiero comprar:\n\n${message}\n\nTotal: $${total.toLocaleString("es-CO")}`

        const url = `https://wa.me/573022726955?text=${encodeURIComponent(text)}`

        window.open(url, "_blank")
    }

    return (
        <CartContext.Provider value={{ addToCart }}>
            {children}

            {items.length > 0 && (
                <div className="fixed right-6 top-24 w-80 bg-card border border-border shadow-xl p-6 z-50">
                    <h3 className="font-serif text-lg mb-4">Carrito</h3>

                    {items.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Tu carrito está vacío
                        </p>
                    )}

                    <div className="flex flex-col gap-3">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <div>
                                    <p>{item.name}</p>
                                    <p className="text-primary">{item.price}</p>
                                </div>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-xs text-red-500"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    {items.length > 0 && (
                        <>
                            <div className="mt-4 flex justify-between text-sm">
                                <span>Total</span>
                                <span className="text-primary">${total.toLocaleString("es-CO")}</span>
                            </div>

                            <button
                                onClick={sendToWhatsApp}
                                className="mt-4 w-full border border-primary text-primary py-2 text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition"
                            >
                                SOLICITAR POR WHATSAPP
                            </button>
                        </>
                    )}
                  </div>
)}
    </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}