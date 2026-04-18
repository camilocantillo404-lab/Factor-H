"use client"

import { createContext, useContext, useState } from "react"
import ChatBot from "./Chatbot"

interface ProductoCombo {
    nombre: string
    precio: number
    categoria: string
}

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<any[]>([])
    const [showChat, setShowChat] = useState(false)
    const [comboData, setComboData] = useState<{ productos: ProductoCombo[], total: number } | null>(null)

    const addToCart = (product: any) => {
        setItems((prev) => [...prev, product])
    }

    const removeItem = (index: number) => {
        const updated = [...items]
        updated.splice(index, 1)
        setItems(updated)
    }

    const openChatWithCombo = (productos: ProductoCombo[], total: number) => {
        setComboData({ productos, total })
        setShowChat(true)
    }

    const handleClose = () => {
        setShowChat(false)
        setComboData(null)
    }

    const total = items.reduce((acc, item) => {
        const price = Number(item.price.replace(/[^0-9]/g, ""))
        return acc + price
    }, 0)

    const carritoParaChat = comboData
        ? comboData.productos.map((p) => ({ nombre: p.nombre, precio: p.precio }))
        : items.map((item) => ({
            nombre: item.name,
            precio: Number(item.price.replace(/[^0-9]/g, ""))
        }))

    const totalParaChat = comboData ? comboData.total : total

    const esCombo = !!comboData

    return (
        <CartContext.Provider value={{ addToCart, openChatWithCombo }}>
            {children}

            {/* Carrito normal — se oculta cuando el chat está abierto */}
            {items.length > 0 && !showChat && !comboData && (
                <div className="fixed right-6 top-24 w-80 bg-card border border-border shadow-xl p-6 z-50">
                    <h3 className="font-serif text-lg mb-4">Carrito</h3>

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

                    <div className="mt-4 flex justify-between text-sm">
                        <span>Total</span>
                        <span className="text-primary">${total.toLocaleString("es-CO")}</span>
                    </div>

                    <button
                        onClick={() => setShowChat(true)}
                        className="mt-4 w-full border border-primary text-primary py-2 text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition"
                    >
                        COMPRAR AHORA
                    </button>
                </div>
            )}

            {/* Chatbot — funciona tanto para carrito normal como para combo */}
            {showChat && (
                <ChatBot
                    carrito={carritoParaChat}
                    total={totalParaChat}
                    esCombo={esCombo}
                    onClose={handleClose}
                />
            )}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}