import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/Supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { codigo, nombre, apellido, direccion, telefono, productos, total } = body

        // Guardar en Supabase
        const { error } = await supabase.from("pedidos").insert([
            {
                codigo,
                nombre,
                apellido,
                direccion,
                telefono,
                productos,
                cantidad_productos: productos.length,
                total,
                estado: "pendiente"
            }
        ])

        if (error) throw error

        // Enviar correo al vendedor
        const productosHtml = productos
            .map((p: any) => `<li>${p.nombre} — $${Number(p.precio).toLocaleString("es-CO")} COP</li>`)
            .join("")

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.TU_CORREO!,
            subject: `🛍️ Nuevo pedido ${codigo}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0C447C;">Nuevo pedido recibido</h2>
                    
                    <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <h3 style="margin: 0 0 8px;">Código de orden</h3>
                        <p style="font-size: 20px; font-weight: bold; color: #0C447C; margin: 0;">${codigo}</p>
                    </div>

                    <div style="margin-bottom: 16px;">
                        <h3>Datos del cliente</h3>
                        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                        <p><strong>Dirección:</strong> ${direccion}</p>
                        <p><strong>Teléfono:</strong> ${telefono}</p>
                    </div>

                    <div style="margin-bottom: 16px;">
                        <h3>Productos</h3>
                        <ul>${productosHtml}</ul>
                    </div>

                    <div style="background: #0C447C; color: white; padding: 16px; border-radius: 8px;">
                        <p style="margin: 0; font-size: 18px;">
                            <strong>Total: $${Number(total).toLocaleString("es-CO")} COP</strong>
                        </p>
                    </div>
                </div>
            `
        })

        return NextResponse.json({ ok: true })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: "Error al procesar el pedido" }, { status: 500 })
    }
}