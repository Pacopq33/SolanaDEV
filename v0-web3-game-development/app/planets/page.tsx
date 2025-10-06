"use client"

import { Header } from "@/components/header"
import { PlanetGrid } from "@/components/planets/planet-grid"
import { ActiveExpeditions } from "@/components/planets/active-expeditions"
import { WorldsExplorer } from "@/components/planets/worlds-explorer"
import { useI18n } from "@/lib/i18n/context"

export default function PlanetsPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">{t.planets.title}</h1>
            <p className="text-muted-foreground">{t.planets.subtitle}</p>
          </div>
        </div>
        <ActiveExpeditions />
        <WorldsExplorer />
        <PlanetGrid />
      </div>
    </main>
  )
}
