"use client"

import { useState } from "react"
import type { Planet } from "@/lib/solana/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Clock, Trophy, Lock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExpeditionLauncher } from "./expedition-launcher"
import { useI18n } from "@/lib/i18n/context"

interface PlanetCardProps {
  planet: Planet
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { t } = useI18n()

  const tierColors = {
    1: "bg-gray-500/20 text-gray-300 border-gray-500/50",
    2: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    3: "bg-purple-500/20 text-purple-300 border-purple-500/50",
    4: "bg-orange-500/20 text-orange-300 border-orange-500/50",
    5: "bg-red-500/20 text-red-300 border-red-500/50",
  }

  const tierGradients = {
    1: "from-gray-500/20 to-gray-700/20",
    2: "from-blue-500/20 to-blue-700/20",
    3: "from-purple-500/20 to-purple-700/20",
    4: "from-orange-500/20 to-orange-700/20",
    5: "from-red-500/20 to-red-700/20",
  }

  // Mock user mining power
  const userMiningPower = 1247
  const isUnlocked = userMiningPower >= planet.requiredMiningPower

  return (
    <Card className="border-primary/30 bg-card/30 backdrop-blur hologram overflow-hidden group hover:border-primary/50 transition-all">
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${tierGradients[planet.tier]}`}>
        <img
          src={planet.image || "/placeholder.svg"}
          alt={planet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <Lock className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={tierColors[planet.tier]}>
            {t.planets.tier.toUpperCase()} {planet.tier}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-primary glow-cyan">{planet.name}</h3>
        <p className="text-sm text-muted-foreground">{planet.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{t.planets.requiredPower}</span>
          </div>
          <span className={`font-bold ${isUnlocked ? "text-accent" : "text-destructive"}`}>
            {planet.requiredMiningPower} MP
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">{t.planets.duration}</span>
          </div>
          <span className="font-bold">{planet.duration / 3600}h</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{t.planets.baseReward}</span>
          </div>
          <span className="font-bold text-accent">{planet.baseReward} $DST</span>
        </div>

        {!isUnlocked && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-destructive">
              {t.planets.unlockHint} ({t.planets.needMorePower.replace("{power}", (planet.requiredMiningPower - userMiningPower).toString())})
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={!isUnlocked}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
            >
              {isUnlocked ? t.planets.launch.toUpperCase() : t.planets.locked.toUpperCase()}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-primary/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary glow-cyan">
                {t.planets.launchTitle.replace("{planet}", planet.name)}
              </DialogTitle>
              <DialogDescription>{t.planets.launchDescription}</DialogDescription>
            </DialogHeader>
            <ExpeditionLauncher planet={planet} onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
