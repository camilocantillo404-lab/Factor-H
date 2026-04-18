import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import crypto from "crypto"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // Verificar firma de seguridad de Bold
        const signature = req.headers.get("x-bold-signature") || ""
        const secretKey = process.env.BOLD_SECRET_KEY!
        const payload = JSON.stringify(body)
        const expectedSignature = crypto
            .createHmac("sha256", secretKey)
            .update(payload)
            .digest("hex")

        if (signature !== expectedSignature) {
            return NextResponse.json({ ok: false, error: "Firma invalida" }, { status: 401 })
        }

        const { order_id, status, amount, currency } = body

        // Solo procesar pagos aprobados
        if (status === "APPROVED") {
            const { data, error } = await supabase
                .from("pedidos")
                .update({ estado: "pagado" })
                .eq("codigo", order_id)
                .select()
                .single()

            if (error) throw error

            // Correo de confirmación de pago
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: process.env.TU_CORREO!,
                subject: `✅ Pago confirmado - ${order_id}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #3B6D11;">Pago confirmado — listo para enviar</h2>
                        <div style="background: #EAF3DE; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                            <p style="margin: 0; font-size: 18px; color: #3B6D11;">
                                <strong>Orden ${order_id} — PAGADA</strong>
                            </p>
                        </div>
                        <p><strong>Cliente:</strong> ${data.nombre} ${data.apellido}</p>
                        <p><strong>Dirección de envío:</strong> ${data.direccion}</p>
                        <p><strong>Teléfono:</strong> ${data.telefono}</p>
                        <p><strong>Total pagado:</strong> $${Number(data.total).toLocaleString("es-CO")} COP</p>
                        <p style="color: #888; font-size: 13px; margin-top: 24px;">
                            Este pedido esta listo para ser enviado.
                        </p>
                    </div>
                `
            })
        }

        return NextResponse.json({ ok: true })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}