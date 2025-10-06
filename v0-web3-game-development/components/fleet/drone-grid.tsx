"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { DroneCard } from "./drone-card"
import { useMockDrones } from "@/hooks/use-mock-drones"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cpu } from "lucide-react"

export function DroneGrid() {
  const { connected } = useWallet()
  const { drones, loading } = useMockDrones()

  if (!connected) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <Cpu className="h-4 w-4" />
        <AlertDescription>Connect your wallet to view your drones</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 rounded-lg border border-primary/30 bg-card/30 animate-pulse" />
        ))}
      </div>
    )
  }

  if (drones.length === 0) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <Cpu className="h-4 w-4" />
        <AlertDescription>No drones available. Mint drones to enhance your ships!</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {drones.map((drone) => (
        <DroneCard key={drone.mint} drone={drone} />
      ))}
    </div>
  )
}
