import { Header } from "@/components/header"
import { PlanetGrid } from "@/components/planets/planet-grid"
import { ActiveExpeditions } from "@/components/planets/active-expeditions"

export default function PlanetsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">GALAXY MAP</h1>
            <p className="text-muted-foreground">Explore planets and launch mining expeditions</p>
          </div>
        </div>
        <ActiveExpeditions />
        <PlanetGrid />
      </div>
    </main>
  )
}
