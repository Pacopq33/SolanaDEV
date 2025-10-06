"use client"

import type { Drone } from "@/lib/solana/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DroneCardProps {
  drone: Drone
}

export function DroneCard({ drone }: DroneCardProps) {
  const typeConfig = {
    Mining: {
      icon: <Zap className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/50",
      description: "Increases Mining Power",
    },
    Efficiency: {
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
      borderColor: "border-secondary/50",
      description: "Improves Fuel Efficiency",
    },
    Shield: {
      icon: <Shield className="h-5 w-5" />,
      color: "text-accent",
      bgColor: "bg-accent/20",
      borderColor: "border-accent/50",
      description: "Reduces Durability Loss",
    },
  }

  const config = typeConfig[drone.type]

  return (
    <Card
      className={`border-primary/30 bg-card/30 backdrop-blur overflow-hidden hover:border-primary/50 transition-all`}
    >
      <div className={`relative h-32 ${config.bgColor} flex items-center justify-center`}>
        <img src={drone.image || "/placeholder.svg"} alt={drone.name} className="w-20 h-20 object-contain" />
        <div className="absolute top-2 right-2">
          <Badge className={drone.status === "Equipped" ? "bg-primary/20 text-primary border-primary/50" : "bg-muted"}>
            {drone.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={config.color}>{config.icon}</div>
          <h3 className="font-bold">{drone.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Bonus</span>
          <span className={`font-bold ${config.color}`}>+{drone.bonus}%</span>
        </div>

        <Button
          variant={drone.status === "Equipped" ? "outline" : "default"}
          className="w-full"
          size="sm"
          disabled={drone.status === "Equipped"}
        >
          {drone.status === "Equipped" ? "Equipped" : "Equip to Ship"}
        </Button>
      </CardContent>
    </Card>
  )
}
