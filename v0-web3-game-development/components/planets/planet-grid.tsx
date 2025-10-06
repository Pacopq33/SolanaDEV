"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { PlanetCard } from "./planet-card"
import { useMockPlanets } from "@/hooks/use-mock-planets"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Map } from "lucide-react"

export function PlanetGrid() {
  const { connected } = useWallet()
  const { planets, loading } = useMockPlanets()

  if (!connected) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <Map className="h-4 w-4" />
        <AlertDescription>Connect your wallet to explore planets</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-96 rounded-lg border border-primary/30 bg-card/30 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">AVAILABLE PLANETS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets.map((planet) => (
          <PlanetCard key={planet.id} planet={planet} />
        ))}
      </div>
    </div>
  )
}
