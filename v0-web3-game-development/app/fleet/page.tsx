"use client"

import { Header } from "@/components/header"
import { FleetManager } from "@/components/fleet/fleet-manager"
import { MintSection } from "@/components/fleet/mint-section"
import { useI18n } from "@/lib/i18n/context"

export default function FleetPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">{t.fleet.title}</h1>
            <p className="text-muted-foreground">{t.fleet.mint}</p>
          </div>
        </div>
        <MintSection />
        <FleetManager />
      </div>
    </main>
  )
}
