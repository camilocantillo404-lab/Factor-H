"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CombosSection } from "@/components/combos-section"
import { WatchesSection } from "@/components/watches-section"
import { PerfumesSection } from "@/components/perfumes-section"
import { CapsSection } from "@/components/caps-section"
import { CustomComboSection } from "@/components/custom-combo-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

function BoldPaymentHandler() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const orderId = searchParams.get("bold-order-id")
        const status = searchParams.get("bold-tx-status")

        if (orderId && status === "approved") {
            fetch("/api/bold-webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order_id: orderId,
                    status: "APPROVED"
                })
            })
        }
    }, [])

    return null
}

export default function Home() {
    return (
        <>
            <Suspense fallback={null}>
                <BoldPaymentHandler />
            </Suspense>
            <Navbar />
            <main>
                <HeroSection />
                <CombosSection />
                <WatchesSection />
                <PerfumesSection />
                <CapsSection />
                <CustomComboSection />
                <TestimonialsSection />
            </main>
            <SiteFooter />
            <WhatsAppButton />
        </>
    )
}