"use client"

import { useState } from "react"
import type { Planet } from "@/lib/solana/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useMockShips } from "@/hooks/use-mock-ships"
import { Loader2, Rocket, Zap, Fuel } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExpeditionLauncherProps {
  planet: Planet
  onClose: () => void
}

export function ExpeditionLauncher({ planet, onClose }: ExpeditionLauncherProps) {
  const { ships } = useMockShips()
  const { toast } = useToast()
  const [selectedShips, setSelectedShips] = useState<string[]>([])
  const [launching, setLaunching] = useState(false)

  const availableShips = ships.filter((ship) => ship.status === "Hangar")

  const totalMiningPower = availableShips
    .filter((ship) => selectedShips.includes(ship.mint))
    .reduce((sum, ship) => sum + ship.miningPower, 0)

  const fuelCost = selectedShips.length * 50 // 50 $DST per ship

  const handleShipToggle = (mint: string) => {
    setSelectedShips((prev) => (prev.includes(mint) ? prev.filter((m) => m !== mint) : [...prev, mint]))
  }

  const handleLaunch = async () => {
    if (selectedShips.length === 0) {
      toast({
        title: "No ships selected",
        description: "Please select at least one ship for the expedition",
        variant: "destructive",
      })
      return
    }

    if (totalMiningPower < planet.requiredMiningPower) {
      toast({
        title: "Insufficient Mining Power",
        description: `You need ${planet.requiredMiningPower} MP to mine on this planet`,
        variant: "destructive",
      })
      return
    }

    setLaunching(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Expedition Launched!",
      description: `Your fleet is now mining on ${planet.name}. Return in ${planet.duration / 3600}h to claim rewards.`,
    })

    setLaunching(false)
    onClose()
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Mining Power</p>
          <p
            className={`text-xl font-bold ${totalMiningPower >= planet.requiredMiningPower ? "text-accent" : "text-destructive"}`}
          >
            {totalMiningPower} MP
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Fuel Cost</p>
          <p className="text-xl font-bold text-secondary">{fuelCost} $DST</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="text-xl font-bold">{planet.duration / 3600}h</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-lg">Select Ships ({selectedShips.length} selected)</h3>
        {availableShips.length === 0 ? (
          <p className="text-sm text-muted-foreground">No ships available in hangar</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableShips.map((ship) => (
              <Card
                key={ship.mint}
                className={`border-primary/30 bg-card/30 cursor-pointer transition-all ${
                  selectedShips.includes(ship.mint) ? "border-primary bg-primary/10" : ""
                }`}
                onClick={() => handleShipToggle(ship.mint)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedShips.includes(ship.mint)}
                      onCheckedChange={() => handleShipToggle(ship.mint)}
                    />
                    <img
                      src={ship.image || "/placeholder.svg"}
                      alt={ship.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{ship.name}</h4>
                        <Badge className="text-xs">{ship.rarity}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-primary" />
                          <span>{ship.miningPower} MP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3 text-secondary" />
                          <span>{ship.fuelEfficiency}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          onClick={handleLaunch}
          disabled={launching || selectedShips.length === 0 || totalMiningPower < planet.requiredMiningPower}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
        >
          {launching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Launching...
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-4 w-4" />
              Launch Expedition
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
