"use client"

import { useState, useEffect } from "react"

function genCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let r = ""
    for (let i = 0; i < 8; i++) r += chars[Math.floor(Math.random() * chars.length)]
    return "ORD" + r + Date.now()
}

function formatCOP(n: number) {
    return "$" + n.toLocaleString("es-CO")
}

interface Producto {
    nombre: string
    precio: number
}

interface Props {
    carrito: Producto[]
    total: number
    esCombo?: boolean
    onClose: () => void
}

export default function ChatBot({ carrito, total, esCombo = false, onClose }: Props) {
    const [paso, setPaso] = useState<"formulario" | "procesando" | "listo">("formulario")
    const [codigo, setCodigo] = useState("")
    const [fecha, setFecha] = useState("")
    const [error, setError] = useState("")
    const [integritySignature, setIntegritySignature] = useState("")

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (!form.nombre || !form.apellido || !form.direccion || !form.telefono) {
            setError("Por favor completa todos los campos.")
            return
        }

        setError("")
        setPaso("procesando")

        const nuevoCodigo = genCode()
        const nuevaFecha = new Date().toLocaleString("es-CO")
        setCodigo(nuevoCodigo)
        setFecha(nuevaFecha)

        try {
            const res = await fetch("/api/pedidos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    codigo: nuevoCodigo,
                    nombre: form.nombre,
                    apellido: form.apellido,
                    direccion: form.direccion,
                    telefono: form.telefono,
                    productos: carrito,
                    total,
                    esCombo,
                    nombreOrden: esCombo
                        ? `COMBO ${form.nombre.toUpperCase()} ${form.apellido.toUpperCase()}`
                        : nuevoCodigo
                })
            })

            const data = await res.json()
            if (data.integritySignature) setIntegritySignature(data.integritySignature)

        } catch (e) {
            console.error(e)
        }

        setPaso("listo")
    }

    // Inyectar el botón de Bold cuando tengamos la firma
    useEffect(() => {
        if (paso !== "listo" || !integritySignature || !codigo) return

        // Remover script anterior si existe
        const old = document.getElementById("bold-btn-script")
        if (old) old.remove()

        // Cargar librería de Bold
        const lib = document.getElementById("bold-lib")
        if (!lib) {
            const libScript = document.createElement("script")
            libScript.id = "bold-lib"
            libScript.src = "https://checkout.bold.co/library/boldPaymentButton.js"
            document.head.appendChild(libScript)
        }

        // Crear script del botón Bold
        const script = document.createElement("script")
        script.id = "bold-btn-script"
        script.setAttribute("data-bold-button", "dark-L")
        script.setAttribute("data-order-id", codigo)
        script.setAttribute("data-currency", "COP")
        script.setAttribute("data-api-key", process.env.NEXT_PUBLIC_BOLD_PUBLIC_KEY || "")
        script.setAttribute("data-integrity-signature", integritySignature)
        script.setAttribute("data-redirection-url", "http://localhost:3000")
        script.setAttribute("data-description", esCombo ? `Combo ${form.nombre} ${form.apellido}` : `Pedido Factor H`)
        script.setAttribute("data-render-mode", "embedded")
        script.setAttribute("data-customer-data", JSON.stringify({
            fullName: `${form.nombre} ${form.apellido}`,
            phone: form.telefono,
            dialCode: "+57"
        }))
        script.setAttribute("data-billing-address", JSON.stringify({
            address: form.direccion,
            country: "CO"
        }))

        const container = document.getElementById("bold-button-container")
        if (container) {
            container.innerHTML = ""
            container.appendChild(script)
        }

    }, [paso, integritySignature, codigo])

    return (
        <div className="fixed bottom-6 right-6 w-80 bg-card border border-border shadow-xl z-[1001] overflow-hidden rounded-lg">

            <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-medium">
                    {esCombo ? "Asistente — Combo" : "Asistente de compras"}
                </span>
                <button onClick={onClose} className="text-xl leading-none hover:opacity-70 transition">x</button>
            </div>

            <div className="p-4 flex flex-col gap-4 max-h-[500px] overflow-y-auto">

                {paso === "formulario" && (
                    <>
                        <div className="bg-muted text-sm px-3 py-2 rounded-xl rounded-bl-sm">
                            {esCombo
                                ? <p className="font-medium mb-1">Tu combo esta listo. Solo necesito tus datos de envio.</p>
                                : <p className="font-medium mb-1">Hola! Necesito algunos datos para procesar tu pedido.</p>
                            }
                        </div>

                        {esCombo && (
                            <div className="bg-muted px-3 py-2 rounded-lg text-xs flex flex-col gap-1">
                                {carrito.map((p, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span className="text-muted-foreground">{p.nombre}</span>
                                        <span>{formatCOP(p.precio)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-2 border-t border-border font-medium">
                                    <span>Total con descuento</span>
                                    <span className="text-primary">{formatCOP(total)}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Nombre</label>
                                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Apellido</label>
                                <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Perez" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Direccion de envio</label>
                                <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle 123 # 45-67, Bogota" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Telefono</label>
                                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="3001234567" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background" />
                            </div>
                        </div>

                        {error && <p className="text-xs text-red-500">{error}</p>}

                        <button onClick={handleSubmit} className="w-full border border-primary text-primary py-2 text-xs tracking-widest hover:bg-primary hover:text-primary-foreground transition">
                            CONFIRMAR PEDIDO
                        </button>
                    </>
                )}

                {paso === "procesando" && (
                    <div className="text-center py-6">
                        <p className="text-sm text-muted-foreground animate-pulse">Procesando tu orden...</p>
                    </div>
                )}

                {paso === "listo" && (
                    <>
                        <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#FAEEDA", color: "#633806", borderLeft: "3px solid #BA7517" }}>
                            Tu pedido sera enviado en 24 a 72 horas habiles. Si no llega en ese plazo, te devolvemos el 100% de tu dinero.
                        </div>

                        <div className="bg-muted text-sm px-3 py-2 rounded-xl rounded-bl-sm">
                            <p className="font-medium mb-2">Orden registrada!</p>

                            {esCombo && (
                                <p className="text-xs font-medium text-primary mb-2">
                                    COMBO {form.nombre.toUpperCase()} {form.apellido.toUpperCase()}
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground mb-1">Cliente: {form.nombre} {form.apellido}</p>
                            <p className="text-xs text-muted-foreground mb-1">Direccion: {form.direccion}</p>
                            <p className="text-xs text-muted-foreground mb-2">Telefono: {form.telefono}</p>

                            {carrito.map((p, j) => (
                                <p key={j} className="text-xs text-muted-foreground">- {p.nombre} -- {formatCOP(p.precio)}</p>
                            ))}

                            <p className="text-xs mt-2">Total: {formatCOP(total)} COP</p>
                            <p className="text-xs mt-1">Codigo: <code className="bg-background px-1 rounded font-mono">{codigo}</code></p>
                            <p className="text-xs mt-1 text-muted-foreground">{fecha}</p>
                        </div>

                        {/* Botón de Bold se inyecta aquí */}
                        <div id="bold-button-container" className="mt-2"></div>
                    </>
                )}
            </div>
        </div>
    )
}