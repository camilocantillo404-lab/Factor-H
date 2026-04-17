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


export default function Home() {
  return (
    <>
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
