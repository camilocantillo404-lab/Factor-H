import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log("BOLD BODY:", JSON.stringify(body))
        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}