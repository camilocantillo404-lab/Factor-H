import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { codigo, nombre, apellido, direccion, telefono, productos, total, esCombo, nombreOrden } = body

        // Crear link de pago en Bold via API
        const boldRes = await fetch("https://api.bold.co/online/link/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `x-api-key ${process.env.NEXT_PUBLIC_BOLD_PUBLIC_KEY}`
            },
            body: JSON.stringify({
                amount_type: "CLOSE",
                amount: {
                    total_amount: Math.round(total),
                    currency: "COP"
                },
                description: esCombo ? `Combo ${nombre} ${apellido}` : `Pedido Factor H - ${codigo}`,
                reference: codigo,
                expiration_date: Date.now() * 1e6 + 86400 * 1e9
            })
        })

        const boldData = await boldRes.json()
        const boldUrl = boldData?.payload?.url || null

        // Guardar en Supabase
        const { error } = await supabase.from("pedidos").insert([{
            codigo,
            nombre,
            apellido,
            direccion,
            telefono,
            productos,
            cantidad_productos: productos.length,
            total,
            estado: "pendiente",
            es_combo: esCombo || false,
            nombre_orden: nombreOrden
        }])

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
                        ${esCombo ? `<p style="color: #854F0B; font-size: 13px; margin: 4px 0 0;">COMBO: ${nombreOrden}</p>` : ""}
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

        return NextResponse.json({ ok: true, boldUrl })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: "Error al procesar el pedido" }, { status: 500 })
    }
}