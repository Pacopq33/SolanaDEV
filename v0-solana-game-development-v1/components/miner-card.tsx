"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, TrendingUp, Zap } from "lucide-react"
import type { Miner } from "@/app/page"
import Image from "next/image"

interface MinerCardProps {
  miner: Miner
  onStartMining: (id: string) => void
  onStopMining: (id: string) => void
  onUpgrade: (id: string) => void
}

const rarityColors = {
  common: "bg-muted text-muted-foreground border-muted",
  rare: "bg-secondary/20 text-secondary border-secondary/50",
  epic: "bg-primary/20 text-primary border-primary/50",
  legendary: "bg-accent/20 text-accent border-accent/50",
}

const rarityLabels = {
  common: "Común",
  rare: "Raro",
  epic: "Épico",
  legendary: "Legendario",
}

export function MinerCard({ miner, onStartMining, onStopMining, onUpgrade }: MinerCardProps) {
  const isMining = miner.status === "mining"

  return (
    <Card className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      {/* Image Section */}
      <div className="relative h-48 bg-muted/50 overflow-hidden">
        <Image src={miner.image || "/placeholder.svg"} alt={miner.name} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <Badge className={`${rarityColors[miner.rarity]} border`}>{rarityLabels[miner.rarity]}</Badge>
        </div>
        {isMining && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 animate-neon-pulse">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-semibold text-primary">Minando...</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">{miner.name}</h3>
            <p className="text-sm text-muted-foreground">Nivel {miner.level}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{miner.power}</p>
            <p className="text-xs text-muted-foreground">Poder</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Eficiencia</span>
            <span className="font-semibold text-foreground">{miner.efficiency}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-300 shadow-lg shadow-secondary/50"
              style={{ width: `${miner.efficiency}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isMining ? (
            <Button
              onClick={() => onStopMining(miner.id)}
              variant="outline"
              className="flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Pause className="w-4 h-4" />
              Detener
            </Button>
          ) : (
            <Button onClick={() => onStartMining(miner.id)} className="flex-1 gap-2 bg-primary hover:bg-primary/80">
              <Play className="w-4 h-4" />
              Minar
            </Button>
          )}
          <Button
            onClick={() => onUpgrade(miner.id)}
            variant="secondary"
            size="icon"
            className="flex-shrink-0 bg-secondary hover:bg-secondary/80"
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
