"use client"

import type { Ship } from "@/lib/solana/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Shield, Fuel, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShipCardProps {
  ship: Ship
}

export function ShipCard({ ship }: ShipCardProps) {
  const rarityColors = {
    Common: "bg-gray-500/20 text-gray-300 border-gray-500/50",
    Rare: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    Epic: "bg-purple-500/20 text-purple-300 border-purple-500/50",
    Legendary: "bg-orange-500/20 text-orange-300 border-orange-500/50",
  }

  const statusColors = {
    Hangar: "bg-accent/20 text-accent border-accent/50",
    Expedition: "bg-primary/20 text-primary border-primary/50",
    Repair: "bg-destructive/20 text-destructive border-destructive/50",
  }

  const durabilityPercent = (ship.durability / ship.maxDurability) * 100

  return (
    <Card className="border-primary/30 bg-card/30 backdrop-blur hologram overflow-hidden group hover:border-primary/50 transition-all">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        <img
          src={ship.image || "/placeholder.svg"}
          alt={ship.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className={rarityColors[ship.rarity]}>{ship.rarity}</Badge>
          <Badge className={statusColors[ship.status]}>{ship.status}</Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-background/80 text-foreground border-primary/50">LVL {ship.level}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-primary glow-cyan">{ship.name}</h3>
        <p className="text-xs text-muted-foreground font-mono">{ship.mint.slice(0, 20)}...</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Mining Power</span>
            </div>
            <span className="font-bold text-primary">{ship.miningPower} MP</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Durability</span>
              </div>
              <span className="text-sm font-bold">
                {ship.durability}/{ship.maxDurability}
              </span>
            </div>
            <Progress value={durabilityPercent} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Fuel className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">Fuel Efficiency</span>
            </div>
            <span className="font-bold text-secondary">{ship.fuelEfficiency}%</span>
          </div>

          <div className="flex items-center gap-2 text-sm pt-2 border-t border-border/50">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium">{ship.specialTrait}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent" size="sm">
            Details
          </Button>
          {ship.status === "Hangar" && (
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
              Deploy
            </Button>
          )}
          {ship.durability < ship.maxDurability && (
            <Button variant="outline" className="flex-1 border-accent/50 hover:bg-accent/10 bg-transparent" size="sm">
              Repair
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
