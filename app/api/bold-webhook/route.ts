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
        const { order_id, status } = body

        if (status === "APPROVED") {
            const { data, error } = await supabase
                .from("pedidos")
                .update({ estado: "pagado" })
                .eq("codigo", order_id)
                .select()
                .single()

            if (error) throw error

            const productosHtml = data.productos
                .map((p: any) => `<li>${p.nombre} — $${Number(p.precio).toLocaleString("es-CO")} COP</li>`)
                .join("")

            // Correo al vendedor
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: process.env.TU_CORREO!,
                subject: `✅ Pago confirmado - ${order_id}`,
                html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#3B6D11">Pago confirmado — listo para enviar</h2><div style="background:#EAF3DE;padding:16px;border-radius:8px;margin-bottom:16px"><p style="margin:0;font-size:18px;color:#3B6D11"><strong>Orden ${order_id} — PAGADA</strong></p></div><p><strong>Cliente:</strong> ${data.nombre} ${data.apellido}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Dirección:</strong> ${data.direccion}</p><p><strong>Teléfono:</strong> ${data.telefono}</p><h3>Productos</h3><ul>${productosHtml}</ul><p><strong>Total: $${Number(data.total).toLocaleString("es-CO")} COP</strong></p><p style="color:#888;font-size:13px;margin-top:24px">Este pedido esta listo para ser enviado.</p></div>`
            })

            // Correo al cliente
            if (data.email) {
                await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: data.email,
                    subject: `✅ Tu pedido ${order_id} fue confirmado — Factor H`,
                    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#0C447C">¡Gracias por tu compra, ${data.nombre}!</h2><div style="background:#f5f5f5;padding:16px;border-radius:8px;margin-bottom:16px"><p style="margin:0;font-size:16px">Tu pago fue confirmado exitosamente.</p><p style="font-size:20px;font-weight:bold;color:#0C447C;margin:8px 0 0">Código: ${order_id}</p></div><h3>Resumen de tu pedido</h3><ul>${productosHtml}</ul><p><strong>Total pagado: $${Number(data.total).toLocaleString("es-CO")} COP</strong></p><div style="background:#FAEEDA;border-left:4px solid #BA7517;padding:16px;border-radius:8px;margin-top:24px"><p style="margin:0;color:#633806">⏱️ Tu pedido será enviado en <strong>24 a 72 horas hábiles</strong> a la dirección: <strong>${data.direccion}</strong></p></div><p style="color:#888;font-size:13px;margin-top:24px">Si tienes alguna duda, responde a este correo.</p></div>`
                })
            }
        }

        return NextResponse.json({ ok: true })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}