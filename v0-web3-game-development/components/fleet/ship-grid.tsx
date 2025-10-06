"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { ShipCard } from "./ship-card"
import { useMockShips } from "@/hooks/use-mock-ships"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket } from "lucide-react"

export function ShipGrid() {
  const { connected } = useWallet()
  const { ships, loading } = useMockShips()

  if (!connected) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <Rocket className="h-4 w-4" />
        <AlertDescription>Connect your wallet to view your fleet</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-96 rounded-lg border border-primary/30 bg-card/30 animate-pulse" />
        ))}
      </div>
    )
  }

  if (ships.length === 0) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <Rocket className="h-4 w-4" />
        <AlertDescription>No ships in your hangar. Mint your first ship to get started!</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ships.map((ship) => (
        <ShipCard key={ship.mint} ship={ship} />
      ))}
    </div>
  )
}
