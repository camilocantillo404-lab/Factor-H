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
        const body = await req.formData()

        const estado = body.get("state_pol") as string
        const referencia = body.get("reference_sale") as string
        const valor = body.get("value") as string
        const moneda = body.get("currency") as string
        const firmaPayU = body.get("sign") as string
        const merchantId = body.get("merchant_id") as string

        // Verificar firma de seguridad de PayU
        const apiKey = process.env.PAYU_API_KEY!
        const firmaLocal = crypto
            .createHash("md5")
            .update(`${apiKey}~${merchantId}~${referencia}~${valor}~${moneda}~${estado}`)
            .digest("hex")

        if (firmaLocal !== firmaPayU) {
            return NextResponse.json({ ok: false, error: "Firma invalida" }, { status: 401 })
        }

        // 4 = pago aprobado en PayU
        if (estado === "4") {
            // Actualizar estado en Supabase
            const { data, error } = await supabase
                .from("pedidos")
                .update({ estado: "pagado" })
                .eq("codigo", referencia)
                .select()
                .single()

            if (error) throw error

            // Enviar correo de confirmación
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: process.env.TU_CORREO!,
                subject: `✅ Pago confirmado - ${referencia}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #3B6D11;">Pago confirmado</h2>

                        <div style="background: #EAF3DE; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                            <p style="margin: 0; font-size: 18px; color: #3B6D11;">
                                <strong>Orden ${referencia} — PAGADA</strong>
                            </p>
                        </div>

                        <p><strong>Cliente:</strong> ${data.nombre} ${data.apellido}</p>
                        <p><strong>Dirección:</strong> ${data.direccion}</p>
                        <p><strong>Teléfono:</strong> ${data.telefono}</p>
                        <p><strong>Total:</strong> $${Number(data.total).toLocaleString("es-CO")} COP</p>

                        <p style="color: #888; font-size: 13px; margin-top: 24px;">
                            Este pedido está listo para ser enviado.
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