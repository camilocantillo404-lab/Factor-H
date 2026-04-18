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
        const { codigo, nombre, apellido, direccion, telefono, productos, total, esCombo, nombreOrden } = body

        const secretKey = process.env.BOLD_SECRET_KEY!
        const integrityString = `${codigo}${Math.round(total)}COP${secretKey}`
        const integritySignature = crypto
            .createHash("sha256")
            .update(integrityString)
            .digest("hex")

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

        const productosHtml = productos
            .map((p: any) => `<li>${p.nombre} — $${Number(p.precio).toLocaleString("es-CO")} COP</li>`)
            .join("")

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.TU_CORREO!,
            subject: `🛍️ Nuevo pedido ${codigo}`,
            html: `<div style="font-family:sans-serif"><h2>Nuevo pedido ${codigo}</h2><p><strong>Cliente:</strong> ${nombre} ${apellido}</p><p><strong>Dirección:</strong> ${direccion}</p><p><strong>Teléfono:</strong> ${telefono}</p><ul>${productosHtml}</ul><p><strong>Total: $${Number(total).toLocaleString("es-CO")} COP</strong></p></div>`
        })

        return NextResponse.json({ ok: true, integritySignature, codigo, total: Math.round(total) })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}